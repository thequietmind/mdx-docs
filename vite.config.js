import { existsSync } from "fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { build, defineConfig } from "vite";

import { site } from "./example/config/site.js";
import {
  applyPageMetadata,
  getRouteOutputPath,
  injectPrerenderedApp,
} from "./src/prerenderHtml.js";
import { rehypeUnwrapJsxParagraphs } from "./src/vite.config.helper.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const VIRTUAL_404_ID = "virtual:mdx-docs/404";
const RESOLVED_VIRTUAL_404_ID = "\0" + VIRTUAL_404_ID;
const custom404Path = resolve(__dirname, "example/pages/404.mdx");
const hasCustom404 = existsSync(custom404Path);
const builtInNotFoundPath = resolve(__dirname, "src/components/NotFound.jsx");
const pagesDir = resolve(__dirname, "example/pages");

const create404Plugin = () => ({
  name: "mdx-docs-404",
  resolveId(id) {
    if (id === VIRTUAL_404_ID) return RESOLVED_VIRTUAL_404_ID;
  },
  load(id) {
    if (id === RESOLVED_VIRTUAL_404_ID) {
      if (hasCustom404) {
        return `export { default } from "@pages/404.mdx";`;
      }
      return `export { default } from ${JSON.stringify(builtInNotFoundPath)};`;
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

const createSitePrerenderPlugin = () => ({
  name: "mdxdocs-site-prerender",
  apply: "build",
  async closeBundle() {
    const temporaryDirectory = await mkdtemp(
      join(__dirname, ".mdx-docs-prerender-")
    );

    try {
      const prerenderEntry = join(temporaryDirectory, "entry.mjs");
      const serverOutput = join(temporaryDirectory, "server");

      await writeFile(
        prerenderEntry,
        `
          import ${JSON.stringify(resolve(__dirname, "src/main.jsx"))};
          export {
            getPrerenderPages,
            renderPage
          } from ${JSON.stringify(resolve(__dirname, "src/server.jsx"))};
        `
      );

      await build({
        configFile: false,
        root: __dirname,
        base: "/",
        logLevel: "warn",
        plugins: [create404Plugin(), react(), createMdxPlugin()],
        resolve: {
          alias: { "@pages": pagesDir },
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
      const outputDirectory = resolve(__dirname, "dist");
      const template = await readFile(
        join(outputDirectory, "index.html"),
        "utf8"
      );

      for (const page of getPrerenderPages()) {
        const appHtml = await renderPage(page.route, "/");
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

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/" : "/",
  plugins: [
    create404Plugin(),
    {
      name: "html-site-config",
      transformIndexHtml: (html) =>
        html
          .replace("%SITE_NAME%", site.name)
          .replace("%SITE_DESCRIPTION%", site.description ?? ""),
    },
    react(),
    createMdxPlugin(),
    createSitePrerenderPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split React and React DOM into their own chunk
          if (id.includes("react/") || id.includes("react-dom/") || id.includes("scheduler/")) {
            return "react-vendor";
          }
          // Keep Material-UI and Emotion in main bundle to ensure proper initialization
          // before lazy-loaded MDX components that use Material-UI
          // Split MDX related code into its own chunk
          if (id.includes("@mdx-js/")) {
            return "mdx";
          }
          // Split router into its own chunk
          if (id.includes("react-router")) {
            return "router";
          }
          // Split prism (syntax highlighting) into its own chunk
          // This is only loaded when code blocks are rendered
          if (id.includes("prism-react-renderer")) {
            return "prism";
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: "esbuild",
    // Optimize for production
    cssCodeSplit: true,
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: "esnext",
  },
  resolve: {
    alias: {
      "@pages": fileURLToPath(new URL("./example/pages", import.meta.url)),
    },
  },
}));
