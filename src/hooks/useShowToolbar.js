import { useCurrentFrontmatter } from "./useCurrentFrontmatter";

// The top toolbar (AppBar) is shown by default; a page opts out with
// `toolbar: false` in its MDX frontmatter.
export const useShowToolbar = () =>
  useCurrentFrontmatter()?.toolbar !== false;
