// Verified founder career record. Source: LinkedIn profile export (2026-07-13),
// approved in docs/audits/TKO_POSITIONING_NARRATIVE_RECONSTRUCTION_2026_07_17.md.
// Claim rule: every entry here must be supportable by the public record. No
// client-confidential program details, metrics, or unreleased organization names.

export type TimelineEntry = {
  years: string;
  organization: string;
  role: string;
  era: string;
  scope: string;
  lesson: string;
};

export const careerTimeline: TimelineEntry[] = [
  {
    years: "2000s",
    organization: "Reuters Loan Pricing Corp · Bisys · Chatham Asset Management",
    role: "Early career — credit and fund operations",
    era: "Financial Services Operations",
    scope: "Loan pricing data, fund services, and credit operations in regulated financial environments.",
    lesson: "Operating truth is derived from messy signals—not stored in the system of record.",
  },
  {
    years: "2009–2012",
    organization: "Apollo Global Management",
    role: "Operations Analyst / Operations Manager",
    era: "Financial Services Operations",
    scope: "Multi-billion-dollar leveraged loan settlement, LSTA secondary trades, BondCo V–VII build-out, and REIT operations through the post-2008 restructuring cycle.",
    lesson: "Controls, reconciliation, and exception handling are what execution means when errors carry real consequence.",
  },
  {
    years: "2012–2015",
    organization: "Sapient — Goldman Sachs AM · JPMorgan AM",
    role: "Manager / Business Analyst",
    era: "Enterprise Transformation",
    scope: "Investment-manager research and due-diligence platform for Goldman Sachs Asset Management's Fund of Funds business; investment-operations modernization for JPMorgan Asset Management.",
    lesson: "Expert judgment can become structured, institutional decision support—if the workflow is designed for it.",
  },
  {
    years: "2016–2017",
    organization: "WBI",
    role: "Project Manager (Consultant) — Investment Operations",
    era: "Product & Platform Leadership",
    scope: "Full rebuild of the firm's CRM and advisor platform across trading, ETF distribution, and settlement workflows.",
    lesson: "The operator's screen is the product. A system that cannot answer 'what should happen next' is storage.",
  },
  {
    years: "2017–2018",
    organization: "FolioDynamix",
    role: "Product Owner — TAMP & Wealth Technology",
    era: "Product & Platform Leadership",
    scope: "Product roadmap and delivery for a turnkey asset management platform through its acquisition by Envestnet.",
    lesson: "Roadmaps survive only when they are tied to advisor workflow reality, not feature ambition.",
  },
  {
    years: "2020–2022",
    organization: "ELLKAY",
    role: "Product Manager — Healthcare Interoperability",
    era: "Healthcare & Interoperability",
    scope: "Owned a payer-facing interoperability platform for CMS Cures Act compliance: FHIR APIs with access control, auditability, and data governance embedded in platform logic.",
    lesson: "Governance is architecture. Compliance enforced in code scales; compliance attached as policy does not.",
  },
  {
    years: "2022–present",
    organization: "Cognizant",
    role: "Senior Manager — Healthcare Transformation, AI & Analytics",
    era: "Healthcare Transformation",
    scope: "Large-scale payer modernization for a Fortune 5 healthcare organization: delivery governance, executive reporting, workflow transformation, and AI-enabled operational improvement.",
    lesson: "Programs fail between workstreams—where dependency risk, decision latency, and adoption gaps live.",
  },
  {
    years: "2018–present",
    organization: "TKO Solutions",
    role: "Founder & Principal",
    era: "Founder",
    scope: "Operational intelligence advisory for healthcare and regulated operations. RachelOS (2025–26) is the production reference implementation of the full operating thesis.",
    lesson: "The decision layer can be built, governed, and audited—so it should be.",
  },
];

export const credibilityStrip = [
  {
    name: "Apollo Global Management",
    detail: "Leveraged loan and REIT operations through the post-2008 cycle",
  },
  {
    name: "Sapient",
    detail: "Platform transformation for Goldman Sachs AM and JPMorgan AM",
  },
  {
    name: "FolioDynamix",
    detail: "Wealth platform product ownership through Envestnet acquisition",
  },
  {
    name: "ELLKAY",
    detail: "CMS Cures Act / FHIR interoperability platform for payers",
  },
  {
    name: "Cognizant",
    detail: "Fortune 5 healthcare transformation, AI & analytics",
  },
];

export type AtlasRow = {
  pattern: string;
  learned: string;
  proven: string;
};

