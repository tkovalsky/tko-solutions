import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import OiLayout from "./layout";
import { tifDb } from "@/lib/tif/db";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $queryRaw: vi.fn().mockResolvedValue([
      {
        today: 5,
        intake: 3,
        pipeline: 2,
      },
    ]),
  },
}));

describe("OiLayout", () => {
  it("renders the POIS navigation and badge counts from one aggregate query", async () => {
    render(await OiLayout({ children: <p>Today arrives in POIS-110</p> }));

    expect(screen.getByRole("link", { name: "Today5" })).toHaveAttribute(
      "href",
      "/tif/oi/today",
    );
    expect(screen.getByRole("link", { name: "Intake3" })).toHaveAttribute(
      "href",
      "/tif/oi/intake",
    );
    expect(screen.getByRole("link", { name: "Pipeline2" })).toHaveAttribute(
      "href",
      "/tif/oi/opportunities",
    );
    expect(screen.queryByRole("link", { name: /Accounts/ })).not.toBeInTheDocument();
    expect(screen.getByText("days to Oct 1")).toBeInTheDocument();
    expect(tifDb.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it("queries shell badges with the documented semantics", async () => {
    render(await OiLayout({ children: <p>shell</p> }));

    const sql = String(vi.mocked(tifDb.$queryRaw).mock.calls[0]?.[0]);
    expect(sql).toContain('"OiNextAction"');
    expect(sql).toContain('"status" = \'open\'');
    expect(sql).toContain('"dueAt" <=');
    expect(sql).toContain('"OiSignal"');
    expect(sql).toContain("'tier_1', 'tier_2'");
    expect(sql).toContain('"OiOpportunity"');
    expect(sql).toContain("'dismissed'");
    expect(sql).toContain("'closed'");
    expect(sql).not.toContain('"OiOrganization"');
  });

  it("defines visible provenance styles for every semantic class", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

    for (const className of ["fact-stated", "fact-operator", "fact-inferred", "hypothesis-inferred"]) {
      const rule = css.match(new RegExp(`\\.${className}\\s*\\{([^}]+)\\}`));
      expect(rule?.[1]?.trim()).toBeTruthy();
      expect(rule?.[1]).toMatch(/border|background/);
    }
  });
});
