export const problems = [
  {
    title: "AI Budget Without Operating Clarity",
    description:
      "Leaders have budget for AI, automation, or modernization, but not a clear view of which workflow problem deserves spend first.",
  },
  {
    title: "Pilots That Do Not Change Work",
    description:
      "Demos look promising, but the output never becomes trusted work because decision rights, exception handling, and approval paths were not designed.",
  },
  {
    title: "Human API Dependence",
    description:
      "Critical knowledge lives in a few key people. When they are overloaded, unavailable, or leave, execution slows down.",
  },
  {
    title: "Dashboards Without Judgment",
    description:
      "Reports show activity and status, but they do not tell teams what matters most, what is at risk, or what action should happen next.",
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
    title: "Spend Prioritization",
    description:
      "The expensive risk is not choosing the wrong model. It is funding tool work before the operating problem, control model, and next action are understood.",
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
    price: "$5K-$8K",
    duration: "1 week",
    entry: "Low-friction entry point",
    summary:
      "A one-week assessment for leaders who need fast clarity on where AI, automation, or workflow spend should go next.",
    overview:
      "The Operational Recovery Assessment is a fixed-scope one-week engagement for teams with budget pressure, stalled work, or an AI initiative that needs operational grounding. It maps the workflow, identifies bottlenecks and key-person dependencies, assesses AI readiness, and gives leadership a clear next move.",
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
        a: "It is enough when leadership needs a fast, fixed-scope view of the most likely stall, dependency, or AI spend risk before choosing the next move.",
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
    title: "Operational Truth Diagnostic",
    shortTitle: "Diagnostic",
    price: "$15K-$30K",
    duration: "2-3 weeks",
    entry: "Primary entry point",
    summary:
      "A fixed-scope diagnostic for Director+ leaders who have AI or modernization budget and need to know where it should go first.",
    overview:
      "The Operational Truth Diagnostic studies one or two workflow areas where the organization already has data, tools, meetings, reports, and AI interest but still lacks a trusted decision system. It identifies where work stalls, where ownership breaks down, where AI can safely help, and what should happen next before larger spend is committed.",
    outcomes: [
      "Clear view of where work stalls, why decisions slow down, and what friction is costing the team.",
      "Shared fact base across operations, technology, product, revenue, or governance leaders.",
      "Prioritized list of workflow, decision, AI, and visibility improvements.",
      "Implementation roadmap with owners, gates, and success criteria.",
      "Decision clarity on where to spend, where to wait, and where AI would create more risk than leverage.",
    ],
    process: [
      "Confirm the operating problem, decision needed, AI or modernization budget context, workflows involved, and sponsor.",
      "Review workflow documentation, reporting, dashboards, backlogs, and operating artifacts.",
      "Interview up to 6-8 stakeholders close to the work.",
      "Map intended workflow against actual workflow and identify where decision support is missing.",
      "Identify stalls, visibility gaps, manual handoffs, decision latency, administrative burden, and AI opportunities.",
      "Deliver the executive readout, spend guidance, and implementation roadmap.",
    ],
    deliverables: [
      "Workflow assessment",
      "Decision analysis",
      "Operational bottleneck map",
      "Visibility and prioritization gap review",
      "AI spend and control model",
      "Implementation roadmap",
      "Executive readout",
      "30 days of follow-up Q&A",
    ],
    faqs: [
      {
        q: "What makes this different from a consulting assessment?",
        a: "The Diagnostic is not a broad strategy review or tool recommendation exercise. It is a constrained evidence exercise that identifies where work stalls, what is invisible, what decision logic is missing, and what action should happen next.",
      },
      {
        q: "Do we need clean data before starting?",
        a: "No. The diagnostic is designed for environments where data, workflows, and accountability are fragmented. Existing artifacts, interviews, and operational evidence are enough to begin.",
      },
      {
        q: "Do we need an AI initiative?",
        a: "No. Many buyers arrive with AI budget or AI pressure, but the Diagnostic starts with operational truth. AI is examined only where it can reduce friction, improve decision support, or support human-approved workflows.",
      },
      {
        q: "What is not included?",
        a: "Implementation, software development, ongoing advisory, and scope beyond two workflow or program areas are excluded unless separately scoped.",
      },
    ],
  },
  {
    slug: "operating-system-build",
    title: "Decision Layer Build Sprint",
    shortTitle: "Build",
    price: "$45K-$150K",
    duration: "6-12 weeks",
    entry: "Downstream conversion offer",
    summary:
      "Design and implementation support for the operating layer that turns workflow signals into governed next action.",
    overview:
      "The Build converts diagnostic findings into a decision layer: the operating system that captures memory, resolves facts, identifies priorities, recommends trusted next actions, and keeps humans in control of AI-assisted work.",
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
        a: "AI can extract facts, draft recommendations, or reduce burden only where governance, exception handling, and human approval are designed into the workflow.",
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
      "The invisible failure was the human API pattern: available relationship signals existed, but priority, timing, missing context, and next action still depended on one person.",
    system:
      "TKO built an Operational Intelligence System that captured relationship knowledge, preserved institutional memory, surfaced priorities, recommended actions, and supported execution with human-approved AI.",
    outcome:
      "RachelOS now provides one trusted next action, improved relationship visibility, reduced manual tracking, persistent relationship knowledge, and scalable decision support.",
    evidence: [
      "Live operating environment with relationship memory, priority surfacing, action queues, intelligence gaps, outreach drafts, and daily execution support.",
      "Human approval remains part of the workflow before AI-assisted outreach is used.",
      "Operational outcomes are stated without inflated revenue claims or unverifiable metrics.",
    ],
    relatedProblems: ["Human API Dependence", "Dashboards Without Judgment", "Spend Prioritization"],
    relatedService: "Decision Layer Build Sprint",
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
      "Workflow modernization supported clearer review tiers, auditability, exception handling, and more practical AI adoption.",
    evidence: [
      "Healthcare operating experience across prior authorization, utilization management, compliance logic, and payer/provider workflow complexity.",
      "Machine-assisted review was framed around workflow tiers, human escalation, audit trail, and exception handling.",
      "No client names or unverifiable commercial metrics are published.",
    ],
    relatedProblems: ["Workflow Friction", "Execution Visibility Failure", "AI Without Operational Control"],
    relatedService: "Operational Truth Diagnostic",
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
      "Program risk was managed across many application areas with stronger dependency visibility, operating cadence, and executive confidence.",
    evidence: [
      "Program scope included claims, care management, eligibility, provider operations, and clinical workflow dependencies.",
      "Functional knowledge of claims, care management, eligibility, and provider operations.",
      "No client names or unverifiable delivery metrics are published.",
    ],
    relatedProblems: ["Execution Visibility Failure", "Workflow Friction", "Human API Dependence"],
    relatedService: "Operational Truth Diagnostic",
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
      "The work supported process modernization, clearer integration workflows, and stronger governance across healthcare operations.",
    evidence: [
      "Experience with CMS requirements and healthcare data exchange.",
      "Requirements and operating model work connected technical exchange to onboarding, access control, auditability, and governance.",
      "No client names or unverifiable implementation metrics are published.",
    ],
    relatedProblems: ["Spend Prioritization", "Workflow Friction", "Execution Visibility Failure"],
    relatedService: "Operational Truth Diagnostic",
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
