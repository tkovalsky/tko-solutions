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
    buyerRelevance: "Complex work becomes reliable when controls, ownership, and exception paths are explicit—not when the system of record merely contains the transaction.",
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
    scope: "Principal-led diagnostic and implementation work, now focused on prior-authorization performance for specialty medical groups, MSOs, and provider-side healthcare operators.",
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
  headline: "Buyer diligence on the operator behind the work.",
  facts: [
    "20+ years across regulated operations, enterprise transformation, product ownership, healthcare interoperability, and healthcare transformation.",
    "Healthcare experience spanning prior authorization, utilization management, payer/provider operations, interoperability, and administrative workflow change.",
    "Product and implementation experience translating operating requirements into usable workflows, controls, and delivery decisions.",
    "RachelOS provides inspectable internal proof of implementation and governance discipline, with its non-healthcare and non-client limits stated explicitly.",
  ],
};
