import { createTheme } from "@mui/material";

import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export { lightTheme } from "./lightTheme";
export { darkTheme } from "./darkTheme";

const componentOverrides = {
  components: {
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
  const args = [
    { ...baseConfig, palette: { ...baseConfig.palette, mode } },
    shorthandLayer,
  ];
  if (modeSpecific) args.push(modeSpecific);
  args.push(componentOverrides);

  return createTheme(...args);
};
