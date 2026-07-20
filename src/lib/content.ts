export const problems = [
  {
    title: "Administrative Burden",
    description:
      "Prior authorization, utilization management, care management, and provider operations create manual work that slows care and consumes operating capacity.",
  },
  {
    title: "Transformation Recovery",
    description:
      "Modernization programs can report progress while dependency risk, decision latency, and adoption gaps accumulate between teams.",
  },
  {
    title: "Key-Person Dependency",
    description:
      "Critical knowledge lives in a few key people. When they are overloaded, unavailable, or leave, execution slows down.",
  },
  {
    title: "Operational Visibility Gaps",
    description:
      "Reports show activity and status, but they do not show where work is stuck, who owns the next decision, or which risk needs attention.",
  },
  {
    title: "Workflow Friction",
    description:
      "Teams spend time reconciling status, chasing handoffs, and managing work instead of advancing work.",
  },
  {
    title: "AI Without Operational Control",
    description:
      "AI can summarize or draft, but it does not become trusted healthcare execution unless human approval, workflow fit, and decision rights are designed in.",
  },
  {
    title: "Execution Visibility Failure",
    description:
      "Work crosses teams, vendors, systems, and business units without a shared layer that shows current state and required action.",
  },
  {
    title: "Workflow Governance",
    description:
      "Exception handling, escalation paths, decision rights, and auditability must be designed before automation can safely improve the work.",
  },
];

export const truthFramework = [
  "What is supposed to happen?",
  "What actually happens?",
  "Where does work stall?",
  "What is known but unused?",
  "What should the next action be?",
  "Where can automation or AI help without taking control?",
  "How is success measured?",
];

export const systemFlow = [
  "Signals",
  "Memory",
  "Facts",
  "State",
  "Priority",
  "Recommendation",
  "Human Approval",
  "Action",
  "Outcome",
];

export const operatingFramework = [
  {
    stage: "Signals",
    description:
      "Activity from email, calls, tickets, CRMs, reports, meetings, and conversations enters the decision layer.",
  },
  {
    stage: "Memory",
    description:
      "Operational knowledge persists across time and source instead of disappearing into individual people or one-off meetings.",
  },
  {
    stage: "Facts",
    description:
      "Signals resolve into source-aware, governed facts that teams can trust.",
  },
  {
    stage: "State",
    description:
      "Facts roll up into a current view of the workflow, relationship, customer, case, or account.",
  },
  {
    stage: "Priority",
    description:
      "The system identifies what matters, who needs attention, and where escalation may be required.",
  },
  {
    stage: "Human Approval",
    description:
      "A person reviews and authorizes important recommendations before action is taken.",
  },
  {
    stage: "Action",
    description:
      "The team works from trusted next actions and measures whether the decision improved execution.",
  },
];

export const founderCredibility = [
  "Operator First",
  "Healthcare Leadership",
  "Workflow Transformation",
  "Enterprise Modernization",
  "Financial Services",
  "Wealth Management",
  "Operational Execution",
];

