import { describe, expect, it } from "vitest";
import { getAllInsights } from "@/lib/insights";
import {
  LINKEDIN_HOOK_LIMIT,
  assessOperatorNote,
  attributedUrl,
  collectApprovalViolations,
  composeLinkedInPost,
  findDuplicateTopics,
  loadOperatorNotes,
  type OperatorNote,
} from "@/lib/tif/operator-notes";

describe("operator-notes registry", () => {
  const notes = loadOperatorNotes();

  it("loads a schema-valid registry with unique ids and ranks", () => {
    expect(notes.length).toBeGreaterThan(0);
    expect(new Set(notes.map((n) => n.id)).size).toBe(notes.length);
    expect(new Set(notes.map((n) => n.rank)).size).toBe(notes.length);
  });

  it("has no approval-boundary violations as committed", () => {
    expect(collectApprovalViolations(notes)).toEqual([]);
  });

  it("has no duplicate topics, including against existing guides", () => {
    const guides = getAllInsights().map((guide) => ({ id: guide.slug, title: guide.title }));
    expect(findDuplicateTopics(notes, guides)).toEqual([]);
  });

  it("never treats Rachel's or the joint voice as publishable without her recorded consent", () => {
    for (const n of notes.filter((item) => item.identity !== "todd" && item.sensitivity.consentRecorded.length === 0)) {
      expect(assessOperatorNote(n).readiness).toBe("not_publishable");
    }
  });

  it("composes a draft for every note whose content is clean", () => {
    for (const n of notes) {
      const result = composeLinkedInPost(n);
      expect(result.ok).toBe(true);
    }
  });
});

describe("assessOperatorNote", () => {
  it("marks a fully evidenced Todd note ready", () => {
    expect(assessOperatorNote(note())).toEqual({ noteId: "ON-900", readiness: "ready", issues: [] });
  });

  it("requires a verified source for any quantified claim", () => {
    const result = assessOperatorNote(
      note({
        outcome: {
          status: "partial",
          claims: [{ text: "Cut the bill by 40%.", evidenceIds: ["EVD-OWNER"] }],
          gap: "The after window is short and unrepeated.",
        },
        evidence: [ownerStatement()],
      }),
    );

    expect(result.readiness).toBe("needs_evidence");
    expect(result.issues.map((issue) => issue.field)).toContain("outcome.claims[0]");
  });

  it("accepts owner confirmation for a qualitative claim", () => {
    const result = assessOperatorNote(
      note({
        outcome: {
          status: "partial",
          claims: [{ text: "Releases no longer need the owner to babysit them.", evidenceIds: ["EVD-OWNER"] }],
          gap: "Not yet measured over a full month.",
        },
        evidence: [ownerStatement()],
      }),
    );

    expect(result.readiness).toBe("ready");
  });

  it("refuses to let an owner statement verify itself", () => {
    const result = assessOperatorNote(note({ evidence: [verified(), { ...ownerStatement(), claimStatus: "verified" }] }));
    expect(result.issues.map((issue) => issue.message)).toContain(
      "An owner statement can be owner_confirmed at most, not verified.",
    );
  });

  it("flags claims citing evidence the note does not carry", () => {
    const result = assessOperatorNote(
      note({ outcome: { status: "verified", claims: [{ text: "PR to release fell to 22 minutes.", evidenceIds: ["EVD-MISSING"] }] } }),
    );
    expect(result.readiness).toBe("needs_evidence");
    expect(result.issues.some((issue) => issue.message.includes("not in this note"))).toBe(true);
  });

  it("requires a stated gap whenever the outcome is not verified", () => {
    const result = assessOperatorNote(note({ outcome: { status: "unknown", claims: [] } }));
    expect(result.issues.map((issue) => issue.field)).toContain("outcome.gap");
  });

  it("blocks Rachel's voice and the joint voice until she records consent", () => {
    for (const identity of ["rachel", "joint"] as const) {
      const result = assessOperatorNote(note({ identity }));
      expect(result.readiness).toBe("not_publishable");
      expect(result.issues[0]).toMatchObject({ kind: "consent", field: "sensitivity.consentRecorded" });
    }

    const consented = note({
      identity: "joint",
      sensitivity: {
        confidentiality: "consent_backed",
        consentRequiredFrom: ["rachel"],
        consentRecorded: [{ person: "rachel", date: "2026-10-22", scope: "This note's final wording" }],
      },
    });
    expect(assessOperatorNote(consented).readiness).toBe("ready");
  });

  it("blocks a Todd note that touches Rachel's business until she consents", () => {
    const result = assessOperatorNote(
      note({ sensitivity: { confidentiality: "anonymized", consentRequiredFrom: ["rachel"], consentRecorded: [] } }),
    );
    expect(result.readiness).toBe("not_publishable");
  });

  it.each([
    ["an email address", { hook: "Write to someone@example.com about this incident today." }],
    ["a phone number", { context: "Call (561) 555-0134 if this happens to your team again." }],
    ["a lead identifier", { problem: "Lead 594 received the same email three times in twelve minutes." }],
    ["a confidential employer", { takeaway: "Something we learned at Cognizant applies here as well." }],
    ["a credential", { insight: "The fix was rotating sk-abcdefghijklmnop in the vault" }],
  ])("blocks publishable text containing %s", (_label, patch) => {
    const result = assessOperatorNote(note(patch as Partial<OperatorNote>));
    expect(result.readiness).toBe("not_publishable");
    expect(result.issues.some((issue) => issue.kind === "content")).toBe(true);
  });

  it("never publishes restricted material", () => {
    const result = assessOperatorNote(
      note({ sensitivity: { confidentiality: "restricted", consentRequiredFrom: [], consentRecorded: [] } }),
    );
    expect(result.readiness).toBe("not_publishable");
  });
});

