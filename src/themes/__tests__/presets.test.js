import { describe, it, expect } from "vitest";

import { createAppTheme } from "../index";
import { themes } from "../presets";

describe("Theme presets", () => {
  it("should export expected preset keys", () => {
    expect(themes).toHaveProperty("default");
    expect(themes).toHaveProperty("ocean");
    expect(themes).toHaveProperty("forest");
    expect(themes).toHaveProperty("rose");
  });

  it("themes.default should be an empty object", () => {
    expect(themes.default).toEqual({});
  });

  it("each preset should produce a valid MUI theme in light mode", () => {
    for (const [name, preset] of Object.entries(themes)) {
      expect(() => createAppTheme("light", preset), `preset "${name}" light`).not.toThrow();
      const theme = createAppTheme("light", preset);
      expect(theme.palette.mode).toBe("light");
    }
  });

  it("each preset should produce a valid MUI theme in dark mode", () => {
    for (const [name, preset] of Object.entries(themes)) {
      expect(() => createAppTheme("dark", preset), `preset "${name}" dark`).not.toThrow();
      const theme = createAppTheme("dark", preset);
      expect(theme.palette.mode).toBe("dark");
    }
  });

  it("themes.default should produce the same primary as no theme", () => {
    const a = createAppTheme("light");
    const b = createAppTheme("light", themes.default);
    expect(a.palette.primary.main).toBe(b.palette.primary.main);
    expect(a.palette.background.default).toBe(b.palette.background.default);
  });

  it("themes.ocean should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme("light", themes.ocean);
    expect(theme.palette.primary.main).toBe("#0077b6");
  });

  it("themes.ocean should use dark-specific primary in dark mode", () => {
    const theme = createAppTheme("dark", themes.ocean);
    expect(theme.palette.primary.main).toBe("#48cae4");
  });

  it("themes.forest should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme("light", themes.forest);
    expect(theme.palette.primary.main).toBe("#2d6a4f");
  });

  it("themes.rose should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme("light", themes.rose);
    expect(theme.palette.primary.main).toBe("#be123c");
  });
});
