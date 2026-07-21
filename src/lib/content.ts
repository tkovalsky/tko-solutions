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
      "Todd designed, built, operated, and audited the system. This is founder-built proof, not a client engagement.",
    intervention:
      "RachelOS introduced durable relationship memory, source-aware facts, prioritized work, visible missing information, human-approved outreach, and system-health checks. AI assists with bounded extraction and drafting; it does not act autonomously.",
    result:
      "The operating environment now makes context, priority, approval, and system health inspectable in daily work. It demonstrates implementation capability and governance discipline, not healthcare performance or client ROI.",
    evidence: [
      "Current, redacted operating screens for the queue, relationship memory, human approval, daily work, and system health.",
      "Repository-backed implementation history and tests supporting the published operating mechanisms.",
      "Visible controls that keep consequential outbound actions under human approval.",
    ],
    evidenceLimit:
      "RachelOS is one founder-operated, non-healthcare environment. It does not establish enterprise scale, healthcare compliance, prior-authorization performance, or causal financial outcomes.",
    relevance:
      "A buyer can inspect how Todd turns fragmented work into explicit workflow, evidence, controls, and handoff-ready operating artifacts—the same implementation discipline applied after a Diagnostic.",
    relatedOffer: "Prior Authorization Performance Diagnostic",
    relatedOfferHref: "/services/diagnostic",
  },
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
      "Todd contributed healthcare workflow, product, governance, and transformation experience within enterprise operating environments. No organization or client is named.",
    intervention:
      "The work decomposed the workflow into review tiers, exception paths, escalation, audit requirements, and human decision points before considering machine assistance.",
    result:
      "The operating requirements and control boundaries became explicit enough to support a responsible implementation decision. No measured denial, turnaround, capacity, or financial result is claimed.",
    evidence: [
      "Documented experience across prior authorization, utilization management, provider operations, compliance logic, and payer/provider workflow complexity.",
      "Specific artifacts included workflow tiers, escalation logic, audit requirements, and adoption considerations.",
      "The public evidence supports scope and mechanism only; it does not support a quantified client outcome.",
    ],
    evidenceLimit:
      "The experience is anonymized and employment-based. Client identity, workflow artifacts, baselines, and post-implementation measures are not publishable.",
    relevance:
      "It shows why TKO begins with a measured workflow and exception baseline rather than assuming software, staffing, or AI is the answer.",
    relatedOffer: "Prior Authorization Performance Diagnostic",
    relatedOfferHref: "/services/diagnostic",
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
      "Todd worked in healthcare transformation strategy, delivery governance, dependency management, executive reporting, and cross-functional coordination.",
    intervention:
      "The work made cross-workstream constraints, accountable decisions, and escalation needs visible in the operating cadence.",
    result:
      "Leadership received a clearer basis for sequencing and governing the work. No client, program, delivery-time, cost, or outcome metric is published.",
    evidence: [
      "Documented enterprise scope across several healthcare operating domains.",
      "Defined role in transformation governance, dependency visibility, and executive decision support.",
      "Qualitative operating mechanism only; no attributable performance result is available for publication.",
    ],
    evidenceLimit:
      "This is employment-period enterprise experience, not a named TKO client case. Public artifacts and quantified outcomes are unavailable.",
    relevance:
      "Prior-authorization improvement also crosses operations, clinical review, revenue cycle, technology, and leadership; the Diagnostic makes those dependencies explicit within one bounded workflow.",
    relatedOffer: "Prior Authorization Performance Diagnostic",
    relatedOfferHref: "/services/diagnostic",
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
      "Todd owned payer-facing product requirements and functional design for CMS Cures Act and FHIR interoperability work during verified employment at ELLKAY.",
    intervention:
      "The work connected technical exchange requirements to access controls, auditability, governance, onboarding, and delivery coordination.",
    result:
      "It established buyer-relevant experience translating regulated healthcare requirements into implementable product and operating controls. No client implementation or business-result metric is claimed.",
    evidence: [
      "Verifiable employment history in healthcare interoperability product management.",
      "Specific scope covering FHIR, access control, auditability, data governance, and payer-facing platform requirements.",
      "The evidence establishes relevant experience, not a quantified TKO client result.",
    ],
    evidenceLimit:
      "Employer and client endorsement is not implied. Confidential program artifacts and outcome measures are not published.",
    relevance:
      "It demonstrates the ability to translate policy and technical requirements into controlled operating behavior—important when prior-authorization automation depends on evidence, access, exceptions, and auditability.",
    relatedOffer: "Prior Authorization Performance Diagnostic",
    relatedOfferHref: "/services/diagnostic",
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
      "TKO modeled the information and decision structure. This is method-portability evidence, not healthcare or client-outcome proof.",
    intervention:
      "The model separated entity facts, observations, risks, opportunities, recommendations, comparisons, and report outputs into reusable, traceable structures.",
    result:
      "The work demonstrates that expert knowledge can be structured for reuse across a different domain. It does not establish commercial or market performance.",
    evidence: [
      "Inspectable information model and traceability structure.",
      "A distinct non-healthcare environment in which knowledge concentration created the operating constraint.",
      "No commercial, client, or market-performance outcome is asserted.",
    ],
    evidenceLimit:
      "This is supporting method evidence. It should not be read as equivalent to verified client outcomes or healthcare implementation proof.",
    relevance:
      "It answers the portability objection narrowly: the method for making expert judgment explicit can travel, while the domain logic and performance claims do not.",
    relatedOffer: "Prior Authorization Performance Diagnostic",
    relatedOfferHref: "/services/diagnostic",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
