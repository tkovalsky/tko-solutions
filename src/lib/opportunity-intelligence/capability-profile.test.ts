import { describe, expect, it } from "vitest";
import {
  TODD_CAPABILITY_PROFILE,
  TODD_CAPABILITY_PROFILE_V1,
  TODD_CAPABILITY_PROFILE_V2,
} from "./capability-profile";

const TODD_V1_SNAPSHOT = {
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

describe("Todd capability profiles", () => {
  it("keeps todd-v1 byte-identical and available through the historical export", () => {
    expect(JSON.stringify(TODD_CAPABILITY_PROFILE_V1)).toBe(
      JSON.stringify(TODD_V1_SNAPSHOT),
    );
    expect(TODD_CAPABILITY_PROFILE).toBe(TODD_CAPABILITY_PROFILE_V1);
  });

  it("exports todd-v2 as a domain superset with operating thresholds", () => {
    expect(TODD_CAPABILITY_PROFILE_V2.version).toBe("todd-v2");
    expect(
      TODD_CAPABILITY_PROFILE_V1.domains.every((domain) =>
        TODD_CAPABILITY_PROFILE_V2.domains.includes(domain),
      ),
    ).toBe(true);
    expect(TODD_CAPABILITY_PROFILE_V2.thresholds.fteCompFloor).toBe(225_000);
    expect(TODD_CAPABILITY_PROFILE_V2.thresholds.targetAnnualIncome).toBe(300_000);
  });
});
