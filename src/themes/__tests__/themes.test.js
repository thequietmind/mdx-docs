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
