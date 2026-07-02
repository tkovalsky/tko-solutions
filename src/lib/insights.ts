import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Insight = {
  title: string;
  description: string;
  business_unit?: string;
  voice?: string;
  sources: string[];
  date: string;
  slug: string;
  published: boolean;
  featured: boolean;
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
};

const INSIGHTS_DIR = path.join(process.cwd(), "src/content/insights");
const WORDS_PER_MINUTE = 200;

export function getInsights(contentDir = INSIGHTS_DIR): Insight[] {
  if (!existsSync(contentDir)) {
    return [];
  }

  return readdirSync(contentDir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => readInsightFile(contentDir, filename))
    .filter((insight) => insight.published)
    .sort(compareInsights);
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

  const sameBusinessUnit = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      current.business_unit &&
      insight.business_unit === current.business_unit,
  );
  const recentFallback = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      !sameBusinessUnit.some((related) => related.slug === insight.slug),
  );

  return [...sameBusinessUnit, ...recentFallback].slice(0, 3);
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

  return {
    title: requiredString(frontmatter.title, filepath, "title"),
    description: requiredString(frontmatter.description, filepath, "description"),
    business_unit: toStringValue(frontmatter.business_unit),
    voice: toStringValue(frontmatter.voice),
    sources,
    date: requiredString(frontmatter.date, filepath, "date"),
    slug,
    published: frontmatter.published === undefined ? true : toBoolean(frontmatter.published),
    featured: frontmatter.featured === undefined ? false : toBoolean(frontmatter.featured),
    body,
    html: marked.parse(body, { async: false }) as string,
    wordCount: words.length,
    readingTime: Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE)),
    sourceCount: sources.length,
  };
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
