import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

/** Editorial state. Only `published` guides are readable by the public site. */
export type GuideStatus = "draft" | "in_review" | "published";

export const guideStatuses: readonly GuideStatus[] = ["draft", "in_review", "published"];

/**
 * The structured guide brief. It is authored in frontmatter alongside the guide
 * body so the commercial intent of a guide travels with the guide itself rather
 * than living in a separate planning system.
 *
 * Every field is optional at parse time; `validateGuides` is what enforces
 * completeness before a guide is allowed to be `published`.
 */
export type GuideBrief = {
  cluster?: string;
  primaryBuyer?: string;
  buyerProblem?: string;
  triggerSignal?: string;
  searchIntent?: string;
  problemHypothesis?: string;
  pointOfView?: string;
  relevantProof?: string;
  aiUseful?: string;
  aiNotAnswer?: string;
  diagnosticQuestions: string[];
  recommendedAction?: string;
  offer?: string;
  cta?: string;
  reviewer?: string;
  reviewedDate?: string;
};

export type Insight = {
  title: string;
  description: string;
  business_unit?: string;
  voice?: string;
  sources: string[];
  date: string;
  slug: string;
  status: GuideStatus;
  published: boolean;
  featured: boolean;
  brief: GuideBrief;
  body: string;
  html: string;
  wordCount: number;
  readingTime: number;
  sourceCount: number;
};

type RawFrontmatter = {
  title?: unknown;
  description?: unknown;
  business_unit?: unknown;
  voice?: unknown;
  sources?: unknown;
  date?: unknown;
  slug?: unknown;
  published?: unknown;
  featured?: unknown;
  status?: unknown;
  cluster?: unknown;
  primary_buyer?: unknown;
  buyer_problem?: unknown;
  trigger_signal?: unknown;
  search_intent?: unknown;
  problem_hypothesis?: unknown;
  point_of_view?: unknown;
  relevant_proof?: unknown;
  ai_useful?: unknown;
  ai_not_answer?: unknown;
  diagnostic_questions?: unknown;
  recommended_action?: unknown;
  offer?: unknown;
  cta?: unknown;
  reviewer?: unknown;
  reviewed_date?: unknown;
};

const INSIGHTS_DIR = path.join(process.cwd(), "src/content/insights");
const WORDS_PER_MINUTE = 200;

/** Every guide on disk, regardless of editorial state. Used by validation and the operator console. */
export function getAllInsights(contentDir = INSIGHTS_DIR): Insight[] {
  if (!existsSync(contentDir)) {
    return [];
  }

  return readdirSync(contentDir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => readInsightFile(contentDir, filename))
    .sort(compareInsights);
}

/** Published guides only. This is what the public site renders. */
export function getInsights(contentDir = INSIGHTS_DIR): Insight[] {
  return getAllInsights(contentDir).filter((insight) => insight.published);
}

/** Published guides grouped by problem cluster, in the cluster order defined by the caller. */
export function getInsightsByCluster(contentDir = INSIGHTS_DIR): Map<string, Insight[]> {
  const grouped = new Map<string, Insight[]>();

  for (const insight of getInsights(contentDir)) {
    const cluster = insight.brief.cluster ?? "unclustered";
    grouped.set(cluster, [...(grouped.get(cluster) ?? []), insight]);
  }

  return grouped;
}

export function getInsight(slug: string, contentDir = INSIGHTS_DIR) {
  return getInsights(contentDir).find((insight) => insight.slug === slug) ?? null;
}

export function getRelatedInsights(slug: string, contentDir = INSIGHTS_DIR) {
  const insights = getInsights(contentDir);
  const current = insights.find((insight) => insight.slug === slug);

  if (!current) {
    return [];
  }

  // Problem cluster is the strongest relatedness signal now that guides are
  // organized around executive problems; business unit remains the fallback.
  const sameCluster = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      current.brief.cluster &&
      insight.brief.cluster === current.brief.cluster,
  );
  const sameBusinessUnit = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      current.business_unit &&
      insight.business_unit === current.business_unit &&
      !sameCluster.some((related) => related.slug === insight.slug),
  );
  const recentFallback = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      !sameCluster.some((related) => related.slug === insight.slug) &&
      !sameBusinessUnit.some((related) => related.slug === insight.slug),
  );

  return [...sameCluster, ...sameBusinessUnit, ...recentFallback].slice(0, 3);
}