export const services = [
  {
    slug: "recovery-assessment",
    title: "Operational Recovery Assessment",
    shortTitle: "Assessment",
    price: "Retired entry offer",
    duration: "1 week",
    entry: "Low-friction entry point",
    featured: false,
    summary:
      "A focused assessment for leaders who need to find the bottleneck, business exposure, and highest-leverage next move before committing to a larger solution.",
    overview:
      "The Operational Recovery Assessment is a fixed-scope engagement for teams facing execution drag, stalled transformation, revenue risk, or an AI initiative without a clear business case. It identifies the bottleneck, key-person dependency, and decision leadership needs to make next.",
    outcomes: [
      "Evidence-based view of the top places work stalls.",
      "Identification of key-person dependency and the risk it creates.",
      "Honest read on where AI can safely help and where it cannot yet.",
      "Single highest-leverage next move before larger spend is committed.",
      "Clear path to stop, deepen into a Diagnostic, or move toward a focused build.",
    ],
    process: [
      "Confirm the trigger, workflow area, sponsor, and assessment scope.",
      "Review existing workflow artifacts, reports, dashboards, and operating signals.",
      "Interview the people closest to the stalled work.",
      "Map bottlenecks, dependencies, AI readiness, and operational risk.",
      "Deliver the executive briefing and recommended next move.",
    ],
    deliverables: [
      "Workflow map",
      "Bottleneck analysis",
      "Dependency analysis",
      "AI readiness assessment",
      "Operational risk assessment",
      "Executive briefing",
    ],
    faqs: [
      {
        q: "When is the Assessment enough?",
        a: "It is enough when leadership needs a fast, fixed-scope view of the most likely stall, dependency, or AI adoption risk before choosing the next move.",
      },
      {
        q: "How is this different from the Diagnostic?",
        a: "The Assessment is a one-week triage. The Diagnostic is deeper evidence work across stakeholder interviews, governance, escalation, operating model, and a 90-day roadmap.",
      },
      {
        q: "Is this an AI tool recommendation?",
        a: "No. The Assessment determines where AI can safely help inside the workflow and where the operating model needs to be fixed first.",
      },
    ],
  },
  {
    slug: "diagnostic",
    title: "Operational Truth & AI Workflow Diagnostic",
    shortTitle: "Flagship Diagnostic",
    price: "Fixed-scope engagement",
    duration: "15 business days",
    entry: "Flagship engagement",
    featured: true,
    summary:
      "In three weeks, identify where one critical workflow is losing time, knowledge, and accountability, then define a governed AI-assisted operating model and prioritized 90-day plan.",
    overview:
      "A fixed-scope, three-week engagement for a COO, transformation leader, chief of staff, operations executive, business-unit president, or operating partner accountable for a critical workflow that depends on hidden coordination, undocumented judgment, and unreliable handoffs.",
    outcomes: [
      "The real workflow, including exceptions, workarounds, and undocumented judgment.",
      "Bottlenecks, duplicate effort, handoff failures, decision delays, and human-API dependencies.",
      "AI opportunities ranked by value, feasibility, evidence, and risk, with human controls defined.",
      "Future-state workflow, decision ownership, baseline measures, and realistic opportunity ranges.",
      "A prioritized 90-day implementation roadmap and executive decision brief.",
    ],
    process: [
      "Confirm one critical workflow or tightly related workflow family, sponsor, business decision, and evidence boundary.",
      "Review existing, appropriately de-identified artifacts; no production-system access is required.",
      "Interview six to ten stakeholders close to the work and compare the official process with operating reality.",
      "Map exceptions, handoffs, delays, decision rights, knowledge dependencies, measures, and control requirements.",
      "Rank AI-assisted opportunities by business value, feasibility, evidence, privacy, and operational risk.",
      "Run one working session and deliver one executive readout with the future-state model and 90-day plan.",
    ],
    deliverables: [
      "Current-state workflow and exception map",
      "Bottleneck, handoff, and decision-delay analysis",
      "Human-API and knowledge-loss risk analysis",
      "Prioritized AI opportunity and control model",
      "Future-state workflow and decision ownership",
      "Baseline measures and opportunity ranges",
      "Prioritized 90-day implementation roadmap",
      "Executive decision brief and readout",
    ],
    faqs: [
      {
        q: "What makes this different from a consulting assessment?",
        a: "It is a constrained evidence exercise around one critical workflow. It maps how work actually moves, ranks AI opportunities, defines human controls, and ends with a prioritized decision and implementation path.",
      },
      {
        q: "Do we need clean data before starting?",
        a: "No. Appropriately de-identified artifacts and stakeholder interviews are enough to begin. No production-system access is required.",
      },
      {
        q: "Do we need an AI initiative?",
        a: "No. The Diagnostic starts with the operating problem. AI is considered only where it can improve a measurable workflow with appropriate evidence, privacy, human review, and auditability.",
      },
      {
        q: "What is not included?",
        a: "Production implementation, software development, staff augmentation, unlimited advisory access, and scope beyond the agreed workflow are excluded. Implementation is sold separately.",
      },
    ],
  },
  {
    slug: "operating-system-build",
    title: "AI-Assisted Operations Implementation",
    shortTitle: "Implementation",
    price: "Separate implementation scope",
    investmentSummary: "Three-month initial term",
    duration: "3 months",
    entry: "Diagnostic expansion path",
    featured: true,
    summary:
      "Install the prioritized workflow, operating cadence, controls, measures, knowledge system, and first practical AI-assisted use cases identified by the Diagnostic.",
    overview:
      "A bounded three-month implementation engagement that turns Diagnostic findings into a working operating model. It is not unlimited advisory access, staff augmentation, generic AI training, a software-development agency engagement, or an outsourced operations department.",
    outcomes: [
      "A working operating model for the prioritized workflow.",
      "Team workflow designed around prioritization, approval, and action.",
      "Better visibility into gaps, stalls, and escalation risk before opportunities are missed.",
      "Operational memory that preserves institutional knowledge beyond individual people.",
      "Baseline measures, operating cadence, and handoff for the internal team.",
    ],
    process: [
      "Validate diagnostic findings and current-state constraints.",
      "Design the target workflow, decision rules, and action model.",
      "Define source authority, operational state, priority logic, escalation triggers, and human approval points.",
      "Create the action queue, alerting model, and measurement loop.",
      "Install the first practical AI-assisted use cases with evidence, privacy, auditability, and human approval controls.",
      "Test the workflow, establish the operating cadence, measure adoption, and hand off ownership.",
    ],
    deliverables: [
      "Workflow redesign",
      "Decision layer design",
      "Operational memory model",
      "Prioritization and action model",
      "Human-in-the-loop AI review model",
      "Action queues and escalation detection",
      "Intelligence capture workflow",
      "Measurement model",
      "Handoff documentation and team training",
    ],
    faqs: [
      {
        q: "Can this be bought without the Diagnostic?",
        a: "Normally, no. Implementation follows the TKO Diagnostic or an equivalent, credible current-state assessment with a known workflow, owner, evidence base, and business case.",
      },
      {
        q: "Is this software development?",
        a: "It installs the operating model, controls, measures, and first bounded AI-assisted use cases. Custom development, integrations, and vendor management must be explicitly scoped.",
      },
      {
        q: "Where does AI fit?",
        a: "AI can extract facts, draft recommendations, or reduce burden only where governance, exception handling, and human approval are designed into the workflow.",
      },
    ],
  },
  {
    slug: "fractional-advisor",
    title: "Fractional Operational Intelligence Advisor",
    shortTitle: "Fractional",
    price: "Separate advisory scope",
    investmentSummary: "Scoped to program size",
    duration: "3-6 months",
    entry: "Post-diagnostic or post-build retainer",
    featured: false,
    summary:
      "Ongoing operating support for leadership teams that need to improve execution, remove constraints, and keep transformation tied to business results.",
    overview:
      "The Fractional Operational Intelligence Advisor engagement helps leadership teams keep operational reviews, prioritization, workflow governance, AI adoption, and execution oversight tied to real operating evidence.",
    outcomes: [
      "Leadership has a trusted operating view of priorities, risks, and required decisions.",
      "Workflow governance and prioritization stay aligned with operational reality.",
      "AI adoption remains grounded in human-approved workflow and business value.",
      "Internal teams develop stronger execution discipline over time.",
    ],
    process: [
      "Establish the operational review cadence and sponsor reporting rhythm.",
      "Review progress, risks, blockers, and dependency health weekly.",
      "Maintain workflow governance, backlog discipline, and prioritization reviews.",
      "Provide monthly operational intelligence review and sponsor brief.",
      "Guide AI adoption and decision-rights evolution as work changes.",
    ],
    deliverables: [
      "Operational reviews",
      "Workflow governance",
      "AI adoption guidance",
      "Prioritization reviews",
      "Execution oversight",
      "Monthly executive status brief",
    ],
    faqs: [
      {
        q: "Is this staff augmentation?",
        a: "No. The role is senior operational intelligence advisory, governance discipline, and sponsor visibility after a diagnostic or build.",
      },
      {
        q: "Can it start without prior TKO work?",
        a: "Only in narrow warm-referral situations where the operating problem is already clear. The normal path is diagnostic or build conversion.",
      },
      {
        q: "What is excluded?",
        a: "Hands-on implementation, direct employee management, legal or regulatory advisory, and software development are not included unless separately scoped.",
      },
    ],
  },
];

