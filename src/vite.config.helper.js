import { existsSync, readFileSync } from "fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "fs/promises";
import { dirname, join, resolve, sep } from "path";
import { pathToFileURL, fileURLToPath } from "url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { build } from "vite";

import {
  applyPageMetadata,
  generateRobotsTxt,
  generateSitemap,
  getCanonicalBaseUrl,
  getRouteOutputPath,
  injectGeneratorTag,
  injectPrerenderedApp,
  injectSiteUrlTags,
  injectVersionAttribute,
} from "./prerenderHtml.js";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
).version;

/**
 * Rehype plugin that removes <p> wrappers MDX generates around text children
 * of JSX flow elements. This happens because Prettier formats JSX text onto
 * its own line, which MDX interprets as a paragraph. The unwrapping only
 * applies to <p> elements whose children are all plain text nodes, or to a
 * <p> that is the element's only content (even with inline code or links) —
 * other block content is left untouched.
 */
export function rehypeUnwrapJsxParagraphs() {
  function processNode(node) {
    if (!node.children) return;
    node.children.forEach(processNode);
    if (node.type === "mdxJsxFlowElement") {
      const content = node.children.filter(
        (child) => !(child.type === "text" && !child.value.trim())
      );
      node.children = node.children.flatMap((child) => {
        if (
          child.type === "element" &&
          child.tagName === "p" &&
          (content.length === 1 ||
            child.children.every((c) => c.type === "text"))
        ) {
          return child.children;
        }
        return [child];
      });
    }
  }
  return processNode;
}

/**
 * Creates a base Vite config for an mdx-docs site.
 *
 * @param {object} options
 * @param {string} options.rootDir - The site's root directory (pass `import.meta.dirname`)
 * @param {string} [options.base="/"] - The base URL for the site
 * @param {object} [options.site] - The site config object (from `config/site.js`)
 * @param {string} [options.site.name] - Site name, replaces `%SITE_NAME%` in index.html
 * @param {string} [options.site.description] - Site description, replaces `%SITE_DESCRIPTION%` in index.html
 * @param {string} [options.site.url] - Absolute site URL (e.g. `https://example.com`). Enables per-route canonical tags and a generated `sitemap.xml`.
 * @param {string} [options.entry="main.jsx"] - Browser entry that calls `createApp`
 * @param {string} [options.outDir="dist"] - Vite build output directory
 * @param {boolean} [options.prerender=true] - Generate static HTML for every page route
 * @returns {import('vite').UserConfig}
 *
 * @example
 * // vite.config.js in a site repo
 * import { defineConfig } from "vite";
 * import { createMdxDocsConfig } from "mdx-docs/vite";
 *
 * export default defineConfig(
 *   createMdxDocsConfig({ rootDir: import.meta.dirname })
 * );
 */
const VIRTUAL_404_ID = "virtual:mdx-docs/404";
const RESOLVED_VIRTUAL_404_ID = "\0" + VIRTUAL_404_ID;

const create404Plugin = ({ hasCustom404 }) => ({
  name: "mdx-docs-404",
  resolveId(id) {
    if (id === VIRTUAL_404_ID) return RESOLVED_VIRTUAL_404_ID;
  },
  load(id) {
    if (id === RESOLVED_VIRTUAL_404_ID) {
      if (hasCustom404) {
        return `export { default } from "@pages/404.mdx";`;
      }
      return `export { NotFound as default } from "@quietmind/mdx-docs";`;
    }
  },
});

const createMdxPlugin = () =>
  mdx({
    jsxImportSource: "@emotion/react",
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeUnwrapJsxParagraphs],
  });

/**
 * Vite plugin that makes `vite preview` redirect `/route` to `/route/` when
 * `<outDir>/route/index.html` exists, matching Netlify, GitHub Pages and
 * Cloudflare Pages. Without it, Vite's SPA fallback answers `/route` with the
 * root index.html, and hydration fails against the wrong page's markup.
 */
export const createPreviewTrailingSlashPlugin = () => {
  let base = "/";
  let outputDirectory = "";

  return {
    name: "mdx-docs-preview-trailing-slash",
    configResolved(config) {
      base = config.base;
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    // Middlewares added here run before Vite strips the base from the URL.
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const { pathname, search } = new URL(req.url, "http://localhost");
        // A leading "//" would make the Location header protocol-relative.
        if (
          pathname.endsWith("/") ||
          pathname.startsWith("//") ||
          !pathname.startsWith(base)
        ) {
          return next();
        }

        let routePath;
        try {
          routePath = decodeURIComponent(pathname.slice(base.length));
        } catch {
          return next();
        }

        const indexPath = join(outputDirectory, routePath, "index.html");
        if (
          !indexPath.startsWith(outputDirectory + sep) ||
          !existsSync(indexPath)
        ) {
          return next();
        }

        res.statusCode = 301;
        res.setHeader("Location", `${pathname}/${search}`);
        res.end();
      });
    },
  };
};

