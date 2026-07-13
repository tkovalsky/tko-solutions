import type { KnowledgePackage, KnowledgePackageAssetKind } from "./knowledge-package";

// P0C is a deterministic read model. It consumes the existing TIF lineage and
// produces queues and reports; it never creates proof, changes an Asset's status,
// or publishes anything.
export const AUTHORITY_COVERAGE_AREAS = [
  "Healthcare",
  "Enterprise Operations",
  "AI",
  "RachelOS",
  "Founder",
  "Commercial Real Estate",
  "Decision Rights",
  "Governance",
  "Program Recovery",
  "Operational Intelligence",
  "Administrative Burden",
  "Prior Authorization",
  "Cross Functional Delivery",
  "Portfolio Management",
  "Dependency Management",
  "Workflow Architecture",
  "Executive Reporting",
  "AI Governance",
  "Decision Latency",
  "Operating Memory",
  "Source Authority",
  "Human Approval",
] as const;

export type AuthorityCoverageArea = (typeof AUTHORITY_COVERAGE_AREAS)[number];
export type AuthorityAssetStatus = "draft" | "review" | "approved" | "published";
export type AuthorityApprovalStatus = "approved" | "review" | "unknown";

export type AuthorityExperience = {
  id: string;
  title: string;
  status: AuthorityApprovalStatus;
  coverage: AuthorityCoverageArea[];
  evidenceIds: string[];
};

export type AuthorityEvidence = {
  id: string;
  title: string;
  status: AuthorityApprovalStatus;
  coverage: AuthorityCoverageArea[];
  assetIds: string[];
  experienceIds: string[];
};

export type AuthorityDiagram = {
  id: string;
  title: string;
  status: AuthorityAssetStatus;
  coverage: AuthorityCoverageArea[];
  evidenceIds: string[];
  consumerAssetIds: string[];
};

export type AuthorityKnowledgeRecord = {
  id: string;
  title: string;
  status: AuthorityApprovalStatus;
  coverage: AuthorityCoverageArea[];
  evidenceIds: string[];
  assetIds: string[];
};

export type AuthorityProblem = AuthorityKnowledgeRecord & {
  requiredEvidenceIds?: string[];
  requiresDiagram?: boolean;
  requiresFramework?: boolean;
  requiresScreenshot?: boolean;
  requiresMetric?: boolean;
  requiresReview?: boolean;
  requiresPublication?: boolean;
  diagramIds?: string[];
  frameworkIds?: string[];
  screenshotRefs?: string[];
  metricRefs?: string[];
  reviewedAssetIds?: string[];
  publishedAssetIds?: string[];
};

export type AuthorityAsset = {
  id: string;
  title: string;
  kind: string;
  status: AuthorityAssetStatus;
  coverage: AuthorityCoverageArea[];
  evidenceIds: string[];
  diagramIds: string[];
  experienceId?: string;
  updatedAt?: Date | string;
  seoPriority?: "high" | "medium" | "low";
};

export type AuthorityOrchestratorInput = {
  experiences: AuthorityExperience[];
  evidence: AuthorityEvidence[];
  diagrams: AuthorityDiagram[];
  problems: AuthorityProblem[];
  patterns: AuthorityKnowledgeRecord[];
  frameworks: AuthorityKnowledgeRecord[];
  assets: AuthorityAsset[];
  packages: KnowledgePackage[];
  screenshots?: Array<{ id: string; assetIds: string[]; problemIds?: string[] }>;
  metrics?: Array<{ id: string; assetIds: string[]; problemIds?: string[] }>;
  now?: Date;
};

export type MissingEvidenceReport = {
  problemId: string;
  problem: string;
  missingEvidence: string[];
  missingDiagrams: string[];
  missingFrameworks: string[];
  missingScreenshots: string[];
  missingMetrics: string[];
  missingReview: string[];
  missingPublication: string[];
};

