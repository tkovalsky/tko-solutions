export const DELIVERABLE_TYPES = [
  "executive_brief",
  "assessment",
  "case_study",
  "article",
  "report",
  "offer_asset",
  "sales_asset",
] as const;

export const DELIVERABLE_STATUSES = ["ready", "in_progress", "blocked", "published"] as const;

export type DeliverableType = (typeof DELIVERABLE_TYPES)[number];
export type DeliverableStatus = (typeof DELIVERABLE_STATUSES)[number];

type SourceRecord = {
  kind: "asset" | "opportunity" | "evidence";
  ref: string;
  label: string;
};

type EvidenceInput = {
  slug: string;
  domain: string;
  observation: string;
  proofRef: string;
  claimGuard: string;
};

type DeliverableEvaluationInput = {
  type: DeliverableType;
  title: string;
  angle?: string | null;
  audience?: string | null;
  assetStatus?: string | null;
  assetType?: string | null;
  evidence: EvidenceInput[];
};

export type Deliverable = {
  id: string;
  title: string;
  type: DeliverableType;
  status: DeliverableStatus;
  readiness: number;
  priority_score: number;
  business_value_score: number;
  completion_probability: number;
  estimated_effort_minutes: number;
  next_action: string;
  ignore_reason: string | null;
  evidence_count: number;
  source_records: SourceRecord[];
  blocking_gaps: string[];
  missing_components: string[];
  blocker_details: BlockerDetail[];
  has_asset: boolean;
  asset_slug: string | null;
  opportunity_slug: string | null;
  business_unit: string;
};

export type BlockerDetail = {
  kind: "missing_evidence" | "missing_proof" | "missing_recommendation" | "missing_outcome_metric" | "missing_component";
  label: string;
};

type ComponentRule = {
  key: string;
  label: string;
  isPresent: (input: DeliverableEvaluationInput) => boolean;
};

type BuildDeliverablesInput = {
  opportunities: Array<{
    slug: string;
    title: string;
    businessUnit: string;
    assetType: string;
    angle: string;
    audience: string | null;
    evidenceLinks: Array<{ evidence: EvidenceInput }>;
    assets: Array<{ slug: string; status: string }>;
  }>;
  assets: Array<{
    slug: string;
    title: string;
    businessUnit: string;
    assetType: string;
    status: string;
    opportunity: { slug: string; title: string; angle: string; audience: string | null } | null;
    evidenceLinks: Array<{ evidence: EvidenceInput }>;
  }>;
};

const TYPE_LABELS: Record<DeliverableType, string> = {
  executive_brief: "Executive Briefs",
  assessment: "Assessments",
  case_study: "Case Studies",
  article: "Articles",
  report: "Reports",
  offer_asset: "Offer Assets",
  sales_asset: "Sales Assets",
};

const ASSET_TYPE_TO_DELIVERABLE: Record<string, DeliverableType | undefined> = {
  executive_brief: "executive_brief",
  assessment: "assessment",
  case_study: "case_study",
  article: "article",
  intelligence_report: "report",
  report: "report",
  offer_asset: "offer_asset",
  sales_asset: "sales_asset",
};

const PROBLEM_SIGNALS = [
  "problem",
  "burden",
  "bottleneck",
  "dependency",
  "risk",
  "gap",
  "fail",
  "stalled",
  "delay",
  "exception",
  "invisible",
  "wait",
  "lost",
  "fragmented",
];

const ROOT_CAUSE_SIGNALS = [
  "root cause",
  "because",
  "depends",
  "dependency",
  "specific individuals",
  "single point",
  "human api",
  "instead of",
  "not the problem",
  "is the problem",
  "lives inside",
];

const IMPACT_SIGNALS = [
  "impact",
  "risk",
  "burden",
  "denial",
  "delay",
  "wait",
  "stalled",
  "lost",
  "quality",
  "conversion",
  "leakage",
  "unavailable",
];

