export type CaseStudy = {
  slug: string;
  title: string;
  classification:
    | "Anonymized enterprise experience"
    | "Healthcare product experience"
    | "Live independent system"
    | "Method-portability evidence";
  industry: string;
  /** Public narrative fields. Paragraphs are separated by a blank line. */
  situation: string;
  complexity: string;
  role: string;
  intervention: string;
  result: string;
  /** The generalized principle. Rendered above `relevance` as one block. */
  lesson: string;
  /** The buyer turn, second person. Rendered directly below `lesson`. */
  relevance: string;
  /**
   * Internal governance only. Records what each case is admitted to support so
   * claims stay inside the approved boundary. Not rendered publicly — every
   * item here is already carried by the narrative fields above.
   */
  evidence: string[];
  evidenceLimit: string;
  relatedOffer: string;
  relatedOfferHref: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prior-authorization-modernization",
    title: "Making a Prior-Authorization Waiver Work Inside the Claims System",
    classification: "Anonymized enterprise experience",
    industry: "Healthcare payer operations",
    situation:
      "Prior authorization required providers to verify eligibility and benefits, gather documentation, submit a request, and wait for clinical and medical-necessity review before care could proceed. A national health plan committed to removing that review for qualifying providers on specific codes, as part of reducing provider administrative burden.\n\nThe waiver ran across national, state, and specialty programs, including emerging rural-hospital and children's-hospital programs, each carrying a different code set. Healthcare economics and medical leadership owned the qualification methodology. Everything downstream of their decision was a delivery problem.",
    complexity:
      "The waiver could not simply delete a step. Claims adjudication and legacy processing still expected an authorization record; removing the review without producing that artifact would have broken payment.\n\nQualification results had to become provider-code relationships that clinical intake, eligibility, plan benefits, provider search, matching, and claims adjudication would each route on consistently. Eligibility was recalculated periodically and providers could appeal, so the qualifying set moved rather than being configured once.\n\nEvery one of those systems had a capable owner. The end-to-end outcome had none.",
    role:
      "I ran program management and cross-functional delivery: the recurring governance forums, integrated planning and reporting, testing coordination, dependency and escalation management, and readiness oversight across the teams involved.\n\nI did not own the qualification methodology, medical policy, waiver criteria, or the economics models behind them. My work sat downstream of that decision — making those results function correctly across the operational and claims environment.",
    intervention:
      "I established a common delivery cadence across teams that had been planning separately, connected the workstreams into one integrated view of readiness, surfaced dependencies that no single team's plan represented, and aligned validation so the new path was tested as one flow rather than six.\n\nWhen key architecture resources were unavailable, I learned enough of the workflow and system behavior myself to keep execution moving and resolve issues, rather than letting the program wait.",
    result:
      "In the resulting operating model, a qualifying provider-code combination no longer entered traditional review. It produced an advanced notification instead: the operational record downstream claims and legacy systems still required. Radiology services that historically required prior authorization could, under qualifying circumstances, follow that path.\n\nWork that had been governed locally by each team became one cross-functional delivery problem with visible dependencies, assigned ownership, and an integrated readiness view.",
    lesson:
      "Administrative-burden reform is not a policy decision or a technology decision. It becomes real at the integration boundaries — the record downstream systems still need, the eligibility that keeps changing, the program variation nobody carried through to the operational layer.",
    relevance:
      "If your burden-reduction initiative has capable teams, a funded roadmap, and no reliable view of whether the end-to-end outcome is actually executable, that is the problem I am brought in to diagnose and structure.",
    evidence: [
      "Leadership of recurring cross-functional governance and program reporting.",
      "Coordination of testing, integration, readiness, and escalation across enterprise teams.",
      "Prior-authorization and provider-workflow experience in a large national health-plan environment.",
    ],
    evidenceLimit:
      "This case reflects anonymized experience from my employment in a large national health-plan environment. Client, application, and program details are omitted, and no program metrics, timelines, or measured outcomes are published. The qualification methodology, medical policy, waiver criteria, enterprise business strategy, architecture, and funding decisions were owned by other teams.",
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
      "Release teams, platforms, testing groups, and business owners each held part of the implementation truth. A change in one area could create downstream effects that no local plan fully represented.\n\nThe governance environment involved more than a hundred cross-functional participants. At that scale, a dependency nobody reported does not stay small — it surfaces as a release collision.",
    role:
      "I connected the programs to each other: surfacing dependencies, aligning release teams, coordinating testing, managing integrated status reporting, and driving the integration discussions that no single program owned.\n\nI influenced design and implementation choices. I did not own the Gold Card strategy, the eligibility methodology, the architecture, or the funding.",
    intervention:
      "I exposed cross-platform impacts, created forums where shared decisions could actually be made, and treated eligibility capability as part of a broader enterprise workflow rather than a set of isolated implementations.",
    result:
      "Hidden dependencies became visible, assigned, governed, escalated, and tracked across the cross-functional governance environment instead of being discovered on contact.",
    lesson:
      "Trust-based or differentiated controls succeed only when qualification, workflow, claims effects, provider experience, monitoring, and requalification operate as one system.",
    relevance:
      "If you are modernizing eligibility, provider data, or differentiated controls across programs that each have their own release plan, the execution risk is sitting at the boundaries between them. That is where I look first.",
    evidence: [
      "Cross-program alignment in enterprise provider and claims environments.",
      "Integrated reporting and dependency management across numerous application and release teams.",
      "Governance contexts involving more than 100 participants.",
    ],
    evidenceLimit:
      "Anonymized experience from my employment. The evidence supports delivery orchestration and solution influence, not sole ownership of Gold Card strategy, eligibility methodology, architecture, or funding. No client, application, or program details are published.",
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
      "Dozens of applications and workstreams spanning claims, care management, behavioral health, utilization management, provider workflows, and integration required synchronized validation while dates and requirements kept changing.\n\nEvery workstream could report green against its own plan while the combined outcome was not achievable.",
    role:
      "I led governance, product-level and executive reporting, dependency and release tracking, and escalation structures, and I coordinated system, end-to-end, test-data, and readiness activity across the programs.",
    intervention:
      "I moved reporting away from local status collection toward an integrated governance architecture that connected decisions, dependencies, evidence, testing, and release readiness — so that reported status could be tested against something.",
    result:
      "Teams gained a common reporting and readiness structure, and risks that had been distributed across local plans became visible at program level.",
    lesson:
      "Governance creates value when it resolves decisions and exposes accumulating risk. It creates overhead when it only restates workstream status.",
    relevance:
      "If your program is moving but not converging — every workstream green, the integrated date still slipping — the missing artifact is usually an integrated view that nobody has been made accountable for building.",
    evidence: [
      "Executive and product-level reporting across complex delivery environments.",
      "Coordination of SIT, end-to-end validation, test data, evidence, and release readiness.",
      "Dependency and escalation management across dozens of applications and workstreams.",
    ],
    evidenceLimit:
      "Anonymized experience from my employment. No confidential program metrics, internal application names, architecture, or client endorsement are published.",
    relatedOffer: "Transformation Execution Authority",
    relatedOfferHref: "/services/transformation-leadership",
  },
  {
    slug: "healthcare-interoperability-platform",
    title: "Healthcare Interoperability Modernization",
    classification: "Healthcare product experience",
    industry: "Healthcare technology",
    situation:
      "Payer-facing CMS Cures Act and FHIR requirements had to become a usable, governed product and operating capability rather than a compliance checkbox.",
    complexity:
      "Technical exchange alone could not resolve onboarding, access, consent, auditability, data governance, exception handling, or accountable operating ownership. Making the data available was the smaller half of the problem.",
    role:
      "I owned the product responsibilities that translated payer requirements, regulatory constraints, controls, and technical delivery into an operable platform roadmap.\n\nThis was product ownership inside an employer's platform. It does not claim ownership of that employer's enterprise strategy or proprietary architecture.",
    intervention:
      "I connected the API and data requirements to access control, auditability, governance, customer onboarding, and the implementation decisions that determined whether the platform could actually be supported in production.",
    result:
      "Regulatory and technical requirements became a product and operating model that enterprise teams could implement and support.",
    lesson:
      "Interoperability makes information available. The operating model still determines who acts on it, how exceptions are handled, and how decisions stay governed and auditable.",
    relevance:
      "If you are treating an interoperability or data-access mandate as an integration project, the operating questions underneath it — who acts, who approves, what is audited — will surface later and cost more.",
    evidence: [
      "Verified healthcare interoperability product ownership.",
      "Experience with FHIR APIs, CMS Cures Act requirements, access control, auditability, and data governance.",
    ],
    evidenceLimit:
      "Product experience from my employment. It does not imply employer endorsement, and no proprietary architecture or customer detail is published.",
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
      "The system had to distinguish evidence from inference, maintain current state, prioritize work, preserve human approval, route exceptions, and learn from outcomes — without ever taking control away from the operator.",
    role:
      "I designed, built, and operate RachelOS myself, including the workflow, decision, evidence, approval, and feedback mechanisms shown in the screens below.",
    intervention:
      "I implemented relationship memory, a canonical queue, deterministic next actions, human approval, evidence authority, system health, and feedback loops as one operating system rather than as separate features.",
    result:
      "The business runs on an inspectable operating environment that turns signals into governed action while keeping consequential decisions under human control.",
    lesson:
      "Human-in-the-loop is an operating model, not an AI feature. The value comes from the full decision and feedback system built around the model.",
    relevance:
      "If you are deciding where automation is allowed to act in your own operations, this is what the answer looks like when it is built rather than diagrammed. You can inspect the mechanisms below and judge them directly.",
    evidence: [
      "Current redacted product screens.",
      "Inspectable workflow, approval, queue, relationship-memory, and system-health mechanisms.",
      "Direct founder ownership of product design, implementation, and operation.",
    ],
    evidenceLimit:
      "RachelOS is independent system proof, not a healthcare client result. It demonstrates implementation discipline and governed-decision-system design. It does not establish healthcare compliance or outcome claims.",
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
      "Useful action depended on joining incomplete information, source authority, relationship context, and operator judgment — without pretending inference was fact.",
    role:
      "I designed the analytical and workflow model as independent work outside healthcare.",
    intervention:
      "The model separated signals, facts, state, priority, recommended action, human review, and outcome feedback into distinct layers, so that each could be inspected on its own terms.",
    result:
      "The governed-decision pattern held outside its original domain, provided the domain logic and evidence limits stayed explicit.",
    lesson:
      "The operating mechanism travels. Domain outcomes do not. Making evidence, state, authority, dependencies, exceptions, human review, action, and feedback explicit is what transfers between environments.",
    relevance:
      "This is secondary evidence, and it should be read that way. A live system in another domain does not predict a result in yours — every engagement establishes its own baseline. What it shows is that the method is a method, not a healthcare anecdote.",
    evidence: [
      "Documented independent workflow and decision-model work.",
      "Explicit separation of stated facts, inference, operator judgment, and next action.",
    ],
    evidenceLimit:
      "This is cross-domain method evidence from independent work. It does not establish healthcare performance, compliance, or client outcomes.",
    relatedOffer: "Executive Diagnostic",
    relatedOfferHref: "/services/executive-diagnostic",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** First paragraph only — for cards, metadata, and other summary surfaces. */
export function leadParagraph(body: string) {
  return body.split("\n\n")[0];
}