describe("approval boundary", () => {
  it("rejects an approved note without a named reviewer and date", () => {
    const n = note({ editorial: { status: "approved" } });
    expect(assessOperatorNote(n).readiness).toBe("not_publishable");
    expect(collectApprovalViolations([n]).map((issue) => issue.field)).toEqual([
      "editorial.reviewer",
      "editorial.reviewedDate",
    ]);
  });

  it("rejects a published note without the live permalink", () => {
    const n = note({ editorial: { status: "published", reviewer: "Todd Kovalsky", reviewedDate: "2026-10-22" } });
    expect(collectApprovalViolations([n]).map((issue) => issue.field)).toEqual(["editorial.permalink"]);
  });

  it("rejects approving a note that still needs evidence", () => {
    const n = note({
      editorial: { status: "approved", reviewer: "Todd Kovalsky", reviewedDate: "2026-10-22" },
      evidence: [ownerStatement()],
      outcome: { status: "partial", claims: [{ text: "Saved $200 a month.", evidenceIds: ["EVD-OWNER"] }], gap: "One month only so far." },
    });
    expect(collectApprovalViolations([n]).length).toBeGreaterThan(0);
  });

  it("accepts an approved, ready note with a reviewer and date", () => {
    const n = note({ editorial: { status: "approved", reviewer: "Todd Kovalsky", reviewedDate: "2026-10-22" } });
    expect(collectApprovalViolations([n])).toEqual([]);
  });

  it("rejects duplicate ids and unknown offers", () => {
    const violations = collectApprovalViolations([
      note(),
      note({ commercial: { relevance: "high", offer: "made-up-offer", rationale: "No such offer exists." } }),
    ]);
    expect(violations.map((issue) => issue.field)).toEqual(["id", "commercial.offer"]);
  });
});

describe("findDuplicateTopics", () => {
  it("flags two notes resting on the same primary source", () => {
    const duplicates = findDuplicateTopics([note(), note({ id: "ON-901", title: "A different angle entirely on runners" })]);
    expect(duplicates[0]).toMatchObject({ noteId: "ON-900", otherId: "ON-901" });
    expect(duplicates[0].reason).toContain("Same primary source");
  });

  it("flags titles that say the same thing", () => {
    const other = note({ id: "ON-901", title: "Why CI cost more than production AI", evidence: [{ ...verified(), ref: "https://example.com/other" }] });
    expect(findDuplicateTopics([note(), other])).toHaveLength(1);
  });

  it("flags a note restating an existing guide", () => {
    const duplicates = findDuplicateTopics([note()], [{ id: "guide-slug", title: "CI cost more than production AI" }]);
    expect(duplicates).toEqual([{ noteId: "ON-900", otherId: "guide-slug", reason: "Restates an existing guide." }]);
  });
});

