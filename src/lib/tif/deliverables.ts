export const DELIVERABLE_TYPES = [
  "article",
  "assessment",
  "report",
  "executive_brief",
  "case_study",
  "offer_asset",
  "sales_asset",
  "comparison",
  "guide",
  "email_sequence",
  "landing_page",
  "linkedin_post",
  "facebook_ad",
  "reddit_post",
  "crm_next_touch_asset",
  "feature_documentation",
  "decision_record",
  "proof_page",
  "architecture_page",
  "changelog_page",
  "workflow_guide",
  "system_overview",
  "knowledge_diagram",
] as const;

export const DELIVERABLE_STATUSES = ["ready", "in_progress", "blocked", "published"] as const;
export const CHANNEL_PACKAGE_TYPES = [
  "story_page",
  "seo_page",
  "pdf",
  "linkedin_post",
  "linkedin_carousel",
  "facebook_post",
  "facebook_ad",
  "instagram_post",
  "instagram_story",
  "instagram_reel",
  "reddit_post",
  "youtube_video",
  "youtube_short",
  "video_shot_list",
  "email_sequence",
  "crm_next_touch_asset",
  "sales_one_pager",
] as const;
export const CHANNEL_PACKAGE_READINESS_STATUSES = ["ready", "partial", "blocked"] as const;

export type DeliverableType = (typeof DELIVERABLE_TYPES)[number];
export type DeliverableStatus = (typeof DELIVERABLE_STATUSES)[number];
export type ChannelPackageType = (typeof CHANNEL_PACKAGE_TYPES)[number];
export type ChannelPackageReadinessStatus = (typeof CHANNEL_PACKAGE_READINESS_STATUSES)[number];
export type ChannelPackageReadiness = Record<ChannelPackageType, ChannelPackageReadinessStatus>;
export type ChannelPackageReadinessCounts = Record<ChannelPackageReadinessStatus, number>;

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

type ChannelReadinessSignals = {
  title_exists: boolean;
  topic_exists: boolean;
  audience_exists: boolean;
  body_content_exists: boolean;
  draft_exists: boolean;
  source_insight_exists: boolean;
  source_deliverable_exists: boolean;
  cta_exists: boolean;
  offer_exists: boolean;
  next_action_exists: boolean;
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
  channel_signals: ChannelReadinessSignals;
  channel_readiness: ChannelPackageReadiness;
  channel_readiness_counts: ChannelPackageReadinessCounts;
};
type DeliverableBeforeChannelReadiness = Omit<Deliverable, "channel_readiness" | "channel_readiness_counts">;

export type BlockerDetail = {
  kind: "missing_evidence" | "missing_proof" | "missing_recommendation" | "missing_outcome_metric" | "missing_component";
  label: string;
};

type ComponentRule = {
  key: string;
  label: string;
  blocksReadiness?: boolean;
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
  article: "Articles",
  assessment: "Assessments",
  report: "Reports",
  executive_brief: "Executive Briefs",
  case_study: "Case Studies",
  offer_asset: "Offer Assets",
  sales_asset: "Sales Assets",
  comparison: "Comparisons",
  guide: "Guides",
  email_sequence: "Email Sequences",
  landing_page: "Landing Pages",
  linkedin_post: "LinkedIn Posts",
  facebook_ad: "Facebook Ads",
  reddit_post: "Reddit Posts",
  crm_next_touch_asset: "CRM Next Touch Assets",
  feature_documentation: "Feature Documentation",
  decision_record: "Decision Records",
  proof_page: "Proof Pages",
  architecture_page: "Architecture Pages",
  changelog_page: "Changelog Pages",
  workflow_guide: "Workflow Guides",
  system_overview: "System Overviews",
  knowledge_diagram: "Knowledge Diagrams",
};

