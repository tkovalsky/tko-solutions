// Operator notes: build-in-public stories drawn from real RachelOS engineering and
// operating evidence, written for Todd's professional audience (and, only with Rachel's
// recorded consent, for Rachel's or the joint founder voice).
//
// This is the `operator_note` asset kind from knowledge-package.ts given a source: each
// note carries its own evidence, claim status, sensitivity and editorial state in
// content/proof/stories/operator-notes.json. Repository-native like guides — no database.
//
// Everything here is deterministic. The LinkedIn draft is composed from the note's
// structured fields, because a draft assembled from verified fields is cheaper to edit
// than a fluent one that invents a result. Nothing in this module publishes, posts,
// schedules, or contacts anyone; publication stays a human action.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { isOfferSlug } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const OPERATOR_NOTE_IDENTITIES = ["todd", "rachel", "joint"] as const;
export type OperatorNoteIdentity = (typeof OPERATOR_NOTE_IDENTITIES)[number];

export const OPERATOR_NOTE_STORY_TYPES = [
  "before_breakthrough_after",
  "tried_failed_why",
  "bottleneck_replaced",
  "unexpected_engineering_decision",
  "cost_to_build",
  "how_the_automation_works",
  "production_failure_lessons",
  "running_a_real_business",
  "build_vs_buy",
  "human_judgment_vs_ai",
] as const;
export type OperatorNoteStoryType = (typeof OPERATOR_NOTE_STORY_TYPES)[number];

// The shared TIF claim and confidentiality vocabularies (prisma ClaimStatus,
// knowledge-package.ts). Reused so an operator note means the same thing by "verified".
const ClaimStatusSchema = z.enum(["verified", "owner_confirmed", "experience_based", "unsupported"]);
const ConfidentialitySchema = z.enum(["public", "anonymized", "restricted", "consent_backed"]);
const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date such as 2026-10-22.");
const EvidenceIdSchema = z.string().regex(/^EVD-[A-Z0-9-]+$/);
const ConsentPersonSchema = z.enum(["rachel"]);

const EvidenceSchema = z
  .object({
    id: EvidenceIdSchema,
    kind: z.enum([
      "pull_request",
      "issue",
      "decision",
      "repository_doc",
      "commit",
      "billing_report",
      "production_ledger",
      "owner_statement",
    ]),
    ref: z.string().trim().min(3),
    claimStatus: ClaimStatusSchema,
    observedAt: IsoDateSchema,
    summary: z.string().trim().min(10),
  })
  .strict();

const ClaimSchema = z
  .object({
    text: z.string().trim().min(10),
    evidenceIds: z.array(EvidenceIdSchema),
  })
  .strict();

const OperatorNoteSchema = z
  .object({
    id: z.string().regex(/^ON-\d{3}$/),
    rank: z.number().int().positive(),
    title: z.string().trim().min(10).max(140),
    identity: z.enum(OPERATOR_NOTE_IDENTITIES),
    audience: z.string().trim().min(10),
    storyType: z.enum(OPERATOR_NOTE_STORY_TYPES),
    hook: z.string().trim().min(20),
    problem: z.string().trim().min(20),
    context: z.string().trim().min(20),
    failedApproach: z.string().trim().min(20).optional(),
    insight: z.string().trim().min(10),
    mechanics: z.array(z.string().trim().min(10)).min(2).max(6),
    outcome: z
      .object({
        status: z.enum(["verified", "partial", "unknown"]),
        claims: z.array(ClaimSchema),
        gap: z.string().trim().min(20).optional(),
      })
      .strict(),
    takeaway: z.string().trim().min(20),
    cta: z.object({ text: z.string().trim().min(10), href: z.string().trim().min(1).optional() }).strict(),
    evidence: z.array(EvidenceSchema).min(1),
    sensitivity: z
      .object({
        confidentiality: ConfidentialitySchema,
        consentRequiredFrom: z.array(ConsentPersonSchema).default([]),
        consentRecorded: z
          .array(z.object({ person: ConsentPersonSchema, date: IsoDateSchema, scope: z.string().trim().min(5) }).strict())
          .default([]),
        notes: z.string().trim().optional(),
      })
      .strict(),
    commercial: z
      .object({
        relevance: z.enum(["high", "medium", "low"]),
        offer: z.string().trim().optional(),
        rationale: z.string().trim().min(10),
      })
      .strict(),
    format: z.enum(["text", "carousel", "video"]),
    editorial: z
      .object({
        status: z.enum(["candidate", "drafting", "approved", "published"]),
        reviewer: z.string().trim().min(2).optional(),
        reviewedDate: IsoDateSchema.optional(),
        permalink: z.string().url().optional(),
        publishedAt: IsoDateSchema.optional(),
      })
      .strict(),
  })
  .strict();

