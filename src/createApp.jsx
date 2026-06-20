import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.jsx";
import { registerAppOptions } from "./appOptions.js";
import "./main.css";

export function createApp({ pages, site, theme, hideHomeFromNav, footer }) {
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

  const options = { pages, site, theme, hideHomeFromNav, footer };
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
    hydrateRoot(root, app);
    return;
  }

  createRoot(root).render(app);
}
