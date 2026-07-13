import type { KnowledgePackage, KnowledgePackageAssetBrief } from "./knowledge-package";

/**
 * Boundary between compiler output and the existing AssetOpportunity registry.
 * This module is intentionally pure: candidates must be accepted by a human and
 * created through the existing Opportunity workflow. It never writes Prisma rows.
 */
export const OPPORTUNITY_CANDIDATE_MARKER = "TIF-OPPORTUNITY-CANDIDATE";

export type ExistingOpportunityForAdapter = {
  id: string;
  slug: string;
  title: string;
  contextNotes: string | null;
  evidenceIds: string[];
  assetCount: number;
};

export type OpportunityCandidate = {
  candidateId: string;
  packageId: string;
  experienceId: string;
  title: string;
  kind: KnowledgePackageAssetBrief["kind"];
  evidenceIds: string[];
  claimBoundary: string[];
  publicationReadiness: KnowledgePackageAssetBrief["publicationReadiness"];
  status: "review_required" | "blocked" | "duplicate";
  blockingDependencies: string[];
  duplicateOf?: { id: string; slug: string; title: string };
  reviewInstruction: string;
};

function candidateId(packageId: string, kind: KnowledgePackageAssetBrief["kind"]) {
  return `${packageId}:${kind}`;
}

export function opportunityCandidateMarker(id: string) {
  return `${OPPORTUNITY_CANDIDATE_MARKER}: ${id}`;
}

export function planOpportunityCandidates(
  packages: KnowledgePackage[],
  existingOpportunities: ExistingOpportunityForAdapter[],
): OpportunityCandidate[] {
  return packages.flatMap((pkg) => pkg.assets.map((asset) => {
    const id = candidateId(pkg.packageId, asset.kind);
    const duplicate = existingOpportunities.find((opportunity) =>
      opportunity.contextNotes?.includes(opportunityCandidateMarker(id)),
    );
    const blocked = asset.publicationReadiness === "blocked";

    return {
      candidateId: id,
      packageId: pkg.packageId,
      experienceId: pkg.source.knowledgeId,
      title: asset.title,
      kind: asset.kind,
      evidenceIds: asset.lineage.evidence,
      claimBoundary: asset.claimBoundary,
      publicationReadiness: asset.publicationReadiness,
      status: duplicate ? "duplicate" : blocked ? "blocked" : "review_required",
      blockingDependencies: duplicate ? [] : pkg.missingProof,
      ...(duplicate ? { duplicateOf: { id: duplicate.id, slug: duplicate.slug, title: duplicate.title } } : {}),
      reviewInstruction: duplicate
        ? "Use the existing Opportunity; do not create a second record."
        : blocked
          ? "Resolve the package proof gaps before asking a human to create an Opportunity."
          : "A human must verify lineage, claim boundaries, target Asset/DerivativeAsset mapping, and duplicate search before creating an existing AssetOpportunity.",
    };
  }));
}
