export const INITIATIVE_CATEGORIES = [
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
  "post_merger_integration",
  "platform_implementation",
  "other",
] as const;

export type InitiativeCategory = (typeof INITIATIVE_CATEGORIES)[number];

export type OpportunityType = "fte" | "consulting" | "fractional" | "assessment" | "partnership" | "rfp";

export type StakeholderRole =
  | "economic_buyer"
  | "executive_sponsor"
  | "operational_owner"
  | "technical_owner"
  | "hiring_manager"
  | "recruiter"
  | "champion"
  | "influencer"
  | "procurement"
  | "partner"
  | "blocker"
  | "unknown";

const ROLE_MAP: Record<InitiativeCategory, StakeholderRole[]> = {
  prior_authorization: ["operational_owner", "executive_sponsor", "technical_owner", "economic_buyer"],
  utilization_management: ["operational_owner", "economic_buyer", "champion", "technical_owner"],
  interoperability: ["technical_owner", "executive_sponsor", "operational_owner", "procurement"],
  workflow_modernization: ["operational_owner", "champion", "executive_sponsor", "technical_owner"],
  care_management: ["operational_owner", "executive_sponsor", "economic_buyer", "champion"],
  claims_operations: ["operational_owner", "economic_buyer", "technical_owner", "champion"],
  program_recovery: ["executive_sponsor", "operational_owner", "economic_buyer", "blocker"],
  ai_adoption: ["executive_sponsor", "technical_owner", "operational_owner", "procurement"],
  operating_model: ["economic_buyer", "executive_sponsor", "operational_owner", "influencer"],
  regulatory_compliance: ["executive_sponsor", "operational_owner", "technical_owner", "procurement"],
  post_merger_integration: ["executive_sponsor", "operational_owner", "economic_buyer", "technical_owner"],
  platform_implementation: ["operational_owner", "technical_owner", "executive_sponsor", "procurement"],
  other: ["operational_owner", "economic_buyer", "champion", "influencer"],
};

export function suggestStakeholderRoles(category: string | null | undefined, opportunityType?: string | null): StakeholderRole[] {
  const base = ROLE_MAP[isInitiativeCategory(category) ? category : "other"];
  if (opportunityType !== "fte" || base.includes("hiring_manager")) return base;
  return ["hiring_manager", ...base];
}

function isInitiativeCategory(value: string | null | undefined): value is InitiativeCategory {
  return INITIATIVE_CATEGORIES.includes(value as InitiativeCategory);
}
