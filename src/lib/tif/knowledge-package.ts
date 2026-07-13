import { z } from "zod";

// P0B is a planning and eligibility extension. It deliberately returns briefs and
// traceability metadata, not prose. Existing Asset composition remains responsible
// for creating Asset/AssetVersion/DerivativeAsset records after review.
export const KNOWLEDGE_PACKAGE_ASSET_KINDS = [
  "executive_diagram",
  "framework",
  "executive_summary",
  "operator_note",
  "website_guide",
  "assessment",
  "checklist",
  "faq",
  "linkedin_package",
  "proposal_module",
  "presentation_outline",
  "recovery_assessment_insert",
  "seo_cluster",
] as const;

export type KnowledgePackageAssetKind = (typeof KNOWLEDGE_PACKAGE_ASSET_KINDS)[number];

const ClaimStatusSchema = z.enum(["verified", "owner_confirmed", "experience_based", "unsupported"]);
const RecordTypeSchema = z.enum(["experience", "decision", "incident"]);
const ConfidentialitySchema = z.enum(["public", "anonymized", "restricted", "consent_backed"]);

const KnowledgeReferenceSchema = z.object({
  knowledgeId: z.string().trim().min(3),
  title: z.string().trim().min(3),
  claimBoundary: z.string().trim().min(10),
});

const EvidenceReferenceSchema = KnowledgeReferenceSchema.extend({
  knowledgeId: z.string().trim().regex(/^EVD-[A-Z0-9-]+$/),
  proofRef: z.string().trim().min(3),
  claimStatus: ClaimStatusSchema,
});

export const KnowledgePackageInputSchema = z.object({
  source: z.object({
    knowledgeId: z.string().trim().regex(/^(EXP|DEC|INC)-[A-Z0-9-]+$/),
    recordType: RecordTypeSchema,
    title: z.string().trim().min(3),
    context: z.string().trim().min(10),
    businessProblem: z.string().trim().min(10),
    claimBoundary: z.string().trim().min(10),
    confidentiality: ConfidentialitySchema,
    reviewedBy: z.string().trim().min(2),
  }),
  evidence: z.array(EvidenceReferenceSchema).default([]),
  problems: z.array(KnowledgeReferenceSchema).default([]),
  patterns: z.array(KnowledgeReferenceSchema).default([]),
  frameworks: z.array(KnowledgeReferenceSchema).default([]),
  knowledgeDiagrams: z.array(KnowledgeReferenceSchema).default([]),
});

export type KnowledgePackageInput = z.input<typeof KnowledgePackageInputSchema>;
export type KnowledgePackageClaimStatus = z.infer<typeof ClaimStatusSchema>;

export type KnowledgePackageAssetBrief = {
  kind: KnowledgePackageAssetKind;
  title: string;
  status: "draft";
  compositionRule: string;
  lineage: {
    experience: string;
    evidence: string[];
    problems: string[];
    patterns: string[];
    frameworks: string[];
    knowledgeDiagrams: string[];
  };
  claimStatus: KnowledgePackageClaimStatus | null;
  claimBoundary: string[];
  publicationReadiness: "blocked" | "review_required";
};

export type KnowledgePackage = {
  packageId: string;
  source: {
    knowledgeId: string;
    recordType: z.infer<typeof RecordTypeSchema>;
    title: string;
    businessProblem: string;
    reviewedBy: string;
  };
  assets: KnowledgePackageAssetBrief[];
  evidenceRequirements: string[];
  missingProof: string[];
  implementationBacklog: string[];
  claimBoundary: {
    strictestStatus: KnowledgePackageClaimStatus | null;
    inheritedBoundaries: string[];
    rule: string;
  };
  publicationReadiness: {
    status: "blocked" | "review_required";
    blockers: string[];
    requiredReview: string[];
  };
};

const ASSET_LABELS: Record<KnowledgePackageAssetKind, string> = {
  executive_diagram: "Executive Diagram",
  framework: "Framework",
  executive_summary: "Executive Summary",
  operator_note: "Operator Note",
  website_guide: "Website Guide",
  assessment: "Assessment",
  checklist: "Checklist",
  faq: "FAQ",
  linkedin_package: "LinkedIn Package",
  proposal_module: "Proposal Module",
  presentation_outline: "Presentation Outline",
  recovery_assessment_insert: "Recovery Assessment Insert",
  seo_cluster: "SEO Cluster",
};

const CLAIM_SEVERITY: Record<KnowledgePackageClaimStatus, number> = {
  verified: 1,
  owner_confirmed: 2,
  experience_based: 3,
  unsupported: 4,
};

function unique(values: string[]) {
  return [...new Set(values)];
}

function strictestClaimStatus(statuses: KnowledgePackageClaimStatus[]) {
  return statuses.reduce<KnowledgePackageClaimStatus | null>((strictest, status) => {
    if (!strictest || CLAIM_SEVERITY[status] > CLAIM_SEVERITY[strictest]) return status;
    return strictest;
  }, null);
}

