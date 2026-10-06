import { describe, expect, it } from "vitest";
import {
  evaluateAuthorization,
  syntheticAuthorizationScenarios,
  type AuthorizationAssessmentInput,
} from "@/lib/healthcare-policy-execution";

function scenario(id: string): AuthorizationAssessmentInput {
  const found = syntheticAuthorizationScenarios.find((item) => item.scenarioId === id);
  if (!found) throw new Error(`Missing scenario: ${id}`);
  return found;
}

describe("synthetic healthcare policy execution", () => {
  it("explains a provider waiver separately from policy when notification is not required", () => {
    const result = evaluateAuthorization({
      ...scenario("qualified-provider-notification"),
      advanceNotificationRequired: false,
    });

    expect(result.disposition).toBe("PA_WAIVED");
    expect(result.claimsArtifact).toBe("NO_AUTHORIZATION_ARTIFACT");
    expect(result.summary).toContain("Plan policy requires prior authorization");
    expect(result.summary).toContain("provider qualification waives clinical review");
  });

  it("keeps a claims control when qualified-provider review is waived", () => {
    const result = evaluateAuthorization(scenario("qualified-provider-notification"));

    expect(result.disposition).toBe("PA_WAIVED");
    expect(result.reviewRoute).toBe("no_clinical_review");
    expect(result.claimsArtifact).toBe("ADVANCE_NOTIFICATION_RECORD");
    expect(result.trace.map((step) => step.authority)).toEqual([
      "Member and eligibility",
      "Benefit coverage",
      "Procedure policy",
      "Procedure policy",
      "Provider program",
      "Claims control",
    ]);
  });

  it("routes a non-qualified specialty service to delegated review", () => {
    const result = evaluateAuthorization(scenario("standard-specialty-review"));

    expect(result.disposition).toBe("PA_REQUIRED");
    expect(result.reviewRoute).toBe("delegated_specialty");
    expect(result.claimsArtifact).toBe("PRIOR_AUTHORIZATION_RECORD");
  });

  it("models rural access separately from performance qualification", () => {
    const result = evaluateAuthorization(scenario("rural-access-notification"));

    expect(result.disposition).toBe("PA_WAIVED");
    expect(result.trace.find((step) => step.authority === "Provider program")?.finding)
      .toContain("Rural access qualification");
  });

  it("does not turn a no-authorization policy into a provider waiver", () => {
    const result = evaluateAuthorization(scenario("policy-no-authorization"));

    expect(result.disposition).toBe("PA_NOT_REQUIRED");
    expect(result.trace.some((step) => step.authority === "Provider program")).toBe(false);
    expect(result.claimsArtifact).toBe("NO_AUTHORIZATION_ARTIFACT");
  });

  it("fails closed when an effective policy cannot be resolved", () => {
    const result = evaluateAuthorization(scenario("unresolved-policy"));

    expect(result.disposition).toBe("UNRESOLVED");
    expect(result.reviewRoute).toBe("resolve_inputs");
    expect(result.unresolvedFacts).toContain(
      "Resolve the effective policy version for the plan, service, and date.",
    );
    expect(result.claimsArtifact).toBe("NOT_DETERMINED");
  });

  it("fails closed before authorization logic when eligibility or coverage is unresolved", () => {
    const input = {
      ...scenario("qualified-provider-notification"),
      memberEligible: false,
      benefitCovered: false,
    };
    const result = evaluateAuthorization(input);

    expect(result.disposition).toBe("UNRESOLVED");
    expect(result.unresolvedFacts).toHaveLength(2);
    expect(result.trace.at(-1)?.finding).toContain("fails closed");
  });

  it("requires an exact provider TIN match before applying a waiver", () => {
    const input = {
      ...scenario("qualified-provider-notification"),
      providerTinMatches: false,
    };
    const result = evaluateAuthorization(input);

    expect(result.disposition).toBe("PA_REQUIRED");
    expect(result.trace.find((step) => step.authority === "Provider program")?.finding)
      .toContain("TIN does not match");
  });
});
