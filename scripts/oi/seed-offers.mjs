import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// The public catalogue in src/lib/offers.ts is the source of truth. This file mirrors
// it for the internal Opportunity Intelligence tables, which cannot import TypeScript.
// If the two disagree, offers.ts wins — update this file to match, not the reverse.
//
// Opportunity Intelligence is PAUSED as a software product (docs/OPERATING-BOUNDARIES.md).
// This is data alignment so the seeded catalogue cannot contradict the public site; it is
// not new capability.

export const offerSeeds = [
  {
    slug: "program-recovery-review",
    name: "Program Recovery Review",
    kind: "assessment",
    description:
      "Three-week, fixed-fee review answering whether a healthcare transformation program is recoverable, what is actually wrong, and what the next 90 days should contain.",
    valueLow: 18000,
    valueHigh: 25000,
    isRecurring: false,
    typicalWeeks: 3,
    domainTags: ["healthcare", "transformation", "program-recovery", "operations"],
    problemTags: [
      "stalled-program",
      "missed-milestones",
      "unowned-decisions",
      "premature-automation",
      "adoption-risk",
    ],
    idealBuyer:
      "COO, Chief Transformation Officer, CIO, or SVP/VP Operations at a health plan, healthcare services organization, managed-care organization, PE-backed provider platform, or large provider organization, accountable for a program that is behind, over budget, or losing executive confidence.",
    problemSolved:
      "Establishes an independent diagnosis of what is actually blocking the program — scope, sequencing, decision rights, operating design, adoption, or vendor performance — and a bounded 90-day action plan.",
    deliverables: [
      "Executive diagnosis",
      "Program risk map",
      "Recovery priorities, sequenced and bounded",
      "Decision-rights and escalation findings",
      "Operating-model and workflow-ownership gaps",
      "Explicit read on where AI helps and where it adds risk",
      "90-day action plan with owners, measures, and decision gates",
      "Executive readout session",
    ],
    typicalObjections: [
      "We already know what is wrong",
      "Three weeks is not enough to understand a program this size",
      "We have an incumbent firm on this account",
      "We would rather wait for the current phase to complete",
    ],
    proofItemIds: [],
    positioningNotes:
      "Position as an independent read before the next funding decision, not as a discovery phase. The finding that the program should be stopped or descoped is a legitimate outcome and should be said out loud in the pitch.",
  },
  {
    slug: "fractional-transformation-lead",
    name: "Fractional Transformation Lead",
    kind: "fractional",
    description:
      "Named senior accountability for a stalled or high-risk transformation program. Part-time, scoped by days per month, three-to-six-month minimum. The primary recurring-income offer.",
    valueLow: 15000,
    valueHigh: 25000,
    isRecurring: true,
    typicalWeeks: 26,
    domainTags: ["healthcare", "transformation", "leadership", "governance"],
    problemTags: [
      "no-accountable-owner",
      "vacant-executive-seat",
      "decision-latency",
      "cross-functional-stall",
      "sponsor-visibility",
    ],
    idealBuyer:
      "Executive sponsor or PE operating partner carrying a high-risk transformation program with no single accountable owner above the workstream leads, or bridging an executive search.",
    problemSolved:
      "Supplies senior leadership capacity inside the operating cadence — holding decisions, dependencies, sequencing, escalation, and vendor performance — and transfers capability to the permanent internal owner.",
    deliverables: [
      "Named senior accountability in the operating cadence",
      "Decision, dependency, and escalation management",
      "Executive and sponsor reporting that reflects real delivery risk",
      "Recovery-plan execution and re-sequencing",
      "Vendor and partner performance oversight",
      "AI and automation adoption judgment",
      "Capability transfer to the permanent owner",
    ],
    typicalObjections: [
      "We would rather hire full-time",
      "Part-time leadership will not have enough context",
      "Our internal leaders will see this as a vote of no confidence",
      "Three-month minimum is longer than we want to commit",
    ],
    proofItemIds: [],
    positioningNotes:
      "This is the income-replacement offer. Lead with the cost comparison against an executive hire plus search fee, and with the fact that it can convert to permanent without a placement fee.",
  },
  {
    slug: "specialist-subcontract",
    name: "Specialist Subcontract",
    kind: "subcontract",
    description:
      "Senior healthcare transformation specialist capacity delivered under a prime firm's client agreement and brand. Sold to consultancies and integrators, not to end clients.",
    valueLow: 175,
    valueHigh: 250,
    isRecurring: false,
    typicalWeeks: 12,
    domainTags: [
      "healthcare",
      "prior-authorization",
      "utilization-management",
      "interoperability",
      "ai-adoption",
    ],
    problemTags: [
      "bench-capability-gap",
      "pursuit-support",
      "delivery-risk",
      "specialist-depth",
    ],
    idealBuyer:
      "Practice leader, delivery leader, or account partner at a healthcare consultancy, system integrator, advisory firm, or technology partner who already holds the client relationship.",
    problemSolved:
      "Adds credible senior healthcare operations depth to an engagement or pursuit the prime firm owns, without the prime carrying the capability on its permanent bench.",
    deliverables: [
      "Prior authorization and utilization-management operating design",
      "Healthcare transformation and program recovery",
      "Interoperability and regulated implementation (CMS, FHIR, access control, auditability)",
      "Operating-model, decision-rights, and exception-routing design",
      "Practical AI adoption judgment and readiness assessment",
      "Executive-grade written deliverables and readouts",
    ],
    typicalObjections: [
      "Margin pressure on the subcontract rate",
      "Concern about client-facing role clarity",
      "Preference for a known subcontractor",
      "Procurement onboarding takes too long",
    ],
    proofItemIds: [],
    positioningNotes:
      "Fastest path to billable revenue because the prime already owns the relationship. Note rate is hourly and indicative, confirmed per engagement. Emphasize working under the prime's brand and the non-solicitation posture.",
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
    process.exitCode = 1;
  });
}
