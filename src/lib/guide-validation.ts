// Publication gate for TKO guides.
//
// This is deliberately a pure function over the repository-native content, not
// an approval application. It runs in the test suite (so CI blocks a bad guide)
// and is surfaced read-only in the TIF operator console.
//
// The rule: a guide may carry `status: published` only if it satisfies the guide
// quality standard. Drafts and in-review guides are exempt — they simply do not
// reach the public site.

import { getAllInsights, type Insight } from "@/lib/insights";
import { isGuideClusterSlug } from "@/lib/guide-clusters";
import { isOfferSlug } from "@/lib/offers";

export type GuideValidationIssue = {
  slug: string;
  field: string;
  message: string;
};

export type GuideValidationResult = {
  slug: string;
  title: string;
  status: Insight["status"];
  issues: GuideValidationIssue[];
};

const MIN_DIAGNOSTIC_QUESTIONS = 3;
const MIN_DESCRIPTION_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 200;
const MIN_TITLE_LENGTH = 15;
const MAX_TITLE_LENGTH = 110;

/** Required free-text brief fields, mapped to the frontmatter key an author would fix. */
const REQUIRED_TEXT_FIELDS: { key: keyof Insight["brief"]; field: string; why: string }[] = [
  { key: "primaryBuyer", field: "primary_buyer", why: "a guide must name the executive it is written for" },
  { key: "buyerProblem", field: "buyer_problem", why: "a guide must address a specific executive problem" },
  { key: "triggerSignal", field: "trigger_signal", why: "a guide must say what makes this urgent now" },
  { key: "searchIntent", field: "search_intent", why: "a guide must state the question a reader is actually searching" },
  { key: "problemHypothesis", field: "problem_hypothesis", why: "a guide must state what it believes is really going on" },
  { key: "pointOfView", field: "point_of_view", why: "a guide must carry a differentiated point of view" },
  { key: "relevantProof", field: "relevant_proof", why: "a guide must identify the experience or evidence behind it" },
  { key: "aiUseful", field: "ai_useful", why: "a guide must explain where AI is genuinely useful" },
  { key: "aiNotAnswer", field: "ai_not_answer", why: "a guide must explain where AI is not the answer" },
  { key: "recommendedAction", field: "recommended_action", why: "a guide must recommend a practical next step" },
  { key: "cta", field: "cta", why: "a guide must carry an explicit call to action" },
];

export function validateGuide(insight: Insight): GuideValidationResult {
  const issues: GuideValidationIssue[] = [];
  const add = (field: string, message: string) => issues.push({ slug: insight.slug, field, message });

  // Only published guides are gated. Drafts are allowed to be incomplete.
  if (insight.status !== "published") {
    return { slug: insight.slug, title: insight.title, status: insight.status, issues };
  }

  const { brief } = insight;

  for (const { key, field, why } of REQUIRED_TEXT_FIELDS) {
    if (!brief[key]) {
      add(field, `Missing ${field} — ${why}.`);
    }
  }

  if (!brief.cluster) {
    add("cluster", "Missing cluster — every published guide belongs to one problem cluster.");
  } else if (!isGuideClusterSlug(brief.cluster)) {
    add("cluster", `Unknown cluster "${brief.cluster}" — it must match a slug in guide-clusters.ts.`);
  }

  if (!brief.offer) {
    add("offer", "Missing offer — every published guide must map to a real TKO offer.");
  } else if (!isOfferSlug(brief.offer)) {
    add("offer", `Unknown offer "${brief.offer}" — it must match a slug in offers.ts.`);
  }

  if (brief.diagnosticQuestions.length < MIN_DIAGNOSTIC_QUESTIONS) {
    add(
      "diagnostic_questions",
      `Only ${brief.diagnosticQuestions.length} diagnostic question(s) — a guide needs at least ${MIN_DIAGNOSTIC_QUESTIONS} to carry practical diagnostic value.`,
    );
  }

  if (insight.sources.length === 0) {
    add("sources", "Missing sources — a published guide must cite evidence records or public sources.");
  }

  // Human review is the non-negotiable gate. Nothing publishes without a named
  // reviewer and a date, so an unreviewed generated draft cannot reach the site.
  if (!brief.reviewer) {
    add("reviewer", "Missing reviewer — a published guide must record the human who reviewed it.");
  }

  if (!brief.reviewedDate) {
    add("reviewed_date", "Missing reviewed_date — a published guide must record when it was reviewed.");
  } else if (Number.isNaN(new Date(brief.reviewedDate).getTime())) {
    add("reviewed_date", `Invalid reviewed_date "${brief.reviewedDate}" — use an ISO date such as 2026-08-05.`);
  }

  if (insight.title.length < MIN_TITLE_LENGTH || insight.title.length > MAX_TITLE_LENGTH) {
    add(
      "title",
      `Title is ${insight.title.length} characters — keep it between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} so it renders usefully in search results.`,
    );
  }

  if (
    insight.description.length < MIN_DESCRIPTION_LENGTH ||
    insight.description.length > MAX_DESCRIPTION_LENGTH
  ) {
    add(
      "description",
      `Description is ${insight.description.length} characters — keep it between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH}.`,
    );
  }

  return { slug: insight.slug, title: insight.title, status: insight.status, issues };
}

export function validateGuides(contentDir?: string): GuideValidationResult[] {
  return getAllInsights(contentDir).map(validateGuide);
}

export function collectGuideIssues(contentDir?: string): GuideValidationIssue[] {
  return validateGuides(contentDir).flatMap((result) => result.issues);
}

/** Human-readable report used by the test suite and the operator console. */
export function formatGuideIssues(issues: GuideValidationIssue[]): string {
  if (issues.length === 0) {
    return "All published guides satisfy the guide quality standard.";
  }

  return issues.map((issue) => `  ${issue.slug} · ${issue.field}: ${issue.message}`).join("\n");
}
