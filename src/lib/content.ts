export type CaseStudy = {
  slug: string;
  title: string;
  classification:
    | "Client or enterprise experience"
    | "Anonymized enterprise proof"
    | "Live operating environment"
    | "Internal proof"
    | "Method-portability evidence";
  industry: string;
  buyerContext: string;
  trigger: string;
  breaking: string;
  conventionalLimits: string;
  role: string;
  intervention: string;
  result: string;
  evidence: string[];
  evidenceLimit: string;
  relevance: string;
  relatedOffer: string;
  relatedOfferHref: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prior-authorization-modernization",
    title: "Prior Authorization Workflow Design Experience",
    classification: "Client or enterprise experience",
    industry: "Healthcare",
    buyerContext:
      "Healthcare operations spanning prior authorization, utilization management, provider-facing work, compliance, technology, and clinical review.",
    trigger:
      "Administrative work and exceptions were being discussed as an automation problem before the review tiers and escalation paths were explicit.",
    breaking:
      "Routine handling, exceptions, human review, audit requirements, and payer/provider coordination were intertwined rather than designed as distinct workflow states.",
    conventionalLimits:
      "Adding automation to an undefined workflow would have preserved inconsistent routing and hidden decision rights.",
    role:
      "I contributed healthcare workflow, product, governance, and transformation experience inside enterprise operating environments.",
    intervention:
      "The work decomposed the workflow into review tiers, exception paths, escalation, audit requirements, and human decision points before considering machine assistance.",
    result:
      "The operating requirements and control boundaries became explicit enough to support a responsible implementation decision, with review tiers and escalation paths defined before machine assistance was considered.",
    evidence: [
      "Documented experience across prior authorization, utilization management, provider operations, compliance logic, and payer/provider workflow complexity.",
      "Specific artifacts included workflow tiers, escalation logic, audit requirements, and adoption considerations.",
    ],
    evidenceLimit:
      "Employment-period experience, described anonymously. Client identity, workflow artifacts, baselines, and post-implementation measures are covered by confidentiality and are not published. The evidence supports scope and mechanism, not a quantified client outcome.",
    relevance:
      "It shows why I begin with a measured workflow and exception baseline before assessing whether software, staffing, or AI is the answer.",
    relatedOffer: "Program Recovery Review",
    relatedOfferHref: "/services/program-recovery-review",
  },
  {
    slug: "enterprise-care-management-modernization",
    title: "Enterprise Program Recovery",
    classification: "Client or enterprise experience",
    industry: "Healthcare",
    buyerContext:
      "A multi-workstream healthcare modernization spanning claims, care management, provider experience, clinical workflow, eligibility, and member operations.",
    trigger:
      "Local workstream status did not explain where enterprise delivery risk was accumulating.",
    breaking:
      "Dependencies, decisions, and ownership crossed workstreams, so individually healthy reports could coexist with unresolved portfolio risk.",
    conventionalLimits:
      "More status reporting would have repeated local progress without exposing the decisions and dependencies between teams.",
    role:
      "I worked across healthcare transformation strategy, delivery governance, dependency management, executive reporting, and cross-functional coordination.",
    intervention:
      "The work made cross-workstream constraints, accountable decisions, and escalation needs visible in the operating cadence.",
    result:
      "Leadership received a clearer basis for sequencing and governing the work, with cross-workstream constraints and accountable decisions visible in the operating cadence.",
    evidence: [
      "Documented enterprise scope across several healthcare operating domains.",
      "Defined role in transformation governance, dependency visibility, and executive decision support.",
    ],
    evidenceLimit:
      "Employment-period enterprise experience rather than a named TKO client engagement. Public artifacts and quantified outcomes are covered by confidentiality and are not published.",
    relevance:
      "This is the pattern the Program Recovery Review is built to find: risk accumulating at the boundaries between workstreams while each workstream reports honestly on its own scope.",
    relatedOffer: "Program Recovery Review",
    relatedOfferHref: "/services/program-recovery-review",
  },
  {
    slug: "healthcare-interoperability-platform",
    title: "Healthcare Interoperability Modernization",
    classification: "Client or enterprise experience",
    industry: "Healthcare",
    buyerContext:
      "A payer-facing healthcare interoperability platform operating under CMS requirements, access-control needs, auditability, and data-governance constraints.",
    trigger:
      "Regulatory and interoperability requirements had to become working platform behavior rather than remain policy or documentation.",
    breaking:
      "Data exchange, onboarding, access control, governance, and operational adoption had to work together across external parties.",
    conventionalLimits:
      "Treating the initiative as an API-only project would have left onboarding, authority, audit, and day-to-day operating requirements unresolved.",
    role:
      "I owned payer-facing product requirements and functional design for CMS Cures Act and FHIR interoperability work at ELLKAY.",
    intervention:
      "The work connected technical exchange requirements to access controls, auditability, governance, onboarding, and delivery coordination.",
    result:
      "Regulatory requirements became implementable product behaviour and operating controls — access, auditability, onboarding, and governance designed together rather than sequenced after the API.",
    evidence: [
      "Verifiable employment history in healthcare interoperability product management.",
      "Specific scope covering FHIR, access control, auditability, data governance, and payer-facing platform requirements.",
    ],
    evidenceLimit:
      "Employment history establishes the scope of the role; it is not an endorsement by the employer or its clients. Confidential program artifacts and outcome measures are not published.",
    relevance:
      "Translating policy and technical requirements into controlled operating behaviour is the same capability a prior-authorization or interoperability program needs when evidence, access, exceptions, and auditability all have to hold together.",
    relatedOffer: "Specialist Subcontract",
    relatedOfferHref: "/services/specialist-subcontract",
  },
  {
    slug: "from-crm-to-operating-system",
    title: "RachelOS: A Live Operating Environment",
    classification: "Live operating environment",
    industry: "Live operating environment",
    buyerContext:
      "A relationship-driven operating environment with active work spread across records, messages, notes, and one experienced operator's memory.",
    trigger:
      "Follow-up, prioritization, and context reconstruction depended on the operator being available.",
    breaking:
      "The underlying records existed, but the current context, next action, missing information, and approval state were not visible in one working surface.",
    conventionalLimits:
      "A cleaner CRM view would still have stored activity without resolving priority, source authority, approval, or the next action.",
    role:
      "I designed, built, operate, and audit the system myself.",
    intervention:
      "RachelOS introduced durable relationship memory, source-aware facts, prioritized work, visible missing information, human-approved outreach, and system-health checks. AI assists with bounded extraction and drafting; it does not act autonomously.",
    result:
      "Context, priority, approval state, and system health are inspectable in daily work. It is a working demonstration of how I make workflow, evidence, approvals, and handoffs explicit.",
    evidence: [
      "Current, redacted operating screens for the queue, relationship memory, human approval, daily work, and system health.",
      "Repository-backed implementation history and tests supporting the published operating mechanisms.",
      "Visible controls that keep consequential outbound actions under human approval.",
    ],
    evidenceLimit:
      "One independently operated, non-healthcare environment. It supports implementation and governance discipline. It is not evidence of enterprise scale, healthcare compliance, prior-authorization performance, or a financial outcome.",
    relevance:
      "You can inspect how I turn fragmented work into explicit workflow, evidence, controls, and handoff-ready artifacts — the same discipline I apply after a Recovery Review.",
    relatedOffer: "Fractional Transformation Lead",
    relatedOfferHref: "/services/fractional-transformation-lead",
  },
  {
    slug: "cre-intelligence-model",
    title: "CRE Intelligence Model",
    classification: "Method-portability evidence",
    industry: "Method portability",
    buyerContext:
      "A research workflow where analyst observations and recommendations were repeatedly reconstructed in one-off documents.",
    trigger:
      "Knowledge left with the analyst and could not be reused consistently across subsequent questions or decisions.",
    breaking:
      "Facts, observations, risks, opportunities, and recommendations had no durable structure or traceable relationship.",
    conventionalLimits:
      "Producing more reports would have created more documents without making the underlying judgment reusable.",
    role:
      "I modelled the information and decision structure.",
    intervention:
      "The model separated entity facts, observations, risks, opportunities, recommendations, comparisons, and report outputs into reusable, traceable structures.",
    result:
      "Expert judgment that had been reconstructed document by document became a reusable, traceable structure in a domain unrelated to healthcare.",
    evidence: [
      "Inspectable information model and traceability structure.",
      "A distinct non-healthcare environment in which knowledge concentration created the operating constraint.",
    ],
    evidenceLimit:
      "Supporting method evidence. It carries less weight than the healthcare experience above and asserts no commercial, client, or market-performance outcome.",
    relevance:
      "It answers one narrow objection: the method for making expert judgment explicit travels between domains, even though the domain logic does not.",
    relatedOffer: "Program Recovery Review",
    relatedOfferHref: "/services/program-recovery-review",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
