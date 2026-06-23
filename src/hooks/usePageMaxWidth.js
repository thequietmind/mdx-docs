import { useCurrentFrontmatter } from "./useCurrentFrontmatter";

// Default cap on page content width (px). Pages override it via the `maxWidth`
// frontmatter field: a number sets a custom cap, `false` removes the cap so the
// content fills the available area.
export const DEFAULT_CONTENT_MAX_WIDTH = 960;

export const usePageMaxWidth = () => {
  const { maxWidth } = useCurrentFrontmatter() ?? {};
  if (maxWidth === false) return "100%";
  if (typeof maxWidth === "number") return maxWidth;
  return DEFAULT_CONTENT_MAX_WIDTH;
};
