import { describe, expect, it } from "vitest";
import { buildAuthorityWorkQueue } from "./authority-work-queue";
import { compileKnowledgePackage } from "./knowledge-package";

describe("Authority Work Queue", () => {
  it("puts missing package proof ahead of asset production and estimates unlocked assets", () => {
    const blocked = compileKnowledgePackage({
      source: {
        knowledgeId: "EXP-001",
        recordType: "experience",
        title: "Decision-rights recovery",
        context: "A reviewed operating recovery engagement needs its source links classified.",
        businessProblem: "Exception work waits because decision rights are implicit.",
        claimBoundary: "No client result or general outcome is established.",
        confidentiality: "anonymized",
        reviewedBy: "operator",
      },
    });
    const queue = buildAuthorityWorkQueue({ assets: [], packages: [blocked], opportunities: [] });

    expect(queue[0]).toMatchObject({
      priority: "P0",
      experience: "EXP-001",
      businessProblem: "Exception work waits because decision rights are implicit.",
      estimatedAssetsUnlocked: 13,
    });
    expect(queue[0].missingEvidence.join(" ")).toContain("Evidence");
    expect(queue[0].recommendedNextAction).toContain("Admit and classify");
  });

  it("uses persisted runtime work without inventing Experience or Problem records", () => {
    const queue = buildAuthorityWorkQueue({
      packages: [],
      opportunities: [{ id: "opp-1", title: "Authority assessment", assetType: "assessment", angle: "Assess a real bottleneck.", evidenceIds: [], assetCount: 0 }],
      assets: [{ id: "asset-1", title: "Unlinked guide", kind: "guide", status: "draft", coverage: [], evidenceIds: [], diagramIds: [] }],
    });

    expect(queue[0]).toMatchObject({ priority: "P0", title: "Repair evidence lineage: Unlinked guide" });
    expect(queue[0].experience).toContain("Untracked");
    expect(queue.some((item) => item.title === "Review Opportunity: Authority assessment")).toBe(true);
  });
});