function readInsightFile(contentDir: string, filename: string): Insight {
  const filepath = path.join(contentDir, filename);
  const raw = readFileSync(filepath, "utf8");
  const { frontmatter, body } = parseMarkdownFile(raw);
  const slug = toStringValue(frontmatter.slug) || filename.replace(/\.md$/, "");
  const sources = toStringArray(frontmatter.sources);
  const plainText = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_\-[\]()]/g, " ");
  const words = plainText.match(/\b[\w']+\b/g) ?? [];
  const status = resolveStatus(frontmatter);

  return {
    title: requiredString(frontmatter.title, filepath, "title"),
    description: requiredString(frontmatter.description, filepath, "description"),
    business_unit: toStringValue(frontmatter.business_unit),
    voice: toStringValue(frontmatter.voice),
    sources,
    date: requiredString(frontmatter.date, filepath, "date"),
    slug,
    status,
    published: status === "published",
    featured: frontmatter.featured === undefined ? false : toBoolean(frontmatter.featured),
    brief: {
      cluster: toStringValue(frontmatter.cluster),
      primaryBuyer: toStringValue(frontmatter.primary_buyer),
      buyerProblem: toStringValue(frontmatter.buyer_problem),
      triggerSignal: toStringValue(frontmatter.trigger_signal),
      searchIntent: toStringValue(frontmatter.search_intent),
      problemHypothesis: toStringValue(frontmatter.problem_hypothesis),
      pointOfView: toStringValue(frontmatter.point_of_view),
      relevantProof: toStringValue(frontmatter.relevant_proof),
      aiUseful: toStringValue(frontmatter.ai_useful),
      aiNotAnswer: toStringValue(frontmatter.ai_not_answer),
      diagnosticQuestions: toStringArray(frontmatter.diagnostic_questions),
      recommendedAction: toStringValue(frontmatter.recommended_action),
      offer: toStringValue(frontmatter.offer),
      cta: toStringValue(frontmatter.cta),
      reviewer: toStringValue(frontmatter.reviewer),
      reviewedDate: toStringValue(frontmatter.reviewed_date),
    },
    body,
    html: marked.parse(body, { async: false }) as string,
    wordCount: words.length,
    readingTime: Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE)),
    sourceCount: sources.length,
  };
}

/**
 * `status` is authoritative. The legacy `published` boolean is still honoured so
 * pre-brief guides keep behaving the way they did before the guide model landed.
 */
function resolveStatus(frontmatter: RawFrontmatter): GuideStatus {
  const declared = toStringValue(frontmatter.status);
  if (declared && (guideStatuses as readonly string[]).includes(declared)) {
    return declared as GuideStatus;
  }

  if (frontmatter.published !== undefined && !toBoolean(frontmatter.published)) {
    return "draft";
  }

  return "published";
}

function parseMarkdownFile(raw: string): { frontmatter: RawFrontmatter; body: string } {
  if (!raw.startsWith("---")) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const frontmatterRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();

  return { frontmatter: parseFrontmatter(frontmatterRaw), body };
}

function parseFrontmatter(frontmatter: string): RawFrontmatter {
  const parsed: Record<string, unknown> = {};
  const lines = frontmatter.split(/\r?\n/);
  let activeArrayKey: string | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    if (activeArrayKey && trimmed.startsWith("- ")) {
      const values = parsed[activeArrayKey];
      if (Array.isArray(values)) {
        values.push(parseScalar(trimmed.slice(2)));
      }
      continue;
    }

    const match = trimmed.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!match) {
      activeArrayKey = null;
      continue;
    }

    const [, key, rawValue = ""] = match;
    if (rawValue === ">" || rawValue === ">-" || rawValue === "|" || rawValue === "|-") {
      const blockLines: string[] = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        blockLines.push(lines[index].trim());
      }
      parsed[key] = blockLines.join(rawValue.startsWith("|") ? "\n" : " ").trim();
      activeArrayKey = null;
      continue;
    }

    if (rawValue === "") {
      parsed[key] = [];
      activeArrayKey = key;
      continue;
    }

    parsed[key] = parseScalar(rawValue);
    activeArrayKey = null;
  }

  return parsed;
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();
  const withoutComment = trimmed.replace(/\s+#.*$/, "").trim();

  if (
    (withoutComment.startsWith('"') && withoutComment.endsWith('"')) ||
    (withoutComment.startsWith("'") && withoutComment.endsWith("'"))
  ) {
    return withoutComment.slice(1, -1);
  }

  if (withoutComment === "true") return true;
  if (withoutComment === "false") return false;
  if (withoutComment === "null") return null;

  if (withoutComment.startsWith("[") && withoutComment.endsWith("]")) {
    return withoutComment
      .slice(1, -1)
      .split(",")
      .map((item) => parseScalar(item))
      .filter((item) => item !== "");
  }

  return withoutComment;
}

function requiredString(value: unknown, filepath: string, field: string) {
  const stringValue = toStringValue(value);
  if (!stringValue) {
    throw new Error(`Insight ${filepath} is missing required frontmatter: ${field}`);
  }

  return stringValue;
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : undefined;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  const stringValue = toStringValue(value);
  return stringValue ? [stringValue] : [];
}

function toBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() !== "false";
  return Boolean(value);
}

function compareInsights(a: Insight, b: Insight) {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
