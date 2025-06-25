// Navigation utility functions
import { pages } from "../config/pages";

// Helper function to get navigation pages (excluding home page)
export const getNavigationPages = () => {
  return pages.filter((page) => !page.isDefault);
};

// Helper function to get the default page
export const getDefaultPage = () => {
  return pages.find((page) => page.isDefault);
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
