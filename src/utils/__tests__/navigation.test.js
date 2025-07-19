import { describe, it, expect } from "vitest";

import {
  getNavigationPages,
  getDefaultPage,
  isExternalLink,
} from "../navigation";

describe("Navigation utilities", () => {
  describe("getNavigationPages", () => {
    it("should return pages without default page", () => {
      const navigationPages = getNavigationPages();
      expect(navigationPages.length).toBeGreaterThan(0);
      expect(navigationPages.every((page) => !page.isDefault)).toBe(true);
    });
  });

  describe("getDefaultPage", () => {
    it("should return the default page", () => {
      const defaultPage = getDefaultPage();
      expect(defaultPage).toBeDefined();
      expect(defaultPage.isDefault).toBe(true);
      expect(defaultPage.name).toBe("Home");
      expect(defaultPage.route).toBe("/");
    });
  });

  describe("isExternalLink", () => {
    it("should return false for falsy values", () => {
      expect(isExternalLink(null)).toBe(false);
      expect(isExternalLink(undefined)).toBe(false);
      expect(isExternalLink("")).toBe(false);
    });

    it("should return true for http URLs", () => {
      expect(isExternalLink("http://example.com")).toBe(true);
      expect(isExternalLink("https://example.com")).toBe(true);
    });

    it("should return true for mailto and tel links", () => {
      expect(isExternalLink("mailto:test@example.com")).toBe(true);
      expect(isExternalLink("tel:+1234567890")).toBe(true);
    });

    it("should return false for internal links", () => {
      expect(isExternalLink("/about")).toBe(false);
      expect(isExternalLink("about")).toBe(false);
      expect(isExternalLink("#section")).toBe(false);
    });
  });
});
