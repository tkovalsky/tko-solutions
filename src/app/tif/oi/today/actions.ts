"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { captureDecision } from "@/lib/opportunity-intelligence/action/decision";
import { canTransition } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { deriveNextAction } from "@/lib/opportunity-intelligence/commercial/next-action";
import { tifDb } from "@/lib/tif/db";

const snoozeSchema = z.object({
  opportunityId: z.string().trim().min(1),
  duration: z.enum(["3d", "1w", "2w"]),
});

const dismissSchema = z.object({
  opportunityId: z.string().trim().min(1),
  decisionReason: z.string().trim().min(1, "Dismiss reason is required."),
  decisionConfidence: z.enum(["low", "medium", "high"]).default("medium"),
  expectedOutcome: z.string().trim().optional(),
});

const completeSchema = z.object({
  opportunityId: z.string().trim().min(1),
  nextActionId: z.string().trim().min(1),
  completedNote: z.string().trim().optional(),
});

export async function snoozeOpportunity(formData: FormData) {
  const parsed = snoozeSchema.parse({
    opportunityId: formData.get("opportunityId"),
    duration: formData.get("duration"),
  });
  const snoozedUntil = addDuration(new Date(), parsed.duration);

  await tifDb.oiNextAction.updateMany({
    where: { opportunityId: parsed.opportunityId, status: "open" },
    data: { status: "snoozed", snoozedUntil },
  });
  revalidateTodayAndWorkbench(parsed.opportunityId);
}

export async function dismissOpportunity(formData: FormData) {
  const parsed = dismissSchema.parse({
    opportunityId: formData.get("opportunityId"),
    decisionReason: formData.get("decisionReason") || formData.get("reason"),
    decisionConfidence: formData.get("decisionConfidence") || "medium",
    expectedOutcome: formData.get("expectedOutcome") || undefined,
  });

  await tifDb.$transaction(async (tx) => {
    const opportunity = await tx.oiOpportunity.findUniqueOrThrow({
      where: { id: parsed.opportunityId },
      select: { type: true, status: true },
    });
    const transition = canTransition({
      type: opportunity.type,
      from: opportunity.status,
      to: "dismissed",
      reason: parsed.decisionReason,
    });
    if (!transition.ok) {
      throw new Error(transition.blockingReason);
    }
    await captureDecision(tx, {
      opportunityId: parsed.opportunityId,
      type: "disqualify_opportunity",
      decision: "dismissed",
      reason: parsed.decisionReason,
      confidence: parsed.decisionConfidence,
      expectedOutcome: parsed.expectedOutcome,
    });
    await tx.oiOpportunity.update({
      where: { id: parsed.opportunityId },
      data: { status: "dismissed", disqualifiedReason: parsed.decisionReason, lastActivityAt: new Date() },
    });
    await tx.oiNextAction.updateMany({
      where: { opportunityId: parsed.opportunityId, status: "open" },
      data: { status: "cancelled" },
    });
    await tx.oiActivity.create({
      data: {
        opportunityId: parsed.opportunityId,
        type: "status_change",
        occurredAt: new Date(),
        summary: "Opportunity dismissed from Today.",
        fromStatus: opportunity.status,
        toStatus: "dismissed",
        reason: parsed.decisionReason,
      },
    });
  });
  revalidateTodayAndWorkbench(parsed.opportunityId);
}

export async function completeNextAction(formData: FormData) {
  const parsed = completeSchema.parse({
    opportunityId: formData.get("opportunityId"),
    nextActionId: formData.get("nextActionId"),
    completedNote: formData.get("completedNote") || undefined,
  });

  await tifDb.$transaction(async (tx) => {
    const completedAt = new Date();
    const opportunity = await tx.oiOpportunity.findUniqueOrThrow({
      where: { id: parsed.opportunityId },
      include: {
        initiative: true,
        researchGaps: true,
        stakeholders: true,
        roleProfile: true,
        currentScore: true,
      },
    });
    const completedAction = await tx.oiNextAction.update({
      where: { id: parsed.nextActionId },
      data: { status: "completed", completedAt, completedNote: parsed.completedNote ?? null },
      select: { type: true, description: true },
    });
    const next = deriveNextAction({
      opportunity: {
        type: opportunity.type,
        status: opportunity.status,
        offerId: opportunity.offerId,
        lastActivityAt: opportunity.lastActivityAt,
      },
      initiative: opportunity.initiative,
      researchGaps: opportunity.researchGaps,
      stakeholders: opportunity.stakeholders,
      roleProfile: opportunity.roleProfile
        ? { isComplete: Boolean(opportunity.roleProfile.compMax && opportunity.roleProfile.reportsToTitle) }
        : null,
      score: opportunity.currentScore,
      rfpProfile: null,
      asOf: completedAt,
    });
    if (next.type !== completedAction.type) {
      await tx.oiNextAction.create({
        data: {
          opportunityId: parsed.opportunityId,
          type: next.type,
          status: "open",
          description: next.description,
          rationale: next.rationale,
          estimatedMinutes: next.estimatedMinutes,
          dueAt: next.dueAt,
        },
      });
    }
    await tx.oiActivity.create({
      data: {
        opportunityId: parsed.opportunityId,
        type: "note",
        occurredAt: completedAt,
        summary: `Completed next action: ${completedAction.description}.`,
        reason: parsed.completedNote,
      },
    });
    await tx.oiOpportunity.update({
      where: { id: parsed.opportunityId },
      data: { lastActivityAt: completedAt },
    });
  });
  revalidateTodayAndWorkbench(parsed.opportunityId);
}

function addDuration(date: Date, duration: "3d" | "1w" | "2w") {
  const days = duration === "3d" ? 3 : duration === "1w" ? 7 : 14;
  return new Date(date.getTime() + days * 86_400_000);
}

function revalidateTodayAndWorkbench(opportunityId: string) {
  revalidatePath("/tif/oi/today");
  revalidatePath(`/tif/oi/opportunities/${opportunityId}`);
}
