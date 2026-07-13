import type { AuthorityAsset, AuthorityOrchestratorInput } from "./authority-orchestrator";
import type { KnowledgePackage } from "./knowledge-package";

export type AuthorityWorkPriority = "P0" | "P1" | "P2";

export type AuthorityWorkQueueItem = {
  id: string;
  priority: AuthorityWorkPriority;
  title: string;
  experience: string;
  businessProblem: string;
  missingEvidence: string[];
  missingDiagram: string[];
  missingFramework: string[];
  missingAssets: string[];
  estimatedAssetsUnlocked: number;
  expectedAuthorityImpact: "high" | "medium" | "low";
  expectedSeoImpact: "high" | "medium" | "low";
  expectedCommercialValue: "high" | "medium" | "low";
  blockingDependencies: string[];
  recommendedNextAction: string;
};

export type RuntimeOpportunityForWorkQueue = {
  id: string;
  title: string;
  assetType: string;
  angle: string;
  evidenceIds: string[];
  assetCount: number;
};

export type AuthorityWorkQueueInput = Pick<AuthorityOrchestratorInput, "assets" | "packages"> & {
  opportunities: RuntimeOpportunityForWorkQueue[];
};

const DIAGRAM_DEPENDENT_KINDS = new Set(["guide", "website_guide", "assessment", "proposal_module", "framework"]);

function impactFor(kind: string): Pick<AuthorityWorkQueueItem, "expectedAuthorityImpact" | "expectedSeoImpact" | "expectedCommercialValue"> {
  if (["assessment", "proposal_module", "executive_summary", "recovery_assessment_insert"].includes(kind)) {
    return { expectedAuthorityImpact: "high", expectedSeoImpact: "medium", expectedCommercialValue: "high" };
  }
  if (["website_guide", "seo_cluster", "faq", "checklist"].includes(kind)) {
    return { expectedAuthorityImpact: "medium", expectedSeoImpact: "high", expectedCommercialValue: "medium" };
  }
  return { expectedAuthorityImpact: "high", expectedSeoImpact: "medium", expectedCommercialValue: "medium" };
}

function priorityFor(blockers: string[], impacts: ReturnType<typeof impactFor>): AuthorityWorkPriority {
  if (blockers.some((blocker) => /evidence|claim|review|diagram|framework/i.test(blocker)) || impacts.expectedCommercialValue === "high") return "P0";
  if (impacts.expectedSeoImpact === "high" || impacts.expectedAuthorityImpact === "high") return "P1";
  return "P2";
}

function packageItem(pkg: KnowledgePackage, assets: AuthorityAsset[]): AuthorityWorkQueueItem {
  const missingAssets = pkg.assets
    .filter((brief) => !assets.some((asset) => asset.experienceId === pkg.source.knowledgeId && asset.kind === brief.kind))
    .map((brief) => brief.kind);
  const blockers = pkg.missingProof;
  const impacts = impactFor(missingAssets[0] ?? "framework");
  const evidence = blockers.filter((item) => /evidence/i.test(item));
  const diagram = blockers.filter((item) => /diagram/i.test(item));
  const framework = blockers.filter((item) => /framework/i.test(item));
  const action = evidence[0]
    ? "Admit and classify the cited Evidence; retain its proof reference and claim boundary."
    : diagram[0]
      ? "Register or link a reviewed Knowledge Diagram through the existing Asset lifecycle."
      : framework[0]
        ? "Review and link the existing Framework contract; do not create a duplicate registry entry."
        : "Run the package through human lineage and claim-boundary review, then submit only accepted candidates to the existing Opportunity workflow.";

  return {
    id: `package:${pkg.packageId}`,
    priority: priorityFor(blockers, impacts),
    title: `Unblock ${pkg.source.title} authority package`,
    experience: pkg.source.knowledgeId,
    businessProblem: pkg.source.businessProblem,
    missingEvidence: evidence,
    missingDiagram: diagram,
    missingFramework: framework,
    missingAssets,
    estimatedAssetsUnlocked: missingAssets.length,
    ...impacts,
    blockingDependencies: blockers,
    recommendedNextAction: action,
  };
}

