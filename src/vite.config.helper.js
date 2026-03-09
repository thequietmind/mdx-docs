import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

/**
 * Creates a base Vite config for an mdx-docs site.
 *
 * @param {object} options
 * @param {string} options.rootDir - The site's root directory (pass `import.meta.dirname`)
 * @param {string} [options.base="/"] - The base URL for the site
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
export function createMdxDocsConfig({ rootDir, base = "/" } = {}) {
  return {
    base,
    plugins: [
      react(),
      mdx({
        jsxImportSource: "@emotion/react",
        providerImportSource: "@mdx-js/react",
      }),
    ],
    resolve: {
      alias: {
        "@pages": fileURLToPath(new URL("./pages", `file://${rootDir}/`)),
      },
    },
  };
}
