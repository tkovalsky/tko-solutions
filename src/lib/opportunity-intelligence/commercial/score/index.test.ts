import { describe, expect, it } from "vitest";
import { TODD_CAPABILITY_PROFILE_V2 } from "../../capability-profile";
import type { OpportunityFactForScoring } from "../../contracts";
import { disqualifyOpportunity } from "./disqualify";
import { scoreOpportunity, type ScoreInput, type StakeholderScoreInput } from ".";
import { estimateValue } from "./value";

const AS_OF = new Date("2026-08-01T12:00:00Z");

function fact(field: string, value: string): OpportunityFactForScoring {
  return {
    field,
    value,
    normalizedValue: value.toLowerCase(),
    basis: "stated",
    confidence: 90,
    isOperatorOverride: false,
  };
}

const baseInput: ScoreInput = {
  opportunity: { type: "assessment", status: "identified" },
  facts: [],
  initiative: null,
  stakeholders: [],
  sources: [],
  researchGaps: [],
  offer: null,
  roleProfile: null,
  rfpProfile: null,
  profile: TODD_CAPABILITY_PROFILE_V2,
  organization: { tier: 1 },
  asOf: AS_OF,
};

function input(overrides: Partial<ScoreInput>): ScoreInput {
  return {
    ...baseInput,
    ...overrides,
    opportunity: { ...baseInput.opportunity, ...overrides.opportunity },
  };
}

function fitFacts(kind: "perfect" | "warm" | "moderate" | "partner") {
  if (kind === "perfect") {
    return [
      fact("business_problem", "Prior authorization operational recovery"),
      fact("transformation_language", "Modernization and program recovery"),
      fact("responsibility", "Own and deliver implementation"),
      fact("domain", "Healthcare payer"),
      fact("technology", "FHIR"),
      fact("urgency", "CMS regulatory deadline first 90 days"),
      fact("seniority_scope", "Director with executive access"),
    ];
  }
  if (kind === "warm") {
    return [
      fact("business_problem", "Care management platform delayed"),
      fact("transformation_language", "Program recovery"),
      fact("responsibility", "Own delivery"),
      fact("domain", "Regional payer"),
      fact("technology", "Unknown platform"),
      fact("urgency", "Stalled program"),
      fact("seniority_scope", "VP Operations"),
    ];
  }
  if (kind === "moderate") {
    return [
      fact("business_problem", "Workflow issue"),
      fact("transformation_language", "Change effort"),
      fact("responsibility", "Responsibilities present"),
      fact("domain", "Healthcare"),
      fact("technology", "Unmatched tool"),
      fact("seniority_scope", "Manager scope"),
    ];
  }
  return [
    fact("business_problem", "Workflow transformation specialists"),
    fact("transformation_language", "Transformation"),
    fact("responsibility", "Deliver implementation"),
    fact("domain", "Insurance operations"),
    fact("technology", "FHIR"),
    fact("seniority_scope", "Manager scope"),
  ];
}

function source(daysOld: number, isPrimary = true) {
  return {
    isPrimary,
    publishedAt: new Date(AS_OF.getTime() - daysOld * 86_400_000),
    retrievedAt: AS_OF,
  };
}

function stakeholder38(): StakeholderScoreInput {
  return {
    role: "unknown",
    relationshipType: "cold",
    roleEvidenceUrl: null,
    roleConfidence: 80,
    person: {
      seniority: "c_suite",
      budgetAuthority: 2,
      hiringAuthority: 2,
      transformationRelevance: 2,
      relationshipStrength: 1,
      sourceConfidence: 1,
      contactPoints: [],
    },
  };
}

function stakeholder45(): StakeholderScoreInput {
  return {
    role: "influencer",
    relationshipType: "cold",
    roleEvidenceUrl: null,
    roleConfidence: 80,
    person: {
      seniority: "vice_president",
      budgetAuthority: 2,
      hiringAuthority: 2,
      transformationRelevance: 3,
      relationshipStrength: 1,
      sourceConfidence: 1,
      contactPoints: [],
    },
  };
}

function assertScore(result: ReturnType<typeof scoreOpportunity>, expected: Record<string, number>) {
  expect(result.fitScore).toBe(expected.fit);
  expect(result.evidenceScore).toBe(expected.evid);
  expect(result.accessScore).toBe(expected.access);
  expect(result.urgencyScore).toBe(expected.urg);
  expect(result.estimatedValue).toBe(expected.value);
  expect(result.conversionProbability).toBe(expected.prob);
  expect(result.expectedValue).toBe(expected.ev);
  expect(result.estimatedHours).toBe(expected.hours);
  expect(result.priorityEfficiency).toBe(expected.pe);
}

