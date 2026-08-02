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

type NewSignal = Awaited<ReturnType<typeof getTopUntriagedSignals>>[number];
type WatchedAccount = Awaited<ReturnType<typeof getWatchedAccounts>>[number];

export default async function OiTodayPage() {
  const asOf = new Date();
  const [opportunities, recentActivities, untriagedSignalCount, topUntriagedSignals, watchedAccounts] = await Promise.all([
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
    tifDb.oiSignal.count({
      where: {
        status: { in: ["captured", "classified"] },
        tier: { in: ["tier_1", "tier_2"] },
      },
    }),
    getTopUntriagedSignals(),
    getWatchedAccounts(),
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

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <NewSignalsBlock count={untriagedSignalCount} signals={topUntriagedSignals} asOf={asOf} />
        <WatchBlock accounts={watchedAccounts} asOf={asOf} />
      </div>

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

async function getTopUntriagedSignals() {
  return tifDb.oiSignal.findMany({
    where: {
      status: { in: ["captured", "classified"] },
      tier: { in: ["tier_1", "tier_2"] },
    },
    include: {
      organization: { select: { name: true } },
    },
    orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  });
}

async function getWatchedAccounts() {
  return tifDb.oiOrganization.findMany({
    where: { isWatched: true },
    select: {
      id: true,
      name: true,
      updatedAt: true,
      signals: {
        where: { status: "watched" },
        select: { updatedAt: true },
        orderBy: [{ updatedAt: "asc" }],
        take: 1,
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}

function NewSignalsBlock({ count, signals, asOf }: { count: number; signals: NewSignal[]; asOf: Date }) {
  return (
    <section className="rounded-md border border-border bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">New signals</p>
          <h3 className="mt-1 text-lg font-semibold">{count} untriaged</h3>
        </div>
        <Link href="/tif/oi/intake" className="text-sm font-semibold text-[#17375e] underline">
          Go to intake →
        </Link>
      </div>
      {signals.length > 0 ? (
        <ul className="mt-4 grid gap-3 text-sm">
          {signals.map((signal) => (
            <li key={signal.id} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {tierDisplay(signal.tier)} · {signal.organization.name} · {formatAge(signal.occurredAt ?? signal.createdAt, asOf)}
              </p>
              <p className="mt-1 font-medium">{signal.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">No Tier 1 or Tier 2 signals are waiting for triage.</p>
      )}
    </section>
  );
}

function WatchBlock({ accounts, asOf }: { accounts: WatchedAccount[]; asOf: Date }) {
  return (
    <section className="rounded-md border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Watch</p>
      <h3 className="mt-1 text-lg font-semibold">{accounts.length} watched accounts</h3>
      {accounts.length > 0 ? (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#17375e]">expand</summary>
          <ul className="mt-3 grid gap-2 text-sm">
            {accounts.map((account) => {
              const watchedSince = account.signals[0]?.updatedAt ?? account.updatedAt;
              return (
                <li key={account.id} className="flex items-center justify-between gap-4 border-t border-border pt-2 first:border-t-0 first:pt-0">
                  <span className="font-medium">{account.name}</span>
                  <span className="text-muted">{formatDaysWatched(watchedSince, asOf)}</span>
                </li>
              );
            })}
          </ul>
        </details>
      ) : (
        <p className="mt-4 text-sm text-muted">No accounts are being watched.</p>
      )}
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

function formatAge(date: Date | null, asOf: Date) {
  if (!date) return "age unknown";
  const elapsedMs = asOf.getTime() - date.getTime();
  if (elapsedMs < 60 * 60 * 1000) return "less than 1h old";
  if (elapsedMs < 24 * 60 * 60 * 1000) return `${Math.floor(elapsedMs / (60 * 60 * 1000))}h old`;
  return `${Math.floor(elapsedMs / 86_400_000)}d old`;
}

function formatDaysWatched(date: Date, asOf: Date) {
  const days = Math.max(0, Math.floor((asOf.getTime() - date.getTime()) / 86_400_000));
  return days === 1 ? "1 day watched" : `${days} days watched`;
}

function tierDisplay(tier: string) {
  return tier.replace("tier_", "Tier ");
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
