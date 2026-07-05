import { describe, expect, it } from "vitest";
import {
  buildArchitectureIntelligence,
  buildDecisionIntelligence,
  buildFeatureIntelligence,
  buildProofRegistry,
  computeEvidenceCoverage,
} from "./proof";

describe("TIF proof registry", () => {
  it("builds source-backed proof, feature, decision, changelog, and architecture views", () => {
    const proofs = buildProofRegistry();
    const features = buildFeatureIntelligence();
    const decisions = buildDecisionIntelligence();
    const architecture = buildArchitectureIntelligence();
    const coverage = computeEvidenceCoverage();

    expect(proofs.some((proof) => proof.id === "canonical-queue")).toBe(true);
    expect(proofs.some((proof) => proof.screenshotPaths?.includes("public/proof/rachelos/canonical-queue.png"))).toBe(true);
    expect(features.map((feature) => feature.slug)).toContain("queue-intelligence");
    expect(decisions.map((decision) => decision.id)).toContain("DEC-2026-07-01-TIF-Deliverable-Centric-View");
    expect(architecture.map((page) => page.slug)).toEqual([
      "lead-lifecycle",
      "relationship-lifecycle",
      "outreach-lifecycle",
      "content-lifecycle",
    ]);
    expect(coverage.screenshots).toBeGreaterThan(0);
    expect(coverage.sourceRelationships).toBeGreaterThan(coverage.proofAssets);
  });
});