export const CHANNEL_PACKAGE_LABELS: Record<ChannelPackageType, string> = {
  story_page: "Story Page",
  seo_page: "SEO Page",
  pdf: "PDF",
  linkedin_post: "LinkedIn Post",
  linkedin_carousel: "LinkedIn Carousel",
  facebook_post: "Facebook Post",
  facebook_ad: "Facebook Ad",
  instagram_post: "Instagram Post",
  instagram_story: "Instagram Story",
  instagram_reel: "Instagram Reel",
  reddit_post: "Reddit Post",
  youtube_video: "YouTube Video",
  youtube_short: "YouTube Short",
  video_shot_list: "Video Shot List",
  email_sequence: "Email Sequence",
  crm_next_touch_asset: "CRM Next Touch Asset",
  sales_one_pager: "Sales One Pager",
};

const ASSET_TYPE_TO_DELIVERABLE: Record<string, DeliverableType | undefined> = {
  article: "article",
  assessment: "assessment",
  report: "report",
  executive_brief: "executive_brief",
  case_study: "case_study",
  intelligence_report: "report",
  offer_asset: "offer_asset",
  sales_asset: "sales_asset",
  comparison: "comparison",
  comparison_page: "comparison",
  comparison_guide: "comparison",
  guide: "guide",
  buyer_guide: "guide",
  relocation_guide: "guide",
  seller_guide: "guide",
  email_sequence: "email_sequence",
  landing_page: "landing_page",
  linkedin_post: "linkedin_post",
  facebook_ad: "facebook_ad",
  reddit_post: "reddit_post",
  crm_next_touch_asset: "crm_next_touch_asset",
  feature_documentation: "feature_documentation",
  decision_record: "decision_record",
  proof_page: "proof_page",
  architecture_page: "architecture_page",
  changelog_page: "changelog_page",
  workflow_guide: "workflow_guide",
  system_overview: "system_overview",
  knowledge_diagram: "knowledge_diagram",
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
const OFFER_SIGNALS = ["offer", "assessment", "diagnostic", "service"];
const SOURCE_DELIVERABLE_SIGNALS = [
  "source deliverable",
  "approved deliverable",
  "source asset",
  "existing deliverable",
  "deliverable",
];
const NEXT_ACTION_SIGNALS = ["next action", "next touch", "follow up", "follow-up", "call", "email", ...CTA_SIGNALS];
const BLOCKING_COMPONENTS = new Set(["evidence", "proof", "assessment_questions"]);

const BUSINESS_VALUE_BY_TYPE: Record<DeliverableType, number> = {
  article: 70,
  assessment: 95,
  report: 75,
  executive_brief: 90,
  case_study: 85,
  offer_asset: 88,
  sales_asset: 80,
  comparison: 82,
  guide: 78,
  email_sequence: 76,
  landing_page: 86,
  linkedin_post: 65,
  facebook_ad: 72,
  reddit_post: 62,
  crm_next_touch_asset: 74,
  feature_documentation: 86,
  decision_record: 82,
  proof_page: 88,
  architecture_page: 84,
  changelog_page: 78,
  workflow_guide: 80,
  system_overview: 86,
  knowledge_diagram: 92,
};
const SALES_ONE_PAGER_BUSINESS_VALUE_THRESHOLD = 85;

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
  comparison: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("audience", "audience", (input) => hasMeaningfulText(input.audience), true),
    component("compared_entities", "compared_entities", (input) => comparedEntityCount(input) >= 2, true),
    component("supporting_material", "supporting_material", (input) => hasSupportingMaterial(input), true),
  ],
  guide: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("audience", "audience", (input) => hasMeaningfulText(input.audience), true),
    component("topic", "topic", (input) => hasTopic(input), true),
    component("supporting_material", "supporting_material", (input) => hasSupportingMaterial(input)),
  ],
  email_sequence: [
    component("audience", "audience", (input) => hasMeaningfulText(input.audience), true),
    component("primary_topic", "primary_topic", (input) => hasTopic(input)),
    component("source_deliverable", "source_deliverable", (input) => hasSourceDeliverable(input), true),
  ],
  landing_page: [
    component("audience", "audience", (input) => hasMeaningfulText(input.audience)),
    component("offer", "offer", (input) => hasOffer(input), true),
    component("cta", "cta", (input) => hasCta(input), true),
  ],
  linkedin_post: [
    component("source", "source_insight_or_deliverable", (input) =>
      hasSourceInsight(input) || hasSourceDeliverable(input),
    true),
  ],
  facebook_ad: [
    component("audience", "audience", (input) => hasMeaningfulText(input.audience), true),
    component("cta", "cta", (input) => hasCta(input), true),
    component("offer_or_deliverable", "offer_or_deliverable", (input) =>
      hasOffer(input) || hasSourceDeliverable(input),
    ),
  ],
  reddit_post: [
    component("source_insight", "source_insight", (input) => hasSourceInsight(input), true),
    component("topic", "topic", (input) => hasTopic(input), true),
  ],
  crm_next_touch_asset: [
    component("audience", "audience", (input) => hasMeaningfulText(input.audience)),
    component("source_deliverable", "source_deliverable", (input) => hasSourceDeliverable(input), true),
    component("next_action", "next_action", (input) => hasNextAction(input), true),
  ],
  feature_documentation: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("problem", "problem", (input) => hasProblem(input)),
    component("proof", "proof", (input) => hasProof(input), true),
    component("architecture", "architecture", (input) =>
      hasSignal(allText(input), ["architecture", "framework", "system", "model", "layer"]),
    ),
  ],
  decision_record: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("decision", "decision", (input) => hasSignal(allText(input), ["decision", "decide", "adopt"])),
    component("source", "source_insight_or_evidence", (input) => hasSourceInsight(input) || input.evidence.length > 0, true),
  ],
  proof_page: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("proof", "proof", (input) => hasProof(input), true),
    component("demonstration", "demonstration", (input) =>
      hasSignal(allText(input), ["screenshot", "proof", "demonstrate", "evidence"]),
    ),
  ],
  architecture_page: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("architecture", "architecture", (input) =>
      hasSignal(allText(input), ["architecture", "diagram", "flow", "lifecycle", "system"]),
    true),
    component("supporting_material", "supporting_material", (input) => hasSupportingMaterial(input)),
  ],
  changelog_page: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("change_history", "change_history", (input) =>
      hasSignal(allText(input), ["release", "changelog", "changed", "built", "implemented"]),
    true),
    component("source", "source_insight_or_evidence", (input) => hasSourceInsight(input) || input.evidence.length > 0),
  ],
  workflow_guide: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("workflow", "workflow", (input) =>
      hasSignal(allText(input), ["workflow", "process", "step", "operator", "guide"]),
    true),
    component("supporting_material", "supporting_material", (input) => hasSupportingMaterial(input)),
  ],
  system_overview: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("system", "system", (input) =>
      hasSignal(allText(input), ["system", "architecture", "framework", "operating model"]),
    true),
    component("proof", "proof", (input) => hasProof(input), true),
  ],
  knowledge_diagram: [
    component("title", "title", (input) => hasMeaningfulText(input.title)),
    component("business_problem", "business_problem", (input) => hasProblem(input)),
    component("evidence", "evidence", (input) => input.evidence.length > 0),
    component("diagram_specification", "diagram_specification", (input) =>
      hasSignal(allText(input), ["diagram", "purpose", "inputs", "outputs", "claim boundary"]),
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
    const channelSignals = getChannelReadinessSignals({
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
      channel_signals: channelSignals,
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
    const channelSignals = getChannelReadinessSignals({
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
      channel_signals: channelSignals,
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

export function getReadyToProduceDeliverables(deliverables: Deliverable[]) {
  return deliverables
    .filter((deliverable) => deliverable.status === "ready" && !deliverable.has_asset)
    .filter((deliverable) => deliverable.ignore_reason == null)
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
  const missingRules = rules.filter((rule) => !rule.isPresent(input));
  const missing_components = missingRules.map((rule) => rule.label);
  const readiness = Math.round(((rules.length - missing_components.length) / rules.length) * 100);
  const blocking_gaps = missingRules
    .filter((rule) => rule.blocksReadiness ?? BLOCKING_COMPONENTS.has(rule.label))
    .map((rule) => rule.label);

  return { readiness, missing_components, blocking_gaps };
}

export function getChannelPackageReadiness(deliverable: Pick<
  Deliverable,
  "type" | "status" | "business_value_score" | "channel_signals"
>): ChannelPackageReadiness {
  const isDeliverableReady = isReadyForChannels(deliverable.status);
  const isDeliverableIncomplete = !isDeliverableReady;
  const isCarouselType = ["comparison", "guide", "report"].includes(deliverable.type);
  const signals = deliverable.channel_signals;

  return {
    story_page:
      signals.source_insight_exists && isDeliverableReady
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    seo_page:
      signals.title_exists && signals.topic_exists && isDeliverableReady
        ? "ready"
        : signals.title_exists && isDeliverableIncomplete
          ? "partial"
          : "blocked",
    pdf:
      isDeliverableReady && signals.body_content_exists
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    linkedin_post:
      signals.source_insight_exists || isDeliverableReady
        ? "ready"
        : "blocked",
    linkedin_carousel:
      isCarouselType && isDeliverableReady
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    facebook_post:
      signals.audience_exists && isDeliverableReady
        ? "ready"
        : "blocked",
    facebook_ad:
      signals.audience_exists
        && signals.cta_exists
        && (signals.offer_exists || signals.source_deliverable_exists || isDeliverableReady)
        ? "ready"
        : signals.audience_exists && !signals.cta_exists
          ? "partial"
          : "blocked",
    instagram_post:
      signals.audience_exists && (signals.source_insight_exists || isDeliverableReady)
        ? "ready"
        : "blocked",
    instagram_story:
      signals.audience_exists && signals.body_content_exists
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    instagram_reel:
      signals.audience_exists && signals.source_insight_exists
        ? "ready"
        : "blocked",
    reddit_post:
      signals.topic_exists && signals.source_insight_exists
        ? "ready"
        : "blocked",
    youtube_video:
      signals.audience_exists && signals.source_insight_exists && isDeliverableReady
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    youtube_short:
      signals.source_insight_exists || isDeliverableReady
        ? "ready"
        : "blocked",
    video_shot_list:
      signals.topic_exists && signals.title_exists
        ? "ready"
        : "blocked",
    email_sequence:
      signals.audience_exists && isDeliverableReady
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
    crm_next_touch_asset:
      signals.audience_exists && signals.next_action_exists && isDeliverableReady
        ? "ready"
        : "blocked",
    sales_one_pager:
      (isDeliverableReady && signals.offer_exists)
        || deliverable.business_value_score > SALES_ONE_PAGER_BUSINESS_VALUE_THRESHOLD
        ? "ready"
        : signals.draft_exists
          ? "partial"
          : "blocked",
  };
}

export function summarizeChannelPackageReadiness(readiness: ChannelPackageReadiness): ChannelPackageReadinessCounts {
  return CHANNEL_PACKAGE_TYPES.reduce<ChannelPackageReadinessCounts>(
    (counts, type) => {
      counts[readiness[type]] += 1;
      return counts;
    },
    { ready: 0, partial: 0, blocked: 0 },
  );
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

function enrichDeliverable(
  deliverable: DeliverableBeforeChannelReadiness,
): Deliverable {
  const businessValueScore = scoreBusinessValue(deliverable.type, deliverable.business_unit);
  const priorityScore = scorePriority(deliverable);
  const completionProbability = scoreCompletionProbability(deliverable);
  const estimatedEffortMinutes = estimateEffortMinutes(deliverable);
  const enriched = {
    ...deliverable,
    priority_score: priorityScore,
    business_value_score: businessValueScore,
    completion_probability: completionProbability,
    estimated_effort_minutes: estimatedEffortMinutes,
    next_action: getNextAction(deliverable),
    ignore_reason: getIgnoreReason(deliverable, priorityScore, completionProbability, estimatedEffortMinutes),
  };
  const channelReadiness = getChannelPackageReadiness(enriched);

  return {
    ...enriched,
    channel_readiness: channelReadiness,
    channel_readiness_counts: summarizeChannelPackageReadiness(channelReadiness),
  };
}

function scorePriority(deliverable: DeliverableBeforeChannelReadiness) {
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

function scoreCompletionProbability(deliverable: DeliverableBeforeChannelReadiness) {
  const assetBonus = deliverable.has_asset ? 8 : 0;
  const evidenceBonus = Math.min(deliverable.evidence_count, 3) * 3;
  return clamp(
    deliverable.readiness + assetBonus + evidenceBonus - deliverable.blocking_gaps.length * 25 - deliverable.missing_components.length * 5,
    0,
    100,
  );
}

function estimateEffortMinutes(deliverable: DeliverableBeforeChannelReadiness) {
  if (deliverable.status === "published") return 0;
  if (deliverable.status === "ready" && deliverable.has_asset) return 15;

  const base = deliverable.has_asset ? 15 : 30;
  const missingWork = deliverable.missing_components.length * 15;
  const blockerWork = deliverable.blocking_gaps.length * 20;
  return clamp(base + missingWork + blockerWork, 15, 180);
}

function getNextAction(deliverable: DeliverableBeforeChannelReadiness) {
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
  deliverable: DeliverableBeforeChannelReadiness,
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

function component(
  key: string,
  label: string,
  isPresent: ComponentRule["isPresent"],
  blocksReadiness?: boolean,
): ComponentRule {
  return { key, label, isPresent, blocksReadiness };
}

function sourceRecordsFromEvidence(evidence: EvidenceInput[]): SourceRecord[] {
  return evidence.map((record) => ({
    kind: "evidence",
    ref: `${record.domain}:${record.slug}`,
    label: record.observation,
  }));
}

function getChannelReadinessSignals(input: DeliverableEvaluationInput): ChannelReadinessSignals {
  const assetStatus = input.assetStatus?.toLowerCase() ?? null;

  return {
    title_exists: hasMeaningfulText(input.title),
    topic_exists: hasTopic(input),
    audience_exists: hasMeaningfulText(input.audience),
    body_content_exists: input.assetStatus != null,
    draft_exists: assetStatus != null && assetStatus !== "published",
    source_insight_exists: hasSourceInsight(input),
    source_deliverable_exists: hasSourceDeliverable(input),
    cta_exists: hasCta(input),
    offer_exists: hasOffer(input),
    next_action_exists: hasNextAction(input),
  };
}

function isReadyForChannels(status: DeliverableStatus) {
  return status === "ready" || status === "published";
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

function descriptiveText(input: DeliverableEvaluationInput) {
  return [
    input.title,
    input.angle,
    input.audience,
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

function hasSupportingMaterial(input: DeliverableEvaluationInput) {
  return input.evidence.length > 0;
}

function hasTopic(input: DeliverableEvaluationInput) {
  return hasMeaningfulText(input.angle);
}

function hasSourceInsight(input: DeliverableEvaluationInput) {
  return hasMeaningfulText(input.angle);
}

function hasSourceDeliverable(input: DeliverableEvaluationInput) {
  return input.assetStatus != null || hasSignal(allText(input), SOURCE_DELIVERABLE_SIGNALS);
}

function hasOffer(input: DeliverableEvaluationInput) {
  return hasSignal(allText(input), OFFER_SIGNALS);
}

function hasCta(input: DeliverableEvaluationInput) {
  return hasSignal(allText(input), CTA_SIGNALS);
}

function hasNextAction(input: DeliverableEvaluationInput) {
  return hasSignal(descriptiveText(input), NEXT_ACTION_SIGNALS);
}

function comparedEntityCount(input: DeliverableEvaluationInput) {
  const comparisonText = [input.title, input.angle, ...input.evidence.map((record) => record.observation)]
    .filter(Boolean)
    .join(" ");

  if (/\b(vs\.?|versus)\b/i.test(comparisonText)) return 2;
  if (/\bcompare(s|d)?\b/i.test(comparisonText) && /\b(and|with|against)\b/i.test(comparisonText)) return 2;
  return 0;
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
