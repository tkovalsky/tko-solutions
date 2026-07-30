import { TODD_CAPABILITY_PROFILE } from "./capability-profile";
import type {
  OpportunityFactForScoring,
  OpportunityFitScore,
  OpportunityScoreComponent,
} from "./contracts";

export const OPPORTUNITY_SCORE_POLICY_VERSION = "opportunity-fit-v1";

type ScoreOpportunityFitInput = {
  facts: OpportunityFactForScoring[];
  operatorThesis?: string | null;
};

function includesAny(values: string[], terms: readonly string[]): boolean {
  return values.some((value) => terms.some((term) => value.includes(term)));
}

export function scoreOpportunityFit({
  facts,
  operatorThesis,
}: ScoreOpportunityFitInput): OpportunityFitScore {
  const grouped = facts.reduce<Record<string, string[]>>((result, fact) => {
    const values = result[fact.field] ?? [];
    values.push(fact.normalizedValue);
    result[fact.field] = values;
    return result;
  }, {});

  const components: OpportunityScoreComponent[] = [];
  const component = (
    key: string,
    label: string,
    points: number,
    maxPoints: number,
    reason: string,
  ) => {
    components.push({ key, label, points, maxPoints, reason });
  };

  const problems = grouped.business_problem ?? [];
  const transformations = grouped.transformation_language ?? [];
  const responsibilities = grouped.responsibility ?? [];
  const technologies = grouped.technology ?? [];

  const problemAligned =
    includesAny(problems, TODD_CAPABILITY_PROFILE.businessProblems) ||
    includesAny(problems, TODD_CAPABILITY_PROFILE.domains);
  component(
    "business_problem",
    "Funded problem fit",
    problems.length === 0 ? 0 : problemAligned ? 20 : 10,
    20,
    problems.length === 0
      ? "No business problem was stated."
      : problemAligned
        ? "The stated problem aligns with todd-v1."
        : "A problem is stated, but its alignment still needs operator review.",
  );

  const transformationAligned = includesAny(
    transformations,
    TODD_CAPABILITY_PROFILE.transformationLanguage,
  );
  component(
    "transformation",
    "Transformation mandate",
    transformations.length === 0 ? 0 : transformationAligned ? 20 : 10,
    20,
    transformations.length === 0
      ? "No transformation mandate was found."
      : transformationAligned
        ? "The source uses transformation language aligned with todd-v1."
        : "Change language exists, but the mandate is not yet clearly aligned.",
  );

  const responsibilityAligned = includesAny(
    responsibilities,
    TODD_CAPABILITY_PROFILE.responsibilities,
  );
  component(
    "responsibility",
    "Delivery ownership",
    responsibilities.length === 0 ? 0 : responsibilityAligned ? 15 : 8,
    15,
    responsibilities.length === 0
      ? "No accountable outcomes were found."
      : responsibilityAligned
        ? "The opportunity owns delivery work aligned with todd-v1."
        : "Responsibilities exist but need fit review.",
  );

  const technologyAligned = includesAny(technologies, TODD_CAPABILITY_PROFILE.technologies);
  component(
    "technology",
    "Technology alignment",
    technologies.length === 0 ? 0 : technologyAligned ? 10 : 4,
    10,
    technologies.length === 0
      ? "No technology context was found."
      : technologyAligned
        ? "At least one stated technology aligns with todd-v1."
        : "Technology context exists without a known todd-v1 match.",
  );

  component(
    "urgency",
    "Urgency",
    (grouped.urgency?.length ?? 0) > 0 ? 10 : 0,
    10,
    (grouped.urgency?.length ?? 0) > 0
      ? "The source contains a timing or urgency signal."
      : "No timing signal was found.",
  );

  component(
    "reporting_line",
    "Sponsor proximity",
    (grouped.reporting_line?.length ?? 0) > 0 ? 10 : 0,
    10,
    (grouped.reporting_line?.length ?? 0) > 0
      ? "A reporting or sponsorship line is stated."
      : "The sponsor or reporting line is unknown.",
  );

  component(
    "compensation",
    "Economic signal",
    (grouped.compensation?.length ?? 0) > 0 ? 10 : 0,
    10,
    (grouped.compensation?.length ?? 0) > 0
      ? "The source includes compensation or value evidence."
      : "No compensation or engagement value was found.",
  );

  const strongEvidenceCount = facts.filter(
    (fact) => fact.confidence >= 80 || fact.isOperatorOverride,
  ).length;
  component(
    "evidence_strength",
    "Evidence strength",
    strongEvidenceCount >= 4 ? 5 : strongEvidenceCount >= 2 ? 3 : 0,
    5,
    strongEvidenceCount >= 4
      ? "At least four high-confidence or operator-verified facts support the score."
      : "More high-confidence facts are needed.",
  );

  const completenessFields = [
    "reporting_line",
    "business_problem",
    "technology",
    "urgency",
    "responsibility",
    "compensation",
    "transformation_language",
  ];
  const completeCount = completenessFields.filter(
    (field) => (grouped[field]?.length ?? 0) > 0,
  ).length;

  return {
    total: components.reduce((sum, item) => sum + item.points, 0),
    completeness: Math.round((completeCount / completenessFields.length) * 100),
    scorePolicyVersion: OPPORTUNITY_SCORE_POLICY_VERSION,
    capabilityProfileVersion: TODD_CAPABILITY_PROFILE.version,
    components,
    inputSnapshot: {
      fields: Object.fromEntries(
        Object.entries(grouped).map(([field, values]) => [field, [...new Set(values)].sort()]),
      ),
      operatorThesisPresent: Boolean(operatorThesis?.trim()),
    },
  };
}
