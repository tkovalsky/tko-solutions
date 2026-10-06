import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy, leadParagraph } from "@/lib/content";

describe("TKO case studies", () => {
  it("includes the narrative and next step for every case", () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(1);
    expect(new Set(caseStudies.map((study) => study.slug)).size).toBe(caseStudies.length);
    for (const study of caseStudies) {
      expect(study.situation.length).toBeGreaterThan(50);
      expect(study.complexity.length).toBeGreaterThan(50);
      expect(study.role.length).toBeGreaterThan(40);
      expect(study.lesson.length).toBeGreaterThan(40);
      expect(study.relevance.length).toBeGreaterThan(40);
      expect(study.relatedOfferHref).toMatch(/^\/(services|products)\//);
      expect(getCaseStudy(study.slug)).toBe(study);
    }
  });

  it("leads with RachelOS and shows how the build progressed", () => {
    const rachelos = getCaseStudy("from-crm-to-operating-system");
    expect(caseStudies[0]).toBe(rachelos);
    expect(rachelos?.stages?.length).toBeGreaterThanOrEqual(3);
  });

  it("does not claim revenue outcomes for RachelOS", () => {
    const rachelos = getCaseStudy("from-crm-to-operating-system");
    expect(JSON.stringify(rachelos)).not.toMatch(/ROI of|\d+% (more|increase)|10x/i);
  });

  // The site is founder-led: Todd describes his own work in the first person.
  // Third person is reserved for schema, formal bio, and press-style context.
  it("describes founder-led work in the first person", () => {
    for (const study of caseStudies) {
      for (const field of [study.role, study.intervention, study.result] as const) {
        expect(field).not.toMatch(/\bTodd\b/);
        expect(field).not.toMatch(/(^|\s)He\s/);
      }
      expect(study.role).toMatch(/\bI\b/);
    }
  });

  it("returns only the first paragraph for summary surfaces", () => {
    expect(leadParagraph("one\n\ntwo")).toBe("one");
    expect(leadParagraph("only")).toBe("only");
    for (const study of caseStudies) {
      expect(leadParagraph(study.situation)).not.toContain("\n\n");
    }
  });
});