export const experienceAtlas: AtlasRow[] = [
  {
    pattern: "Deriving trusted state from fragmented signals",
    learned: "Apollo: reconciliation and settlement across multi-billion-dollar credit portfolios",
    proven: "RachelOS facts-and-state engine: source-aware facts resolved from unstructured updates",
  },
  {
    pattern: "Turning expert judgment into decision support",
    learned: "Sapient: manager research and due-diligence platform for Goldman Sachs AM",
    proven: "RachelOS recommendation layer: advisory-only, explained, human-approved",
  },
  {
    pattern: "Operator-first workflow design",
    learned: "WBI and FolioDynamix: advisor platforms owned as products",
    proven: "RachelOS canonical queue and daily work surface, in production use",
  },
  {
    pattern: "Governance embedded as architecture",
    learned: "ELLKAY: Cures Act compliance enforced in FHIR API logic",
    proven: "RachelOS approval gates, human-fact immutability, activation states—enforced in code",
  },
  {
    pattern: "Program and dependency governance",
    learned: "Cognizant: Fortune 5 payer transformation portfolio",
    proven: "Program-recovery operating framework: constraint registers and decision-centered reviews",
  },
  {
    pattern: "AI under human authority",
    learned: "Cognizant AI & Analytics: AI-enabled operational improvement in regulated programs",
    proven: "RachelOS + published delivery record: 77 outbound messages, each human-approved before send",
  },
];

export type CapabilityRow = {
  capability: string;
  careerEvidence: string;
  proofEvidence: string;
  boundary: string;
  href: string;
};

export const capabilityAtlas: CapabilityRow[] = [
  {
    capability: "Operational Recovery Assessment",
    careerEvidence: "Two decades of operations and delivery governance in regulated environments (Apollo, Sapient, Cognizant).",
    proofEvidence: "The same evidence method that produced RachelOS's published self-audit, applied to a client workflow.",
    boundary: "Fixed scope, one week. Identifies the constraint and next move; does not promise a build or an outcome metric.",
    href: "/services/recovery-assessment",
  },
  {
    capability: "Operational Truth Diagnostic",
    careerEvidence: "Enterprise transformation analysis for GSAM, JPMAM, and a Fortune 5 payer portfolio.",
    proofEvidence: "Published operating frameworks: program recovery, decision rights, executive operating reviews.",
    boundary: "Evidence work across one or two workflow areas. Not a broad strategy review or tool selection exercise.",
    href: "/services/diagnostic",
  },
  {
    capability: "Prior Authorization Operational Assessment",
    careerEvidence: "Payer operations transformation (Cognizant, 2022–present) and interoperability compliance ownership (ELLKAY, 2020–22).",
    proofEvidence: "Published prior-authorization decision-rights and operational-quality frameworks.",
    boundary: "Experience-based healthcare pattern work. No PHI access required; no client workflow or outcome is disclosed.",
    href: "/services/prior-authorization-assessment",
  },
  {
    capability: "Operating System Build & AI Governance",
    careerEvidence: "Product ownership at WBI, FolioDynamix, and ELLKAY; AI-enabled operations work at Cognizant.",
    proofEvidence: "RachelOS: 1,528 commits, 67 migrations, 1,341 tests, ten months live—human-governed AI in production.",
    boundary: "One deployment, one operator. Direct proof of capability and governance architecture—not enterprise scale or ROI.",
    href: "/services/operating-system-build",
  },
];

export const executiveSummary = {
  headline: "Todd Kovalsky — Operational Intelligence Advisor",
  gloss: "The layer between systems of record and the decisions people actually make.",
  facts: [
    "20+ years in regulated operating environments: financial services operations, enterprise transformation, product leadership, healthcare interoperability, and healthcare transformation.",
    "Operations under consequence at Apollo Global Management through the post-2008 restructuring cycle.",
    "Enterprise platform transformation for Goldman Sachs Asset Management and JPMorgan Asset Management (Sapient).",
    "Product ownership of advisor and wealth platforms (WBI; FolioDynamix through its Envestnet acquisition).",
    "CMS Cures Act / FHIR interoperability platform ownership for healthcare payers (ELLKAY).",
    "Fortune 5 healthcare transformation: delivery governance, payer operations, and AI-enabled operational improvement (Cognizant, 2022–present).",
    "Founder-builder of RachelOS: a production, human-governed AI operating system with a published self-audit.",
  ],
};
