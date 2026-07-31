import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OiLayout from "./layout";
import { tifDb } from "@/lib/tif/db";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $queryRaw: vi.fn().mockResolvedValue([
      {
        today: 0,
        intake: 3,
        pipeline: 2,
        accounts: 4,
      },
    ]),
  },
}));

describe("OiLayout", () => {
  it("renders the POIS navigation and badge counts from one aggregate query", async () => {
    render(await OiLayout({ children: <p>Today arrives in POIS-110</p> }));

    expect(screen.getByRole("link", { name: "Today0" })).toHaveAttribute(
      "href",
      "/tif/oi/today",
    );
    expect(screen.getByRole("link", { name: "Intake3" })).toHaveAttribute(
      "href",
      "/tif/oi/intake",
    );
    expect(screen.getByRole("link", { name: "Pipeline2" })).toHaveAttribute(
      "href",
      "/tif/oi/pipeline",
    );
    expect(screen.getByRole("link", { name: "Accounts4" })).toHaveAttribute(
      "href",
      "/tif/oi/accounts",
    );
    expect(screen.getByText("days to Oct 1")).toBeInTheDocument();
    expect(tifDb.$queryRaw).toHaveBeenCalledTimes(1);
  });
});
