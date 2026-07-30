"use server";

import {
  OiOrganizationKind,
  OiPursuitMode,
  OiPursuitStatus,
  OiSeniority,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  OI_STARTER_PEOPLE,
  countLookalikeOverlap,
  scoreOpportunity,
  uniqueTags,
  type OiOrganizationKind as OiOrganizationKindValue,
  type OiPursuitMode as OiPursuitModeValue,
  type OiSeniority as OiSeniorityValue,
} from "@/lib/oi";
import { tifDb } from "@/lib/tif/db";

const OI_PATH = "/tif/opportunities";

export async function bootstrapOpportunityIntelligence() {
  const anchorTags = uniqueTags(
    OI_STARTER_PEOPLE.filter((person) => person.isLookalikeAnchor).flatMap(
      (person) => person.domainTags,
    ),
  );

  for (const starter of OI_STARTER_PEOPLE) {
    const organization = await tifDb.oiOrganization.upsert({
      where: { name: starter.organization.name },
      create: {
        name: starter.organization.name,
        website: starter.organization.website,
        kind: starter.organization.kind as OiOrganizationKind,
      },
      update: {},
    });

    const person = await tifDb.oiPerson.upsert({
      where: {
        organizationId_name_title: {
          organizationId: organization.id,
          name: starter.name,
          title: starter.title,
        },
      },
      create: {
        name: starter.name,
        title: starter.title,
        seniority: starter.seniority as OiSeniority,
        sourceUrl: starter.sourceUrl,
        sourceLabel: starter.sourceLabel,
        sourcePublishedAt: starter.sourcePublishedAt
          ? new Date(`${starter.sourcePublishedAt}T00:00:00.000Z`)
          : undefined,
        sourceConfidence: starter.sourceConfidence,
        isLookalikeAnchor: starter.isLookalikeAnchor,
        domainTags: starter.domainTags,
        budgetAuthority: starter.budgetAuthority,
        hiringAuthority: starter.hiringAuthority,
        transformationRelevance: starter.transformationRelevance,
        relationshipStrength: starter.relationshipStrength,
        notes: starter.notes,
        organizationId: organization.id,
      },
      update: {
        seniority: starter.seniority as OiSeniority,
        sourceUrl: starter.sourceUrl,
        sourceLabel: starter.sourceLabel,
        sourcePublishedAt: starter.sourcePublishedAt
          ? new Date(`${starter.sourcePublishedAt}T00:00:00.000Z`)
          : undefined,
        sourceConfidence: starter.sourceConfidence,
        isLookalikeAnchor: starter.isLookalikeAnchor,
        domainTags: starter.domainTags,
        budgetAuthority: starter.budgetAuthority,
        hiringAuthority: starter.hiringAuthority,
        transformationRelevance: starter.transformationRelevance,
        relationshipStrength: starter.relationshipStrength,
        notes: starter.notes,
      },
    });

    if (!starter.pursuit) continue;

    const score = scoreOpportunity({
      seniority: starter.seniority,
      organizationKind: starter.organization.kind,
      mode: starter.pursuit.mode,
      targetMonthlyValue: starter.pursuit.targetMonthlyValue,
      budgetAuthority: starter.budgetAuthority,
      hiringAuthority: starter.hiringAuthority,
      transformationRelevance: starter.transformationRelevance,
      relationshipStrength: starter.relationshipStrength,
      sourceConfidence: starter.sourceConfidence,
      sourcePublishedAt: starter.sourcePublishedAt
        ? new Date(`${starter.sourcePublishedAt}T00:00:00.000Z`)
        : undefined,
      domainTags: starter.domainTags,
      lookalikeOverlapCount: countLookalikeOverlap(starter.domainTags, anchorTags),
    });

    await tifDb.oiPursuit.upsert({
      where: {
        personId_mode: {
          personId: person.id,
          mode: starter.pursuit.mode as OiPursuitMode,
        },
      },
      create: {
        personId: person.id,
        organizationId: organization.id,
        mode: starter.pursuit.mode as OiPursuitMode,
        status: score.readiness as OiPursuitStatus,
        targetMonthlyValue: starter.pursuit.targetMonthlyValue,
        problemHypothesis: starter.pursuit.problemHypothesis,
        fitHypothesis: starter.pursuit.fitHypothesis,
        evidenceSummary: starter.pursuit.evidenceSummary,
        nextAction: score.nextAction,
        score: score.score,
        scoreBreakdown: toJson(score),
        scorePolicyVersion: score.policyVersion,
      },
      update: {
        status: score.readiness as OiPursuitStatus,
        targetMonthlyValue: starter.pursuit.targetMonthlyValue,
        problemHypothesis: starter.pursuit.problemHypothesis,
        fitHypothesis: starter.pursuit.fitHypothesis,
        evidenceSummary: starter.pursuit.evidenceSummary,
        nextAction: score.nextAction,
        score: score.score,
        scoreBreakdown: toJson(score),
        scorePolicyVersion: score.policyVersion,
        scoredAt: new Date(),
      },
    });
  }

  revalidatePath(OI_PATH);
}

