export const OI_SCORE_POLICY_VERSION = "oi-v1";
export const OI_MINIMUM_CONSULTING_MONTHLY_VALUE = 20_000;
export { scoreStakeholderAccess } from "../../commercial/score/access";
export type {
  ScoreComponent,
  StakeholderAccessInput,
  StakeholderAccessResult,
} from "../../commercial/score/access";

export type OiOrganizationKind =
  | "payer"
  | "health_tech"
  | "health_system"
  | "consulting"
  | "other";

export type OiSeniority =
  | "director"
  | "vice_president"
  | "senior_vice_president"
  | "c_suite"
  | "other";

export type OiPursuitMode = "consulting" | "employment" | "both";

export type OiScoreInput = {
  seniority: OiSeniority;
  organizationKind: OiOrganizationKind;
  mode: OiPursuitMode;
  targetMonthlyValue: number;
  budgetAuthority: number;
  hiringAuthority: number;
  transformationRelevance: number;
  relationshipStrength: number;
  sourceConfidence: number;
  sourcePublishedAt?: Date | null;
  domainTags: string[];
  lookalikeOverlapCount: number;
  doNotContact?: boolean;
};

export type OiScoreComponent = {
  key: string;
  label: string;
  points: number;
  reason: string;
};

export type OiScoreResult = {
  score: number;
  readiness: "blocked" | "research_ready" | "contact_ready";
  nextAction: string;
  components: OiScoreComponent[];
  warnings: string[];
  policyVersion: typeof OI_SCORE_POLICY_VERSION;
};

export type StarterPerson = {
  name: string;
  title: string;
  organization: {
    name: string;
    website?: string;
    kind: OiOrganizationKind;
  };
  seniority: OiSeniority;
  sourceUrl?: string;
  sourceLabel: string;
  sourcePublishedAt?: string;
  sourceConfidence: number;
  isLookalikeAnchor: boolean;
  domainTags: string[];
  budgetAuthority: number;
  hiringAuthority: number;
  transformationRelevance: number;
  relationshipStrength: number;
  notes: string;
  pursuit?: {
    mode: OiPursuitMode;
    targetMonthlyValue: number;
    problemHypothesis: string;
    fitHypothesis: string;
    evidenceSummary: string;
  };
};

const RELEVANT_DOMAIN_TAGS = new Set([
  "payer",
  "health-tech",
  "prior-authorization",
  "utilization-management",
  "clinical-review",
  "provider-operations",
  "interoperability",
  "digital-transformation",
  "enterprise-transformation",
  "ai",
  "workflow-modernization",
  "product",
  "implementation",
]);

const SENIORITY_POINTS: Record<OiSeniority, number> = {
  director: 8,
  vice_president: 10,
  senior_vice_president: 12,
  c_suite: 10,
  other: 0,
};

const ORGANIZATION_POINTS: Record<OiOrganizationKind, number> = {
  payer: 8,
  health_tech: 7,
  health_system: 6,
  consulting: 4,
  other: 0,
};

