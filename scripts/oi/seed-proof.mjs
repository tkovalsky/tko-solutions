import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export const proofSeeds = [
  {
    slug: "placeholder-operational-recovery-case-study",
    title: "Placeholder Operational Recovery Case Study",
    kind: "case_study",
    summary:
      "Placeholder proof item for operational recovery work. Todd should replace with final case study content from docs/CASE_STUDY_LIBRARY.md.",
    publicUrl: null,
    internalRef: "case-study-library:operational-recovery-placeholder",
    domainTags: ["healthcare", "operations", "recovery"],
    problemTags: ["operational-drag", "execution-risk"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-prior-auth-workflow-case-study",
    title: "Placeholder Prior Authorization Workflow Case Study",
    kind: "case_study",
    summary:
      "Placeholder proof item for prior authorization workflow improvement. Todd should replace with final case study content.",
    publicUrl: null,
    internalRef: "case-study-library:prior-auth-placeholder",
    domainTags: ["healthcare", "prior-authorization"],
    problemTags: ["denials", "rework", "administrative-cost"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-decision-layer-build-case-study",
    title: "Placeholder Decision Layer Build Case Study",
    kind: "case_study",
    summary:
      "Placeholder proof item for decision-layer build work. Todd should replace with final evidence before outreach use.",
    publicUrl: null,
    internalRef: "case-study-library:decision-layer-placeholder",
    domainTags: ["healthcare", "decision-support", "operations"],
    problemTags: ["manual-decisioning", "poor-traceability"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-executive-alignment-case-study",
    title: "Placeholder Executive Alignment Case Study",
    kind: "case_study",
    summary:
      "Placeholder proof item for executive alignment and operating model clarification.",
    publicUrl: null,
    internalRef: "case-study-library:executive-alignment-placeholder",
    domainTags: ["healthcare", "executive-alignment"],
    problemTags: ["stakeholder-alignment", "decision-delay"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-transformation-recovery-case-study",
    title: "Placeholder Transformation Recovery Case Study",
    kind: "case_study",
    summary:
      "Placeholder proof item for recovering stalled transformation efforts.",
    publicUrl: null,
    internalRef: "case-study-library:transformation-recovery-placeholder",
    domainTags: ["healthcare", "transformation", "recovery"],
    problemTags: ["stalled-initiative", "execution-risk"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-operational-truth-framework",
    title: "Placeholder Operational Truth Framework",
    kind: "assessment_framework",
    summary:
      "Placeholder framework proof for assessing operating reality, handoffs, constraints, and decision quality.",
    publicUrl: null,
    internalRef: "case-study-library:operational-truth-framework-placeholder",
    domainTags: ["healthcare", "operations"],
    problemTags: ["visibility-gap", "unclear-kpis"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-prior-auth-assessment-framework",
    title: "Placeholder Prior Authorization Assessment Framework",
    kind: "assessment_framework",
    summary:
      "Placeholder framework proof for prior authorization assessment and modernization opportunity mapping.",
    publicUrl: null,
    internalRef: "case-study-library:prior-auth-framework-placeholder",
    domainTags: ["healthcare", "prior-authorization"],
    problemTags: ["denials", "rework"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-executive-briefing-framework",
    title: "Placeholder Executive Briefing Framework",
    kind: "assessment_framework",
    summary:
      "Placeholder framework proof for executive briefing, option framing, and next-decision alignment.",
    publicUrl: null,
    internalRef: "case-study-library:executive-briefing-framework-placeholder",
    domainTags: ["healthcare", "executive-briefing"],
    problemTags: ["unclear-options", "decision-delay"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-healthcare-operations-credential",
    title: "Placeholder Healthcare Operations Credential",
    kind: "credential",
    summary:
      "Placeholder credential proof for healthcare operations experience. Todd should replace with approved credential language.",
    publicUrl: null,
    internalRef: "case-study-library:healthcare-operations-credential-placeholder",
    domainTags: ["healthcare", "operations"],
    problemTags: ["domain-expertise"],
    isApprovedForOutreach: false,
  },
  {
    slug: "placeholder-specialist-subcontract-proof",
    title: "Placeholder Specialist Subcontract Proof",
    kind: "case_study",
    summary:
      "Placeholder proof item for specialist subcontract delivery and partner support.",
    publicUrl: null,
    internalRef: "case-study-library:specialist-subcontract-placeholder",
    domainTags: ["healthcare", "subcontract", "specialist-support"],
    problemTags: ["delivery-capacity", "domain-expertise"],
    isApprovedForOutreach: false,
  },
];

export async function seedProofItems(prisma) {
  for (const proofItem of proofSeeds) {
    await prisma.oiProofItem.upsert({
      where: { slug: proofItem.slug },
      update: proofItem,
      create: proofItem,
    });
  }

  const seeded = await prisma.oiProofItem.count({
    where: { slug: { in: proofSeeds.map((proofItem) => proofItem.slug) } },
  });

  return { expected: proofSeeds.length, seeded };
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await seedProofItems(prisma);
    console.log(`Seeded ${result.seeded}/${result.expected} proof item(s).`);
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
