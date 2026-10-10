import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { ColorModeContext } from "../../context/ColorModeContext";
import { createLegacyAppTheme } from "../../themes";

import ColorModeToggle from "../ColorModeToggle";

const renderWithColorMode = (ui, value) =>
  render(
    <ColorModeContext.Provider value={value}>{ui}</ColorModeContext.Provider>
  );

describe("ColorModeToggle component", () => {
  it.each([
    [false, "Switch to dark mode"],
    [true, "Switch to light mode"],
  ])("should label the button from darkMode=%s", (darkMode, label) => {
    renderWithColorMode(<ColorModeToggle />, {
      darkMode,
      toggleColorMode: vi.fn(),
    });

    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it.each([
    ["light", "DarkModeIcon", "LightModeIcon"],
    ["dark", "LightModeIcon", "DarkModeIcon"],
  ])(
    "should show the icon for the theme's %s mode in CSS",
    (mode, visibleIcon, hiddenIcon) => {
      render(
        <ThemeProvider theme={createLegacyAppTheme(mode)}>
          <ColorModeContext.Provider
            value={{ darkMode: false, toggleColorMode: vi.fn() }}
          >
            <ColorModeToggle />
          </ColorModeContext.Provider>
        </ThemeProvider>
      );

      expect(screen.getByTestId(visibleIcon)).toBeVisible();
      expect(screen.getByTestId(hiddenIcon)).not.toBeVisible();
    }
  );

  it("should call toggleColorMode when clicked", async () => {
    const toggleColorMode = vi.fn();
    const user = userEvent.setup();
    renderWithColorMode(<ColorModeToggle />, {
      darkMode: false,
      toggleColorMode,
    });

    await user.click(screen.getByRole("button"));

    expect(toggleColorMode).toHaveBeenCalledTimes(1);
  });

  it("should forward pass-through props to the button", () => {
    renderWithColorMode(<ColorModeToggle data-testid="floating-toggle" />, {
      darkMode: false,
      toggleColorMode: vi.fn(),
    });

    expect(screen.getByTestId("floating-toggle")).toBeInTheDocument();
  });

  it("should throw when used outside a ColorModeProvider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<ColorModeToggle />)).toThrow(
      "useColorMode must be used within a ColorModeProvider"
    );

    consoleError.mockRestore();
  });
});
