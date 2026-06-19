import { join } from "path";

export const getRouteOutputPath = (outDir, route) => {
  if (!route.startsWith("/") || route.includes("*") || route.includes(":")) {
    throw new Error(
      `[mdx-docs] Cannot prerender dynamic route "${route}". Routes must be static paths beginning with "/".`
    );
  }

  const segments = route.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error(`[mdx-docs] Invalid page route "${route}".`);
  }

  return segments.length === 0
    ? join(outDir, "index.html")
    : join(outDir, ...segments, "index.html");
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const CANONICAL_TAG_PATTERN =
  /<link\b(?=[^>]*\brel=(["'])canonical\1)[^>]*>/i;

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

export const getCanonicalBaseUrl = (html) => {
  const canonicalHref = html
    .match(CANONICAL_TAG_PATTERN)?.[0]
    ?.match(/\bhref=(["'])(.*?)\1/i)?.[2];
  if (!canonicalHref) return null;

  return canonicalHref.endsWith("/") ? canonicalHref : `${canonicalHref}/`;
};

export const buildPageUrl = (route, baseUrl) =>
  new URL(route === "/" ? "." : route.slice(1), baseUrl).href;

const applyPageUrl = (html, route) => {
  const canonicalTag = html.match(CANONICAL_TAG_PATTERN)?.[0];
  const baseUrl = getCanonicalBaseUrl(html);
  if (!canonicalTag || !baseUrl) return html;

  const pageUrl = buildPageUrl(route, baseUrl);
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

export const injectGeneratorTag = (html) =>
  replaceMetaContent(html, "name", "generator", "@quietmind/mdx-docs");

export const injectVersionAttribute = (html, version) => {
  if (!version) return html;

  const htmlTagPattern = /<html\b([^>]*)>/i;
  const match = html.match(htmlTagPattern);
  if (!match) return html;

  const versionAttributePattern =
    /\s+data-mdx-docs-version=(["'])[\s\S]*?\1/i;
  const attribute = ` data-mdx-docs-version="${escapeHtml(version)}"`;
  const attributes = versionAttributePattern.test(match[1])
    ? match[1].replace(versionAttributePattern, attribute)
    : `${match[1]}${attribute}`;

  return html.replace(htmlTagPattern, () => `<html${attributes}>`);
};

export const injectSiteUrlTags = (html, siteUrl) => {
  if (!siteUrl) return html;

  const baseHref = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  let output = html;
  if (!CANONICAL_TAG_PATTERN.test(output)) {
    output = output.replace(
      "</head>",
      `  <link rel="canonical" href="${escapeHtml(baseHref)}" />\n</head>`
    );
  }

  return replaceMetaContent(output, "property", "og:url", baseHref);
};

export const generateSitemap = (routes, baseUrl) => {
  const entries = routes
    .map((route) => buildPageUrl(route, baseUrl))
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};

export const generateRobotsTxt = (baseUrl) =>
  `User-agent: *\nAllow: /\nSitemap: ${baseUrl}sitemap.xml\n`;

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
