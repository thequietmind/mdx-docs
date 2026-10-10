import { createTheme } from "@mui/material";
import { describe, expect, it } from "vitest";

import { createAppTheme, darkTheme, lightTheme } from "../../themes";

import { createPrismTheme, getCodePalette } from "../prismTheme";

describe("getCodePalette", () => {
  it("uses CSS variables from a color scheme theme", () => {
    const palette = getCodePalette(createAppTheme());

    expect(palette.code.keyword).toMatch(/^var\(--mui-palette-code-keyword/);
    expect(palette.text.primary).toMatch(/^var\(--mui-palette-text-primary/);
    expect(palette.background.paper).toMatch(/^var\(--mui-palette-background-paper/);
  });

  it.each([
    ["light", lightTheme],
    ["dark", darkTheme],
  ])(
    "falls back to the built-in %s colors for a theme without palette.code",
    (mode, builtIn) => {
      const palette = getCodePalette(createTheme({ palette: { mode } }));

      expect(palette.code).toEqual(builtIn.palette.code);
    }
  );
});

describe("createPrismTheme", () => {
  it("maps token types to the code colors and keeps the plain style", () => {
    const plain = { color: "black" };
    const theme = createPrismTheme(lightTheme.palette.code, plain);
    const styleFor = (type) =>
      theme.styles.find((entry) => entry.types.includes(type)).style.color;

    expect(theme.plain).toBe(plain);
    expect(styleFor("comment")).toBe(lightTheme.palette.code.comment);
    expect(styleFor("keyword")).toBe(lightTheme.palette.code.keyword);
    expect(styleFor("class-name")).toBe(lightTheme.palette.code.className);
  });
});
