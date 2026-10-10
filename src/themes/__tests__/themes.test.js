import { describe, it, expect } from "vitest";

import { darkTheme } from "../darkTheme";
import {
  COLOR_SCHEME_ATTRIBUTE,
  createAppTheme,
  createLegacyAppTheme,
  usesModeSpecificSettings,
} from "../index";
import { lightTheme } from "../lightTheme";

const schemePalette = (theme, mode) => theme.colorSchemes[mode].palette;
const baselineOverrides = (theme) =>
  theme.components.MuiCssBaseline.styleOverrides(theme);

describe("Theme configuration", () => {
  describe("createAppTheme", () => {
    it("should create light and dark color schemes switched by the attribute", () => {
      const theme = createAppTheme();

      expect(schemePalette(theme, "light").mode).toBe("light");
      expect(schemePalette(theme, "dark").mode).toBe("dark");
      expect(theme.vars).toBeDefined();
      const [[selector, styles]] = Object.entries(
        theme.applyStyles("dark", { color: "red" })
      );
      expect(selector).toContain(`[${COLOR_SCHEME_ATTRIBUTE}="dark"]`);
      expect(styles).toEqual({ color: "red" });
    });

    it("should use the built-in palette for each scheme", () => {
      const theme = createAppTheme();

      expect(schemePalette(theme, "light").primary.main).toBe(
        lightTheme.palette.primary.main
      );
      expect(schemePalette(theme, "dark").background.default).toBe(
        darkTheme.palette.background.default
      );
    });

    it("should give each scheme its own code colors", () => {
      const theme = createAppTheme();

      expect(schemePalette(theme, "light").code.keyword).toBe(
        lightTheme.palette.code.keyword
      );
      expect(schemePalette(theme, "dark").code.keyword).toBe(
        darkTheme.palette.code.keyword
      );
      expect(theme.vars.palette.code.keyword).toContain("var(--");
    });

    it("should include typography settings", () => {
      const theme = createAppTheme();

      expect(theme.typography.fontFamily).toBeDefined();
      expect(theme.typography.h1).toBeDefined();
      expect(theme.typography.body1).toBeDefined();
    });

    it("should include component overrides", () => {
      const theme = createAppTheme();

      expect(theme.components).toBeDefined();
      expect(theme.components.MuiIconButton).toBeDefined();
    });

    it("should underline bare HTML anchors at rest and remove it on hover", () => {
      const anchor = baselineOverrides(createAppTheme()).a;

      expect(anchor.textDecoration).toBe("underline");
      expect(anchor["&:hover"].textDecoration).toBe("none");
    });

    it("should color bare HTML anchors with the primary color variable", () => {
      const theme = createAppTheme();

      expect(baselineOverrides(theme).a.color).toBe(
        theme.vars.palette.primary.main
      );
    });

    it("should style <kbd> as a key cap derived from currentColor", () => {
      const kbd = baselineOverrides(createAppTheme()).kbd;

      expect(kbd.display).toBe("inline-block");
      expect(kbd.border).toContain("currentColor");
      expect(kbd.backgroundColor).toContain("currentColor");
    });

    it("should underline markdown links at rest and remove it on hover", () => {
      const link = createAppTheme().components.MuiLink;

      expect(link.defaultProps.underline).toBe("none");
      expect(link.styleOverrides.root.textDecoration).toBe("underline");
      expect(link.styleOverrides.root["&:hover"].textDecoration).toBe("none");
    });

    it("should apply shorthand primaryColor to both schemes", () => {
      const theme = createAppTheme({ primaryColor: "#6200ea" });

      expect(schemePalette(theme, "light").primary.main).toBe("#6200ea");
      expect(schemePalette(theme, "dark").primary.main).toBe("#6200ea");
    });

    it("should apply shorthand fontFamily to every typography variant", () => {
      const theme = createAppTheme({ fontFamily: '"Inter", sans-serif' });

      expect(theme.typography.fontFamily).toBe('"Inter", sans-serif');
      expect(theme.typography.body1.fontFamily).toBe('"Inter", sans-serif');
      expect(theme.typography.h1.fontFamily).toBe('"Inter", sans-serif');
    });

    it("should apply top-level typography over the fontFamily shorthand", () => {
      const theme = createAppTheme({
        fontFamily: '"Inter", sans-serif',
        typography: { fontFamily: "Georgia, serif", h1: { fontWeight: 800 } },
      });

      expect(theme.typography.body1.fontFamily).toBe("Georgia, serif");
      expect(theme.typography.h1.fontWeight).toBe(800);
    });

    it("should apply top-level components and keep the built-in overrides", () => {
      const theme = createAppTheme({
        components: {
          MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
          MuiLink: { styleOverrides: { root: { color: "red" } } },
        },
      });

      expect(theme.components.MuiButton.styleOverrides.root.borderRadius).toBe(8);
      expect(theme.components.MuiIconButton).toBeDefined();
      expect(theme.components.MuiLink.defaultProps.underline).toBe("none");
      expect(theme.components.MuiLink.styleOverrides.root.textDecoration).toBe(
        "underline"
      );
    });

    it("should let a mode-specific palette win over the shorthand in that mode only", () => {
      const theme = createAppTheme({
        primaryColor: "#6200ea",
        dark: { palette: { primary: { main: "#bb86fc" } } },
      });

      expect(schemePalette(theme, "dark").primary.main).toBe("#bb86fc");
      expect(schemePalette(theme, "light").primary.main).toBe("#6200ea");
    });

    it("should not apply a light palette override to the dark scheme", () => {
      const theme = createAppTheme({
        light: { palette: { background: { default: "#f0f4f8" } } },
      });

      expect(schemePalette(theme, "light").background.default).toBe("#f0f4f8");
      expect(schemePalette(theme, "dark").background.default).toBe(
        darkTheme.palette.background.default
      );
    });

    it("should produce the same result with empty userTheme as with no userTheme", () => {
      const a = createAppTheme();
      const b = createAppTheme({});

      expect(schemePalette(a, "light").primary.main).toBe(
        schemePalette(b, "light").primary.main
      );
      expect(schemePalette(a, "dark").background.default).toBe(
        schemePalette(b, "dark").background.default
      );
    });
  });

  describe("usesModeSpecificSettings", () => {
    it("should be false for palette-only per-mode settings", () => {
      expect(usesModeSpecificSettings()).toBe(false);
      expect(
        usesModeSpecificSettings({
          primaryColor: "#6200ea",
          typography: { h1: { fontWeight: 800 } },
          light: { palette: { background: { default: "#fff" } } },
          dark: { palette: { primary: { main: "#bb86fc" } } },
        })
      ).toBe(false);
    });

    it("should be true when light or dark holds anything besides palette", () => {
      expect(
        usesModeSpecificSettings({ dark: { typography: { fontFamily: "Inter" } } })
      ).toBe(true);
      expect(
        usesModeSpecificSettings({ light: { components: { MuiButton: {} } } })
      ).toBe(true);
    });
  });

  describe("createLegacyAppTheme", () => {
    it.each(["light", "dark"])("should create a %s theme", (mode) => {
      const theme = createLegacyAppTheme(mode);
      const base = mode === "dark" ? darkTheme : lightTheme;

      expect(theme.palette.mode).toBe(mode);
      expect(theme.palette.background.default).toBe(
        base.palette.background.default
      );
      expect(theme.vars).toBeUndefined();
    });

    it("should apply mode-specific typography and components to that mode only", () => {
      const userTheme = {
        light: {
          typography: { h1: { fontWeight: 800 } },
          components: { MuiButton: { styleOverrides: { root: { borderRadius: 8 } } } },
        },
      };
      const light = createLegacyAppTheme("light", userTheme);
      const dark = createLegacyAppTheme("dark", userTheme);

      expect(light.typography.h1.fontWeight).toBe(800);
      expect(dark.typography.h1.fontWeight).not.toBe(800);
      expect(light.components.MuiButton).toBeDefined();
      expect(dark.components.MuiButton).toBeUndefined();
      expect(light.components.MuiIconButton).toBeDefined();
    });

    it("should apply shorthand fontFamily to every typography variant", () => {
      const theme = createLegacyAppTheme("dark", {
        fontFamily: '"Inter", sans-serif',
        dark: { spacing: 4 },
      });

      expect(theme.typography.body1.fontFamily).toBe('"Inter", sans-serif');
    });

    it("should color bare HTML anchors with the mode's primary color", () => {
      const theme = createLegacyAppTheme("dark", { primaryColor: "#6200ea" });

      expect(baselineOverrides(theme).a.color).toBe("#6200ea");
    });
  });

  describe("Light theme", () => {
    it("should have correct primary color", () => {
      expect(lightTheme.palette.primary.main).toBe("#1976d2");
    });

    it("should have correct background colors", () => {
      expect(lightTheme.palette.background.default).toBe("#fefefe");
      expect(lightTheme.palette.background.paper).toBe("#f5f5f5");
    });

    it("should have correct text colors", () => {
      expect(lightTheme.palette.text.primary).toBeDefined();
      expect(lightTheme.palette.text.secondary).toBeDefined();
    });
  });

  describe("Dark theme", () => {
    it("should have correct primary color", () => {
      expect(darkTheme.palette.primary.main).toBe("#90caf9");
    });

    it("should have correct background colors", () => {
      expect(darkTheme.palette.background.default).toBe("#121212");
      expect(darkTheme.palette.background.paper).toBe("#141414");
    });

    it("should have correct text colors", () => {
      expect(darkTheme.palette.text.primary).toBeDefined();
      expect(darkTheme.palette.text.secondary).toBeDefined();
    });
  });
});
