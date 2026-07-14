export type AuthorityLink = {
  label: string;
  href: string;
  description: string;
};

export type AuthorityScore = {
  evidence: number;
  proof: number;
  diagram: number;
  seo: number;
  commercial: number;
  founder: number;
  healthcare: number;
  crossLink: number;
  freshness: number;
  publicationReadiness: number;
};

export type FrameworkPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  executiveQuestion: string;
  problem: string;
  constraint: string;
  decision: string;
  operatingModel: string;
  tradeoffs: string[];
  failureModes: string[];
  recoveryOpportunities: string[];
  evidence: string[];
  whatChanged: string;
  lessons: string[];
  claimBoundary: string;
  diagram: string;
  relatedGuide: AuthorityLink;
  relatedAssessment: AuthorityLink;
  relatedOffer: AuthorityLink;
  score: AuthorityScore;
};

const rachelosBoundary =
  "RachelOS is direct proof of a founder-built, live relationship operating system. It is not a healthcare product, a compliance claim, or proof of enterprise-scale results.";
const healthcareBoundary =
  "This is an experience-based healthcare operating pattern. It does not identify a client, payer, patient, measured outcome, or deployed product without separately approved evidence.";
const enterpriseBoundary =
  "This is an operating model synthesized from delivery and recovery experience. It is not a claim about a named client result or a guarantee of outcome.";

const launchScore: AuthorityScore = {
  evidence: 4,
  proof: 4,
  diagram: 4,
  seo: 4,
  commercial: 4,
  founder: 3,
  healthcare: 3,
  crossLink: 4,
  freshness: 4,
  publicationReadiness: 4,
};

