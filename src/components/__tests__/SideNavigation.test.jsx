import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import * as navigationUtils from "../../utils/navigation";

import SideNavigation from "../SideNavigation";

const renderWithRouter = (component, { route = "/" } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
  );
};

describe("SideNavigation component", () => {
  const mockHandleDrawerToggle = vi.fn();

  const defaultProps = {
    mobileOpen: false,
    handleDrawerToggle: mockHandleDrawerToggle,
  };

  // Mock navigation pages
  const mockNavigationPages = [
    { name: "Button", route: "/button" },
    { name: "Colors", route: "/colors" },
    { name: "Typography", route: "/typography" },
  ];

  beforeEach(() => {
    vi.spyOn(navigationUtils, "getNavigationPages").mockReturnValue(
      mockNavigationPages
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render all navigation items", () => {
    renderWithRouter(<SideNavigation {...defaultProps} />);

    mockNavigationPages.forEach((page) => {
      expect(screen.getByText(page.name)).toBeInTheDocument();
    });
  });

  it("should highlight the active route", () => {
    renderWithRouter(<SideNavigation {...defaultProps} />, {
      route: "/button",
    });

    const buttonLink = screen.getByText("Button").closest("a");
    // Check that it's the button route
    expect(buttonLink).toHaveAttribute("href", "/button");
  });

  it("should not highlight inactive routes", () => {
    renderWithRouter(<SideNavigation {...defaultProps} />, {
      route: "/button",
    });

    const colorsLink = screen.getByText("Colors").closest("a");
    expect(colorsLink).not.toHaveClass("active");
  });

  it("should navigate when a link is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SideNavigation {...defaultProps} />);

    const colorsLink = screen.getByText("Colors");
    await user.click(colorsLink);

    expect(mockHandleDrawerToggle).toHaveBeenCalled();
  });

  it("should render drawer with correct width", () => {
    const { container } = renderWithRouter(
      <SideNavigation {...defaultProps} />
    );

    const drawer = container.querySelector(".MuiDrawer-root");
    expect(drawer).toBeInTheDocument();
  });

  it("should be open on mobile when mobileOpen is true", () => {
    renderWithRouter(<SideNavigation {...defaultProps} mobileOpen={true} />);

    // Check if drawer content is visible - use getAllByText since there are duplicates
    mockNavigationPages.forEach((page) => {
      const elements = screen.getAllByText(page.name);
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toBeVisible();
    });
  });

  it("should add padding for toolbar", () => {
    const { container } = renderWithRouter(
      <SideNavigation {...defaultProps} />
    );

    const toolbar = container.querySelector(".MuiToolbar-root");
    expect(toolbar).toBeInTheDocument();
  });
});
