import { TODD_CAPABILITY_PROFILE_V2 } from "../../capability-profile";
import type {
  OpportunityFactForScoring,
  OpportunityFitScore,
  OpportunityScoreComponent,
} from "../../contracts";

export const OPPORTUNITY_SCORE_POLICY_VERSION = "pois-v1";

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
  const domains = [...(grouped.domain ?? []), ...(grouped.business_problem ?? [])];
  const technologies = grouped.technology ?? [];
  const senioritySignals = [...(grouped.seniority_scope ?? []), ...(grouped.opportunity_title ?? [])];

  const problemAligned =
    includesAny(problems, TODD_CAPABILITY_PROFILE_V2.businessProblems) ||
    includesAny(problems, TODD_CAPABILITY_PROFILE_V2.domains);
  component(
    "business_problem",
    "Funded problem fit",
    problems.length === 0 ? 0 : problemAligned ? 20 : 10,
    20,
    problems.length === 0
      ? "No business problem was stated."
      : problemAligned
        ? "The stated problem aligns with todd-v2."
        : "A problem is stated, but its alignment still needs operator review.",
  );

  const transformationAligned = includesAny(
    transformations,
    TODD_CAPABILITY_PROFILE_V2.transformationLanguage,
  );
  component(
    "transformation",
    "Transformation mandate",
    transformations.length === 0 ? 0 : transformationAligned ? 20 : 10,
    20,
    transformations.length === 0
      ? "No transformation mandate was found."
      : transformationAligned
        ? "The source uses transformation language aligned with todd-v2."
        : "Change language exists, but the mandate is not yet clearly aligned.",
  );

  const responsibilityAligned = includesAny(
    responsibilities,
    TODD_CAPABILITY_PROFILE_V2.responsibilities,
  );
  component(
    "responsibility",
    "Delivery ownership",
    responsibilities.length === 0 ? 0 : responsibilityAligned ? 15 : 8,
    15,
    responsibilities.length === 0
      ? "No accountable outcomes were found."
      : responsibilityAligned
        ? "The opportunity owns delivery work aligned with todd-v2."
        : "Responsibilities exist but need fit review.",
  );

  const domainAligned = includesAny(domains, TODD_CAPABILITY_PROFILE_V2.domains);
  const adjacentDomain = includesAny(domains, [
    "regulated operations",
    "financial services",
    "insurance",
  ]);
  component(
    "domain",
    "Domain fit",
    domains.length === 0 ? 0 : domainAligned ? 15 : adjacentDomain ? 8 : 0,
    15,
    domains.length === 0
      ? "No domain context was found."
      : domainAligned
        ? "The source confirms a todd-v2 healthcare or regulated-operations domain."
        : adjacentDomain
          ? "The source is adjacent to Todd's regulated-operations focus."
          : "The domain is not yet aligned.",
  );

  const technologyAligned = includesAny(technologies, TODD_CAPABILITY_PROFILE_V2.technologies);
  component(
    "technology",
    "Technology alignment",
    technologies.length === 0 ? 0 : technologyAligned ? 10 : 4,
    10,
    technologies.length === 0
      ? "No technology context was found."
      : technologyAligned
        ? "At least one stated technology aligns with todd-v2."
        : "Technology context exists without a known todd-v2 match.",
  );

  component(
    "urgency",
    "Urgency",
    includesAny(grouped.urgency ?? [], [
      "regulatory",
      "cms",
      "deadline",
      "first 90 days",
      "stalled",
      "delayed",
      "at risk",
    ])
      ? 10
      : 0,
    10,
    includesAny(grouped.urgency ?? [], [
      "regulatory",
      "cms",
      "deadline",
      "first 90 days",
      "stalled",
      "delayed",
      "at risk",
    ])
      ? "The source contains a concrete timing or urgency signal."
      : "No concrete timing signal was found.",
  );

  const hasDirectorScope = includesAny(senioritySignals, [
    "director",
    "vice president",
    "vp",
    "svp",
    "chief",
    "c-suite",
    "executive",
  ]);
  const hasManagerScope = includesAny(senioritySignals, ["manager", "lead"]);
  component(
    "seniority_scope",
    "Seniority scope",
    senioritySignals.length === 0 ? 0 : hasDirectorScope ? 10 : hasManagerScope ? 5 : 0,
    10,
    senioritySignals.length === 0
      ? "No seniority or executive-access signal was found."
      : hasDirectorScope
        ? "The opportunity indicates Director+ scope or executive access."
        : hasManagerScope
          ? "The opportunity indicates manager-level scope."
          : "The seniority scope is below the current fit threshold.",
  );

  const completenessFields = [
    "business_problem",
    "domain",
    "technology",
    "urgency",
    "seniority_scope",
    "responsibility",
    "transformation_language",
  ];
  const completeCount = completenessFields.filter(
    (field) => (grouped[field]?.length ?? 0) > 0,
  ).length;

  return {
    total: components.reduce((sum, item) => sum + item.points, 0),
    completeness: Math.round((completeCount / completenessFields.length) * 100),
    scorePolicyVersion: OPPORTUNITY_SCORE_POLICY_VERSION,
    capabilityProfileVersion: TODD_CAPABILITY_PROFILE_V2.version,
    components,
    inputSnapshot: {
      fields: Object.fromEntries(
        Object.entries(grouped).map(([field, values]) => [field, [...new Set(values)].sort()]),
      ),
      operatorThesisPresent: Boolean(operatorThesis?.trim()),
    },
  };
}