function runtimeAssetItems(assets: AuthorityAsset[]): AuthorityWorkQueueItem[] {
  return assets.flatMap<AuthorityWorkQueueItem>((asset) => {
    const impacts = impactFor(asset.kind);
    const base = {
      experience: asset.experienceId ?? "Untracked — Experience is not a persisted runtime record.",
      businessProblem: "Untracked — Problem is not a persisted runtime record.",
      missingEvidence: [] as string[],
      missingDiagram: [] as string[],
      missingFramework: [] as string[],
      missingAssets: [] as string[],
      estimatedAssetsUnlocked: 1,
      ...impacts,
    };
    if (asset.evidenceIds.length === 0) {
      return [{ ...base, id: `asset-evidence:${asset.id}`, priority: "P0" as const, title: `Repair evidence lineage: ${asset.title}`, missingEvidence: ["No linked Evidence record."], blockingDependencies: ["Asset cannot be treated as evidence-backed authority content."], recommendedNextAction: "Link existing admitted Evidence before requesting review; do not write a new proof store." }];
    }
    if (DIAGRAM_DEPENDENT_KINDS.has(asset.kind) && asset.diagramIds.length === 0) {
      return [{ ...base, id: `asset-diagram:${asset.id}`, priority: "P0" as const, title: `Resolve diagram dependency: ${asset.title}`, missingDiagram: ["No linked Knowledge Diagram."], blockingDependencies: ["Diagram-dependent asset lacks an explicit AssetDiagram relation."], recommendedNextAction: "Link an approved diagram or register an evidence-backed diagram specification for human review." }];
    }
    if (asset.status === "review") {
      return [{ ...base, id: `asset-review:${asset.id}`, priority: "P0" as const, title: `Review ${asset.title}`, blockingDependencies: ["Human Asset review is pending."], recommendedNextAction: "Verify evidence lineage, claim boundaries, and rendered AssetVersion; approve or request revision." }];
    }
    if (asset.status === "approved") {
      return [{ ...base, id: `asset-publication:${asset.id}`, priority: "P1" as const, title: `Manually publish ${asset.title}`, blockingDependencies: ["Publication destination and measurement records are not implemented."], recommendedNextAction: "Publish through the approved human channel, then update the existing Asset status to published. Record destination externally until Publication exists." }];
    }
    return [];
  });
}

function opportunityItems(opportunities: RuntimeOpportunityForWorkQueue[]): AuthorityWorkQueueItem[] {
  return opportunities.filter((opportunity) => opportunity.assetCount === 0).map((opportunity) => {
    const impacts = impactFor(opportunity.assetType);
    const missingEvidence = opportunity.evidenceIds.length === 0 ? ["No linked Evidence record."] : [];
    return {
      id: `opportunity:${opportunity.id}`,
      priority: missingEvidence.length ? "P0" : priorityFor([], impacts),
      title: `Review Opportunity: ${opportunity.title}`,
      experience: "Untracked — Opportunity is not linked to a persisted Experience.",
      businessProblem: "Untracked — use the approved Opportunity angle only as context.",
      missingEvidence,
      missingDiagram: [],
      missingFramework: [],
      missingAssets: [opportunity.assetType],
      estimatedAssetsUnlocked: 1,
      ...impacts,
      blockingDependencies: missingEvidence.length ? ["Evidence must be linked before authority composition."] : ["Human Opportunity review and existing composer are required."],
      recommendedNextAction: missingEvidence.length ? "Link admitted Evidence and review the claim guard before composing." : "Confirm angle, audience, duplicate status, and claim boundary; then use the existing composer to create a draft Asset.",
    };
  });
}

export function buildAuthorityWorkQueue(input: AuthorityWorkQueueInput): AuthorityWorkQueueItem[] {
  const items = [
    ...input.packages.map((pkg) => packageItem(pkg, input.assets)),
    ...runtimeAssetItems(input.assets),
    ...opportunityItems(input.opportunities),
  ];
  const order: Record<AuthorityWorkPriority, number> = { P0: 0, P1: 1, P2: 2 };
  return items.sort((left, right) => order[left.priority] - order[right.priority] || right.estimatedAssetsUnlocked - left.estimatedAssetsUnlocked || left.title.localeCompare(right.title));
}
