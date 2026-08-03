import Link from "next/link";
import type { OiNextActionStatus, OiNextActionType, OiOpportunityType } from "@prisma/client";
import DecisionCapture from "@/app/tif/oi/decision-capture";
import { completeNextAction, dismissOpportunity, snoozeOpportunity } from "./actions";

export type TodayCardOpportunity = {
  id: string;
  title: string;
  type: OiOpportunityType;
  organization: { name: string };
  currentScore: {
    fitScore: number;
    evidenceScore: number;
    accessScore: number;
    estimatedValue: number | string | { toNumber(): number } | null;
    conversionProbability: number | null;
    expectedValue: number | string | { toNumber(): number } | null;
    estimatedHours: number | string | { toNumber(): number } | null;
    priorityEfficiency: number | string | { toNumber(): number } | null;
  } | null;
  initiative?: { hypothesis?: string | null } | null;
  nextActions: Array<{
    id: string;
    type: OiNextActionType;
    description: string;
    rationale: string | null;
    estimatedMinutes: number;
    dueAt: Date | null;
    status?: OiNextActionStatus;
    completedAt?: Date | null;
  }>;
};

export const AWAITING_MANUAL_OUTREACH_MESSAGE =
  "Awaiting manual outreach: outreach preparation is manual until M3; send it outside POIS, then log the reply or follow-up when it happens.";

const ANCHORS: Record<OiNextActionType, string> = {
  approve_initiative: "initiative",
  close_research_gap: "gaps",
  identify_stakeholder: "stakeholders",
  select_stakeholder: "stakeholders",
  select_offer: "offer",
  complete_role_profile: "overview",
  prepare_outreach: "outreach",
  review_draft: "outreach",
  send_outreach: "outreach",
  submit_application: "outreach",
  follow_up: "log",
  log_conversation: "log",
  bid_no_bid_decision: "overview",
  find_partner: "stakeholders",
  send_proposal: "outreach",
  review_stale: "overview",
  record_outcome: "log",
};

export default function OpportunityCard({ opportunity, asOf }: { opportunity: TodayCardOpportunity; asOf: Date }) {
  const action = opportunity.nextActions.find((nextAction) => nextAction.status !== "completed") ?? opportunity.nextActions[0];
  const awaitingManualOutreach = isAwaitingManualOutreach(opportunity);
  const score = opportunity.currentScore;
  const workbenchHref = `/tif/oi/opportunities/${opportunity.id}`;
  const startHref = `${workbenchHref}#${action ? ANCHORS[action.type] : "overview"}`;
  const overdue = action?.dueAt && action.dueAt.getTime() < asOf.getTime();

  return (
    <article className="rounded-md border border-border bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">
            {opportunity.type} · {formatMoney(scoreNumber(score?.priorityEfficiency))}/hr
          </p>
          <h3 className="mt-1 text-lg font-semibold">{opportunity.organization.name}</h3>
          <p className="text-sm">{opportunity.title}</p>
        </div>
        {overdue ? <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-950">Overdue</span> : null}
      </div>

      <p className="mt-4 text-sm text-muted">
        Why now: {opportunity.initiative?.hypothesis ?? action?.rationale ?? "Needs operator attention."} Fit {score?.fitScore ?? 0} · Evidence{" "}
        {score?.evidenceScore ?? 0} · Access {score?.accessScore ?? 0}.
      </p>
      <p className="mt-3 text-sm">
        Value {formatMoney(scoreNumber(score?.estimatedValue))} · {score?.conversionProbability ?? 0}% · EV{" "}
        {formatMoney(scoreNumber(score?.expectedValue))} · {scoreNumber(score?.estimatedHours).toFixed(1)} hrs remaining
      </p>
      <p className="mt-3 text-sm font-semibold">
        Next: {awaitingManualOutreach ? AWAITING_MANUAL_OUTREACH_MESSAGE : action?.description ?? "No open next action"}{" "}
        {action && !awaitingManualOutreach ? `${action.estimatedMinutes}min` : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-start gap-2 text-sm">
        <Link href={startHref} className="rounded-md bg-[#17375e] px-3 py-2 font-semibold text-white">
          Start
        </Link>
        <Link href={workbenchHref} className="rounded-md border border-border px-3 py-2 font-semibold">
          Open workbench
        </Link>
        {action && !awaitingManualOutreach ? (
          <form action={completeNextAction}>
            <input type="hidden" name="opportunityId" value={opportunity.id} />
            <input type="hidden" name="nextActionId" value={action.id} />
            <button className="rounded-md border border-border px-3 py-2 font-semibold">Complete</button>
          </form>
        ) : null}
        <form action={snoozeOpportunity} className="flex gap-1">
          <input type="hidden" name="opportunityId" value={opportunity.id} />
          <button name="duration" value="3d" className="rounded-md border border-border px-3 py-2 font-semibold">Snooze 3d</button>
          <button name="duration" value="1w" className="rounded-md border border-border px-3 py-2 font-semibold">1w</button>
          <button name="duration" value="2w" className="rounded-md border border-border px-3 py-2 font-semibold">2w</button>
        </form>
        <details className="min-w-56">
          <summary className="cursor-pointer rounded-md border border-border px-3 py-2 font-semibold">Dismiss</summary>
          <div className="mt-2">
            <DecisionCapture
              action={dismissOpportunity}
              opportunityId={opportunity.id}
              type="disqualify_opportunity"
              decision="dismissed"
              label="Dismiss"
              currentScore={opportunity.currentScore}
            />
          </div>
        </details>
      </div>
    </article>
  );
}

export function isAwaitingManualOutreach(opportunity: Pick<TodayCardOpportunity, "nextActions">) {
  const hasOpenAction = opportunity.nextActions.some((action) => action.status === "open");
  const latestCompletedAction = opportunity.nextActions.find((action) => action.status === "completed");
  return !hasOpenAction && latestCompletedAction?.type === "prepare_outreach";
}

function scoreNumber(value?: number | string | { toNumber(): number } | null) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) return value.toNumber();
  return 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