export async function createOpportunityCandidate(formData: FormData) {
  const organizationName = requiredString(formData, "organizationName");
  const organizationKind = enumValue(
    OiOrganizationKind,
    requiredString(formData, "organizationKind"),
    "organization kind",
  );
  const name = requiredString(formData, "name");
  const title = requiredString(formData, "title");
  const seniority = enumValue(
    OiSeniority,
    requiredString(formData, "seniority"),
    "seniority",
  );
  const mode = enumValue(OiPursuitMode, requiredString(formData, "mode"), "pursuit mode");
  const domainTags = uniqueTags(splitTags(requiredString(formData, "domainTags")));
  const sourcePublishedAt = optionalDate(formData, "sourcePublishedAt");
  const targetMonthlyValue = integerValue(formData, "targetMonthlyValue", 20_000);
  const budgetAuthority = levelValue(formData, "budgetAuthority");
  const hiringAuthority = levelValue(formData, "hiringAuthority");
  const transformationRelevance = levelValue(formData, "transformationRelevance");
  const relationshipStrength = levelValue(formData, "relationshipStrength");
  const sourceConfidence = levelValue(formData, "sourceConfidence");
  const anchorTags = await getAnchorTags();

  const score = scoreOpportunity({
    seniority: seniority as OiSeniorityValue,
    organizationKind: organizationKind as OiOrganizationKindValue,
    mode: mode as OiPursuitModeValue,
    targetMonthlyValue,
    budgetAuthority,
    hiringAuthority,
    transformationRelevance,
    relationshipStrength,
    sourceConfidence,
    sourcePublishedAt,
    domainTags,
    lookalikeOverlapCount: countLookalikeOverlap(domainTags, anchorTags),
  });

  const organization = await tifDb.oiOrganization.upsert({
    where: { name: organizationName },
    create: {
      name: organizationName,
      website: optionalString(formData, "organizationWebsite"),
      kind: organizationKind,
    },
    update: {
      website: optionalString(formData, "organizationWebsite"),
      kind: organizationKind,
    },
  });

  const person = await tifDb.oiPerson.upsert({
    where: {
      organizationId_name_title: {
        organizationId: organization.id,
        name,
        title,
      },
    },
    create: {
      name,
      title,
      seniority,
      publicProfileUrl: optionalString(formData, "publicProfileUrl"),
      sourceUrl: optionalString(formData, "sourceUrl"),
      sourceLabel: optionalString(formData, "sourceLabel"),
      sourcePublishedAt,
      sourceConfidence,
      domainTags,
      budgetAuthority,
      hiringAuthority,
      transformationRelevance,
      relationshipStrength,
      notes: optionalString(formData, "notes"),
      organizationId: organization.id,
    },
    update: {
      seniority,
      publicProfileUrl: optionalString(formData, "publicProfileUrl"),
      sourceUrl: optionalString(formData, "sourceUrl"),
      sourceLabel: optionalString(formData, "sourceLabel"),
      sourcePublishedAt,
      sourceConfidence,
      domainTags,
      budgetAuthority,
      hiringAuthority,
      transformationRelevance,
      relationshipStrength,
      notes: optionalString(formData, "notes"),
    },
  });

  await tifDb.oiPursuit.upsert({
    where: { personId_mode: { personId: person.id, mode } },
    create: {
      personId: person.id,
      organizationId: organization.id,
      mode,
      status: score.readiness as OiPursuitStatus,
      targetMonthlyValue,
      problemHypothesis: requiredString(formData, "problemHypothesis"),
      fitHypothesis: requiredString(formData, "fitHypothesis"),
      evidenceSummary: requiredString(formData, "evidenceSummary"),
      nextAction: score.nextAction,
      score: score.score,
      scoreBreakdown: toJson(score),
      scorePolicyVersion: score.policyVersion,
    },
    update: {
      organizationId: organization.id,
      status: score.readiness as OiPursuitStatus,
      targetMonthlyValue,
      problemHypothesis: requiredString(formData, "problemHypothesis"),
      fitHypothesis: requiredString(formData, "fitHypothesis"),
      evidenceSummary: requiredString(formData, "evidenceSummary"),
      nextAction: score.nextAction,
      score: score.score,
      scoreBreakdown: toJson(score),
      scorePolicyVersion: score.policyVersion,
      scoredAt: new Date(),
    },
  });

  revalidatePath(OI_PATH);
}

