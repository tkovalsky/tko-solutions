// Canonical TKO offer catalogue. Three commercial offers plus one qualifying
// conversation. Every site page, guide CTA, and internal seed script reads from
// here so the public catalogue cannot drift from what is actually sold.
//
// Claim discipline: fee ranges are indicative and confirmed in a written scope.
// No outcome, savings, or performance guarantee appears in this file.

export type OfferSlug =
  | "program-recovery-review"
  | "fractional-transformation-lead"
  | "specialist-subcontract";

export type Offer = {
  slug: OfferSlug;
  name: string;
  shortName: string;
  step: string;
  duration: string;
  commercial: string;
  question: string;
  audience: string;
  summary: string;
  metaDescription: string;
  triggers: string[];
  deliverables: string[];
  boundaries: string[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
};

export const PROGRAM_RECOVERY_CONVERSATION = {
  label: "Request a Program Recovery Conversation",
  href: "/contact",
  duration: "45 minutes",
  summary:
    "A structured 45-minute working conversation about one program that is behind, over budget, or about to fund automation on top of an unstable workflow.",
  // Boundary language matters commercially: the free conversation qualifies the
  // problem, it is not an unpaid mini-engagement.
  boundary:
    "The conversation is a qualifying discussion, not a free assessment. It produces a concise written readout of what was discussed and the recommended next step. It does not include document review, stakeholder interviews, data analysis, or a written recovery plan — that work is scoped and paid.",
  outputs: [
    "A shared statement of the problem as it is currently understood",
    "The two or three questions that most need answering before further spend",
    "An honest read on whether TKO is the right help, and what else might be",
    "A one-page written readout after the call",
  ],
} as const;

export const SPECIALIST_CONVERSATION = {
  label: "Discuss Specialist Availability",
  href: "/contact?intent=specialist",
} as const;

export const offers: Offer[] = [
  {
    slug: "program-recovery-review",
    name: "Program Recovery Review",
    shortName: "Recovery Review",
    step: "Fixed-scope diagnosis",
    duration: "3 weeks",
    commercial: "$18,000–$25,000 fixed fee",
    question:
      "Is this program recoverable, what is actually wrong, and what should happen in the next 90 days?",
    audience:
      "For a COO, Chief Transformation Officer, CIO, or SVP/VP Operations accountable for a healthcare transformation program that is behind schedule, over budget, or losing executive confidence.",
    summary:
      "Three weeks, one accountable senior reviewer, one written executive answer. The Review establishes what is actually failing — scope, sequencing, decision rights, operating design, adoption, or vendor performance — and what the next 90 days should contain.",
    metaDescription:
      "A three-week, $18,000–$25,000 fixed-fee review that tells healthcare executives whether a stalled transformation program is recoverable, what is actually wrong, and what the next 90 days should contain.",
    triggers: [
      "A transformation or modernization program has missed its second consecutive milestone.",
      "Workstream status reads green while enterprise delivery risk keeps accumulating.",
      "A large automation or AI investment is being proposed on top of a workflow nobody has mapped.",
      "Leadership disagrees about whether the problem is scope, capability, vendor performance, or ownership.",
      "A new executive has inherited a program and needs an independent read before committing to it.",
    ],
    deliverables: [
      "Executive diagnosis — what is actually wrong, stated plainly",
      "Program risk map with severity and accumulation path",
      "Recovery priorities, sequenced and bounded",
      "Decision-rights and escalation findings",
      "Operating-model and workflow-ownership gaps",
      "An explicit read on where AI or automation helps, and where it adds risk",
      "90-day action plan with owners, measures, and decision gates",
      "Executive readout session",
    ],
    boundaries: [
      "The Review produces a diagnosis and a plan. It does not include implementation, staffing, or vendor management.",
      "No denial, cost, turnaround, staffing, or revenue outcome is guaranteed. The Review establishes the baseline and the case required to set a responsible target.",
      "TKO may recommend internal execution, an existing vendor, a specialist partner, or no further investment. The Review creates no obligation to continue with TKO.",
      "Standard scope works from existing documentation, reports, appropriately de-identified examples, and stakeholder interviews. No production-system access or PHI ingestion is required.",
    ],
    faqs: [
      {
        q: "Why three weeks rather than a longer discovery phase?",
        a: "Three weeks is enough to interview the people who know, read what already exists, and form an accountable opinion. A longer discovery phase usually reflects the cost of coordinating a team, not the difficulty of the question. One reviewer removes that overhead.",
      },
      {
        q: "What if the honest answer is that the program is not recoverable?",
        a: "Then that is the finding, and it is delivered in writing with the reasoning behind it. Knowing early is the point. A recommendation to stop, descope, or restructure is a legitimate outcome of the Review.",
      },
      {
        q: "Do you need clean data or system access?",
        a: "No. Existing status reports, program artifacts, workflow documentation, and stakeholder interviews are sufficient to begin. Sensitive data handling is agreed separately if it becomes necessary.",
      },
      {
        q: "Is this an AI assessment?",
        a: "No. The Review starts with the program and the operating problem. Whether AI is appropriate is one of the questions answered, not the assumption the work begins from.",
      },
      {
        q: "What happens after the Review?",
        a: "Most engagements end with the plan handed to an internal owner. Where leadership wants continued senior accountability through execution, the Fractional Transformation Lead engagement is the usual path.",
      },
    ],
    ctaLabel: "Request a Program Recovery Conversation",
  },
  {
    slug: "fractional-transformation-lead",
    name: "Fractional Transformation Lead",
    shortName: "Fractional Lead",
    step: "Ongoing senior accountability",
    duration: "3–6 month minimum",
    commercial: "$15,000–$25,000 per month",
    question:
      "Who is senior enough, and accountable enough, to actually hold this program together?",
    audience:
      "For health plans, healthcare services organizations, PE-backed provider platforms, managed-care organizations, and large provider organizations carrying a high-risk transformation program without a senior leader who owns it end to end.",
    summary:
      "Named senior leadership for a stalled or high-risk transformation program, at a fraction of the cost of an executive hire and without a staffing ramp. One accountable person in the operating cadence, holding decisions, dependencies, sequencing, and escalation.",
    metaDescription:
      "Fractional senior leadership for stalled or high-risk healthcare transformation programs. $15,000–$25,000 per month, three-to-six-month minimum, one accountable leader rather than a staffing ramp.",
    triggers: [
      "A critical program has no single accountable owner above the workstream leads.",
      "An executive seat is vacant, newly created, or the search will take two more quarters.",
      "Recovery priorities are known but nobody senior has capacity to drive them.",
      "Cross-functional decisions keep escalating and stalling at the same boundary.",
      "The board or sponsor needs credible independent visibility into delivery risk.",
    ],
    deliverables: [
      "Named senior accountability inside the operating cadence",
      "Decision, dependency, and escalation management across workstreams",
      "Executive and sponsor reporting that reflects real delivery risk",
      "Recovery-plan execution and re-sequencing as conditions change",
      "Vendor and partner performance oversight",
      "AI and automation adoption judgment — what to fund, defer, or stop",
      "Capability transfer to the permanent internal owner",
    ],
    boundaries: [
      "This is senior leadership capacity, not staff augmentation and not an outsourced delivery team.",
      "Engagements are part-time and explicitly scoped by days per month. Full-time interim leadership is a different arrangement.",
      "A three-month minimum applies because program recovery cannot be evidenced in less.",
      "TKO does not act as a licensed clinical, legal, or regulatory advisor. Those judgments stay with the client's qualified functions.",
    ],
    faqs: [
      {
        q: "How is this different from hiring a consulting firm?",
        a: "A firm sells a team and bills the ramp. This is one senior person already familiar with healthcare transformation, in the cadence from week one, accountable by name. There is no pyramid underneath and no discovery phase to fund.",
      },
      {
        q: "How much time per month?",
        a: "Typically the equivalent of four to eight days per month, agreed in writing before the engagement starts and reviewed at each renewal.",
      },
      {
        q: "Does this convert to a permanent role?",
        a: "It can. Several fractional arrangements exist precisely to bridge an executive search. That conversation is welcome and does not carry a placement fee.",
      },
      {
        q: "Do you take over the program from internal leaders?",
        a: "No. The role adds senior accountability where it is missing and transfers capability to the permanent owner. Displacing capable internal leaders is a failure mode, not a goal.",
      },
    ],
    ctaLabel: "Request a Program Recovery Conversation",
  },
  {
    slug: "specialist-subcontract",
    name: "Specialist Subcontract",
    shortName: "Specialist Subcontract",
    step: "For consultancies and integrators",
    duration: "Engagement-dependent",
    commercial: "$175–$250 per hour, subject to engagement",
    question:
      "Can you put a senior healthcare transformation specialist on this account this quarter?",
    audience:
      "For healthcare consultancies, system integrators, advisory firms, and technology partners who already hold the client relationship and need senior specialist depth on a named engagement.",
    summary:
      "Senior specialist capacity delivered under your brand and your client agreement. Prior authorization, utilization management, interoperability, operational recovery, and practical AI adoption — brought in as depth on an engagement you own.",
    metaDescription:
      "Senior healthcare transformation specialist available for subcontract to consultancies and system integrators. Prior authorization, utilization management, interoperability, operational recovery, and practical AI adoption.",
    triggers: [
      "An account needs credible healthcare operations depth that the bench does not currently carry.",
      "A pursuit requires a named senior specialist to be competitive.",
      "A delivery commitment is at risk and needs experienced reinforcement quickly.",
      "A client is asking whether AI is appropriate and the team needs someone who will answer honestly.",
    ],
    deliverables: [
      "Prior authorization and utilization-management operating design",
      "Healthcare transformation and program recovery",
      "Interoperability and regulated implementation (CMS, FHIR, access control, auditability)",
      "Operating-model, decision-rights, and exception-routing design",
      "Practical AI adoption judgment and readiness assessment",
      "Executive-grade written deliverables and readouts",
    ],
    boundaries: [
      "Work is delivered under the prime firm's client agreement, brand, and quality process.",
      "TKO does not approach the prime's clients directly for competing work during or after the engagement, subject to the terms agreed.",
      "Rates are indicative and confirmed per engagement based on scope, duration, location, and commitment.",
      "Availability is limited and allocated in advance.",
    ],
    faqs: [
      {
        q: "Will you work under our brand?",
        a: "Yes. Subcontract work is delivered under the prime firm's agreement, methodology, and brand. Attribution and client-facing presentation are your call.",
      },
      {
        q: "What is your availability?",
        a: "Limited and allocated in advance. The most useful thing you can do is describe the engagement and the window; availability is confirmed against the current commitment set.",
      },
      {
        q: "Can you support a pursuit before it is won?",
        a: "Yes, on agreed terms. Named-specialist support for proposals and orals is a common arrangement.",
      },
      {
        q: "Do you carry your own insurance and entity?",
        a: "Yes. TKO Solutions contracts as a business entity. Certificates and standard subcontractor documentation are available on request.",
      },
    ],
    ctaLabel: "Discuss Specialist Availability",
  },
];

const offersBySlug = new Map(offers.map((offer) => [offer.slug, offer]));

export function getOffer(slug: string): Offer | undefined {
  return offersBySlug.get(slug as OfferSlug);
}

export function offerHref(slug: OfferSlug) {
  return `/services/${slug}`;
}

export function isOfferSlug(value: string): value is OfferSlug {
  return offersBySlug.has(value as OfferSlug);
}
