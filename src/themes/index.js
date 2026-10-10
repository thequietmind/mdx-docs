import { createTheme } from "@mui/material";

import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export { lightTheme } from "./lightTheme";
export { darkTheme } from "./darkTheme";

// Attribute on <html> that selects the active color scheme. The script that
// injectColorSchemeScript (src/prerenderHtml.js) adds to <head> sets it before
// first paint, and MUI keeps it in sync after that.
export const COLOR_SCHEME_ATTRIBUTE = "data-mdx-docs-color-scheme";

// Base font stack, owned by the theme so CssBaseline applies it to <body> and
// it cascades app-wide. Previously set on :root in main.css; moved here so
// removing that global rule doesn't fall back to MUI's default Roboto stack.
const DEFAULT_FONT_FAMILY = "system-ui, Avenir, Helvetica, Arial, sans-serif";

const componentOverrides = {
  components: {
    // Style ALL bare HTML anchors (e.g. literal <a> written in .mdx, which is
    // not routed through the MDX components mapping). CssBaseline is enabled.
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        a: {
          // Match the markdown-link color (MUI Link defaults to color="primary")
          color: (theme.vars ?? theme).palette.primary.main,
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
        },
        // Key-cap styling for <kbd>. Derived from currentColor so it follows
        // the active mode and the surrounding text (table cells, blockquotes).
        kbd: {
          display: "inline-block",
          padding: "0.1em 0.45em",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "0.85em",
          lineHeight: 1.4,
          whiteSpace: "nowrap",
          border: "1px solid color-mix(in srgb, currentColor 30%, transparent)",
          borderBottomWidth: 2,
          borderRadius: 4,
          backgroundColor: "color-mix(in srgb, currentColor 8%, transparent)",
        },
      }),
    },
    // Style markdown-syntax links, which render as MUI Link via the MDX
    // components.a mapping. underline: "none" defaults out MUI's own underline
    // classes so they don't fight the root override on specificity.
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
          "&:focus-within": {
            outline: "none",
          },
          // Remove webkit focus ring
          "&::-webkit-focus-inner": {
            border: 0,
          },
          "&::-webkit-focus-ring-color": {
            outline: "none",
          },
        },
      },
    },
  },
};

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const mergeDeep = (target, source) => {
  if (!isPlainObject(source)) return target;
  const merged = { ...target };
  Object.entries(source).forEach(([key, value]) => {
    merged[key] =
      isPlainObject(value) && isPlainObject(target[key])
        ? mergeDeep(target[key], value)
        : value;
  });
  return merged;
};

// Merge order: built-in → shorthand (primaryColor, fontFamily) → top-level
// theme keys → mode-specific palette. Component overrides always go last.
const getPalette = (mode, userTheme) => {
  const base = mode === "dark" ? darkTheme : lightTheme;
  const shorthand = userTheme.primaryColor
    ? { primary: { main: userTheme.primaryColor } }
    : {};
  return mergeDeep(mergeDeep(base.palette, shorthand), userTheme[mode]?.palette);
};

// Passed as createTheme options rather than merged in afterwards, so the font
// reaches every typography variant (body1, h1, ...) and not only the root.
const getTypography = (userTheme) =>
  mergeDeep(
    { fontFamily: userTheme.fontFamily ?? DEFAULT_FONT_FAMILY },
    userTheme.typography
  );

// Color schemes only let the palette differ between modes, so `light` and
// `dark` only take a palette. Returns any other keys, like "theme.dark.typography".
export const findModeSpecificSettings = (userTheme = {}) =>
  ["light", "dark"].flatMap((mode) =>
    Object.keys(userTheme[mode] ?? {})
      .filter((key) => key !== "palette")
      .map((key) => `theme.${mode}.${key}`)
  );

// One theme for both modes. Its colors are CSS variables switched by
// COLOR_SCHEME_ATTRIBUTE, so prerendered HTML is right in either mode.
export const createAppTheme = (userTheme = {}) =>
  createTheme(
    {
      cssVariables: { colorSchemeSelector: COLOR_SCHEME_ATTRIBUTE },
      colorSchemes: {
        light: { palette: getPalette("light", userTheme) },
        dark: { palette: getPalette("dark", userTheme) },
      },
      typography: getTypography(userTheme),
    },
    { components: userTheme.components ?? {} },
    componentOverrides
  );
