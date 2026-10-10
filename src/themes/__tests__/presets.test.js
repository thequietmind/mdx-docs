import { describe, it, expect } from "vitest";

import { createAppTheme, usesModeSpecificSettings } from "../index";
import { themes } from "../presets";

const schemePalette = (theme, mode) => theme.colorSchemes[mode].palette;

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

  it("each preset should produce a valid theme with both color schemes", () => {
    for (const [name, preset] of Object.entries(themes)) {
      expect(() => createAppTheme(preset), `preset "${name}"`).not.toThrow();
      const theme = createAppTheme(preset);
      expect(schemePalette(theme, "light").mode).toBe("light");
      expect(schemePalette(theme, "dark").mode).toBe("dark");
    }
  });

  it("each preset should only set the palette per mode", () => {
    for (const [name, preset] of Object.entries(themes)) {
      expect(usesModeSpecificSettings(preset), `preset "${name}"`).toBe(false);
    }
  });

  it("themes.default should produce the same primary as no theme", () => {
    const a = createAppTheme();
    const b = createAppTheme(themes.default);
    expect(schemePalette(a, "light").primary.main).toBe(
      schemePalette(b, "light").primary.main
    );
    expect(schemePalette(a, "light").background.default).toBe(
      schemePalette(b, "light").background.default
    );
  });

  it("themes.ocean should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme(themes.ocean);
    expect(schemePalette(theme, "light").primary.main).toBe("#0077b6");
  });

  it("themes.ocean should use dark-specific primary in dark mode", () => {
    const theme = createAppTheme(themes.ocean);
    expect(schemePalette(theme, "dark").primary.main).toBe("#48cae4");
  });

  it("themes.forest should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme(themes.forest);
    expect(schemePalette(theme, "light").primary.main).toBe("#2d6a4f");
  });

  it("themes.rose should set the correct primaryColor in light mode", () => {
    const theme = createAppTheme(themes.rose);
    expect(schemePalette(theme, "light").primary.main).toBe("#be123c");
  });
});
