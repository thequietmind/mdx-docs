import { createTheme } from "@mui/material";

import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export { lightTheme } from "./lightTheme";
export { darkTheme } from "./darkTheme";

export const createAppTheme = (mode = "light") => {
  const themeConfig = mode === "dark" ? darkTheme : lightTheme;

  return createTheme({
    ...themeConfig,
    palette: {
      ...themeConfig.palette,
      mode,
    },
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
  });
};