/**
 * Creates a reviewable Knowledge Asset Package manifest. This function does not
 * compose prose, persist records, mutate Asset status, or decide publication.
 */
export function compileKnowledgePackage(input: KnowledgePackageInput): KnowledgePackage {
  const parsed = KnowledgePackageInputSchema.parse(input);
  const evidenceIds = parsed.evidence.map((item) => item.knowledgeId);
  const problemIds = parsed.problems.map((item) => item.knowledgeId);
  const patternIds = parsed.patterns.map((item) => item.knowledgeId);
  const frameworkIds = parsed.frameworks.map((item) => item.knowledgeId);
  const diagramIds = parsed.knowledgeDiagrams.map((item) => item.knowledgeId);
  const strictestStatus = strictestClaimStatus(parsed.evidence.map((item) => item.claimStatus));
  const inheritedBoundaries = unique([
    parsed.source.claimBoundary,
    ...parsed.evidence.map((item) => item.claimBoundary),
    ...parsed.problems.map((item) => item.claimBoundary),
    ...parsed.patterns.map((item) => item.claimBoundary),
    ...parsed.frameworks.map((item) => item.claimBoundary),
    ...parsed.knowledgeDiagrams.map((item) => item.claimBoundary),
  ]);

  const missingProof: string[] = [];
  if (evidenceIds.length === 0) missingProof.push("Link at least one admitted Evidence record before composing a public claim.");
  if (parsed.evidence.some((item) => item.claimStatus === "unsupported")) {
    missingProof.push("Remove or replace Unsupported Evidence from the public package evidence set.");
  }
  if (problemIds.length === 0) missingProof.push("Link a reviewed Operating Problem; do not create an asset-specific problem definition.");
  if (patternIds.length === 0) missingProof.push("Link a reviewed Operating Pattern, or record why no reusable pattern has been admitted.");
  if (frameworkIds.length === 0) missingProof.push("Link a reviewed Operating Framework before presenting a reusable method.");
  if (diagramIds.length === 0) missingProof.push("Link a reviewed Knowledge Diagram or create its evidence-backed specification.");
  if (parsed.source.confidentiality === "restricted") {
    missingProof.push("Restricted source requires an approved anonymized or consent-backed public derivative.");
  }

  const publicationReadiness: "blocked" | "review_required" =
    missingProof.length > 0 ? "blocked" : "review_required";
  const lineage = {
    experience: parsed.source.knowledgeId,
    evidence: evidenceIds,
    problems: problemIds,
    patterns: patternIds,
    frameworks: frameworkIds,
    knowledgeDiagrams: diagramIds,
  };
  const assets = KNOWLEDGE_PACKAGE_ASSET_KINDS.map((kind) => ({
    kind,
    title: `${parsed.source.title} — ${ASSET_LABELS[kind]}`,
    status: "draft" as const,
    compositionRule:
      "Compose only from the linked reviewed records. Preserve every inherited claim boundary; add a missing-proof marker instead of supplying a fact.",
    lineage,
    claimStatus: strictestStatus,
    claimBoundary: inheritedBoundaries,
    publicationReadiness,
  }));

  return {
    packageId: `KAP-${parsed.source.knowledgeId}`,
    source: {
      knowledgeId: parsed.source.knowledgeId,
      recordType: parsed.source.recordType,
      title: parsed.source.title,
      businessProblem: parsed.source.businessProblem,
      reviewedBy: parsed.source.reviewedBy,
    },
    assets,
    evidenceRequirements: [
      "Every public-facing claim must cite an admitted Evidence record and its proof reference.",
      "Every supplied Evidence record must retain its claim status and claim boundary.",
      "Observed outcomes require a dated source; do not infer financial, causal, or product outcomes.",
      "Restricted experience requires an approved anonymized or consent-backed derivative before publication.",
    ],
    missingProof,
    implementationBacklog: [
      ...(evidenceIds.length === 0 ? ["Admit and classify evidence for the reviewed source."] : []),
      ...(problemIds.length === 0 ? ["Map the source to a reviewed Operating Problem."] : []),
      ...(patternIds.length === 0 ? ["Review a Pattern link or explicitly retain this as a single-environment lesson."] : []),
      ...(frameworkIds.length === 0 ? ["Map the source to a reviewed Operating Framework."] : []),
      ...(diagramIds.length === 0 ? ["Register an evidence-backed Knowledge Diagram specification."] : []),
      "Create Asset Opportunities only after the package review accepts its lineage and claim boundary.",
    ],
    claimBoundary: {
      strictestStatus,
      inheritedBoundaries,
      rule: "A derived asset may narrow these boundaries but must never remove, broaden, or upgrade them.",
    },
    publicationReadiness: {
      status: publicationReadiness,
      blockers: missingProof,
      requiredReview: [
        "Experience/source reviewer confirms context, confidentiality, decision, and boundary.",
        "Evidence reviewer confirms proof references and claim classification.",
        "Knowledge reviewer confirms Problem, Pattern, Framework, and Knowledge Diagram links.",
        "Existing Asset review approves the rendered Asset/Version before publication.",
      ],
    },
  };
}