export type OperatorNote = z.infer<typeof OperatorNoteSchema>;
export type OperatorNoteEvidence = z.infer<typeof EvidenceSchema>;

export type OperatorNoteReadiness = "ready" | "needs_evidence" | "not_publishable";

export type OperatorNoteIssue = {
  noteId: string;
  field: string;
  // `content` blocks drafting entirely; `consent` blocks publication but still allows a
  // draft, so the person being asked can read exactly what they would be agreeing to.
  kind: "content" | "consent" | "approval" | "evidence";
  message: string;
};

export type OperatorNoteAssessment = {
  noteId: string;
  readiness: OperatorNoteReadiness;
  issues: OperatorNoteIssue[];
};

const NOTES_PATH = path.join(process.cwd(), "content/proof/stories/operator-notes.json");

/** Every note on disk, schema-validated. Throws on a malformed registry so CI fails loudly. */
export function loadOperatorNotes(file = NOTES_PATH): OperatorNote[] {
  if (!existsSync(file)) {
    return [];
  }

  const parsed = z.array(OperatorNoteSchema).safeParse(JSON.parse(readFileSync(file, "utf8")));
  if (!parsed.success) {
    throw new Error(`Invalid operator-notes registry ${file}: ${parsed.error.message}`);
  }

  return [...parsed.data].sort((a, b) => a.rank - b.rank);
}

