// Loads a page's lazy route component ahead of rendering. Calling React.lazy's
// internal `_init` starts the import and throws its promise while it is pending.
export const preloadComponent = async (page) => {
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
