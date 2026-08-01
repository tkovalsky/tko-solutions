import type { OiSignalTier, OiSignalType, OiSourceType } from "@prisma/client";

type ClassificationFact = {
  field: string;
  value: string;
  normalizedValue?: string | null;
};

export type ClassifySignalInput = {
  sourceType: OiSourceType | string;
  title?: string | null;
  rawContent: string;
  canonicalUrl?: string | null;
  occurredAt?: Date | null;
  retrievedAt?: Date | null;
  organization?: {
    domain?: string | null;
    website?: string | null;
    tier?: number | null;
    isWatched?: boolean | null;
  } | null;
  facts?: ClassificationFact[];
};

export type ClassifiedSignal = {
  tier: OiSignalTier;
  signalType: OiSignalType;
  strength: number;
  confidence: number;
  domainTags: string[];
  reasons: string[];
};

const TIER_BASE: Record<OiSignalTier, number> = {
  tier_1: 60,
  tier_2: 30,
  tier_3: 5,
};

const TIER_BY_SIGNAL_TYPE: Record<OiSignalType, OiSignalTier> = {
  senior_role_posting: "tier_1",
  rfp_published: "tier_1",
  stated_operational_problem: "tier_1",
  stalled_program: "tier_1",
  regulatory_deadline: "tier_1",
  domain_role_posting: "tier_2",
  concentrated_hiring: "tier_2",
  transformation_announcement: "tier_2",
  leadership_appointment: "tier_2",
  leadership_departure: "tier_2",
  vendor_selection: "tier_2",
  technology_modernization: "tier_2",
  partner_change: "tier_2",
  referral: "tier_2",
  acquisition_merger: "tier_3",
  funding_round: "tier_3",
  earnings_statement: "tier_3",
  partnership_announcement: "tier_3",
  conference_presentation: "tier_3",
  general_news: "tier_3",
  operator_note: "tier_3",
};

const TODD_V2_DOMAINS = [
  "prior_authorization",
  "utilization_management",
  "interoperability",
  "workflow_modernization",
  "care_management",
  "claims_operations",
  "program_recovery",
  "ai_adoption",
  "operating_model",
  "regulatory_compliance",
  "platform_implementation",
];

const DOMAIN_PATTERNS: Array<{ tag: string; pattern: RegExp }> = [
  { tag: "prior_authorization", pattern: /\b(prior authorization|pre-authorization|pa program|utilization review)\b/i },
  { tag: "utilization_management", pattern: /\b(utilization management|um transformation|medical management)\b/i },
  { tag: "interoperability", pattern: /\b(fhir|hl7|interoperability|data exchange)\b/i },
  { tag: "workflow_modernization", pattern: /\b(workflow|moderniz\w*|automation|process improv\w*)\b/i },
  { tag: "care_management", pattern: /\b(care management|case management|population health)\b/i },
  { tag: "claims_operations", pattern: /\b(claims?|payment integrity|claims operations)\b/i },
  { tag: "program_recovery", pattern: /\b(stalled|turnaround|recovery|stabilization|at[- ]risk program)\b/i },
  { tag: "ai_adoption", pattern: /\b(ai|machine learning|ml|automation strategy)\b/i },
  { tag: "operating_model", pattern: /\b(operating model|governance|org design|transformation office)\b/i },
  { tag: "regulatory_compliance", pattern: /\b(regulatory|compliance|mandate|deadline|cms|rule)\b/i },
  { tag: "post_merger_integration", pattern: /\b(merger|acquisition|integration)\b/i },
  { tag: "platform_implementation", pattern: /\b(platform|salesforce|servicenow|epic|workday|implementation)\b/i },
];

const PROCUREMENT_HOST_PATTERN = /\b(procure|supplier|vendor|bid|rfp|bonfirehub|ariba|ionwave|publicpurchase)\b/i;

