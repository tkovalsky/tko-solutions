// Repurposing packs: turn one approved guide into the material Todd actually
// needs for outreach, recruiter calls, subcontracting conversations, proposals,
// and social publishing.
//
// Everything here is derived deterministically from the guide brief. There is no
// model call, because the brief already contains the raw material and a
// deterministic draft is cheaper to edit than a plausible-sounding invention.
//
// These are DRAFTS. Nothing in this module publishes, sends, or schedules
// anything — that stays a human action by design.

import type { Insight } from "@/lib/insights";
import { getGuideCluster } from "@/lib/guide-clusters";
import { getOffer, offerHref } from "@/lib/offers";

export type SuggestedLink = {
  href: string;
  label: string;
  reason: string;
};

export type RepurposingPack = {
  guideSlug: string;
  guideTitle: string;
  guideUrl: string;
  outreachExcerpt: string;
  executiveEmailAngle: string;
  networkPost: string;
  conversationPrompts: string[];
  proposalExcerpt: string;
  suggestedInternalLinks: SuggestedLink[];
  futureGuideQuestions: string[];
};

export function buildRepurposingPack(guide: Insight, allGuides: Insight[] = []): RepurposingPack {
  const { brief } = guide;
  const cluster = brief.cluster ? getGuideCluster(brief.cluster) : undefined;
  const offer = brief.offer ? getOffer(brief.offer) : undefined;
  const guideUrl = `/insights/${guide.slug}`;

  const problem = brief.buyerProblem ?? guide.description;
  const hypothesis = brief.problemHypothesis ?? "";
  const pointOfView = brief.pointOfView ?? "";

  return {
    guideSlug: guide.slug,
    guideTitle: guide.title,
    guideUrl,
    outreachExcerpt: buildOutreachExcerpt(problem, hypothesis, guide.title, guideUrl, brief.triggerSignal),
    executiveEmailAngle: buildEmailAngle(problem, pointOfView, brief.recommendedAction),
    networkPost: buildNetworkPost(guide.title, pointOfView, brief.aiNotAnswer, guideUrl),
    conversationPrompts: buildConversationPrompts(brief.diagnosticQuestions),
    proposalExcerpt: buildProposalExcerpt(problem, pointOfView, brief.relevantProof, offer?.name),
    suggestedInternalLinks: buildSuggestedLinks(guide, allGuides),
    futureGuideQuestions: buildFutureQuestions(brief.diagnosticQuestions, cluster?.boundary),
  };
}

function buildOutreachExcerpt(
  problem: string,
  hypothesis: string,
  title: string,
  guideUrl: string,
  trigger?: string,
) {
  const triggerLine = trigger
    ? `I noticed the pattern that usually precedes this: ${lowerFirst(trimPeriod(trigger))}.`
    : "";
  const hypothesisLine = hypothesis ? ` In my experience ${lowerFirst(trimPeriod(hypothesis))}.` : "";

  return [
    triggerLine,
    `${sentence(problem)}${hypothesisLine}`,
    `I wrote up how I diagnose it — "${title}" (${guideUrl}). No ask attached; it is useful whether or not we ever speak.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildEmailAngle(problem: string, pointOfView: string, recommendedAction?: string) {
  return [
    `Angle: ${sentence(problem)}`,
    pointOfView ? `Position: ${sentence(pointOfView)}` : "",
    recommendedAction ? `Ask: ${sentence(recommendedAction)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildNetworkPost(title: string, pointOfView: string, aiNotAnswer: string | undefined, guideUrl: string) {
  return [
    sentence(pointOfView || title),
    aiNotAnswer ? sentence(aiNotAnswer) : "",
    `Full piece: ${guideUrl}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildConversationPrompts(diagnosticQuestions: string[]) {
  // Three prompts is the working number for a 45-minute conversation.
  return diagnosticQuestions.slice(0, 3);
}

function buildProposalExcerpt(
  problem: string,
  pointOfView: string,
  relevantProof: string | undefined,
  offerName: string | undefined,
) {
  return [
    `Problem framing: ${sentence(problem)}`,
    pointOfView ? `Approach: ${sentence(pointOfView)}` : "",
    relevantProof ? `Relevant experience: ${sentence(relevantProof)}` : "",
    offerName ? `Proposed vehicle: ${offerName}.` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildSuggestedLinks(guide: Insight, allGuides: Insight[]): SuggestedLink[] {
  const links: SuggestedLink[] = [];
  const { brief } = guide;

  if (brief.offer) {
    const offer = getOffer(brief.offer);
    if (offer) {
      links.push({
        href: offerHref(offer.slug),
        label: offer.name,
        reason: "Mapped offer for this guide.",
      });
    }
  }

  for (const candidate of allGuides) {
    if (candidate.slug === guide.slug || !candidate.published) continue;
    if (candidate.brief.cluster && candidate.brief.cluster === brief.cluster) {
      links.push({
        href: `/insights/${candidate.slug}`,
        label: candidate.title,
        reason: "Same problem cluster.",
      });
    }
  }

  return links;
}

function buildFutureQuestions(diagnosticQuestions: string[], clusterBoundary?: string) {
  // Questions the guide raises but does not fully answer are the cheapest source
  // of the next guide in the cluster.
  const carried = diagnosticQuestions.slice(3);
  const boundaryPrompt = clusterBoundary
    ? [`Cluster boundary to respect in the next guide: ${sentence(clusterBoundary)}`]
    : [];

  return [...carried, ...boundaryPrompt];
}

function sentence(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.?!]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function trimPeriod(value: string) {
  return value.trim().replace(/\.$/, "");
}

function lowerFirst(value: string) {
  if (!value) return value;
  // Leave acronyms and proper nouns alone.
  if (value.slice(0, 2) === value.slice(0, 2).toUpperCase() && value.slice(0, 2).trim().length > 1) {
    return value;
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
}
