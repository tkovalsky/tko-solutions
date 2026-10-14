export type OfferSlug =
  | "constraint-diagnostic"
  | "operating-system-build"
  | "operate-and-improve"
  | "regulatory-implementation-readiness-sprint";

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
    "Bring one healthcare mandate, platform transition, or client workflow that needs a clear path to delivery. In 30 minutes, I will talk through the decisions, systems, and dependencies with you, then identify the right scope and next step.",
  boundary:
    "The first call is free. You do not need a finished brief or a technical specification. We will decide whether there is a useful project to scope.",
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
    commercial: "$7,500 fixed · standalone diagnostic",
    question: "What is actually slowing the business down—and what is the smallest useful fix?",
    audience:
      "For an owner, COO, or department leader who can feel the drag—missed follow-up, slow handoffs, repeated decisions, too much work routing through one person—but cannot yet see the first fix clearly.",
    summary:
      "In two weeks, I follow one important workflow, talk with the people doing it, and inspect the tools and handoffs. You leave with the diagnosis, a build specification, a fixed-price proposal, and a starting measure. The diagnostic defines the fix; implementation is a separate step.",
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
      "If the first fix is worth building, the diagnostic ends with a separately priced build proposal. The specification is yours. There is no automatic fee credit; any reuse of diagnostic work and its effect on the build price are stated in the proposal. Existing signed terms are honored.",
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
      "The diagnostic is $7,500 for the agreed scope. It does not commit you to a build. Case-study permission and references are optional and separate from the fee.",
  },
  {
    slug: "operating-system-build",
    name: "Owned Demand & Governed AI Engine",
    shortName: "Build",
    level: "Build",
    step: "Fix the constraint",
    duration: "4–8 weeks",
    startingPrice: "$7,500",
    commercial: "$7,500–$15,000 build · fixed scope",
    question: "Own the path from buyer research to a human-approved next step.",
    audience:
      "For wealth advisory firms, luxury services, and boutique practices that need their own buyer education, inquiry capture, and accountable follow-up workflow.",
    summary:
      "I connect useful buyer content, permission-based inquiry capture, relationship context, and a daily action view around your existing tools. Where model drafting is useful, an operator reviews the exact message before sending. The fixed scope names the sources, integrations, controls, owner, and starting measures.",
    metaDescription:
      "Owned buyer content, inquiry capture, and follow-up with human-reviewed AI drafting. Builds $7,500–$15,000; optional support $1,500–$3,000/month.",
    triggers: [
      "A diagnostic or your own analysis has identified a specific workflow to improve.",
      "You know the problem, but earlier tools, agencies, or hires didn't fix it.",
      "The owner or COO wants to stop being the routing layer for the business.",
      "You have an AI use case and need it connected to the tools and process your team actually uses.",
    ],
    deliverables: [
      "A bounded buyer-content and inquiry-capture path on channels you control",
      "A clear state, owner, and next step for the work in scope",
      "An interface or action view matched to the workflow",
      "Supported integrations and model drafting with exact-message review, visible failures, and an audit trail when included in scope",
      "Documentation and hands-on training for the people who use it",
      "A post-launch review against the starting baseline",
    ],
    boundaries: [
      "Scope and price are fixed per phase: one buyer journey or operating workflow, one accountable operator group, and the named sources and integrations agreed before work starts.",
      "I build on your existing CRM and tools unless there is a clear reason not to.",
      "Approval and change rules are agreed before customer-facing or record-changing automation is enabled.",
      "You own the agreed code, configuration, content, and documentation; existing third-party licenses retain their terms. No lead volume, conversion, revenue, or time advantage over aggregators is guaranteed.",
    ],
    expansionPath:
      "After launch, your team can own the system or TKO can continue with Operate & Improve. The next step is optional and separately scoped.",
    capabilityTags: [
      "Lead and customer follow-up systems",
      "CRM operating layers",
      "Action queues and handoffs",
      "Workflow automation and practical AI",
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
      {
        q: "Do we need the diagnostic first?",
        a: "If the workflow, problem, and desired result are already clear, we can start with build scoping. If we need to understand why the work is breaking down, the diagnostic is the better first step.",
      },
      {
        q: "Can we plan a project for next year?",
        a: "Yes. We can discuss scope and dependencies now, then agree on a start date against your timeline and my availability. Work begins only after scope, timing, and price are agreed.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
    feeFraming:
      "Builds are $7,500–$15,000 for a bounded first phase, not a full RachelOS replica. The proposal names the content inventory, capture path, supported CRM, connector count, acceptance scenarios, and handoff. Hosting, subscriptions, messaging, and model usage are separate. Larger integrations or additional workflows require a separate phase.",
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
    startingPrice: "$1,500/mo",
    commercial: "$1,500–$3,000 per month",
    question: "Keep the system useful after launch.",
    audience:
      "For a business running a system TKO built, or one TKO has taken over, that wants it maintained, measured, and improved rather than left to drift.",
    summary:
      "I keep the operating loop healthy, fix what drifts, review what the team is seeing, and make one focused improvement at a time as the business changes.",
    metaDescription:
      "Ongoing care and improvement for a business operating system: monitoring, fixes, a monthly review, and focused improvements. $1,500–$3,000/month.",
    triggers: [
      "A build is live and you want it to keep working.",
      "The business changes faster than anyone updates the system.",
      "You want one person accountable for keeping the workflow useful as the business changes.",
    ],
    deliverables: [
      "Monitoring and fixes",
      "A monthly metric review against the baseline",
      "A monthly improvement allowance agreed in writing; larger changes receive a separate scope",
      "A quarterly review of what is limiting the business now",
      "A documented review of failures, approval controls, and inquiry handoffs",
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
        a: "The supported systems, monitoring cadence, monthly hours, and response expectations agreed in writing. This is not continuous on-call coverage.",
      },
    ],
    ctaLabel: CONSTRAINT_CALL.label,
  },
  {
    slug: "regulatory-implementation-readiness-sprint",
    name: "Enterprise Transformation & Readiness Sprint",
    shortName: "Readiness Sprint",
    level: "Diagnose",
    step: "Trace the mandate to the work",
    duration: "3–4 weeks",
    startingPrice: "$15,000",
    commercial: "$15,000 fixed · 3–4 weeks",
    question: "Turn healthcare mandates into executable, auditable operational change.",
    audience:
      "For health plan COOs, CIOs, VPs of Operations, VPs of Transformation, and regulatory-program sponsors facing CMS-0057-F, state prior-authorization mandates, or core platform migrations.",
    summary:
      "In 3–4 weeks, I follow one approved mandate or platform transition through Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence → Outcome. You receive the obligation register, cross-system impact map, gap and ownership matrix, implementation backlog, and a readiness readout showing what is proven and what still needs a decision.",
    metaDescription:
      "A 3-4 week, fixed-price readiness sprint for health plans: translate healthcare mandates into executable workflows, controls, and backlogs. $15,000.",
    triggers: [
      "A regulatory deadline (such as CMS-0057-F or state PA rules) has created multiple projects but no single readiness view.",
      "Compliance, operations, technology, product, and vendors have each interpreted the mandate differently.",
      "A prior-authorization, interoperability, or policy change looks technically on track but operationally unclear.",
      "Leadership needs an independent answer before declaring readiness, funding more work, or escalating a vendor.",
      "Testing is planned at the application level, but no one has defined the end-to-end operational scenarios and evidence that matter.",
    ],
    deliverables: [
      "Obligation Register & Impact Map: traceable from policy to capability, workflow, system, control, owner, evidence, and outcome",
      "Gap, Dependency, and Accountable Ownership Assessment across operations, IT, and delegated vendors",
      "Executable Implementation Backlog with explicit business rules, exceptions, and acceptance criteria",
      "Executive Readiness Scorecard showing what is proven, what remains open, and what needs a leadership decision",
      "Sponsor readout with accountable workstream owners and a baseline plan for activation, rework, exceptions, and downstream fallout",
    ],
    boundaries: [
      "Grounded in operational and technical architecture; not legal, clinical, actuarial, or regulatory advice.",
      "Does not replace accountable client executives, compliance owners, architects, or delivery teams.",
      "Not a generic PMO status report, software implementation, or formal compliance certification.",
      "Bounded to one defined mandate, program surface, or platform transition. The sprint begins once approved interpretations, system walkthroughs, and accountable owners are available.",
    ],
    expansionPath:
      "Client delivery teams execute the backlog. Optional Execution Assurance follows one named workstream through evidence reviews, dependency resolution, acceptance reviews, and sponsor decisions. Its cadence, capacity, term, and fee are agreed separately after the sprint.",
    capabilityTags: [
      "Healthcare mandates",
      "CMS-0057-F & PA",
      "Payer operations",
      "Cross-system controls",
      "Delivery governance",
      "Traceable readiness",
    ],
    faqs: [
      {
        q: "Does this replace our legal counsel or compliance team?",
        a: "No. Your compliance and legal teams interpret the rule. The sprint takes their approved interpretation and translates it into operational behavior, system controls, and evidence.",
      },
      {
        q: "What systems and workflows do you inspect?",
        a: "Intake channels, UM platforms, clinical rules engines, claims adjudication, provider data, and partner APIs across the end-to-end operational path.",
      },
      {
        q: "How does this differ from our internal PMO status reports?",
        a: "A PMO collects reported status from workstreams. The readiness sprint tests whether the links between policy, workflow, and systems actually connect with demonstrable evidence.",
      },
    ],
    feeFraming: "$15,000 fixed for one agreed mandate, program surface, or platform transition over 3–4 weeks. The fee covers the assessment deliverables and sponsor readout; implementation and optional Execution Assurance are separately scoped.",
    feeBoundary: "Scope, system boundaries, required interviews, source access, acceptance criteria, and sponsor availability are agreed before kickoff. A delayed prerequisite or additional workstream requires an agreed change to timing or scope.",
    ctaLabel: "Book a Readiness Assessment",
    timeline: [
      {
        period: "Week 1",
        title: "Map Obligations & Authorities",
        description:
          "Translate the approved mandate into concrete obligations across member eligibility, benefits, clinical policy, provider programs, UM orchestration, and claims controls.",
      },
      {
        period: "Week 2",
        title: "Inspect Systems & Handoffs",
        description:
          "Walk through the operational and technology handoffs with workstream leads and vendors. Find where unmodeled exceptions and hidden manual workarounds exist.",
      },
      {
        period: "Week 3–4",
        title: "Structure Backlog & Executive Scorecard",
        description:
          "Deliver the prioritized gap and ownership matrix, the executable backlog, and the executive readiness scorecard with a sponsor readout.",
      },
    ],
  },
];

