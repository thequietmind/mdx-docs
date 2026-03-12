import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./main.css";

export function createApp({ pages, site, theme, hideHomeFromNav }) {
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

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App pages={pages} site={site} theme={theme} hideHomeFromNav={hideHomeFromNav} />
    </StrictMode>
  );
}
