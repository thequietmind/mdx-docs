import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Suspense, useMemo, useState, useLayoutEffect, useEffect } from "react";
import {
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import MDXContent from "./components/MDXContent";
import SideNavigation, { drawerWidth } from "./components/SideNavigation";
import { ColorModeContext } from "./context/ColorModeContext";
import { DocsProvider } from "./context/DocsProvider";
import { usePageMetadata } from "./hooks/usePageMetadata";
import { useShowFooter } from "./hooks/useShowFooter";
import { useShowSidebar } from "./hooks/useShowSidebar";
import { useShowToolbar } from "./hooks/useShowToolbar";
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

function AppShell({
  showSidebar,
  showToolbar = true,
  showFooter = true,
  mobileOpen,
  handleDrawerToggle,
}) {
  return (
    <Box sx={{ display: "flex" }}>
      {showToolbar && (
        <AppBar
          handleDrawerToggle={handleDrawerToggle}
          showSidebar={showSidebar}
        />
      )}
      {showSidebar && (
        <SideNavigation
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: showToolbar ? 8 : 0, // Top padding accounts for the fixed AppBar
          px: { xs: 0.5, sm: 3 }, // Reduce padding even more on very small screens
          width: showSidebar ? { sm: `calc(100% - ${drawerWidth}px)` } : "100%",
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
        {showFooter && <Footer />}
      </Box>
    </Box>
  );
}

// Reads the current page's `sidebar` frontmatter, suspending until the route
// module loads. Kept separate from AppShell so the Suspense fallback can render
// the shell (with the sidebar) without suspending.
function CurrentAppShell(props) {
  const showSidebar = useShowSidebar();
  const showToolbar = useShowToolbar();
  const showFooter = useShowFooter();
  return (
    <AppShell
      showSidebar={showSidebar}
      showToolbar={showToolbar}
      showFooter={showFooter}
      {...props}
    />
  );
}

function AppContent({ userTheme = {} }) {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useMemo(
    () => createAppTheme(darkMode ? "dark" : "light", userTheme),
    [darkMode, userTheme]
  );

  const colorMode = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      toggleColorMode: () => setDarkMode((value) => !value),
    }),
    [darkMode, setDarkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const shellProps = { mobileOpen, handleDrawerToggle };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<AppShell showSidebar {...shellProps} />}>
          <CurrentAppShell {...shellProps} />
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
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