export function scoreOpportunity(
  input: OiScoreInput,
  asOf = new Date(),
): OiScoreResult {
  const components: OiScoreComponent[] = [];
  const warnings: string[] = [];
  const add = (key: string, label: string, points: number, reason: string) => {
    components.push({ key, label, points, reason });
  };

  add(
    "seniority",
    "Director+ authority",
    SENIORITY_POINTS[input.seniority],
    input.seniority === "other"
      ? "The role is not yet verified as Director+."
      : `The role is classified as ${formatSeniority(input.seniority)}.`,
  );
  add(
    "market",
    "Target-market fit",
    ORGANIZATION_POINTS[input.organizationKind],
    `${formatOrganizationKind(input.organizationKind)} is an explicit OIE target market.`,
  );
  add(
    "budget",
    "Budget authority",
    boundedLevel(input.budgetAuthority) * 4,
    `Operator-assessed budget authority is ${boundedLevel(input.budgetAuthority)}/3.`,
  );
  add(
    "hiring",
    "Hiring authority",
    boundedLevel(input.hiringAuthority) * 3,
    `Operator-assessed hiring influence is ${boundedLevel(input.hiringAuthority)}/3.`,
  );
  add(
    "transformation",
    "Transformation relevance",
    boundedLevel(input.transformationRelevance) * 4,
    `Relevance to transformation, workflow, product, or operating-model work is ${boundedLevel(input.transformationRelevance)}/3.`,
  );

  const domainMatches = uniqueTags(input.domainTags).filter((tag) =>
    RELEVANT_DOMAIN_TAGS.has(tag),
  );
  add(
    "domain",
    "Domain signal",
    Math.min(domainMatches.length * 2, 6),
    domainMatches.length
      ? `Relevant signals: ${domainMatches.join(", ")}.`
      : "No priority domain signal has been recorded.",
  );
  add(
    "lookalike",
    "Lookalike overlap",
    Math.min(Math.max(input.lookalikeOverlapCount, 0) * 2, 10),
    input.lookalikeOverlapCount
      ? `${input.lookalikeOverlapCount} traits overlap the operator-defined anchor set.`
      : "No anchor overlap has been established.",
  );
  add(
    "relationship",
    "Relationship access",
    boundedLevel(input.relationshipStrength) * 4,
    boundedLevel(input.relationshipStrength)
      ? `Relationship strength is ${boundedLevel(input.relationshipStrength)}/3.`
      : "No warm path is recorded.",
  );
  add(
    "source",
    "Evidence confidence",
    boundedLevel(input.sourceConfidence) * 2,
    `Source confidence is ${boundedLevel(input.sourceConfidence)}/3.`,
  );

  if (input.mode !== "employment") {
    add(
      "economics",
      "$20K/month economics",
      input.targetMonthlyValue >= OI_MINIMUM_CONSULTING_MONTHLY_VALUE ? 8 : -10,
      input.targetMonthlyValue >= OI_MINIMUM_CONSULTING_MONTHLY_VALUE
        ? `The pursuit meets the $${OI_MINIMUM_CONSULTING_MONTHLY_VALUE.toLocaleString("en-US")}/month consulting threshold.`
        : "The pursuit does not yet meet the consulting value threshold.",
    );
  } else {
    add(
      "economics",
      "Employment path",
      5,
      "The pursuit is evaluated as an FTE relationship rather than monthly consulting revenue.",
    );
  }

  if (input.seniority === "other") {
    add("seniority_penalty", "Seniority gate", -20, "Director+ authority is required.");
    warnings.push("Verify that the person is currently Director level or above.");
  }
  if (input.budgetAuthority === 0 && input.hiringAuthority === 0) {
    add(
      "authority_penalty",
      "Authority gap",
      -8,
      "No budget or hiring authority has been established.",
    );
    warnings.push("Research whether this person owns budget or can sponsor a hire.");
  }
  if (input.sourceConfidence === 0) {
    add("source_penalty", "Missing source", -10, "No reliable public or operator source is linked.");
    warnings.push("Add a public professional source before outreach.");
  }

  const stale = sourceIsStale(input.sourcePublishedAt, asOf);
  if (stale) {
    add(
      "freshness_penalty",
      "Source freshness",
      -6,
      "The current-role source is more than 12 months old.",
    );
    warnings.push("Reverify the person's current title before contact.");
  }
  if (input.doNotContact) {
    warnings.push("This person is marked do not contact.");
  }

  const rawScore = components.reduce((sum, component) => sum + component.points, 0);
  const score = Math.max(0, Math.min(100, rawScore));
  const hasAuthority = input.budgetAuthority >= 2 || input.hiringAuthority >= 2;
  const verifiedEnough = input.sourceConfidence >= 2 && !stale;
  const readiness =
    input.doNotContact
      ? "blocked"
      : score >= 70 && input.seniority !== "other" && hasAuthority && verifiedEnough
        ? "contact_ready"
        : "research_ready";

  const nextAction =
    input.doNotContact
      ? "Do not contact; preserve the suppression record."
      : input.seniority === "other" || stale
        ? "Verify the current role and Director+ authority from a fresh public source."
        : input.sourceConfidence < 2
          ? "Add a reliable public source and verify the role before outreach."
          : !hasAuthority
            ? "Research budget ownership, hiring influence, and the likely executive sponsor."
            : score >= 70
              ? "Identify a verified professional contact path and prepare a relevance-first email."
              : "Strengthen the initiative hypothesis and select the most relevant proof before contact.";

  return {
    score,
    readiness,
    nextAction,
    components,
    warnings,
    policyVersion: OI_SCORE_POLICY_VERSION,
  };
}

