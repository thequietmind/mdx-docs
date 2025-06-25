import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { useMemo, useState, useLayoutEffect, useEffect } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AppBar from "./components/AppBar";
import MDXContent from "./components/MDXContent";
import SideNavigation, { drawerWidth } from "./components/SideNavigation";
import { useTheme } from "./hooks/useTheme";
import { createAppTheme } from "./themes";

const Wrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("App - Wrapper component rendered");

  // Check for redirect route when component mounts
  useEffect(() => {
    console.log("App - Component mounted, checking for redirect parameter");

    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectRoute = urlParams.get("redirect");
    console.log("App - Initial redirect route check:", redirectRoute);

    if (redirectRoute) {
      console.log("App - Found redirect route, navigating to:", redirectRoute);
      // Remove the redirect parameter from URL
      urlParams.delete("redirect");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");
      window.history.replaceState({}, "", newUrl);
      navigate(redirectRoute);
    }
  }, [navigate]);

  useLayoutEffect(() => {
    console.log("App - useLayoutEffect - Current location:", location.pathname);

    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function AppContent() {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useMemo(
    () => createAppTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleDrawerToggle={handleDrawerToggle}
        />
        <SideNavigation
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8, // Add top padding to account for AppBar
            px: { xs: 0.5, sm: 3 }, // Reduce padding even more on very small screens
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            // Prevent horizontal overflow on very small screens
            overflowX: "hidden",
          }}
        >
          <MDXContent />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  console.log(
    "App - App component rendered, BASE_URL:",
    import.meta.env.BASE_URL
  );
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Wrapper>
        <AppContent />
      </Wrapper>
    </Router>
  );
}

export default App;
