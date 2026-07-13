import { describe, expect, it } from "vitest";
import { compileKnowledgePackage } from "./knowledge-package";
import { orchestrateAuthorityProduction } from "./authority-orchestrator";

const completePackage = compileKnowledgePackage({
  source: {
    knowledgeId: "INC-003",
    recordType: "incident",
    title: "Missed scheduled automation run",
    context: "A daily operating workflow did not run and required an operator response.",
    businessProblem: "A daily system can fail silently when health signals are not reviewed.",
    claimBoundary: "This incident does not establish reliability, revenue impact, or a cross-client outcome.",
    confidentiality: "anonymized",
    reviewedBy: "operator",
  },
  evidence: [{ knowledgeId: "EVD-042", title: "Incident log", proofRef: "proof#incident", claimStatus: "verified", claimBoundary: "Incident only." }],
  problems: [{ knowledgeId: "PROB-009", title: "Invisible operational failure", claimBoundary: "Observed controls only." }],
  patterns: [{ knowledgeId: "PAT-021", title: "Observability", claimBoundary: "No broad reliability claim." }],
  frameworks: [{ knowledgeId: "FRM-004", title: "Production readiness", claimBoundary: "Guides review only." }],
  knowledgeDiagrams: [{ knowledgeId: "KD-018", title: "Incident loop", claimBoundary: "Reviewed control flow only." }],
});

describe("Authority Production Orchestrator", () => {
  it("creates report-only opportunities for missing package assets without duplicating existing assets", () => {
    const result = orchestrateAuthorityProduction({
      experiences: [{ id: "INC-003", title: "Missed scheduled automation run", status: "approved", coverage: ["RachelOS", "AI"], evidenceIds: ["EVD-042"] }],
      evidence: [{ id: "EVD-042", title: "Incident log", status: "approved", coverage: ["RachelOS", "AI"], assetIds: [], experienceIds: ["INC-003"] }],
      diagrams: [{ id: "KD-018", title: "Incident loop", status: "approved", coverage: ["RachelOS"], evidenceIds: ["EVD-042"], consumerAssetIds: [] }],
      problems: [{ id: "PROB-009", title: "Invisible operational failure", status: "approved", coverage: ["AI"], evidenceIds: ["EVD-042"], assetIds: [], requiresDiagram: true, requiresFramework: true, diagramIds: ["KD-018"], frameworkIds: ["FRM-004"] }],
      patterns: [{ id: "PAT-021", title: "Observability", status: "approved", coverage: ["AI"], evidenceIds: ["EVD-042"], assetIds: [] }],
      frameworks: [{ id: "FRM-004", title: "Production readiness", status: "approved", coverage: ["AI"], evidenceIds: ["EVD-042"], assetIds: [] }],
      assets: [{ id: "asset-1", title: "Incident guide", kind: "website_guide", status: "review", coverage: ["RachelOS"], evidenceIds: ["EVD-042"], diagramIds: ["KD-018"], experienceId: "INC-003" }],
      packages: [completePackage],
    });

    expect(result.dashboard.approvedExperiences).toBe(1);
    expect(result.dashboard.approvedEvidence).toBe(1);
    expect(result.opportunities.some((item) => item.kind === "website_guide")).toBe(false);
    expect(result.opportunities.some((item) => item.kind === "assessment")).toBe(true);
    expect(result.diagramDependencies).toEqual([{ assetId: "asset-1", asset: "Incident guide", kind: "website_guide", status: "covered", diagrams: ["KD-018"] }]);
    expect(result.publicationPlanner.today).toContain("Review Incident guide.");
  });

  it("reports problem gaps and turns package blockers into capture tasks", () => {
    const blockedPackage = compileKnowledgePackage({
      source: {
        knowledgeId: "INC-004",
        recordType: "incident",
        title: "Unclassified operating incident",
        context: "An incident was retained for review without a complete supporting record.",
        businessProblem: "The operating condition has not yet been classified into reusable knowledge.",
        claimBoundary: "This record does not establish an outcome, cause, or reusable method.",
        confidentiality: "restricted",
        reviewedBy: "operator",
      },
    });
    const result = orchestrateAuthorityProduction({
      experiences: [], evidence: [], diagrams: [], patterns: [], frameworks: [], assets: [], packages: [blockedPackage],
      problems: [{ id: "PROB-001", title: "Decision latency", status: "review", coverage: ["Decision Latency"], evidenceIds: [], assetIds: [], requiresDiagram: true, requiresFramework: true, requiresScreenshot: true, requiresMetric: true, requiresReview: true, requiresPublication: true }],
    });

    expect(result.packageReadiness[0]).toMatchObject({ status: "blocked", missingEvidence: true, missingDiagram: true, missingFramework: true, missingPattern: true });
    expect(result.missingEvidence[0]).toMatchObject({ missingEvidence: ["No linked admitted Evidence."], missingDiagrams: ["No linked Knowledge Diagram."], missingFrameworks: ["No linked Operating Framework."], missingScreenshots: ["No reviewed screenshot reference."], missingMetrics: ["No source-backed metric reference."] });
    expect(result.captureQueue.length).toBeGreaterThan(0);
  });

  it("finds duplicates and unused records without treating unknown evidence as approved", () => {
    const result = orchestrateAuthorityProduction({
      experiences: [], diagrams: [], problems: [], patterns: [], packages: [], frameworks: [
        { id: "FRM-1", title: "Operating Review", status: "approved", coverage: ["Enterprise Operations"], evidenceIds: [], assetIds: [] },
        { id: "FRM-2", title: "Operating review", status: "approved", coverage: ["Enterprise Operations"], evidenceIds: [], assetIds: [] },
      ],
      evidence: [{ id: "EVD-1", title: "Unclassified source", status: "unknown", coverage: ["Healthcare"], assetIds: [], experienceIds: [] }],
      assets: [{ id: "asset-1", title: "Unlinked guide", kind: "guide", status: "draft", coverage: ["Healthcare"], evidenceIds: [], diagramIds: [] }],
    });

    expect(result.dashboard.approvedEvidence).toBe(0);
    expect(result.dashboard.unclassifiedEvidence).toBe(1);
    expect(result.quality.duplicateFrameworks).toEqual([["Operating Review", "Operating review"]]);
    expect(result.quality.orphanEvidence).toEqual(["EVD-1"]);
    expect(result.quality.unusedFrameworks).toEqual(["FRM-1", "FRM-2"]);
  });
});
