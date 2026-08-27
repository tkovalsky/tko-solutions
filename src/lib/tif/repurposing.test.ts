import { describe, expect, it } from "vitest";
import { buildRepurposingPack } from "@/lib/tif/repurposing";
import type { Insight } from "@/lib/insights";

describe("buildRepurposingPack", () => {
  it("derives the full draft package from the guide brief", () => {
    const pack = buildRepurposingPack(guide(), [guide(), sibling()]);

    expect(pack.guideUrl).toBe("/insights/example-guide");
    expect(pack.outreachExcerpt).toContain("a new COO inherited the program");
    expect(pack.outreachExcerpt).toContain("/insights/example-guide");
    expect(pack.executiveEmailAngle).toContain("Angle:");
    expect(pack.executiveEmailAngle).toContain("Position:");
    expect(pack.executiveEmailAngle).toContain("Ask:");
    expect(pack.networkPost).toContain("Full piece: /insights/example-guide");
    expect(pack.proposalExcerpt).toContain("Proposed vehicle: Transformation Diagnostic.");
  });

  it("returns exactly three conversation prompts and carries the rest forward", () => {
    const pack = buildRepurposingPack(guide(), []);

    expect(pack.conversationPrompts).toEqual(["Q1?", "Q2?", "Q3?"]);
    expect(pack.futureGuideQuestions).toContain("Q4?");
  });

  it("suggests the mapped offer and same-cluster siblings as internal links", () => {
    const pack = buildRepurposingPack(guide(), [guide(), sibling(), otherCluster()]);

    expect(pack.suggestedInternalLinks.map((link) => link.href)).toEqual([
      "/services/transformation-diagnostic",
      "/insights/sibling-guide",
    ]);
  });

  it("never emits anything that publishes or sends on its own", () => {
    const pack = buildRepurposingPack(guide(), []);

    // The pack is data. Every field is a string or array a human edits before use.
    expect(Object.values(pack).every((value) => typeof value === "string" || Array.isArray(value))).toBe(true);
  });
});

function guide(): Insight {
  return insight("example-guide", "Example Guide", "stalled-healthcare-transformation");
}

function sibling(): Insight {
  return insight("sibling-guide", "Sibling Guide", "stalled-healthcare-transformation");
}

function otherCluster(): Insight {
  return insight("other-guide", "Other Guide", "prior-authorization-operations");
}

function insight(slug: string, title: string, cluster: string): Insight {
  return {
    title,
    description: `${title} description.`,
    sources: ["healthcare:some-record"],
    date: "2026-08-01",
    slug,
    status: "published",
    published: true,
    featured: false,
    brief: {
      cluster,
      primaryBuyer: "COO",
      buyerProblem: "The program has stopped producing visible progress",
      triggerSignal: "A new COO inherited the program",
      searchIntent: "Why the program stalled",
      problemHypothesis: "the constraint is an unowned decision",
      pointOfView: "Adding governance to a stalled program makes it slower",
      relevantProof: "Enterprise healthcare transformation experience",
      aiUseful: "Clustering issue logs",
      aiNotAnswer: "AI does not resolve an unmade decision",
      diagnosticQuestions: ["Q1?", "Q2?", "Q3?", "Q4?"],
      recommendedAction: "Get an independent read before approving more funding",
      offer: "transformation-diagnostic",
      cta: "Discuss a Transformation",
      reviewer: "Todd Kovalsky",
      reviewedDate: "2026-08-05",
    },
    body: "Body.",
    html: "<p>Body.</p>",
    wordCount: 1,
    readingTime: 1,
    sourceCount: 1,
  };
}
