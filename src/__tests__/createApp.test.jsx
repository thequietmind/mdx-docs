import { lazy } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createApp } from "../createApp.jsx";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
  hydrateRoot: vi.fn(),
}));

const site = { name: "Docs" };

const deferredPage = (route) => {
  let resolve;
  let reject;
  const loaded = new Promise((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return {
    page: { name: route, route, component: lazy(() => loaded) },
    resolve: () => resolve({ default: () => null }),
    reject: () => reject(new Error("chunk failed")),
  };
};

describe("createApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="root"><main>Prerendered</main></div>';
    window.history.pushState({}, "", "/getting-started/");
  });

  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("waits for the current page to load before hydrating", async () => {
    const current = deferredPage("/getting-started");
    createApp({ pages: [deferredPage("/").page, current.page], site });

    await Promise.resolve();
    expect(hydrateRoot).not.toHaveBeenCalled();

    current.resolve();
    await vi.waitFor(() => expect(hydrateRoot).toHaveBeenCalledTimes(1));
    expect(createRoot).not.toHaveBeenCalled();
  });

  it("still hydrates when the current page fails to load", async () => {
    const current = deferredPage("/getting-started");
    createApp({ pages: [deferredPage("/").page, current.page], site });

    current.reject();
    await vi.waitFor(() => expect(hydrateRoot).toHaveBeenCalledTimes(1));
  });

  it("hydrates right away when no page matches the URL", () => {
    window.history.pushState({}, "", "/missing");
    createApp({ pages: [deferredPage("/").page], site });

    expect(hydrateRoot).toHaveBeenCalledTimes(1);
  });

  describe.each(["/docs/", "/docs"])("under base %s", (base) => {
    beforeEach(() => {
      vi.stubEnv("BASE_URL", base);
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it.each([
      ["/docs/getting-started/", "/getting-started"],
      ["/docs/", "/"],
    ])("waits for the page at %s to load before hydrating", async (url, route) => {
      window.history.pushState({}, "", url);
      const pages = [deferredPage("/"), deferredPage("/getting-started")];
      createApp({ pages: pages.map(({ page }) => page), site });

      await Promise.resolve();
      expect(hydrateRoot).not.toHaveBeenCalled();

      pages.find(({ page }) => page.route === route).resolve();
      await vi.waitFor(() => expect(hydrateRoot).toHaveBeenCalledTimes(1));
    });
  });

  it("renders from scratch when there is no prerendered HTML", () => {
    document.body.innerHTML = '<div id="root"></div>';
    createApp({ pages: [deferredPage("/").page], site });

    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(hydrateRoot).not.toHaveBeenCalled();
  });
});
