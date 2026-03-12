import { describe, it, expect } from "vitest";

import { darkTheme } from "../darkTheme";
import { createAppTheme } from "../index";
import { lightTheme } from "../lightTheme";

describe("Theme configuration", () => {
  describe("createAppTheme", () => {
    it("should create light theme when mode is light", () => {
      const theme = createAppTheme("light");

      expect(theme.palette.mode).toBe("light");
      expect(theme.palette.primary.main).toBe(lightTheme.palette.primary.main);
      expect(theme.palette.background.default).toBe(
        lightTheme.palette.background.default
      );
    });

    it("should create dark theme when mode is dark", () => {
      const theme = createAppTheme("dark");

      expect(theme.palette.mode).toBe("dark");
      expect(theme.palette.primary.main).toBe(darkTheme.palette.primary.main);
      expect(theme.palette.background.default).toBe(
        darkTheme.palette.background.default
      );
    });

    it("should include typography settings", () => {
      const theme = createAppTheme("light");

      expect(theme.typography.fontFamily).toBeDefined();
      expect(theme.typography.h1).toBeDefined();
      expect(theme.typography.body1).toBeDefined();
    });

    it("should include component overrides", () => {
      const theme = createAppTheme("light");

      expect(theme.components).toBeDefined();
      expect(theme.components.MuiIconButton).toBeDefined();
    });

    it("should apply shorthand primaryColor to light mode", () => {
      const theme = createAppTheme("light", { primaryColor: "#6200ea" });
      expect(theme.palette.primary.main).toBe("#6200ea");
    });

    it("should apply shorthand primaryColor to dark mode", () => {
      const theme = createAppTheme("dark", { primaryColor: "#6200ea" });
      expect(theme.palette.primary.main).toBe("#6200ea");
    });

    it("should apply shorthand fontFamily to typography", () => {
      const theme = createAppTheme("light", { fontFamily: '"Inter", sans-serif' });
      expect(theme.typography.fontFamily).toBe('"Inter", sans-serif');
    });

    it("should let mode-specific dark override win over shorthand in dark mode", () => {
      const theme = createAppTheme("dark", {
        primaryColor: "#6200ea",
        dark: { palette: { primary: { main: "#bb86fc" } } },
      });
      expect(theme.palette.primary.main).toBe("#bb86fc");
    });

    it("should not apply light-mode override to dark mode", () => {
      const theme = createAppTheme("dark", {
        light: { palette: { background: { default: "#f0f4f8" } } },
      });
      expect(theme.palette.background.default).toBe(darkTheme.palette.background.default);
    });

    it("should preserve MuiIconButton override when user provides components", () => {
      const theme = createAppTheme("light", {
        light: {
          components: {
            MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
          },
        },
      });
      expect(theme.components.MuiIconButton).toBeDefined();
      expect(theme.components.MuiButton).toBeDefined();
    });

    it("should produce the same result with empty userTheme as with no userTheme", () => {
      const a = createAppTheme("light");
      const b = createAppTheme("light", {});
      expect(a.palette.primary.main).toBe(b.palette.primary.main);
      expect(a.palette.mode).toBe(b.palette.mode);
      expect(a.palette.background.default).toBe(b.palette.background.default);
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
