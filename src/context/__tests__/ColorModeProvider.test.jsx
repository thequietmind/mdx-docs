import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ColorModeToggle from "../../components/ColorModeToggle";

import { useColorMode } from "../ColorModeContext";
import { ColorModeProvider } from "../ColorModeProvider";

const ModeProbe = () => {
  const { darkMode, toggleColorMode, setDarkMode } = useColorMode();
  return (
    <>
      <output data-testid="mode">{darkMode ? "dark" : "light"}</output>
      <button onClick={toggleColorMode}>toggle</button>
      <button onClick={() => setDarkMode(false)}>light</button>
      <button onClick={() => setDarkMode((value) => !value)}>flip</button>
    </>
  );
};

const renderProvider = (userTheme) =>
  render(
    <ColorModeProvider userTheme={userTheme}>
      <ModeProbe />
    </ColorModeProvider>
  );

const mode = () => screen.getByTestId("mode").textContent;
const schemeAttribute = () =>
  document.documentElement.getAttribute("data-mdx-docs-color-scheme");

describe("ColorModeProvider", () => {
  const defaultMatchMedia = window.matchMedia.getMockImplementation();

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-mdx-docs-color-scheme");
  });

  afterEach(() => {
    window.matchMedia.mockImplementation(defaultMatchMedia);
  });

  describe("with color schemes", () => {
    it("follows the OS setting when nothing is saved", () => {
      window.matchMedia.mockImplementation((query) => ({
        ...defaultMatchMedia(query),
        matches: query === "(prefers-color-scheme: dark)",
      }));

      renderProvider();

      expect(mode()).toBe("dark");
      expect(schemeAttribute()).toBe("dark");
      expect(localStorage.getItem("darkMode")).toBeNull();
    });

    it("uses a saved choice over the OS setting", () => {
      localStorage.setItem("darkMode", "true");

      renderProvider();

      expect(mode()).toBe("dark");
      expect(schemeAttribute()).toBe("dark");
    });

    it("saves the choice in the darkMode key when toggled", async () => {
      const user = userEvent.setup();
      renderProvider();
      expect(mode()).toBe("light");

      await user.click(screen.getByText("toggle"));

      expect(mode()).toBe("dark");
      expect(schemeAttribute()).toBe("dark");
      expect(localStorage.getItem("darkMode")).toBe("true");
    });

    it("hydrates prerendered Suspense content with the prerendered mode, then switches", async () => {
      const tree = (
        <ColorModeProvider>
          <Suspense fallback={null}>
            <ColorModeToggle />
          </Suspense>
        </ColorModeProvider>
      );
      const html = renderToString(tree);
      localStorage.setItem("darkMode", "true");
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);
      const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

      let root;
      await act(async () => {
        root = hydrateRoot(container, tree);
      });

      expect(container.querySelector("button").getAttribute("aria-label")).toBe(
        "Switch to light mode"
      );
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
      act(() => root.unmount());
      container.remove();
    });

    it("accepts a boolean or an updater in setDarkMode", async () => {
      const user = userEvent.setup();
      localStorage.setItem("darkMode", "true");
      renderProvider();

      await user.click(screen.getByText("light"));
      expect(mode()).toBe("light");
      expect(localStorage.getItem("darkMode")).toBe("false");

      await user.click(screen.getByText("flip"));
      expect(mode()).toBe("dark");
    });
  });

  describe("with settings other than palette under light or dark", () => {
    const userTheme = { dark: { typography: { h1: { fontWeight: 800 } } } };

    it("warns once and keeps the toggle and attribute working", async () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const user = userEvent.setup();

      const { unmount } = renderProvider(userTheme);
      unmount();
      renderProvider(userTheme);

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain("theme.dark.typography");
      expect(warn.mock.calls[0][0]).toContain("2.0");

      await user.click(screen.getByText("toggle"));
      expect(mode()).toBe("dark");
      expect(schemeAttribute()).toBe("dark");

      warn.mockRestore();
    });
  });
});