export type PackageReadiness = {
  experienceId: string;
  title: string;
  status: "ready" | "blocked" | "review_required";
  missingDiagram: boolean;
  missingFramework: boolean;
  missingPattern: boolean;
  missingEvidence: boolean;
  publicationBlocked: boolean;
  requiredReviewer: string[];
  claimBoundary: string[];
};

export type AuthorityOpportunity = {
  id: string;
  experienceId: string;
  title: string;
  kind: KnowledgePackageAssetKind;
  evidenceIds: string[];
  reason: string;
};

export type DiagramDependency = {
  assetId: string;
  asset: string;
  kind: string;
  status: "covered" | "missing";
  diagrams: string[];
};

export type CaptureTask = {
  type: "interview" | "screenshot" | "architecture_diagram" | "timeline" | "decision_log" | "workflow" | "metrics" | "executive_artifact" | "production_evidence" | "repository_reference" | "meeting_notes";
  reason: string;
  sourceId: string;
};

export type AuthorityOrchestratorResult = {
  dashboard: {
    approvedExperiences: number;
    approvedEvidence: number;
    unclassifiedEvidence: number;
    knowledgeDiagrams: number;
    problems: number;
    patterns: number;
    frameworks: number;
    assets: number;
    publishedAssets: number;
    blockedAssets: number;
    reviewQueue: number;
    publicationQueue: number;
    authorityScore: number | null;
    coverage: Array<{ area: AuthorityCoverageArea; experiences: number; evidence: number; diagrams: number; assets: number; weak: boolean }>;
  };
  missingEvidence: MissingEvidenceReport[];
  packageReadiness: PackageReadiness[];
  opportunities: AuthorityOpportunity[];
  publicationPlanner: { today: string[]; thisWeek: string[]; thisMonth: string[] };
  diagramDependencies: DiagramDependency[];
  captureQueue: CaptureTask[];
  quality: {
    duplicateAssets: string[][];
    duplicateFrameworks: string[][];
    duplicateDiagrams: string[][];
    orphanEvidence: string[];
    unusedExperiences: string[];
    unusedDiagrams: string[];
    unusedFrameworks: string[];
    unusedProblems: string[];
    unusedPatterns: string[];
    unusedAssets: string[];
    unusedSeoClusters: string[];
  };
};

const DIAGRAM_DEPENDENT_KINDS = new Set([
  "guide",
  "website_guide",
  "assessment",
  "proposal_module",
  "framework",
]);

function normalizedTitle(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function duplicates<T extends { title: string }>(records: T[]) {
  const groups = new Map<string, string[]>();
  for (const record of records) {
    const key = normalizedTitle(record.title);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), record.title]);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

function hasAny(values: string[] | undefined) {
  return Boolean(values?.length);
}

function packageReadinessFor(pkg: KnowledgePackage): PackageReadiness {
  const missing = pkg.missingProof.join(" ").toLowerCase();
  return {
    experienceId: pkg.source.knowledgeId,
    title: pkg.source.title,
    status: pkg.publicationReadiness.status === "blocked" ? "blocked" : "review_required",
    missingDiagram: missing.includes("knowledge diagram"),
    missingFramework: missing.includes("operating framework"),
    missingPattern: missing.includes("operating pattern"),
    missingEvidence: missing.includes("evidence"),
    publicationBlocked: pkg.publicationReadiness.status === "blocked",
    requiredReviewer: pkg.publicationReadiness.requiredReview,
    claimBoundary: pkg.claimBoundary.inheritedBoundaries,
  };
}

function captureTasksFor(pkg: KnowledgePackage): CaptureTask[] {
  const tasks: CaptureTask[] = [];
  for (const blocker of pkg.missingProof) {
    const lower = blocker.toLowerCase();
    const type = lower.includes("diagram")
      ? "architecture_diagram"
      : lower.includes("evidence")
        ? "production_evidence"
        : lower.includes("problem") || lower.includes("pattern") || lower.includes("framework")
          ? "meeting_notes"
          : "interview";
    tasks.push({ type, reason: blocker, sourceId: pkg.source.knowledgeId });
  }
  return tasks;
}