describe("scoreOpportunity golden fixtures", () => {
  const fixtures = [
    {
      id: "14.1",
      score: scoreOpportunity(
        input({
          opportunity: { type: "assessment" },
          facts: fitFacts("perfect"),
          initiative: { status: "evidenced", approvedAt: AS_OF },
          sources: [source(2)],
          researchGaps: [{ status: "open", blocksOutreach: true }],
          roleProfile: { applicationUrl: "https://example.com" },
          offer: { valueLow: 6_500, valueHigh: 6_500, expansionProbability: 0.45, followOnValue: 75_000 },
        }),
      ),
      expected: { fit: 100, evid: 65, access: 0, urg: 50, value: 40_250, prob: 14, ev: 5_635, hours: 6, pe: 939 },
    },
    {
      id: "14.2",
      score: scoreOpportunity(
        input({
          opportunity: { type: "consulting" },
          facts: fitFacts("warm"),
          initiative: { status: "evidenced", approvedAt: AS_OF, lastEvidenceAt: new Date("2026-07-01T12:00:00Z") },
          sources: [source(2)],
          stakeholders: [
            {
              ...stakeholder45(),
              role: "operational_owner",
              isSelected: true,
              roleEvidenceUrl: "https://example.com/person",
              relationshipType: "warm_history",
              person: {
                seniority: "vice_president",
                budgetAuthority: 2,
                hiringAuthority: 2,
                transformationRelevance: 3,
                relationshipStrength: 2,
                sourceConfidence: 2,
                contactPoints: [{ status: "active", provenance: "publicly_listed" }],
              },
            },
          ],
        }),
      ),
      expected: { fit: 94, evid: 90, access: 82, urg: 20, value: 54_000, prob: 60, ev: 32_400, hours: 6.4, pe: 5_063 },
    },
    {
      id: "14.3",
      score: scoreOpportunity(
        input({
          opportunity: { type: "assessment" },
          facts: [...fitFacts("moderate"), fact("urgency", "General timing signal")],
          initiative: { status: "evidenced", approvedAt: AS_OF },
          sources: [source(45)],
          researchGaps: [{ status: "open", blocksOutreach: true }],
          stakeholders: [stakeholder38()],
          offer: { valueLow: 6_500, valueHigh: 6_500, expansionProbability: 0.4, followOnValue: 60_000 },
        }),
      ),
      expected: { fit: 62, evid: 55, access: 38, urg: 15, value: 30_500, prob: 22, ev: 6_710, hours: 6, pe: 1_118 },
    },
    {
      id: "14.4",
      score: scoreOpportunity(
        input({
          opportunity: { type: "partnership" },
          facts: [...fitFacts("partner"), fact("urgency", "Fiscal year end")],
          sources: [source(2)],
          stakeholders: [stakeholder45()],
        }),
      ),
      expected: { fit: 78, evid: 60, access: 45, urg: 10, value: 37_000, prob: 18, ev: 6_660, hours: 6.5, pe: 1_025 },
    },
    {
      id: "14.5",
      score: scoreOpportunity(
        input({
          opportunity: { type: "rfp" },
          rfpProfile: { contractValue: 2_400_000, contractYears: 3, biddingRole: "sub", incumbentIdentified: true, canQualify: true },
          roleProfile: { applicationUrl: "https://example.com/rfp" },
        }),
      ),
      expected: { fit: 0, evid: 10, access: 0, urg: 0, value: 400_000, prob: 6, ev: 24_000, hours: 13, pe: 1_846 },
    },
  ];

  it("reproduces every authoritative §14.6 number exactly", () => {
    for (const fixture of fixtures) {
      assertScore(fixture.score, fixture.expected);
    }
  });

  it("verifies assessment expansion arithmetic", () => {
    expect(
      estimateValue({
        opportunity: { type: "assessment" },
        offer: { valueLow: 6_500, valueHigh: 6_500, expansionProbability: 0.4, followOnValue: 60_000 },
        rfpProfile: null,
      }),
    ).toBe(30_500);
  });

  it("is deterministic across repeated runs", () => {
    const fixtureInput = input({
      opportunity: { type: "assessment" },
      facts: fitFacts("perfect"),
      initiative: { status: "evidenced", approvedAt: AS_OF },
      sources: [source(2)],
      researchGaps: [{ status: "open", blocksOutreach: true }],
      roleProfile: { applicationUrl: "https://example.com" },
      offer: { valueLow: 6_500, valueHigh: 6_500, expansionProbability: 0.45, followOnValue: 75_000 },
    });
    const first = JSON.stringify(scoreOpportunity(fixtureInput));
    for (let index = 0; index < 100; index += 1) {
      expect(JSON.stringify(scoreOpportunity(fixtureInput))).toBe(first);
    }
  });

  it("sorts the fixtures by the authoritative PE ordering", () => {
    expect(
      [...fixtures]
        .sort((left, right) => (right.score.priorityEfficiency ?? 0) - (left.score.priorityEfficiency ?? 0))
        .map((fixture) => fixture.id),
    ).toEqual(["14.2", "14.5", "14.3", "14.4", "14.1"]);
  });
});

