export type OfferSlug =
  | "executive-diagnostic"
  | "transformation-diagnostic"
  | "operating-model-design"
  | "transformation-leadership";

export type OfferTimelineStep = {
  period: string;
  title: string;
  description: string;
};

export type Offer = {
  slug: OfferSlug;
  name: string;
  shortName: string;
  level: "Diagnose" | "Design" | "Lead";
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

export const TRANSFORMATION_CONVERSATION = {
  label: "Discuss a Transformation",
  href: "/contact",
  duration: "45 minutes",
  summary:
    "A focused working conversation about what is changing, what is stuck, and which decision leadership needs to make before more money or momentum is lost.",
  boundary:
    "The conversation tests the problem boundary and the most useful next step. Artifact review, stakeholder interviews, analysis, and written recommendations belong in a paid diagnostic.",
  outputs: [
    "A shared statement of the problem as it is currently understood",
    "The questions leadership must answer before further investment",
    "A direct read on whether TKO is the right help",
    "A recommended diagnostic or alternative next step",
  ],
} as const;

// Compatibility export for older insight and readiness content during migration.
export const PROGRAM_RECOVERY_CONVERSATION = TRANSFORMATION_CONVERSATION;

export const SPECIALIST_CONVERSATION = {
  label: "Discuss Delivery-Partner Support",
  href: "/contact?intent=partner",
} as const;

export const offers: Offer[] = [
  {
    slug: "executive-diagnostic",
    name: "Executive Diagnostic",
    shortName: "Executive Diagnostic",
    level: "Diagnose",
    step: "Paid entry point",
    duration: "1–2 weeks",
    startingPrice: "$5K",
    commercial: "Starting at $5K",
    question: "What is actually happening, and what should leadership examine next?",
    audience:
      "For an executive with one tightly bounded healthcare operating or transformation problem who needs an independent read before committing to a larger intervention.",
    summary:
      "A focused assessment of one defined problem using existing artifacts, limited stakeholder input, dependency and friction analysis, prioritized findings, and one executive readout.",
    metaDescription:
      "A 1–2 week principal-led healthcare transformation diagnostic, starting at $5K, for one tightly bounded operating problem.",
    triggers: [
      "A new operational pressure or regulatory requirement needs rapid framing.",
      "Leadership sees symptoms but does not yet know whether the problem is workflow, ownership, controls, technology, or execution.",
      "A warm-network opportunity needs paid discovery without a large initial commitment.",
      "One workflow or decision is sufficiently bounded to examine in under two weeks.",
    ],
    deliverables: [
      "Current-state assessment of one defined problem",
      "Administrative-friction and dependency findings",
      "Prioritized risks and opportunities",
      "Executive recommendations",
      "One readout and an explicit next-step decision",
    ],
    boundaries: [
      "One problem, limited interviews, and existing artifacts only.",
      "This is not an enterprise-wide assessment, implementation plan, or technology selection.",
      "No clinical, legal, actuarial, or regulatory advice is provided.",
      "The diagnostic creates no obligation to continue with TKO.",
    ],
    expansionPath:
      "If the problem is broader or economically material, expand into a Transformation Diagnostic or a bounded Operating Model & Transformation Design Sprint.",
    capabilityTags: ["Administrative friction", "Problem framing", "Dependency analysis"],
    faqs: [
      { q: "Is this a sales workshop?", a: "No. It is a paid, bounded diagnostic with written findings and a decision-oriented readout." },
      { q: "Can it cover more than one workflow?", a: "Only when those workflows form one coherent problem boundary. Otherwise the Transformation Diagnostic is the better vehicle." },
    ],
    ctaLabel: "Start with an Executive Diagnostic",
    feeBoundary:
      "The starting scope is designed for roughly one problem, limited access, and a decision that can be responsibly framed from existing evidence.",
  },
  {
    slug: "transformation-diagnostic",
    name: "Transformation Diagnostic",
    shortName: "Transformation Diagnostic",
    level: "Diagnose",
    step: "Standard entry engagement",
    duration: "2–3 weeks",
    startingPrice: "$10K",
    commercial: "Starting at $10K",
    question: "What is preventing this transformation from becoming an executable operating change?",
    audience:
      "For a COO, Chief Transformation Officer, CIO, or healthcare operations executive facing administrative burden, provider friction, a stalled modernization effort, or an automation decision built on an unstable workflow.",
    summary:
      "The standard entry engagement maps the current operating model, friction, controls, dependencies, and transformation risks, then gives leadership a prioritized intervention and next-stage roadmap.",
    metaDescription:
      "A 2–3 week healthcare Transformation Diagnostic, starting at $10K, covering workflow friction, controls, dependencies, risk, and next-stage roadmap.",
    triggers: [
      "Administrative cost or provider burden is rising without a shared explanation.",
      "Workstreams report progress while enterprise outcomes remain unchanged.",
      "A transformation has missed milestones or lost executive confidence.",
      "AI, automation, or a platform investment is proposed before the operating model is explicit.",
      "A new executive needs an independent read before inheriting the current plan.",
    ],
    deliverables: [
      "Current-state operating model",
      "Workflow and administrative-friction map",
      "Control and decision-rights analysis",
      "Transformation dependency model",
      "Risk and readiness findings",
      "Economic and value hypothesis",
      "Prioritized interventions and next-stage roadmap",
      "Executive readout",
    ],
    boundaries: [
      "The scope is one transformation, workflow family, or coherent operating problem.",
      "The diagnostic establishes a defensible baseline; it does not guarantee savings or outcomes before evidence exists.",
      "Implementation, detailed solution design, and vendor procurement are separate decisions.",
      "TKO may recommend internal execution, an existing partner, a different specialist, or no further investment.",
    ],
    expansionPath:
      "Validated problems can move into future-state design or into execution accountability. Expansion is evidence-based, not automatic.",
    capabilityTags: ["Operating model", "Program recovery", "Friction economics", "Governed AI"],
    faqs: [
      { q: "Is this the former Program Recovery Review?", a: "Program recovery is now one use case within the broader Transformation Diagnostic. The engagement also applies before a program fails, when burden, controls, workflow, or investment choices are still being framed." },
      { q: "Do you need production data?", a: "Not always. Existing artifacts and interviews can establish the first model. Any sensitive-data requirement is separately scoped with explicit handling controls." },
    ],
    ctaLabel: "Discuss a Transformation Diagnostic",
    timeline: [
      { period: "Stage 1", title: "Frame and read", description: "Bound the executive question, review existing artifacts, and identify evidence gaps." },
      { period: "Stage 2", title: "Trace and test", description: "Interview the people closest to the work and trace friction, controls, decisions, and dependencies." },
      { period: "Stage 3", title: "Diagnose and sequence", description: "Synthesize findings, prioritize interventions, and give leadership an explicit next-stage decision." },
    ],
    feeBoundary:
      "The starting price assumes one coherent problem, existing documentation, bounded stakeholder access, and a decision-oriented executive readout.",
  },
  {
    slug: "operating-model-design",
    name: "Operating Model & Transformation Design Sprint",
    shortName: "Design Sprint",
    level: "Design",
    step: "Future-state design",
    duration: "4–6 weeks",
    startingPrice: "$20K",
    commercial: "Starting at $20K",
    question: "What should the future operating model be, and how can the enterprise implement it?",
    audience:
      "For healthcare leaders with a validated problem who need the future-state workflow, controls, governance, technology implications, and implementation sequence made explicit.",
    summary:
      "A bounded design sprint that converts diagnostic evidence into an executable target operating model and transformation roadmap before automation or implementation spend accelerates.",
    metaDescription:
      "A 4–6 week healthcare operating-model and transformation design sprint, starting at $20K, covering workflows, controls, governance, technology, and roadmap.",
    triggers: [
      "The current-state problem is understood but teams disagree on the future model.",
      "Automation requirements are advancing without explicit decision rights or exception handling.",
      "Multiple products or platforms need one operating design and implementation sequence.",
      "Leadership needs an investment case tied to operating measures and business value.",
    ],
    deliverables: [
      "Target operating model",
      "Future-state workflows and exception paths",
      "Decision rights and control model",
      "Governance and escalation design",
      "Technology, data, integration, automation, and AI implications",
      "Dependency-aware implementation roadmap",
      "KPI framework and business case",
    ],
    boundaries: [
      "A design sprint produces implementation-ready direction, not a full system build.",
      "Detailed architecture and engineering remain with the accountable internal or delivery teams.",
      "Clinical policy and regulatory interpretations remain with authorized client owners.",
      "Material scope expansion requires a written change in objective, access, and fee.",
    ],
    expansionPath:
      "TKO can carry the model into execution as Transformation Execution Authority, or hand it to the client and its delivery partners with the ownership, dependency, and readiness structures already defined.",
    capabilityTags: ["Target operating model", "Decision rights", "Technology roadmap", "Governed automation"],
    faqs: [
      { q: "Must a diagnostic come first?", a: "Not if the client already has a credible evidence base and a sufficiently bounded problem. TKO validates that foundation during scoping." },
      { q: "Do you build the software?", a: "The sprint defines the operating and technology implications. Implementation may be led by internal teams, existing vendors, delivery partners, or a separately scoped TKO role." },
    ],
    ctaLabel: "Discuss a Design Sprint",
    feeBoundary:
      "The starting price assumes one target operating model or workflow family and an identified executive sponsor with access to operating and technology owners.",
  },
  {
    slug: "transformation-leadership",
    name: "Transformation Execution Authority",
    shortName: "Execution Authority",
    level: "Lead",
    step: "Integration and operational truth",
    duration: "Scope-dependent",
    startingPrice: "$20K/month",
    commercial: "Starting at $20K/month, ranging to $50K/month by complexity",
    question:
      "Who is accountable for the outcome end to end when it is distributed across dozens of teams, systems, decisions, and dependencies?",
    audience:
      "For healthcare transformations whose outcome depends on many teams, applications, vendors, and decisions at once—and where every part has an owner but the whole does not.",
    summary:
      "TKO becomes the integration and operational-truth layer for the program: reconstructing ownership, surfacing the dependencies nobody reported, naming the unresolved decisions preventing closure, testing whether reported status is supported by evidence, and establishing what ready means before anyone declares it.",
    metaDescription:
      "Principal-led healthcare transformation execution authority, $20K–$50K/month, establishing the integration and operational-truth layer complex programs depend on.",
    triggers: [
      "The outcome spans many applications, workflows, products, or delivery partners, and no single role is accountable for the whole.",
      "Every workstream reports green while the enterprise date is visibly at risk.",
      "Dependencies keep surfacing late, discovered by collision rather than by plan.",
      "Decisions sit unresolved for weeks because no one can say who owns them.",
      "Leadership cannot answer whether the organization is ready, only what each team reported.",
    ],
    deliverables: [
      "Ownership registry naming an accountable owner for every element of the outcome, including the work currently owned by nobody",
      "Dependency and critical-path model covering the dependencies no workstream reported",
      "Decision and approval log that names the unresolved decisions blocking closure",
      "Evidence-tested status: whether reported condition is supported by artifacts rather than assertion",
      "An explicit definition of ready, and testing against it",
      "Risk, blocker, and escalation register tied to named owners and dates",
      "Executive decision intelligence rather than a workstream status roll-up",
    ],
    boundaries: [
      "This is a control layer for execution, not a PMO, a reporting layer, or additional project administration.",
      "Scope and price reflect business impact, complexity, access, and accountability—not founder hours.",
      "Client executives retain line authority, budget ownership, and accountable delivery roles.",
      "TKO does not supply a low-cost delivery bench and does not replace accountable client executives.",
      "Technology delivery, specialist partners, travel, and sensitive-data controls are explicitly scoped.",
    ],
    expansionPath:
      "The intended exit is a transformation whose ownership, dependencies, decisions, and readiness definition are established well enough that client leaders and delivery teams operate them without permanent dependence on TKO.",
    capabilityTags: ["Operational truth", "Dependency and critical path", "Decision throughput", "Readiness accountability"],
    faqs: [
      {
        q: "How is this different from our PMO?",
        a: "A PMO collects reported status, tracks reported dependencies, records assigned owners, and escalates overdue actions. This role reconstructs enterprise truth: it finds the dependencies nobody reported, the work with no accountable owner, and the unresolved decision preventing closure, and it tests whether status is supported by evidence. Both are necessary. They are not the same job.",
      },
      {
        q: "Is this priced by the hour?",
        a: "No. Pricing reflects the number of organizations and systems affected, deadline exposure, the number of delivery partners, release and testing complexity, executive-reporting requirements, and how much readiness accountability transfers to TKO. Effort is estimated internally but is not the product.",
      },
      {
        q: "Can TKO work with our integrator?",
        a: "Yes. TKO establishes and governs the operational truth across the program while internal teams and delivery partners retain their appropriate delivery accountabilities.",
      },
    ],
    ctaLabel: "Discuss Execution Authority",
    feeFraming:
      "Fees are set against organizations and systems affected, regulatory or public deadline exposure, program spend and business consequence, number of delivery partners, degree of cross-functional accountability, testing and release complexity, executive-reporting requirements, and responsibility for readiness and escalation.",
    feeBoundary:
      "Every engagement defines objective, deliverables, meeting and access expectations, client responsibilities, exclusions, and the decision for handoff or expansion.",
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
