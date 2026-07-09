export const CONTENT_TENANT_LABELS = {
  tko: "TKO",
  boundos: "BoundOS",
  rachel_delray: "RachelDelray",
} as const;

export const OPPORTUNITY_SOURCE_LABELS = {
  content_gap: "Content gap",
  keyword: "Keyword",
  title_idea: "Title idea",
  competitor_url: "Competitor URL",
  reddit_thread_url: "Reddit thread URL",
  forum_discussion: "Forum discussion",
  pasted_notes: "Pasted notes",
  pasted_transcript: "Pasted transcript",
  existing_page_url: "Existing page URL",
  existing_guide: "Existing guide",
} as const;

export const DERIVATIVE_ASSET_LABELS = {
  linkedin_post: "LinkedIn post",
  facebook_post: "Facebook post",
  email_draft: "Email draft",
  ad_concept: "Ad concept",
  summary: "Summary",
  executive_brief: "Executive brief",
} as const;

export type DerivativeAssetKind = keyof typeof DERIVATIVE_ASSET_LABELS;

export function makeContentSlug(input: string) {
  const slug = input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `content-${Date.now()}`;
}

export function formatRevisionContext(notes: string[]) {
  const cleaned = notes.map((note) => note.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";

  return [
    "<!-- Content Factory revision inputs -->",
    "REVISION REQUESTS TO ADDRESS:",
    ...cleaned.map((note, index) => `${index + 1}. ${note}`),
    "<!-- End revision inputs -->",
  ].join("\n");
}

export function compareVersionText(previous: string, next: string) {
  const previousLines = previous.split(/\r?\n/);
  const nextLines = next.split(/\r?\n/);
  const maxLength = Math.max(previousLines.length, nextLines.length);
  const changedLines = [];

  for (let index = 0; index < maxLength; index += 1) {
    const before = previousLines[index] ?? "";
    const after = nextLines[index] ?? "";
    if (before !== after) {
      changedLines.push({ line: index + 1, before, after });
    }
  }

  return {
    previousLineCount: previousLines.length,
    nextLineCount: nextLines.length,
    changedLineCount: changedLines.length,
    changedLines: changedLines.slice(0, 25),
  };
}

export function generateDerivativeCopy({
  type,
  title,
  body,
}: {
  type: DerivativeAssetKind;
  title: string;
  body: string;
}) {
  const excerpt = extractPlainExcerpt(body);

  switch (type) {
    case "linkedin_post":
      return [
        `${title}`,
        "",
        excerpt,
        "",
        "The practical question: what decision, workflow, or buyer belief should this change next?",
      ].join("\n");
    case "facebook_post":
      return [
        `${title}`,
        "",
        excerpt,
        "",
        "Useful for anyone comparing options and trying to make the next step clearer.",
      ].join("\n");
    case "email_draft":
      return [
        `Subject: ${title}`,
        "",
        "Hi [Name],",
        "",
        excerpt,
        "",
        "I thought this might be useful context for the conversation you are already having.",
        "",
        "Todd",
      ].join("\n");
    case "ad_concept":
      return [
        `Concept: ${title}`,
        "Audience: Operators or buyers already feeling the problem described in the draft.",
        `Hook: ${excerpt}`,
        "CTA: Read the guide.",
      ].join("\n");
    case "summary":
      return [`Summary: ${title}`, "", excerpt].join("\n");
    case "executive_brief":
      return [
        `Executive Brief: ${title}`,
        "",
        `Core point: ${excerpt}`,
        "",
        "Operator implication: identify the decision or workflow this content should help move.",
        "Approval note: verify claims, examples, and source boundaries before external use.",
      ].join("\n");
  }
}

function extractPlainExcerpt(markdown: string) {
  const paragraph =
    markdown
      .split(/\n{2,}/)
      .map((block) =>
        block
          .replace(/^---[\s\S]*?---/, "")
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/^#+\s+/gm, "")
          .replace(/[*_`>#|[\]]/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .find((block) => block.length > 80) ?? markdown.replace(/\s+/g, " ").trim();

  return paragraph.length > 450 ? `${paragraph.slice(0, 447).trim()}...` : paragraph;
}