describe("disqualifyOpportunity", () => {
  it.each([
    ["DQ_COMP_FLOOR", { opportunity: { type: "fte", estimatedValueHigh: 210_000 } }],
    ["DQ_SENIORITY", { opportunity: { type: "fte" }, roleProfile: { seniorityBand: "manager" } }],
    ["DQ_ONSITE_REQUIRED", { opportunity: { type: "fte" }, roleProfile: { remoteCompatible: false } }],
    ["DQ_DO_NOT_CONTACT", { opportunity: { type: "consulting" }, stakeholders: [{ person: { doNotContact: true } }] }],
    ["DQ_RFP_DEADLINE", { opportunity: { type: "rfp" }, rfpProfile: { submissionDeadlineAt: new Date("2026-08-04T12:00:00Z") } }],
    ["DQ_RFP_CANNOT_QUALIFY", { opportunity: { type: "rfp" }, rfpProfile: { canQualify: false } }],
    ["DQ_RFP_MANDATORY_CONF_MISSED", { opportunity: { type: "rfp" }, rfpProfile: { mandatoryConferenceMissed: true } }],
    ["DQ_STALE_POSTING", { opportunity: { type: "fte" }, roleProfile: { postingIsOpen: false } }],
    ["DQ_VALUE_FLOOR", { opportunity: { type: "consulting", estimatedValueHigh: 4_000 } }],
    ["DQ_NO_ACCESS_PATH", { opportunity: { type: "assessment" } }],
    ["DQ_OUT_OF_SCOPE", { opportunity: { type: "assessment" }, organization: { tier: 3 }, fitScore: 30 }],
  ])("fires %s in isolation", (rule, overrides) => {
    expect(disqualifyOpportunity({ asOf: AS_OF, ...overrides }).rules).toContain(rule);
  });

  it("caps probability at 60%", () => {
    const result = scoreOpportunity(
      input({
        opportunity: { type: "consulting" },
        facts: fitFacts("warm"),
        initiative: { status: "evidenced", approvedAt: AS_OF },
        sources: [source(2)],
        stakeholders: [
          {
            ...stakeholder45(),
            relationshipType: "existing_client",
            person: {
              seniority: "senior_vice_president",
              budgetAuthority: 3,
              hiringAuthority: 3,
              transformationRelevance: 3,
              relationshipStrength: 3,
              sourceConfidence: 3,
              contactPoints: [{ status: "active", provenance: "verified_deliverable" }],
            },
          },
        ],
      }),
    );

    expect(result.conversionProbability).toBe(60);
  });

  it("wires access multipliers into score components and caps combined contribution", () => {
    const result = scoreOpportunity(
      input({
        opportunity: { type: "consulting" },
        facts: fitFacts("warm"),
        initiative: { status: "evidenced", approvedAt: AS_OF },
        sources: [source(2)],
        stakeholders: [
          {
            role: "economic_buyer",
            relationshipType: "warm_history",
            isSelected: true,
            roleEvidenceUrl: "https://example.com/person",
            roleConfidence: 100,
            person: {
              seniority: "senior_vice_president",
              budgetAuthority: 3,
              hiringAuthority: 3,
              transformationRelevance: 3,
              relationshipStrength: 3,
              sourceConfidence: 3,
              contactPoints: [{ status: "active", provenance: "publicly_listed" }],
            },
          },
        ],
      }),
    );

    expect(result.accessScore).toBe(100);
    expect(result.conversionProbability).toBe(60);
    expect(result.components).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "access.warm_history_multiplier", reason: expect.stringContaining("x2.5") }),
        expect.objectContaining({ key: "access.high_access_multiplier", reason: expect.stringContaining("x1.4") }),
        expect.objectContaining({ key: "access.probability_cap", reason: expect.stringContaining("60%") }),
      ]),
    );
  });

  it("computes accessScore as the max across opportunity stakeholders", () => {
    const result = scoreOpportunity(input({ stakeholders: [stakeholder38(), stakeholder45()] }));

    expect(result.accessScore).toBe(45);
  });
});
