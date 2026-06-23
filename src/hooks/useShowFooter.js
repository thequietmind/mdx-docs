import { useCurrentFrontmatter } from "./useCurrentFrontmatter";

// The footer is shown by default (subject to the global footer config); a page
// opts out with `footer: false` in its MDX frontmatter.
export const useShowFooter = () =>
  useCurrentFrontmatter()?.footer !== false;
