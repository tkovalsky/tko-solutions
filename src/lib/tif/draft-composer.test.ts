import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { composeDraft } from "./draft-composer";
import type { GenerationRequirementSource } from "./contract";

describe("TIF core draft composer", () => {
  it("composes a pre-license commercial corridor page from the CRE framework", () => {
    const result = composeDraft({
      framework: "cre_tenant_rep",
      artifact: "cre_corridor_page",
      voice: "commercial_operator",
      inputs: {
        market: "South Florida",
        corridor: "Congress Avenue",
        operatorType: "medical and service operators",
        licenseStatus: "pre_license",
        licensedReferralPartner: "Rachel's licensed commercial teammate",
        fieldObservations: ["VERIFY dated access and parking observation."],
      },
    });

    expect(result.title).toContain("Congress Avenue");
    expect(result.markdown).toContain("intelligenceSource: cre-intelligence");
    expect(result.markdown).toContain("Pre-license boundary");
    expect(result.markdown).toContain("Rachel's licensed commercial teammate");
    expect(result.suggestedPath).toContain("src/content/commercial/");
  });

  it("composes a business transferability page without valuation promises", () => {
    const result = composeDraft({
      framework: "business_exit",
      artifact: "transferability_assessment_page",
      voice: "todd",
      inputs: {
        market: "South Florida",
        businessType: "owner-led professional services firm",
        exitHorizon: "24-36 months",
        licenseStatus: "pre_license",
      },
    });

    expect(result.markdown).toContain("Business Transferability Assessment");
    expect(result.markdown).toContain("not a valuation");
    expect(result.markdown).toContain("no engagement guarantees a transaction or valuation outcome");
  });

  it("rejects a commercial framework without market context", () => {
    expect(() => composeDraft({
      framework: "cre_tenant_rep",
      artifact: "cre_area_page",
      voice: "todd",
      inputs: {},
    })).toThrow("inputs.market");
  });

  it("preserves facts, context, notes, and revision feedback with explicit truth metadata", () => {
    const result = composeDraft({
      contractVersion: "2026-07-22",
      framework: "rachel_community",
      artifact: "community_page",
      voice: "rachel",
      inputs: {
        title: "Valencia Sound Guide",
        context: {
          community: "Valencia Sound",
          county: "Palm Beach County",
          persona: "55-plus buyer",
        },
        facts: "[Fact 44 v2] Valencia Sound has eight pickleball courts.",
        notes: "Keep the comparison decision-oriented.",
        revisionFeedback: "Tighten the opening and preserve the evidence boundary.",
      },
    });

    expect(result.markdown).toContain("[Fact 44 v2] Valencia Sound has eight pickleball courts.");
    expect(result.markdown).toContain("Keep the comparison decision-oriented.");
    expect(result.markdown).toContain("Tighten the opening and preserve the evidence boundary.");
    expect(result.markdown).toContain("**persona:** 55-plus buyer");
    expect(result.sourceUsage).toEqual({
      factsIncluded: true,
      factReferences: ["Fact 44 v2"],
      notesIncluded: true,
      revisionFeedbackIncluded: true,
      voiceApplied: false,
      requirementsAccepted: false,
      requirementsDigest: null,
    });
    expect(result.warnings).toContain('Voice "rachel" is recorded as metadata only; automated voice refinement is not operational.');
  });

  it("accepts an intact generation requirements bundle and echoes its digest", () => {
    const content = "Canonical source content for testing.";
    const sourceHash = createHash("sha256").update(content).digest("hex");
    const roles: GenerationRequirementSource["role"][] = ["voice", "persona", "strategy", "page_contract", "validation"];
    const sources = roles.map((role) => ({
      role,
      path: `docs/${role}.md`,
      sha256: sourceHash,
      content,
    }));
    const identity = { version: "2026-09-09", contentType: "development", archetype: "standard", sources: sources.map(({ role, path, sha256 }) => ({ role, path, sha256 })) };
    const digest = createHash("sha256").update(JSON.stringify(identity)).digest("hex");
    const result = composeDraft({
      framework: "rachel_community",
      artifact: "community_page",
      inputs: { community: "Avenir", county: "Palm Beach County", generationRequirements: { ...identity, digest, sources } },
    });
    expect(result.sourceUsage).toMatchObject({ requirementsAccepted: true, requirementsDigest: digest, voiceApplied: false });
  });

  it("rejects a tampered generation requirements source", () => {
    const source = { role: "voice" as const, path: "docs/voice.md", sha256: "0".repeat(64), content: "Tampered" };
    expect(() => composeDraft({
      framework: "rachel_community",
      artifact: "community_page",
      inputs: {
        community: "Avenir",
        county: "Palm Beach County",
        generationRequirements: {
          version: "2026-09-09",
          digest: "0".repeat(64),
          contentType: "development",
          archetype: "standard",
          sources: [source, { ...source, role: "persona" }, { ...source, role: "strategy" }, { ...source, role: "page_contract" }, { ...source, role: "validation" }],
        },
      },
    })).toThrow("source hash mismatch");
  });

  it("changes the draft when the supplied approved fact version changes", () => {
    const base = {
      framework: "rachel_community" as const,
      artifact: "community_page" as const,
      inputs: { community: "Valencia Sound", county: "Palm Beach County" },
    };
    const first = composeDraft({ ...base, inputs: { ...base.inputs, facts: "[Fact 44 v2] Eight courts." } });
    const second = composeDraft({ ...base, inputs: { ...base.inputs, facts: "[Fact 44 v3] Ten courts." } });

    expect(first.markdown).not.toBe(second.markdown);
    expect(first.sourceUsage.factReferences).toEqual(["Fact 44 v2"]);
    expect(second.sourceUsage.factReferences).toEqual(["Fact 44 v3"]);
  });

  it("rejects unknown fields instead of silently stripping them", () => {
    expect(() => composeDraft({
      framework: "rachel_community",
      artifact: "community_page",
      inputs: {
        community: "Valencia Sound",
        county: "Palm Beach County",
        unsupportedPayload: "must not disappear",
      } as never,
    })).toThrow(ZodError);
  });
});
