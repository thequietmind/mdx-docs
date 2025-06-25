import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/mdx-docs/",
  plugins: [
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
    }),
  ],
});