// A continuation of the healthcare engagement, not an additional commercial engine.
export const healthcareExecutionAssurance = {
  name: "Execution Assurance",
  summary: "Keep the readiness backlog connected to the evidence your sponsor needs to accept the change.",
  cadence: "A proposed 90-day engagement, reviewed in three monthly cycles. Each cycle covers one named workstream, two evidence reviews, and one sponsor decision readout.",
  deliverables: [
    "An updated obligation-to-evidence register and acceptance status",
    "A dependency and decision log with accountable owners and agreed review dates",
    "Reviews of missing authority, failed handoffs, and exception evidence",
    "A sponsor readout stating what can be accepted, what remains open, and who must act",
    "An end-of-term handoff and recommendation to close, continue, or scope a separate delivery phase",
  ],
  boundaries: "Your teams deliver the backlog; your sponsor accepts the release. This scope does not supply a PMO, software implementation team, legal opinion, compliance certification, or continuous on-call coverage.",
  commercial: "Fixed fee agreed after the sprint, before continuation. The proposal states monthly capacity, meeting cadence, review turnaround, and escalation rules. Additional workstreams or implementation receive a separate scope. No automatic renewal.",
} as const;

export function getOffer(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}

export function isOfferSlug(value: string): value is OfferSlug {
  return offers.some((offer) => offer.slug === value);
}

export function offerHref(slug: OfferSlug) {
  return `/services/${slug}`;
}

export function offerContactHref(slug: OfferSlug) {
  return `/contact?offer=${slug}`;
}

export function offerProof(slug: OfferSlug) {
  return slug === "regulatory-implementation-readiness-sprint"
    ? { href: "/healthcare/impact-assessment", label: "Run the Synthetic Decision Lab" }
    : slug === "constraint-diagnostic"
      ? { href: "/selected-work", label: "Inspect the Work" }
      : { href: "/selected-work/from-crm-to-operating-system", label: "Inspect RachelOS" };
}

// Two entry points; diagnostic and support remain supporting steps.
export const commercialEngines = [
  { id: "enterprise", slug: "regulatory-implementation-readiness-sprint", href: "/services/regulatory-implementation-readiness-sprint", proofHref: "/healthcare/impact-assessment", proofLabel: "Run the synthetic decision lab" },
  { id: "owned-demand", slug: "operating-system-build", href: "/private-client-os", proofHref: "/selected-work/from-crm-to-operating-system", proofLabel: "Inspect RachelOS" },
] as const satisfies readonly { id: string; slug: OfferSlug; href: string; proofHref: string; proofLabel: string }[];
