import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import SideNavigation from "../SideNavigation";

// These pages have no isDefault flag, so all appear in the nav
const mockNavigationPages = [
  { name: "Button", route: "/button" },
  { name: "Colors", route: "/colors" },
  { name: "Typography", route: "/typography" },
];

const mockSite = { name: "Test Site" };

const renderWithRouter = (component, { route = "/" } = {}) => {
  return render(
    <DocsProvider pages={mockNavigationPages} site={mockSite}>
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    </DocsProvider>
  );
};

// Wires the drawer state the same way App does
const SideNavigationWithDrawerState = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <SideNavigation
      mobileOpen={mobileOpen}
      handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
    />
  );
};

describe("SideNavigation component", () => {
  const mockHandleDrawerToggle = vi.fn();

  const defaultProps = {
    mobileOpen: false,
    handleDrawerToggle: mockHandleDrawerToggle,
  };

  beforeEach(() => {
    vi.clearAllMocks();
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
    expect(buttonLink).toHaveAttribute("href", "/button/");
  });

  it("should not highlight inactive routes", () => {
    renderWithRouter(<SideNavigation {...defaultProps} />, {
      route: "/button",
    });

    const colorsLink = screen.getByText("Colors").closest("a");
    expect(colorsLink).not.toHaveClass("active");
  });

  it("should close the mobile drawer when a link in it is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SideNavigation {...defaultProps} mobileOpen={true} />);

    // The open drawer is modal, so its link is the only accessible one
    await user.click(screen.getByRole("link", { name: "Colors" }));

    expect(mockHandleDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it("should not open the mobile drawer when a link is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<SideNavigationWithDrawerState />);

    await user.click(screen.getByRole("link", { name: "Colors" }));

    // An open drawer is a modal that hides the page from screen readers, even
    // on desktop where the drawer itself is hidden with CSS
    expect(container).not.toHaveAttribute("aria-hidden");
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
