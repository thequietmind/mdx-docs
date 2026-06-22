import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App.jsx";
import { getAppOptions } from "./appOptions.js";
import { normalizeRoute } from "./utils/navigation.js";

const preloadComponent = async (page) => {
  if (page.load) {
    await page.load();
  }

  const { component } = page;
  if (!component?._payload || !component?._init) return;

  try {
    component._init(component._payload);
  } catch (result) {
    if (typeof result?.then !== "function") throw result;
    await result;
  }
};

export const getPrerenderPages = () => {
  const { pages, site } = getAppOptions();

  return pages.map((page) => ({
    route: page.route,
    title: page.title ?? site?.name,
    description: page.description ?? site?.description,
    excludeFromSitemap: page.excludeFromSitemap ?? false,
  }));
};

export const renderPage = async (route, base = "/") => {
  const options = getAppOptions();
  const page = options.pages.find((candidate) => candidate.route === route);
  if (!page) {
    throw new Error(`[mdx-docs] No page configured for route "${route}".`);
  }

  await preloadComponent(page);
  const normalizedBase = base === "/" ? "" : normalizeRoute(base);
  const location = `${normalizedBase}${route}`;

  return renderToString(
    <StrictMode>
      <App
        {...options}
        RouterComponent={StaticRouter}
        routerProps={{ basename: base, location }}
      />
    </StrictMode>
  );
};
