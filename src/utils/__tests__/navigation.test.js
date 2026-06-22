import { describe, it, expect } from "vitest";

import {
  getNavigationPages,
  getDefaultPage,
  isExternalLink,
  normalizeRoute,
} from "../navigation";

const mockPages = [
  { name: "Home", route: "/" },
  { name: "Button", route: "/button" },
  { name: "Colors", route: "/colors" },
  { name: "Button Detail", route: "/button/detail", isHidden: true },
];

describe("Navigation utilities", () => {
  describe("getNavigationPages", () => {
    it("should include the home page (route '/') by default", () => {
      const navigationPages = getNavigationPages(mockPages);
      expect(navigationPages.some((page) => page.route === "/")).toBe(true);
    });

    it("should exclude the home page when hideHomeFromNav is true", () => {
      const navigationPages = getNavigationPages(mockPages, true);
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

  describe("normalizeRoute", () => {
    it("leaves the root route unchanged", () => {
      expect(normalizeRoute("/")).toBe("/");
    });

    it("strips a single trailing slash", () => {
      expect(normalizeRoute("/about/")).toBe("/about");
    });

    it("leaves routes without a trailing slash unchanged", () => {
      expect(normalizeRoute("/about")).toBe("/about");
    });

    it("strips many trailing slashes in linear time (no ReDoS)", () => {
      expect(normalizeRoute("/about///")).toBe("/about");
      const manySlashes = "/".repeat(100000);
      expect(normalizeRoute(manySlashes)).toBe("");
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
