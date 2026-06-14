import { existsSync } from "fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "fs/promises";
import { dirname, join, resolve } from "path";
import { pathToFileURL, fileURLToPath } from "url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { build } from "vite";

import {
  applyPageMetadata,
  getRouteOutputPath,
  injectPrerenderedApp,
} from "./prerenderHtml.js";

/**
 * Rehype plugin that removes <p> wrappers MDX generates around text children
 * of JSX flow elements. This happens because Prettier formats JSX text onto
 * its own line, which MDX interprets as a paragraph. The unwrapping only
 * applies to <p> elements whose children are all plain text nodes — explicit
 * block content is left untouched.
 */
export function rehypeUnwrapJsxParagraphs() {
  function processNode(node) {
    if (!node.children) return;
    node.children.forEach(processNode);
    if (node.type === "mdxJsxFlowElement") {
      node.children = node.children.flatMap((child) => {
        if (
          child.type === "element" &&
          child.tagName === "p" &&
          child.children.every((c) => c.type === "text")
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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeUnwrapJsxParagraphs],
  });

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
    } finally {
      await rm(temporaryDirectory, { force: true, recursive: true });
    }
  },
});

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
          html
            .replace("%SITE_NAME%", site.name ?? "")
            .replace("%SITE_DESCRIPTION%", site.description ?? ""),
      },
      react(),
      createMdxPlugin(),
      prerender &&
        createPrerenderPlugin({ rootDir, base, entry, outDir }),
    ],
    build: {
      outDir,
    },
    resolve: {
      alias: {
        "@pages": fileURLToPath(new URL("./pages", `file://${rootDir}/`)),
      },
    },
  };
}
