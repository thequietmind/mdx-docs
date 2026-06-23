import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import { useShowFooter } from "../useShowFooter";
import { useShowToolbar } from "../useShowToolbar";

// Mimics the React.lazy payload shape that useCurrentFrontmatter reads from.
const lazyWithFrontmatter = (frontmatter) => ({
  _payload: { _result: { default: () => null, frontmatter } },
  _init: () => {},
});

const createWrapper = (frontmatter) => {
  const pages = [
    { name: "Home", route: "/", component: lazyWithFrontmatter(frontmatter) },
  ];
  const site = { name: "Test Site" };
  return ({ children }) => (
    <DocsProvider pages={pages} site={site}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </DocsProvider>
  );
};

describe("useShowToolbar", () => {
  it("returns true by default", () => {
    const { result } = renderHook(() => useShowToolbar(), {
      wrapper: createWrapper({}),
    });

    expect(result.current).toBe(true);
  });

  it("returns false when toolbar is false", () => {
    const { result } = renderHook(() => useShowToolbar(), {
      wrapper: createWrapper({ toolbar: false }),
    });

    expect(result.current).toBe(false);
  });
});

describe("useShowFooter", () => {
  it("returns true by default", () => {
    const { result } = renderHook(() => useShowFooter(), {
      wrapper: createWrapper({}),
    });

    expect(result.current).toBe(true);
  });

  it("returns false when footer is false", () => {
    const { result } = renderHook(() => useShowFooter(), {
      wrapper: createWrapper({ footer: false }),
    });

    expect(result.current).toBe(false);
  });
});
