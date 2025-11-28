import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/mdx-docs/" : "/",
  plugins: [
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
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
}));