// Publishable text must never carry contact details, credentials, customer identifiers,
// or confidential employer/client material. Todd's employment history can inform general
// lessons (src/lib/founder.ts), but an operator note names no employer or client.
const CONTENT_RULES: { pattern: RegExp; message: string }[] = [
  { pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, message: "contains an email address" },
  { pattern: /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/, message: "contains a phone number" },
  {
    pattern: /\b(?:sk-[A-Za-z0-9_-]{10,}|gh[pousr]_[A-Za-z0-9]{10,}|postgres(?:ql)?:\/\/)/,
    message: "contains a credential or connection string",
  },
  { pattern: /\blead\s*(?:id\s*)?#?\d+\b/i, message: "identifies an individual lead" },
  {
    pattern: /\b(?:cognizant|unitedhealth(?:care)?|uhc|optum)\b/i,
    message: "names a confidential employer or client — keep the lesson general",
  },
];

function publishableText(note: OperatorNote): { field: string; text: string }[] {
  return [
    { field: "title", text: note.title },
    { field: "hook", text: note.hook },
    { field: "problem", text: note.problem },
    { field: "context", text: note.context },
    { field: "failedApproach", text: note.failedApproach ?? "" },
    { field: "insight", text: note.insight },
    ...note.mechanics.map((text, index) => ({ field: `mechanics[${index}]`, text })),
    ...note.outcome.claims.map((claim, index) => ({ field: `outcome.claims[${index}]`, text: claim.text })),
    { field: "outcome.gap", text: note.outcome.gap ?? "" },
    { field: "takeaway", text: note.takeaway },
    { field: "cta", text: note.cta.text },
    // Evidence summaries are never posted, but they travel with the note in the repo.
    ...note.evidence.map((item) => ({ field: `evidence.${item.id}`, text: item.summary })),
  ];
}

/** Rachel's consent is required for her voice, the joint voice, or any note that names it. */
export function requiredConsent(note: OperatorNote): Array<"rachel"> {
  const required = new Set(note.sensitivity.consentRequiredFrom);
  if (note.identity !== "todd" || note.sensitivity.confidentiality === "consent_backed") {
    required.add("rachel");
  }
  return [...required];
}

export function assessOperatorNote(note: OperatorNote): OperatorNoteAssessment {
  const issues: OperatorNoteIssue[] = [];
  const add = (kind: OperatorNoteIssue["kind"], field: string, message: string) =>
    issues.push({ noteId: note.id, field, kind, message });

  if (note.sensitivity.confidentiality === "restricted") {
    add("content", "sensitivity", "Restricted material is never published.");
  }

  for (const { field, text } of publishableText(note)) {
    for (const rule of CONTENT_RULES) {
      if (rule.pattern.test(text)) {
        add("content", field, `Publishable text ${rule.message}.`);
      }
    }
  }

  const recorded = new Set(note.sensitivity.consentRecorded.map((consent) => consent.person));
  for (const person of requiredConsent(note)) {
    if (!recorded.has(person)) {
      add("consent", "sensitivity.consentRecorded", `${capitalize(person)} has not recorded consent for this note.`);
    }
  }

  const evidenceById = new Map(note.evidence.map((item) => [item.id, item]));

  for (const item of note.evidence) {
    // A statement is a source, not a verification of itself.
    if (item.kind === "owner_statement" && item.claimStatus === "verified") {
      add("evidence", `evidence.${item.id}`, "An owner statement can be owner_confirmed at most, not verified.");
    }
  }

  note.outcome.claims.forEach((claim, index) => {
    const field = `outcome.claims[${index}]`;
    const cited = claim.evidenceIds.map((id) => evidenceById.get(id));

    if (claim.evidenceIds.length === 0) {
      add("evidence", field, "Claim cites no evidence.");
      return;
    }
    if (cited.some((item) => item === undefined)) {
      add("evidence", field, "Claim cites an evidence id that is not in this note.");
    }

    const statuses = cited.flatMap((item) => (item ? [item.claimStatus] : []));
    // Numbers need an artifact someone else could check; owner confirmation is enough
    // only for qualitative claims.
    const needsVerified = /\d/.test(claim.text) || note.outcome.status === "verified";
    if (needsVerified && !statuses.includes("verified")) {
      add("evidence", field, "A quantified or verified-outcome claim needs at least one verified source.");
    } else if (!statuses.some((status) => status === "verified" || status === "owner_confirmed")) {
      add("evidence", field, "Claim rests only on experience-based or unsupported evidence.");
    }
  });

  if (note.outcome.status !== "unknown" && note.outcome.claims.length === 0) {
    add("evidence", "outcome.claims", `A ${note.outcome.status} outcome must state at least one claim.`);
  }
  if (note.outcome.status !== "verified" && !note.outcome.gap) {
    add("evidence", "outcome.gap", "A partial or unknown outcome must say plainly what is not yet known.");
  }

  if (note.commercial.offer && !isOfferSlug(note.commercial.offer)) {
    add("approval", "commercial.offer", `Unknown offer "${note.commercial.offer}" — it must match a slug in offers.ts.`);
  }

  // The approval boundary: nothing is approved or published without a named human and a
  // date, and a published note must point at the live post so its outcome can be measured.
  const { editorial } = note;
  if (editorial.status === "approved" || editorial.status === "published") {
    if (!editorial.reviewer) add("approval", "editorial.reviewer", "Approval requires a named human reviewer.");
    if (!editorial.reviewedDate) add("approval", "editorial.reviewedDate", "Approval requires a review date.");
  }
  if (editorial.status === "published" && !editorial.permalink) {
    add("approval", "editorial.permalink", "A published note must record the live post's permalink.");
  }

  const blocking = issues.some((issue) => issue.kind !== "evidence");
  const readiness: OperatorNoteReadiness = blocking
    ? "not_publishable"
    : issues.length > 0
      ? "needs_evidence"
      : "ready";

  return { noteId: note.id, readiness, issues };
}

/**
 * The approval boundary for the registry as committed: an approved or published note
 * must be fully ready. Runs in the test suite, like the guide publication gate.
 */
export function collectApprovalViolations(notes: OperatorNote[]): OperatorNoteIssue[] {
  const violations: OperatorNoteIssue[] = [];
  const seen = new Set<string>();

  for (const note of notes) {
    if (seen.has(note.id)) {
      violations.push({ noteId: note.id, field: "id", kind: "approval", message: "Duplicate note id." });
    }
    seen.add(note.id);

    const assessment = assessOperatorNote(note);
    const offerIssues = assessment.issues.filter((issue) => issue.field === "commercial.offer");
    violations.push(...offerIssues);

    if (note.editorial.status === "approved" || note.editorial.status === "published") {
      violations.push(...assessment.issues.filter((issue) => issue.field !== "commercial.offer"));
    }
  }

  return violations;
}

const TITLE_STOPWORDS = new Set(
  "a an and are as at be but by for from how i in is it its my not of on or our that the this to was we what when why with you your".split(" "),
);

function titleTokens(title: string) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !TITLE_STOPWORDS.has(token)),
  );
}

