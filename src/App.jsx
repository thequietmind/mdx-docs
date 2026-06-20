import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { useMemo, useState, useLayoutEffect, useEffect } from "react";
import {
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import MDXContent from "./components/MDXContent";
import SideNavigation, { drawerWidth } from "./components/SideNavigation";
import { DocsProvider } from "./context/DocsProvider";
import { usePageMetadata } from "./hooks/usePageMetadata";
import { useTheme } from "./hooks/useTheme";
import { createAppTheme } from "./themes";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const Wrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  usePageMetadata();

  // Check for redirect route when component mounts
  useEffect(() => {
    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectRoute = urlParams.get("redirect");

    if (redirectRoute) {
      // Remove the redirect parameter from URL
      urlParams.delete("redirect");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");
      window.history.replaceState({}, "", newUrl);
      navigate(redirectRoute);
    }
  }, [navigate]);

  useIsomorphicLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function AppContent({ userTheme = {} }) {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useMemo(
    () => createAppTheme(darkMode ? "dark" : "light", userTheme),
    [darkMode, userTheme]
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
            // Flex column so the footer sticks to the bottom of the viewport
            // on short pages and flows after content on long pages
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <MDXContent />
          </Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App({
  pages,
  site,
  theme = {},
  hideHomeFromNav = false,
  footer,
  RouterComponent = BrowserRouter,
  routerProps = { basename: import.meta.env.BASE_URL },
}) {
  const AppRouter = RouterComponent;

  return (
    <DocsProvider
      pages={pages}
      site={site}
      hideHomeFromNav={hideHomeFromNav}
      footer={footer}
    >
      <AppRouter {...routerProps}>
        <Wrapper>
          <AppContent userTheme={theme} />
        </Wrapper>
      </AppRouter>
    </DocsProvider>
  );
}

export default App;
