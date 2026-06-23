import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { ColorModeContext } from "../../context/ColorModeContext";
import { DocsProvider } from "../../context/DocsProvider";

import AppBar from "../AppBar";

const mockSite = { name: "Design System" };

describe("AppBar component", () => {
  const mockToggleColorMode = vi.fn();
  const mockSetDarkMode = vi.fn();
  const mockHandleDrawerToggle = vi.fn();

  const renderAppBar = (props = {}, { darkMode = false } = {}) =>
    render(
      <DocsProvider pages={[]} site={mockSite}>
        <ColorModeContext.Provider
          value={{
            darkMode,
            setDarkMode: mockSetDarkMode,
            toggleColorMode: mockToggleColorMode,
          }}
        >
          <BrowserRouter>
            <AppBar
              handleDrawerToggle={mockHandleDrawerToggle}
              showSidebar
              {...props}
            />
          </BrowserRouter>
        </ColorModeContext.Provider>
      </DocsProvider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the app title", () => {
    renderAppBar();

    expect(screen.getByText("Design System")).toBeInTheDocument();
  });

  it("should render the menu button on mobile", () => {
    renderAppBar();

    const menuButton = screen.getByTestId("MenuIcon").closest("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveStyle({ marginRight: "16px" });
  });

  it("should call handleDrawerToggle when menu button is clicked", async () => {
    const user = userEvent.setup();
    renderAppBar();

    const menuButton = screen.getByTestId("MenuIcon").closest("button");
    await user.click(menuButton);

    expect(mockHandleDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it("should render dark mode icon when in light mode", () => {
    renderAppBar({}, { darkMode: false });

    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
  });

  it("should render light mode icon when in dark mode", () => {
    renderAppBar({}, { darkMode: true });

    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
  });

  it("should toggle color mode when theme button is clicked", async () => {
    const user = userEvent.setup();
    renderAppBar();

    const themeButton = screen.getByTestId("DarkModeIcon").closest("button");
    await user.click(themeButton);

    expect(mockToggleColorMode).toHaveBeenCalledTimes(1);
  });

  it("should link title to home page", () => {
    renderAppBar();

    const titleLink = screen.getByRole("link", { name: "Design System" });
    expect(titleLink).toHaveAttribute("href", "/");
  });
});
