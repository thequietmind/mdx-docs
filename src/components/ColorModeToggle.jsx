import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

import { useColorMode } from "../context/ColorModeContext";

// A self-contained light/dark toggle. Reads color-mode state from context, so it
// works anywhere inside the app — including pages that hide the toolbar. Style
// and placement are left to the caller via `sx` and pass-through IconButton
// props (e.g. position a floating toggle with `sx={{ position: "fixed", ... }}`).
function ColorModeToggle({ sx, ...props }) {
  const { darkMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      sx={{
        "&:focus:not(:focus-visible)": {
          outline: "none",
        },
        ...sx,
      }}
      {...props}
    >
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ColorModeToggle;
