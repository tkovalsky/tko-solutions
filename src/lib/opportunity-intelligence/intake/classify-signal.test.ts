import { describe, expect, it } from "vitest";
import { classifySignal } from "./classify-signal";

const ALL_SIGNAL_FIXTURES = [
  ["job_posting", "Director, Prior Authorization Transformation", "senior_role_posting", "tier_1"],
  ["job_posting", "Domain role for FHIR workflow lead", "domain_role_posting", "tier_2"],
  ["company_announcement", "RFP 2026-44 for utilization management", "rfp_published", "tier_1"],
  ["company_announcement", "Jane Smith appointed chief operating officer", "leadership_appointment", "tier_2"],
  ["company_announcement", "Chief information officer resigned", "leadership_departure", "tier_2"],
  ["company_announcement", "Multiple roles expanding the prior authorization team", "concentrated_hiring", "tier_2"],
  ["company_announcement", "Claims backlog problem and access challenge", "stated_operational_problem", "tier_1"],
  ["company_announcement", "Enterprise operating model transformation announced", "transformation_announcement", "tier_2"],
  ["company_announcement", "Stalled implementation needs program recovery", "stalled_program", "tier_1"],
  ["company_announcement", "Merger integration update", "acquisition_merger", "tier_3"],
  ["company_announcement", "Series B funding round", "funding_round", "tier_3"],
  ["company_announcement", "Vendor selected for platform implementation", "vendor_selection", "tier_2"],
  ["company_announcement", "Quarterly earnings statement", "earnings_statement", "tier_3"],
  ["regulatory_event", "CMS final rule deadline for compliance", "regulatory_deadline", "tier_1"],
  ["company_announcement", "Digital technology modernization program", "technology_modernization", "tier_2"],
  ["company_announcement", "Partnership announcement with regional plan", "partnership_announcement", "tier_3"],
  ["company_announcement", "Conference presentation on care management", "conference_presentation", "tier_3"],
  ["company_announcement", "Replacing vendor and switching partner", "partner_change", "tier_2"],
  ["other", "General market news", "general_news", "tier_3"],
  ["pasted_text", "Operator note", "operator_note", "tier_3"],
  ["referral", "Warm referral from prior executive", "referral", "tier_2"],
] as const;

describe("classifySignal", () => {
  it.each(ALL_SIGNAL_FIXTURES)("maps %s %s to %s / %s", (sourceType, rawContent, signalType, tier) => {
    const result = classifySignal({
      sourceType,
      rawContent,
      occurredAt: new Date(),
    });

    expect(result.signalType).toBe(signalType);
    expect(result.tier).toBe(tier);
  });

  it("applies each strength modifier in isolation", () => {
    const base = classifySignal({
      sourceType: "company_announcement",
      rawContent: "Solicitation notice",
      occurredAt: daysAgo(91),
    }).strength;

    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice",
        occurredAt: new Date(),
      }).strength - base,
    ).toBe(25);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice for prior authorization FHIR",
        occurredAt: daysAgo(91),
      }).strength - base,
    ).toBe(12);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice for prior authorization",
        occurredAt: daysAgo(91),
      }).strength - base,
    ).toBe(6);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice",
        occurredAt: daysAgo(91),
        facts: [{ field: "business_problem", value: "backlog" }],
      }).strength - base,
    ).toBe(10);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice from chief operating officer",
        occurredAt: daysAgo(91),
      }).strength - base,
    ).toBe(8);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "CMS rule deadline for solicitation",
        occurredAt: daysAgo(91),
        facts: [{ field: "urgency", value: "deadline" }],
      }).strength -
        classifySignal({
          sourceType: "company_announcement",
          rawContent: "CMS rule deadline for solicitation",
          occurredAt: daysAgo(91),
        }).strength,
    ).toBe(10);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice",
        occurredAt: daysAgo(91),
        organization: { isWatched: true },
      }).strength - base,
    ).toBe(5);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice",
        occurredAt: daysAgo(91),
        organization: { tier: 1 },
      }).strength - base,
    ).toBe(8);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "Solicitation notice",
        occurredAt: daysAgo(91),
        canonicalUrl: "https://jobs.example.com/123",
        organization: { domain: "company.com" },
      }).strength - base,
    ).toBe(-5);
  });

  it("handles recency boundaries at 7, 30, and 90 days", () => {
    expect(strengthAtAge(7)).toBe(75);
    expect(strengthAtAge(8)).toBe(68);
    expect(strengthAtAge(30)).toBe(68);
    expect(strengthAtAge(31)).toBe(60);
    expect(strengthAtAge(90)).toBe(60);
    expect(strengthAtAge(91)).toBe(50);
  });

  it("clamps strength at both ends", () => {
    expect(
      classifySignal({
        sourceType: "regulatory_event",
        rawContent:
          "CMS final rule deadline names the chief operating officer and prior authorization FHIR program problem.",
        occurredAt: new Date(),
        facts: [
          { field: "business_problem", value: "problem" },
          { field: "urgency", value: "CMS deadline" },
        ],
        organization: { tier: 1, isWatched: true },
      }).strength,
    ).toBe(100);
    expect(
      classifySignal({
        sourceType: "company_announcement",
        rawContent: "General update",
        occurredAt: daysAgo(91),
        canonicalUrl: "https://news.example.com/post",
        organization: { domain: "company.com" },
      }).strength,
    ).toBe(0);
  });
});

function strengthAtAge(days: number) {
  return classifySignal({
    sourceType: "company_announcement",
    rawContent: "Solicitation notice",
    occurredAt: daysAgo(days),
  }).strength;
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000);
}
