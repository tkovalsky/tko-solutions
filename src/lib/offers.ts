export type OfferSlug = "constraint-diagnostic" | "operating-system-build" | "operate-and-improve";

export type OfferTimelineStep = {
  period: string;
  title: string;
  description: string;
};

export type Offer = {
  slug: OfferSlug;
  name: string;
  shortName: string;
  level: "Diagnose" | "Build" | "Operate";
  step: string;
  duration: string;
  startingPrice: string;
  commercial: string;
  question: string;
  audience: string;
  summary: string;
  metaDescription: string;
  triggers: string[];
  deliverables: string[];
  boundaries: string[];
  expansionPath: string;
  capabilityTags: string[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  timeline?: OfferTimelineStep[];
  feeBoundary?: string;
  feeFraming?: string;
};

export const CONSTRAINT_CALL = {
  label: "Book a 30-Minute Call",
  shortLabel: "Book a Call",
  href: "/contact",
  duration: "30 minutes",
  summary:
    "Thirty minutes, no pitch deck. Tell me where the business keeps slowing down; I will tell you where I would look first and whether TKO is likely to help.",
  boundary:
    "The call is free and has no pitch deck. If a diagnostic isn't worth the money for your situation, I'll say so.",
  outputs: [
    "A clearer way to frame the problem",
    "Where I would look first",
    "A plain answer on whether TKO is the right fit",
  ],
} as const;

export const offers: Offer[] = [
  {
    slug: "constraint-diagnostic",
    name: "Constraint Diagnostic",
    shortName: "Diagnostic",
    level: "Diagnose",
    step: "Where to start",
    duration: "2 weeks",
    startingPrice: "$7,500",
    commercial: "$7,500 fixed · credited toward a build",
    question: "What is actually slowing the business down—and what is the smallest useful fix?",
    audience:
      "For an owner, COO, or department leader who can feel the drag—missed follow-up, slow handoffs, repeated decisions, too much work routing through one person—but cannot yet see the first fix clearly.",
    summary:
      "In two weeks, I follow one important flow end to end, talk with the people doing the work, and inspect the tools and handoffs around it. You leave with a clear diagnosis, a practical first build, and a starting point for measuring whether it helped.",
    metaDescription:
      "A two-week, fixed-price diagnostic for growing businesses: find where work gets stuck and define the smallest useful system to fix it. $7,500.",
    triggers: [
      "Leads, requests, or jobs enter the business but do not move consistently.",
      "The owner or COO is still the default router for routine decisions.",
      "The CRM holds records but does not guide the work.",
      "Handoffs depend on messages, spreadsheets, and memory.",
      "A key person is leaving, or the business has outgrown its current way of working.",
    ],
    deliverables: [
      "A plain-language diagnosis of where the work breaks down",
      "A map of the workflow, handoffs, systems, and decision owners",
      "The specific rules, states, or connections that are missing",
      "A focused specification and fixed price for the first build",
      "A simple baseline for judging whether the change helped",
      "A working session to decide what to do next",
    ],
    boundaries: [
      "One business unit or revenue motion. A whole-company assessment is scoped separately.",
      "No software or data is changed during the diagnostic.",
      "No outcome is promised before the starting point and first build are understood.",
      "There is no obligation to build with TKO. The specification is yours to use with anyone.",
    ],
    expansionPath:
      "If the first fix is worth building, the diagnostic ends with a fixed-price Operating System Build. The diagnostic fee is credited if that build starts within 30 days.",
    capabilityTags: ["Process and handoffs", "CRM and data", "Lead and customer follow-up", "Automation readiness"],
    faqs: [
      {
        q: "Is this a sales pitch in disguise?",
        a: "No. It is paid, fixed-scope work with a written report you keep, whether or not you hire me for anything else.",
      },
      {
        q: "How much of my team's time does it take?",
        a: "About 45 minutes each for up to six people, plus a walkthrough of your main systems. Most of the work happens on my side.",
      },
      {
        q: "Our data is a mess. Is that a problem?",
        a: "No. Messy data is usually part of the finding. The diagnostic shows which mess actually matters.",
      },
      {
        q: "Do you work in person?",
        a: "In South Florida, yes, if you prefer it. Everywhere else, the work runs remotely.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
    timeline: [
      {
        period: "Week 1",
        title: "Listen and look",
        description:
          "Conversations with the people doing the work, plus a walkthrough of the tools, handoffs, and records around one important flow.",
      },
      {
        period: "Week 2",
        title: "Follow the work",
        description:
          "Follow the work end to end. Find where it stalls, which decisions repeat, and who is compensating by hand.",
      },
      {
        period: "Readout",
        title: "Decide",
        description:
          "A clear diagnosis, a fixed-price plan for the first fix, a starting measure, and a plain recommendation—including if the answer is to leave it alone.",
      },
    ],
    feeBoundary:
      "Founding-client rate: the first three diagnostics are $5,000 in exchange for permission to publish the results (anonymized if you prefer) and a short reference call.",
  },
  {
    slug: "operating-system-build",
    name: "Operating System Build",
    shortName: "Build",
    level: "Build",
    step: "Fix the constraint",
    duration: "4–8 weeks",
    startingPrice: "$15,000",
    commercial: "From $15,000 · fixed price per phase",
    question: "Turn the diagnosis into a working system your team can use.",
    audience:
      "For a business that understands the bottleneck and wants someone to design, build, and launch the practical fix—not hand over another deck.",
    summary:
      "I design and build the missing operating loop around the tools you already use: clear states, ownership, queues, handoffs, alerts, and only the automation that makes the work easier. Then we launch it with the people who will use it.",
    metaDescription:
      "Fixed-price operating-system builds for growing businesses: follow-up systems, CRM operating layers, action queues, handoffs, and practical automation. From $15,000.",
    triggers: [
      "A diagnostic identified the constraint and the first fix.",
      "You know the problem, but earlier tools, agencies, or hires didn't fix it.",
      "The owner or COO wants to stop being the routing layer for the business.",
      "You want useful automation without handing important judgment to a black box.",
    ],
    deliverables: [
      "A working system in production, built around your existing tools wherever possible",
      "A clear state, owner, and next step for the work in scope",
      "A useful action view for what needs attention",
      "Automation for repeatable preparation, routing, and reminders",
      "Documentation and hands-on training for the people who use it",
      "A post-launch review against the starting baseline",
    ],
    boundaries: [
      "Scope and price are fixed per phase and agreed in writing before work starts.",
      "I build on your existing CRM and tools unless there is a clear reason not to.",
      "Approval and change rules are agreed before customer-facing or record-changing automation is enabled.",
      "You own what is built: code, configuration, and documentation.",
    ],
    expansionPath:
      "After launch, your team can own the system or TKO can continue with Operate & Improve. The next step is optional and separately scoped.",
    capabilityTags: [
      "Lead and customer follow-up systems",
      "CRM operating layers",
      "Action queues and handoffs",
      "Practical automation",
      "Institutional memory",
      "Reporting tied to action",
    ],
    faqs: [
      {
        q: "Will you replace our CRM?",
        a: "Rarely. The CRM is usually fine as a record. What's missing is the layer that turns records into the next action.",
      },
      {
        q: "Is this an AI project?",
        a: "Sometimes. It can help draft, summarize, sort, or spot missing information. If a simpler rule or workflow solves the problem, that is what I use instead.",
      },
      {
        q: "Who actually builds it?",
        a: "I do. The same person who learns the workflow is responsible for designing and building the fix.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
    feeFraming:
      "Builds start at $15,000. A typical first build is $18,000–$30,000; larger or multi-phase work is priced from the diagnostic.",
    feeBoundary:
      "Every build states the objective, the metric it should move, what is in and out of scope, and what you own at the end.",
  },
  {
    slug: "operate-and-improve",
    name: "Operate & Improve",
    shortName: "Operate & Improve",
    level: "Operate",
    step: "Keep it working",
    duration: "Monthly · 3-month minimum",
    startingPrice: "$3,000/mo",
    commercial: "$3,000–$6,000 per month",
    question: "Keep the system useful after launch.",
    audience:
      "For a business running a system TKO built, or one TKO has taken over, that wants it maintained, measured, and improved rather than left to drift.",
    summary:
      "I keep the operating loop healthy, fix what drifts, review what the team is seeing, and make one focused improvement at a time as the business changes.",
    metaDescription:
      "Ongoing care and improvement for a business operating system: monitoring, fixes, a monthly review, and focused improvements. $3,000–$6,000/month.",
    triggers: [
      "A build is live and you want it to keep working.",
      "The business changes faster than anyone updates the system.",
      "You want one person accountable for keeping the workflow useful as the business changes.",
    ],
    deliverables: [
      "Monitoring and fixes",
      "A monthly metric review against the baseline",
      "One improvement shipped each month",
      "A quarterly review of what is limiting the business now",
      "Priority changes when the business changes",
    ],
    boundaries: [
      "Covers systems TKO built or has formally taken over.",
      "Improvement work is capped each month. Larger changes are scoped as a new build.",
      "Cancel with 30 days' notice after the minimum term.",
      "Not a help desk for unrelated IT.",
    ],
    expansionPath:
      "When the quarterly review finds a new constraint worth fixing, it becomes the next build. If you need senior operating help beyond the system, a fractional arrangement can be discussed.",
    capabilityTags: ["Monitoring", "Measurement", "Continuous improvement", "Constraint review"],
    faqs: [
      {
        q: "Why not just maintain it ourselves?",
        a: "You can—you own it. Most teams find the system slowly drifts from how the business actually runs. This keeps someone accountable for closing that gap.",
      },
      {
        q: "What determines the monthly price?",
        a: "The number of systems and integrations involved, and how often the business changes the workflow.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}

export function isOfferSlug(value: string): value is OfferSlug {
  return offers.some((offer) => offer.slug === value);
}

export function offerHref(slug: OfferSlug) {
  return `/services/${slug}`;
}
