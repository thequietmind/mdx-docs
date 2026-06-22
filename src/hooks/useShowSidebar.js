import { useLocation } from "react-router-dom";

import { useDocsContext } from "../context/DocsContext";
import { normalizeRoute } from "../utils/navigation";

// Reads the `frontmatter` named export from a lazy MDX route component. This
// reuses React.lazy's internal payload, the same shape server.jsx relies on to
// preload routes: calling `_init` resolves the module or throws the loading
// promise (suspending). Reading it inside a Suspense boundary keeps the sidebar
// decision consistent between the prerendered HTML and client hydration.
const readFrontmatter = (component) => {
  if (!component?._payload || typeof component._init !== "function") {
    return undefined;
  }

  component._init(component._payload);
  return component._payload._result?.frontmatter;
};

export const useShowSidebar = () => {
  const location = useLocation();
  const { pages } = useDocsContext();

  const pathname = normalizeRoute(location.pathname);
  const currentPage = pages.find(
    (page) => normalizeRoute(page.route) === pathname
  );

  const frontmatter = currentPage
    ? readFrontmatter(currentPage.component)
    : undefined;

  return frontmatter?.sidebar !== false;
};
