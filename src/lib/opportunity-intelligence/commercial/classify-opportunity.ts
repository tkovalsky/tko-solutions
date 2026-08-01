import type { OiOpportunityType, OiSignalType, OiSourceType } from "@prisma/client";

type ClassificationFact = {
  field: string;
  value: string;
  normalizedValue?: string | null;
};

export type ClassifyOpportunityInput = {
  sourceType: OiSourceType | string;
  signalType: OiSignalType | string;
  rawContent: string;
  canonicalUrl?: string | null;
  organization?: {
    kind?: string | null;
    domain?: string | null;
    website?: string | null;
  } | null;
  facts?: ClassificationFact[];
};

export type OpportunityCandidate = {
  type: OiOpportunityType;
  reason: string;
  disqualified: boolean;
  disqualifyingRule?: string;
  disqualificationExplanation?: string;
};

const COMP_FLOOR = 225_000;
const PROCUREMENT_DOMAIN = /\b(procure|procurement|supplier|vendor|bid|rfp|bonfirehub|ariba|ionwave|publicpurchase)\b/i;

export function classifyOpportunity(input: ClassifyOpportunityInput): OpportunityCandidate[] {
  const text = `${input.rawContent}\n${input.facts?.map((fact) => fact.value).join("\n") ?? ""}`;
  const lower = text.toLowerCase();
  const candidates = new Map<OiOpportunityType, OpportunityCandidate>();
  const signalType = input.signalType;

  const add = (candidate: OpportunityCandidate) => {
    const existing = candidates.get(candidate.type);
    if (!existing || candidate.disqualified || (existing.disqualified && !candidate.disqualified)) {
      candidates.set(candidate.type, candidate);
    }
  };

  if (isJobPosting(input.sourceType, lower) && /\b(director|vice president|vp|svp|chief|c-suite)\b/i.test(text)) {
    add({ type: "fte", reason: "Senior role posting creates an FTE candidate.", disqualified: false });
    if (input.organization?.kind === "payer" && /\b(prior authorization|pa program|utilization management|care management)\b/i.test(text)) {
      add({
        type: "consulting",
        reason: "Senior payer posting in a relevant operating domain also indicates a consulting candidate.",
        disqualified: false,
      });
    }
  }

  const compMax = compensationMax(text);
  if (isJobPosting(input.sourceType, lower) && compMax !== null && compMax < COMP_FLOOR) {
    add({
      type: "fte",
      reason: "Senior role posting creates an FTE candidate.",
      disqualified: true,
      disqualifyingRule: "compensation_floor",
      disqualificationExplanation: `comp max $${compMax.toLocaleString("en-US")} < $225,000 floor; keep as a consulting signal`,
    });
    add({ type: "consulting", reason: "Below-floor compensation can still indicate a consulting need.", disqualified: false });
  }

  if (/\b(rfp|rfi|rfq|solicitation|request for proposal|request for information|bid number)\b/i.test(text) || PROCUREMENT_DOMAIN.test(hostFromUrl(input.canonicalUrl))) {
    add({ type: "rfp", reason: "Source references a solicitation or procurement portal.", disqualified: false });
  }

  if (signalType === "stalled_program") {
    add({ type: "consulting", reason: "Stalled program signal indicates program recovery consulting.", disqualified: false });
  }

  if (["transformation_announcement", "stated_operational_problem", "concentrated_hiring"].includes(String(signalType))) {
    add({ type: "consulting", reason: "Transformation or operational-problem signal indicates consulting work.", disqualified: false });
    add({ type: "assessment", reason: "The same evidence supports an assessment candidate.", disqualified: false });
  }

  if (signalType === "leadership_appointment" && candidates.size === 0) {
    return [];
  }

  if (isConsultingFirm(input.organization?.kind, lower) && /\b(senior|principal|director|vp|partner|capability)\b/i.test(text)) {
    add({ type: "partnership", reason: "Consulting or SI firm is seeking senior capability.", disqualified: false });
  }

  if (/\b(interim|fractional|advisor|advisory)\b/i.test(text)) {
    add({ type: "fractional", reason: "Source mentions interim, fractional, or advisor work.", disqualified: false });
  }

  return [...candidates.values()];
}

function isJobPosting(sourceType: OiSourceType | string, text: string) {
  return sourceType === "job_posting" || /\b(job posting|job description|reports to|salary|compensation|responsibilities)\b/i.test(text);
}

function isConsultingFirm(kind: string | null | undefined, text: string) {
  return kind === "consulting" || /\b(system integrator|consulting firm|implementation partner|advisory firm)\b/i.test(text);
}

function compensationMax(text: string) {
  const matches = [...text.matchAll(/\$?\s?(\d{2,3})(?:,\d{3}|k)?\s*(?:-|–|to)\s*\$?\s?(\d{2,3})(?:,\d{3}|k)?/gi)];
  if (matches[0]) {
    return normalizeMoney(matches[0][2] ?? "");
  }
  const single = text.match(/\$?\s?(\d{2,3})(?:,\d{3}|k)?\s*(?:per year|annually|\/yr|\/year|salary|compensation)/i);
  return single ? normalizeMoney(single[1] ?? "") : null;
}

function normalizeMoney(value: string) {
  const numeric = Number(value.replace(/[^\d]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return numeric < 1000 ? numeric * 1000 : numeric;
}

function hostFromUrl(url?: string | null) {
  if (!url) return "";
  try {
    return new URL(url.includes("://") ? url : `https://${url}`).hostname.toLowerCase();
  } catch {
    return "";
  }
}
