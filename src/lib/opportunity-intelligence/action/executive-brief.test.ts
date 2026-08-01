import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { assembleExecutiveBrief, EXECUTIVE_BRIEF_SECTION_KEYS } from "./executive-brief";

describe("assembleExecutiveBrief", () => {
  it("maps all 13 sections to existing source data and prompts for empty sections", () => {
    const brief = assembleExecutiveBrief(personFixture());

    expect(Object.keys(brief.sections)).toEqual([...EXECUTIVE_BRIEF_SECTION_KEYS]);
    expect(brief.sections.career.items[0]).toEqual(expect.objectContaining({ text: "VP Operations at Regional Payer Health", basis: "stated", confidence: 95 }));
    expect(brief.sections.responsibilities.items[0].text).toBe("Owns care platform delivery");
    expect(brief.sections.recentAnnouncements.items[0].text).toBe("Platform rollout delayed 18 months");
    expect(brief.sections.knownInitiatives.items[0].text).toContain("Care management platform recovery");
    expect(brief.sections.likelyPriorities.items[0]).toEqual(expect.objectContaining({ basis: "inferred" }));
    expect(brief.sections.likelyKpis.items[0].text).toBe("Time-to-milestone");
    expect(brief.sections.publicInterviews.isEmpty).toBe(true);
    expect(brief.sections.publicInterviews.gapPrompt).toMatch(/trade press/);
    expect(brief.sections.conferenceTalks.isEmpty).toBe(true);
    expect(brief.sections.authority.items[0].text).toContain("access 82");
    expect(brief.sections.relationship.items[0].text).toBe("warm_history");
    expect(brief.sections.warmPath.items[0].text).toBe("Direct prior colleague");
    expect(brief.sections.recommendedApproach.items[0].text).toContain("Operational Truth Diagnostic");
    expect(brief.sections.researchGaps.items[0].text).toContain("Is there an incumbent SI?");
  });

  it("assembles a realistic fixture in under one second", () => {
    const startedAt = performance.now();
    assembleExecutiveBrief(personFixture());
    expect(performance.now() - startedAt).toBeLessThan(1000);
  });

  it("does not reference a persisted brief model in the implementation", () => {
    const source = readFileSync(join(process.cwd(), "src/lib/opportunity-intelligence/action/executive-brief.ts"), "utf8");
    expect(source).not.toContain("oiBrief");
    expect(source).not.toContain("OiBrief");
  });
});

function personFixture() {
  const createdAt = new Date();
  return {
    id: "person-1",
    name: "Sarah Chen",
    title: "VP Operations",
    organization: { name: "Regional Payer Health" },
    contactPoints: [{ type: "email", value: "sarah@example.com", provenance: "publicly_listed", status: "active" }],
    facts: [
      { field: "career", value: "VP Operations at Regional Payer Health", basis: "stated" as const, confidence: 95, evidence: { source: { canonicalUrl: "https://example.com/bio" } } },
      { field: "responsibilities", value: "Owns care platform delivery", basis: "operator" as const, confidence: 90, evidence: null },
    ],
    stakeholders: [
      {
        role: "operational_owner",
        authority: "high",
        relationshipType: "warm_history",
        warmPathNotes: "Direct prior colleague",
        roleConfidence: 100,
        accessScore: 82,
        isSelected: true,
        opportunityId: "opp-1",
        opportunity: {
          title: "Care Management Platform Recovery",
          organization: { name: "Regional Payer Health" },
          currentScore: { accessScore: 82 },
          initiative: {
            name: "Care management platform recovery",
            category: "care_management",
            status: "evidenced",
            confidence: 88,
            signalLinks: [
              {
                signal: {
                  summary: "Platform rollout delayed 18 months",
                  confidence: 90,
                  occurredAt: createdAt,
                  createdAt,
                  source: { canonicalUrl: "https://example.com/signal" },
                },
              },
            ],
          },
          playbook: { offerGuidance: "Lead with the delay.", decisionPoints: ["Time-to-milestone"], proofGuidance: null },
          offer: { name: "Operational Truth Diagnostic", problemSolved: null, positioningNotes: null },
          researchGaps: [{ question: "Is there an incumbent SI?", reason: "Changes wedge.", blocksOutreach: true, status: "open" }],
        },
      },
    ],
  };
}