function assetIsBlocked(asset: AuthorityAsset) {
  return asset.status !== "published" && asset.evidenceIds.length === 0;
}

export function orchestrateAuthorityProduction(input: AuthorityOrchestratorInput): AuthorityOrchestratorResult {
  const packageReadiness = input.packages.map(packageReadinessFor);
  const packageByExperience = new Map(input.packages.map((pkg) => [pkg.source.knowledgeId, pkg]));
  const evidenceById = new Map(input.evidence.map((record) => [record.id, record]));

  const missingEvidence = input.problems.map((problem) => {
    const requiredEvidence = problem.requiredEvidenceIds ?? [];
    const missingEvidenceIds = requiredEvidence.filter((id) => !evidenceById.has(id));
    const linkedEvidenceMissing = problem.evidenceIds.length === 0 ? ["No linked admitted Evidence."] : [];
    const screenshots = input.screenshots ?? [];
    const metrics = input.metrics ?? [];
    return {
      problemId: problem.id,
      problem: problem.title,
      missingEvidence: [...missingEvidenceIds.map((id) => `Evidence ${id} is not admitted.`), ...linkedEvidenceMissing],
      missingDiagrams: problem.requiresDiagram && !hasAny(problem.diagramIds) ? ["No linked Knowledge Diagram."] : [],
      missingFrameworks: problem.requiresFramework && !hasAny(problem.frameworkIds) ? ["No linked Operating Framework."] : [],
      missingScreenshots: problem.requiresScreenshot && !screenshots.some((item) => item.problemIds?.includes(problem.id)) ? ["No reviewed screenshot reference."] : [],
      missingMetrics: problem.requiresMetric && !metrics.some((item) => item.problemIds?.includes(problem.id)) ? ["No source-backed metric reference."] : [],
      missingReview: problem.requiresReview && !hasAny(problem.reviewedAssetIds) ? ["No reviewed Asset."] : [],
      missingPublication: problem.requiresPublication && !hasAny(problem.publishedAssetIds) ? ["No published Asset."] : [],
    };
  });

  const opportunities = input.packages.flatMap((pkg) =>
    pkg.assets.flatMap((brief) => {
      const existing = input.assets.some(
        (asset) => asset.experienceId === pkg.source.knowledgeId && asset.kind === brief.kind,
      );
      if (existing) return [];
      return [{
        id: `${pkg.packageId}:${brief.kind}`,
        experienceId: pkg.source.knowledgeId,
        title: brief.title,
        kind: brief.kind,
        evidenceIds: brief.lineage.evidence,
        reason: `Approved package lineage has no ${brief.kind.replaceAll("_", " ")} Asset.`,
      }];
    }),
  );

  const diagramDependencies = input.assets
    .filter((asset) => DIAGRAM_DEPENDENT_KINDS.has(asset.kind))
    .map((asset) => ({
      assetId: asset.id,
      asset: asset.title,
      kind: asset.kind,
      status: asset.diagramIds.length > 0 ? "covered" as const : "missing" as const,
      diagrams: asset.diagramIds,
    }));

  const captureQueue = input.packages.flatMap(captureTasksFor);
  const blockedAssets = input.assets.filter(assetIsBlocked);
  const reviewAssets = input.assets.filter((asset) => asset.status === "review");
  const approvedAssets = input.assets.filter((asset) => asset.status === "approved");
  const today = [
    ...reviewAssets.map((asset) => `Review ${asset.title}.`),
    ...packageReadiness.filter((item) => item.status === "review_required").map((item) => `Complete package review: ${item.title}.`),
  ];
  const thisWeek = [
    ...approvedAssets.map((asset) => `Plan manual publication for ${asset.title}.`),
    ...diagramDependencies.filter((item) => item.status === "missing").map((item) => `Link or create a reviewed diagram for ${item.asset}.`),
  ];
  const thisMonth = opportunities.slice(0, 20).map((item) => `Review opportunity: ${item.title}.`);

  const coverage = AUTHORITY_COVERAGE_AREAS.map((area) => {
    const experiences = input.experiences.filter((item) => item.coverage.includes(area)).length;
    const evidence = input.evidence.filter((item) => item.coverage.includes(area)).length;
    const diagrams = input.diagrams.filter((item) => item.coverage.includes(area)).length;
    const assets = input.assets.filter((item) => item.coverage.includes(area)).length;
    return { area, experiences, evidence, diagrams, assets, weak: evidence === 0 || assets === 0 };
  });
  const trackedCoverage = coverage.filter((item) => item.experiences + item.evidence + item.diagrams + item.assets > 0);
  const authorityScore = trackedCoverage.length === 0
    ? null
    : Math.round(trackedCoverage.reduce((total, item) => total + (item.evidence > 0 ? 50 : 0) + (item.diagrams > 0 ? 20 : 0) + (item.assets > 0 ? 30 : 0), 0) / trackedCoverage.length);

  const referencedAssetIds = new Set([
    ...input.evidence.flatMap((item) => item.assetIds),
    ...input.diagrams.flatMap((item) => item.consumerAssetIds),
    ...input.problems.flatMap((item) => item.assetIds),
    ...input.patterns.flatMap((item) => item.assetIds),
    ...input.frameworks.flatMap((item) => item.assetIds),
  ]);
  const referencedEvidenceIds = new Set([
    ...input.experiences.flatMap((item) => item.evidenceIds),
    ...input.assets.flatMap((item) => item.evidenceIds),
    ...input.diagrams.flatMap((item) => item.evidenceIds),
    ...input.problems.flatMap((item) => item.evidenceIds),
    ...input.patterns.flatMap((item) => item.evidenceIds),
    ...input.frameworks.flatMap((item) => item.evidenceIds),
  ]);

  return {
    dashboard: {
      approvedExperiences: input.experiences.filter((item) => item.status === "approved").length,
      approvedEvidence: input.evidence.filter((item) => item.status === "approved").length,
      unclassifiedEvidence: input.evidence.filter((item) => item.status === "unknown").length,
      knowledgeDiagrams: input.diagrams.length,
      problems: input.problems.length,
      patterns: input.patterns.length,
      frameworks: input.frameworks.length,
      assets: input.assets.length,
      publishedAssets: input.assets.filter((item) => item.status === "published").length,
      blockedAssets: blockedAssets.length,
      reviewQueue: reviewAssets.length + packageReadiness.filter((item) => item.status === "review_required").length,
      publicationQueue: approvedAssets.length,
      authorityScore,
      coverage,
    },
    missingEvidence,
    packageReadiness,
    opportunities,
    publicationPlanner: { today, thisWeek, thisMonth },
    diagramDependencies,
    captureQueue,
    quality: {
      duplicateAssets: duplicates(input.assets),
      duplicateFrameworks: duplicates(input.frameworks),
      duplicateDiagrams: duplicates(input.diagrams),
      orphanEvidence: input.evidence.filter((item) => !referencedEvidenceIds.has(item.id) && item.assetIds.length === 0 && item.experienceIds.length === 0).map((item) => item.id),
      unusedExperiences: input.experiences.filter((item) => !packageByExperience.has(item.id) && item.evidenceIds.length === 0).map((item) => item.id),
      unusedDiagrams: input.diagrams.filter((item) => item.consumerAssetIds.length === 0).map((item) => item.id),
      unusedFrameworks: input.frameworks.filter((item) => item.assetIds.length === 0).map((item) => item.id),
      unusedProblems: input.problems.filter((item) => item.assetIds.length === 0).map((item) => item.id),
      unusedPatterns: input.patterns.filter((item) => item.assetIds.length === 0).map((item) => item.id),
      unusedAssets: input.assets.filter((item) => !referencedAssetIds.has(item.id) && item.status !== "published").map((item) => item.id),
      unusedSeoClusters: input.assets.filter((item) => item.kind === "seo_cluster" && item.status !== "published").map((item) => item.id),
    },
  };
}
