import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildTimeline } from "./timeline";

describe("buildTimeline", () => {
  it("merges signals, activities, status-change activities, and decisions oldest first", () => {
    const timeline = buildTimeline({
      initiative: {
        signalLinks: [
          {
            signal: {
              id: "signal-1",
              summary: "Executive hired",
              occurredAt: "2026-07-01T12:00:00Z",
              source: { canonicalUrl: "https://example.com/executive" },
            },
          },
        ],
      },
      activities: [
        {
          id: "activity-1",
          type: "status_change",
          summary: "Status changed",
          fromStatus: "identified",
          toStatus: "qualified",
          occurredAt: "2026-07-02T12:00:00Z",
        },
        {
          id: "activity-2",
          type: "outreach_sent",
          summary: "Outreach sent",
          occurredAt: "2026-07-03T12:00:00Z",
        },
      ],
      decisions: [
        {
          id: "decision-1",
          type: "close_opportunity",
          decision: "closed",
          reason: "Outcome recorded.",
          createdAt: "2026-07-04T12:00:00Z",
        },
      ],
    });

    expect(timeline.map((entry) => entry.kind)).toEqual(["signal", "status_change", "activity", "decision"]);
    expect(timeline.map((entry) => entry.label)).toEqual([
      "Executive hired",
      "Status changed from identified to qualified",
      "Outreach sent",
      "close_opportunity: closed. Outcome recorded.",
    ]);
  });

  it("does not reference a dedicated timeline model in the implementation", () => {
    const forbidden = ["Oi", "Timeline"].join("");
    const implementation = readFileSync("src/lib/opportunity-intelligence/action/timeline.ts", "utf8");

    expect(implementation).not.toContain(forbidden);
  });
});
