import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OiTodayPage from "./page";

describe("OiTodayPage", () => {
  it("renders the POIS-110 placeholder", () => {
    render(<OiTodayPage />);

    expect(screen.getByText("Today arrives in POIS-110")).toBeInTheDocument();
  });
});
