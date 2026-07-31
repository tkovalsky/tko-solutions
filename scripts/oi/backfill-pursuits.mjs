import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

export function mapPursuitModeToOpportunityType(mode) {
  return mode === "employment" ? "fte" : "consulting";
}

export function mapPursuitStatusToOpportunityStatus(status) {
  return {
    prospect: "reviewing",
    research_ready: "researching",
    contact_ready: "outreach_ready",
    contacted: "contacted",
    conversation: "conversation",
    paused: "paused",
    closed: "closed",
  }[status] ?? "reviewing";
}

export function deriveAuthorityLevel(budgetAuthority, hiringAuthority) {
  const authority = Math.max(toLevel(budgetAuthority), toLevel(hiringAuthority));
  if (authority >= 3) return "high";
  if (authority === 2) return "medium";
  if (authority === 1) return "low";
  return "none";
}

export function mapEmailProvenance(emailSource) {
  const normalized = String(emailSource ?? "").trim().toLowerCase();
  if (normalized === "verified_deliverable") return "verified_deliverable";
  if (normalized === "directly_provided") return "directly_provided";
  if (normalized === "publicly_listed") return "publicly_listed";
  if (normalized === "provider_discovered") return "provider_discovered";
  return "pattern_inferred";
}

export function migratedOpportunityTitle(personName, mode) {
  return `${personName} - ${mode} pursuit (migrated)`;
}

export async function backfillPursuits(prisma) {
  const pursuits = await prisma.oiPursuit.findMany({
    where: { opportunityId: null },
    include: { person: true },
    orderBy: { createdAt: "asc" },
  });

  for (const pursuit of pursuits) {
    await prisma.$transaction(async (tx) => {
      const existing = await tx.oiPursuit.findUnique({
        where: { id: pursuit.id },
        select: { opportunityId: true },
      });
      if (existing?.opportunityId) return;

      const opportunity = await tx.oiOpportunity.create({
        data: {
          organizationId: pursuit.organizationId,
          type: mapPursuitModeToOpportunityType(pursuit.mode),
          status: mapPursuitStatusToOpportunityStatus(pursuit.status),
          title: migratedOpportunityTitle(pursuit.person.name, pursuit.mode),
          operatorThesis: pursuit.problemHypothesis,
        },
        select: { id: true },
      });

      await tx.oiStakeholder.create({
        data: {
          opportunityId: opportunity.id,
          personId: pursuit.personId,
          role: "unknown",
          authority: deriveAuthorityLevel(
            pursuit.person.budgetAuthority,
            pursuit.person.hiringAuthority,
          ),
          isSelected: true,
          selectedAt: new Date(),
        },
      });

      await tx.oiNextAction.create({
        data: {
          opportunityId: opportunity.id,
          type: "review_stale",
          description: pursuit.nextAction,
          status: "open",
        },
      });

      if (pursuit.professionalEmail) {
        await tx.oiContactPoint.upsert({
          where: {
            personId_type_value: {
              personId: pursuit.personId,
              type: "email",
              value: pursuit.professionalEmail,
            },
          },
          update: {},
          create: {
            personId: pursuit.personId,
            type: "email",
            value: pursuit.professionalEmail,
            provenance: mapEmailProvenance(pursuit.emailSource),
            sourceLabel: pursuit.emailSource,
            verifiedAt: pursuit.emailVerifiedAt,
          },
        });
      }

      await tx.oiPursuit.update({
        where: { id: pursuit.id },
        data: { opportunityId: opportunity.id },
      });
    });
  }

  return { migrated: pursuits.length };
}

function toLevel(value) {
  return Math.max(0, Math.min(3, Math.round(Number(value) || 0)));
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await backfillPursuits(prisma);
    console.log(`Backfilled ${result.migrated} pursuit(s).`);
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
