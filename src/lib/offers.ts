export type OfferSlug =
  | "execution-gap-blueprint"
  | "execution-sprint"
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
  // Closing call-to-action copy when the generic call summary does not fit the offer.
  ctaSummary?: string;
  // What the buyer must supply before work starts.
  prerequisites?: string[];
  // How the purchase happens; stated so a request is never mistaken for a payment.
  purchasePath?: OfferTimelineStep[];
};

// Execution Gap Blueprint commercial terms (owner-approved 2026-11-12). The founding count is
// set by hand when an invoice is paid, and git history is its audit trail; the ledger lives in
// docs/commercial-launch-2026-11/BLUEPRINT_OPERATING_PROCEDURE.md. When it reaches the
// allocation, every surface shows the standard price. Do not display a remaining count.
export const blueprintLaunch = {
  foundingPrice: "$999",
  standardPrice: "$1,499",
  foundingAllocation: 5,
  foundingPaid: 0,
  creditMinimum: "$7,500",
  creditWindowDays: 45,
} as const;

export const blueprintFoundingOpen = blueprintLaunch.foundingPaid < blueprintLaunch.foundingAllocation;

// Execution Sprint commercial terms (owner-approved 2026-11-13; offer definition in
// docs/commercial-launch-2026-11/EXECUTION_SPRINT_DEFINITION.md). Same founding rule as the
// Blueprint: the count changes only on confirmed payment, and no remaining count is displayed.
export const sprintLaunch = {
  foundingPrice: "$9,999",
  standardPrice: "$14,999",
  foundingAllocation: 3,
  foundingPaid: 0,
} as const;

export const sprintFoundingOpen = sprintLaunch.foundingPaid < sprintLaunch.foundingAllocation;
const sprintStartingPrice = sprintFoundingOpen ? sprintLaunch.foundingPrice : sprintLaunch.standardPrice;
const sprintPriceTerms = sprintFoundingOpen
  ? `${sprintLaunch.foundingPrice} for each of the first ${sprintLaunch.foundingAllocation} paid Sprints at standard scope, then from ${sprintLaunch.standardPrice}`
  : `From ${sprintLaunch.standardPrice}`;

