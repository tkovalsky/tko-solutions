import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export const offerSeeds = [
  {
    slug: "operational-recovery-assessment",
    name: "Operational Recovery Assessment",
    kind: "assessment",
    description:
      "Placeholder seed offer for a focused recovery assessment. Todd should replace this with the final CURRENT_REALITY service language.",
    valueLow: 5000,
    valueHigh: 8000,
    isRecurring: false,
    typicalWeeks: 2,
    domainTags: ["healthcare", "operations", "recovery"],
    problemTags: ["operational-drag", "workflow-breakdown"],
    idealBuyer:
      "Placeholder: healthcare operator facing visible execution slippage or recovery pressure.",
    problemSolved:
      "Placeholder: identifies operational breakdowns, recovery priorities, and near-term corrective actions.",
    deliverables: [
      "Placeholder recovery findings summary",
      "Placeholder prioritized action map",
      "Placeholder operator review session",
    ],
    typicalObjections: [
      "Placeholder: internal team already knows the problem",
      "Placeholder: limited budget for assessment work",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: frame as a fast path to operational clarity before larger remediation spend.",
  },
  {
    slug: "prior-auth-operational-assessment",
    name: "Prior Authorization Operational Assessment",
    kind: "assessment",
    description:
      "Placeholder seed offer for prior authorization workflow assessment. Todd should replace this with final healthcare framework language.",
    valueLow: 5000,
    valueHigh: 8000,
    isRecurring: false,
    typicalWeeks: 2,
    domainTags: ["healthcare", "prior-authorization", "payer-operations"],
    problemTags: ["denials", "rework", "administrative-cost"],
    idealBuyer:
      "Placeholder: payer, provider, or healthcare technology leader accountable for prior authorization performance.",
    problemSolved:
      "Placeholder: surfaces bottlenecks, rework drivers, and operational risk in prior authorization processes.",
    deliverables: [
      "Placeholder prior authorization workflow review",
      "Placeholder friction and rework map",
      "Placeholder modernization opportunity list",
    ],
    typicalObjections: [
      "Placeholder: current vendor already covers this",
      "Placeholder: compliance deadlines are not yet urgent",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: connect workflow improvement to denial reduction, compliance readiness, and member/provider experience.",
  },
  {
    slug: "operational-truth-diagnostic",
    name: "Operational Truth Diagnostic",
    kind: "diagnostic",
    description:
      "Placeholder seed offer for a deeper diagnostic of operational truth, handoffs, and execution reality.",
    valueLow: 15000,
    valueHigh: 30000,
    isRecurring: false,
    typicalWeeks: 4,
    domainTags: ["healthcare", "operations", "executive-alignment"],
    problemTags: ["visibility-gap", "misaligned-execution", "unclear-kpis"],
    idealBuyer:
      "Placeholder: executive sponsor who needs a reliable view of operating reality before funding or transformation decisions.",
    problemSolved:
      "Placeholder: reconciles stated priorities with actual workflows, incentives, constraints, and execution gaps.",
    deliverables: [
      "Placeholder operating reality brief",
      "Placeholder evidence-backed gap register",
      "Placeholder decision recommendations",
    ],
    typicalObjections: [
      "Placeholder: leadership already has dashboards",
      "Placeholder: concern that discovery will slow execution",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: position as decision support for leaders who cannot afford another abstract strategy exercise.",
  },
  {
    slug: "decision-layer-build-sprint",
    name: "Decision Layer Build Sprint",
    kind: "build",
    description:
      "Placeholder seed offer for building a focused decision layer around an operational workflow.",
    valueLow: 45000,
    valueHigh: 150000,
    isRecurring: false,
    typicalWeeks: 8,
    domainTags: ["healthcare", "decision-support", "operations"],
    problemTags: ["manual-decisioning", "workflow-friction", "poor-traceability"],
    idealBuyer:
      "Placeholder: transformation, product, or operations leader funding a concrete workflow improvement.",
    problemSolved:
      "Placeholder: converts operational judgment into a repeatable, traceable decision workflow.",
    deliverables: [
      "Placeholder decision model",
      "Placeholder workflow implementation plan",
      "Placeholder pilot-ready operating artifact",
    ],
    typicalObjections: [
      "Placeholder: internal engineering capacity is constrained",
      "Placeholder: need proof before committing build budget",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: lead with measurable workflow progress rather than platform language.",
  },
  {
    slug: "fractional-operational-advisor",
    name: "Fractional Operational Advisor",
    kind: "fractional",
    description:
      "Placeholder seed offer for recurring advisory support around operational transformation and execution.",
    valueLow: 12000,
    valueHigh: 25000,
    isRecurring: true,
    typicalWeeks: null,
    domainTags: ["healthcare", "operations", "advisory"],
    problemTags: ["execution-risk", "leadership-gap", "operating-rhythm"],
    idealBuyer:
      "Placeholder: executive team that needs senior operational judgment without adding a full-time leader.",
    problemSolved:
      "Placeholder: provides recurring executive-level operating support, decision framing, and initiative recovery guidance.",
    deliverables: [
      "Placeholder monthly advisory cadence",
      "Placeholder executive decision support",
      "Placeholder initiative recovery guidance",
    ],
    typicalObjections: [
      "Placeholder: preference for full-time hire",
      "Placeholder: unclear advisory scope boundaries",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: frame as senior operating leverage while the organization decides whether to hire, build, or recover.",
  },
  {
    slug: "executive-briefing-workshop",
    name: "Executive Briefing Workshop",
    kind: "workshop",
    description:
      "Placeholder seed offer for a short executive workshop on operational opportunity and decision framing.",
    valueLow: 3000,
    valueHigh: 6000,
    isRecurring: false,
    typicalWeeks: 1,
    domainTags: ["healthcare", "executive-briefing", "strategy"],
    problemTags: ["unclear-options", "stakeholder-alignment", "decision-delay"],
    idealBuyer:
      "Placeholder: executive sponsor who needs quick alignment before committing to a larger effort.",
    problemSolved:
      "Placeholder: clarifies the operational problem, options, tradeoffs, and next decision.",
    deliverables: [
      "Placeholder briefing deck",
      "Placeholder facilitated workshop",
      "Placeholder next-decision summary",
    ],
    typicalObjections: [
      "Placeholder: workshop may not create enough tangible output",
      "Placeholder: stakeholders are hard to schedule",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: use as a low-friction entry offer when the buyer needs alignment more than a full diagnostic.",
  },
  {
    slug: "specialist-subcontract",
    name: "Specialist Subcontract",
    kind: "subcontract",
    description:
      "Placeholder seed offer for subcontracted specialist support on healthcare operations, prior authorization, or recovery work.",
    valueLow: 10000,
    valueHigh: 40000,
    isRecurring: false,
    typicalWeeks: 6,
    domainTags: ["healthcare", "subcontract", "specialist-support"],
    problemTags: ["delivery-capacity", "domain-expertise", "proposal-support"],
    idealBuyer:
      "Placeholder: prime contractor, consulting firm, or partner needing healthcare operations depth.",
    problemSolved:
      "Placeholder: supplies specialist operating judgment and deliverable support without expanding the prime team.",
    deliverables: [
      "Placeholder specialist workstream support",
      "Placeholder domain review notes",
      "Placeholder client-ready contribution",
    ],
    typicalObjections: [
      "Placeholder: margin pressure on subcontract budget",
      "Placeholder: concern about client-facing role clarity",
    ],
    proofItemIds: [],
    positioningNotes:
      "Placeholder: position as de-risked specialist capacity for a defined workstream.",
  },
];

export async function seedOffers(prisma) {
  for (const offer of offerSeeds) {
    await prisma.oiOffer.upsert({
      where: { slug: offer.slug },
      update: offer,
      create: offer,
    });
  }

  const seeded = await prisma.oiOffer.count({
    where: { slug: { in: offerSeeds.map((offer) => offer.slug) } },
  });

  return { expected: offerSeeds.length, seeded };
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await seedOffers(prisma);
    console.log(`Seeded ${result.seeded}/${result.expected} offer(s).`);
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