const createPrerenderPlugin = ({ rootDir, base, entry, outDir }) => ({
  name: "mdx-docs-prerender",
  apply: "build",
  async closeBundle() {
    const temporaryDirectory = await mkdtemp(
      join(rootDir, ".mdx-docs-prerender-")
    );

    try {
      const serverEntry = resolve(rootDir, entry);
      const serverRenderer = fileURLToPath(
        new URL("../dist/server.js", import.meta.url)
      );
      const serverOutput = join(temporaryDirectory, "server");
      const prerenderEntry = join(temporaryDirectory, "entry.mjs");
      const custom404Path = resolve(rootDir, "pages/404.mdx");
      const hasCustom404 = existsSync(custom404Path);

      await writeFile(
        prerenderEntry,
        `
          import ${JSON.stringify(serverEntry)};
          export {
            getPrerenderPages,
            renderPage
          } from ${JSON.stringify(serverRenderer)};
        `
      );

      await build({
        configFile: false,
        root: rootDir,
        base,
        logLevel: "warn",
        plugins: [
          create404Plugin({ hasCustom404 }),
          react(),
          createMdxPlugin(),
        ],
        resolve: {
          alias: {
            "@pages": fileURLToPath(
              new URL("./pages", `file://${rootDir}/`)
            ),
          },
        },
        ssr: {
          noExternal: ["@quietmind/mdx-docs"],
        },
        build: {
          ssr: prerenderEntry,
          outDir: serverOutput,
          emptyOutDir: true,
          rollupOptions: {
            output: {
              entryFileNames: "entry.mjs",
            },
          },
        },
      });

      const serverModuleUrl = `${pathToFileURL(
        join(serverOutput, "entry.mjs")
      ).href}?t=${Date.now()}`;
      const { getPrerenderPages, renderPage } = await import(serverModuleUrl);
      const pages = getPrerenderPages();
      const outputDirectory = resolve(rootDir, outDir);
      const template = await readFile(
        join(outputDirectory, "index.html"),
        "utf8"
      );

      for (const page of pages) {
        const appHtml = await renderPage(page.route, base);
        const pageHtml = injectPrerenderedApp(
          applyPageMetadata(template, page),
          appHtml
        );
        const outputPath = getRouteOutputPath(outputDirectory, page.route);

        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, pageHtml);
      }

      await writeSiteFiles({ pages, template, base, outputDirectory });
    } finally {
      await rm(temporaryDirectory, { force: true, recursive: true });
    }
  },
});

const writeSiteFiles = async ({ pages, template, base, outputDirectory }) => {
  const baseUrl = getCanonicalBaseUrl(template);
  if (!baseUrl) {
    console.warn(
      '[mdx-docs] Skipping sitemap.xml — set "url" in config/site.js to enable it.'
    );
    return;
  }

  const routes = pages
    .filter((page) => !page.excludeFromSitemap)
    .map((page) => page.route);
  await writeFile(
    join(outputDirectory, "sitemap.xml"),
    generateSitemap(routes, baseUrl)
  );

  if (base !== "/") return;
  const robotsPath = join(outputDirectory, "robots.txt");
  if (!existsSync(robotsPath)) {
    await writeFile(robotsPath, generateRobotsTxt(baseUrl));
  }
};

export function createMdxDocsConfig({
  rootDir,
  base = "/",
  site = {},
  entry = "main.jsx",
  outDir = "dist",
  prerender = true,
} = {}) {
  const custom404Path = resolve(rootDir, "pages/404.mdx");
  const hasCustom404 = existsSync(custom404Path);

  return {
    base,
    plugins: [
      create404Plugin({ hasCustom404 }),
      {
        name: "html-site-config",
        transformIndexHtml: (html) =>
          injectVersionAttribute(
            injectGeneratorTag(
              injectSiteUrlTags(
                html
                  .replaceAll("%SITE_NAME%", site.name ?? "")
                  .replaceAll("%SITE_DESCRIPTION%", site.description ?? ""),
                site.url
              )
            ),
            packageVersion
          ),
      },
      react(),
      createMdxPlugin(),
      prerender &&
        createPrerenderPlugin({ rootDir, base, entry, outDir }),
      createPreviewTrailingSlashPlugin(),
    ],
    build: {
      outDir,
    },
    // Compiled MDX imports these, but Vite's dependency scan can't read .mdx
    // files. Without this, the first dev load re-optimizes and reloads with
    // two copies of React.
    optimizeDeps: {
      include: ["@emotion/react/jsx-dev-runtime", "@mdx-js/react"],
    },
    resolve: {
      alias: {
        "@pages": fileURLToPath(new URL("./pages", `file://${rootDir}/`)),
      },
    },
  };
}