function jaccard(a: Set<string>, b: Set<string>) {
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

export type DuplicateTopic = { noteId: string; otherId: string; reason: string };

/**
 * Two notes duplicate each other when they rest on the same primary source or their titles
 * say the same thing. Existing published guide titles can be passed in so a note does not
 * restate a guide that already exists.
 */
export function findDuplicateTopics(
  notes: OperatorNote[],
  existing: { id: string; title: string }[] = [],
): DuplicateTopic[] {
  const duplicates: DuplicateTopic[] = [];

  notes.forEach((note, index) => {
    const tokens = titleTokens(note.title);

    for (const other of notes.slice(index + 1)) {
      if (note.evidence[0].ref === other.evidence[0].ref) {
        duplicates.push({ noteId: note.id, otherId: other.id, reason: `Same primary source: ${note.evidence[0].ref}` });
      } else if (jaccard(tokens, titleTokens(other.title)) >= 0.5) {
        duplicates.push({ noteId: note.id, otherId: other.id, reason: "Titles cover the same topic." });
      }
    }

    for (const item of existing) {
      if (jaccard(tokens, titleTokens(item.title)) >= 0.5) {
        duplicates.push({ noteId: note.id, otherId: item.id, reason: "Restates an existing guide." });
      }
    }
  });

  return duplicates;
}

export const LINKEDIN_POST_LIMIT = 3000;
// LinkedIn truncates a post behind "…see more" after roughly two lines on mobile.
export const LINKEDIN_HOOK_LIMIT = 200;

export type OperatorNoteDraft = {
  noteId: string;
  channel: "linkedin_post";
  body: string;
  // Links go in the first comment rather than the post body.
  firstComment: string | null;
  characterCount: number;
  warnings: string[];
  sourceRefs: string[];
};

export type ComposeOperatorNoteResult =
  | { ok: true; draft: OperatorNoteDraft }
  | { ok: false; noteId: string; reasons: string[] };

/** Per-note campaign attribution, captured by src/lib/conversion-events.ts on our own pages. */
export function attributedUrl(href: string, noteId: string): string {
  const url = new URL(href, site.url);
  if (url.origin !== new URL(site.url).origin) {
    return href;
  }
  url.searchParams.set("utm_source", "linkedin");
  url.searchParams.set("utm_medium", "personal");
  url.searchParams.set("utm_campaign", `operator-notes-${noteId.toLowerCase()}`);
  return url.toString();
}

/**
 * Composes the LinkedIn post: hook, the problem and why it mattered, what failed first,
 * the insight and how it works, the verified result or the stated gap, the transferable
 * lesson, and the call to action.
 */
export function composeLinkedInPost(note: OperatorNote): ComposeOperatorNoteResult {
  const assessment = assessOperatorNote(note);
  const contentBlocks = assessment.issues.filter((issue) => issue.kind === "content");
  if (contentBlocks.length > 0) {
    return {
      noteId: note.id,
      ok: false,
      reasons: contentBlocks.map((issue) => `${issue.field}: ${issue.message}`),
    };
  }

  const gapLine = note.outcome.gap ? [`What we don't know yet: ${note.outcome.gap}`] : [];
  const outcomeBlock =
    note.outcome.status === "unknown"
      ? gapLine
      : [
          "The result:",
          ...note.outcome.claims.map((claim) => `→ ${claim.text}`),
          ...(gapLine.length > 0 ? ["", ...gapLine] : []),
        ];

  const body = [
    note.hook,
    "",
    note.problem,
    "",
    note.context,
    ...(note.failedApproach ? ["", note.failedApproach] : []),
    "",
    `${trimTerminalPunctuation(note.insight)}:`,
    ...note.mechanics.map((line) => `→ ${line}`),
    "",
    ...outcomeBlock,
    "",
    note.takeaway,
    "",
    note.cta.text,
  ].join("\n");

  const warnings = assessment.issues.map((issue) => `${issue.field}: ${issue.message}`);
  if (note.hook.length > LINKEDIN_HOOK_LIMIT) {
    warnings.push(`Hook is ${note.hook.length} characters; it will be cut behind "see more" on mobile.`);
  }
  if (body.length > LINKEDIN_POST_LIMIT) {
    warnings.push(`Post is ${body.length} characters; LinkedIn allows ${LINKEDIN_POST_LIMIT}.`);
  }
  if (note.outcome.status !== "verified") {
    warnings.push("States a measurement gap. Keep it; do not replace it with an estimate.");
  }

  return {
    ok: true,
    draft: {
      noteId: note.id,
      channel: "linkedin_post",
      body,
      firstComment: note.cta.href ? attributedUrl(note.cta.href, note.id) : null,
      characterCount: body.length,
      warnings,
      sourceRefs: note.evidence.map((item) => item.ref),
    },
  };
}

/** Absolute link to a note's live post or its source, for the operator console. */
export function evidenceHref(ref: string) {
  if (/^https?:\/\//.test(ref)) return ref;
  if (ref.startsWith("/")) return absoluteUrl(ref);
  return null;
}

function trimTerminalPunctuation(text: string) {
  return text.trim().replace(/[.:;!]+$/, "");
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
