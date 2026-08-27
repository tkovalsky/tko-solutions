export type CaseStudy = {
  slug: string;
  title: string;
  classification:
    | "Anonymized enterprise experience"
    | "Healthcare product experience"
    | "Live independent system"
    | "Method-portability evidence";
  industry: string;
  situation: string;
  complexity: string;
  role: string;
  intervention: string;
  result: string;
  lesson: string;
  evidence: string[];
  evidenceLimit: string;
  relevance: string;
  relatedOffer: string;
  relatedOfferHref: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prior-authorization-modernization",
    title: "Establishing Enterprise Readiness for a Rural Prior-Authorization Initiative",
    classification: "Anonymized enterprise experience",
    industry: "Healthcare payer operations",
    situation:
      "A public commitment to reduce provider administrative burden required multiple claims, utilization-management, reporting, provider-communications, and technology teams to align against a program deadline.",
    complexity:
      "The operating outcome crossed many applications and owners. Readiness depended on integrated planning, validation, communications, dependency management, and escalation rather than one team completing its own work.",
    role:
      "Todd led recurring governance, integrated planning and reporting, testing coordination, cross-team integration forums, stakeholder orchestration, and readiness oversight.",
    intervention:
      "He established a common delivery cadence, connected workstreams, surfaced unresolved dependencies, aligned validation activity, and gave leaders an integrated view of readiness and escalation needs.",
    result:
      "The initiative moved toward enterprise implementation readiness with previously fragmented work governed as one cross-functional delivery problem.",
    lesson:
      "Administrative-burden reform is not only a policy or technology decision. The operating model, controls, provider communication, and downstream execution have to converge.",
    evidence: [
      "Leadership of recurring cross-functional governance and program reporting.",
      "Coordination of testing, integration, readiness, and escalation across enterprise teams.",
      "Prior-authorization and provider-workflow experience in a large national health-plan environment.",
    ],
    evidenceLimit:
      "Employment-period experience described anonymously. Todd did not originate the enterprise business strategy, medical policy, architecture, funding decision, or regulatory commitment. No private application names or unpublished metrics are disclosed.",
    relevance:
      "Shows the ability to translate a burden-reduction objective into the governance, dependencies, testing, and readiness structures required for execution.",
    relatedOffer: "Transformation Diagnostic",
    relatedOfferHref: "/services/transformation-diagnostic",
  },
  {
    slug: "provider-eligibility-modernization",
    title: "Connecting Provider Eligibility Modernization Across Programs",
    classification: "Anonymized enterprise experience",
    industry: "Healthcare payer operations",
    situation:
      "Provider eligibility logic, provider experience, claims processing, and adjacent modernization efforts were advancing through separate programs with limited shared dependency visibility.",
    complexity:
      "Release teams, platforms, testing groups, and business owners each held part of the implementation truth. Changes in one area could create downstream effects that no local plan fully represented.",
    role:
      "Todd connected programs, surfaced dependencies, aligned release teams, coordinated testing, managed integrated status reporting, and drove integration discussions.",
    intervention:
      "He exposed cross-platform impacts, created forums for shared decisions, and treated eligibility capability as part of broader enterprise workflows rather than a set of isolated implementations.",
    result:
      "Hidden dependencies became visible, assigned, governed, escalated, and tracked across large cross-functional governance environments.",
    lesson:
      "Trust-based or differentiated controls succeed only when qualification, workflow, claims effects, provider experience, monitoring, and requalification operate as one system.",
    evidence: [
      "Cross-program alignment in enterprise provider and claims environments.",
      "Integrated reporting and dependency management across numerous application and release teams.",
      "Governance contexts involving more than 100 participants.",
    ],
    evidenceLimit:
      "Anonymized employment-period experience. The evidence supports delivery orchestration and solution influence, not sole ownership of Gold Card strategy, eligibility methodology, architecture, or funding.",
    relevance:
      "Demonstrates the core TKO capability: finding execution risk at organizational and system boundaries before it becomes a release failure.",
    relatedOffer: "Operating Model & Transformation Design Sprint",
    relatedOfferHref: "/services/operating-model-design",
  },
  {
    slug: "enterprise-care-management-modernization",
    title: "Creating Integrated Governance and Readiness",
    classification: "Anonymized enterprise experience",
    industry: "Enterprise healthcare transformation",
    situation:
      "Status, testing, release, and dependency information was fragmented across teams, tickets, applications, and workstream plans in a complex healthcare transformation.",
    complexity:
      "Dozens of applications and workstreams spanning claims, care management, behavioral health, utilization management, provider workflows, and integration required synchronized validation amid changing dates and requirements.",
    role:
      "Todd led governance, product-level and executive reporting, dependency and release tracking, escalation structures, and coordinated system, end-to-end, test-data, and readiness activity.",
    intervention:
      "He moved reporting from local status collection toward an integrated governance architecture that connected decisions, dependencies, evidence, testing, and release readiness.",
    result:
      "Teams gained a common reporting and readiness structure; risks that had been distributed across local plans became visible at program level.",
    lesson:
      "Governance creates value when it resolves decisions and exposes accumulating risk—not when it merely restates workstream status.",
    evidence: [
      "Executive and product-level reporting across complex delivery environments.",
      "Coordination of SIT, end-to-end validation, test data, evidence, and release readiness.",
      "Dependency and escalation management across dozens of applications and workstreams.",
    ],
    evidenceLimit:
      "Anonymized employment-period experience. No confidential program metrics, internal application names, architecture, or client endorsement are published.",
    relevance:
      "Shows how TKO creates integrated truth when a transformation is moving but not converging.",
    relatedOffer: "Transformation Execution Authority",
    relatedOfferHref: "/services/transformation-leadership",
  },
  {
    slug: "healthcare-interoperability-platform",
    title: "Healthcare Interoperability Modernization",
    classification: "Healthcare product experience",
    industry: "Healthcare technology",
    situation:
      "Payer-facing CMS Cures Act and FHIR requirements had to become a usable, governed product and operating capability.",
    complexity:
      "Technical exchange alone could not resolve onboarding, access, consent, auditability, data governance, exception handling, and accountable operating ownership.",
    role:
      "Todd owned product responsibilities that translated payer requirements, regulatory constraints, controls, and technical delivery into an operable platform roadmap.",
    intervention:
      "He connected API and data requirements to access control, auditability, governance, customer onboarding, and implementation decisions.",
    result:
      "Regulatory and technical requirements became a product and operating model that enterprise teams could implement and support.",
    lesson:
      "Interoperability makes information available; the operating model still determines who acts, how exceptions are handled, and how decisions remain governed.",
    evidence: [
      "Verified healthcare interoperability product ownership.",
      "Experience with FHIR APIs, CMS Cures Act requirements, access control, auditability, and data governance.",
    ],
    evidenceLimit:
      "Employment-period product experience. It does not claim ownership of the employer's enterprise strategy or proprietary architecture and does not imply employer endorsement.",
    relevance:
      "Demonstrates business, regulation, operations, and technology translation in a controlled healthcare environment.",
    relatedOffer: "Operating Model & Transformation Design Sprint",
    relatedOfferHref: "/services/operating-model-design",
  },
  {
    slug: "from-crm-to-operating-system",
    title: "RachelOS: A Live Governed Decision System",
    classification: "Live independent system",
    industry: "Independent product and operations",
    situation:
      "A relationship-driven business needed to turn scattered signals, facts, commitments, and follow-up work into reliable daily action.",
    complexity:
      "The system had to distinguish evidence from inference, maintain current state, prioritize work, preserve human approval, route exceptions, and learn from outcomes without losing operator control.",
    role:
      "Todd designed, built, and operates RachelOS independently, including the workflow, decision, evidence, approval, and feedback mechanisms shown in the redacted screens.",
    intervention:
      "He implemented relationship memory, a canonical queue, deterministic next actions, human approval, evidence authority, system health, and feedback loops as one operating system.",
    result:
      "The business now has an inspectable operating environment that turns signals into governed action while keeping consequential decisions under human control.",
    lesson:
      "Human-in-the-loop is an operating model, not an AI feature. The value comes from the full decision and feedback system around the model.",
    evidence: [
      "Current redacted product screens.",
      "Inspectable workflow, approval, queue, relationship-memory, and system-health mechanisms.",
      "Direct founder ownership of product design, implementation, and operation.",
    ],
    evidenceLimit:
      "RachelOS is independent system proof, not a healthcare client result. It demonstrates implementation discipline and governed-decision-system design, not healthcare compliance or outcome claims.",
    relevance:
      "Shows that Todd can reason about and build the systems underneath an operating-model strategy, not only describe them in a deck.",
    relatedOffer: "Operating Model & Transformation Design Sprint",
    relatedOfferHref: "/services/operating-model-design",
  },
  {
    slug: "cre-intelligence-model",
    title: "CRE Intelligence Model",
    classification: "Method-portability evidence",
    industry: "Commercial real estate",
    situation:
      "A commercial-real-estate advisory workflow needed consistent evidence capture, prioritization, and follow-through across market and relationship signals.",
    complexity:
      "Useful action depended on joining incomplete information, source authority, relationship context, and operator judgment without pretending inference was fact.",
    role:
      "Todd designed the analytical and workflow model as independent work outside healthcare.",
    intervention:
      "The model separated signals, facts, state, priority, recommended action, human review, and outcome feedback.",
    result:
      "The work demonstrated that the governed-decision pattern transfers across domains when domain logic and evidence limits remain explicit.",
    lesson:
      "Method can travel; domain claims and performance outcomes cannot.",
    evidence: [
      "Documented independent workflow and decision-model work.",
      "Explicit separation of stated facts, inference, operator judgment, and next action.",
    ],
    evidenceLimit:
      "This is cross-domain method evidence. It does not establish healthcare performance, compliance, or client outcomes.",
    relevance:
      "Provides secondary evidence that TKO's systems-thinking method is portable without diluting the healthcare practice focus.",
    relatedOffer: "Executive Diagnostic",
    relatedOfferHref: "/services/executive-diagnostic",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
