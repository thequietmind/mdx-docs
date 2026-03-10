import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useDocsContext } from "../context/DocsContext";

function AppBar({ darkMode, setDarkMode, handleDrawerToggle }) {
  const { site } = useDocsContext();
  return (
    <MuiAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          aria-label="Toggle navigation menu"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              color: "inherit",
            },
          }}
        >
          {site.name}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          sx={{
            ml: 1,
            "&:focus:not(:focus-visible)": {
              outline: "none",
            },
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
