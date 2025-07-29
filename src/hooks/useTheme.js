import { useState, useEffect } from "react";

// Detect system preference for light/dark mode
const getSystemPreference = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return true; // Default to dark mode if no system preference available
};

// Get stored preference or fall back to system preference
const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return JSON.parse(stored);
    }
  }
  return getSystemPreference();
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  // Listen for system preference changes (only if no user preference is stored)
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        // Only update if user hasn't set a preference
        if (localStorage.getItem("darkMode") === null) {
          setDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return { darkMode, setDarkMode };
};
