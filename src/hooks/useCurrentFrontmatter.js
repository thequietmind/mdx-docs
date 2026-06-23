import { useLocation } from "react-router-dom";

import { useDocsContext } from "../context/DocsContext";
import { normalizeRoute } from "../utils/navigation";

// Reads the `frontmatter` named export from a lazy MDX route component. This
// reuses React.lazy's internal payload, the same shape server.jsx relies on to
// preload routes: calling `_init` resolves the module or throws the loading
// promise (suspending). Reading it inside a Suspense boundary keeps per-page
// layout decisions consistent between the prerendered HTML and client hydration.
const readFrontmatter = (component) => {
  if (!component?._payload || typeof component._init !== "function") {
    return undefined;
  }

  component._init(component._payload);
  return component._payload._result?.frontmatter;
};

// Returns the current route's `frontmatter` object (or undefined). Shared by the
// per-page layout hooks (`useShowSidebar`, `usePageMaxWidth`).
export const useCurrentFrontmatter = () => {
  const location = useLocation();
  const { pages } = useDocsContext();

  const pathname = normalizeRoute(location.pathname);
  const currentPage = pages.find(
    (page) => normalizeRoute(page.route) === pathname
  );

  return currentPage ? readFrontmatter(currentPage.component) : undefined;
};
