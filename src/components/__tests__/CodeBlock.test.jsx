import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Prism from "prismjs";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import CodeBlock from "../CodeBlock";

// Mock prism-react-renderer
vi.mock("prism-react-renderer", () => ({
  Highlight: ({ children, code, language }) => {
    return children({
      className: `language-${language}`,
      style: {},
      tokens: [[{ content: code, types: ["plain"] }]],
      getLineProps: ({ key }) => ({ key }),
      getTokenProps: ({ key }) => ({ key, children: code }),
    });
  },
  themes: {
    oneDark: {},
    oneLight: {},
  },
}));

const renderCodeBlock = (ui, codeBlocks) =>
  render(
    <DocsProvider pages={[]} site={{ name: "Docs" }} codeBlocks={codeBlocks}>
      {ui}
    </DocsProvider>
  );

describe("CodeBlock component", () => {
  const defaultCode = 'const greeting = "Hello, World!";';

  beforeEach(() => {
    // Mock console.error to suppress clipboard API warnings in tests
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should render code content", () => {
    renderCodeBlock(<CodeBlock>{defaultCode}</CodeBlock>);

    expect(screen.getByText(defaultCode)).toBeInTheDocument();
  });

  it("should render with default language (jsx)", () => {
    renderCodeBlock(<CodeBlock>{defaultCode}</CodeBlock>, { titleBar: true });

    // Check for the language label
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should render with custom language", () => {
    renderCodeBlock(
      <CodeBlock className="language-python">print("Hello")</CodeBlock>,
      { titleBar: true }
    );

    // Check for the language label
    expect(screen.getByText("python")).toBeInTheDocument();
  });

  it("should render copy button", () => {
    renderCodeBlock(<CodeBlock>{defaultCode}</CodeBlock>);

    const copyButton = screen.getByRole("button");
    expect(copyButton).toBeInTheDocument();
  });

  it("should copy code to clipboard when copy button is clicked", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);

    // Mock clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });

    renderCodeBlock(<CodeBlock>{defaultCode}</CodeBlock>);

    const copyButton = screen.getByRole("button");
    await user.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith(defaultCode);
  });

  it("should show check icon after copying", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });

    renderCodeBlock(<CodeBlock>{defaultCode}</CodeBlock>);

    const copyButton = screen.getByRole("button");
    await user.click(copyButton);

    // Should show check icon after copy
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
  });

  it("should handle empty children gracefully", () => {
    renderCodeBlock(<CodeBlock />, { titleBar: true });

    // Should still render the container
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should handle children as array", () => {
    const codeArray = ["line1\n", "line2"];
    renderCodeBlock(<CodeBlock>{codeArray}</CodeBlock>, { titleBar: true });

    // CodeBlock handles arrays by showing empty content
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should display language indicator", () => {
    renderCodeBlock(
      <CodeBlock className="language-javascript">{defaultCode}</CodeBlock>,
      { titleBar: true }
    );

    expect(screen.getByText("javascript")).toBeInTheDocument();
  });

  it("should not render the title bar by default", () => {
    renderCodeBlock(
      <CodeBlock className="language-javascript">{defaultCode}</CodeBlock>
    );

    expect(screen.queryByText("javascript")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should turn off Prism's automatic highlighting of the page", () => {
    expect(Prism.manual).toBe(true);
  });
});
