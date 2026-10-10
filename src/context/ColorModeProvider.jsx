import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState } from "react";

import { ColorModeContext } from "./ColorModeContext";
import { useTheme } from "../hooks/useTheme";
import {
  COLOR_SCHEME_ATTRIBUTE,
  createAppTheme,
  createLegacyAppTheme,
  usesModeSpecificSettings,
} from "../themes";
import {
  DARK_MODE_STORAGE_KEY,
  darkModeStorageManager,
} from "../utils/darkModeStorageManager";

const resolveDarkMode = (value, darkMode) =>
  typeof value === "function" ? value(darkMode) : value;

// Reports MUI's resolved mode up to ColorSchemeProvider and hands it MUI's
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
const ColorSchemeProvider = ({ userTheme, children }) => {
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

let warnedAboutModeSettings = false;

const warnAboutModeSettings = (userTheme) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "production" || warnedAboutModeSettings) {
    return;
  }
  warnedAboutModeSettings = true;

  const found = ["light", "dark"].flatMap((mode) =>
    Object.keys(userTheme[mode] ?? {})
      .filter((key) => key !== "palette")
      .map((key) => `theme.${mode}.${key}`)
  );
  const verb = found.length === 1 ? "applies" : "apply";
  console.warn(
    `[mdx-docs] ${found.join(", ")} only ${verb} to one color mode, so this ` +
      "site uses the older theme setup, which can show the wrong color mode until " +
      "JavaScript loads. Move settings for both modes to theme.typography or " +
      'theme.components, and use theme.applyStyles("dark", ...) in component ' +
      "overrides for dark-only styles. Settings other than palette under " +
      "theme.light and theme.dark will stop working in 2.0."
  );
};

const LegacyColorModeProvider = ({ userTheme, children }) => {
  const { darkMode, setDarkMode } = useTheme();

  const theme = useMemo(
    () => createLegacyAppTheme(darkMode ? "dark" : "light", userTheme),
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

  useEffect(() => warnAboutModeSettings(userTheme), [userTheme]);

  // Keeps the attribute that CSS such as ::selection keys off in step with the
  // toggle, as MUI does for the color scheme setup.
  useEffect(() => {
    document.documentElement.setAttribute(
      COLOR_SCHEME_ATTRIBUTE,
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const ColorModeProvider = ({ userTheme = {}, children }) => {
  const Provider = usesModeSpecificSettings(userTheme)
    ? LegacyColorModeProvider
    : ColorSchemeProvider;
  return <Provider userTheme={userTheme}>{children}</Provider>;
};
