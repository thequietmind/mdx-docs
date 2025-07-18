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
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        'src/main.jsx',
        'src/contents/**',
        'src/__mocks__/**',
        '*.config.js',
        '*.config.cjs',
        'vite.config.js',
        'vitest.config.js',
        'eslint.config.js',
        'src/App.jsx',
        'src/components/MDXContent.jsx',
        'src/components/InlineCode.jsx'
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
    alias: {
      // Mock MDX files in tests
      '../contents/button.mdx': '/src/__mocks__/mdxMock.js',
      '../contents/colors.mdx': '/src/__mocks__/mdxMock.js',
      '../contents/home.mdx': '/src/__mocks__/mdxMock.js',
      '../contents/typography.mdx': '/src/__mocks__/mdxMock.js'
    }
  }
});