export const industries = [
  {
    title: "Healthcare",
    priority: "Operations focus",
    description:
      "Operational efficiency, administrative burden, workflow modernization, AI adoption, process visibility, and care operations.",
  },
  {
    title: "Financial Services",
    priority: "Relationship focus",
    description:
      "Client engagement, advisor productivity, operational scale, relationship visibility, and workflow consistency.",
  },
  {
    title: "Technology",
    priority: "Execution focus",
    description:
      "Customer success, revenue operations, adoption, operational execution, and workflow automation.",
  },
  {
    title: "Private Equity",
    priority: "Value creation focus",
    description:
      "Value creation, operating models, portfolio performance, execution visibility, and operational leverage.",
  },
];

export const caseStudies = [
  {
    slug: "from-crm-to-operating-system",
    title: "RachelOS Operational Knowledge System",
    industry: "Live operating environment",
    proofLevel: "Featured proof",
    problem:
      "The business ran on relationships but had no system of action. The data, notes, and messages existed, yet who needed attention and what to do next lived only in one person's judgment. Every priority call and every follow-up depended on that person being available.",
    situation:
      "One operator carried 100+ active relationships across fragmented notes, inconsistent follow-up, and context that existed nowhere but memory. The business could not see its own pipeline without that person, and could not scale past their attention.",
    truth:
      "This is the human API pattern. The signals were all present, but priority, timing, missing context, and the next action all routed through a single person. That person was the operating system, and an operating system that cannot hand off or survive a bad week is a business risk, not a feature.",
    system:
      "TKO built an Operational Knowledge System that captures relationship knowledge as durable facts, preserves institutional memory beyond any individual, surfaces who needs attention, and recommends the next action with an explanation. A human approves every AI-assisted step before it moves the work forward.",
    outcome:
      "Leadership now works from one trusted next action instead of one person's recall. Relationship context is visible, follow-up no longer depends on memory, and institutional knowledge persists when people are out or move on. No revenue attribution is claimed. The demonstrated outcome is a governed decision layer running daily production work.",
    evidence: [
      "Live operating environment with relationship memory, priority surfacing, action queues, intelligence gaps, outreach drafts, and daily execution support.",
      "Human approval remains part of the workflow before AI-assisted outreach is used.",
      "Operational outcomes are stated without inflated revenue claims or unverifiable metrics.",
    ],
    relatedProblems: ["Key-Person Dependency", "Operational Visibility Gaps", "Workflow Governance"],
    relatedService: "AI-Assisted Operations Implementation",
  },
  {
    slug: "rachelos-delivery-model",
    title: "What It Actually Takes to Build a Production Operating System With AI",
    industry: "Live operating environment",
    proofLevel: "Featured proof",
    problem:
      "A production relationship-intelligence and revenue-operations system was delivered over ten months through an operator-led, AI-assisted model, a scope that conventionally crosses competency boundaries distributed across 12–18 professional roles.",
    situation:
      "The system was built while serving real production leads the entire time: 1,528 commits by a single accountable operator-builder, 67 database migrations, 25 operator screens, and 1,341 test cases, with a practicing domain authority wired in as the human approval layer.",
    truth:
      "AI compressed execution and coordination. The handoff and meeting layer between roles was replaced by a log of 83 dated architecture decisions. It did not compress judgment, domain validation, reliability engineering, adoption, or accountability.",
    system:
      "AI drafts and extracts under written governance; deterministic code derives state; humans take every action. Human-recorded facts are immutable by AI, outbound messages require human approval before send, and every capability is graded implemented, activated, validated, or unvalidated.",
    outcome:
      "A governed operating system runs daily production work with human judgment preserved by architecture. The published account includes its open limitations, a 2.2% measured email-first reply rate, dormant integrations, a bus factor of one, because the transferable asset is the evidence method itself.",
    evidence: [
      "Delivery evidence is repository-verified: 1,528 single-author commits over ten months, 67 SQL migrations, 145 test files, and roughly 38% of all written code later deleted in continuous refactoring.",
      "Governance is enforced in code and configuration: approval-gated sends, human-fact immutability, advisory-only recommendations, and 83 numbered architecture decisions including decisions against building.",
      "Limitations are published, not hidden: no revenue attribution is claimed, dormant capabilities are listed as dormant, and adoption telemetry is marked unvalidated.",
    ],
    relatedProblems: ["AI Without Operational Control", "Key-Person Dependency", "Workflow Governance"],
    relatedService: "Operational Truth & AI Workflow Diagnostic",
  },
  {
    slug: "prior-authorization-modernization",
    title: "Prior Authorization Workflow Modernization",
    industry: "Healthcare",
    proofLevel: "Anonymized enterprise proof",
    problem:
      "Administrative review burden persisted because workflow, decision rights, compliance, and human review tiers were not redesigned together.",
    situation:
      "Healthcare prior authorization workflows required payer/provider coordination, multi-step review, compliance logic, and operational adoption under increasing regulatory pressure.",
    truth:
      "The operating failure was not only technology. The work needed to be decomposed into decision tiers with explicit escalation, auditability, and human approval.",
    system:
      "Designed machine-assisted prior authorization workflow tiers, compliance integration, audit trail, exception handling, and adoption model.",
    outcome:
      "Decomposing the review into explicit decision tiers with escalation and an audit trail made the administrative burden addressable at its source, instead of automating a workflow no one had redesigned. Leadership gained a defensible basis for where machine assistance could safely reduce review load and where human judgment had to stay.",
    evidence: [
      "Healthcare operating experience across prior authorization, utilization management, compliance logic, and payer/provider workflow complexity.",
      "Machine-assisted review was framed around workflow tiers, human escalation, audit trail, and exception handling.",
      "No client names or unverifiable commercial metrics are published. Engagement context available under NDA.",
    ],
    relatedProblems: ["Workflow Friction", "Execution Visibility Failure", "AI Without Operational Control"],
    relatedService: "Operational Truth & AI Workflow Diagnostic",
  },
  {
    slug: "enterprise-care-management-modernization",
    title: "Enterprise Program Recovery",
    industry: "Healthcare",
    proofLevel: "Anonymized enterprise proof",
    problem:
      "A large modernization program risked execution failure because dependency complexity and executive visibility gaps were not fully exposed.",
    situation:
      "A large modernization program spanned critical enterprise applications across claims, care management, provider experience, clinical workflows, eligibility, and member operations.",
    truth:
      "The hard problem was the operating model at the dependency layer. Individual teams could show progress while enterprise delivery risk accumulated between teams.",
    system:
      "Led modernization strategy, dependency risk management, cross-functional coordination, executive visibility, and operating cadence design across the scope.",
    outcome:
      "The dependency layer that local status reports were hiding became visible, so leadership could see where enterprise delivery risk actually sat, not just which teams were reporting green. That gave executives the basis to re-sequence work and govern the cross-team decisions the program depended on.",
    evidence: [
      "Program scope spanned claims, care management, eligibility, provider operations, and clinical workflow dependencies across a multi-workstream enterprise portfolio.",
      "Functional knowledge of claims, care management, eligibility, and provider operations.",
      "No client names or unverifiable delivery metrics are published. Engagement context available under NDA.",
    ],
    relatedProblems: ["Execution Visibility Failure", "Workflow Friction", "Key-Person Dependency"],
    relatedService: "Operational Truth & AI Workflow Diagnostic",
  },
  {
    slug: "healthcare-interoperability-platform",
    title: "Healthcare Interoperability Modernization",
    industry: "Healthcare",
    proofLevel: "Anonymized enterprise proof",
    problem:
      "CMS interoperability requirements were being treated as a technical compliance project instead of an operating model change.",
    situation:
      "Healthcare payers needed scalable data exchange with access control, auditability, and governance across provider networks.",
    truth:
      "Each integration created operational drag because requirements, onboarding, access control, and governance were not standardized as operational behavior.",
    system:
      "Defined requirements and functional specifications for scalable data exchange, compliance integration, access control, standardized onboarding, and delivery coordination.",
    outcome:
      "Treating interoperability as an operating-model change rather than a compliance checkbox turned each payer-provider integration from recurring operational drag into a standardized, governed onboarding path with access control and auditability built in.",
    evidence: [
      "Experience with CMS requirements and healthcare data exchange.",
      "Requirements and operating model work connected technical exchange to onboarding, access control, auditability, and governance.",
      "No client names or unverifiable implementation metrics are published. Engagement context available under NDA.",
    ],
    relatedProblems: ["Workflow Governance", "Workflow Friction", "Execution Visibility Failure"],
    relatedService: "Operational Truth & AI Workflow Diagnostic",
  },
  {
    slug: "cre-intelligence-model",
    title: "CRE Intelligence Model",
    industry: "Method portability",
    proofLevel: "Internal proof",
    problem:
      "A commercial real estate research operation held real market insight, but that insight stayed locked in analyst judgment and one-off documents. Every question restarted from scratch, and the firm's intelligence could not compound or be reused across deals.",
    situation:
      "Scattered observations, entity data, and local market knowledge had to become reusable intelligence assets rather than disposable analysis. The constraint was structural, not analytical: the firm had judgment but no system to carry it forward.",
    truth:
      "The same human API pattern appeared in a non-healthcare domain. The analyst was the system, personally connecting facts, observations, risks, opportunities, and recommendations. When that person moved on, the intelligence moved with them.",
    system:
      "TKO modeled entity facts, observations, risks, opportunities, recommendations, comparisons, and report outputs as reusable intelligence structures, so domain judgment could be captured once and reused as structured decision support.",
    outcome:
      "The engagement proves the operational knowledge pattern travels beyond healthcare: wherever expert judgment must become structured, reusable decision support, the same method applies. It does so without becoming a separate TKO service line, and without any commercial, client, or market-performance claim.",
    evidence: [
      "Demonstrates method portability across a non-healthcare intelligence workflow.",
      "Supports the Operational Knowledge Systems pattern without becoming a separate TKO service line.",
      "No commercial outcomes, client names, or market-performance claims are published.",
    ],
    relatedProblems: ["Operational Visibility Gaps", "Key-Person Dependency", "Workflow Governance"],
    relatedService: "AI-Assisted Operations Implementation",
  },
];