const RECOMMENDATION_SIGNALS = [
  "recommend",
  "should",
  "next move",
  "what to do",
  "roadmap",
  "fix",
  "remediation",
  "prioritized",
  "operational quality",
  "assessment",
];

const RESULT_SIGNALS = ["result", "outcome", "after", "became", "changed", "replaces", "survives"];
const INTERVENTION_SIGNALS = ["intervention", "built", "changed", "system", "design", "model", "approval"];
const STARTING_STATE_SIGNALS = ["starting", "situation", "current state", "before", "environment", "lived in"];
const DIFFERENTIATION_SIGNALS = [" vs ", "different", "not just", "instead", "replace", "unlike"];
const CTA_SIGNALS = ["schedule", "contact", "book", "next step", "cta", "buyer receives", "gets"];
const DELIVERABLE_SIGNALS = ["deliverable", "scope", "roadmap", "readout", "receives", "gets"];
const QUESTION_SIGNALS = ["question", "dimension", "scored", "score", "assessment", "diagnose"];

const BUSINESS_VALUE_BY_TYPE: Record<DeliverableType, number> = {
  executive_brief: 90,
  assessment: 95,
  case_study: 85,
  article: 70,
  report: 75,
  offer_asset: 88,
  sales_asset: 80,
};

const COMPONENT_RULES: Record<DeliverableType, ComponentRule[]> = {
  executive_brief: [
    component("business_problem", "business_problem", (input) => hasProblem(input)),
    component("root_cause", "root_cause", (input) => hasSignal(allText(input), ROOT_CAUSE_SIGNALS)),
    component("evidence", "evidence", (input) => input.evidence.length > 0),
    component("impact", "impact", (input) => hasSignal(allText(input), IMPACT_SIGNALS)),
    component("recommendation", "recommendation", (input) =>
      hasSignal(allText(input), RECOMMENDATION_SIGNALS),
    ),
  ],
  assessment: [
    component("symptom", "symptom", (input) => hasProblem(input)),
    component("root_cause", "root_cause", (input) => hasSignal(allText(input), ROOT_CAUSE_SIGNALS)),
    component("impact", "impact", (input) => hasSignal(allText(input), IMPACT_SIGNALS)),
    component("assessment_questions", "assessment_questions", (input) =>
      input.assetStatus != null || hasSignal(allText(input), QUESTION_SIGNALS),
    ),
  ],
  case_study: [
    component("starting_state", "starting_state", (input) =>
      hasSignal(allText(input), STARTING_STATE_SIGNALS),
    ),
    component("intervention", "intervention", (input) =>
      hasSignal(allText(input), INTERVENTION_SIGNALS),
    ),
    component("result", "result", (input) => hasSignal(allText(input), RESULT_SIGNALS)),
    component("proof", "proof", (input) => hasProof(input)),
  ],
  article: [
    component("problem", "problem", (input) => hasProblem(input)),
    component("evidence", "evidence", (input) => input.evidence.length > 0),
    component("insight", "insight", (input) => hasMeaningfulText(input.angle) || input.evidence.length > 1),
  ],
  report: [
    component("executive_summary", "executive_summary", (input) =>
      hasMeaningfulText(input.title) && hasMeaningfulText(input.angle),
    ),
    component("analysis", "analysis", (input) =>
      input.evidence.length > 1 || hasSignal(allText(input), ["analysis", "pattern", "finding"]),
    ),
    component("evidence", "evidence", (input) => input.evidence.length > 0),
    component("implications", "implications", (input) =>
      hasSignal(allText(input), [...IMPACT_SIGNALS, ...RECOMMENDATION_SIGNALS]),
    ),
  ],
  offer_asset: [
    component("offer", "offer", (input) =>
      hasSignal(allText(input), ["offer", "assessment", "diagnostic", "service"]),
    ),
    component("buyer_problem", "buyer_problem", (input) => hasProblem(input)),
    component("deliverables", "deliverables", (input) => hasSignal(allText(input), DELIVERABLE_SIGNALS)),
    component("proof", "proof", (input) => hasProof(input)),
    component("cta", "cta", (input) => hasSignal(allText(input), CTA_SIGNALS)),
  ],
  sales_asset: [
    component("buyer_problem", "buyer_problem", (input) => hasProblem(input)),
    component("audience", "audience", (input) => hasMeaningfulText(input.audience)),
    component("proof", "proof", (input) => hasProof(input)),
    component("differentiation", "differentiation", (input) =>
      hasSignal(allText(input), DIFFERENTIATION_SIGNALS),
    ),
    component("next_step", "next_step", (input) =>
      hasSignal(allText(input), [...CTA_SIGNALS, ...RECOMMENDATION_SIGNALS]),
    ),
  ],
};

