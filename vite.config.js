import { existsSync } from "fs";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

import { site } from "./example/config/site.js";
import remarkGfm from "remark-gfm";
import { rehypeUnwrapJsxParagraphs } from "./src/vite.config.helper.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const VIRTUAL_404_ID = "virtual:mdx-docs/404";
const RESOLVED_VIRTUAL_404_ID = "\0" + VIRTUAL_404_ID;
const custom404Path = resolve(__dirname, "example/pages/404.mdx");
const hasCustom404 = existsSync(custom404Path);
const builtInNotFoundPath = resolve(__dirname, "src/components/NotFound.jsx");

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/" : "/",
  plugins: [
    {
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
    },
    {
      name: "html-site-config",
      transformIndexHtml: (html) =>
        html
          .replace("%SITE_NAME%", site.name)
          .replace("%SITE_DESCRIPTION%", site.description ?? ""),
    },
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeUnwrapJsxParagraphs],
    }),
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
