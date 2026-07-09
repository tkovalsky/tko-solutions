import { describe, expect, it } from "vitest";
import {
  compareVersionText,
  formatRevisionContext,
  generateDerivativeCopy,
  makeContentSlug,
} from "./content-workflow";

describe("content workflow helpers", () => {
  it("creates stable content slugs from operator titles", () => {
    expect(makeContentSlug("  Why Buyers Choose Rachel Delray!  ")).toBe("why-buyers-choose-rachel-delray");
  });

  it("formats revision notes for regeneration context", () => {
    expect(formatRevisionContext(["Tighten the opener.", "Add a practical CTA."])).toContain(
      "1. Tighten the opener.",
    );
    expect(formatRevisionContext(["  "])).toBe("");
  });

  it("compares draft versions with changed line metadata", () => {
    const comparison = compareVersionText("A\nB\nC", "A\nB2\nC");

    expect(comparison.changedLineCount).toBe(1);
    expect(comparison.changedLines).toEqual([{ line: 2, before: "B", after: "B2" }]);
  });

  it("generates copy-ready derivative text without external integrations", () => {
    const copy = generateDerivativeCopy({
      type: "email_draft",
      title: "Operational Intelligence vs Reporting",
      body: "# Operational Intelligence vs Reporting\n\nReporting tells you what happened. Operational intelligence tells you what to do next, who should act, and what evidence is still missing before a decision is safe.",
    });

    expect(copy).toContain("Subject: Operational Intelligence vs Reporting");
    expect(copy).toContain("Hi [Name],");
  });
});
