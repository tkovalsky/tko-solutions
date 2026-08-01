import type { OpportunityFactForScoring, OpportunityScoreComponent } from "../../contracts";

export type UrgencyScoreInput = {
  facts: OpportunityFactForScoring[];
  roleProfile?: { closesAt?: Date | string | null } | null;
  rfpProfile?: { submissionDeadlineAt?: Date | string | null } | null;
  asOf: Date;
};

function includesAny(text: string, terms: readonly string[]) {
  return terms.some((term) => text.includes(term));
}

function daysUntil(asOf: Date, value?: Date | string | null) {
  if (!value) return null;
  return Math.ceil((new Date(value).getTime() - asOf.getTime()) / 86_400_000);
}

export function scoreUrgency(input: UrgencyScoreInput) {
  const components: OpportunityScoreComponent[] = [];
  const add = (key: string, label: string, points: number, maxPoints: number, reason: string) => {
    components.push({ key, label, points, maxPoints, reason });
  };
  const text = input.facts.map((fact) => `${fact.field} ${fact.normalizedValue}`).join("\n");

  const regulatory = includesAny(text, ["regulatory", "cms", "mandate", "deadline"]);
  add("regulatory_deadline", "Regulatory deadline", regulatory ? 30 : 0, 30, regulatory ? "Regulatory timing is present." : "No regulatory deadline signal.");

  const postingCloses = daysUntil(input.asOf, input.roleProfile?.closesAt);
  add("posting_closes", "Posting closes soon", postingCloses !== null && postingCloses <= 14 ? 25 : 0, 25, "Posting close date check.");

  const rfpDeadline = daysUntil(input.asOf, input.rfpProfile?.submissionDeadlineAt);
  add("rfp_deadline", "RFP deadline", rfpDeadline !== null && rfpDeadline <= 21 ? 30 : 0, 30, "RFP submission deadline check.");

  const newExecutive = includesAny(text, ["new executive", "new ceo", "new coo", "appointed", "first 90 days"]);
  add("new_executive", "New executive mandate", newExecutive ? 20 : 0, 20, newExecutive ? "A new-executive mandate window is present." : "No new-executive mandate signal.");

  const statedUrgency = input.facts.some(
    (fact) =>
      fact.field === "urgency" &&
      !includesAny(fact.normalizedValue, [
        "regulatory",
        "cms",
        "mandate",
        "deadline",
        "first 90 days",
        "stalled",
        "delayed",
        "fiscal year end",
        "fy end",
        "year-end",
      ]),
  );
  add("stated_urgency", "Stated urgency", statedUrgency ? 15 : 0, 15, statedUrgency ? "Urgency is stated in the source." : "No stated urgency language.");

  const concentratedHiring = includesAny(text, ["concentrated hiring", "3+ related roles", "multiple roles"]);
  add("concentrated_hiring", "Concentrated hiring", concentratedHiring ? 15 : 0, 15, "Concentrated hiring check.");

  const stalled = includesAny(text, ["stalled", "delayed", "at risk", "18 months"]);
  add("stalled_program", "Stalled program", stalled ? 20 : 0, 20, stalled ? "A stalled program is publicly acknowledged." : "No stalled-program signal.");

  const fiscalYearEnd = includesAny(text, ["fiscal year end", "fy end", "year-end"]);
  add("fiscal_year_end", "Fiscal year end", fiscalYearEnd ? 10 : 0, 10, "Fiscal-year-end check.");

  return {
    total: Math.min(100, components.reduce((sum, component) => sum + component.points, 0)),
    components,
  };
}
