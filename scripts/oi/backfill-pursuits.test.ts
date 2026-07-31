import { describe, expect, it } from "vitest";
import {
  deriveAuthorityLevel,
  mapEmailProvenance,
  mapPursuitModeToOpportunityType,
  mapPursuitStatusToOpportunityStatus,
  migratedOpportunityTitle,
} from "./backfill-pursuits.mjs";

describe("backfill-pursuits mapping", () => {
  it("maps pursuit modes to opportunity types", () => {
    expect(mapPursuitModeToOpportunityType("employment")).toBe("fte");
    expect(mapPursuitModeToOpportunityType("consulting")).toBe("consulting");
    expect(mapPursuitModeToOpportunityType("both")).toBe("consulting");
  });

  it("maps pursuit statuses to opportunity statuses", () => {
    expect(mapPursuitStatusToOpportunityStatus("prospect")).toBe("reviewing");
    expect(mapPursuitStatusToOpportunityStatus("research_ready")).toBe("researching");
    expect(mapPursuitStatusToOpportunityStatus("contact_ready")).toBe("outreach_ready");
    expect(mapPursuitStatusToOpportunityStatus("contacted")).toBe("contacted");
    expect(mapPursuitStatusToOpportunityStatus("conversation")).toBe("conversation");
    expect(mapPursuitStatusToOpportunityStatus("paused")).toBe("paused");
    expect(mapPursuitStatusToOpportunityStatus("closed")).toBe("closed");
  });

  it("derives stakeholder authority from the strongest person authority input", () => {
    expect(deriveAuthorityLevel(3, 0)).toBe("high");
    expect(deriveAuthorityLevel(1, 2)).toBe("medium");
    expect(deriveAuthorityLevel(1, 0)).toBe("low");
    expect(deriveAuthorityLevel(0, 0)).toBe("none");
  });

  it("uses valid contact provenance values", () => {
    expect(mapEmailProvenance("publicly_listed")).toBe("publicly_listed");
    expect(mapEmailProvenance("operator note")).toBe("pattern_inferred");
  });

  it("marks migrated opportunity titles deterministically", () => {
    expect(migratedOpportunityTitle("Jane Doe", "consulting")).toBe(
      "Jane Doe - consulting pursuit (migrated)",
    );
  });
});