export function classifySignal(input: ClassifySignalInput): ClassifiedSignal {
  const text = `${input.title ?? ""}\n${input.rawContent}`.toLowerCase();
  const signalType = detectSignalType(input.sourceType, text, input.canonicalUrl);
  const tier = TIER_BY_SIGNAL_TYPE[signalType];
  const domainTags = detectDomainTags(text);
  const reasons = [`${signalTypeLabel(signalType)} is a ${tierLabel(tier)} signal.`];
  let strength = TIER_BASE[tier];

  const occurredAt = input.occurredAt ?? input.retrievedAt ?? new Date();
  const ageDays = Math.floor((startOfDay(new Date()).getTime() - startOfDay(occurredAt).getTime()) / 86_400_000);
  if (ageDays <= 7) {
    strength += 15;
    reasons.push("Source is 7 days old or newer.");
  } else if (ageDays <= 30) {
    strength += 8;
    reasons.push("Source is 30 days old or newer.");
  } else if (ageDays <= 90) {
    reasons.push("Source is within the 90-day evidence window.");
  } else {
    strength -= 10;
    reasons.push("Source is older than 90 days.");
  }

  const domainMatches = domainTags.filter((tag) => TODD_V2_DOMAINS.includes(tag)).length;
  if (domainMatches >= 2) {
    strength += 12;
    reasons.push("Two or more Todd v2 domains match.");
  } else if (domainMatches === 1) {
    strength += 6;
    reasons.push("One Todd v2 domain matches.");
  }

  if (input.facts?.some((fact) => fact.field === "business_problem")) {
    strength += 10;
    reasons.push("A named business problem was extracted.");
  }
  if (hasNamedExecutive(text)) {
    strength += 8;
    reasons.push("The source names an executive or senior owner.");
  }
  if (input.facts?.some((fact) => fact.field === "urgency") && /\b(rule|deadline|mandate|cms|regulatory)\b/i.test(text)) {
    strength += 10;
    reasons.push("Urgency cites a rule, deadline, or mandate.");
  }
  if (input.organization?.isWatched) {
    strength += 5;
    reasons.push("Account is on the watch list.");
  }
  if (input.organization?.tier === 1) {
    strength += 8;
    reasons.push("Account is a tier 1 industry target.");
  }
  if (isAggregatorSource(input.canonicalUrl, input.organization)) {
    strength -= 5;
    reasons.push("Source appears on an aggregator rather than the company domain.");
  }

  const clampedStrength = clamp(strength, 0, 100);
  if (clampedStrength !== strength) {
    reasons.push(`Strength was clamped to ${clampedStrength}.`);
  }

  return {
    tier,
    signalType,
    strength: clampedStrength,
    confidence: clampedStrength,
    domainTags,
    reasons,
  };
}

export function signalTypeLabel(signalType: OiSignalType): string {
  const label = signalType.replaceAll("_", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function detectSignalType(sourceType: OiSourceType | string, text: string, canonicalUrl?: string | null): OiSignalType {
  const host = hostFromUrl(canonicalUrl);
  if (sourceType === "referral") return "referral";
  if (sourceType === "regulatory_event" || /\b(cms|regulatory|mandate|deadline|final rule)\b/i.test(text)) {
    return "regulatory_deadline";
  }
  if (/\b(rfp|rfi|rfq|solicitation|request for proposal|request for information|bid number)\b/i.test(text) || PROCUREMENT_HOST_PATTERN.test(host)) {
    return "rfp_published";
  }
  if (/\b(appointed|joins as|named|new chief|new ceo|new cfo|new coo|new cio)\b/i.test(text)) return "leadership_appointment";
  if (/\b(departed|steps down|resigned|retired)\b/i.test(text)) return "leadership_departure";
  if (sourceType === "job_posting" || /\b(director|vice president|vp|svp|chief|c-suite|hiring|job|role)\b/i.test(text)) {
    if (/\b(director|vice president|vp|svp|chief|c-suite)\b/i.test(text)) return "senior_role_posting";
    return "domain_role_posting";
  }
  if (/\b(stalled|behind schedule|at risk|program recovery|turnaround)\b/i.test(text)) return "stalled_program";
  if (/\b(multiple roles|hiring spree|team buildout|expanding the team)\b/i.test(text)) return "concentrated_hiring";
  if (/\b(problem|challenge|pain point|struggling|backlog)\b/i.test(text)) return "stated_operational_problem";
  if (/\b(changed partners|replacing vendor|switching partner)\b/i.test(text)) return "partner_change";
  if (/\b(selected|vendor|platform selection|implementation partner)\b/i.test(text)) return "vendor_selection";
  if (/\b(platform|technology modernization|digital modernization)\b/i.test(text)) return "technology_modernization";
  if (/\b(transformation|enterprise change|operating model)\b/i.test(text)) return "transformation_announcement";
  if (/\b(acquisition|merger|acquired|merge)\b/i.test(text)) return "acquisition_merger";
  if (/\b(funding|series [abc]|investment round)\b/i.test(text)) return "funding_round";
  if (/\b(earnings|quarterly results|10-q|10-k)\b/i.test(text)) return "earnings_statement";
  if (/\b(partnership|partnered with|alliance)\b/i.test(text)) return "partnership_announcement";
  if (/\b(conference|webinar|presentation|panel)\b/i.test(text)) return "conference_presentation";
  if (sourceType === "pasted_text") return "operator_note";
  return "general_news";
}

function detectDomainTags(text: string) {
  return DOMAIN_PATTERNS.filter(({ pattern }) => pattern.test(text)).map(({ tag }) => tag);
}

function isAggregatorSource(
  canonicalUrl?: string | null,
  organization?: ClassifySignalInput["organization"],
) {
  const sourceHost = hostFromUrl(canonicalUrl);
  const organizationHost = (organization?.domain ?? hostFromUrl(organization?.website)).replace(/^www\./, "");
  if (!sourceHost || !organizationHost) return false;
  return !sourceHost.endsWith(organizationHost);
}

function hostFromUrl(url?: string | null) {
  if (!url) return "";
  try {
    return new URL(url.includes("://") ? url : `https://${url}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function hasNamedExecutive(text: string) {
  return /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(text) || /\b(ceo|cfo|coo|cio|cto|chief|president)\b/i.test(text);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function tierLabel(tier: OiSignalTier) {
  return tier.replace("tier_", "Tier ");
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
