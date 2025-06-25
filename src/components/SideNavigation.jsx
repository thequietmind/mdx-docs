import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { getNavigationPages } from "../utils/navigation";

export const drawerWidth = 240;

const SideNavigation = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const pages = getNavigationPages();

  // Clean up body overflow when route changes
  useEffect(() => {
    // Ensure body overflow is restored after navigation
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleNavigationClick = () => {
    handleDrawerToggle();
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {pages.map((page) => (
          <ListItem disablePadding key={page.route}>
            <ListItemButton
              component={Link}
              to={page.route}
              onClick={() => handleNavigationClick()}
              sx={{
                "&:hover": {
                  color: "inherit",
                },
              }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="sidebar navigation"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: false,
          disableScrollLock: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "85vw", sm: drawerWidth },
            maxWidth: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideNavigation;
