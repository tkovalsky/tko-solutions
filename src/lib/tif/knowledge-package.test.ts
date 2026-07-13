import { describe, expect, it } from "vitest";
import { compileKnowledgePackage } from "./knowledge-package";

const reviewedExperience = {
  source: {
    knowledgeId: "INC-003",
    recordType: "incident" as const,
    title: "Missed scheduled automation run",
    context: "A daily operating workflow did not run and required an operator response.",
    businessProblem: "A daily system can fail silently when health signals are not reviewed.",
    claimBoundary: "This incident does not establish reliability, revenue impact, or a cross-client outcome.",
    confidentiality: "anonymized" as const,
    reviewedBy: "operator",
  },
  evidence: [
    {
      knowledgeId: "EVD-042",
      title: "Incident log and postmortem",
      proofRef: "content/proof/rachelos/evidence.yaml#system-health",
      claimStatus: "verified" as const,
      claimBoundary: "The record verifies this incident and response only.",
    },
  ],
  problems: [{ knowledgeId: "PROB-009", title: "Invisible operational failure", claimBoundary: "Scope is limited to observed system-health controls." }],
  patterns: [{ knowledgeId: "PAT-021", title: "Observability requirement", claimBoundary: "This is not evidence of all-environment reliability." }],
  frameworks: [{ knowledgeId: "FRM-004", title: "Production readiness review", claimBoundary: "The framework guides review; it does not guarantee prevention." }],
  knowledgeDiagrams: [{ knowledgeId: "KD-018", title: "Production Health and Incident Loop", claimBoundary: "The diagram represents the reviewed control flow only." }],
};

describe("Knowledge Asset Package compiler", () => {
  it("creates all required draft briefs with complete source lineage", () => {
    const result = compileKnowledgePackage(reviewedExperience);

    expect(result.assets).toHaveLength(13);
    expect(result.assets.every((asset) => asset.status === "draft")).toBe(true);
    expect(result.assets.every((asset) => asset.lineage.experience === "INC-003")).toBe(true);
    expect(result.assets.every((asset) => asset.lineage.evidence[0] === "EVD-042")).toBe(true);
    expect(result.assets.every((asset) => asset.lineage.knowledgeDiagrams[0] === "KD-018")).toBe(true);
    expect(result.publicationReadiness.status).toBe("review_required");
  });

  it("inherits the strictest evidence status and every linked claim boundary", () => {
    const result = compileKnowledgePackage({
      ...reviewedExperience,
      evidence: [
        ...reviewedExperience.evidence,
        {
          knowledgeId: "EVD-043",
          title: "Owner confirmation",
          proofRef: "DECISIONS.md#incident-review",
          claimStatus: "experience_based",
          claimBoundary: "The observed lesson is limited to one operating environment.",
        },
      ],
    });

    expect(result.claimBoundary.strictestStatus).toBe("experience_based");
    expect(result.assets[0].claimBoundary).toContain("The observed lesson is limited to one operating environment.");
  });

  it("blocks publication and identifies every unresolved knowledge link", () => {
    const result = compileKnowledgePackage({ source: reviewedExperience.source });

    expect(result.publicationReadiness.status).toBe("blocked");
    expect(result.missingProof.join(" ")).toContain("Evidence");
    expect(result.missingProof.join(" ")).toContain("Operating Problem");
    expect(result.missingProof.join(" ")).toContain("Operating Pattern");
    expect(result.missingProof.join(" ")).toContain("Operating Framework");
    expect(result.missingProof.join(" ")).toContain("Knowledge Diagram");
  });

  it("does not allow unsupported evidence to become publication-ready", () => {
    const result = compileKnowledgePackage({
      ...reviewedExperience,
      evidence: [{ ...reviewedExperience.evidence[0], claimStatus: "unsupported" }],
    });

    expect(result.claimBoundary.strictestStatus).toBe("unsupported");
    expect(result.publicationReadiness.status).toBe("blocked");
  });
});
