// Buyer-facing solution pages. One registry, one template (src/components/site/solution-page.tsx).
// Claim rules (docs/TKO_APPLIED_AI_EVIDENCE_LEDGER_2026_09_02.md): AI-implementation evidence
// cites RachelOS only; RachelOS is one operator's system with no outcome metrics; healthcare
// proof is synthetic or anonymized; conceptual applications are labeled as such. Prices are
// never written here; pages read them from src/lib/offers.ts.

export type SolutionEvidence = {
  kind: "Working software" | "Synthetic deliverable" | "Synthetic demo";
  title: string;
  description: string;
  href: string;
};

export type Solution = {
  slug: "operational-intelligence" | "delivery-intelligence" | "revenue-operations";
  path: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  problem: string;
  status?: string;
  consequences: string[];
  rootCauses: string[];
  diagnosis: { step: string; description: string }[];
  example: { label: string; title: string; before: string[]; after: string[] };
  evidence: SolutionEvidence[];
  boundaries: string[];
  cta: { href: string; label: string; secondaryHref: string; secondaryLabel: string; note: string };
  related: { href: string; label: string }[];
};

const rachelosCase = "/selected-work/from-crm-to-operating-system";

export const solutions: Solution[] = [
  {
    slug: "operational-intelligence",
    path: "/operational-intelligence",
    eyebrow: "Operational intelligence",
    title: "Your systems have the data. Why do people still connect everything by hand?",
    metaTitle: "Operational Intelligence: From Information to Execution",
    metaDescription:
      "Why teams still carry work between CRM, ERP, email, and spreadsheets, and how an operating layer turns stored records into owned, visible next actions.",
    problem:
      "Most organizations are not short of software or data. The CRM, the ERP, the shared inbox, and the spreadsheets each hold part of the picture. What is missing is the layer that turns those records into a decision about what happens next, who owns it, and whether it happened. Without it, people become that layer: they re-key, reconcile, chase, and remember.",
    consequences: [
      "Work waits until the one person who knows the routing notices it.",
      "Staff time goes to reconciliation and status-chasing instead of the work itself.",
      "Exceptions surface late, after a customer, auditor, or deadline finds them.",
      "Knowledge leaves with the person who carried it.",
      "Automation and AI projects stall because nobody defined the rule, the owner, or the measure first.",
    ],
    rootCauses: [
      "Each system is a system of record for its own slice; none owns the handoff between them.",
      "The rules for what needs attention live in people’s heads, not in anything a system can apply.",
      "Ownership is implied by habit, not assigned, so nobody is accountable for the gap.",
      "Reports describe what already happened; nothing puts the next action in front of the person who should take it.",
    ],
    diagnosis: [
      { step: "Connect", description: "Identify which systems hold the facts for one workflow, and how they reach each other today, including by hand." },
      { step: "Understand", description: "Separate facts from guesses: what the record knows, what it should know, and what is missing." },
      { step: "Decide", description: "Write down the rules people already apply in their heads, and name who owns each decision." },
      { step: "Execute", description: "Put the next action in front of that owner. A person approves anything consequential." },
      { step: "Verify", description: "Record whether it happened, with evidence, so status is derived rather than re-typed." },
      { step: "Improve", description: "Review exceptions and change the rules deliberately." },
    ],
    example: {
      label: "Illustrative example, not a client engagement",
      title: "Customer orders that arrive by email",
      before: [
        "Orders arrive in a shared inbox. One coordinator re-keys them into the ERP and tracks exceptions in a spreadsheet.",
        "When the coordinator is out, orders wait. Nobody can see which ones are stuck or why.",
      ],
      after: [
        "Orders are read from the inbox into a structured queue with the facts that matter and the ones that are missing.",
        "Explicit rules route clean orders forward and send exceptions to a named owner; a person still approves anything unusual.",
        "Everyone can see what is waiting, on whom, and since when, without asking.",
      ],
    },
    evidence: [
      {
        kind: "Working software",
        title: "RachelOS: one operator’s operating layer",
        description:
          "An independent, single-operator system Todd designed and built for one real-estate practice. It keeps per-relationship memory, computes a ranked daily action queue, surfaces the most valuable missing fact, and holds AI drafts for human approval. It shows the mechanism; it does not establish client results.",
        href: rachelosCase,
      },
    ],
    boundaries: [
      "Your systems of record stay. The operating layer sits beside them.",
      "AI helps extract, summarize, draft, and flag. It does not set the state of the work or act without approval.",
      "No promised savings or ROI before the workflow and its baseline are understood.",
      "Not a packaged platform. Each engagement builds only what one workflow needs.",
    ],
    cta: {
      href: "/services/execution-gap-blueprint",
      label: "Get My Execution Blueprint",
      secondaryHref: "/contact?cta=operational_intelligence_enterprise",
      secondaryLabel: "Discuss an Enterprise Engagement",
      note: "Start with one workflow. The Blueprint maps where it breaks down and the most practical next step.",
    },
    related: [
      { href: "/solutions/delivery-intelligence", label: "Delivery intelligence for complex programs" },
      { href: "/solutions/revenue-operations", label: "Revenue operations beside your CRM" },
      { href: "/insights/from-system-of-record-to-system-of-action", label: "Guide: from system of record to system of action" },
    ],
  },
  {
    slug: "delivery-intelligence",
    path: "/solutions/delivery-intelligence",
    eyebrow: "Delivery intelligence",
    title: "Every workstream reports green. Is the program actually ready?",
    metaTitle: "Delivery Intelligence: Readiness Beyond Green Status",
    metaDescription:
      "Why complex programs report green and still miss readiness, and how ownership discovery, dependency mapping, and traceable evidence show what is actually ready.",
    status:
      "TKO’s method applied to enterprise delivery, scoped per program. TKO does not offer a packaged delivery-intelligence platform, and no enterprise deployment is claimed here.",
    problem:
      "Large programs run on status reports. Each team reports its own work, and each report can be accurate. The risk sits between them: in the dependency nobody owns, the requirement that stops at a document boundary, and the decision that was assumed rather than made. Teams call this “watermelon reporting”: green outside, red inside.",
    consequences: [
      "Readiness problems surface at the release decision, when options are most expensive.",
      "Leaders spend meetings reconciling conflicting status instead of making decisions.",
      "Requirements cannot be traced from obligation to working system to evidence.",
      "Teams spend hours preparing status by hand that nobody can verify.",
    ],
    rootCauses: [
      "Status measures activity inside a team, not readiness across teams.",
      "Dependencies and decision rights are implicit, so nobody owns the gaps between workstreams.",
      "Traceability lives in documents, not in links between requirements, systems, owners, and evidence.",
      "Several systems hold conflicting versions of the same program facts.",
    ],
    diagnosis: [
      { step: "Ownership discovery", description: "Name the accountable owner for each decision, dependency, and handoff in scope." },
      { step: "Dependency mapping", description: "Map which teams and systems depend on which, and which links nobody owns." },
      { step: "Requirement traceability", description: "Trace each requirement through capability, workflow, system, control, owner, and evidence." },
      { step: "Readiness evidence", description: "Define what evidence shows a link is ready, and what is still assumed." },
      { step: "Exception detection", description: "Flag missing owners, broken links, and evidence that has not arrived." },
      { step: "Sponsor readout", description: "Show what is proven, what is open, and which decisions leadership must make." },
    ],
    example: {
      label: "Synthetic example",
      title: "A healthcare mandate traced to the work",
      before: [
        "A regulatory change spans intake, a clinical rules engine, claims, and a delegated vendor. Each workstream reports on track.",
        "No single view shows whether the obligation is met end to end, or who owns the handoff to the vendor.",
      ],
      after: [
        "An obligation register links the rule to capabilities, workflows, systems, controls, owners, and evidence.",
        "A gap and ownership matrix shows the unowned handoff before the release decision, with a named decision for the sponsor.",
      ],
    },
    evidence: [
      {
        kind: "Synthetic deliverable",
        title: "Readiness deliverables, fully synthetic",
        description:
          "Five connected sample deliverables for one fictional healthcare change: obligation register, impact map, gap matrix, backlog, and sponsor readout.",
        href: "/healthcare/readiness-preview",
      },
      {
        kind: "Synthetic demo",
        title: "The synthetic decision lab",
        description:
          "Follow one fictional authorization decision across policy, workflow, system, and evidence, and see where readiness breaks.",
        href: "/healthcare/impact-assessment",
      },
    ],
    boundaries: [
      "Your delivery teams own execution; the work makes ownership and evidence explicit, it does not replace your PMO.",
      "Not legal, regulatory, or clinical advice, and not a compliance certification.",
      "No confidential client artifacts are used; the examples here are synthetic.",
      "Estimates and impact figures are hypotheses until measured in your program.",
    ],
    cta: {
      href: "/contact?cta=delivery_intelligence",
      label: "Discuss an Enterprise Engagement",
      secondaryHref: "/services/regulatory-implementation-readiness-sprint",
      secondaryLabel: "Healthcare Readiness Sprint",
      note: "For a funded program, we scope the engagement directly. For one workflow inside it, the Execution Gap Blueprint is the smaller first step.",
    },
    related: [
      { href: "/operational-intelligence", label: "Operational intelligence: the method" },
      { href: "/insights/why-healthcare-transformation-programs-stall", label: "Guide: why programs report green and still stall" },
      { href: "/services/execution-gap-blueprint", label: "Execution Gap Blueprint for one workflow" },
    ],
  },
  {
    slug: "revenue-operations",
    path: "/solutions/revenue-operations",
    eyebrow: "Revenue operations",
    title: "Leads and clients fall through the cracks. Your CRM is not the problem.",
    metaTitle: "Revenue Operations: Accountable Follow-Up Beside Your CRM",
    metaDescription:
      "Why leads and relationships slip even with a CRM, and how a computed next-action queue and human-approved AI drafting fix follow-up without replacing the CRM.",
    problem:
      "The CRM stores contacts, notes, and activity. It rarely tells anyone what to do next, for whom, and why today. So follow-up depends on memory and good intentions. Leads you paid for wait, past clients drift, and the context from the last conversation lives in one person’s head.",
    consequences: [
      "Paid leads go without a timely personal response, and nobody notices until later.",
      "Relationship context is lost between conversations or when someone leaves.",
      "Follow-up is inconsistent across the team and impossible to review.",
      "AI-drafted outreach is either avoided entirely or sent without enough review.",
    ],
    rootCauses: [
      "The CRM shows activity, not neglect: it cannot tell you who is overdue for a real response.",
      "There is no single, ranked view of who needs attention now and why.",
      "Missing facts (budget, timing, intent) are not surfaced, so conversations restart from zero.",
      "No explicit approval step stands between a draft and a sent message.",
    ],
    diagnosis: [
      { step: "Map the path", description: "Follow an inquiry from source to first response to next step, across the CRM, inbox, and phone." },
      { step: "Find the slippage", description: "Identify where responses wait, who owns them, and which rules nobody wrote down." },
      { step: "Define the queue", description: "Specify the ranked daily view: who needs attention, the reason, and the next action." },
      { step: "Govern the drafting", description: "Decide where AI may draft or summarize, and where a person must approve the exact message." },
    ],
    example: {
      label: "Working example: RachelOS",
      title: "One operator’s follow-up, rebuilt around the next action",
      before: [
        "Inquiries, notes, and follow-up lived across several tools, and each morning started with reconstructing who needed what.",
      ],
      after: [
        "One ranked, freshness-classified queue shows who needs attention now and why, recomputed as new signals arrive.",
        "Each relationship carries a timeline of situation, known facts, and open questions, plus the most valuable missing fact to ask next.",
        "AI drafts wait in an operator review queue; nothing is sent until a person approves the exact message.",
      ],
    },
    evidence: [
      {
        kind: "Working software",
        title: "RachelOS case study",
        description:
          "The queue, relationship memory, missing-fact prompts, and approval gate described above are implemented in code and running for one real-estate practice. RachelOS is a single-operator system, not a product, and no conversion or revenue results are claimed.",
        href: rachelosCase,
      },
    ],
    boundaries: [
      "Your CRM stays the system of record; the work happens beside it.",
      "No autonomous outreach. A named person approves AI-drafted messages before they are sent.",
      "Consent, opt-out, and messaging rules are confirmed before anything contacts a customer.",
      "No guaranteed lead volume, conversion, or revenue.",
    ],
    cta: {
      href: "/services/execution-gap-blueprint",
      label: "Get My Execution Blueprint",
      secondaryHref: "/private-client-os",
      secondaryLabel: "Private Client OS",
      note: "Start with the follow-up workflow that slips most. The Blueprint shows where and why, and what to fix first.",
    },
    related: [
      { href: "/insights/why-leads-fall-through-the-cracks", label: "Guide: why leads fall through the cracks" },
      { href: "/products/ambient-crm", label: "BoundOS managed follow-up for real-estate teams" },
      { href: "/operational-intelligence", label: "Operational intelligence: the method" },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export const solutionRoutes = solutions.map((solution) => solution.path);