export const BLUEPRINT_CREDIT_TERMS = `The Blueprint fee is credited once toward your first follow-on TKO engagement with a fixed fee of ${blueprintLaunch.creditMinimum} or more (an Execution Sprint, a Constraint Diagnostic, a build phase, or a Readiness Sprint), when that engagement agreement is signed within ${blueprintLaunch.creditWindowDays} days of Blueprint delivery. The credit applies once, is not transferable, cannot be redeemed for cash, and cannot be combined with another credit. Existing signed agreements keep their terms.`;

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
    slug: "execution-gap-blueprint",
    name: "Execution Gap Blueprint",
    shortName: "Blueprint",
    level: "Diagnose",
    step: "The first paid step",
    duration: "5 business days",
    startingPrice: blueprintFoundingOpen ? blueprintLaunch.foundingPrice : blueprintLaunch.standardPrice,
    commercial: blueprintFoundingOpen
      ? `${blueprintLaunch.foundingPrice} founding price · ${blueprintLaunch.standardPrice} standard`
      : `${blueprintLaunch.standardPrice} fixed`,
    question: "Show me the workflow that’s wasting your team’s time.",
    audience:
      "For a founder, COO, or operations leader who knows which workflow keeps eating the team’s time but not exactly where it breaks, why, or what to do first. Your tools hold the information; your people are still connecting the pieces by hand.",
    summary:
      "I examine one workflow in one business function, across up to three of the systems you already use. You receive a map of where the work and the handoffs break down, the three gaps that matter most, a plain recommendation for each, and a bounded proposal for the next step. Delivery is targeted for five business days after the intake call and the materials I need.",
    metaDescription: blueprintFoundingOpen
      ? `A fixed-scope assessment of one workflow across up to three systems: where the work breaks down, why, and the most practical next step. ${blueprintLaunch.foundingPrice} for the first five clients, then ${blueprintLaunch.standardPrice}.`
      : `A fixed-scope assessment of one workflow across up to three systems: where the work breaks down, why, and the most practical next step. ${blueprintLaunch.standardPrice}.`,
    triggers: [
      "Requests, leads, or orders move between tools, and somebody has to carry them across by hand.",
      "One person has become the routing layer: work waits until they notice it.",
      "Nobody can say with confidence what needs attention today, or who owns it.",
      "The team re-keys or reconciles the same information in a CRM, spreadsheets, and email.",
      "You are considering automation or AI for a workflow and want to know what would actually help first.",
    ],
    deliverables: [
      "A visual map of the workflow: the people, systems, handoffs, and decision points",
      "The three most consequential gaps in ownership, information, process, decisions, or execution, each with its evidence and likely cause",
      "A recommendation for each gap: automate, integrate, redesign, clarify ownership or controls, or leave the process alone",
      "An initial impact hypothesis, labeled as an estimate, of where time, risk, or revenue could improve",
      "A bounded proposal for the next phase, with scope, exclusions, and price, if one is worth doing",
      "A concise readout, live or recorded, and one round of factual clarification",
    ],
    boundaries: [
      "One workflow in one business function, and no more than three systems.",
      "One structured intake conversation of up to 30 minutes, plus the documents and screenshots you choose to share.",
      "No production credentials, no changes to your systems, and no software development.",
      "One round of factual clarification after the readout, not open-ended revisions.",
      "Not legal, tax, compliance, or clinical advice. Do not send passwords, patient records, or customer contact lists.",
    ],
    expansionPath: `The Blueprint is useful on its own: the map and recommendations are yours to act on with anyone. If you hire TKO for a follow-on engagement of ${blueprintLaunch.creditMinimum} or more within ${blueprintLaunch.creditWindowDays} days of delivery, the Blueprint fee is credited once, under the terms stated with the price.`,
    ctaSummary: "Describe one workflow and the systems it runs through. I confirm the fit within two business days, and nothing is charged until you accept a written order.",
    capabilityTags: ["Workflow and handoff mapping", "Ownership and decision rights", "Systems integration", "Automation and AI readiness"],
    faqs: [
      {
        q: "What do I need to have ready?",
        a: "One workflow you want to fix, 30 minutes for the intake call, and whatever you already have that shows how it works: screenshots, exported reports, process notes, or a short screen recording. No credentials and no sensitive records.",
      },
      {
        q: "Is this a sales call with a price tag?",
        a: "No. It is paid, fixed-scope work with a written deliverable you keep. If the right answer is to leave the process alone, or to fix it without TKO, the Blueprint says so.",
      },
      {
        q: "How is it different from the Constraint Diagnostic?",
        a: "The Blueprint looks at one workflow from the information you provide and one conversation. The Diagnostic runs two weeks, includes interviews with the people doing the work and a measured baseline, and ends with a build specification. If your problem spans teams or needs that depth, start with the Diagnostic.",
      },
      {
        q: "We are a large enterprise with a funded initiative. Should we start here?",
        a: "Usually not. If the program, sponsor, and budget already exist, we should scope the right engagement directly. Use the enterprise conversation instead.",
      },
      {
        q: "When do I pay?",
        a: "After I confirm the workflow is a fit. You receive a written order and an invoice; the work starts when the invoice is paid and the intake call is scheduled. Submitting the request does not charge you.",
      },
      {
        q: "What does “founding price” mean?",
        a: `The first ${blueprintLaunch.foundingAllocation} paid Blueprints are ${blueprintLaunch.foundingPrice}. After that the price is ${blueprintLaunch.standardPrice}. The price on your written order is the price you pay.`,
      },
    ],
    ctaLabel: "Get My Execution Blueprint",
    timeline: [
      {
        period: "Day 0",
        title: "Intake",
        description: "A 30-minute call on the workflow, the people and systems involved, and what the problem costs. You share what you already have.",
      },
      {
        period: "Days 1–4",
        title: "Trace and analyze",
        description: "I map the work across the handoffs, find where it stalls or depends on memory, and test the likely causes against your material.",
      },
      {
        period: "Day 5",
        title: "Readout",
        description: "The map, the three gaps, the recommendations, and the next-step proposal, delivered live or as a recorded walkthrough.",
      },
    ],
    feeFraming: blueprintFoundingOpen
      ? `${blueprintLaunch.foundingPrice} for each of the first ${blueprintLaunch.foundingAllocation} paid Blueprints, then ${blueprintLaunch.standardPrice}. Fixed fee for the stated scope.`
      : `${blueprintLaunch.standardPrice}, fixed for the stated scope.`,
    feeBoundary: BLUEPRINT_CREDIT_TERMS,
    prerequisites: [
      "One named workflow and one business function in scope.",
      "A person who knows the workflow and can join the 30-minute intake call.",
      "Existing material that shows the work: screenshots, exports, process notes, or a recording.",
      "Required information within five business days of the intake call; the delivery date moves with it.",
    ],
    purchasePath: [
      { period: "1", title: "Request", description: "Tell me about the workflow. Submitting the form does not charge you." },
      { period: "2", title: "Confirm fit", description: "Within two business days I confirm the scope fits, or tell you what would fit better." },
      { period: "3", title: "Order and invoice", description: "You receive a written order and an invoice. Work starts once it is paid." },
      { period: "4", title: "Intake and delivery", description: "We hold the 30-minute intake call. The Blueprint is targeted for five business days after I have what I need." },
    ],
  },
  {
    slug: "execution-sprint",
    name: "Execution Sprint",
    shortName: "Sprint",
    level: "Build",
    step: "Fix one workflow",
    duration: "About 30 days",
    startingPrice: sprintStartingPrice,
    commercial: sprintFoundingOpen
      ? `${sprintLaunch.foundingPrice} founding price · from ${sprintLaunch.standardPrice} standard`
      : `From ${sprintLaunch.standardPrice} · fixed scope`,
    question: "One workflow, working in your systems in about 30 days.",
    audience:
      "For an owner, COO, or operations leader who can name the workflow that keeps breaking (new inquiries, client onboarding, quotes, renewals) and wants it fixed, not just diagnosed. Not sure which workflow yet? Start with the Blueprint.",
    summary:
      "I implement one qualifying workflow inside the tools you already use: where the work comes from, what state it is in, who owns the next step, what that step is, who approves anything customer-facing, and how you know it got better. You sign the acceptance scenarios in the first week, the fee is fixed, and you own what is built. Delivery is targeted for about 30 days from kickoff, subject to timely access and the agreed scope.",
    metaDescription: sprintFoundingOpen
      ? `A fixed-fee implementation of one operational workflow in your existing systems in about 30 days, accepted against scenarios you sign in week one. ${sprintLaunch.foundingPrice} for the first ${sprintLaunch.foundingAllocation} clients, then from ${sprintLaunch.standardPrice}.`
      : `A fixed-fee implementation of one operational workflow in your existing systems in about 30 days, accepted against scenarios you sign in week one. From ${sprintLaunch.standardPrice}.`,
    triggers: [
      "You can name the workflow: inquiries wait for an owner, onboarding stalls between tools, or quotes and renewals depend on someone remembering.",
      "A Blueprint, a diagnostic, or your own analysis already says what should change.",
      "You want the fix working, not another report.",
      "The work runs through one team and no more than three systems.",
    ],
    deliverables: [
      "A workflow model: the states work moves through, what moves it, and who owns each step",
      "Connection to up to two sources: a web form or webhook, a CSV or scheduled export, or one system with a documented API you authorize",
      "Owner assignment and next-action rules, with overdue work surfaced in a daily view",
      "A named-person approval before anything customer-facing is sent or any record is changed",
      "An audit trail of what happened, including failures, visible to the people running it",
      "A starting measure, a live measure, and a 30-day re-measure using the same definition",
      "A handoff: runbook, two training sessions, and every account and credential in your name",
    ],
    boundaries: [
      "One workflow in one business function, one team of up to five users, up to two sources, and no more than three systems.",
      "Acceptance is five to eight written scenarios you sign by Day 5. The Sprint is accepted when they pass in your environment.",
      "Changes after Day 10 go to a later Sprint, not into this one. If access arrives late, the date moves with it; the price does not.",
      "Customer-facing actions stay human-approved. No autonomous sending, no CRM replacement or data migration, and no patient records, payment card data, or other regulated records.",
      "You own the agreed code, configuration, and documentation. Subscriptions, hosting, messaging, and model usage are billed to your own accounts. No revenue, conversion, or response-rate result is promised.",
      "Residential real-estate agents and teams: see BoundOS. Programs that need procurement, security review, or several teams are scoped as an enterprise engagement.",
    ],
    expansionPath:
      "After the 30-day re-measure, your team can run it, add Operate & Improve, or scope the next workflow as another Sprint. Each is a separate decision.",
    ctaSummary:
      "Name the workflow and the systems it runs through. I confirm within two business days whether it qualifies for a Sprint, and nothing is charged until you accept a written order.",
    capabilityTags: ["Workflow state and ownership", "Source integration", "Approval and audit trail", "Daily action view", "Before-and-after measurement"],
    faqs: [
      {
        q: "What makes a workflow qualify?",
        a: "One workflow in one business function, with a clear trigger and a next step someone owns, running through no more than three systems and two sources of incoming work. You can grant access within five business days of kickoff, and no regulated records are needed. If it does not qualify, I will say so and suggest the Blueprint, a Diagnostic, or an enterprise engagement.",
      },
      {
        q: "Is this a software product?",
        a: "No. It is a fixed-scope implementation that follows a repeatable method, first applied in RachelOS, a production system I designed and built for one independent real-estate business. What is built for you is configured to your workflow and owned by you.",
      },
      {
        q: "Do we need a Blueprint first?",
        a: `Not if you can name the workflow and the systems. If you cannot yet, start with the Blueprint. Its fee is credited once toward a Sprint signed within ${blueprintLaunch.creditWindowDays} days of Blueprint delivery.`,
      },
      {
        q: "What if it takes longer than 30 days?",
        a: "The date assumes access within five business days and the agreed scope. Late access moves the date by the same amount, and changes after Day 10 become a later Sprint. Neither changes the price.",
      },
      {
        q: "Will you use AI?",
        a: "Only where it helps and you approve it, for example a drafted message a named person reviews before it is sent. Many workflows need clear rules and ownership, not a model.",
      },
      {
        q: "When do I pay, and what does “founding price” mean?",
        a: `After I confirm the workflow qualifies, you receive a written order with the payment schedule and an invoice. The first ${sprintLaunch.foundingAllocation} paid Sprints are ${sprintLaunch.foundingPrice} for standard scope; after that, Sprints start at ${sprintLaunch.standardPrice}. The price on your written order is the price you pay.`,
      },
    ],
    ctaLabel: "Evaluate an Execution Sprint",
    timeline: [
      {
        period: "Days 1–5",
        title: "Model and agree",
        description: "Kickoff, access, and the starting measure. We agree the workflow model and you sign the acceptance scenarios.",
      },
      {
        period: "Days 6–21",
        title: "Build and pilot",
        description: "Sources, state, ownership, next actions, approval, and the audit trail, then a pilot with your team on authorized records.",
      },
      {
        period: "Days 22–30",
        title: "Accept and hand off",
        description: "Each scenario run in your environment, then training, the runbook, and ownership confirmed. The re-measure follows 30 days later.",
      },
    ],
    feeFraming: `${sprintPriceTerms}. Fixed fee, stated on the written order.`,
    feeBoundary: `The standard price rises only for named factors, each priced on the order before you sign: a second source that needs an API integration, more than five users, or a third system the workflow writes to. A prior Execution Gap Blueprint fee is credited once under its published terms.`,
    prerequisites: [
      "One named workflow, and an owner on your side with about two hours a week during the Sprint.",
      "Access to the sources and systems in scope within five business days of kickoff, held in your own accounts.",
      "A named approver for anything customer-facing.",
      "Data that shows the starting measure, such as an export of the last 90 days of the work.",
    ],
    purchasePath: [
      { period: "1", title: "Request", description: "Tell me about the workflow. Submitting the form does not charge you." },
      { period: "2", title: "Qualify", description: "Within two business days I confirm whether it qualifies, or recommend the Blueprint, a Diagnostic, or another path." },
      { period: "3", title: "Written order", description: "You receive a written order with the scope, acceptance approach, start date, price, and payment schedule." },
      { period: "4", title: "Kickoff", description: "I run one Sprint at a time, so the order states when yours begins. The 30 days start at kickoff." },
    ],
  },
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
      "If the first fix is worth building, the diagnostic ends with a separately priced build proposal. The specification is yours. The diagnostic fee is not automatically credited to the build; any reuse of diagnostic work and its effect on the build price are stated in the proposal. A prior Execution Gap Blueprint fee is credited once under its published terms. Existing signed terms are honored.",
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
    duration: "One or two Execution Sprints",
    startingPrice: sprintStartingPrice,
    commercial: `From ${sprintStartingPrice} per Sprint · usually one or two Sprints`,
    question: "Own the path from buyer research to a human-approved next step.",
    audience:
      "For wealth advisory firms, luxury services, and boutique practices that need their own buyer education, inquiry capture, and accountable follow-up workflow.",
    summary:
      "I connect useful buyer content, permission-based inquiry capture, relationship context, and a daily action view around your existing tools. Where model drafting is useful, an operator reviews the exact message before sending. The fixed scope names the sources, integrations, controls, owner, and starting measures.",
    metaDescription:
      "Owned buyer content, inquiry capture, and follow-up with human-reviewed AI drafting, delivered as one or two fixed-fee Execution Sprints; optional support $1,500–$3,000/month.",
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
      "Scope and price are fixed per Sprint: one buyer journey or operating workflow, one accountable operator group, and the named sources and integrations agreed before work starts.",
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
        a: "Rarely. Your CRM is usually fine as a system of record. What is missing is the sidecar operating layer beside it that turns stored records into a daily action queue, missing-fact prompts, and human-reviewed follow-up.",
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
      `Delivered as one or two Execution Sprints on the Sprint terms (${sprintPriceTerms.charAt(0).toLowerCase()}${sprintPriceTerms.slice(1)}), not a full RachelOS replica. The proposal names the content inventory, capture path, supported CRM, connector count, acceptance scenarios, and handoff. Hosting, subscriptions, messaging, and model usage are separate. Larger integrations or additional workflows are scoped as further Sprints.`,
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

