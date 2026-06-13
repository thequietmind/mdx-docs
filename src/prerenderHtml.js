const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const replaceTitle = (html, title) => {
  if (!title) return html;

  const titleTag = `<title>${escapeHtml(title)}</title>`;
  return /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, titleTag)
    : html.replace("</head>", `  ${titleTag}\n</head>`);
};

const replaceMetaContent = (html, attribute, value, content) => {
  if (!content) return html;

  const escapedAttribute = escapeRegExp(attribute);
  const escapedValue = escapeRegExp(value);
  const metaPattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${escapedAttribute}=(["'])${escapedValue}\\1)[^>]*>`,
    "i"
  );
  const existingTag = html.match(metaPattern)?.[0];
  const escapedContent = escapeHtml(content);

  if (!existingTag) {
    return html.replace(
      "</head>",
      `  <meta ${attribute}="${escapeHtml(value)}" content="${escapedContent}" />\n</head>`
    );
  }

  const contentPattern = /\bcontent=(["'])[\s\S]*?\1/i;
  const updatedTag = contentPattern.test(existingTag)
    ? existingTag.replace(contentPattern, `content="${escapedContent}"`)
    : existingTag.replace(/\/?>$/, ` content="${escapedContent}" />`);

  return html.replace(existingTag, updatedTag);
};

const applyPageUrl = (html, route) => {
  const canonicalPattern =
    /<link\b(?=[^>]*\brel=(["'])canonical\1)[^>]*>/i;
  const canonicalTag = html.match(canonicalPattern)?.[0];
  const canonicalHref = canonicalTag?.match(/\bhref=(["'])(.*?)\1/i)?.[2];
  if (!canonicalTag || !canonicalHref) return html;

  const baseUrl = canonicalHref.endsWith("/")
    ? canonicalHref
    : `${canonicalHref}/`;
  const pageUrl = new URL(route === "/" ? "." : route.slice(1), baseUrl).href;
  const updatedCanonical = canonicalTag.replace(
    /\bhref=(["'])[\s\S]*?\1/i,
    `href="${escapeHtml(pageUrl)}"`
  );
  const output = html.replace(canonicalTag, updatedCanonical);

  return replaceMetaContent(output, "property", "og:url", pageUrl);
};

export const applyPageMetadata = (html, page) => {
  let output = replaceTitle(html, page.title);
  output = replaceMetaContent(
    output,
    "name",
    "description",
    page.description
  );
  output = replaceMetaContent(output, "property", "og:title", page.title);
  output = replaceMetaContent(
    output,
    "property",
    "og:description",
    page.description
  );
  output = replaceMetaContent(output, "name", "twitter:title", page.title);
  output = replaceMetaContent(
    output,
    "name",
    "twitter:description",
    page.description
  );
  output = applyPageUrl(output, page.route);
  return output;
};

export const injectPrerenderedApp = (html, appHtml) => {
  const rootPattern =
    /<div(?=[^>]*\bid=(["'])root\1)[^>]*>\s*<\/div>/i;

  if (!rootPattern.test(html)) {
    throw new Error(
      '[mdx-docs] Could not find an empty <div id="root"></div> in index.html.'
    );
  }

  return html.replace(
    rootPattern,
    `<div id="root" data-mdx-docs-theme="dark">${appHtml}</div>`
  );
};
