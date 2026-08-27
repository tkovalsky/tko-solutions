// Verified founder career record. Source: LinkedIn profile export (2026-07-13),
// approved in docs/audits/TKO_POSITIONING_NARRATIVE_RECONSTRUCTION_2026_07_17.md.
// Employment history establishes experience, not employer or client endorsement.

export type TimelineEntry = {
  years: string;
  organization: string;
  role: string;
  era: string;
  scope: string;
  buyerRelevance: string;
};

export const careerTimeline: TimelineEntry[] = [
  {
    years: "2000s",
    organization: "Reuters Loan Pricing Corp · Bisys · Chatham Asset Management",
    role: "Early career, credit and fund operations",
    era: "Regulated operations",
    scope: "Loan pricing data, fund services, and credit operations in regulated financial environments.",
    buyerRelevance: "Established the operating discipline of reconciliation, exception handling, and evidence under consequence.",
  },
  {
    years: "2009–2012",
    organization: "Apollo Global Management",
    role: "Operations Analyst / Operations Manager",
    era: "Financial-services operations",
    scope: "Leveraged-loan settlement, LSTA secondary trades, BondCo V–VII build-out, and REIT operations through the post-2008 restructuring cycle.",
    buyerRelevance: "Complex work becomes reliable when controls, ownership, and exception paths are explicit. A system of record that merely contains the transaction is not enough.",
  },
  {
    years: "2012–2015",
    organization: "Sapient, Goldman Sachs AM · JPMorgan AM",
    role: "Manager / Business Analyst",
    era: "Enterprise transformation",
    scope: "Investment-manager research and due-diligence platform work for Goldman Sachs Asset Management and investment-operations modernization for JPMorgan Asset Management.",
    buyerRelevance: "Connected expert judgment, operating requirements, product design, and technology delivery across institutional environments.",
  },
  {
    years: "2016–2018",
    organization: "WBI · FolioDynamix",
    role: "Project Manager / Product Owner",
    era: "Product and platform leadership",
    scope: "Advisor-platform, CRM, trading, settlement, and wealth-technology roadmap and delivery work, including FolioDynamix through its acquisition by Envestnet.",
    buyerRelevance: "Built the operator-first product perspective required to turn workflow findings into usable standard work and implementation choices.",
  },
  {
    years: "2020–2022",
    organization: "ELLKAY",
    role: "Product Manager, Healthcare Interoperability",
    era: "Healthcare product and regulation",
    scope: "Payer-facing interoperability platform ownership for CMS Cures Act compliance, including FHIR APIs, access control, auditability, and data governance.",
    buyerRelevance: "Demonstrated how regulatory requirements, technical architecture, controls, and day-to-day operating behavior must be designed together.",
  },
  {
    years: "2022–present",
    organization: "Cognizant",
    role: "Senior Manager, Healthcare Transformation, AI & Analytics",
    era: "Healthcare transformation",
    scope: "Healthcare transformation work spanning delivery governance, executive reporting, payer operations, cross-functional alignment, workflow transformation, and AI-enabled improvement.",
    buyerRelevance: "Provides direct context for prior authorization, utilization management, provider operations, multi-workstream dependencies, and responsible automation decisions.",
  },
  {
    years: "2018–present",
    organization: "TKO Solutions",
    role: "Founder & Principal",
    era: "Independent advisory",
    scope: "Principal-led healthcare transformation and operating-model advisory for organizations working across administrative burden, regulated workflows, technology modernization, and complex execution.",
    buyerRelevance: "Combines the operating, product, healthcare, technology, governance, and implementation perspectives inside one accountable engagement lead.",
  },
];

export const credibilityStrip = [
  { name: "Apollo Global Management", detail: "regulated operations and exception handling" },
  { name: "Sapient", detail: "institutional platform transformation" },
  { name: "ELLKAY", detail: "CMS Cures Act and FHIR interoperability" },
  { name: "Cognizant", detail: "healthcare transformation and payer operations" },
];

export const executiveSummary = {
  headline: "I'm Todd Kovalsky. I become the integration point on transformations that no single team owns end to end.",
  facts: [
    "20+ years across regulated operations, enterprise transformation, product ownership, healthcare interoperability, and implementation.",
    "Enterprise programs spanning dozens of interdependent applications and workstreams, with governance environments involving more than 100 cross-functional participants.",
    "Healthcare experience spanning prior authorization, utilization management, payer and provider operations, interoperability, and administrative workflow change.",
    "Product and implementation experience translating operating requirements into usable workflows, controls, and delivery decisions.",
    "RachelOS, an operating system I built and run, shows the same implementation and governance discipline applied end to end.",
  ],
};

export const founderArchetypes = [
  {
    title: "Integration point",
    body: "I am the single point where business, operations, technology, compliance, finance, provider workflows, communications, testing, and production readiness actually meet—on programs with a fixed enterprise deadline and no one role accountable for the whole.",
  },
  {
    title: "Operational truth",
    body: "I establish the governance and dependency architecture a program is missing: who owns what, what depends on what, which decision is unresolved, and whether reported status is supported by evidence.",
  },
  {
    title: "Failure modes, firsthand",
    body: "I recognize where large healthcare implementations break down because I have operated inside them—ownership gaps, dependencies discovered by collision, decisions that stall, and testing that lacks the right data.",
  },
  {
    title: "Translator",
    body: "I connect healthcare operations, business objectives, technology, controls, risk, provider experience, and implementation so that a target operating model survives contact with delivery.",
  },
];

/** Answers the practical questions a buyer asks before engaging an independent principal. */
export const howIWork = [
  {
    title: "I lead the engagement personally",
    body: "Every TKO engagement is delivered by me. There is no associate team, no offshore analyst pool, and nobody to hand the work to after the kickoff.",
  },
  {
    title: "Capacity is deliberately limited",
    body: "I hold a small number of concurrent engagements so each one gets senior attention throughout. Availability is confirmed against current commitments before a proposal is issued, not after.",
  },
  {
    title: "Conflicts are screened first",
    body: "Before any work begins I check the account, the vendors involved, and the program against my existing and prior commitments. If there is a conflict, I say so and decline.",
  },
  {
    title: "Scope and confidentiality are set in writing",
    body: "Scope, timing, availability, data handling, and confidentiality are agreed in writing before the engagement starts. Where sensitive data is involved, handling is defined before anyone touches it.",
  },
];
