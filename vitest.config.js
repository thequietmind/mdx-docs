import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    mdx({
      jsxImportSource: "@emotion/react",
      providerImportSource: "@mdx-js/react",
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        'src/main.jsx',
        'example/**',
        'src/__mocks__/**',
        '*.config.js',
        '*.config.cjs',
        'vite.config.js',
        'vitest.config.js',
        'eslint.config.js',
        'src/App.jsx',
        'src/components/MDXContent.jsx',
        'src/components/InlineCode.jsx',
        'scripts/**'
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70
      }
    }
  },
  resolve: {
    alias: {}
  }
});