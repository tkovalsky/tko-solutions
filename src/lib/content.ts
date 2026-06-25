export const problems = [
  {
    title: "Data Without Decisions",
    description:
      "Dashboards, CRMs, reports, and spreadsheets exist, but leaders still cannot see what matters most or what decision is needed next.",
  },
  {
    title: "Attention Gaps",
    description:
      "The people, customers, cases, accounts, or workflows that need attention are discovered too late or only through manual follow-up.",
  },
  {
    title: "Decision Latency",
    description:
      "Work waits because facts, authority, escalation rules, or the trusted next action are unclear.",
  },
  {
    title: "Institutional Knowledge Loss",
    description:
      "Critical context lives in people's heads, inboxes, meetings, and side documents instead of a system the organization can trust.",
  },
  {
    title: "Workflow Friction",
    description:
      "Teams spend time reconciling status, chasing handoffs, and managing work instead of advancing work.",
  },
  {
    title: "AI Without Operational Control",
    description:
      "AI can summarize or draft, but it does not become trusted execution unless human approval, workflow fit, and decision rights are designed in.",
  },
  {
    title: "Execution Visibility Failure",
    description:
      "Work crosses teams, vendors, systems, and business units without a shared layer that shows current state and required action.",
  },
  {
    title: "Operational Intelligence Design",
    description:
      "Scattered signals need to become governed facts, visible state, trusted next actions, human approval, and measured outcomes.",
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

export const systemFlow = ["Signals", "Memory", "Facts", "State", "Action", "Outcome"];

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
    slug: "diagnostic",
    title: "Operational Diagnostic",
    shortTitle: "Diagnostic",
    price: "Starting at $15K",
    duration: "2-3 weeks",
    entry: "Primary entry point",
    summary:
      "A focused engagement for leaders who need to find where work stalls, where decisions break down, and which fixes matter first.",
    overview:
      "The Operational Diagnostic studies one or two workflow areas where the organization already has data, tools, meetings, and reports but still lacks a trusted decision system. It identifies where work stalls, where ownership breaks down, where AI or automation could help, and what should happen next.",
    outcomes: [
      "Clear view of where work stalls, why decisions slow down, and what friction is costing the team.",
      "Shared fact base across operations, technology, product, revenue, or governance leaders.",
      "Prioritized list of workflow, decision, and visibility improvements.",
      "Implementation roadmap with owners, gates, and success criteria.",
      "Decision clarity on whether to redesign workflow, build an Operational Intelligence System, improve governance, or stop low-value work.",
    ],
    process: [
      "Confirm the operating problem, decision needed, workflows involved, and sponsor.",
      "Review workflow documentation, reporting, dashboards, backlogs, and operating artifacts.",
      "Interview up to 6-8 stakeholders close to the work.",
      "Map intended workflow against actual workflow and identify where decision support is missing.",
      "Identify stalls, visibility gaps, manual handoffs, decision latency, administrative burden, and AI opportunities.",
      "Deliver the executive readout and implementation roadmap.",
    ],
    deliverables: [
      "Workflow assessment",
      "Decision analysis",
      "Operational bottleneck map",
      "Visibility and prioritization gap review",
      "AI opportunity review",
      "Implementation roadmap",
      "Executive readout",
      "30 days of follow-up Q&A",
    ],
    faqs: [
      {
        q: "What makes this different from a consulting assessment?",
        a: "The Diagnostic is not a broad strategy review. It is a constrained evidence exercise that identifies where work stalls, what is invisible, what decision logic is missing, and what action should happen next.",
      },
      {
        q: "Do we need clean data before starting?",
        a: "No. The diagnostic is designed for environments where data, workflows, and accountability are fragmented. Existing artifacts, interviews, and operational evidence are enough to begin.",
      },
      {
        q: "Do we need an AI initiative?",
        a: "No. AI is examined only where it can reduce friction, improve decision support, or support human-approved workflows. The core problem is operational decision-making.",
      },
      {
        q: "What is not included?",
        a: "Implementation, software development, ongoing advisory, and scope beyond two workflow or program areas are excluded unless separately scoped.",
      },
    ],
  },
  {
    slug: "operating-system-build",
    title: "Operational Intelligence System Build",
    shortTitle: "Build",
    price: "$50K-$100K",
    duration: "8-12 weeks",
    entry: "Downstream conversion offer",
    summary:
      "Design and implementation support for the decision layer between data and action.",
    overview:
      "The Build converts diagnostic findings into an Operational Intelligence System: the layer that captures operational memory, identifies priorities, surfaces who or what needs attention, recommends trusted next actions, and keeps humans in control.",
    outcomes: [
      "Working decision layer for one or two workflow areas.",
      "Team workflow designed around prioritization, approval, and action.",
      "Better visibility into gaps, stalls, and escalation risk before opportunities are missed.",
      "Operational memory that preserves institutional knowledge beyond individual people.",
      "Measurement model and handoff for the internal team.",
    ],
    process: [
      "Validate diagnostic findings and current-state constraints.",
      "Design the target workflow, decision rules, and action model.",
      "Define source authority, operational state, priority logic, escalation triggers, and human approval points.",
      "Create the action queue, alerting model, and measurement loop.",
      "Oversee build, testing, adoption, and handoff.",
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
        q: "Can this be bought cold?",
        a: "No. Build follows a diagnostic, equivalent current-state assessment, or warm referral with a known operating problem.",
      },
      {
        q: "Is this software development?",
        a: "It is decision-layer design and build oversight. Direct development, integration, or vendor management must be explicitly scoped.",
      },
      {
        q: "Where does AI fit?",
        a: "AI can extract facts, draft recommendations, or reduce burden only where governance and human approval are designed into the workflow.",
      },
    ],
  },
  {
    slug: "fractional-advisor",
    title: "Fractional Operational Intelligence Advisor",
    shortTitle: "Fractional",
    price: "$12K-$25K / month",
    duration: "3-6 months",
    entry: "Post-diagnostic or post-build retainer",
    summary:
      "Strategic advisory support for leadership teams that need to continuously improve execution.",
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
    title: "RachelOS Operational Intelligence System",
    industry: "Live operating environment",
    proofLevel: "Featured proof",
    problem:
      "A relationship-driven business had data, notes, messages, and activity, but no trusted decision system for who needed attention and what action should happen next.",
    situation:
      "The business managed 100+ relationships across fragmented information, inconsistent follow-up, and knowledge trapped in one person's head.",
    truth:
      "The invisible failure was the gap between available relationship signals and a trusted next action. Information existed, but priorities, attention, and decision logic were not operationalized.",
    system:
      "TKO built an Operational Intelligence System that captured relationship knowledge, preserved institutional memory, surfaced priorities, recommended actions, and supported execution with human-approved AI.",
    outcome:
      "RachelOS now provides one trusted next action, improved relationship visibility, reduced manual tracking, persistent relationship knowledge, and scalable decision support.",
    evidence: [
      "Live operating environment with relationship memory, priority surfacing, action queues, intelligence gaps, outreach drafts, and daily execution support.",
      "Human approval remains part of the workflow before AI-assisted outreach is used.",
      "Operational outcomes are stated without inflated revenue claims or unverifiable metrics.",
    ],
    relatedProblems: ["Data Without Decisions", "Attention Gaps", "Operational Intelligence Design"],
    relatedService: "Operational Intelligence System Build",
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
      "Workflow modernization supported clearer review tiers, auditability, exception handling, and more practical AI adoption. Specific commercial metrics remain gated.",
    evidence: [
      "Resume-cited metrics pending founder confirmation of publishability.",
      "Deep functional knowledge of CMS prior authorization requirements and payer/provider workflow complexity.",
      "Named client and internal documentation are gated.",
    ],
    relatedProblems: ["Workflow Friction", "Execution Visibility Failure", "AI Without Operational Control"],
    relatedService: "Operational Diagnostic",
  },
  {
    slug: "enterprise-care-management-modernization",
    title: "Enterprise Care Management Modernization",
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
      "Program risk was managed across many application areas with stronger dependency visibility and executive confidence. Specific delivery metrics are gated.",
    evidence: [
      "Resume documentation of program scope and scale.",
      "Functional knowledge of claims, care management, eligibility, and provider operations.",
      "Named organization and detailed milestones are gated.",
    ],
    relatedProblems: ["Execution Visibility Failure", "Workflow Friction", "Decision Latency"],
    relatedService: "Operational Diagnostic",
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
      "The work supported process modernization, clearer integration workflows, and stronger governance across healthcare operations. Specific delivery metrics remain gated.",
    evidence: [
      "Resume-cited metrics pending confirmation.",
      "Experience with CMS requirements and healthcare data exchange.",
      "Named client, artifacts, and internal implementation details are gated.",
    ],
    relatedProblems: ["Operational Intelligence Design", "Workflow Friction", "Execution Visibility Failure"],
    relatedService: "Operational Diagnostic",
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
