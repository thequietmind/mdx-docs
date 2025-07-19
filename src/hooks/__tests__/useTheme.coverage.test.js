import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { useTheme } from "../useTheme";

describe("useTheme hook - Additional Coverage Tests", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset all mocks
    vi.clearAllMocks();
  });

  it("should handle system preference change when no user preference exists", () => {
    // Mock matchMedia with initial light mode
    const mockMediaQuery = {
      matches: false, // Start with light mode
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    // Start with no localStorage preference
    localStorage.removeItem("darkMode");

    const { result } = renderHook(() => useTheme());

    // Should start with system preference (light)
    expect(result.current.darkMode).toBe(false);

    // Simulate system preference change event
    const changeHandler = mockMediaQuery.addEventListener.mock.calls.find(
      (call) => call[0] === "change"
    )[1];

    // Remove user preference to ensure system preference is used
    localStorage.removeItem("darkMode");

    // Change system preference to dark mode
    act(() => {
      changeHandler({ matches: true });
    });

    // Should update to dark mode
    expect(result.current.darkMode).toBe(true);
  });

  it("should not update theme when user preference exists and system preference changes", () => {
    // Set user preference first
    localStorage.setItem("darkMode", "true");

    const mockMediaQuery = {
      matches: false, // System prefers light
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useTheme());

    // Should start with user preference (dark)
    expect(result.current.darkMode).toBe(true);

    // Simulate system preference change event
    const changeHandler = mockMediaQuery.addEventListener.mock.calls.find(
      (call) => call[0] === "change"
    )[1];

    // Change system preference
    act(() => {
      changeHandler({ matches: true });
    });

    // Should still be true (user preference takes precedence)
    expect(result.current.darkMode).toBe(true);
  });

  it("should cleanup event listener on unmount", () => {
    const mockMediaQuery = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    const { unmount } = renderHook(() => useTheme());

    // Should have added listener
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    // Should have removed listener
    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
