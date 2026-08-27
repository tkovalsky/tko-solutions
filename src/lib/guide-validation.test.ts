import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { collectGuideIssues, formatGuideIssues, validateGuides } from "@/lib/guide-validation";

let contentDir: string;

afterEach(() => {
  if (contentDir) {
    rmSync(contentDir, { recursive: true, force: true });
    contentDir = "";
  }
});

// This is the publication gate. If it fails, a guide on the real site is missing a
// required brief field or a named human reviewer — fix the guide, not the test.
describe("published guides in src/content/insights", () => {
  it("all satisfy the guide quality standard", () => {
    const issues = collectGuideIssues();
    expect(issues, `\n${formatGuideIssues(issues)}\n`).toEqual([]);
  });

  it("each published guide maps to an offer and a cluster", () => {
    const published = validateGuides().filter((result) => result.status === "published");
    expect(published.length).toBeGreaterThan(0);
  });
});

describe("validateGuides", () => {
  it("does not gate drafts", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "guides-"));
    write(
      "draft.md",
      `---
title: "An Incomplete Draft That Is Long Enough"
description: "A draft with no brief at all, which is fine because drafts never reach the public site."
date: 2026-08-01
status: draft
---
Body.
`,
    );

    expect(collectGuideIssues(contentDir)).toEqual([]);
  });

  it("reports every missing required field on a published guide", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "guides-"));
    write(
      "bare.md",
      `---
title: "A Published Guide With No Brief"
description: "This guide claims published status but carries none of the brief fields the standard requires."
date: 2026-08-01
status: published
---
Body.
`,
    );

    const fields = collectGuideIssues(contentDir).map((issue) => issue.field);

    expect(fields).toEqual(
      expect.arrayContaining([
        "primary_buyer",
        "buyer_problem",
        "trigger_signal",
        "search_intent",
        "problem_hypothesis",
        "point_of_view",
        "relevant_proof",
        "ai_useful",
        "ai_not_answer",
        "recommended_action",
        "cta",
        "cluster",
        "offer",
        "diagnostic_questions",
        "sources",
        "reviewer",
        "reviewed_date",
      ]),
    );
  });

  it("rejects an unknown cluster or offer", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "guides-"));
    write("bad-refs.md", completeGuide({ cluster: "not-a-cluster", offer: "not-an-offer" }));

    const issues = collectGuideIssues(contentDir);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "cluster", message: expect.stringContaining("Unknown cluster") }),
        expect.objectContaining({ field: "offer", message: expect.stringContaining("Unknown offer") }),
      ]),
    );
  });

  it("requires a named human reviewer and a valid review date", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "guides-"));
    write("unreviewed.md", completeGuide({ reviewer: "", reviewedDate: "not-a-date" }));

    const issues = collectGuideIssues(contentDir);

    expect(issues.map((issue) => issue.field)).toEqual(
      expect.arrayContaining(["reviewer", "reviewed_date"]),
    );
  });

  it("passes a complete guide", () => {
    contentDir = mkdtempSync(path.join(tmpdir(), "guides-"));
    write("complete.md", completeGuide({}));

    expect(collectGuideIssues(contentDir)).toEqual([]);
  });
});

function write(filename: string, content: string) {
  writeFileSync(path.join(contentDir, filename), content);
}

function completeGuide(
  overrides: Partial<{ cluster: string; offer: string; reviewer: string; reviewedDate: string }>,
) {
  const {
    cluster = "prior-authorization-operations",
    offer = "transformation-diagnostic",
    reviewer = "Todd Kovalsky",
    reviewedDate = "2026-08-05",
  } = overrides;

  return `---
title: "A Complete Guide With A Reasonable Title"
description: "A complete guide brief with every required field present so the publication gate lets it through."
cluster: ${cluster}
primary_buyer: "COO and Chief Transformation Officer"
buyer_problem: "A specific and expensive executive problem."
trigger_signal: "A change signal that makes this urgent now."
search_intent: "What the reader is actually searching for."
problem_hypothesis: "What is really going on underneath the symptom."
point_of_view: "The differentiated position this guide takes."
relevant_proof: "The experience and evidence behind the argument."
ai_useful: "Where AI genuinely helps."
ai_not_answer: "Where AI adds risk instead of value."
diagnostic_questions:
  - "First diagnostic question?"
  - "Second diagnostic question?"
  - "Third diagnostic question?"
recommended_action: "The practical next step."
offer: ${offer}
cta: "Discuss a Transformation"
status: published
reviewer: "${reviewer}"
reviewed_date: "${reviewedDate}"
sources:
  - healthcare:some-evidence-record
date: 2026-08-01
---
Body.
`;
}