export async function updatePursuitStatus(formData: FormData) {
  const pursuitId = requiredString(formData, "pursuitId");
  const status = enumValue(
    OiPursuitStatus,
    requiredString(formData, "status"),
    "pursuit status",
  );
  const now = new Date();

  await tifDb.oiPursuit.update({
    where: { id: pursuitId },
    data: {
      status,
      ...(status === OiPursuitStatus.contacted
        ? {
            lastContactedAt: now,
            nextFollowUpAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          }
        : {}),
    },
  });

  revalidatePath(OI_PATH);
}

export async function saveProfessionalContactPath(formData: FormData) {
  const pursuitId = requiredString(formData, "pursuitId");
  const professionalEmail = requiredString(formData, "professionalEmail").toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(professionalEmail)) {
    throw new Error("Enter a valid professional email");
  }

  await tifDb.oiPursuit.update({
    where: { id: pursuitId },
    data: {
      professionalEmail,
      emailSource: requiredString(formData, "emailSource"),
      emailVerifiedAt: formData.get("emailVerified") === "true" ? new Date() : null,
    },
  });

  revalidatePath(OI_PATH);
}

async function getAnchorTags() {
  const anchors = await tifDb.oiPerson.findMany({
    where: { isLookalikeAnchor: true },
    select: { domainTags: true },
  });

  if (anchors.length > 0) {
    return uniqueTags(anchors.flatMap((anchor) => anchor.domainTags));
  }

  return uniqueTags(
    OI_STARTER_PEOPLE.filter((person) => person.isLookalikeAnchor).flatMap(
      (person) => person.domainTags,
    ),
  );
}

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing ${key}`);
  }
  return value.trim();
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function integerValue(formData: FormData, key: string, fallback: number) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) && value >= 0 ? Math.round(value) : fallback;
}

function levelValue(formData: FormData, key: string) {
  return Math.max(0, Math.min(3, integerValue(formData, key, 0)));
}

function optionalDate(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  return value ? new Date(`${value}T00:00:00.000Z`) : undefined;
}

function splitTags(value: string) {
  return value.split(/[\n,]/);
}

function enumValue<T extends Record<string, string>>(
  values: T,
  value: string,
  label: string,
): T[keyof T] {
  if (!Object.values(values).includes(value)) {
    throw new Error(`Invalid ${label}`);
  }
  return value as T[keyof T];
}