describe("composeLinkedInPost", () => {
  it("follows hook → problem → failure → insight → mechanics → result → lesson → CTA", () => {
    const result = composeLinkedInPost(note());
    if (!result.ok) throw new Error("expected a draft");

    const order = [
      "CI cost us more than production AI.",
      "We assumed AI was the cost.",
      "We nearly cut the AI features.",
      "So we read both ledgers:",
      "→ Every model call is written to a ledger.",
      "The result:",
      "→ Actions fell from $17.27 to $2.33 a day.",
      "Read the bill before cutting features.",
      "The write-up is in the first comment.",
    ].map((fragment) => result.draft.body.indexOf(fragment));

    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(result.draft.body.startsWith("CI cost us more than production AI.")).toBe(true);
  });

  it("puts the link in the first comment, attributed to the note", () => {
    const result = composeLinkedInPost(note());
    if (!result.ok) throw new Error("expected a draft");

    expect(result.draft.body).not.toContain("http");
    expect(result.draft.firstComment).toBe(
      "https://tko.solutions/selected-work/from-crm-to-operating-system?utm_source=linkedin&utm_medium=personal&utm_campaign=operator-notes-on-900",
    );
    expect(result.draft.sourceRefs).toEqual(["https://github.com/example/repo/issues/1"]);
  });

  it("states the gap instead of a result when the outcome is unknown", () => {
    const result = composeLinkedInPost(
      note({ outcome: { status: "unknown", claims: [], gap: "We have not measured the effect on replies yet." } }),
    );
    if (!result.ok) throw new Error("expected a draft");

    expect(result.draft.body).not.toContain("The result:");
    expect(result.draft.body).toContain("What we don't know yet: We have not measured the effect on replies yet.");
    expect(result.draft.warnings).toContain("States a measurement gap. Keep it; do not replace it with an estimate.");
  });

  it("drafts a consent-blocked note so Rachel can read what she would approve", () => {
    const result = composeLinkedInPost(note({ identity: "joint" }));
    if (!result.ok) throw new Error("expected a draft");
    expect(result.draft.warnings).toContain("sensitivity.consentRecorded: Rachel has not recorded consent for this note.");
  });

  it("refuses to draft a note whose text carries blocked content", () => {
    const result = composeLinkedInPost(note({ problem: "Lead 594 received the same email three times." }));
    expect(result.ok).toBe(false);
  });

  it("warns when the hook runs past the mobile see-more cut-off or the post is too long", () => {
    const longHook = note({ hook: "x".repeat(LINKEDIN_HOOK_LIMIT + 1), mechanics: ["m".repeat(1500), "n".repeat(1500)] });
    const result = composeLinkedInPost(longHook);
    if (!result.ok) throw new Error("expected a draft");

    expect(result.draft.warnings.some((warning) => warning.includes("see more"))).toBe(true);
    expect(result.draft.warnings.some((warning) => warning.includes("LinkedIn allows 3000"))).toBe(true);
  });

  it("returns plain data and performs no publishing side effect", () => {
    const result = composeLinkedInPost(note());
    if (!result.ok) throw new Error("expected a draft");
    expect(Object.values(result.draft).every((value) => value === null || ["string", "number", "object"].includes(typeof value))).toBe(true);
  });
});

describe("attributedUrl", () => {
  it("tags our own pages with a campaign the conversion events accept", () => {
    const url = new URL(attributedUrl("/insights/example", "ON-012"));
    expect(url.searchParams.get("utm_campaign")).toBe("operator-notes-on-012");
    expect(url.searchParams.get("utm_campaign")).toMatch(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/);
  });

  it("leaves other sites untouched", () => {
    expect(attributedUrl("https://racheldelray.com/recommendations", "ON-010")).toBe(
      "https://racheldelray.com/recommendations",
    );
  });
});

function verified() {
  return {
    id: "EVD-BILLING",
    kind: "billing_report" as const,
    ref: "https://github.com/example/repo/issues/1",
    claimStatus: "verified" as const,
    observedAt: "2026-10-22",
    summary: "Org billing report before and after the runner move.",
  };
}

function ownerStatement() {
  return {
    id: "EVD-OWNER",
    kind: "owner_statement" as const,
    ref: "Todd, session notes",
    claimStatus: "owner_confirmed" as const,
    observedAt: "2026-10-22",
    summary: "Owner describes the change and its effect.",
  };
}

function note(overrides: Partial<OperatorNote> = {}): OperatorNote {
  return {
    id: "ON-900",
    rank: 900,
    title: "CI cost more than production AI",
    identity: "todd",
    audience: "Founders budgeting for AI automation",
    storyType: "cost_to_build",
    hook: "CI cost us more than production AI.",
    problem: "We assumed AI was the cost.",
    context: "A small business cannot carry a mystery bill.",
    failedApproach: "We nearly cut the AI features.",
    insight: "So we read both ledgers.",
    mechanics: ["Every model call is written to a ledger.", "CI moved to runners we own."],
    outcome: {
      status: "verified",
      claims: [{ text: "Actions fell from $17.27 to $2.33 a day.", evidenceIds: ["EVD-BILLING"] }],
    },
    takeaway: "Read the bill before cutting features.",
    cta: { text: "The write-up is in the first comment.", href: "/selected-work/from-crm-to-operating-system" },
    evidence: [verified()],
    sensitivity: { confidentiality: "public", consentRequiredFrom: [], consentRecorded: [] },
    commercial: { relevance: "high", offer: "operating-system-build", rationale: "Cost discipline on a live system." },
    format: "text",
    editorial: { status: "candidate" },
    ...overrides,
  };
}
