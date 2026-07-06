import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { ColorModeContext } from "../../context/ColorModeContext";

import ColorModeToggle from "../ColorModeToggle";

const renderWithColorMode = (ui, value) =>
  render(
    <ColorModeContext.Provider value={value}>{ui}</ColorModeContext.Provider>
  );

describe("ColorModeToggle component", () => {
  it("should render the dark mode icon in light mode", () => {
    renderWithColorMode(<ColorModeToggle />, {
      darkMode: false,
      toggleColorMode: vi.fn(),
    });

    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" })
    ).toBeInTheDocument();
  });

  it("should render the light mode icon in dark mode", () => {
    renderWithColorMode(<ColorModeToggle />, {
      darkMode: true,
      toggleColorMode: vi.fn(),
    });

    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();
  });

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
