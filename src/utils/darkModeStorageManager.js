// localStorage key for the visitor's choice, saved as "true" or "false". The
// pre-paint script from injectColorSchemeScript (src/prerenderHtml.js) reads
// the same key, so keep the two in sync.
export const DARK_MODE_STORAGE_KEY = "darkMode";

const MODES = { true: "dark", false: "light" };

const noopStorage = {
  get: (defaultValue) => defaultValue,
  set: () => {},
  subscribe: () => () => {},
};

// A storage manager for MUI's ThemeProvider. MUI tracks the mode as "light",
// "dark" or "system"; this stores it in the existing `darkMode` format, with no
// saved value meaning "system" (follow the OS setting). MUI also asks for
// storage for per-mode color scheme names, which mdx-docs doesn't use.
export const darkModeStorageManager = ({ key, storageWindow }) => {
  if (key !== DARK_MODE_STORAGE_KEY) return noopStorage;

  return {
    get(defaultValue) {
      if (!storageWindow) return undefined;
      try {
        return MODES[storageWindow.localStorage.getItem(key)] ?? defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set(mode) {
      try {
        if (mode === "system") {
          storageWindow?.localStorage.removeItem(key);
          return;
        }
        storageWindow?.localStorage.setItem(key, String(mode === "dark"));
      } catch {
        // Storage unavailable (private mode, blocked site data)
      }
    },
    subscribe(handler) {
      if (!storageWindow) return () => {};
      const listener = (event) => {
        if (event.key === key) handler(MODES[event.newValue] ?? null);
      };
      storageWindow.addEventListener("storage", listener);
      return () => storageWindow.removeEventListener("storage", listener);
    },
  };
};
