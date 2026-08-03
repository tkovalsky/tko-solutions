import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OiError from "./error";

describe("OiError", () => {
  it("renders a recoverable POIS error state", () => {
    render(<OiError error={new Error("blocked")} reset={vi.fn()} />);

    expect(screen.getByText("Something blocked this action.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Today" })).toHaveAttribute("href", "/tif/oi/today");
  });
});
