import { darkTheme } from "../themes/darkTheme";
import { lightTheme } from "../themes/lightTheme";

// Colors come through CSS variables when the theme has them (theme.vars), so
// prerendered code is right in either color mode. A theme without palette.code,
// like one supplied to a custom DocsProvider + MDXContent layout, gets the
// built-in colors for its mode.
export const getCodePalette = (muiTheme) => {
  const { palette } = muiTheme.vars ?? muiTheme;
  const builtIn = muiTheme.palette.mode === "dark" ? darkTheme : lightTheme;
  return { ...palette, code: palette.code ?? builtIn.palette.code };
};

export const createPrismTheme = (code, plain) => ({
  plain,
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: code.comment },
    },
    { types: ["punctuation"], style: { color: code.punctuation } },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: code.property },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: { color: code.string },
    },
    { types: ["operator", "entity", "url"], style: { color: code.operator } },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: code.keyword },
    },
    { types: ["function"], style: { color: code.function } },
    { types: ["class-name"], style: { color: code.className } },
  ],
});
