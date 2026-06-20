// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  applyPageMetadata,
  generateRobotsTxt,
  generateSitemap,
  getCanonicalBaseUrl,
  getRouteOutputPath,
  injectGeneratorTag,
  injectPrerenderedApp,
  injectSiteUrlTags,
  injectVersionAttribute,
} from "../prerenderHtml.js";
import { createMdxDocsConfig } from "../vite.config.helper.js";

const template = `<!doctype html>
<html>
  <head>
    <meta name="description" content="Default description" />
    <meta property="og:title" content="Default title" />
    <meta property="og:description" content="Default description" />
    <meta property="og:url" content="https://example.com/" />
    <meta name="twitter:title" content="Default title" />
    <meta name="twitter:description" content="Default description" />
    <link rel="canonical" href="https://example.com/" />
    <title>Default title</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

describe("prerender HTML helpers", () => {
  it("applies page metadata to existing tags", () => {
    const html = applyPageMetadata(template, {
      route: "/setup",
      title: "Docs & Setup",
      description: 'Configure "everything" safely.',
    });

    expect(html).toContain("<title>Docs &amp; Setup</title>");
    expect(html).toContain(
      'name="description" content="Configure &quot;everything&quot; safely."'
    );
    expect(html).toContain(
      'property="og:title" content="Docs &amp; Setup"'
    );
    expect(html).toContain(
      'name="twitter:title" content="Docs &amp; Setup"'
    );
    expect(html).toContain(
      '<link rel="canonical" href="https://example.com/setup"'
    );
    expect(html).toContain(
      'property="og:url" content="https://example.com/setup"'
    );
  });

  it("adds missing metadata tags", () => {
    const html = applyPageMetadata(
      "<html><head></head><body></body></html>",
      {
        route: "/new-page",
        title: "New page",
        description: "New description",
      }
    );

    expect(html).toContain("<title>New page</title>");
    expect(html).toContain(
      '<meta name="description" content="New description" />'
    );
  });

  it("injects prerendered markup into the app root", () => {
    const html = injectPrerenderedApp(template, "<main>Page content</main>");

    expect(html).toContain(
      '<div id="root" data-mdx-docs-theme="dark"><main>Page content</main></div>'
    );
  });

  it("rejects templates without an empty app root", () => {
    expect(() =>
      injectPrerenderedApp(
        '<div id="root"><main>Existing content</main></div>',
        "<main>New content</main>"
      )
    ).toThrow(/empty <div id="root">/);
  });
});

describe("getRouteOutputPath", () => {
  it("maps the home route to the output root index.html", () => {
    expect(getRouteOutputPath("dist", "/")).toBe("dist/index.html");
  });

  it("nests a route under its own directory", () => {
    expect(getRouteOutputPath("dist", "/examples")).toBe(
      "dist/examples/index.html"
    );
  });

  it("rejects dynamic routes", () => {
    expect(() => getRouteOutputPath("dist", "/posts/:id")).toThrow(
      /Cannot prerender dynamic route/
    );
    expect(() => getRouteOutputPath("dist", "/files/*")).toThrow(
      /Cannot prerender dynamic route/
    );
  });
});

describe("getCanonicalBaseUrl", () => {
  it("returns the canonical href with a trailing slash", () => {
    expect(
      getCanonicalBaseUrl('<link rel="canonical" href="https://example.com" />')
    ).toBe("https://example.com/");
    expect(
      getCanonicalBaseUrl('<link rel="canonical" href="https://example.com/" />')
    ).toBe("https://example.com/");
  });

  it("returns null when no canonical tag is present", () => {
    expect(getCanonicalBaseUrl("<head></head>")).toBeNull();
  });
});

describe("injectSiteUrlTags", () => {
  it("adds canonical and og:url tags from the site url", () => {
    const html = injectSiteUrlTags(
      "<html><head></head><body></body></html>",
      "https://example.com"
    );

    expect(html).toContain('<link rel="canonical" href="https://example.com/" />');
    expect(html).toContain(
      '<meta property="og:url" content="https://example.com/" />'
    );
  });

  it("does not add a second canonical tag when one already exists", () => {
    const html = injectSiteUrlTags(
      '<head><link rel="canonical" href="https://example.com/custom/" /></head>',
      "https://example.com"
    );

    expect(html).toContain(
      '<link rel="canonical" href="https://example.com/custom/" />'
    );
    expect(html.match(/rel=("|')canonical\1/g)).toHaveLength(1);
  });

  it("returns the html unchanged when no url is provided", () => {
    const input = "<html><head></head></html>";
    expect(injectSiteUrlTags(input, undefined)).toBe(input);
  });
});

describe("injectGeneratorTag", () => {
  it("adds the generator meta tag before the closing head", () => {
    const html = injectGeneratorTag("<html><head></head><body></body></html>");

    expect(html).toContain(
      '<meta name="generator" content="@quietmind/mdx-docs" />'
    );
  });

  it("does not add a second generator tag when one already exists", () => {
    const html = injectGeneratorTag(
      injectGeneratorTag("<html><head></head><body></body></html>")
    );

    expect(html.match(/name=("|')generator\1/g)).toHaveLength(1);
  });
});

describe("injectVersionAttribute", () => {
  it("adds the version attribute while preserving existing ones", () => {
    const html = injectVersionAttribute(
      '<html lang="en"><head></head></html>',
      "1.3.3"
    );

    expect(html).toContain(
      '<html lang="en" data-mdx-docs-version="1.3.3">'
    );
  });

  it("replaces an existing version attribute instead of duplicating it", () => {
    const html = injectVersionAttribute(
      '<html lang="en" data-mdx-docs-version="1.0.0"><head></head></html>',
      "1.3.3"
    );

    expect(html).toContain('data-mdx-docs-version="1.3.3"');
    expect(html.match(/data-mdx-docs-version=/g)).toHaveLength(1);
  });

  it("returns the html unchanged when no version is provided", () => {
    const input = '<html lang="en"><head></head></html>';
    expect(injectVersionAttribute(input, undefined)).toBe(input);
  });
});

describe("generateSitemap", () => {
  it("emits a loc entry for every route resolved against the base url", () => {
    const xml = generateSitemap(["/", "/examples"], "https://example.com/");

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    );
    expect(xml).toContain("<loc>https://example.com/</loc>");
    expect(xml).toContain("<loc>https://example.com/examples</loc>");
  });

  it("escapes XML-significant characters in urls", () => {
    const xml = generateSitemap(["/a&b"], "https://example.com/");
    expect(xml).toContain("<loc>https://example.com/a&amp;b</loc>");
  });
});

describe("generateRobotsTxt", () => {
  it("allows all crawlers and points to the sitemap", () => {
    expect(generateRobotsTxt("https://example.com/")).toBe(
      "User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n"
    );
  });
});

describe("createMdxDocsConfig html-site-config plugin", () => {
  const getTransform = (config) =>
    config.plugins
      .flat()
      .find((entry) => entry && entry.name === "html-site-config")
      .transformIndexHtml;

  it("replaces every occurrence of the site name and description placeholders", () => {
    const transformIndexHtml = getTransform(
      createMdxDocsConfig({
        rootDir: "/tmp/mdx-docs-test",
        site: { name: "My Docs", description: "All about docs" },
      })
    );

    const html = transformIndexHtml(`<html lang="en"><head>
  <title>%SITE_NAME%</title>
  <meta name="description" content="%SITE_DESCRIPTION%" />
  <meta property="og:title" content="%SITE_NAME%" />
  <meta property="og:description" content="%SITE_DESCRIPTION%" />
  <meta name="twitter:title" content="%SITE_NAME%" />
  <meta name="twitter:description" content="%SITE_DESCRIPTION%" />
</head><body><div id="root"></div></body></html>`);

    expect(html).not.toContain("%SITE_NAME%");
    expect(html).not.toContain("%SITE_DESCRIPTION%");
    expect(html.match(/My Docs/g)).toHaveLength(3);
    expect(html.match(/All about docs/g)).toHaveLength(3);
  });

  it("falls back to empty strings when site fields are missing", () => {
    const transformIndexHtml = getTransform(
      createMdxDocsConfig({ rootDir: "/tmp/mdx-docs-test" })
    );

    const html = transformIndexHtml(
      '<html><head><title>%SITE_NAME%</title>' +
        '<meta name="description" content="%SITE_DESCRIPTION%" />' +
        '</head><body><div id="root"></div></body></html>'
    );

    expect(html).not.toContain("%SITE_NAME%");
    expect(html).not.toContain("%SITE_DESCRIPTION%");
  });
});
