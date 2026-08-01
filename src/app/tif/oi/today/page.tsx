import type { Metadata } from "next";
import Link from "next/link";
import OpportunityCard from "./opportunity-card";
import { buildPipelineSummary } from "@/lib/opportunity-intelligence/reporting/pipeline-summary";
import { buildRecentChanges } from "@/lib/opportunity-intelligence/queue/changes";
import { buildTodayQueue } from "@/lib/opportunity-intelligence/queue/today";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "POIS Today",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OiTodayPage() {
  const asOf = new Date();
  const [opportunities, recentActivities] = await Promise.all([
    tifDb.oiOpportunity.findMany({
      include: {
        organization: { select: { name: true } },
        initiative: { select: { confidence: true, hypothesis: true } },
        currentScore: true,
        nextActions: {
          where: { status: { in: ["open", "snoozed", "completed"] } },
          orderBy: [{ status: "asc" }, { dueAt: "asc" }, { completedAt: "desc" }, { createdAt: "asc" }],
        },
      },
      orderBy: [{ updatedAt: "desc" }],
    }),
    tifDb.oiActivity.findMany({
      where: { occurredAt: { gte: new Date(asOf.getTime() - 48 * 60 * 60 * 1000) } },
      include: { opportunity: { include: { organization: { select: { name: true } } } } },
      orderBy: [{ occurredAt: "desc" }],
      take: 12,
    }),
  ]);
  const restoredActionIds = opportunities.flatMap((opportunity) =>
    opportunity.nextActions
      .filter((action) => action.status === "snoozed" && action.snoozedUntil && action.snoozedUntil.getTime() <= asOf.getTime())
      .map((action) => action.id),
  );
  if (restoredActionIds.length > 0) {
    await tifDb.oiNextAction.updateMany({
      where: { id: { in: restoredActionIds }, status: "snoozed" },
      data: { status: "open", snoozedUntil: null },
    });
  }
  const queueInput = opportunities.map((opportunity) => ({
    ...opportunity,
    nextActions: opportunity.nextActions.map((action) =>
      restoredActionIds.includes(action.id) ? { ...action, status: "open" as const, snoozedUntil: null } : action,
    ),
  }));
  const queue = buildTodayQueue(queueInput, asOf);
  const summary = buildPipelineSummary(queueInput);
  const changes = buildRecentChanges(
    recentActivities.map((activity) => ({
      id: activity.id,
      changedAt: activity.occurredAt,
      direction: activity.type === "status_change" ? "neutral" : "up",
      label: `${activity.opportunity.organization.name}: ${activity.summary}`,
      href: `/tif/oi/opportunities/${activity.opportunityId}#log`,
    })),
    asOf,
  );
  const overdueCount = queue.filter((opportunity) =>
    opportunity.nextActions.some((action) => action.dueAt && action.dueAt.getTime() < asOf.getTime()),
  ).length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <header className="rounded-md border border-border bg-white p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Today · {formatDate(asOf)}</p>
            <h2 className="mt-1 text-2xl font-semibold">Oct 1 · {daysUntilOct1(asOf)} days</h2>
          </div>
          <p className="text-sm font-semibold">{Math.round(summary.incomeReplacement * 100)}% of $300K target</p>
        </div>
        <p className="mt-4 text-sm">
          Pipeline: {formatMoney(summary.expectedValueTotal)} expected · {Math.round(summary.incomeReplacement * 100)}% of $300K target ·{" "}
          {summary.livePathCount} paths live
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded bg-[#e6e8ee]">
          <div className="h-full bg-[#17375e]" style={{ width: `${Math.min(100, Math.round(summary.incomeReplacement * 100))}%` }} />
        </div>
      </header>

      {queue.length === 0 ? (
        <EmptyState activeCount={opportunities.length} summary={summary} />
      ) : (
        <div className="mt-6 grid gap-4">
          {overdueCount > 0 ? <h3 className="text-sm font-semibold uppercase text-amber-950">Overdue ({overdueCount})</h3> : null}
          {queue.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} asOf={asOf} />
          ))}
        </div>
      )}

      <section className="mt-8 rounded-md border border-border bg-white p-5">
        <h3 className="text-lg font-semibold">What changed</h3>
        {changes.length > 0 ? (
          <ul className="mt-3 grid gap-2 text-sm">
            {changes.map((change) => (
              <li key={change.id}>
                {change.href ? <Link href={change.href} className="underline">{change.label}</Link> : change.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">No material changes in the last 48 hours.</p>
        )}
      </section>
    </section>
  );
}

function EmptyState({
  activeCount,
  summary,
}: {
  activeCount: number;
  summary: ReturnType<typeof buildPipelineSummary>;
}) {
  return (
    <section className="mt-6 rounded-md border border-border bg-white p-8 text-center">
      <h3 className="text-xl font-semibold">Nothing queued.</h3>
      <p className="mt-4 text-sm text-muted">
        Your pipeline has {activeCount} active opportunities, all waiting on external replies.
      </p>
      <p className="mt-4 font-semibold">Best use of the next 20 minutes:</p>
      <p className="mt-2">
        Add a source. Paste a job posting, article, or RFP.{" "}
        <Link href="/tif/oi/intake" className="font-semibold underline">Go to intake</Link>
      </p>
      <p className="mt-4 text-sm text-muted">
        Pipeline: {formatMoney(summary.expectedValueTotal)} expected · {Math.round(summary.incomeReplacement * 100)}% of target · below the pace for Oct 1.
      </p>
    </section>
  );
}

function daysUntilOct1(asOf: Date) {
  const target = new Date(Date.UTC(asOf.getUTCFullYear(), 9, 1));
  return Math.max(0, Math.ceil((target.getTime() - asOf.getTime()) / 86_400_000));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
