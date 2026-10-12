// @vitest-environment node
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

import { build } from "vite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../..", import.meta.url));

const siteFiles = {
  // Without its own package.json, the site would resolve "@quietmind/mdx-docs"
  // to this repo through Node's package self-reference.
  "package.json": JSON.stringify({ private: true, type: "module" }),
  "index.html": `<!doctype html>
<html>
  <head><title>%SITE_NAME%</title></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>`,
  "main.jsx": `import { createApp } from "@quietmind/mdx-docs";
import { lazy } from "react";

createApp({
  site: { name: "Fixture", url: "https://example.com" },
  pages: [
    {
      name: "Home",
      route: "/",
      component: lazy(() => import("./pages/Home.jsx")),
    },
    {
      name: "Color mode",
      route: "/color-mode",
      component: lazy(() => import("./pages/ColorMode.jsx")),
    },
    {
      name: "Nested theme",
      route: "/nested-theme",
      component: lazy(() => import("./pages/NestedTheme.jsx")),
    },
  ],
});`,
  "pages/Home.jsx": `export default function Home() {
  return <p>Costs $17.11 a month</p>;
}`,
  "pages/ColorMode.jsx": `import { useColorMode } from "@quietmind/mdx-docs";

export default function ColorMode() {
  const { darkMode } = useColorMode();
  return <p>{\`Rendered in \${darkMode ? "dark" : "light"} mode\`}</p>;
}`,
  "pages/NestedTheme.jsx": `import { Box, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mdx-docs-color-scheme",
    cssVarPrefix: "nested",
  },
  colorSchemes: { light: true, dark: true },
});

export default function NestedTheme() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ color: "text.primary" }}>Nested theme</Box>
    </ThemeProvider>
  );
}`,
};

const writeFiles = (directory, files) => {
  for (const [path, contents] of Object.entries(files)) {
    mkdirSync(dirname(join(directory, path)), { recursive: true });
    writeFileSync(join(directory, path), contents);
  }
};

// Installs the package the way npm lays it out, so the site imports it by name
// and the prerender runs from the published vite helper, as it does for sites.
const installPackage = async (packageDirectory) => {
  await build({
    root,
    configFile: join(root, "vite.lib.config.js"),
    logLevel: "silent",
    build: { outDir: join(packageDirectory, "dist") },
  });

  for (const file of [
    "package.json",
    "src/prerenderHtml.js",
    "src/vite.config.helper.js",
  ]) {
    cpSync(join(root, file), join(packageDirectory, file));
  }
};

describe("site prerender", () => {
  let fixtureDirectory;
  let siteDirectory;

  const readPage = (path) =>
    readFileSync(join(siteDirectory, "dist", path), "utf8");

  beforeAll(async () => {
    // Inside the repo so the fixture resolves react and MUI from node_modules.
    fixtureDirectory = mkdtempSync(join(root, ".prerender-fixture-"));
    const packageDirectory = join(
      fixtureDirectory,
      "node_modules/@quietmind/mdx-docs"
    );
    siteDirectory = join(fixtureDirectory, "site");

    await installPackage(packageDirectory);
    writeFiles(siteDirectory, siteFiles);

    const { createMdxDocsConfig } = await import(
      pathToFileURL(join(packageDirectory, "src/vite.config.helper.js")).href
    );
    await build({
      configFile: false,
      logLevel: "silent",
      root: siteDirectory,
      ...createMdxDocsConfig({
        rootDir: siteDirectory,
        site: { name: "Fixture", url: "https://example.com" },
      }),
    });
  }, 60000);

  afterAll(() => {
    if (fixtureDirectory) {
      rmSync(fixtureDirectory, { force: true, recursive: true });
    }
  });

  it("renders lazy pages that read the color mode context", () => {
    const html = readPage("color-mode/index.html");

    expect(html).toContain("Rendered in light mode");
    expect(html).not.toContain("<!--$!-->");
  });

  it("keeps $ patterns in page content", () => {
    expect(readPage("index.html")).toContain("<p>Costs $17.11 a month</p>");
  });

  it.each([
    ["index.html", "--mui-palette-"],
    ["nested-theme/index.html", "--nested-palette-"],
  ])("defines the theme variables in the head of %s", (path, variable) => {
    const html = readPage(path);
    const head = html.slice(0, html.indexOf("</head>"));
    const body = html.slice(html.indexOf("</head>"));

    expect(head).toContain('[data-mdx-docs-color-scheme="dark"]{');
    expect(head).toContain(variable);
    expect(head.indexOf("data-mdx-docs-color-scheme-script")).toBeLessThan(
      head.indexOf('data-emotion="css-global')
    );
    expect(body).not.toContain('data-emotion="css-global');
  });
});
