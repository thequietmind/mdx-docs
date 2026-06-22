import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDocsContext } from "../context/DocsContext";
import { normalizeRoute } from "../utils/navigation";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const usePageMetadata = () => {
  const location = useLocation();
  const { pages, site } = useDocsContext();

  useIsomorphicLayoutEffect(() => {
    const pathname = normalizeRoute(location.pathname);
    const currentPage = pages.find(
      (page) => normalizeRoute(page.route) === pathname
    );

    const title = currentPage?.title ?? site?.name;
    const description = currentPage?.description ?? site?.description;

    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [location.pathname, pages, site]);
};
