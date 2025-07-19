import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { useTheme } from "../useTheme";

describe("useTheme hook", () => {
  let mockMatchMedia;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Mock matchMedia
    mockMatchMedia = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn(() => mockMatchMedia);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with system preference when no stored preference", () => {
    mockMatchMedia.matches = true; // System prefers dark mode
    const { result } = renderHook(() => useTheme());

    expect(result.current.darkMode).toBe(true);
  });

  it("should initialize with stored preference over system preference", () => {
    localStorage.setItem("darkMode", "true");
    mockMatchMedia.matches = false; // System prefers light mode

    const { result } = renderHook(() => useTheme());

    expect(result.current.darkMode).toBe(true);
  });

  it("should toggle dark mode and save to localStorage", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setDarkMode(true);
    });

    expect(result.current.darkMode).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("true");

    act(() => {
      result.current.setDarkMode(false);
    });

    expect(result.current.darkMode).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("false");
  });

  it("should register event listener for system preference changes", () => {
    renderHook(() => useTheme());

    expect(window.matchMedia).toHaveBeenCalledWith(
      "(prefers-color-scheme: dark)"
    );
    expect(mockMatchMedia.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should clean up event listener on unmount", () => {
    const { unmount } = renderHook(() => useTheme());

    unmount();

    expect(mockMatchMedia.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should not update from system preference when user preference is stored", () => {
    localStorage.setItem("darkMode", "false");
    const { result } = renderHook(() => useTheme());

    // Simulate system preference change
    const changeHandler = mockMatchMedia.addEventListener.mock.calls[0][1];
    act(() => {
      changeHandler({ matches: true });
    });

    // Should still be false because user preference exists
    expect(result.current.darkMode).toBe(false);
  });
});
