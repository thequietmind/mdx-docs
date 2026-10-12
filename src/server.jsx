import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App.jsx";
import { getAppOptions } from "./appOptions.js";
import { normalizeRoute } from "./utils/navigation.js";
import { preloadComponent } from "./utils/preloadComponent.js";

export const getPrerenderPages = () => {
  const { pages, site } = getAppOptions();

  return pages.map((page) => ({
    route: page.route,
    title: page.title ?? site?.name,
    description: page.description ?? site?.description,
    excludeFromSitemap: page.excludeFromSitemap ?? false,
  }));
};

// The 404 page is rendered at its own path, which isn't a page route, so the
// router falls through to the 404 route. Nothing it renders depends on the
// path, so the markup hydrates at whatever unknown URL the host serves it for.
const NOT_FOUND_ROUTE = "/404.html";

const renderApp = (options, route, base) => {
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

export const renderPage = async (route, base = "/") => {
  const options = getAppOptions();
  const page = options.pages.find((candidate) => candidate.route === route);
  if (!page) {
    throw new Error(`[mdx-docs] No page configured for route "${route}".`);
  }

  await preloadComponent(page);
  return renderApp(options, route, base);
};

export const renderNotFoundPage = async (base = "/") =>
  renderApp(getAppOptions(), NOT_FOUND_ROUTE, base);
