import type { OpportunityFactForScoring, OpportunityScoreComponent } from "../../contracts";

export type EvidenceScoreInput = {
  facts: OpportunityFactForScoring[];
  initiative: { status?: string | null; approvedAt?: Date | string | null } | null;
  stakeholders: Array<{ roleEvidenceUrl?: string | null; roleConfidence?: number | null }>;
  sources: Array<{
    publishedAt?: Date | string | null;
    retrievedAt?: Date | string | null;
    isPrimary?: boolean | null;
  }>;
  researchGaps: Array<{ status?: string | null; blocksOutreach?: boolean | null }>;
  asOf: Date;
};

export type AxisScore = {
  total: number;
  components: OpportunityScoreComponent[];
};

function daysBetween(left: Date, right: Date) {
  return Math.floor((left.getTime() - right.getTime()) / 86_400_000);
}

function toDate(value?: Date | string | null) {
  return value ? new Date(value) : null;
}

export function scoreEvidence(input: EvidenceScoreInput): AxisScore {
  const components: OpportunityScoreComponent[] = [];
  const add = (key: string, label: string, points: number, maxPoints: number, reason: string) => {
    components.push({ key, label, points, maxPoints, reason });
  };

  const hasVerifiedOffsets = input.facts.some(
    (fact) => fact.basis === "stated" && fact.confidence >= 80,
  );
  add(
    "verified_offsets",
    "Verified source offsets",
    hasVerifiedOffsets ? 15 : 0,
    15,
    hasVerifiedOffsets ? "At least one stated fact has verified source support." : "No verified source offsets yet.",
  );

  const hasPrimary = input.sources.some((source) => source.isPrimary);
  add(
    "primary_source",
    "Primary source",
    hasPrimary ? 10 : 0,
    10,
    hasPrimary ? "A primary source supports the opportunity." : "No primary source is linked.",
  );

  const hasRecent = input.sources.some((source) => {
    const publishedAt = toDate(source.publishedAt ?? source.retrievedAt);
    return publishedAt ? daysBetween(input.asOf, publishedAt) <= 30 : false;
  });
  add(
    "recent_source",
    "Recent source",
    hasRecent ? 10 : 0,
    10,
    hasRecent ? "At least one source is within 30 days." : "No source is fresh enough.",
  );

  const hasStatedProblem = input.facts.some(
    (fact) => fact.field === "business_problem" && fact.basis === "stated",
  );
  add(
    "stated_problem",
    "Stated business problem",
    hasStatedProblem ? 15 : 0,
    15,
    hasStatedProblem ? "The business problem is stated, not inferred." : "The business problem is not stated.",
  );

  const initiativeApproved =
    input.initiative?.status === "active" ||
    input.initiative?.status === "evidenced" ||
    Boolean(input.initiative?.approvedAt);
  add(
    "approved_initiative",
    "Approved initiative",
    initiativeApproved ? 15 : 0,
    15,
    initiativeApproved ? "The operator-approved initiative is linked." : "No approved initiative is linked.",
  );

  const hasSourcedStakeholder = input.stakeholders.some(
    (stakeholder) => Boolean(stakeholder.roleEvidenceUrl) && (stakeholder.roleConfidence ?? 0) > 0,
  );
  add(
    "sourced_stakeholder",
    "Sourced stakeholder",
    hasSourcedStakeholder ? 15 : 0,
    15,
    hasSourcedStakeholder ? "At least one stakeholder has a sourced role claim." : "No sourced stakeholder role claim yet.",
  );

  const hasBlockingGap = input.researchGaps.some(
    (gap) => gap.status === "open" && Boolean(gap.blocksOutreach),
  );
  add(
    "no_blocking_gaps",
    "No blocking research gaps",
    hasBlockingGap ? 0 : 10,
    10,
    hasBlockingGap ? "At least one blocking research gap is still open." : "No blocking research gaps are open.",
  );

  add(
    "independent_sources",
    "Independent sources",
    input.sources.length >= 2 ? 10 : 0,
    10,
    input.sources.length >= 2 ? "At least two independent sources support this." : "A second independent source is still needed.",
  );

  return { total: components.reduce((sum, component) => sum + component.points, 0), components };
}
