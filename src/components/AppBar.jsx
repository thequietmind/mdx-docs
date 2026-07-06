import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import ColorModeToggle from "./ColorModeToggle";
import { useDocsContext } from "../context/DocsContext";

function AppBar({ handleDrawerToggle, showSidebar = true }) {
  const { site } = useDocsContext();
  return (
    <MuiAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {showSidebar && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="Toggle navigation menu"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
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
        <ColorModeToggle sx={{ ml: 1 }} />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