export const contentPillars = [
  "Operational Intelligence",
  "Workflow Optimization",
  "Operational Excellence",
  "Revenue Operations",
  "Customer Lifecycle Management",
  "Healthcare Operations",
  "AI Workflow Automation",
  "Operational Strategy",
  "Process Modernization",
  "Human-in-the-Loop AI",
  "Operating Model Design",
  "Operational Decision Making",
];

export const proofNotes = [
  "The first claim is the problem: organizations have data but lack a decision system.",
  "RachelOS is the featured case study because it proves TKO has solved that problem in a live operating environment.",
  "Healthcare, Financial Services, Technology, and Private Equity content should map back to workflow, attention, prioritization, and execution visibility.",
  "Employment-period healthcare metrics remain anonymized or gated unless attribution is confirmed.",
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

// Extended narrative for the rachelos-delivery-model case study. Claim discipline is
// governed by asset-production/rachelos-delivery-model/07_CLAIM_AUDIT.md: no revenue
// attribution, no cost or staffing-replacement claims, dormant capabilities named as
// dormant, AI never portrayed as autonomous.
export const deliveryModelNarrative = [
  {
    title: "The conventional requirement",
    body: "The finished system crosses eighteen distinct professional competencies with direct evidence in the repository, product management, business analysis, data modeling across 67 migrations, solution architecture, frontend and backend engineering, applied AI engineering, behavioral design, lifecycle marketing, QA with 1,341 test cases, DevOps, security review, SEO, technical writing, and release management. In a conventional model those competencies are distributed across 12–18 professional roles, plus the coordination apparatus a team that size requires: ceremonies, tickets, handoffs, environments, and a release train.",
  },
  {
    title: "How it was actually delivered",
    body: "Three parties, with written rules between them. One accountable operator-builder: every one of the 1,528 commits across ten months has the same author, sustained at 75 to 270 commits per month while the system served production leads. One domain authority as the approval layer: the practicing agent's knowledge outranks the AI by architecture. If a human-sourced fact exists, AI extraction is prohibited from overriding it, and 77 outbound messages exist in production because a human reviewed and accepted each draft first. And AI as an instrument under governance: it drafts, extracts, analyzes, and implements; it does not decide. The coordination layer a conventional team needs was replaced by a log of 83 numbered, dated architecture decisions, including decisions against building things.",
  },
  {
    title: "The honesty layer",
    body: "The system grades itself on a four-status scale, implemented, activated, validated, unvalidated, and publishes its failures. As of this writing its own state document reports: inbound email receiving is implemented but dormant, the public recommendation engine has zero production snapshots, content publishing has never completed a production publication job, and one daily automation run was silently missed and logged as an open incident. The measured email-first reply rate, 2.2%, is published internally as the number-one revenue constraint. That candor is the method: every claim is classified against an evidence hierarchy in which code and production records outrank documentation.",
  },
  {
    title: "What the model compressed, and what it did not",
    body: "AI-assisted, operator-led delivery compressed execution and coordination: work that would traditionally be distributed across multiple specialized roles, and nearly all of the handoff cost between those roles. It did not compress five things. Judgment, completed capabilities sat deliberately switched off until the operator decided activation was safe. Domain validation, reply-rate reality was learned from production measurement, not predicted. Reliability engineering, missed runs, missing delivery webhooks, and dormant integrations remain human work. Adoption, building 25 operator screens does not make them used, and adoption telemetry is honestly listed as unvalidated. And accountability, the bus factor is one, and the log says so.",
  },
  {
    title: "AI did not eliminate product management",
    body: "The hardest problem was not implementation. It was deciding what to build, and, more often, what not to. The repository's 83 numbered architecture decisions are mostly product judgment wearing an engineering label: decisions against a vector database, against a CMS, against migrating the data layer, against speculative engines; superseded decisions retained as history; closure passes governed by a written rule that only blocking defects may be fixed; and entire audited capabilities recorded as reviewed-but-not-authorized. AI accelerated implementation dramatically. It did not eliminate prioritization, sequencing, tradeoff decisions, or scope control, if anything, cheap implementation made scope discipline more important, because building the wrong thing stopped being expensive enough to prevent itself.",
  },
  {
    title: "What happens if the operator disappears?",
    body: "The honest answer starts with the number already given: the bus factor is one. The mitigation is that the system's knowledge does not live only in the operator's head, the same discipline that produced the audit produced a durable record: 83 dated decisions with rationale and supersession history, a same-day-authoritative current-state document graded on the four-status scale, 67 migrations that carry the schema's full history, 1,341 test cases that encode expected behavior, and a versioned evidence package behind every published claim. A successor inherits a documented system, not an archaeology project. Mitigation is not elimination, the risk is real and stated, but it is the difference between a key-person dependency and a key-person catastrophe.",
  },
  {
    title: "What transfers, and what does not",
    body: "RachelOS is the proof. The method is the product. Transferable: the decision-governance pattern (dated, reasoned, supersedable decisions), the evidence hierarchy in which code and production records outrank documentation, AI-assisted implementation under written operating rules, the human-approval architecture (approval-gated sends, human-fact immutability, advisory-only recommendations), the relationship-intelligence pattern (perishable facts, derived state, detected gaps), the canonical queue with required explanations, approval-gated content operations, and operator-first workflow design. Not transferable: the community recommendation logic (relocation-specific, and unvalidated even in its home domain), the real-estate content inventory, the relocation fact taxonomy, and brokerage-specific routing and referral processes. What transfers is not the software. What transfers is the operating model.",
  },
  {
    title: "One system, one operator",
    body: "This is one system and one operator: the claim is not that the system generalizes from a single deployment. What transfers is the method, the evidence hierarchy, the activation gates, the approval architecture, and the audit itself. Any operation whose work breaks across tools, handoffs, decisions, and follow-up has the same shape: systems of record, no system of action, and the full picture living in one person's head.",
  },
];

// Executive-length summary for the delivery-model case study. Leads with the
// governance and evidence lesson, not the build metrics, so a non-engineer buyer
// gets the point before the commit counts. Claim discipline matches the audit.
export const deliveryModelExecutiveSummary = {
  lead:
    "The transferable asset here is not the software. It is the evidence method: every capability graded implemented, activated, validated, or unvalidated; every significant decision dated and reversible; and every claim held to what code and production records can prove. The figures further down matter only because they are inspectable, not because volume is the point.",
  points: [
    "For a buyer, the lesson is that an AI-assisted build can be governed and audited. That means you can demand the same standard from any vendor's transformation or AI claim, including TKO's.",
    "What TKO sells is that assessment method applied to your operation: a map of what is built, activated, and validated, and a ranked list of what is actually constraining it. Not this system.",
    "The account publishes its own limitations, including a bus factor of one and an underperforming outreach path, because a claim that hides its weak points is not evidence.",
  ],
};

// Production snapshot for the proof-of-scale block. Every figure is verified in
// asset-production/rachelos-delivery-model/07_CLAIM_AUDIT.md (repo inspection and
// read-only production snapshot, 2026-07-11). Aggregates only; no revenue attribution.
export const deliveryModelSnapshot = {
  asOf: "2026-07-11",
  stats: [
    { value: "152", label: "non-test leads under management" },
    { value: "117", label: "leads with a logged deliberate outbound touch" },
    { value: "77", label: "outbound messages, each human-approved before send" },
    { value: "927", label: "active relationship facts" },
    { value: "224", label: "relationship updates captured" },
    { value: "145 / 97", label: "canonical next actions open / completed" },
    { value: "1,528", label: "commits, one author, ten months" },
    { value: "67", label: "database migrations" },
    { value: "1,341", label: "test cases" },
    { value: "25", label: "operator screens" },
  ],
};

export const deliveryModelFit = {
  for: [
    "Operations leaders whose critical workflows run across spreadsheets, inboxes, CRMs, and tribal knowledge.",
    "Healthcare organizations with follow-up-driven work: prior authorization, referrals, care coordination.",
    "Professional-services, advisory, and wealth-management firms where relationship facts are perishable and follow-up is revenue.",
    "Broker-owners and team leads whose book depends on one person's memory.",
    "Leaders who already have something 'built with AI' and need an evidence audit of what is real.",
  ],
  notFor: [
    "Generic AI experimentation with no concrete workflow under pressure.",
    "Prompt-engineering training or workshops.",
    "Early-stage product ideation with no operating evidence to audit.",
    "Organizations seeking fully autonomous systems, human approval is the architecture here, not a limitation to remove.",
  ],
};

export const deliveryModelFaq = [
  {
    question: "How many people built RachelOS?",
    answer:
      "Two humans and AI assistance under written rules, one accountable operator-builder and one domain authority as the approval layer. All 1,528 commits over ten months have a single author. No one was replaced; the accurate statement is that the system crossed competency boundaries normally distributed across 12–18 professional roles.",
  },
  {
    question: "Did AI build RachelOS?",
    answer:
      "No. AI assisted with implementation, analysis, refactoring, and documentation under version-controlled operating rules, and a human decided, merged, deployed, and activated everything. In the product, AI extracts knowledge and drafts messages; deterministic code derives state; humans take every action. Content generation returns an error without human approval.",
  },
  {
    question: "How long did development take?",
    answer:
      "Ten months to the current state, live in production for essentially all of them. There was no launch day; the system served real leads while being built.",
  },
  {
    question: "What remains unfinished?",
    answer:
      "The system's own state document lists it: inbound email receiving is dormant, email inbox delivery is unverified, the public recommendation engine has zero production snapshots, content publishing has never completed a production publication job, and downstream deal stages are not consistently recorded.",
  },
  {
    question: "What were the biggest mistakes?",
    answer:
      "A platform vision the project's own audit falsified, five competing lifecycle fields, a scoring column that was never written, parallel email paths that could double-send, and defaulting to email-first outreach that measured 2.2% replies. Each is documented with its recovery, the point is that the project's self-audit caught them.",
  },
  {
    question: "Where is the revenue proof?",
    answer:
      "There isn't one, and this case study says so directly. Production records do not form an attribution chain, so no closed revenue is claimed. This is a delivery-capability and governance story, not an ROI story, what TKO sells is the assessment method that found the constraints in its own operation.",
  },
  {
    question: "What parts are reusable outside real estate?",
    answer:
      "The canonical queue with explanations, the fact-and-approval architecture, the behavioral layer, the content factory, and the governance method are highly reusable. The relocation-specific recommendation engine is not, and TKO says so. Transfer claims are architectural inference from one deployment, not a demonstrated second one.",
  },
  {
    question: "Can this approach work in my industry?",
    answer:
      "If your work breaks across tools, handoffs, decisions, and follow-up, and relationship facts are perishable, the pattern maps. Healthcare operations is the sharpest fit TKO sees, followed by professional services, wealth management, recruiting, and consulting. The fit test is structural: is one person the integration layer between your systems of record?",
  },
  {
    question: "What is an Operational Intelligence System?",
    answer:
      "A system of action, not a system of record: it captures evidence, derives current truth, recommends one explained next action, helps a human execute, records the outcome, and schedules the next commitment. The distinguishing features are the loop and the governance, human-approved actions, explainable recommendations, and honest capability status.",
  },
  {
    question: "How does TKO engage?",
    answer:
      "Assessment first, build second, never the reverse. The entry engagement applies the same evidence hierarchy used on RachelOS to your operation, producing a map of what is built, activated, and validated, plus a ranked constraint list. Build engagements, where warranted, follow a governed component order with activation gates.",
  },
];
