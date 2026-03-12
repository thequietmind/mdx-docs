import { describe, it, expect } from "vitest";

import {
  getNavigationPages,
  getDefaultPage,
  isExternalLink,
} from "../navigation";

const mockPages = [
  { name: "Home", route: "/" },
  { name: "Button", route: "/button" },
  { name: "Colors", route: "/colors" },
  { name: "Button Detail", route: "/button/detail", isHidden: true },
];

describe("Navigation utilities", () => {
  describe("getNavigationPages", () => {
    it("should exclude the home page (route '/')", () => {
      const navigationPages = getNavigationPages(mockPages);
      expect(navigationPages.every((page) => page.route !== "/")).toBe(true);
    });

    it("should exclude isHidden pages", () => {
      const navigationPages = getNavigationPages(mockPages);
      expect(navigationPages.every((page) => !page.isHidden)).toBe(true);
    });

    it("isHidden pages are still present in the full pages array", () => {
      const hiddenPage = mockPages.find((page) => page.isHidden);
      expect(hiddenPage).toBeDefined();
      expect(hiddenPage.route).toBe("/button/detail");
    });
  });

  describe("getDefaultPage", () => {
    it("should return the page at route '/'", () => {
      const defaultPage = getDefaultPage(mockPages);
      expect(defaultPage).toBeDefined();
      expect(defaultPage.route).toBe("/");
      expect(defaultPage.name).toBe("Home");
    });

    it("should return undefined when no page has route '/'", () => {
      const pages = [{ name: "Button", route: "/button" }];
      expect(getDefaultPage(pages)).toBeUndefined();
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
