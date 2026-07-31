import type { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { OpportunityFactForScoring } from "../contracts";
import { extractOpportunity, verifyEvidenceOffsets } from "./extract";
import { scoreOpportunityFit } from "../commercial/score/fit";
import { planResearchGapReconciliation } from "../intelligence/research-gaps";
import {
  canonicalizeSourceUrl,
  hashSourceContent,
  normalizeSourceContent,
} from "./normalize";

type OiOrganizationKind = "payer" | "health_tech" | "health_system" | "consulting" | "other";
type OiSourceType =
  | "pasted_text"
  | "job_posting"
  | "company_announcement"
  | "referral"
  | "regulatory_event"
  | "other";

export type PastedOpportunityInput = {
  organization: {
    name: string;
    website?: string | null;
    kind?: OiOrganizationKind;
  };
  title: string;
  rawContent: string;
  sourceType?: OiSourceType;
  canonicalUrl?: string | null;
  retrievedAt?: Date;
  publishedAt?: Date | null;
};

export type OpportunityIngestionResult = {
  created: boolean;
  duplicate: boolean;
  sourceId: string;
  opportunityId: string;
  scoreId: string | null;
};

type TransactionClient = Prisma.TransactionClient;

async function rebuildFromSource(
  tx: TransactionClient,
  opportunity: {
    id: string;
    operatorThesis: string | null;
  },
  source: {
    id: string;
    rawContent: string;
  },
) {
  const extraction = extractOpportunity(source.rawContent);
  for (const fact of extraction.facts) {
    if (!verifyEvidenceOffsets(source.rawContent, fact)) {
      throw new Error(
        `Evidence offsets do not match raw source content for ${fact.field} at ${fact.startOffset}:${fact.endOffset}.`,
      );
    }
  }

  // Operator facts are authoritative and survive deterministic reruns.
  await tx.oiOpportunityFact.deleteMany({
    where: {
      opportunityId: opportunity.id,
      isOperatorOverride: false,
    },
  });
  await tx.oiEvidence.deleteMany({
    where: {
      opportunityId: opportunity.id,
      facts: { none: {} },
    },
  });

  const evidenceIds = new Map<string, string>();
  for (const fact of extraction.facts) {
    const evidenceKey = `${fact.startOffset}:${fact.endOffset}`;
    let evidenceId = evidenceIds.get(evidenceKey);
    if (!evidenceId) {
      const evidence = await tx.oiEvidence.upsert({
        where: {
          sourceId_startOffset_endOffset: {
            sourceId: source.id,
            startOffset: fact.startOffset,
            endOffset: fact.endOffset,
          },
        },
        update: {},
        create: {
          sourceId: source.id,
          opportunityId: opportunity.id,
          startOffset: fact.startOffset,
          endOffset: fact.endOffset,
          excerpt: fact.excerpt,
        },
      });
      evidenceId = evidence.id;
      evidenceIds.set(evidenceKey, evidenceId);
    }

    await tx.oiOpportunityFact.create({
      data: {
        opportunityId: opportunity.id,
        evidenceId,
        field: fact.field,
        value: fact.value,
        normalizedValue: fact.normalizedValue,
        ordinal: fact.ordinal,
        basis: fact.basis,
        confidence: fact.confidence,
        isOperatorOverride: false,
      },
    });
  }

  const existingGaps = await tx.oiResearchGap.findMany({
    where: { opportunityId: opportunity.id },
    select: { id: true, gapKey: true, status: true },
  });
  const candidates = opportunity.operatorThesis?.trim()
    ? extraction.researchGaps.filter((gap) => gap.gapKey !== "opportunity_thesis_missing")
    : extraction.researchGaps;
  const gapPlan = planResearchGapReconciliation(existingGaps, candidates);

  if (gapPlan.create.length > 0) {
    await tx.oiResearchGap.createMany({
      data: gapPlan.create.map((gap) => ({
        opportunityId: opportunity.id,
        gapKey: gap.gapKey,
        question: gap.question,
        reason: gap.reason,
      })),
    });
  }
  if (gapPlan.autoResolveIds.length > 0) {
    await tx.oiResearchGap.updateMany({
      where: { id: { in: gapPlan.autoResolveIds } },
      data: {
        status: "resolved",
        resolution: "Resolved by newly extracted source evidence.",
        resolvedAt: new Date(),
      },
    });
  }

  const persistedFacts = await tx.oiOpportunityFact.findMany({
    where: { opportunityId: opportunity.id },
    select: {
      field: true,
      value: true,
      normalizedValue: true,
      basis: true,
      confidence: true,
      isOperatorOverride: true,
    },
  });
  const score = scoreOpportunityFit({
    facts: persistedFacts as OpportunityFactForScoring[],
    operatorThesis: opportunity.operatorThesis,
  });
  const scoreSnapshot = await tx.oiScore.create({
    data: {
      opportunityId: opportunity.id,
      total: score.total,
      completeness: score.completeness,
      components: score.components,
      inputSnapshot: score.inputSnapshot,
      scorePolicyVersion: score.scorePolicyVersion,
      capabilityProfileVersion: score.capabilityProfileVersion,
      fitScore: 0,
      evidenceScore: 0,
      accessScore: 0,
      urgencyScore: 0,
    },
  });

  await tx.oiOpportunity.update({
    where: { id: opportunity.id },
    data: { currentScoreId: scoreSnapshot.id },
  });

  return scoreSnapshot;
}

export async function ingestPastedOpportunity(
  input: PastedOpportunityInput,
  db: PrismaClient = prisma,
): Promise<OpportunityIngestionResult> {
  const organizationName = input.organization.name.trim();
  const title = input.title.trim();
  if (!organizationName) {
    throw new Error("Organization name is required.");
  }
  if (!title) {
    throw new Error("Opportunity title is required.");
  }
  if (!input.rawContent.trim()) {
    throw new Error("Raw source content is required.");
  }

  const normalizedContent = normalizeSourceContent(input.rawContent);
  const contentHash = hashSourceContent(normalizedContent);
  const canonicalUrl = canonicalizeSourceUrl(input.canonicalUrl);

  return db.$transaction(async (tx) => {
    const organization = await tx.oiOrganization.upsert({
      where: { name: organizationName },
      update: {
        ...(input.organization.website ? { website: input.organization.website } : {}),
      },
      create: {
        name: organizationName,
        website: input.organization.website,
        kind: input.organization.kind ?? "other",
      },
    });

    const duplicateConditions: Prisma.OiSourceWhereInput[] = [
      {
        organizationId: organization.id,
        contentHash,
      },
    ];
    if (canonicalUrl) {
      duplicateConditions.push({ canonicalUrl, contentHash });
    }

    const duplicate = await tx.oiSource.findFirst({
      where: { OR: duplicateConditions },
      select: {
        id: true,
        opportunityId: true,
        opportunity: { select: { currentScoreId: true } },
      },
    });
    if (duplicate) {
      if (!duplicate.opportunityId || !duplicate.opportunity) {
        throw new Error("Duplicate source is not linked to an opportunity.");
      }
      return {
        created: false,
        duplicate: true,
        sourceId: duplicate.id,
        opportunityId: duplicate.opportunityId,
        scoreId: duplicate.opportunity.currentScoreId,
      };
    }

    const priorSnapshot = canonicalUrl
      ? await tx.oiSource.findFirst({
          where: {
            organizationId: organization.id,
            canonicalUrl,
          },
          orderBy: { retrievedAt: "desc" },
          select: { opportunityId: true },
        })
      : null;

    const opportunity = priorSnapshot?.opportunityId
      ? await tx.oiOpportunity.findUniqueOrThrow({
          where: { id: priorSnapshot.opportunityId },
          select: { id: true, operatorThesis: true },
        })
      : await tx.oiOpportunity.create({
          data: {
            organizationId: organization.id,
            title,
            type: "consulting",
          },
          select: { id: true, operatorThesis: true },
        });

    const source = await tx.oiSource.create({
      data: {
        organizationId: organization.id,
        opportunityId: opportunity.id,
        sourceType: input.sourceType ?? "pasted_text",
        canonicalUrl,
        rawContent: input.rawContent,
        normalizedContent,
        contentHash,
        retrievedAt: input.retrievedAt ?? new Date(),
        publishedAt: input.publishedAt,
      },
      select: { id: true, rawContent: true },
    });
    const score = await rebuildFromSource(tx, opportunity, source);

    return {
      created: true,
      duplicate: false,
      sourceId: source.id,
      opportunityId: opportunity.id,
      scoreId: score.id,
    };
  });
}

export async function rerunOpportunityExtraction(
  opportunityId: string,
  db: PrismaClient = prisma,
): Promise<{ opportunityId: string; sourceId: string; scoreId: string }> {
  return db.$transaction(async (tx) => {
    const opportunity = await tx.oiOpportunity.findUniqueOrThrow({
      where: { id: opportunityId },
      select: { id: true, operatorThesis: true },
    });
    const source = await tx.oiSource.findFirstOrThrow({
      where: { opportunityId },
      orderBy: [{ retrievedAt: "desc" }, { createdAt: "desc" }],
      select: { id: true, rawContent: true },
    });
    const score = await rebuildFromSource(tx, opportunity, source);

    return {
      opportunityId,
      sourceId: source.id,
      scoreId: score.id,
    };
  });
}
