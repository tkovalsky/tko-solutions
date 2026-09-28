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
    "Thirty minutes, no pitch deck. You describe what's stuck; I tell you where I would look first, and whether a paid diagnostic is worth it for your business.",
  boundary:
    "The call is free and has no pitch deck. If a diagnostic isn't worth the money for your situation, I'll say so.",
  outputs: [
    "Where I would look first",
    "Whether the problem is worth a paid diagnostic",
    "A plain answer on whether TKO is the right help",
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
    question: "Where is the business actually losing time and money, and what should you fix first?",
    audience:
      "For an owner, COO, or department head of a growing business—typically $5M or more in revenue—who knows the company runs below its potential but can't yet point to the one thing to fix.",
    summary:
      "Two weeks to find the constraint costing you the most. I talk to the people doing the work, walk through your systems and a sample of real records, trace where leads, work, and decisions stall, and estimate what that costs. You get a written report, a fixed-price plan for the first fix, and a baseline to measure it against.",
    metaDescription:
      "A 2-week, fixed-price operations diagnostic for growing businesses: find where leads, work, and decisions stall, what it costs, and what to fix first. $7,500.",
    triggers: [
      "Leads come in, but revenue doesn't follow—and nobody can say exactly where they go.",
      "Everything routes through the owner or COO.",
      "You have a CRM, but nobody trusts it and it doesn't tell anyone what to do.",
      "People spend hours copying information from one system into another.",
      "You bought AI tools and nothing measurable changed.",
      "A key person is leaving, or the business has outgrown the way it was set up.",
    ],
    deliverables: [
      "Constraint Report: where leads, work, and decisions stall, and what it costs in dollars and hours",
      "A map of the people who are holding the business together by hand",
      "A system map: which tool holds which information, and where the handoffs break",
      "The missing rules: what should happen next, when, and who decides",
      "A fixed-price specification for the first build",
      "A measurement baseline, so the fix can be proven",
      "A 60-minute readout and a 90-day plan",
    ],
    boundaries: [
      "One business unit or revenue motion. A whole-company assessment is scoped separately.",
      "No software or data is changed during the diagnostic.",
      "Findings use your numbers. No savings are promised before a baseline exists.",
      "There is no obligation to build with TKO. The specification is yours to use with anyone.",
    ],
    expansionPath:
      "If the fix is worth building, the report includes a fixed-price Operating System Build. The full diagnostic fee is credited if the build starts within 30 days.",
    capabilityTags: ["Process and handoffs", "CRM and data", "Revenue follow-up", "Automation and AI readiness"],
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
          "Conversations with the people doing the work, walkthroughs of your CRM, inbox, spreadsheets, and tools, and a sample of real records.",
      },
      {
        period: "Week 2",
        title: "Trace and size",
        description:
          "Follow leads, jobs, and decisions end to end. Find where they stall, who is compensating by hand, and what it costs.",
      },
      {
        period: "Readout",
        title: "Decide",
        description:
          "A written report, a fixed-price plan for the first fix, a measurement baseline, and a plain recommendation—including if the answer is to do nothing.",
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
    question: "Build the system that fixes it—and prove it worked.",
    audience:
      "For a business that knows its constraint—from a diagnostic or its own analysis—and wants a working system, not another recommendation.",
    summary:
      "I build the missing operating layer on top of the tools you already use: the rules, statuses, queues, automation, and AI assistance that turn what your systems know into what your team does next. Then we measure the result against the baseline.",
    metaDescription:
      "Fixed-price business operating system builds for growing companies: follow-up systems, CRM operating layers, daily action queues, and AI-assisted workflows with human approval. From $15,000.",
    triggers: [
      "A diagnostic identified the constraint and the first fix.",
      "You know the problem, but earlier tools, agencies, or hires didn't fix it.",
      "The owner or COO wants to stop being the routing layer for the business.",
      "You want AI in the workflow—with a person approving anything that matters.",
    ],
    deliverables: [
      "A working system in production, built around your existing tools wherever possible",
      "A clear status and owner for every lead, job, or request in scope",
      "A daily action queue: what needs attention today, and why",
      "Automation where it is safe; human approval where judgment matters",
      "Documentation and hands-on training for the people who use it",
      "A 30-day before-and-after measurement against the baseline",
    ],
    boundaries: [
      "Scope and price are fixed per phase and agreed in writing before work starts.",
      "I build on your existing CRM and tools unless there is a clear reason not to.",
      "Nothing is sent to customers or changed in your records without the approval rules we agree.",
      "You own what is built: code, configuration, and documentation.",
    ],
    expansionPath:
      "Most builds continue into Operate & Improve, because systems drift without an owner. Once the first constraint is gone the next one becomes visible, and it is scoped the same way.",
    capabilityTags: [
      "Lead and revenue follow-up systems",
      "CRM operating layers",
      "Daily action queues",
      "AI-assisted workflows with approval",
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
        a: "Sometimes AI is part of it—drafting, summarizing, sorting, spotting what's missing. It is never the point, and a person approves anything consequential.",
      },
      {
        q: "Who actually builds it?",
        a: "I do. RachelOS was built and is run the same way.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
    feeFraming:
      "Price depends on how many systems are involved, the state of the data, and how much of the workflow changes. Typical first builds run $18K–$30K. Larger, multi-phase work is quoted from the diagnostic.",
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
    question: "Keep the system working, and find the next constraint.",
    audience:
      "For a business running a system TKO built, or one TKO has taken over, that wants it maintained, measured, and improved rather than left to drift.",
    summary:
      "Once the system is running, I monitor it, fix what drifts, review the numbers with you every month, and ship one improvement each cycle. Every quarter we reassess what is limiting the business now.",
    metaDescription:
      "Managed operation and monthly improvement of your business operating system: monitoring, fixes, a metric review, one improvement per month, and a quarterly constraint review. $3,000–$6,000/month.",
    triggers: [
      "A build is live and you want it to keep working.",
      "The business changes faster than anyone updates the system.",
      "You want someone accountable for whether the numbers keep moving.",
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
