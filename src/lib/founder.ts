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
    scope: "Business operating systems for growing companies: diagnosing the constraint across process, people, data, and technology, and building the system that removes it. Includes RachelOS, designed, built, and operated end to end.",
    buyerRelevance: "Combines operating, product, technology, and implementation perspectives in one person who both diagnoses the problem and builds the fix.",
  },
];

export const executiveSummary = {
  headline: "I find the work holding the business together by hand—and build a better way to run it.",
  facts: [
    "20+ years across operations, product ownership, systems delivery, and complex transformation work.",
    "Designed and built RachelOS end to end, from operating rules and data to the screens people use.",
    "One person stays responsible from diagnosis through implementation.",
    "A small client load, with scope and availability agreed before the work starts.",
  ],
};

/** Patterns I recognize, stated the way an owner would notice them. */
export const founderArchetypes = [
  {
    title: "The owner bottleneck",
    body: "The team can do the work, but too many decisions still wait for the one person who carries the full picture.",
  },
  {
    title: "Tools that do not add up",
    body: "The CRM, inbox, spreadsheets, and dashboards each hold part of the truth. People still have to connect them by hand.",
  },
  {
    title: "The missing exception path",
    body: "The happy path looks fine. The real cost appears when something is late, unclear, incomplete, or outside the standard process and nobody owns the next decision.",
  },
  {
    title: "The first useful fix",
    body: "The business does not need a grand redesign. It needs the smallest change that removes a real bottleneck and gives the team a better way to work.",
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
