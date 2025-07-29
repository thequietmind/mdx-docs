import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

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
}));

describe("CodeBlock component - Additional Coverage Tests", () => {
  it("should handle React element children with string content", () => {
    const element = <span>const code = "test";</span>;
    render(<CodeBlock>{element}</CodeBlock>);

    expect(screen.getByText('const code = "test";')).toBeInTheDocument();
  });

  it("should handle React element children with array content", () => {
    const element = <span>{["line1", "line2"]}</span>;
    render(<CodeBlock>{element}</CodeBlock>);

    expect(screen.getByText("line1line2")).toBeInTheDocument();
  });

  it("should handle clipboard write failure gracefully", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi
      .fn()
      .mockRejectedValue(new Error("Clipboard error"));

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });

    render(<CodeBlock>test code</CodeBlock>);

    const copyButton = screen.getByRole("button");
    await user.click(copyButton);

    // Should still have the copy icon (not changed to check)
    expect(screen.getByTestId("ContentCopyIcon")).toBeInTheDocument();
  });

  it("should render dark mode styles for language indicator", () => {
    // Mock dark theme
    vi.mock("@mui/material", async () => {
      const actual = await vi.importActual("@mui/material");
      return {
        ...actual,
        useTheme: () => ({
          palette: {
            mode: "dark",
            text: { primary: "#fff", secondary: "#aaa" },
            background: { paper: "#1e1e1e" },
            divider: "#444",
          },
        }),
      };
    });

    render(<CodeBlock className="language-typescript">const x = 1;</CodeBlock>);

    const languageIndicator = screen.getByText("typescript");
    expect(languageIndicator).toBeInTheDocument();
  });
});
