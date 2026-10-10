import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.jsx";
import { registerAppOptions } from "./appOptions.js";
import { normalizeRoute } from "./utils/navigation.js";
import { preloadComponent } from "./utils/preloadComponent.js";
import "./main.css";

const findCurrentPage = (pages) => {
  const base = normalizeRoute(import.meta.env.BASE_URL);
  const { pathname } = window.location;
  const route =
    base !== "/" && pathname.startsWith(base)
      ? pathname.slice(base.length) || "/"
      : pathname;
  return pages.find(
    (page) => normalizeRoute(page.route) === normalizeRoute(route)
  );
};

export function createApp({
  pages,
  site,
  theme,
  hideHomeFromNav,
  footer,
  codeBlocks,
}) {
  const homePages = pages.filter((page) => page.route === "/");
  if (homePages.length === 0) {
    throw new Error(
      '[mdx-docs] No page with route "/" found. A home page at route "/" is required.'
    );
  }
  if (homePages.length > 1) {
    throw new Error(
      '[mdx-docs] Multiple pages with route "/" found. Only one home page is allowed.'
    );
  }

  const options = { pages, site, theme, hideHomeFromNav, footer, codeBlocks };
  registerAppOptions(options);

  if (typeof document === "undefined") {
    return;
  }

  const root = document.getElementById("root");
  const app = (
    <StrictMode>
      <App {...options} />
    </StrictMode>
  );

  if (root.hasChildNodes()) {
    // Hydrate once the current route's lazy page has loaded. Until then its
    // Suspense boundary is still dehydrated, and any context change after mount
    // (like the color mode settling) makes React discard the prerendered page
    // content and render it again.
    const hydrate = () => hydrateRoot(root, app);
    const page = findCurrentPage(pages);
    if (!page) {
      hydrate();
      return;
    }
    preloadComponent(page).then(hydrate, hydrate);
    return;
  }

  createRoot(root).render(app);
}
