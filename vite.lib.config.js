import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/createApp.jsx"),
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
