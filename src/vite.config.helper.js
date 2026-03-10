import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

/**
 * Creates a base Vite config for an mdx-docs site.
 *
 * @param {object} options
 * @param {string} options.rootDir - The site's root directory (pass `import.meta.dirname`)
 * @param {string} [options.base="/"] - The base URL for the site
 * @param {object} [options.site] - The site config object (from `config/site.js`)
 * @param {string} [options.site.name] - Site name, replaces `%SITE_NAME%` in index.html
 * @param {string} [options.site.description] - Site description, replaces `%SITE_DESCRIPTION%` in index.html
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
export function createMdxDocsConfig({ rootDir, base = "/", site = {} } = {}) {
  return {
    base,
    plugins: [
      {
        name: "html-site-config",
        transformIndexHtml: (html) =>
          html
            .replace("%SITE_NAME%", site.name ?? "")
            .replace("%SITE_DESCRIPTION%", site.description ?? ""),
      },
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
