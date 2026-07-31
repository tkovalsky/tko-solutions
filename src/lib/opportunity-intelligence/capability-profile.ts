export type ToddCapabilityProfile = {
  version: "todd-v1";
  domains: readonly string[];
  businessProblems: readonly string[];
  technologies: readonly string[];
  transformationLanguage: readonly string[];
  responsibilities: readonly string[];
};

// Slice A1 keeps the single-operator profile versioned and reviewable in code.
export const TODD_CAPABILITY_PROFILE: ToddCapabilityProfile = {
  version: "todd-v1",
  domains: [
    "healthcare",
    "payer",
    "health plan",
    "prior authorization",
    "utilization management",
    "health tech",
    "clinical",
  ],
  businessProblems: [
    "operational recovery",
    "workflow",
    "turnaround",
    "cost",
    "quality",
    "access",
    "scale",
    "implementation",
    "delivery",
    "operating model",
  ],
  technologies: [
    "ai",
    "aws",
    "azure",
    "databricks",
    "epic",
    "fhir",
    "google cloud",
    "hl7",
    "machine learning",
    "oracle",
    "python",
    "salesforce",
    "sap",
    "servicenow",
    "snowflake",
    "sql",
    "workday",
  ],
  transformationLanguage: [
    "enterprise change",
    "modernization",
    "operating model",
    "program recovery",
    "transformation",
    "turnaround",
  ],
  responsibilities: [
    "build",
    "deliver",
    "drive",
    "implement",
    "lead",
    "manage",
    "own",
    "oversee",
    "recover",
    "scale",
  ],
};

export const TODD_CAPABILITY_PROFILE_V1 = TODD_CAPABILITY_PROFILE;

export const TODD_CAPABILITY_PROFILE_V2 = {
  version: "todd-v2",
  domains: [
    ...TODD_CAPABILITY_PROFILE_V1.domains,
    "care management",
    "claims",
    "interoperability",
    "medicaid",
    "medicare",
    "provider operations",
    "revenue cycle",
    "population health",
    "regulated operations",
    "financial services",
  ],
  businessProblems: [
    ...TODD_CAPABILITY_PROFILE_V1.businessProblems,
    "administrative burden",
    "denial",
    "turnaround time",
    "governance",
    "decision rights",
    "program recovery",
    "stalled",
    "delayed",
    "at risk",
    "exception handling",
    "manual process",
    "handoff",
    "escalation",
  ],
  transformationLanguage: [
    ...TODD_CAPABILITY_PROFILE_V1.transformationLanguage,
    "remediation",
    "stabilization",
    "digital transformation",
    "workflow redesign",
  ],
  responsibilities: [
    ...TODD_CAPABILITY_PROFILE_V1.responsibilities,
    "govern",
    "stand up",
    "turn around",
  ],
  technologies: TODD_CAPABILITY_PROFILE_V1.technologies,
  thresholds: {
    fteCompFloor: 225_000,
    consultingMonthlyFloor: 20_000,
    targetAnnualIncome: 300_000,
    minFitScore: 45,
    minEvidenceForOutreach: 50,
  },
} as const;
