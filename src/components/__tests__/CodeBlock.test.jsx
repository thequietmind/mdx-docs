import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

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
    render(<CodeBlock>{defaultCode}</CodeBlock>);

    expect(screen.getByText(defaultCode)).toBeInTheDocument();
  });

  it("should render with default language (jsx)", () => {
    render(<CodeBlock>{defaultCode}</CodeBlock>);

    // Check for the language label
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should render with custom language", () => {
    render(<CodeBlock className="language-python">print("Hello")</CodeBlock>);

    // Check for the language label
    expect(screen.getByText("python")).toBeInTheDocument();
  });

  it("should render copy button", () => {
    render(<CodeBlock>{defaultCode}</CodeBlock>);

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

    render(<CodeBlock>{defaultCode}</CodeBlock>);

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

    render(<CodeBlock>{defaultCode}</CodeBlock>);

    const copyButton = screen.getByRole("button");
    await user.click(copyButton);

    // Should show check icon after copy
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
  });

  it("should handle empty children gracefully", () => {
    render(<CodeBlock />);

    // Should still render the container
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should handle children as array", () => {
    const codeArray = ["line1\n", "line2"];
    render(<CodeBlock>{codeArray}</CodeBlock>);

    // CodeBlock handles arrays by showing empty content
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("should display language indicator", () => {
    render(
      <CodeBlock className="language-javascript">{defaultCode}</CodeBlock>
    );

    expect(screen.getByText("javascript")).toBeInTheDocument();
  });
});
