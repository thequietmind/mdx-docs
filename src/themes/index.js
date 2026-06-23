import { createTheme } from "@mui/material";

import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export { lightTheme } from "./lightTheme";
export { darkTheme } from "./darkTheme";

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
          color: theme.palette.primary.main,
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
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

export const createAppTheme = (mode = "light", userTheme = {}) => {
  const baseConfig = mode === "dark" ? darkTheme : lightTheme;
  const modeSpecific = userTheme[mode];

  // Translate shorthand options to MUI theme shape
  const shorthandLayer = {};
  if (userTheme.primaryColor) {
    shorthandLayer.palette = { primary: { main: userTheme.primaryColor } };
  }
  if (userTheme.fontFamily) {
    shorthandLayer.typography = { fontFamily: userTheme.fontFamily };
  }

  // Merge order: base → shorthand → mode-specific → component overrides (always last)
  // fontFamily lives in the base layer so userTheme.fontFamily (shorthand) can override it.
  const args = [
    {
      ...baseConfig,
      palette: { ...baseConfig.palette, mode },
      typography: { fontFamily: DEFAULT_FONT_FAMILY, ...baseConfig.typography },
    },
    shorthandLayer,
  ];
  if (modeSpecific) args.push(modeSpecific);
  args.push(componentOverrides);

  return createTheme(...args);
};
