import { afterEach, describe, expect, it, vi } from "vitest";

import {
  DARK_MODE_STORAGE_KEY,
  darkModeStorageManager,
} from "../darkModeStorageManager";

const modeStorage = () =>
  darkModeStorageManager({ key: DARK_MODE_STORAGE_KEY, storageWindow: window });

describe("darkModeStorageManager", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it.each([
    ["true", "dark"],
    ["false", "light"],
  ])("reads a saved %s as %s", (saved, mode) => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, saved);

    expect(modeStorage().get("system")).toBe(mode);
  });

  it("falls back to the default mode when nothing is saved", () => {
    expect(modeStorage().get("system")).toBe("system");
  });

  it("returns undefined on the server", () => {
    const storage = darkModeStorageManager({
      key: DARK_MODE_STORAGE_KEY,
      storageWindow: undefined,
    });

    expect(storage.get("system")).toBeUndefined();
  });

  it("saves dark and light in the existing true/false format", () => {
    const storage = modeStorage();

    storage.set("dark");
    expect(localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBe("true");

    storage.set("light");
    expect(localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBe("false");
  });

  it("clears the saved value for system so the OS setting applies", () => {
    localStorage.setItem(DARK_MODE_STORAGE_KEY, "true");

    modeStorage().set("system");

    expect(localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBeNull();
  });

  it("reports changes made in other tabs as modes", () => {
    const handler = vi.fn();
    const unsubscribe = modeStorage().subscribe(handler);

    window.dispatchEvent(
      new StorageEvent("storage", { key: DARK_MODE_STORAGE_KEY, newValue: "true" })
    );
    window.dispatchEvent(
      new StorageEvent("storage", { key: DARK_MODE_STORAGE_KEY, newValue: null })
    );
    window.dispatchEvent(
      new StorageEvent("storage", { key: "somethingElse", newValue: "true" })
    );
    unsubscribe();
    window.dispatchEvent(
      new StorageEvent("storage", { key: DARK_MODE_STORAGE_KEY, newValue: "false" })
    );

    expect(handler.mock.calls).toEqual([["dark"], [null]]);
  });

  it("ignores the per-mode color scheme keys MUI also asks for", () => {
    const storage = darkModeStorageManager({
      key: "mui-color-scheme-dark",
      storageWindow: window,
    });

    storage.set("dark");

    expect(storage.get("dark")).toBe("dark");
    expect(localStorage.getItem("mui-color-scheme-dark")).toBeNull();
    expect(localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBeNull();
  });
});