// Reclassified from Proof to Frameworks: these are synthesized operating models
// and methodologies (experience-based), not direct built-system evidence. They
// render under /frameworks; /proof is reserved for inspectable evidence.
export const frameworkPages: FrameworkPage[] = [
  {
    slug: "prior-authorization",
    title: "Prior Authorization: Make the Decision Model Visible",
    eyebrow: "Healthcare Operating Pattern / Experience-Based",
    description: "A prior-authorization assessment starts with the hidden decision model: exceptions, evidence, escalation, and ownership—not an automation product.",
    executiveQuestion: "Where does prior-authorization work wait because the real decision model is implicit?",
    problem: "Leaders see queues, denials, and staffing pressure, but the operational reason for inconsistent handling is often hidden between routine work, exceptions, payer-specific knowledge, and escalation.",
    constraint: "The usable workflow can depend on experienced people who know which evidence matters, when an exception is real, and who can authorize the next move.",
    decision: "Map decision tiers, required evidence, accountable owner, escalation route, and review point before selecting automation or AI work.",
    operatingModel: "Case intake → evidence check → routine or exception decision → named operational owner or authorized escalation → rationale recorded → next review.",
    tradeoffs: ["Speed versus evidence completeness", "Local judgment versus consistent routing", "Automation scope versus human oversight"],
    failureModes: ["Unowned exception paths", "Payer knowledge trapped in individual heads", "Automation that accelerates inconsistent work"],
    recoveryOpportunities: ["Create a decision-rights matrix", "Instrument repeat exception types", "Use a bounded prior-authorization assessment before funding technology"],
    evidence: ["Published prior-authorization operational-quality guide", "Published decision-rights guide", "Anonymized healthcare operating-experience library"],
    whatChanged: "The operating question moves from ‘Which tool should we buy?’ to ‘Which decision is waiting, what evidence is missing, and who has authority to act?’",
    lessons: ["Administrative burden is evidence of workflow design, not merely capacity", "Gold Card readiness is an output of operational quality", "AI must respect visible decision rights and review"],
    claimBoundary: healthcareBoundary,
    diagram: "flowchart LR\n  A[Case enters] --> B{Routine or exception?}\n  B -->|Routine| C[Named operational owner]\n  B -->|Exception| D[Evidence check]\n  D --> E[Authorized escalation]\n  C --> F[Decision and rationale recorded]\n  E --> F\n  F --> G[Next review]",
    relatedGuide: { label: "Read the decision-rights guide", href: "/insights/prior-authorization-is-a-decision-rights-problem", description: "Why faster tools do not resolve hidden authority." },
    relatedAssessment: { label: "Prior Authorization Assessment", href: "/services/prior-authorization-assessment", description: "A fixed-scope review of burden, exceptions, and decision rights." },
    relatedOffer: { label: "Healthcare Operations", href: "/healthcare", description: "The healthcare workflow and governance service lane." },
    score: { ...launchScore, healthcare: 4, founder: 2 },
  },
  {
    slug: "gold-card",
    title: "Gold Card Readiness Is an Operating-Quality Signal",
    eyebrow: "Healthcare Operating Pattern / Experience-Based",
    description: "Gold Card readiness is not a standalone technology program; it is a signal that authorization workflow quality, exception handling, and evidence discipline are improving.",
    executiveQuestion: "What would have to be true operationally before Gold Card readiness is durable?",
    problem: "Teams can pursue a visible program goal while denials, rework, inconsistent documentation, and informal escalation continue underneath it.",
    constraint: "Readiness cannot be controlled by one policy, queue, or tool when the submission and exception workflow is unstable.",
    decision: "Treat readiness as an outcome of measurable operational quality and use it to focus the work on documentation, exception routing, and repeat friction.",
    operatingModel: "Submission quality → exception classification → payer pattern review → evidence and ownership → workflow improvement → readiness signal.",
    tradeoffs: ["Near-term program target versus durable process quality", "Standardization versus specialty nuance", "Measurement effort versus false confidence"],
    failureModes: ["Treating eligibility as the operating problem", "Measuring submissions without reasons for rework", "Ignoring knowledge concentration"],
    recoveryOpportunities: ["Create a denial and exception taxonomy", "Review documentation completeness before automation", "Name repeat payer-pattern owners"],
    evidence: ["Published prior-authorization operational-quality guide", "Healthcare experience library", "Prior-authorization workflow diagrams"],
    whatChanged: "The discussion becomes an operating-quality review rather than a narrow eligibility chase.",
    lessons: ["Visible targets can hide upstream workflow failure", "Exception patterns are a management signal", "Readiness claims require a measured baseline before publication"],
    claimBoundary: healthcareBoundary,
    diagram: "flowchart LR\n  A[Submission quality] --> B[Exception and denial patterns]\n  B --> C[Evidence and owner]\n  C --> D[Workflow improvement]\n  D --> E[Readiness signal]\n  E --> F[Review, learn, adjust]",
    relatedGuide: { label: "Read the operational-quality guide", href: "/insights/prior-authorization-operational-quality-problem", description: "Why Gold Card is an output, not the operating problem." },
    relatedAssessment: { label: "Prior Authorization Assessment", href: "/services/prior-authorization-assessment", description: "Review the workflow behind readiness." },
    relatedOffer: { label: "Prior Authorization Assessment", href: "/services/prior-authorization-assessment", description: "Make exception and override authority visible." },
    score: { ...launchScore, healthcare: 4, founder: 2 },
  },
  {
    slug: "program-recovery",
    title: "Program Recovery: Recover the Decisions Between Workstreams",
    eyebrow: "Executive Delivery Pattern / Experience-Based",
    description: "A program can report green while dependencies, decision latency, and adoption risk accumulate between workstreams.",
    executiveQuestion: "Which decision is holding the program hostage, and who can make it?",
    problem: "Status reports capture activity but do not always make cross-functional constraints, ownership gaps, or decisions waiting on escalation visible.",
    constraint: "The most material risk often sits between teams, where no single workstream owns the dependency.",
    decision: "Convert material status into a named constraint, evidence, decision owner, tradeoff, and next review date.",
    operatingModel: "Status signal → constraint register → evidence and exposure → accountable decision → action or escalation → next operating review.",
    tradeoffs: ["Reporting volume versus decision focus", "Local autonomy versus sponsor intervention", "Early escalation versus meeting noise"],
    failureModes: ["False green status", "Unowned dependency", "Decisions deferred until the impact is irreversible"],
    recoveryOpportunities: ["Create a cross-workstream constraint register", "Separate status from decision requests", "Run a decision-centered executive operating review"],
    evidence: ["Published operational-intelligence guide", "Selected enterprise program-recovery work", "Healthcare transformation experience library"],
    whatChanged: "Executive attention shifts from narrated progress to the specific decision or dependency that changes the program’s trajectory.",
    lessons: ["Green status is not operating control", "Decision latency is a recoverable operating risk", "A meeting should produce a decision, escalation, or explicit stop"],
    claimBoundary: enterpriseBoundary,
    diagram: "flowchart LR\n  A[Workstream status] --> B[Named constraint]\n  B --> C[Evidence and exposure]\n  C --> D{Executive decision}\n  D --> E[Action or escalation]\n  E --> F[Owner and review date]",
    relatedGuide: { label: "Read operational intelligence vs. reporting", href: "/insights/operational-intelligence-vs-reporting", description: "Why dashboards can leave work stuck." },
    relatedAssessment: { label: "Recovery", href: "/services/recovery", description: "A bounded recovery review for a program under pressure." },
    relatedOffer: { label: "Recovery", href: "/services/recovery", description: "Prioritize recovery decisions across a portfolio." },
    score: { ...launchScore, healthcare: 2, founder: 3 },
  },
  {
    slug: "executive-operating-system",
    title: "Executive Operating System: From Status to Decision",
    eyebrow: "Executive Operating Pattern / Direct Method Proof",
    description: "An executive operating system makes constraints, decision rights, evidence, ownership, and escalation visible at the cadence where leaders can act.",
    executiveQuestion: "Does the executive review surface decisions that can change the operating system this week?",
    problem: "Leaders have dashboards, meetings, and updates but may lack an operating view of what is blocked, who owns the next decision, and what changes if the decision waits.",
    constraint: "Executive time is scarce; a review cannot carry every detail, only evidence that changes a decision or an escalation path.",
    decision: "Use a decision-centered review with constraints, evidence, owner, tradeoffs, decision date, and escalation condition.",
    operatingModel: "Signals → current constraint → evidence → decision rights → accountable action → review and learning.",
    tradeoffs: ["Concise review versus operating nuance", "Escalation discipline versus local autonomy", "Cadence versus analysis time"],
    failureModes: ["Status meetings that produce no decision", "Dashboard green masking cross-functional risk", "No audit trail for why priorities changed"],
    recoveryOpportunities: ["Adopt a one-page executive operating review", "Create decision and constraint registers", "Link every material priority to an accountable owner"],
    evidence: ["RachelOS canonical queue and system-health proof", "Published operational-intelligence guide", "Assessment method and executive briefing structure"],
    whatChanged: "The review makes hidden work and decision bottlenecks visible enough to act on before they become a larger recovery problem.",
    lessons: ["Reporting and operating control are different", "The next decision is often more valuable than another status update", "AI can accelerate synthesis but should not own executive judgment"],
    claimBoundary: enterpriseBoundary,
    diagram: "flowchart LR\n  A[Operating signals] --> B[Constraint register]\n  B --> C[Evidence and owner]\n  C --> D[Executive decision]\n  D --> E[Action, escalation, or stop]\n  E --> F[Next review]",
    relatedGuide: { label: "Read operational intelligence vs. reporting", href: "/insights/operational-intelligence-vs-reporting", description: "The distinction behind the operating review." },
    relatedAssessment: { label: "Fractional Leadership", href: "/services/fractional-leadership", description: "Design a decision-centered executive review." },
    relatedOffer: { label: "Recovery", href: "/services/recovery", description: "Find the highest-leverage recovery move." },
    score: { ...launchScore, healthcare: 2, founder: 4 },
  },
  {
    slug: "ai-governance",
    title: "AI Governance: Assistance Must Stay Inside the Operating Model",
    eyebrow: "AI Delivery Pattern / RachelOS Direct Proof",
    description: "AI can extract, draft, and recommend. It should not create its own authority, bypass human approval, or hide the rationale for consequential work.",
    executiveQuestion: "Which operating controls must exist before an AI recommendation can affect real work?",
    problem: "AI initiatives often focus on model capability before source authority, review rights, exception handling, and outcome visibility are designed.",
    constraint: "A model response cannot establish its own authority or approval rights; the workflow must define them.",
    decision: "Separate source-aware facts, bounded recommendation, human approval, governed action, and outcome logging into visible control points.",
    operatingModel: "Source-aware facts → bounded recommendation → human approval → governed action → outcome and audit log → operational visibility.",
    tradeoffs: ["Cycle time versus control", "Automation breadth versus explainability", "Model capability versus operator authority"],
    failureModes: ["AI-derived information treated as truth", "Unapproved action", "No traceable rationale or review path"],
    recoveryOpportunities: ["Define source precedence", "Add explicit approval lifecycle states", "Instrument outcomes and exceptions before expanding automation"],
    evidence: ["RachelOS human-approval proof surface", "RachelOS relationship-memory proof surface", "Published AI-assisted delivery guide"],
    whatChanged: "The AI conversation moves from tool selection to operating control, with humans retaining authority for consequential action.",
    lessons: ["AI is an accelerator, not the operating model", "A recommendation is not an authorized action", "Production readiness requires observability, not only deployment"],
    claimBoundary: rachelosBoundary,
    diagram: "flowchart TB\n  A[Source-aware facts] --> B[Bounded recommendation]\n  B --> C[Human approval]\n  C --> D[Governed action]\n  D --> E[Outcome and audit log]\n  E --> F[Operational visibility]",
    relatedGuide: { label: "Read what AI-assisted delivery compresses", href: "/insights/what-ai-assisted-delivery-compresses", description: "The delivery evidence and its limits." },
    relatedAssessment: { label: "Enterprise AI", href: "/services/enterprise-ai", description: "Assess readiness, control, and operating fit." },
    relatedOffer: { label: "Recovery", href: "/services/recovery", description: "Connect AI assistance to an accountable workflow." },
    score: { ...launchScore, healthcare: 2, founder: 4 },
  },
];