export function deliverableTypeLabel(type: DeliverableType) {
  return TYPE_LABELS[type];
}

export function toDeliverableType(assetType: string): DeliverableType | null {
  return ASSET_TYPE_TO_DELIVERABLE[assetType] ?? null;
}

export function buildDeliverableRegistry({ opportunities, assets }: BuildDeliverablesInput): Deliverable[] {
  const deliverables = new Map<string, Deliverable>();

  for (const opportunity of opportunities) {
    const type = toDeliverableType(opportunity.assetType);
    if (!type) continue;

    const asset = opportunity.assets[0] ?? null;
    const evidence = opportunity.evidenceLinks.map((link) => link.evidence);
    const evaluation = evaluateDeliverableReadiness({
      type,
      title: opportunity.title,
      angle: opportunity.angle,
      audience: opportunity.audience,
      assetStatus: asset?.status ?? null,
      assetType: opportunity.assetType,
      evidence,
    });

    deliverables.set(opportunity.slug, enrichDeliverable({
      id: opportunity.slug,
      title: opportunity.title,
      type,
      status: classifyDeliverableStatus(evaluation, asset?.status ?? null),
      readiness: evaluation.readiness,
      priority_score: 0,
      business_value_score: 0,
      completion_probability: 0,
      estimated_effort_minutes: 0,
      next_action: "",
      ignore_reason: null,
      evidence_count: evidence.length,
      source_records: [
        { kind: "opportunity", ref: opportunity.slug, label: opportunity.title },
        ...(asset ? [{ kind: "asset" as const, ref: asset.slug, label: opportunity.title }] : []),
        ...sourceRecordsFromEvidence(evidence),
      ],
      blocking_gaps: evaluation.blocking_gaps,
      missing_components: evaluation.missing_components,
      blocker_details: classifyBlockers(evaluation.missing_components),
      has_asset: asset != null,
      asset_slug: asset?.slug ?? null,
      opportunity_slug: opportunity.slug,
      business_unit: opportunity.businessUnit,
    }));
  }

  for (const asset of assets) {
    if (deliverables.has(asset.slug)) continue;

    const type = toDeliverableType(asset.assetType);
    if (!type) continue;

    const evidence = asset.evidenceLinks.map((link) => link.evidence);
    const evaluation = evaluateDeliverableReadiness({
      type,
      title: asset.title,
      angle: asset.opportunity?.angle ?? null,
      audience: asset.opportunity?.audience ?? null,
      assetStatus: asset.status,
      assetType: asset.assetType,
      evidence,
    });

    deliverables.set(asset.slug, enrichDeliverable({
      id: asset.slug,
      title: asset.title,
      type,
      status: classifyDeliverableStatus(evaluation, asset.status),
      readiness: evaluation.readiness,
      priority_score: 0,
      business_value_score: 0,
      completion_probability: 0,
      estimated_effort_minutes: 0,
      next_action: "",
      ignore_reason: null,
      evidence_count: evidence.length,
      source_records: [
        { kind: "asset", ref: asset.slug, label: asset.title },
        ...(asset.opportunity
          ? [{ kind: "opportunity" as const, ref: asset.opportunity.slug, label: asset.opportunity.title }]
          : []),
        ...sourceRecordsFromEvidence(evidence),
      ],
      blocking_gaps: evaluation.blocking_gaps,
      missing_components: evaluation.missing_components,
      blocker_details: classifyBlockers(evaluation.missing_components),
      has_asset: true,
      asset_slug: asset.slug,
      opportunity_slug: asset.opportunity?.slug ?? null,
      business_unit: asset.businessUnit,
    }));
  }

  return [...deliverables.values()].sort((a, b) => {
    const priorityDelta = b.priority_score - a.priority_score;
    if (priorityDelta !== 0) return priorityDelta;
    return a.title.localeCompare(b.title);
  });
}

