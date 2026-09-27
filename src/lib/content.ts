export type CaseStudy = {
  slug: string;
  title: string;
  classification:
    | "Anonymized enterprise experience"
    | "Healthcare product experience"
    | "Live independent system"
    | "Method-portability evidence";
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
  /**
   * Internal governance only. Records what each case is admitted to support so
   * claims stay inside the approved boundary. Not rendered publicly — every
   * item here is already carried by the narrative fields above.
   */
  evidence: string[];
  evidenceLimit: string;
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
    title: "From CRM to Operating System: How a Growing Business Stopped Running on One Person's Memory",
    classification: "Live independent system",
    industry: "Relationship-driven sales · South Florida real estate",
    situation:
      "A South Florida real-estate business had every tool a growing business is told to buy: a CRM, email, texting, a website with guides and lead capture, content, marketing, and a steady flow of leads. The information was all there. The business still ran on one person.\n\nShe knew who mattered and why, what had happened with each of them, what was missing, what to send, and when a follow-up would help rather than annoy. None of the systems knew any of that. The person was the operating system.",
    complexity:
      "More leads made the problem worse, not better. Every new signal—a form fill, a guide download, a text reply, a repeat site visit—had to be noticed, remembered, reconciled with what was already known, and turned into a decision by a human, from memory, every day.\n\nThe CRM could store the records. It could not say what was true now, what mattered most, or what should happen next. And any automation had to respect the fact that the relationship is the business: a wrong message to the wrong person at the wrong time costs more than a missed one.",
    role:
      "I designed, built, and operate RachelOS myself: the data model, the decision rules, the queues, the automation, the approval workflow, and the measurement. I am also the one who watches it run and changes it when the evidence says the design was wrong.",
    intervention:
      "I did not try to build the finished system first. I built for the constraint in front of the business, watched what happened in production, and moved to the next constraint when the first one stopped being the bottleneck. The stages below are the real sequence.",
    result:
      "The judgment that lived in one person now lives in a system that runs every day: one relationship record per person, facts kept separate from guesses, a single ranked queue, a daily action email, and outreach drafts that a human approves before anything is sent.\n\nThe system is not finished, deliberately. The constraint has moved from capturing and seeing the work to converting it, and the current build is aimed there.",
    lesson:
      "Most businesses do not need another system of record. They need the layer that turns what their systems already know into what the team does next—built one constraint at a time, and kept under human judgment where the stakes are real.",
    relevance:
      "If your leads, customers, or jobs depend on someone remembering what happened and deciding what comes next, your business has the same shape. The industry changes the vocabulary, not the mechanism.",
    evidence: [
      "Direct founder design, implementation, and operation, with a single-author commit history (1,600+ commits from September 2025 to July 2026).",
      "Production mechanisms visible in redacted screens: queue, approval, relationship memory, and system health.",
      "86 database migrations, 240+ test files, and 100+ numbered design decisions, including recorded reversals.",
    ],
    evidenceLimit:
      "RachelOS is a system I built and run, not a client engagement. No revenue, conversion rate, or ROI is claimed: the attribution chain from system activity to closed transactions does not exist yet, and building it is part of the current stage. Screens are redacted and contain no real contact data.",
    relatedOffer: "Constraint Diagnostic",
    relatedOfferHref: "/services/constraint-diagnostic",
    stages: [
      {
        name: "Foundation: capture and memory",
        body: "Every call, text, email, form, and site visit lands in one relationship record. Facts are stored with their source, human-entered facts override AI-extracted ones, and the system tracks what it still doesn't know.",
      },
      {
        name: "Visibility: one queue, one daily email",
        body: "Instead of reconstructing the day from four tools, one ranked queue answers who needs attention and why, recomputed whenever something changes. A daily email turns that queue into the morning's work.",
      },
      {
        name: "Follow-up: drafts, with a human deciding",
        body: "The system drafts outreach, recommends the right guide to send, and flags the missing fact worth asking for next. Nothing goes to a customer until a person approves it.",
      },
      {
        name: "Now: conversion and advancement",
        body: "With capture and follow-up under control, the constraint moved. The current work is measuring and improving each step—response, qualification, conversation, appointment, representation, transaction, referral—starting with the attribution the system doesn't have yet.",
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