export type FounderPage = {
  slug: string;
  title: string;
  description: string;
  evidence: string[];
  operatingPoint: string;
  claimBoundary: string;
  relatedProof: AuthorityLink;
};

export const founderPages: FounderPage[] = [
  { slug: "what-i-have-built", title: "What I Have Built", description: "The direct build record starts with RachelOS: a live system of action that preserves relationship memory, establishes source-aware facts, prioritizes work, and keeps approval visible.", evidence: ["RachelOS proof surfaces", "Current-state and architecture records", "Published AI-assisted delivery analysis"], operatingPoint: "Build proof is strongest when the operating surface, control model, and boundary can be inspected—not merely described.", claimBoundary: rachelosBoundary, relatedProof: { label: "Inspect RachelOS", href: "/proof/rachelos", description: "Direct founder-built system proof." } },
  { slug: "what-i-have-owned", title: "What I Have Owned", description: "The operating record focuses on workflow modernization, governance, delivery recovery, and the decisions required to move complex work across functions.", evidence: ["Selected healthcare work", "Healthcare experience library", "Decision and delivery records"], operatingPoint: "Ownership means carrying the consequences of a decision through workflow, adoption, escalation, and evidence—not only issuing a recommendation.", claimBoundary: healthcareBoundary, relatedProof: { label: "Review selected work", href: "/selected-work", description: "Bounded healthcare and enterprise operating context." } },
  { slug: "how-i-think", title: "How I Think", description: "Start with the operating constraint, reconstruct the real workflow, make the next decision visible, and introduce AI only where human authority and evidence are explicit.", evidence: ["Operational intelligence guide", "RachelOS operating pattern", "Assessment method"], operatingPoint: "The useful unit of change is not a feature or a workshop. It is a decision that has evidence, an owner, a tradeoff, and an action path.", claimBoundary: enterpriseBoundary, relatedProof: { label: "Read the operating model", href: "/frameworks/executive-operating-system", description: "The decision-centered recovery method." } },
  { slug: "operating-principles", title: "Operating Principles", description: "Make hidden work visible. Separate fact from interpretation. Keep consequential approvals human. Treat status as a route to a decision. Preserve the evidence behind the claim.", evidence: ["RachelOS source-authority and approval design", "Evidence-led proof hub", "Published guides"], operatingPoint: "Operating principles matter only when the workflow makes them observable and testable.", claimBoundary: rachelosBoundary, relatedProof: { label: "Review AI governance proof", href: "/frameworks/ai-governance", description: "Controls are part of the operating model." } },
  { slug: "difficult-decisions", title: "Difficult Decisions", description: "The hard decisions are often constraints: what not to automate, which claim not to make, when to stop a build, and when a visible target is masking an upstream operating failure.", evidence: ["AI delivery decision log", "Claim-boundary standards", "RachelOS activation and approval controls"], operatingPoint: "A reliable operator records decisions against scale, autonomy, or speed when the evidence does not support them.", claimBoundary: rachelosBoundary, relatedProof: { label: "Read AI delivery evidence", href: "/insights/what-ai-assisted-delivery-compresses", description: "What the delivery model did and did not compress." } },
  { slug: "what-i-got-wrong", title: "What I Got Wrong", description: "The operating record includes gaps: built capability is not adoption, automation is not authority, and a high-functioning person can mask an ungoverned system until they become the bottleneck.", evidence: ["RachelOS proof boundaries", "Built → activated → validated method", "TIF human-review requirements"], operatingPoint: "Learning is credible when the gap changes the operating design, the claim boundary, or the activation gate.", claimBoundary: rachelosBoundary, relatedProof: { label: "Inspect RachelOS boundaries", href: "/proof/rachelos", description: "Direct proof and explicit limits." } },
  { slug: "healthcare", title: "Healthcare", description: "Healthcare is the proving ground for complex workflow, administrative burden, decision rights, exception handling, and cross-functional governance. Public claims remain experience-based unless separately evidenced.", evidence: ["Healthcare experience library", "Prior-authorization guides", "Healthcare workflow diagrams"], operatingPoint: "Healthcare work makes the difference between a visible process and the actual operating model impossible to ignore.", claimBoundary: healthcareBoundary, relatedProof: { label: "Review prior authorization proof", href: "/frameworks/prior-authorization", description: "A bounded healthcare operating pattern." } },
  { slug: "ai-delivery", title: "AI Delivery", description: "AI-assisted delivery can compress coordination and construction. It does not compress executive judgment, domain validation, activation discipline, or accountability for the production system.", evidence: ["Published AI-assisted delivery guide", "RachelOS system-health and approval proof", "Decision record"], operatingPoint: "AI raises the importance of operating judgment because construction gets cheaper while the risk of building the wrong thing remains.", claimBoundary: rachelosBoundary, relatedProof: { label: "Review AI governance proof", href: "/frameworks/ai-governance", description: "The control model behind AI assistance." } },
];

