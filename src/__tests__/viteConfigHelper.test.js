import { describe, expect, it } from "vitest";

import {
  applyPageMetadata,
  injectPrerenderedApp,
} from "../prerenderHtml.js";

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
