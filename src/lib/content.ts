export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  /** Public narrative fields. Paragraphs are separated by a blank line. */
  situation: string;
  complexity: string;
  role: string;
  intervention: string;
  result: string;
  /** The generalized principle. Rendered above `relevance` as one block. */
  lesson: string;
  /** The buyer turn, second person. Rendered directly below `lesson`. */
  relevance: string;
  relatedOffer: string;
  relatedOfferHref: string;
  /** Optional constraint history: how the binding constraint moved as the system matured. */
  stages?: { name: string; body: string }[];
};

// Public proof. Enterprise healthcare and CRE cases were retired from the public site in the
// 2026-09 repositioning (see docs/strategy/TKO_REPOSITIONING_DECISION_PACK_2026_09_27.md);
// their text remains in git history.
export const caseStudies: CaseStudy[] = [
  {
    slug: "from-crm-to-operating-system",
    title: "RachelOS: Turning Scattered Follow-Up Into a Working System",
    industry: "Relationship-driven business",
    situation:
      "The business had a CRM, email, texting, a website, and a growing book of relationships. The information existed, but the operating logic did not.\n\nOne person still had to remember who mattered, what had happened, what was missing, and what should happen next. The tools stored pieces of the work. The person connected them.",
    complexity:
      "More activity created more decisions. A form fill, reply, note, or change in timing could alter the next step, but that context was spread across systems and conversations.\n\nThe challenge was not collecting more data. It was turning the data already there into a clear, usable workflow without automating away the judgment that made the relationships valuable.",
    role:
      "I designed and built RachelOS end to end: the data model, operating rules, queues, relationship memory, communication workflows, and operator screens.",
    intervention:
      "I built it in small operating loops. First make the work visible. Then preserve the context. Then support the next action. Add automation only where it makes the operator's job easier and keeps important judgment in human hands.",
    result:
      "RachelOS turned a scattered set of records and signals into a coherent way to work: shared context, visible next actions, clearer handoffs, and support for communication without pretending the relationship can be fully automated.\n\nThe important proof is not a feature count. It is that the operating problem could be understood, translated into rules and interfaces, and built into a working system.",
    lesson:
      "Most growing businesses do not need another place to store information. They need a clearer way to turn the information they already have into coordinated action.",
    relevance:
      "If leads, customers, jobs, or internal requests depend on one person remembering the context and routing the next step, the operating problem is the same even when the industry is different.",
    relatedOffer: "Managed Follow-Up",
    relatedOfferHref: "/products/ambient-crm",
    stages: [
      {
        name: "Make the work visible",
        body: "Bring the useful relationship activity and context into one place where the operator can understand what is happening.",
      },
      {
        name: "Give the day a starting point",
        body: "Turn scattered signals into a practical view of what needs attention and why.",
      },
      {
        name: "Keep the context",
        body: "Preserve what matters about the relationship so the next conversation does not start from scratch.",
      },
      {
        name: "Support judgment",
        body: "Use drafting, recommendations, and automation to prepare the work while leaving important relationship decisions with the operator.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** First paragraph only — for cards, metadata, and other summary surfaces. */
export function leadParagraph(body: string) {
  return body.split("\n\n")[0];
}
