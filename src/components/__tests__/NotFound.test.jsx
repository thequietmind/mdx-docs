import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import NotFound from "../NotFound";

describe("NotFound component", () => {
  it("links home under the router's basename", () => {
    render(
      <MemoryRouter basename="/docs/" initialEntries={["/docs/missing"]}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute(
      "href",
      "/docs/"
    );
  });
});
