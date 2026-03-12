import { existsSync } from "fs";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

/**
 * Rehype plugin that removes <p> wrappers MDX generates around text children
 * of JSX flow elements. This happens because Prettier formats JSX text onto
 * its own line, which MDX interprets as a paragraph. The unwrapping only
 * applies to <p> elements whose children are all plain text nodes — explicit
 * block content is left untouched.
 */
export function rehypeUnwrapJsxParagraphs() {
  function processNode(node) {
    if (!node.children) return;
    node.children.forEach(processNode);
    if (node.type === "mdxJsxFlowElement") {
      node.children = node.children.flatMap((child) => {
        if (
          child.type === "element" &&
          child.tagName === "p" &&
          child.children.every((c) => c.type === "text")
        ) {
          return child.children;
        }
        return [child];
      });
    }
  }
  return processNode;
}

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
const VIRTUAL_404_ID = "virtual:mdx-docs/404";
const RESOLVED_VIRTUAL_404_ID = "\0" + VIRTUAL_404_ID;

export function createMdxDocsConfig({ rootDir, base = "/", site = {} } = {}) {
  const custom404Path = resolve(rootDir, "pages/404.mdx");
  const hasCustom404 = existsSync(custom404Path);

  return {
    base,
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
            return `export { NotFound as default } from "@quietmind/mdx-docs";`;
          }
        },
      },
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
        rehypePlugins: [rehypeUnwrapJsxParagraphs],
      }),
    ],
    resolve: {
      alias: {
        "@pages": fileURLToPath(new URL("./pages", `file://${rootDir}/`)),
      },
    },
  };
}
