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

function AppBar({ darkMode, setDarkMode, handleDrawerToggle }) {
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
          Design System
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          sx={{
            ml: 1,
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
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
