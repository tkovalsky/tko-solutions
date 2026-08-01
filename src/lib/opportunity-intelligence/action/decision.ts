import type { OiDecisionConfidence, OiDecisionType, Prisma } from "@prisma/client";

export type DecisionCaptureInput = {
  opportunityId: string;
  type: OiDecisionType;
  decision: string;
  reason: string;
  confidence: OiDecisionConfidence;
  expectedOutcome?: string | null;
};

export type DecisionCaptureClient = {
  oiOpportunity: {
    findUniqueOrThrow(args: {
      where: { id: string };
      include: { currentScore: true };
    }): Promise<{
      id: string;
      currentScore: {
        id: string;
        expectedValue: number | Prisma.Decimal | null;
        estimatedHours: number | Prisma.Decimal | null;
        conversionProbability: number | null;
      } | null;
    }>;
  };
  oiDecision: {
    create(args: { data: Prisma.OiDecisionUncheckedCreateInput }): Promise<unknown>;
  };
};

export async function captureDecision(client: DecisionCaptureClient, input: DecisionCaptureInput) {
  const reason = input.reason.trim();
  if (!reason) throw new Error("Decision reason is required.");

  const opportunity = await client.oiOpportunity.findUniqueOrThrow({
    where: { id: input.opportunityId },
    include: { currentScore: true },
  });
  const score = opportunity.currentScore;

  return client.oiDecision.create({
    data: {
      opportunityId: input.opportunityId,
      type: input.type,
      decision: input.decision,
      reason,
      confidence: input.confidence,
      expectedOutcome: input.expectedOutcome?.trim() || null,
      scoreIdAtDecision: score?.id ?? null,
      expectedValue: score ? numeric(score.expectedValue) : null,
      expectedEffortHours: score?.estimatedHours ?? null,
      expectedProbability: score?.conversionProbability ?? null,
    },
  });
}

function numeric(value: number | Prisma.Decimal | null) {
  if (typeof value === "number") return value;
  return value ? value.toNumber() : null;
}
