import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export const playbookSeeds = [
  {
    slug: "healthcare-executive",
    name: "Healthcare Executive",
    scope: "healthcare_executive",
    appliesToTypes: ["consulting", "assessment", "fractional"],
    appliesToRelationships: ["cold", "warm_referral", "warm_history"],
    domainTags: ["healthcare", "executive"],
    researchSteps: [
      "Placeholder: confirm executive mandate and current operating priorities.",
      "Placeholder: collect recent public statements, interviews, or transformation signals.",
      "Placeholder: identify evidence-backed operational pressure relevant to Todd's offers.",
    ],
    decisionPoints: [
      "Placeholder: decide whether the executive has a funded operational problem.",
      "Placeholder: decide whether outreach should lead with assessment, diagnostic, or advisory framing.",
    ],
    proofGuidance:
      "Placeholder: use healthcare operations proof that maps directly to the executive's stated pressure.",
    offerGuidance:
      "Placeholder: select the smallest offer that creates a credible next executive decision.",
    draftGuidance:
      "Placeholder: write in an executive, specific, evidence-backed tone with no unsupported claims.",
    followUpRhythmDays: [7, 14, 30],
    commonObjections: [
      "Placeholder: already have internal transformation support.",
      "Placeholder: timing is not urgent.",
    ],
    isActive: true,
  },
  {
    slug: "job-application",
    name: "Job Application",
    scope: "job_application",
    appliesToTypes: ["fte"],
    appliesToRelationships: ["cold", "warm_referral", "warm_history"],
    domainTags: ["healthcare", "fte"],
    researchSteps: [
      "Placeholder: verify compensation floor, reporting line, and scope.",
      "Placeholder: identify hiring manager, recruiter, and likely business sponsor.",
      "Placeholder: map role requirements to Todd v2 capability evidence.",
    ],
    decisionPoints: [
      "Placeholder: decide whether the role clears the compensation and scope filters.",
      "Placeholder: decide whether a warm path exists before applying.",
    ],
    proofGuidance:
      "Placeholder: cite role-relevant proof only after Todd approves exact language.",
    offerGuidance:
      "Placeholder: no consulting offer selected unless the role converts to advisory conversation.",
    draftGuidance:
      "Placeholder: tailor application language to the role's operating problem and measurable scope.",
    followUpRhythmDays: [5, 10, 21],
    commonObjections: [
      "Placeholder: role may be below required compensation.",
      "Placeholder: sponsor authority may be unclear.",
    ],
    isActive: true,
  },
  {
    slug: "consulting-assessment",
    name: "Consulting Assessment",
    scope: "consulting_assessment",
    appliesToTypes: ["consulting", "assessment"],
    appliesToRelationships: ["cold", "warm_referral", "warm_history", "existing_client"],
    domainTags: ["healthcare", "assessment"],
    researchSteps: [
      "Placeholder: define the operating pain, buyer, and likely decision window.",
      "Placeholder: confirm whether the problem fits an assessment rather than a build sprint.",
      "Placeholder: gather proof aligned to the buyer's problem tags.",
    ],
    decisionPoints: [
      "Placeholder: decide whether the assessment creates enough value to justify outreach.",
      "Placeholder: decide which offer slug should be recommended first.",
    ],
    proofGuidance:
      "Placeholder: match proof by domain and problem tags before using any case detail.",
    offerGuidance:
      "Placeholder: prefer a low-friction assessment when the buyer has acknowledged pain but not committed budget.",
    draftGuidance:
      "Placeholder: lead with the operational cost of inaction and a concrete assessment outcome.",
    followUpRhythmDays: [7, 14, 30],
    commonObjections: [
      "Placeholder: buyer wants free discovery.",
      "Placeholder: buyer believes the problem is already diagnosed.",
    ],
    isActive: true,
  },
  {
    slug: "warm-referral",
    name: "Warm Referral",
    scope: "warm_referral",
    appliesToTypes: ["consulting", "fractional", "assessment", "fte", "partnership"],
    appliesToRelationships: ["warm_referral", "warm_history", "existing_client"],
    domainTags: ["healthcare", "relationship"],
    researchSteps: [
      "Placeholder: identify the referral source, relationship context, and ask.",
      "Placeholder: confirm the target's current role and operating priorities.",
      "Placeholder: prepare a concise referral note with approved proof only.",
    ],
    decisionPoints: [
      "Placeholder: decide whether the referral ask is specific enough.",
      "Placeholder: decide whether Todd should ask for intro, advice, or validation.",
    ],
    proofGuidance:
      "Placeholder: use proof sparingly; referral trust should carry the first step.",
    offerGuidance:
      "Placeholder: mention an offer only when the referral source already understands the buyer's problem.",
    draftGuidance:
      "Placeholder: keep the ask short, human, and easy to forward.",
    followUpRhythmDays: [7, 14],
    commonObjections: [
      "Placeholder: referral source may not know the target well enough.",
      "Placeholder: ask may feel too commercial too early.",
    ],
    isActive: true,
  },
  {
    slug: "cold-outreach",
    name: "Cold Outreach",
    scope: "cold_outreach",
    appliesToTypes: ["consulting", "assessment", "fractional", "partnership"],
    appliesToRelationships: ["cold"],
    domainTags: ["healthcare", "outreach"],
    researchSteps: [
      "Placeholder: verify public evidence for the problem and buyer relevance.",
      "Placeholder: confirm contact provenance is outreach-safe before drafting.",
      "Placeholder: identify the smallest credible ask.",
    ],
    decisionPoints: [
      "Placeholder: decide whether evidence is strong enough for cold outreach.",
      "Placeholder: decide whether to lead with insight, question, or assessment offer.",
    ],
    proofGuidance:
      "Placeholder: use only approved proof; avoid claims that require private context.",
    offerGuidance:
      "Placeholder: lead with a narrowly scoped assessment or workshop rather than broad advisory.",
    draftGuidance:
      "Placeholder: be specific, brief, and evidence-backed; do not imply a prior relationship.",
    followUpRhythmDays: [7, 14, 30],
    commonObjections: [
      "Placeholder: message may feel generic.",
      "Placeholder: buyer may not recognize the problem as funded.",
    ],
    isActive: true,
  },
  {
    slug: "partnership",
    name: "Partnership",
    scope: "partnership",
    appliesToTypes: ["partnership", "consulting", "rfp"],
    appliesToRelationships: ["cold", "warm_referral", "warm_history", "existing_client"],
    domainTags: ["healthcare", "partnership"],
    researchSteps: [
      "Placeholder: identify partner role, client access, and delivery gap.",
      "Placeholder: confirm where Todd's specialist contribution fits the partner economics.",
      "Placeholder: map proof to the partner's client-facing need.",
    ],
    decisionPoints: [
      "Placeholder: decide whether the partner controls a credible route to revenue.",
      "Placeholder: decide whether Todd should propose subcontract, referral, or joint pursuit.",
    ],
    proofGuidance:
      "Placeholder: emphasize delivery credibility and domain fit without overstating capacity.",
    offerGuidance:
      "Placeholder: prefer specialist subcontract or defined advisory support.",
    draftGuidance:
      "Placeholder: make the partner's benefit and client outcome clear in the first paragraph.",
    followUpRhythmDays: [7, 14, 30],
    commonObjections: [
      "Placeholder: economics may be too thin.",
      "Placeholder: delivery ownership may be unclear.",
    ],
    isActive: true,
  },
  {
    slug: "program-recovery",
    name: "Program Recovery",
    scope: "program_recovery",
    appliesToTypes: ["consulting", "assessment", "fractional"],
    appliesToRelationships: ["cold", "warm_referral", "warm_history", "existing_client"],
    domainTags: ["healthcare", "program-recovery"],
    researchSteps: [
      "Placeholder: identify evidence that the program is delayed, over budget, or losing trust.",
      "Placeholder: map stakeholders, decision rights, and operational blockers.",
      "Placeholder: choose proof that shows recovery, not generic strategy.",
    ],
    decisionPoints: [
      "Placeholder: decide whether Todd can credibly help recover the program.",
      "Placeholder: decide whether the first offer should be assessment, diagnostic, or fractional advisory.",
    ],
    proofGuidance:
      "Placeholder: prioritize recovery proof tied to execution, governance, and operating cadence.",
    offerGuidance:
      "Placeholder: select operational recovery assessment for acute triage; select advisory for ongoing support.",
    draftGuidance:
      "Placeholder: acknowledge pressure without sounding alarmist; focus on restoring operational control.",
    followUpRhythmDays: [7, 14, 30],
    commonObjections: [
      "Placeholder: buyer may avoid admitting recovery need.",
      "Placeholder: internal team may see outside help as criticism.",
    ],
    isActive: true,
  },
];

export async function seedPlaybooks(prisma) {
  for (const playbook of playbookSeeds) {
    await prisma.oiPlaybook.upsert({
      where: { slug: playbook.slug },
      update: playbook,
      create: playbook,
    });
  }

  const seeded = await prisma.oiPlaybook.count({
    where: { slug: { in: playbookSeeds.map((playbook) => playbook.slug) } },
  });

  return { expected: playbookSeeds.length, seeded };
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await seedPlaybooks(prisma);
    console.log(`Seeded ${result.seeded}/${result.expected} playbook(s).`);
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
