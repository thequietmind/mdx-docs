import { useCurrentFrontmatter } from "./useCurrentFrontmatter";

// The sidebar is shown by default; a page opts out with `sidebar: false` in its
// MDX frontmatter.
export const useShowSidebar = () =>
  useCurrentFrontmatter()?.sidebar !== false;
