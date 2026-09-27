// Problem and intent clusters for TKO guides.
//
// Guides are organized around the problems growing-business owners and operators
// actually search for, not generic thought-leadership categories. Each cluster owns one pillar guide; supporting
// guides are added only when they answer a genuinely distinct question.
//
// Cannibalization rule: two clusters may share vocabulary but must not share
// search intent. Where the boundary is subtle it is stated explicitly in
// `boundary` so a new guide can be placed without guessing.

import type { OfferSlug } from "@/lib/offers";

export type GuideClusterSlug =
  | "lead-follow-up-and-revenue-leakage"
  | "owner-as-operating-system"
  | "systems-that-dont-drive-action"
  | "ai-in-operations"
  | "what-to-fix-first";

export type GuideCluster = {
  slug: GuideClusterSlug;
  name: string;
  executiveProblem: string;
  searchIntent: string;
  boundary: string;
  primaryOffer: OfferSlug;
};

export const guideClusters: GuideCluster[] = [
  {
    slug: "lead-follow-up-and-revenue-leakage",
    name: "Lead follow-up and revenue leakage",
    executiveProblem:
      "Leads come in, follow-up depends on who remembers, and revenue leaks between first contact and close.",
    searchIntent:
      "Problem-aware: an owner or sales leader wants to know why leads disappear and how to stop it.",
    boundary:
      "The path from first contact to closed business and referral. The owner's general bottleneck belongs to owner-as-operating-system.",
    primaryOffer: "constraint-diagnostic",
  },
  {
    slug: "owner-as-operating-system",
    name: "When a person is the operating system",
    executiveProblem:
      "The owner, COO, or a few key people hold the judgment that connects the business, so everything waits on them.",
    searchIntent:
      "Problem-aware: a leader recognizes the bottleneck or key-person risk and wants a name and a remedy.",
    boundary:
      "Key-person dependency and institutional knowledge across the business. Lead-specific follow-up belongs to lead-follow-up-and-revenue-leakage.",
    primaryOffer: "constraint-diagnostic",
  },
  {
    slug: "systems-that-dont-drive-action",
    name: "Systems that don't drive action",
    executiveProblem:
      "The CRM, dashboards, and apps hold information, but none of them tell anyone what to do next.",
    searchIntent:
      "Problem- and solution-aware: why CRM implementations disappoint, why dashboards don't change behavior, systems of record versus systems of action.",
    boundary:
      "The gap between stored information and executed work. Whether and how to add AI belongs to ai-in-operations.",
    primaryOffer: "operating-system-build",
  },
  {
    slug: "ai-in-operations",
    name: "AI in operations",
    executiveProblem:
      "AI tools are multiplying without an operating model, and nothing measurable has changed.",
    searchIntent:
      "Solution-aware: how to use AI in day-to-day operations without an AI team and without losing human judgment.",
    boundary:
      "Where AI belongs in a workflow and how it is governed. General system fragmentation belongs to systems-that-dont-drive-action.",
    primaryOffer: "operating-system-build",
  },
  {
    slug: "what-to-fix-first",
    name: "What to fix first",
    executiveProblem:
      "There are too many things to fix and no defensible way to pick the one that matters most.",
    searchIntent:
      "Solution-aware: what to automate first, how to find workflow and automation opportunities, how to reduce manual work.",
    boundary:
      "Prioritization and sizing across the business. The remedies belong to the relevant problem cluster.",
    primaryOffer: "constraint-diagnostic",
  },
];

const clustersBySlug = new Map(guideClusters.map((cluster) => [cluster.slug, cluster]));

export function getGuideCluster(slug: string): GuideCluster | undefined {
  return clustersBySlug.get(slug as GuideClusterSlug);
}

export function isGuideClusterSlug(value: string): value is GuideClusterSlug {
  return clustersBySlug.has(value as GuideClusterSlug);
}