// BoundOS: the done-with-you follow-up service sold beside a client's existing CRM (formerly
// "SidecarOS"; one product brand since 2026-10-26).
// The single published ladder (decision D1, 2026-10-20). Scope follows Schedule A of
// docs/legal/SERVICE_AGREEMENT_OUTLINE.md. The BoundOS product site mirrors these values;
// change both together. Rachel Desk is deliberately absent until counsel clears it.
export const sidecar = {
  name: "BoundOS",
  productUrl: "https://www.boundos.com",
  contactHref: "/contact?offer=managed-follow-up",
  separateCosts: "CRM subscriptions, messaging, hosting, and AI usage are separate from service fees.",
  steps: [
    {
      id: "assessment",
      name: "Database Health Assessment",
      price: "$500",
      commercial: "$500 one-time · credited to setup within 60 days",
      summary: "Import your contacts and receive a Database Health Report: who has a dated relationship, who is eligible to contact, and what a recovery plan would involve.",
      includes: ["Contact import from your CRM or a CSV export", "Database Health Report", "Up to 8,000 contacts"],
    },
    {
      id: "core",
      name: "BoundOS Core",
      price: "$1,500 setup",
      monthly: "$500/month",
      commercial: "$1,500 setup + $500/month",
      summary: "A segment plan, approved sequence copy you load into your CRM, and a daily lineup of who to contact and why. You make the calls and log a one-word disposition.",
      includes: ["Segment plan, eligibility screen, and holdout", "Sequence copy for you to load into your CRM", "Daily lineup", "Monthly outcome report and 30-minute review", "Up to 3,000 contacts; email support within two business days"],
    },
    {
      id: "managed",
      name: "BoundOS Managed",
      price: "$2,500 setup",
      monthly: "$1,200/month",
      commercial: "$2,500 setup + $1,200/month",
      summary: "Everything in Core, with the sequences loaded and run in your CRM for you, replies triaged into the lineup within one business day, and a weekly review.",
      includes: ["Everything in Core", "Sequences loaded and run in your CRM", "Reply triage into the lineup within one business day", "Weekly review", "Up to 8,000 contacts; email support within one business day"],
    },
  ],
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
    : slug === "constraint-diagnostic" || slug === "execution-gap-blueprint"
      ? { href: "/selected-work", label: "Inspect the Work" }
      : { href: "/selected-work/from-crm-to-operating-system", label: "Inspect RachelOS" };
}

// Two entry points; diagnostic and support remain supporting steps.
export const commercialEngines = [
  { id: "enterprise", slug: "regulatory-implementation-readiness-sprint", href: "/services/regulatory-implementation-readiness-sprint", proofHref: "/healthcare/impact-assessment", proofLabel: "Run the synthetic decision lab" },
  { id: "owned-demand", slug: "operating-system-build", href: "/private-client-os", proofHref: "/selected-work/from-crm-to-operating-system", proofLabel: "Inspect RachelOS" },
] as const satisfies readonly { id: string; slug: OfferSlug; href: string; proofHref: string; proofLabel: string }[];