export function getNextBestDeliverables(deliverables: Deliverable[], limit = 5) {
  return deliverables
    .filter((deliverable) => deliverable.status !== "published")
    .filter((deliverable) => deliverable.ignore_reason == null)
    .sort((a, b) => b.priority_score - a.priority_score || b.completion_probability - a.completion_probability)
    .slice(0, limit);
}

export function getPublishableDeliverables(deliverables: Deliverable[]) {
  return deliverables
    .filter((deliverable) => deliverable.status === "ready" && deliverable.has_asset)
    .sort((a, b) => b.priority_score - a.priority_score);
}

export function getIgnoredDeliverables(deliverables: Deliverable[], limit = 6) {
  return deliverables
    .filter((deliverable) => deliverable.ignore_reason != null)
    .sort((a, b) => a.priority_score - b.priority_score)
    .slice(0, limit);
}

export function evaluateDeliverableReadiness(input: DeliverableEvaluationInput) {
  const rules = COMPONENT_RULES[input.type];
  const missing_components = rules.filter((rule) => !rule.isPresent(input)).map((rule) => rule.label);
  const readiness = Math.round(((rules.length - missing_components.length) / rules.length) * 100);
  const blocking_gaps = missing_components.filter((componentName) =>
    ["evidence", "proof", "assessment_questions"].includes(componentName),
  );

  return { readiness, missing_components, blocking_gaps };
}

function classifyDeliverableStatus(
  evaluation: ReturnType<typeof evaluateDeliverableReadiness>,
  assetStatus: string | null,
): DeliverableStatus {
  if (assetStatus === "published") return "published";
  if (evaluation.readiness === 100) return "ready";
  if (evaluation.blocking_gaps.length > 0) return "blocked";
  return "in_progress";
}

function enrichDeliverable(deliverable: Deliverable): Deliverable {
  const businessValueScore = scoreBusinessValue(deliverable.type, deliverable.business_unit);
  const priorityScore = scorePriority(deliverable);
  const completionProbability = scoreCompletionProbability(deliverable);
  const estimatedEffortMinutes = estimateEffortMinutes(deliverable);

  return {
    ...deliverable,
    priority_score: priorityScore,
    business_value_score: businessValueScore,
    completion_probability: completionProbability,
    estimated_effort_minutes: estimatedEffortMinutes,
    next_action: getNextAction(deliverable),
    ignore_reason: getIgnoreReason(deliverable, priorityScore, completionProbability, estimatedEffortMinutes),
  };
}

function scorePriority(deliverable: Deliverable) {
  const evidenceScore = Math.min(deliverable.evidence_count, 4) * 4;
  const statusScore: Record<DeliverableStatus, number> = {
    ready: 20,
    in_progress: 10,
    blocked: -20,
    published: -80,
  };
  const missingPenalty = deliverable.missing_components.length * 6;
  const blockerPenalty = deliverable.blocking_gaps.length * 18;
  const assetBonus = deliverable.has_asset && deliverable.status === "ready" ? 8 : 0;

  return clamp(
    Math.round(deliverable.readiness * 0.7 + evidenceScore + statusScore[deliverable.status] + assetBonus - missingPenalty - blockerPenalty),
    0,
    100,
  );
}

function scoreBusinessValue(type: DeliverableType, businessUnit: string) {
  const businessUnitBonus = businessUnit === "tko" ? 5 : businessUnit === "rachel" ? 3 : 0;
  return clamp(BUSINESS_VALUE_BY_TYPE[type] + businessUnitBonus, 0, 100);
}

