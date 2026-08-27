import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy, leadParagraph } from "@/lib/content";

describe("TKO 2.0 evidence catalogue", () => {
  it("states role, evidence, lesson, and limits for every case", () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(6);
    expect(new Set(caseStudies.map((study) => study.slug)).size).toBe(caseStudies.length);
    for (const study of caseStudies) {
      expect(study.situation.length).toBeGreaterThan(50);
      expect(study.complexity.length).toBeGreaterThan(50);
      expect(study.role.length).toBeGreaterThan(40);
      expect(study.lesson.length).toBeGreaterThan(40);
      expect(study.relevance.length).toBeGreaterThan(40);
      expect(study.evidence.length).toBeGreaterThanOrEqual(2);
      expect(study.evidenceLimit.length).toBeGreaterThan(60);
      expect(study.relatedOfferHref).toMatch(/^\/services\//);
      expect(getCaseStudy(study.slug)).toBe(study);
    }
  });

  it("keeps independent systems distinct from enterprise experience", () => {
    expect(getCaseStudy("from-crm-to-operating-system")?.classification).toBe("Live independent system");
    expect(getCaseStudy("cre-intelligence-model")?.classification).toBe("Method-portability evidence");
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
