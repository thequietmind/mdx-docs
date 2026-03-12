// Navigation utility functions

// Helper function to get navigation pages (excluding home and hidden pages)
export const getNavigationPages = (pages) => {
  return pages.filter((page) => page.route !== "/" && !page.isHidden);
};

// Helper function to get the home page (the page at route "/")
export const getDefaultPage = (pages) => {
  return pages.find((page) => page.route === "/");
};

// Helper function to detect if a link is external
export const isExternalLink = (href) => {
  if (!href) return false;

  // Check if it's an absolute URL (starts with http:// or https://)
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return true;
  }

  // Check if it's a mailto: or tel: link
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  return false;
};