export function countLookalikeOverlap(
  candidateTags: string[],
  anchorTags: string[],
): number {
  const anchors = new Set(uniqueTags(anchorTags));
  return uniqueTags(candidateTags).filter((tag) => anchors.has(tag)).length;
}

export function uniqueTags(tags: string[]): string[] {
  return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

export function formatSeniority(value: OiSeniority): string {
  return {
    director: "Director",
    vice_president: "Vice President",
    senior_vice_president: "Senior Vice President",
    c_suite: "C-suite",
    other: "Unverified",
  }[value];
}

export function formatOrganizationKind(value: OiOrganizationKind): string {
  return {
    payer: "Health plan / payer",
    health_tech: "Health technology",
    health_system: "Health system",
    consulting: "Consulting / services",
    other: "Other",
  }[value];
}

function boundedLevel(value: number): number {
  return Math.max(0, Math.min(3, Math.round(value)));
}

function sourceIsStale(sourcePublishedAt: Date | null | undefined, asOf: Date): boolean {
  if (!sourcePublishedAt) return false;
  const age = asOf.getTime() - sourcePublishedAt.getTime();
  return age > 365 * 24 * 60 * 60 * 1000;
}

export const OI_STARTER_PEOPLE: StarterPerson[] = [
  {
    name: "Bobby Tafesse",
    title: "Operator-defined lookalike anchor",
    organization: { name: "UnitedHealthcare", kind: "payer" },
    seniority: "other",
    sourceLabel: "Provided directly by Todd as a lookalike anchor",
    sourceConfidence: 3,
    isLookalikeAnchor: true,
    domainTags: ["payer", "enterprise-transformation", "workflow-modernization", "implementation"],
    budgetAuthority: 3,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 3,
    notes:
      "Anchor traits are operator-defined, not an externally verified title or reporting-line claim.",
  },
  {
    name: "Bobbi Morrow",
    title: "Operator-defined lookalike anchor",
    organization: { name: "UnitedHealthcare", kind: "payer" },
    seniority: "other",
    sourceLabel: "Provided directly by Todd as a lookalike anchor",
    sourceConfidence: 3,
    isLookalikeAnchor: true,
    domainTags: ["payer", "enterprise-transformation", "provider-operations", "implementation"],
    budgetAuthority: 3,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 3,
    notes:
      "Anchor traits are operator-defined, not an externally verified title or reporting-line claim.",
  },
  {
    name: "Tracy Rutkowski",
    title: "Operator-defined lookalike anchor",
    organization: { name: "UnitedHealth Group", kind: "payer" },
    seniority: "other",
    sourceLabel: "Provided directly by Todd as a lookalike anchor",
    sourceConfidence: 3,
    isLookalikeAnchor: true,
    domainTags: ["payer", "enterprise-transformation", "ai", "workflow-modernization"],
    budgetAuthority: 3,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 3,
    notes:
      "Anchor traits are operator-defined, not an externally verified title or reporting-line claim.",
  },
  {
    name: "Shreya Patel",
    title: "Chief Innovation and Product Officer",
    organization: { name: "ELLKAY", website: "https://www.ellkay.com", kind: "health_tech" },
    seniority: "c_suite",
    sourceUrl: "https://www.ellkay.com/news/ellkay-names-new-chief-innovation-and-strategy-officers",
    sourceLabel: "ELLKAY leadership announcement",
    sourcePublishedAt: "2020-07-21",
    sourceConfidence: 3,
    isLookalikeAnchor: true,
    domainTags: ["health-tech", "product", "interoperability", "digital-transformation"],
    budgetAuthority: 3,
    hiringAuthority: 3,
    transformationRelevance: 3,
    relationshipStrength: 3,
    notes: "Current role should be reverified before external use because the linked announcement is old.",
  },
  {
    name: "Ashok Chennuru",
    title: "Vice President, Chief Data and Digital Transformation Officer",
    organization: {
      name: "Elevance Health",
      website: "https://www.elevancehealth.com",
      kind: "payer",
    },
    seniority: "vice_president",
    sourceUrl:
      "https://www.elevancehealth.com/newsroom/elevance-health-makes-clinical-review-faster-more-connected-with-health-os",
    sourceLabel: "Elevance Health — Health OS clinical-review announcement",
    sourcePublishedAt: "2026-06-23",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: [
      "payer",
      "digital-transformation",
      "ai",
      "clinical-review",
      "utilization-management",
      "interoperability",
    ],
    budgetAuthority: 3,
    hiringAuthority: 3,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Strong consulting lookalike; start with the Health OS and clinical-review operating problem.",
    pursuit: {
      mode: "both",
      targetMonthlyValue: 25_000,
      problemHypothesis:
        "Clinical-review and utilization-management modernization requires operating-model, governance, and cross-functional execution beyond the technology platform.",
      fitHypothesis:
        "Todd's payer transformation experience and ability to recover complex cross-functional programs match a visible enterprise priority.",
      evidenceSummary:
        "A current Elevance announcement names the role and describes a shift from fragmented manual clinical review to a connected intelligent ecosystem.",
    },
  },
  {
    name: "Caraline Coats",
    title: "Senior Vice President, Provider Strategy and Operations",
    organization: { name: "Humana", website: "https://www.humana.com", kind: "payer" },
    seniority: "senior_vice_president",
    sourceUrl:
      "https://news.humana.com/news/articles/humana-reaches-national-network-agreement-with-commonspirit-health",
    sourceLabel: "Humana national-network announcement",
    sourcePublishedAt: "2026-03-30",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: ["payer", "provider-operations", "workflow-modernization", "enterprise-transformation"],
    budgetAuthority: 3,
    hiringAuthority: 3,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Strong payer-operations sponsor profile; personalize around provider complexity and execution.",
    pursuit: {
      mode: "both",
      targetMonthlyValue: 25_000,
      problemHypothesis:
        "Provider strategy and network operations require coordinated operating decisions across markets, contracts, data, and member experience.",
      fitHypothesis:
        "Todd's experience inside a national payer and complex program governance is directly relevant to provider-operations transformation.",
      evidenceSummary:
        "A current Humana announcement names the role and describes responsibility for provider strategy and operations.",
    },
  },
  {
    name: "Matt Cunningham",
    title: "Executive Vice President of Product",
    organization: { name: "Availity", website: "https://www.availity.com", kind: "health_tech" },
    seniority: "senior_vice_president",
    sourceUrl:
      "https://www.availity.com/news/availity-applauds-industry-commitment-to-modernize-authorizations/",
    sourceLabel: "Availity authorization-modernization announcement",
    sourcePublishedAt: "2025-06-23",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: [
      "health-tech",
      "product",
      "prior-authorization",
      "utilization-management",
      "interoperability",
    ],
    budgetAuthority: 3,
    hiringAuthority: 3,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Product executive with a visible prior-authorization transformation agenda.",
    pursuit: {
      mode: "both",
      targetMonthlyValue: 25_000,
      problemHypothesis:
        "Scaling intelligent utilization management requires payer workflow knowledge, product-to-operations translation, and disciplined implementation.",
      fitHypothesis:
        "Todd can bridge payer operating reality, transformation delivery, and product execution.",
      evidenceSummary:
        "Availity publicly connects this executive's product role to intelligent utilization-management and prior-authorization modernization.",
    },
  },
  {
    name: "Samantha Murphy",
    title: "Vice President of Strategy and Partnerships",
    organization: { name: "Availity", website: "https://www.availity.com", kind: "health_tech" },
    seniority: "vice_president",
    sourceUrl:
      "https://www.availity.com/news/availity-shifts-left-on-prior-authorizations-at-vive/",
    sourceLabel: "Availity ViVE prior-authorization announcement",
    sourcePublishedAt: "2025-02-14",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: [
      "health-tech",
      "prior-authorization",
      "utilization-management",
      "interoperability",
      "enterprise-transformation",
    ],
    budgetAuthority: 2,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Strategy/partnership profile suited to a consulting or partner-led entry.",
    pursuit: {
      mode: "consulting",
      targetMonthlyValue: 20_000,
      problemHypothesis:
        "Payer-provider prior-authorization transformation depends on coordination across strategy, partnerships, product, and implementation.",
      fitHypothesis:
        "Todd offers payer-side transformation credibility and an operator-builder perspective for complex partnerships.",
      evidenceSummary:
        "Availity publicly identifies this strategy and partnerships role in the context of AI-enabled prior-authorization modernization.",
    },
  },
  {
    name: "Curtis Miller",
    title: "Vice President of Provider Lifecycle Solutions",
    organization: { name: "Availity", website: "https://www.availity.com", kind: "health_tech" },
    seniority: "vice_president",
    sourceUrl:
      "https://www.availity.com/blog/how-payers-can-turn-the-provider-lifecycle-into-a-growth-engine/",
    sourceLabel: "Availity provider-lifecycle article",
    sourcePublishedAt: "2026-01-15",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: ["health-tech", "payer", "provider-operations", "workflow-modernization", "product"],
    budgetAuthority: 2,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Relevant operating-problem owner; verify the best path and current remit before contact.",
    pursuit: {
      mode: "consulting",
      targetMonthlyValue: 20_000,
      problemHypothesis:
        "Provider lifecycle fragmentation creates measurable payer operating cost, compliance risk, and provider abrasion.",
      fitHypothesis:
        "Todd's operational-knowledge and workflow-modernization background can help turn provider data initiatives into governed execution.",
      evidenceSummary:
        "A current Availity article names the role and frames provider lifecycle as an operating and growth problem for payers.",
    },
  },
  {
    name: "Alan Hutchison",
    title: "Vice President",
    organization: { name: "Epic", website: "https://www.epic.com", kind: "health_tech" },
    seniority: "vice_president",
    sourceUrl:
      "https://www.elevancehealth.com/newsroom/elevance-health-makes-clinical-review-faster-more-connected-with-health-os",
    sourceLabel: "Elevance Health — Epic Payer Platform partnership announcement",
    sourcePublishedAt: "2026-06-23",
    sourceConfidence: 3,
    isLookalikeAnchor: false,
    domainTags: ["health-tech", "interoperability", "clinical-review", "utilization-management", "product"],
    budgetAuthority: 2,
    hiringAuthority: 2,
    transformationRelevance: 3,
    relationshipStrength: 0,
    notes: "Title is broad in the source; research the precise remit before preparing outreach.",
    pursuit: {
      mode: "both",
      targetMonthlyValue: 20_000,
      problemHypothesis:
        "Payer-platform adoption depends on translating connected clinical data into reliable clinical-review and utilization-management workflows.",
      fitHypothesis:
        "Todd can connect payer operating needs with implementation governance and workflow adoption.",
      evidenceSummary:
        "A current Elevance announcement quotes this Epic vice president in the context of connected clinical review and payer-platform work.",
    },
  },
];
