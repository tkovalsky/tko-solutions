import { describe, expect, it } from "vitest";
import {
  buildDeliverableRegistry,
  evaluateDeliverableReadiness,
  getIgnoredDeliverables,
  getNextBestDeliverables,
} from "./deliverables";

const evidence = {
  slug: "ev-human-api",
  domain: "healthcare",
  observation:
    "Critical operational knowledge depends on specific individuals, creating delay, burden, and Human API risk.",
  proofRef: "content/proof/healthcare/evidence.yaml#human-api-root-pattern",
  claimGuard: "Pattern-level advisory evidence. No named organization or metric.",
};

describe("TIF deliverable readiness", () => {
  it("scores article readiness from problem, evidence, and insight only", () => {
    const result = evaluateDeliverableReadiness({
      type: "article",
      title: "Human APIs Become Organizational Bottlenecks",
      angle: "When knowledge lives in a person instead of a system, that person becomes a bottleneck.",
      evidence: [evidence],
    });

    expect(result.readiness).toBe(100);
    expect(result.missing_components).toEqual([]);
  });

  it("blocks a case study without proof even when other fields have signals", () => {
    const result = evaluateDeliverableReadiness({
      type: "case_study",
      title: "From Manual Queue To Decision System",
      angle: "The starting state changed after the system design intervention produced a result.",
      evidence: [{ ...evidence, proofRef: "" }],
    });

    expect(result.readiness).toBe(75);
    expect(result.blocking_gaps).toEqual(["proof"]);
  });

  it("builds deliverables from opportunities without creating storage records", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "human-apis-become-organizational-bottlenecks",
          title: "Human APIs Become Organizational Bottlenecks",
          businessUnit: "tko",
          assetType: "article",
          angle: "When operational knowledge lives in a person instead of a system, that person becomes a bottleneck.",
          audience: "Healthcare operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [],
        },
      ],
      assets: [],
    });

    expect(deliverables).toHaveLength(1);
    expect(deliverables[0]).toMatchObject({
      type: "article",
      status: "ready",
      readiness: 100,
      priority_score: 94,
      evidence_count: 1,
      has_asset: false,
      next_action: "Produce the deliverable from the existing opportunity and evidence.",
    });
  });

  it("ranks next best deliverables by deterministic production priority", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "ready-article",
          title: "Operational Intelligence vs Reporting",
          businessUnit: "tko",
          assetType: "article",
          angle: "Reporting is not operational intelligence because leaders still need a next move.",
          audience: "Operations leaders.",
          evidenceLinks: [{ evidence }],
          assets: [{ slug: "ready-article", status: "draft" }],
        },
        {
          slug: "almost-ready-brief",
          title: "Operational Recovery Executive Brief",
          businessUnit: "tko",
          assetType: "executive_brief",
          angle:
            "The business problem is delay from Human API dependency; evidence shows operational risk and impact.",
          evidenceLinks: [{ evidence }],
          audience: "Healthcare operators.",
          assets: [],
        },
      ],
      assets: [],
    });

    expect(getNextBestDeliverables(deliverables, 2).map((item) => item.id)).toEqual([
      "ready-article",
      "almost-ready-brief",
    ]);
    expect(deliverables.find((item) => item.id === "ready-article")).toMatchObject({
      priority_score: 100,
      completion_probability: 100,
      estimated_effort_minutes: 15,
      next_action: "Review final asset and publish manually.",
    });
  });

  it("surfaces blocker details and ignores work outside a 2-hour window", () => {
    const deliverables = buildDeliverableRegistry({
      opportunities: [
        {
          slug: "blocked-report",
          title: "Empty Report",
          businessUnit: "cre",
          assetType: "intelligence_report",
          angle: "",
          audience: null,
          evidenceLinks: [],
          assets: [],
        },
      ],
      assets: [],
    });

    expect(deliverables[0].blocker_details).toEqual(
      expect.arrayContaining([{ kind: "missing_evidence", label: "missing evidence" }]),
    );
    expect(getIgnoredDeliverables(deliverables)).toHaveLength(1);
    expect(deliverables[0].ignore_reason).toBe("Blocked with low completion probability.");
  });
});
