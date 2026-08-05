// Problem and intent clusters for TKO guides.
//
// Guides are organized around expensive executive problems, not generic
// thought-leadership categories. Each cluster owns one pillar guide; supporting
// guides are added only when they answer a genuinely distinct question.
//
// Cannibalization rule: two clusters may share vocabulary but must not share
// search intent. Where the boundary is subtle it is stated explicitly in
// `boundary` so a new guide can be placed without guessing.

import type { OfferSlug } from "@/lib/offers";

export type GuideClusterSlug =
  | "stalled-healthcare-transformation"
  | "transformation-program-recovery"
  | "prior-authorization-operations"
  | "utilization-management-operations"
  | "decision-rights-and-exception-routing"
  | "ai-readiness-for-healthcare-workflows"
  | "human-workarounds-and-human-apis"
  | "interoperability-implementation"
  | "provider-performance-and-network-operations"
  | "administrative-cost-reduction";

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
    slug: "stalled-healthcare-transformation",
    name: "Stalled healthcare transformation",
    executiveProblem:
      "A funded program has stopped producing visible progress and leadership cannot agree on why.",
    searchIntent:
      "Diagnostic — an executive is trying to name the cause before committing more money or people.",
    boundary:
      "Diagnosis only. What to do once the cause is known belongs to transformation-program-recovery.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "transformation-program-recovery",
    name: "Transformation program recovery",
    executiveProblem:
      "The cause is understood and leadership now has to decide how to restructure, resequence, or stop the program.",
    searchIntent:
      "Prescriptive — an executive is looking for the mechanics of a recovery, not the diagnosis.",
    boundary:
      "Recovery mechanics only. Naming why a program stalled belongs to stalled-healthcare-transformation.",
    primaryOffer: "fractional-transformation-lead",
  },
  {
    slug: "prior-authorization-operations",
    name: "Prior authorization operations",
    executiveProblem:
      "Prior authorization consumes staff effort and produces inconsistent results that automation has not fixed.",
    searchIntent:
      "Operational — a leader is looking for how to measure, sequence, and improve the PA workflow.",
    boundary:
      "The PA workflow end to end. The authority model underneath it belongs to decision-rights-and-exception-routing.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "utilization-management-operations",
    name: "Utilization management operations",
    executiveProblem:
      "Review throughput and consistency depend on which experienced reviewer is working.",
    searchIntent:
      "Operational — prioritization, missing-information detection, and reviewer consistency.",
    boundary:
      "Clinical review operations. Administrative authorization submission belongs to prior-authorization-operations.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "decision-rights-and-exception-routing",
    name: "Decision rights and exception routing",
    executiveProblem:
      "Nobody can state who is authorized to decide what, so exceptions stall and decisions cannot be audited.",
    searchIntent:
      "Structural — a leader is looking for how to make an implicit authority model explicit.",
    boundary:
      "The authority and escalation model itself, in any workflow. Domain-specific application belongs to the domain cluster.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "ai-readiness-for-healthcare-workflows",
    name: "AI readiness for healthcare workflows",
    executiveProblem:
      "An AI investment is being proposed and leadership cannot tell whether the workflow underneath it is ready.",
    searchIntent:
      "Evaluative — an executive is testing whether to fund, defer, or stop an AI initiative.",
    boundary:
      "Whether and when AI is appropriate. How AI changed delivery economics belongs to the delivery-model evidence in this cluster's supporting guides.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "human-workarounds-and-human-apis",
    name: "Human workarounds and human APIs",
    executiveProblem:
      "Critical operational knowledge lives in a few people, so the organization cannot operate without them.",
    searchIntent:
      "Conceptual — a leader recognizes the symptom and is looking for a name and a remedy for it.",
    boundary:
      "The portable pattern across industries. Healthcare-specific instances belong to their domain cluster.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "interoperability-implementation",
    name: "Interoperability implementation",
    executiveProblem:
      "Regulatory data-exchange requirements have to become working operational behavior, not documentation.",
    searchIntent:
      "Implementation — CMS, FHIR, access control, auditability, and onboarding as operating problems.",
    boundary:
      "Regulated data exchange and its operating controls. Prior authorization APIs are referenced here but owned by prior-authorization-operations.",
    primaryOffer: "specialist-subcontract",
  },
  {
    slug: "provider-performance-and-network-operations",
    name: "Provider performance and network operations",
    executiveProblem:
      "Provider-facing programs vary in performance and the operating causes are not visible.",
    searchIntent:
      "Operational — network, provider experience, and program administration.",
    boundary:
      "Provider-facing operations. Internal clinical review belongs to utilization-management-operations.",
    primaryOffer: "program-recovery-review",
  },
  {
    slug: "administrative-cost-reduction",
    name: "Administrative cost reduction",
    executiveProblem:
      "Administrative expense is a board-level target and the addressable causes have not been separated from the fixed ones.",
    searchIntent:
      "Financial — an executive is looking for where administrative cost is actually created.",
    boundary:
      "Cost causation and sizing. The workflow remedies belong to the relevant operational cluster.",
    primaryOffer: "program-recovery-review",
  },
];

const clustersBySlug = new Map(guideClusters.map((cluster) => [cluster.slug, cluster]));

export function getGuideCluster(slug: string): GuideCluster | undefined {
  return clustersBySlug.get(slug as GuideClusterSlug);
}

export function isGuideClusterSlug(value: string): value is GuideClusterSlug {
  return clustersBySlug.has(value as GuideClusterSlug);
}
