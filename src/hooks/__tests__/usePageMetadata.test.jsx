import { render, renderHook, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import { usePageMetadata } from "../usePageMetadata";

const createWrapper = (pages, site) => {
  return ({ children }) => (
    <DocsProvider pages={pages} site={site}>
      <BrowserRouter>{children}</BrowserRouter>
    </DocsProvider>
  );
};

const removeMetaTags = () => {
  document.querySelectorAll("meta").forEach((tag) => tag.remove());
};

describe("usePageMetadata", () => {
  beforeEach(() => {
    removeMetaTags();
  });

  afterEach(() => {
    document.title = "";
    removeMetaTags();
  });

  it("should update document title with page title", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        title: "Home — Test Site",
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    expect(document.title).toBe("Home — Test Site");
  });

  it("should fall back to site name when page title is not provided", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    expect(document.title).toBe("Test Site");
  });

  it("should update meta description with page description", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        description: "This is the home page description",
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(
      "This is the home page description"
    );
  });

  it("should fall back to site description when page description is not provided", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Test Description");
  });

  it("should handle missing site name and description gracefully", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
      },
    ];
    const site = {};

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    expect(document.title).toBe("");
    expect(document.querySelector('meta[name="description"]')).toBeNull();
  });

  it("should create meta description tag if it does not exist", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        description: "Test description",
      },
    ];
    const site = { name: "Test Site" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).not.toBeNull();
    expect(metaDescription?.getAttribute("content")).toBe("Test description");
  });

  it("should update an existing meta description tag", () => {
    const existing = document.createElement("meta");
    existing.setAttribute("name", "description");
    existing.setAttribute("content", "Old description");
    document.head.appendChild(existing);

    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        description: "New description",
      },
    ];
    const site = { name: "Test Site" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    const metaTags = document.querySelectorAll('meta[name="description"]');
    expect(metaTags).toHaveLength(1);
    expect(metaTags[0].getAttribute("content")).toBe("New description");
  });

  it("should update metadata on initial mount", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        title: "Home Page",
        description: "Home description",
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    renderHook(() => usePageMetadata(), {
      wrapper: createWrapper(pages, site),
    });

    expect(document.title).toBe("Home Page");
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Home description");
  });

  it("should match routes with a trailing slash", () => {
    const pages = [
      {
        name: "Examples",
        route: "/examples",
        component: () => null,
        title: "Examples — Test Site",
      },
    ];
    const site = { name: "Test Site" };

    renderHook(() => usePageMetadata(), {
      wrapper: ({ children }) => (
        <DocsProvider pages={pages} site={site}>
          <MemoryRouter initialEntries={["/examples/"]}>
            {children}
          </MemoryRouter>
        </DocsProvider>
      ),
    });

    expect(document.title).toBe("Examples — Test Site");
  });

  it("should update metadata when navigating between routes", () => {
    const pages = [
      {
        name: "Home",
        route: "/",
        component: () => null,
        title: "Home — Test Site",
        description: "Home description",
      },
      {
        name: "Examples",
        route: "/examples",
        component: () => null,
        title: "Examples — Test Site",
        description: "Examples description",
      },
      {
        name: "About",
        route: "/about",
        component: () => null,
      },
    ];
    const site = { name: "Test Site", description: "Test Description" };

    const Navigator = () => {
      usePageMetadata();
      const navigate = useNavigate();
      return (
        <>
          <button onClick={() => navigate("/examples")}>to examples</button>
          <button onClick={() => navigate("/about")}>to about</button>
        </>
      );
    };

    render(
      <DocsProvider pages={pages} site={site}>
        <MemoryRouter initialEntries={["/"]}>
          <Navigator />
        </MemoryRouter>
      </DocsProvider>
    );

    expect(document.title).toBe("Home — Test Site");

    fireEvent.click(screen.getByText("to examples"));
    expect(document.title).toBe("Examples — Test Site");
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
    ).toBe("Examples description");

    fireEvent.click(screen.getByText("to about"));
    expect(document.title).toBe("Test Site");
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
    ).toBe("Test Description");
  });
});
