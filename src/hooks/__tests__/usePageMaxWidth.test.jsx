import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import { usePageMaxWidth, DEFAULT_CONTENT_MAX_WIDTH } from "../usePageMaxWidth";
import { useShowSidebar } from "../useShowSidebar";

// Mimics the React.lazy payload shape that useCurrentFrontmatter reads from.
const lazyWithFrontmatter = (frontmatter) => ({
  _payload: { _result: { default: () => null, frontmatter } },
  _init: () => {},
});

const createWrapper = (pages, initialPath = "/") => {
  const site = { name: "Test Site" };
  return ({ children }) => (
    <DocsProvider pages={pages} site={site}>
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    </DocsProvider>
  );
};

const pageWithFrontmatter = (frontmatter) => [
  { name: "Home", route: "/", component: lazyWithFrontmatter(frontmatter) },
];

describe("usePageMaxWidth", () => {
  it("defaults to 960 when maxWidth is not set", () => {
    const { result } = renderHook(() => usePageMaxWidth(), {
      wrapper: createWrapper(pageWithFrontmatter({})),
    });

    expect(result.current).toBe(DEFAULT_CONTENT_MAX_WIDTH);
  });

  it("defaults to 960 when the page has no frontmatter", () => {
    const pages = [{ name: "Home", route: "/", component: () => null }];
    const { result } = renderHook(() => usePageMaxWidth(), {
      wrapper: createWrapper(pages),
    });

    expect(result.current).toBe(DEFAULT_CONTENT_MAX_WIDTH);
  });

  it('returns "100%" when maxWidth is false', () => {
    const { result } = renderHook(() => usePageMaxWidth(), {
      wrapper: createWrapper(pageWithFrontmatter({ maxWidth: false })),
    });

    expect(result.current).toBe("100%");
  });

  it("returns the number when maxWidth is a custom cap", () => {
    const { result } = renderHook(() => usePageMaxWidth(), {
      wrapper: createWrapper(pageWithFrontmatter({ maxWidth: 1200 })),
    });

    expect(result.current).toBe(1200);
  });
});

describe("useShowSidebar (shared frontmatter reader)", () => {
  it("returns true by default", () => {
    const { result } = renderHook(() => useShowSidebar(), {
      wrapper: createWrapper(pageWithFrontmatter({})),
    });

    expect(result.current).toBe(true);
  });

  it("returns false when sidebar is false", () => {
    const { result } = renderHook(() => useShowSidebar(), {
      wrapper: createWrapper(pageWithFrontmatter({ sidebar: false })),
    });

    expect(result.current).toBe(false);
  });
});
