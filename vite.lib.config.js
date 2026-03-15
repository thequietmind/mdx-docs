import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const VIRTUAL_404_ID = "virtual:mdx-docs/404";
const RESOLVED_VIRTUAL_404_ID = "\0" + VIRTUAL_404_ID;

export default defineConfig({
  plugins: [
    {
      name: "mdx-docs-404",
      resolveId(id) {
        if (id === VIRTUAL_404_ID) return RESOLVED_VIRTUAL_404_ID;
      },
      load(id) {
        if (id === RESOLVED_VIRTUAL_404_ID) {
          const notFoundPath = resolve(__dirname, "src/components/NotFound.jsx");
          return `export { default } from ${JSON.stringify(notFoundPath)};`;
        }
      },
    },
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@emotion\//,
        /^@mui\//,
        /^@mdx-js\//,
        "react-router-dom",
        "prism-react-renderer",
        "prismjs",
      ],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
