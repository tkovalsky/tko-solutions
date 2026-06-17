export const problems = [
  {
    title: "Transformation Recovery",
    description:
      "Funded modernization, AI, or operating model programs are active, but leadership cannot see where execution is actually stalling.",
  },
  {
    title: "Workflow Visibility Failure",
    description:
      "Systems show tasks and reports, but the real handoffs, delays, exceptions, and manual workarounds remain hidden.",
  },
  {
    title: "Decision Latency",
    description:
      "Work waits because facts, authority, escalation rules, or the trusted next action are unclear.",
  },
  {
    title: "Program Execution Failure",
    description:
      "Milestones slip even while individual teams report progress because cross-team dependencies are not operationally visible.",
  },
  {
    title: "Governance Breakdown",
    description:
      "Meetings, committees, and dashboards exist, but they do not produce accountability or faster decisions.",
  },
  {
    title: "AI Adoption Failure",
    description:
      "AI pilots demonstrate capability but do not become trusted workflows because control, governance, and human approval are missing.",
  },
  {
    title: "Cross-Team Coordination Failure",
    description:
      "Work crosses teams, vendors, systems, and business units without a shared operating layer that owns the complete flow.",
  },
  {
    title: "Operational Intelligence Design",
    description:
      "Scattered signals need to become governed facts, visible state, one next action, human approval, and measured outcomes.",
  },
];

export const truthFramework = [
  "What is supposed to happen?",
  "What actually happens?",
  "Where does work stall?",
  "What is known but unused?",
  "What should the next action be?",
  "Where can AI help without taking control?",
  "How is success measured?",
];

export const systemFlow = ["Signals", "Memory", "Facts", "State", "Action", "Outcome"];

export const operatingFramework = [
  {
    stage: "Signals",
    description: "Raw activity from email, calls, tickets, systems, and conversations enters the system unfiltered.",
  },
  {
    stage: "Memory",
    description: "Signals persist across time and source instead of evaporating after a single touchpoint.",
  },
  {
    stage: "Facts",
    description: "Memory is resolved into source-aware, governed facts that leaders can trust.",
  },
  {
    stage: "State",
    description: "Facts roll up into a current, accurate view of where every workflow actually stands.",
  },
  {
    stage: "Canonical Actions",
    description: "State produces one trusted next action instead of competing reports and opinions.",
  },
  {
    stage: "Human Approval",
    description: "A person reviews and authorizes the action before it executes. AI never acts alone.",
  },
  {
    stage: "Outcomes",
    description: "Approved actions are measured against real operating results, closing the loop.",
  },
];

export const founderCredibility = [
  "Healthcare",
  "Financial Services",
  "Wealth Management",
  "Capital Markets",
  "Enterprise Programs",
  "AI Governance",
];

