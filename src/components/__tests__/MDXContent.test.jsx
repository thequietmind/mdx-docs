import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import MDXContent from "../MDXContent";
import BlockquoteParagraphs from "./fixtures/blockquote-paragraphs.mdx";
import InlineParagraphs from "./fixtures/inline-paragraphs.mdx";
import StandaloneButtons from "./fixtures/standalone-buttons.mdx";

const renderPage = (component) =>
  render(
    <DocsProvider
      pages={[{ name: "Page", route: "/", component }]}
      site={{ name: "Test Site" }}
    >
      <MemoryRouter initialEntries={["/"]}>
        <MDXContent />
      </MemoryRouter>
    </DocsProvider>
  );

describe("MDXContent paragraphs", () => {
  it("keeps each blockquote paragraph containing <kbd> in its own <p>", () => {
    const { container } = renderPage(BlockquoteParagraphs);

    const paragraphs = container.querySelectorAll("blockquote > p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(/^Add control to any/);
    expect(paragraphs[1]).toHaveTextContent(/^For command \+ shift \+ 4/);
  });

  it("keeps consecutive paragraphs with a link and inline code separate", () => {
    const { container } = renderPage(InlineParagraphs);

    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toContainElement(
      screen.getByRole("link", { name: "getting started guide" })
    );
    expect(paragraphs[1].querySelector("code")).toHaveTextContent("yarn dev");
  });

  it("does not wrap components on their own lines in a <p>", () => {
    const { container } = renderPage(StandaloneButtons);

    expect(container.querySelectorAll("p")).toHaveLength(1);
    screen.getAllByRole("button").forEach((button) => {
      expect(button.closest("p")).toBeNull();
    });
  });
});
