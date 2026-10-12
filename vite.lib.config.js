import { resolve } from "path";
import { fileURLToPath } from "url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const VIRTUAL_404_ID = "virtual:mdx-docs/404";
// The package's own "./404" export, which resolves to the built-in NotFound
// unless the site's Vite config swaps in its pages/404.mdx.
const PACKAGE_404_ID = "@quietmind/mdx-docs/404";

export default defineConfig({
  publicDir: false,
  // Lib mode replaces import.meta.env.BASE_URL with this build's base ("/"),
  // which would pin every site to the root path. Leave it for the site's own
  // Vite build to replace, and fall back to "/" where nothing defines it.
  define: {
    "import.meta.env.BASE_URL": '(import.meta.env?.BASE_URL ?? "/")',
  },
  plugins: [
    {
      name: "mdx-docs-404",
      resolveId(id) {
        if (id === VIRTUAL_404_ID) return { id: PACKAGE_404_ID, external: true };
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
      entry: {
        index: resolve(__dirname, "src/index.js"),
        server: resolve(__dirname, "src/server.jsx"),
        404: resolve(__dirname, "src/components/NotFound.jsx"),
      },
      cssFileName: "index",
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
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
        /^node:/,
      ],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