export const services = [
  {
    slug: "diagnostic",
    title: "Operational Intelligence Diagnostic",
    shortTitle: "Diagnostic",
    price: "$25k-$50k",
    duration: "3 weeks",
    entry: "Primary entry point",
    summary:
      "A fixed-scope diagnostic for leaders who need to establish where complex work is actually failing and what should be fixed first.",
    overview:
      "The Diagnostic applies the Operational Truth Framework to one or two workflow or program areas. It compares what is supposed to happen with what actually happens, surfaces hidden failure points, ranks recovery opportunities, and gives the sponsor a 90-day recovery roadmap.",
    outcomes: [
      "Evidence-based view of where work is actually stalling.",
      "Shared fact base across operations, transformation, technology, and governance leaders.",
      "Top 10 recovery opportunities ranked by value, risk, and effort.",
      "90-day roadmap with owners, gates, and success criteria.",
      "Decision clarity on whether to build, govern, redesign, or stop work.",
    ],
    process: [
      "Confirm the operating problem, decision needed, workflows involved, and sponsor.",
      "Review workflow documentation, reporting, dashboards, backlogs, and operating artifacts.",
      "Interview up to 6-8 stakeholders close to the work.",
      "Map intended workflow against actual workflow using the Operational Truth Framework.",
      "Identify stalls, visibility gaps, manual handoffs, decision latency, and governance breakdown.",
      "Deliver the executive readout and 90-day recovery roadmap.",
    ],
    deliverables: [
      "Operational Truth Assessment",
      "Failure-Point and Manual-Handoff Inventory",
      "Visibility Gap Map",
      "Administrative Burden and Leakage Inventory",
      "AI Opportunity and Control Model",
      "Top 10 Recovery Opportunities",
      "90-Day Recovery Roadmap",
      "Executive Readout",
      "30 days of follow-up Q&A",
    ],
    faqs: [
      {
        q: "What makes this different from a consulting assessment?",
        a: "The Diagnostic is not a strategy review. It is a constrained evidence exercise that identifies where work stalls, what is invisible, what decision logic is missing, and what recovery actions should happen next.",
      },
      {
        q: "Do we need clean data before starting?",
        a: "No. The diagnostic is designed for environments where data, workflows, and accountability are fragmented. Existing artifacts, interviews, and operational evidence are enough to begin.",
      },
      {
        q: "Do we need an AI initiative?",
        a: "No. AI is examined only where it affects workflow, decision rights, governance, or human approval. The core problem is operational visibility.",
      },
      {
        q: "What is not included?",
        a: "Implementation, software development, ongoing advisory, and scope beyond two workflow or program areas are excluded unless separately scoped.",
      },
    ],
  },
  {
    slug: "operating-system-build",
    title: "Operating System Build",
    shortTitle: "Build",
    price: "$50k-$100k",
    duration: "8-12 weeks",
    entry: "Downstream conversion offer",
    summary:
      "Design and implementation path for turning diagnostic findings into a working Operational Intelligence System.",
    overview:
      "The Build converts operational truth into a system that captures signals, preserves memory, creates source-aware facts, exposes state, surfaces the trusted next action, keeps humans in approval, and measures outcomes.",
    outcomes: [
      "Working decision system for one or two workflow areas.",
      "Operator workflow designed around attention, approval, and action.",
      "Visibility into gaps, stalls, and failure points before they become hidden risk.",
      "Measurement model and operating handoff for the internal team.",
    ],
    process: [
      "Validate diagnostic findings and current-state constraints.",
      "Design the target operating model and decision system.",
      "Define source authority, operational state, action logic, and human approval points.",
      "Create the operator workflow, alerting model, and measurement loop.",
      "Oversee build, testing, adoption, and handoff.",
    ],
    deliverables: [
      "Workflow redesign",
      "Decision-system design",
      "Relationship or work memory model",
      "Intelligence gap acquisition model",
      "Operator workflow",
      "Operational alerting and reliability model",
      "Measurement model",
      "Handoff documentation and operator training",
    ],
    faqs: [
      {
        q: "Can this be bought cold?",
        a: "No. Build follows a diagnostic, equivalent current-state assessment, or warm referral with a known operating problem.",
      },
      {
        q: "Is this software development?",
        a: "It is operating-system design and build oversight. Direct development, integration, or vendor management must be explicitly scoped.",
      },
      {
        q: "Where does AI fit?",
        a: "AI can extract facts, draft recommendations, or reduce burden only where governance and human approval are designed into the workflow.",
      },
    ],
  },
  {
    slug: "fractional-advisor",
    title: "Fractional Operating System Advisor",
    shortTitle: "Fractional",
    price: "$12k-$25k / month",
    duration: "3-6 months",
    entry: "Post-diagnostic or post-build retainer",
    summary:
      "Advisory support for sustaining operating cadence, governance, and transformation momentum after the initial work.",
    overview:
      "The Fractional Advisor engagement protects the momentum created by a diagnostic or build. It keeps the operating cadence alive, governs the backlog, maintains sponsor visibility, and keeps AI governance honest.",
    outcomes: [
      "Transformation momentum maintained between major milestones.",
      "Sponsor has a trusted monthly view of program health.",
      "Backlog, governance, and AI control model stay aligned with operational reality.",
      "Internal team develops stronger operating discipline over time.",
    ],
    process: [
      "Establish the operating cadence and sponsor reporting rhythm.",
      "Review progress, risks, blockers, and dependency health weekly.",
      "Maintain backlog and priority discipline.",
      "Provide monthly operating-system review and sponsor brief.",
      "Guide AI governance and decision-rights evolution as work changes.",
    ],
    deliverables: [
      "Weekly operating cadence",
      "Monthly operating-system review",
      "Monthly executive status brief",
      "Backlog and priority guidance",
      "AI governance guidance",
    ],
    faqs: [
      {
        q: "Is this staff augmentation?",
        a: "No. The role is senior operating-system advisory, governance discipline, and sponsor visibility after a diagnostic or build.",
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
    priority: "Launch wedge",
    description:
      "Prior authorization, care management, interoperability, administrative burden, healthcare AI governance, and payer/provider operating complexity.",
  },
  {
    title: "Financial Services",
    priority: "Secondary market",
    description:
      "Regulated operating environments where reporting, workflow, decision rights, and platform modernization intersect.",
  },
  {
    title: "Wealth and Asset Management",
    priority: "Secondary market",
    description:
      "Advisor workflows, relationship context, portfolio operations, platform adoption, and client service handoffs.",
  },
  {
    title: "Capital Markets Operations",
    priority: "Secondary market",
    description:
      "Trade support, settlement, exception handling, institutional workflow, and operational control in high-dependency environments.",
  },
];

export const caseStudies = [
  {
    slug: "racheldelray-operating-system",
    title: "RachelDelray Operational Intelligence System",
    industry: "Relationship-intensive operating environment",
    proofLevel: "Production system proof",
    problem:
      "Leads and relationship context were scattered across channels, leaving the operator without one trusted view of who needed attention and what action should happen next.",
    situation:
      "A relationship-driven business had demand and lead capture, but execution depended on manual reconstruction of context from messages, memory, and disconnected tools.",
    truth:
      "The invisible failure was the gap between available relationship signals and a canonical next action. AI summaries were not enough; the operator needed source-aware facts, state, and approval-gated action.",
    system:
      "TKO built a relationship memory layer, fact extraction, source authority rules, intelligence gap acquisition, canonical next-action queue, daily action engine, approval-gated outreach drafts, and operational reliability monitoring.",
    outcome:
      "The platform operates as a relationship intelligence and action system with one daily view of priorities, structured facts, gap detection, and human approval before any AI-assisted outreach.",
    evidence: [
      "Full source-code evidence for relationship memory, canonical queue, intelligence gaps, outreach drafts, and daily action engine.",
      "Database migrations documenting capability evolution.",
      "Operational capabilities confirmed; commercial outcome metrics remain unconfirmed.",
    ],
    relatedProblems: ["Workflow Visibility Failure", "Operational Intelligence Design", "Human-Controlled AI"],
    relatedService: "Operating System Build",
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
      "Resume-attributed outcomes include 40-60% reduction in manual review effort, $200M+ annualized operational value, and 15-25% productivity improvement. Publication remains subject to attribution confirmation.",
    evidence: [
      "Resume-cited metrics pending founder confirmation of publishability.",
      "Deep functional knowledge of CMS prior authorization requirements and payer/provider workflow complexity.",
      "Named client and internal documentation are gated.",
    ],
    relatedProblems: ["Transformation Recovery", "Workflow Visibility Failure", "AI Adoption Failure"],
    relatedService: "Operational Intelligence Diagnostic",
  },
  {
    slug: "enterprise-care-management-modernization",
    title: "Enterprise Care Management Modernization",
    industry: "Healthcare",
    proofLevel: "Anonymized enterprise proof",
    problem:
      "A large modernization program risked execution failure because dependency complexity and executive visibility gaps were not fully exposed.",
    situation:
      "A $20M+ modernization program spanned approximately 24 critical enterprise applications across claims, care management, provider experience, clinical workflows, eligibility, and member operations.",
    truth:
      "The hard problem was the operating model at the dependency layer. Individual teams could show progress while enterprise delivery risk accumulated between teams.",
    system:
      "Led platform strategy, dependency risk management, cross-functional coordination, executive visibility, and operating cadence design across the modernization scope.",
    outcome:
      "Program risk was managed across approximately 24 application areas with stronger dependency visibility and executive confidence. Specific delivery metrics are gated.",
    evidence: [
      "Resume documentation of program scope and scale.",
      "Functional knowledge of claims, care management, eligibility, and provider operations.",
      "Named organization and detailed milestones are gated.",
    ],
    relatedProblems: ["Program Execution Failure", "Governance Breakdown", "Cross-Team Coordination Failure"],
    relatedService: "Operational Intelligence Diagnostic",
  },
  {
    slug: "healthcare-interoperability-platform",
    title: "Healthcare Interoperability Platform",
    industry: "Healthcare",
    proofLevel: "Anonymized enterprise proof",
    problem:
      "CMS interoperability requirements were being treated as a technical compliance project instead of an operating model change.",
    situation:
      "Healthcare payers needed scalable FHIR/HL7 data exchange with access control, auditability, and governance across provider networks.",
    truth:
      "Each integration created operational drag because requirements, onboarding, access control, and governance were not standardized as platform behavior.",
    system:
      "Defined requirements and functional specifications for scalable data exchange, compliance integration, access control, standardized onboarding, and delivery coordination.",
    outcome:
      "Resume-attributed outcomes include 20-30% faster integration timelines and support for exchange across dozens of provider organizations. Attribution remains gated.",
    evidence: [
      "Resume-cited metrics pending confirmation.",
      "Experience with CMS requirements and FHIR/HL7 data exchange.",
      "Named client, artifacts, and internal implementation details are gated.",
    ],
    relatedProblems: ["Operational Intelligence Design", "Governance Breakdown", "Transformation Recovery"],
    relatedService: "Operational Intelligence Diagnostic",
  },
];

export const contentPillars = [
  "Operational Intelligence",
  "Operating Models",
  "Transformation Recovery",
  "Decision Systems",
  "Enterprise Program Recovery",
  "Workflow Visibility",
  "Governance & Accountability",
  "Human-Controlled AI",
  "Healthcare Operations",
  "Financial Services Operations",
];

export const proofNotes = [
  "Healthcare proof leads the launch site.",
  "Financial Services, Wealth Management, and Capital Markets support the category through pattern recognition.",
  "RachelDelray proves production system capability; commercial outcomes remain gated until measured.",
  "Employment-period healthcare metrics remain anonymized or gated unless attribution is confirmed.",
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

