import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { DocsProvider } from "../../context/DocsProvider";

import Footer from "../Footer";

const renderWithProvider = (footer) =>
  render(
    <DocsProvider pages={[]} site={{ name: "Docs" }} footer={footer}>
      <Footer />
    </DocsProvider>
  );

describe("Footer component", () => {
  it("renders the attribution by default", () => {
    renderWithProvider();

    expect(screen.getByText(/Built with/i)).toBeInTheDocument();
  });

  it("links 'MDX Docs' to the marketing site as an external link", () => {
    renderWithProvider();

    const link = screen.getByRole("link", { name: "MDX Docs" });
    expect(link).toHaveAttribute("href", "https://mdxdocs.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render when the footer is disabled", () => {
    renderWithProvider({ enabled: false });

    expect(screen.queryByText(/Built with/i)).not.toBeInTheDocument();
  });

  it("renders custom content instead of the default attribution", () => {
    renderWithProvider({ content: <p>Made with care</p> });

    expect(screen.getByText(/Made with care/i)).toBeInTheDocument();
    expect(screen.queryByText(/Built with/i)).not.toBeInTheDocument();
  });

  it("does not render custom content when the footer is disabled", () => {
    renderWithProvider({ enabled: false, content: <p>Made with care</p> });

    expect(screen.queryByText(/Made with care/i)).not.toBeInTheDocument();
  });
});
