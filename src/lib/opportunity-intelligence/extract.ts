import type {
  ExtractedOpportunityFact,
  OpportunityExtraction,
  OpportunityFactField,
  ResearchGapCandidate,
} from "./contracts";
import { normalizeFactValue } from "./sources/normalize";

type TextSpan = {
  text: string;
  startOffset: number;
  endOffset: number;
};

const TECHNOLOGIES = [
  "Google Cloud",
  "machine learning",
  "ServiceNow",
  "Salesforce",
  "Databricks",
  "Snowflake",
  "Workday",
  "Python",
  "Oracle",
  "Azure",
  "Epic",
  "FHIR",
  "HL7",
  "AWS",
  "SAP",
  "SQL",
  "AI",
] as const;

const REQUIRED_INPUT_GAPS: Record<
  Exclude<OpportunityFactField, "opportunity_title">,
  Omit<ResearchGapCandidate, "gapKey">
> = {
  reporting_line: {
    question: "Who owns or sponsors this work?",
    reason: "The reporting line helps identify budget authority and the eventual relationship path.",
  },
  business_problem: {
    question: "What business problem is the organization paying to solve?",
    reason: "A concrete problem is required to distinguish funded work from a generic role description.",
  },
  technology: {
    question: "Which platforms or technologies constrain the work?",
    reason: "Technology context can materially change delivery fit and implementation risk.",
  },
  urgency: {
    question: "What makes the work urgent now?",
    reason: "Timing evidence separates an active funded need from evergreen recruiting language.",
  },
  responsibility: {
    question: "What outcomes would this opportunity own?",
    reason: "Explicit ownership is needed to evaluate delivery fit and seniority.",
  },
  compensation: {
    question: "What compensation or engagement value is attached to the work?",
    reason: "Economic evidence is needed to test whether the opportunity clears the operator's value floor.",
  },
  transformation_language: {
    question: "Is this maintenance work or a true transformation mandate?",
    reason: "Transformation language is a core fit signal for the todd-v1 capability profile.",
  },
};

function sentenceSpans(rawContent: string): TextSpan[] {
  const spans: TextSpan[] = [];
  const pattern = /[^.!?\n]+(?:[.!?]+|(?=\n|$))/g;

  for (const match of rawContent.matchAll(pattern)) {
    const untrimmed = match[0];
    const matchStart = match.index ?? 0;
    const leading = untrimmed.length - untrimmed.trimStart().length;
    const text = untrimmed.trim();
    if (!text) {
      continue;
    }
    const startOffset = matchStart + leading;
    spans.push({
      text,
      startOffset,
      endOffset: startOffset + text.length,
    });
  }

  return spans;
}

function firstNonemptyLine(rawContent: string): TextSpan | null {
  const pattern = /[^\r\n]+/g;
  for (const match of rawContent.matchAll(pattern)) {
    const untrimmed = match[0];
    const text = untrimmed.trim();
    if (!text) {
      continue;
    }
    const leading = untrimmed.length - untrimmed.trimStart().length;
    const startOffset = (match.index ?? 0) + leading;
    return { text, startOffset, endOffset: startOffset + text.length };
  }
  return null;
}

export function extractOpportunity(rawContent: string): OpportunityExtraction {
  const facts: ExtractedOpportunityFact[] = [];
  const seen = new Set<string>();
  const ordinals = new Map<OpportunityFactField, number>();

  const addFact = (
    field: OpportunityFactField,
    value: string,
    span: TextSpan,
    confidence: number,
  ) => {
    const normalizedValue = normalizeFactValue(value);
    const dedupeKey = `${field}:${normalizedValue}`;
    if (!normalizedValue || seen.has(dedupeKey)) {
      return;
    }
    seen.add(dedupeKey);
    const ordinal = ordinals.get(field) ?? 0;
    ordinals.set(field, ordinal + 1);
    facts.push({
      field,
      value: value.trim(),
      normalizedValue,
      ordinal,
      basis: "stated",
      confidence,
      startOffset: span.startOffset,
      endOffset: span.endOffset,
      excerpt: span.text,
    });
  };

  const title = firstNonemptyLine(rawContent);
  if (title && title.text.length <= 180) {
    addFact("opportunity_title", title.text, title, 75);
  }

  for (const span of sentenceSpans(rawContent)) {
    if (
      /\breport(?:s|ing)?\s+(?:directly\s+)?to\b/i.test(span.text) ||
      /\breporting relationship\b/i.test(span.text)
    ) {
      addFact("reporting_line", span.text, span, 90);
    }

    if (
      /\b(challenge|problem|improv\w*|reduc\w*|moderniz\w*|optimiz\w*|streamlin\w*|scale|growth|efficien\w*|costs?|quality|access|turnaround)\b/i.test(
        span.text,
      )
    ) {
      addFact("business_problem", span.text, span, 80);
    }

    for (const technology of TECHNOLOGIES) {
      const escaped = technology.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${escaped}\\b`, "i").test(span.text)) {
        addFact("technology", technology, span, 95);
      }
    }

    if (
      /\b(urgent|immediate\w*|rapid\w*|first\s+\d+\s+days|as soon as possible|deadline|time-sensitive|now)\b/i.test(
        span.text,
      )
    ) {
      addFact("urgency", span.text, span, 85);
    }

    if (
      /\b(responsible for|lead\w*|own\w*|oversee\w*|manage\w*|drive\w*|deliver\w*|implement\w*|build\w*|scale\w*)\b/i.test(
        span.text,
      )
    ) {
      addFact("responsibility", span.text, span, 85);
    }

    if (
      /(?:[$€£]\s?\d[\d,.]*(?:\s?(?:-|–|to)\s?[$€£]?\s?\d[\d,.]*)?(?:\s?(?:k|m|per year|annually|\/yr|\/year|\/month))?)|\b(?:salary|compensation|pay range|hourly rate)\b/i.test(
        span.text,
      )
    ) {
      addFact("compensation", span.text, span, 95);
    }

    if (
      /\b(transform\w*|moderniz\w*|turnaround|operating model|enterprise change|program recovery|digital change)\b/i.test(
        span.text,
      )
    ) {
      addFact("transformation_language", span.text, span, 90);
    }
  }

  const presentFields = new Set(facts.map((fact) => fact.field));
  const researchGaps = Object.entries(REQUIRED_INPUT_GAPS)
    .filter(([field]) => !presentFields.has(field as OpportunityFactField))
    .map(([field, gap]) => ({
      gapKey: `${field}_missing`,
      ...gap,
    }));

  researchGaps.push({
    gapKey: "opportunity_thesis_missing",
    question: "Why is this organization spending money, what changed, and who cares?",
    reason:
      "Slice A1 extracts thesis inputs but leaves the commercial conclusion to the operator until inferred thesis generation is explicitly added.",
  });

  return { facts, researchGaps };
}

export function verifyEvidenceOffsets(
  rawContent: string,
  fact: ExtractedOpportunityFact,
): boolean {
  return rawContent.slice(fact.startOffset, fact.endOffset) === fact.excerpt;
}
