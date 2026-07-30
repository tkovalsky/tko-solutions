export const OPPORTUNITY_FACT_FIELDS = [
  "opportunity_title",
  "reporting_line",
  "business_problem",
  "technology",
  "urgency",
  "responsibility",
  "compensation",
  "transformation_language",
] as const;

export type OpportunityFactField = (typeof OPPORTUNITY_FACT_FIELDS)[number];

export type FactBasis = "stated" | "inferred" | "operator";

export type ExtractedOpportunityFact = {
  field: OpportunityFactField;
  value: string;
  normalizedValue: string;
  ordinal: number;
  basis: Exclude<FactBasis, "operator">;
  confidence: number;
  startOffset: number;
  endOffset: number;
  excerpt: string;
};

export type ResearchGapCandidate = {
  gapKey: string;
  question: string;
  reason: string;
};

export type OpportunityExtraction = {
  facts: ExtractedOpportunityFact[];
  researchGaps: ResearchGapCandidate[];
};

export type OpportunityFactForScoring = {
  field: string;
  value: string;
  normalizedValue: string;
  basis: FactBasis;
  confidence: number;
  isOperatorOverride: boolean;
};

export type OpportunityScoreComponent = {
  key: string;
  label: string;
  points: number;
  maxPoints: number;
  reason: string;
};

export type OpportunityFitScore = {
  total: number;
  completeness: number;
  scorePolicyVersion: string;
  capabilityProfileVersion: string;
  components: OpportunityScoreComponent[];
  inputSnapshot: {
    fields: Record<string, string[]>;
    operatorThesisPresent: boolean;
  };
};
