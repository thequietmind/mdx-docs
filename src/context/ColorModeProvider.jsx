import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState } from "react";

import { ColorModeContext } from "./ColorModeContext";
import { createAppTheme } from "../themes";
import {
  DARK_MODE_STORAGE_KEY,
  darkModeStorageManager,
} from "../utils/darkModeStorageManager";

const resolveDarkMode = (value, darkMode) =>
  typeof value === "function" ? value(darkMode) : value;

// Reports MUI's resolved mode up to ColorModeProvider and hands it MUI's
// setMode. MUI reports the mode as undefined until after hydration.
const ColorSchemeSync = ({ onDarkModeChange, setModeRef }) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const darkMode = (mode === "system" ? systemMode : mode) === "dark";

  useEffect(() => {
    setModeRef.current = setMode;
  }, [setMode, setModeRef]);

  useEffect(() => {
    onDarkModeChange(darkMode);
  }, [darkMode, onDarkModeChange]);

  return null;
};

// The useColorMode() state lives here, above MUI's ThemeProvider, and follows
// MUI's mode after mount. When it lived below the provider, React hydrated the
// prerendered page content (inside Suspense, so it hydrates after the shell)
// with the settled mode instead of the prerendered one, which left stale
// attributes like the toggle's label. forceThemeRerender keeps theme.palette in
// step with the active mode for code that reads colors in JavaScript.
export const ColorModeProvider = ({ userTheme = {}, children }) => {
  const theme = useMemo(() => createAppTheme(userTheme), [userTheme]);
  const [darkMode, setDarkModeState] = useState(false);
  const setModeRef = useRef(null);

  const colorMode = useMemo(() => {
    const setMode = (mode) => setModeRef.current?.(mode);
    return {
      darkMode,
      setDarkMode: (value) =>
        setMode(resolveDarkMode(value, darkMode) ? "dark" : "light"),
      toggleColorMode: () => setMode(darkMode ? "light" : "dark"),
    };
  }, [darkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={theme}
        defaultMode="system"
        modeStorageKey={DARK_MODE_STORAGE_KEY}
        storageManager={darkModeStorageManager}
        forceThemeRerender
      >
        <ColorSchemeSync
          onDarkModeChange={setDarkModeState}
          setModeRef={setModeRef}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