export type OfferPage = {
  slug: string;
  title: string;
  description: string;
  forWhom: string;
  signals: string[];
  process: string[];
  deliverables: string[];
  evidence: string[];
  claimBoundary: string;
  relatedProof: AuthorityLink;
  primaryQuery: string;
  executiveQuestion: string;
};

const offers: Omit<OfferPage, "slug" | "title" | "description" | "forWhom" | "signals" | "process" | "deliverables" | "evidence" | "claimBoundary" | "relatedProof" | "primaryQuery" | "executiveQuestion"> = {};

export const offerPages: OfferPage[] = [
  { slug: "executive-recovery", title: "Executive Recovery Assessment", description: "A focused assessment for leaders who need to identify the highest-exposure workflow constraint and the next recovery decision before committing to a larger intervention.", forWhom: "CEOs, COOs, transformation sponsors, and owner-operators with visible activity but unclear operating control.", signals: ["The same issues recur in operating reviews", "A few people carry the workflow", "Status is green but decisions continue to wait"], process: ["Frame the executive question and workflow", "Review evidence, handoffs, and decision points", "Map constraints, ownership, and exposure", "Deliver the next highest-leverage move"], deliverables: ["Constraint map", "Decision-rights view", "Recovery priorities", "Executive briefing"], evidence: ["Assessment method", "Executive operating-system proof", "Operational-intelligence guide"], claimBoundary: enterpriseBoundary, relatedProof: { label: "Executive operating system proof", href: "/frameworks/executive-operating-system", description: "The decision-centered method." }, primaryQuery: "executive recovery assessment", executiveQuestion: "What must leadership decide to recover execution now?" },
  { slug: "healthcare-operating", title: "Healthcare Operating Assessment", description: "A bounded healthcare workflow assessment for administrative burden, decision rights, exception handling, and governance before technology or AI recommendations.", forWhom: "Healthcare operations and transformation leaders with workflow friction that crosses roles, systems, and informal expertise.", signals: ["Manual reconciliation is routine", "Exceptions depend on experienced staff", "Technology plans lack a clear operating model"], process: ["Confirm the workflow and decision pressure", "Review artifacts and operating signals", "Map handoffs, exceptions, and authority", "Return a bounded operating assessment"], deliverables: ["Workflow and exception map", "Decision-rights analysis", "Governance risks", "Sequenced recovery options"], evidence: ["Healthcare experience library", "Prior-authorization proof", "Healthcare guides"], claimBoundary: healthcareBoundary, relatedProof: { label: "Prior authorization proof", href: "/frameworks/prior-authorization", description: "A healthcare operating pattern." }, primaryQuery: "healthcare operations assessment", executiveQuestion: "Where does healthcare work depend on invisible decisions?" },
  { slug: "prior-authorization", title: "Prior Authorization Assessment", description: "A fixed-scope assessment of administrative burden, denial drivers, exception handling, Human API dependency, and decision rights in prior authorization.", forWhom: "Prior-authorization and provider-operations leaders facing rework, denials, staffing pressure, and inconsistent exception handling.", signals: ["Payer-specific knowledge lives in a few people", "Denials create recurring rework", "Gold Card readiness is treated as a technology project"], process: ["Review submissions, denials, and workflow artifacts", "Identify repeat exceptions and knowledge concentration", "Map evidence, authority, and escalation", "Deliver a quality and recovery view"], deliverables: ["Burden and denial analysis", "Exception taxonomy", "Human API risk view", "Gold Card readiness boundary"], evidence: ["Published prior-authorization guides", "Healthcare diagrams", "Experience library"], claimBoundary: healthcareBoundary, relatedProof: { label: "Prior authorization proof", href: "/frameworks/prior-authorization", description: "Make the decision model visible." }, primaryQuery: "prior authorization assessment", executiveQuestion: "What is making authorization quality inconsistent?" },
  { slug: "program-recovery", title: "Program Recovery Assessment", description: "A recovery assessment for transformation programs where cross-functional dependencies, decision latency, or adoption risk are hidden behind status reporting.", forWhom: "Transformation sponsors, portfolio leaders, COOs, and CIOs responsible for programs that are active but not reliably moving.", signals: ["Critical dependencies have no clear owner", "Escalations recur without resolution", "Status reports do not surface decision requests"], process: ["Select the program under pressure", "Review workstream evidence and governance", "Surface constraints and decision dependencies", "Create a recovery sequence"], deliverables: ["Constraint register", "Dependency view", "Decision calendar", "Recovery briefing"], evidence: ["Program-recovery proof", "Operational-intelligence guide", "Selected enterprise work"], claimBoundary: enterpriseBoundary, relatedProof: { label: "Program recovery proof", href: "/frameworks/program-recovery", description: "Recover decisions between workstreams." }, primaryQuery: "program recovery assessment", executiveQuestion: "Which decision is holding the program hostage?" },
  { slug: "executive-ai", title: "Executive AI Assessment", description: "An assessment of where AI can safely reduce friction, improve decision support, and stay within human authority and operating controls.", forWhom: "CIOs, COOs, product leaders, and AI sponsors facing pressure to move from pilots to trustworthy operating use.", signals: ["AI recommendations lack clear review rights", "Source authority is unresolved", "Teams report features without activation or evidence"], process: ["Identify the workflow and intended decision", "Review source, control, and approval boundaries", "Map risks and readiness", "Recommend a bounded next move"], deliverables: ["AI control model", "Source-authority view", "Approval lifecycle", "Activation and evidence criteria"], evidence: ["RachelOS approval proof", "AI governance proof", "AI-assisted delivery guide"], claimBoundary: rachelosBoundary, relatedProof: { label: "AI governance proof", href: "/frameworks/ai-governance", description: "The operating controls behind assistance." }, primaryQuery: "executive AI assessment", executiveQuestion: "Can AI affect this workflow without creating hidden control risk?" },
  { slug: "operational-intelligence", title: "Operational Intelligence Assessment", description: "A diagnostic for teams that have reports and tools but cannot see where work is stuck, who owns the next decision, or what action is required.", forWhom: "Operations, revenue, product, and transformation leaders who need a shared operating view rather than another dashboard.", signals: ["Operating reviews narrate status rather than decide", "Priorities are rebuilt manually", "The next action depends on personal memory"], process: ["Identify the operating question", "Review current signals and work surfaces", "Map visibility, priority, and decision gaps", "Define the smallest viable operating view"], deliverables: ["Current-state map", "Constraint and decision model", "Priority and escalation design", "Executive briefing"], evidence: ["RachelOS canonical queue", "Operational intelligence guide", "Executive operating-system proof"], claimBoundary: enterpriseBoundary, relatedProof: { label: "Executive operating system proof", href: "/frameworks/executive-operating-system", description: "Turn status into a decision." }, primaryQuery: "operational intelligence assessment", executiveQuestion: "Why is reporting not creating action?" },
  { slug: "decision-rights-workshop", title: "Decision Rights Workshop", description: "A structured working session to make routine decisions, exceptions, overrides, evidence, escalation, and audit boundaries explicit.", forWhom: "Leaders who need to reduce inconsistency before automating or scaling a workflow.", signals: ["Different people make the same case move differently", "Exceptions wait for informal experts", "No one can explain who may override the normal path"], process: ["Select the decision domain", "Inventory routine and exception decisions", "Name evidence, authority, and escalation", "Review the resulting matrix with sponsors"], deliverables: ["Decision-rights matrix", "Exception ladder", "Evidence requirements", "Facilitated executive readout"], evidence: ["Prior-authorization decision-rights guide", "Healthcare decision-rights diagram", "RachelOS approval model"], claimBoundary: healthcareBoundary, relatedProof: { label: "Prior authorization proof", href: "/frameworks/prior-authorization", description: "Decision rights before automation." }, primaryQuery: "decision rights workshop", executiveQuestion: "Who is allowed to decide, based on what evidence?" },
  { slug: "portfolio-recovery", title: "Portfolio Recovery", description: "A portfolio-level view of where programs, workstreams, and operating dependencies need executive attention before the cost of waiting grows.", forWhom: "Portfolio leaders, operating partners, transformation offices, and executives managing several competing recovery decisions.", signals: ["Programs compete for the same experts", "Escalations have no common decision cadence", "Portfolio status obscures cross-program dependency risk"], process: ["Frame the portfolio decisions", "Review program constraints and dependency signals", "Rank exposure and recoverability", "Create an executive recovery agenda"], deliverables: ["Portfolio constraint map", "Exposure ranking", "Decision agenda", "Recovery cadence"], evidence: ["Program-recovery proof", "Executive operating-system proof", "Assessment method"], claimBoundary: enterpriseBoundary, relatedProof: { label: "Program recovery proof", href: "/frameworks/program-recovery", description: "The recovery pattern at program level." }, primaryQuery: "portfolio recovery consulting", executiveQuestion: "Where should executives intervene first?" },
  { slug: "executive-operating-review", title: "Executive Operating Review", description: "Design a recurring executive review that turns status into named constraints, evidence, decisions, accountable owners, and escalation paths.", forWhom: "Executive teams that need a more useful operating cadence without adding another reporting layer.", signals: ["Meetings produce updates but not decisions", "The same blockers return", "Escalation depends on personal follow-up"], process: ["Review current cadence and decisions", "Define the core operating questions", "Create constraint and decision views", "Run and refine the executive review"], deliverables: ["Operating-review template", "Constraint register", "Decision register", "Escalation cadence"], evidence: ["Operational-intelligence guide", "Executive operating-system proof", "RachelOS health and queue proof"], claimBoundary: enterpriseBoundary, relatedProof: { label: "Executive operating system proof", href: "/frameworks/executive-operating-system", description: "A decision-centered review model." }, primaryQuery: "executive operating review", executiveQuestion: "Does the executive meeting create the next decision?" },
];

