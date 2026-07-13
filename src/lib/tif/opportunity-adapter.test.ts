import { describe, expect, it } from "vitest";
import { compileKnowledgePackage } from "./knowledge-package";
import { opportunityCandidateMarker, planOpportunityCandidates } from "./opportunity-adapter";

const packageForReview = compileKnowledgePackage({
  source: {
    knowledgeId: "INC-101",
    recordType: "incident",
    title: "Approved operating incident",
    context: "A reviewed operating incident has enough context for a bounded package.",
    businessProblem: "An operating workflow could fail without a visible control loop.",
    claimBoundary: "The incident supports no broad reliability or commercial claim.",
    confidentiality: "anonymized",
    reviewedBy: "operator",
  },
  evidence: [{ knowledgeId: "EVD-101", title: "Reviewed incident record", proofRef: "proof#101", claimStatus: "verified", claimBoundary: "Incident only." }],
  problems: [{ knowledgeId: "PROB-101", title: "Invisible failure", claimBoundary: "Observed control only." }],
  patterns: [{ knowledgeId: "PAT-101", title: "Observability", claimBoundary: "No all-environment claim." }],
  frameworks: [{ knowledgeId: "FRM-101", title: "Readiness review", claimBoundary: "Review guidance only." }],
  knowledgeDiagrams: [{ knowledgeId: "KD-101", title: "Health loop", claimBoundary: "Reviewed flow only." }],
});

describe("Opportunity adapter", () => {
  it("returns review-only candidates with evidence and inherited claim boundaries", () => {
    const candidates = planOpportunityCandidates([packageForReview], []);
    const guide = candidates.find((candidate) => candidate.kind === "website_guide");

    expect(guide).toMatchObject({
      candidateId: "KAP-INC-101:website_guide",
      status: "review_required",
      evidenceIds: ["EVD-101"],
    });
    expect(guide?.claimBoundary).toContain("Incident only.");
    expect(guide?.reviewInstruction).toContain("human");
  });

  it("recognizes an accepted candidate marker and never asks for a duplicate Opportunity", () => {
    const candidateId = "KAP-INC-101:assessment";
    const candidates = planOpportunityCandidates([packageForReview], [{
      id: "opp-1",
      slug: "approved-incident-assessment",
      title: "Approved operating incident — Assessment",
      contextNotes: `Human accepted. ${opportunityCandidateMarker(candidateId)}`,
      evidenceIds: ["EVD-101"],
      assetCount: 0,
    }]);

    expect(candidates.find((candidate) => candidate.candidateId === candidateId)).toMatchObject({
      status: "duplicate",
      duplicateOf: { id: "opp-1", slug: "approved-incident-assessment" },
    });
  });
});