function scoreCompletionProbability(deliverable: Deliverable) {
  const assetBonus = deliverable.has_asset ? 8 : 0;
  const evidenceBonus = Math.min(deliverable.evidence_count, 3) * 3;
  return clamp(
    deliverable.readiness + assetBonus + evidenceBonus - deliverable.blocking_gaps.length * 25 - deliverable.missing_components.length * 5,
    0,
    100,
  );
}

function estimateEffortMinutes(deliverable: Deliverable) {
  if (deliverable.status === "published") return 0;
  if (deliverable.status === "ready" && deliverable.has_asset) return 15;

  const base = deliverable.has_asset ? 15 : 30;
  const missingWork = deliverable.missing_components.length * 15;
  const blockerWork = deliverable.blocking_gaps.length * 20;
  return clamp(base + missingWork + blockerWork, 15, 180);
}

function getNextAction(deliverable: Deliverable) {
  if (deliverable.status === "published") return "Ignore for now: already published.";
  if (deliverable.status === "ready" && deliverable.has_asset) return "Review final asset and publish manually.";
  if (deliverable.status === "ready") return "Produce the deliverable from the existing opportunity and evidence.";
  if (deliverable.blocker_details.length > 0) {
    return `Unblock ${deliverable.blocker_details[0].label}.`;
  }
  if (deliverable.missing_components.length > 0) {
    return `Fill ${deliverable.missing_components[0]}.`;
  }
  return "Review for final production readiness.";
}

function getIgnoreReason(
  deliverable: Deliverable,
  priorityScore: number,
  completionProbability: number,
  estimatedEffortMinutes: number,
) {
  if (deliverable.status === "published") return "Already published.";
  if (estimatedEffortMinutes > 120) return "Too much missing work for a 2-hour production window.";
  if (deliverable.status === "blocked" && completionProbability < 50) {
    return "Blocked with low completion probability.";
  }
  if (priorityScore < 35) return "Lower priority than easier, higher-readiness deliverables.";
  return null;
}

function classifyBlockers(missingComponents: string[]): BlockerDetail[] {
  return missingComponents.map((componentName) => {
    if (componentName === "evidence") {
      return { kind: "missing_evidence", label: "missing evidence" };
    }
    if (componentName === "proof") {
      return { kind: "missing_proof", label: "missing proof" };
    }
    if (componentName === "recommendation") {
      return { kind: "missing_recommendation", label: "missing recommendation" };
    }
    if (["result", "impact"].includes(componentName)) {
      return { kind: "missing_outcome_metric", label: "missing outcome metric" };
    }
    return { kind: "missing_component", label: componentName.replaceAll("_", " ") };
  });
}

function component(key: string, label: string, isPresent: ComponentRule["isPresent"]): ComponentRule {
  return { key, label, isPresent };
}

function sourceRecordsFromEvidence(evidence: EvidenceInput[]): SourceRecord[] {
  return evidence.map((record) => ({
    kind: "evidence",
    ref: `${record.domain}:${record.slug}`,
    label: record.observation,
  }));
}

function allText(input: DeliverableEvaluationInput) {
  return [
    input.title,
    input.angle,
    input.audience,
    input.assetType,
    ...input.evidence.flatMap((record) => [
      record.observation,
      record.proofRef,
      record.claimGuard,
      record.domain,
      record.slug,
    ]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasProblem(input: DeliverableEvaluationInput) {
  return hasMeaningfulText(input.angle) || hasSignal(allText(input), PROBLEM_SIGNALS);
}

function hasProof(input: DeliverableEvaluationInput) {
  return input.evidence.some((record) => hasMeaningfulText(record.proofRef));
}

function hasSignal(text: string, signals: string[]) {
  return signals.some((signal) => text.includes(signal.toLowerCase()));
}

function hasMeaningfulText(value: string | null | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