void offers;

export const searchClusters = [
  { problem: "Decision Latency", guide: "/insights/operational-intelligence-vs-reporting", diagram: "/frameworks/executive-operating-system", proof: "/frameworks/program-recovery", offer: "/services/recovery", audience: "CEO, COO, transformation sponsor" },
  { problem: "Prior Authorization Quality", guide: "/insights/prior-authorization-operational-quality-problem", diagram: "/frameworks/prior-authorization", proof: "/frameworks/gold-card", offer: "/services/prior-authorization-assessment", audience: "Prior-authorization or provider-operations leader" },
  { problem: "Key-Person Dependency", guide: "/insights/human-apis-become-organizational-bottlenecks", diagram: "/proof/rachelos", proof: "/proof/rachelos", offer: "/services/recovery", audience: "COO, owner-operator, operations leader" },
  { problem: "AI Governance", guide: "/insights/what-ai-assisted-delivery-compresses", diagram: "/frameworks/ai-governance", proof: "/frameworks/ai-governance", offer: "/services/enterprise-ai", audience: "CIO, COO, product leader" },
];

export function getFrameworkPage(slug: string) {
  return frameworkPages.find((page) => page.slug === slug);
}

export function getFounderPage(slug: string) {
  return founderPages.find((page) => page.slug === slug);
}

export function getOfferPage(slug: string) {
  return offerPages.find((page) => page.slug === slug);
}

export function isPublicationReady(score: AuthorityScore) {
  return Object.values(score).every((value) => value >= 3);
}
