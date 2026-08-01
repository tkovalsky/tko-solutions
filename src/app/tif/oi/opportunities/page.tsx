import type { Metadata } from "next";
import Link from "next/link";
import type { OiNextActionStatus, OiOpportunityStatus, OiOpportunityType } from "@prisma/client";
import { isTerminalOpportunityStatus } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "POIS Pipeline",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PipelinePageProps = {
  searchParams: Promise<{
    path?: string;
    state?: string;
    sort?: string;
  }>;
};

type PipelineOpportunity = {
  id: string;
  title: string;
  type: OiOpportunityType;
  status: OiOpportunityStatus;
  organization: { name: string };
  currentScore: {
    priorityEfficiency: unknown;
    fitScore: number;
    evidenceScore: number;
    accessScore: number;
    urgencyScore: number;
  } | null;
  nextActions: Array<{
    id: string;
    status: OiNextActionStatus;
    type: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
  }>;
};

const PATHS: Array<{ label: string; value: OiOpportunityType | "all" }> = [
  { label: "All", value: "all" },
  { label: "FTE", value: "fte" },
  { label: "Consulting", value: "consulting" },
  { label: "Assessment", value: "assessment" },
  { label: "RFP", value: "rfp" },
  { label: "Partnership", value: "partnership" },
];

const STATES = [
  { label: "Active", value: "active" },
  { label: "Needs action", value: "needs_action" },
  { label: "Waiting", value: "waiting" },
  { label: "Stale", value: "stale" },
  { label: "Closed", value: "closed" },
] as const;

export function isStaleNextAction(action: { status: OiNextActionStatus; updatedAt: Date }, asOf: Date) {
  return action.status === "open" && asOf.getTime() - action.updatedAt.getTime() >= 14 * 86_400_000;
}

export function filterPipeline(
  opportunities: PipelineOpportunity[],
  filters: { path: string; state: string; sort: string },
  asOf: Date,
) {
  const filtered = opportunities.filter((opportunity) => {
    const openAction = opportunity.nextActions.find((action) => action.status === "open");
    const pathMatches = filters.path === "all" || opportunity.type === filters.path;
    const stateMatches =
      filters.state === "active"
        ? !isTerminalOpportunityStatus(opportunity.status) && opportunity.status !== "dismissed" && opportunity.status !== "paused"
        : filters.state === "needs_action"
          ? Boolean(openAction)
          : filters.state === "waiting"
            ? opportunity.status === "contacted" || opportunity.status === "nurturing" || opportunity.status === "submitted"
            : filters.state === "stale"
              ? Boolean(openAction && isStaleNextAction(openAction, asOf))
              : filters.state === "closed"
                ? isTerminalOpportunityStatus(opportunity.status)
                : true;
    return pathMatches && stateMatches;
  });

  return [...filtered].sort((left, right) => {
    if (filters.sort === "pe") {
      return scoreNumber(right.currentScore?.priorityEfficiency) - scoreNumber(left.currentScore?.priorityEfficiency);
    }
    return left.organization.name.localeCompare(right.organization.name);
  });
}

export default async function OpportunitiesPipelinePage({ searchParams }: PipelinePageProps) {
  const params = await searchParams;
  const path = PATHS.some((item) => item.value === params.path) ? params.path ?? "all" : "all";
  const state = STATES.some((item) => item.value === params.state) ? params.state ?? "active" : "active";
  const sort = params.sort === "account" ? "account" : "pe";
  const asOf = new Date();

  const opportunities = await tifDb.oiOpportunity.findMany({
    include: {
      organization: { select: { name: true } },
      currentScore: {
        select: {
          priorityEfficiency: true,
          fitScore: true,
          evidenceScore: true,
          accessScore: true,
          urgencyScore: true,
        },
      },
      nextActions: {
        where: { status: "open" },
        orderBy: [{ createdAt: "asc" }],
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  });
  const rows = filterPipeline(opportunities, { path, state, sort }, asOf);
  const stale = opportunities.filter((opportunity) =>
    opportunity.nextActions.some((action) => isStaleNextAction(action, asOf)),
  );
  const noNextAction = opportunities.filter(
    (opportunity) =>
      !isTerminalOpportunityStatus(opportunity.status) &&
      opportunity.status !== "dismissed" &&
      opportunity.status !== "paused" &&
      !opportunity.nextActions.some((action) => action.status === "open"),
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Pipeline</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {opportunities.length} opportunities · {stale.length} stale
          </h2>
        </div>
        <p className="text-sm text-muted">Sorted by {sort === "pe" ? "PE" : "account"}</p>
      </div>

      <div className="mt-6 grid gap-4 rounded-md border border-border bg-white p-4">
        <FilterRow label="Path" items={PATHS} current={path} state={state} sort={sort} param="path" />
        <FilterRow label="State" items={STATES} current={state} path={path} sort={sort} param="state" />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">Sort:</span>
          <FilterLink label="Priority" href={hrefFor({ path, state, sort: "pe" })} active={sort === "pe"} />
          <FilterLink label="Account" href={hrefFor({ path, state, sort: "account" })} active={sort === "account"} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-border bg-white">
        <div className="grid grid-cols-[0.7fr_1fr_1.4fr_0.9fr_1.1fr] gap-3 border-b border-border bg-[#f7f8fb] px-4 py-3 text-xs font-semibold uppercase text-muted">
          <span>PE</span>
          <span>Account</span>
          <span>Opportunity</span>
          <span>Stage</span>
          <span>Next</span>
        </div>
        {rows.length > 0 ? (
          rows.map((opportunity) => {
            const action = opportunity.nextActions[0];
            return (
              <Link
                key={opportunity.id}
                href={`/tif/oi/opportunities/${opportunity.id}`}
                className="grid grid-cols-[0.7fr_1fr_1.4fr_0.9fr_1.1fr] gap-3 border-b border-border px-4 py-3 text-sm hover:bg-[#f7f8fb]"
              >
                <span className="font-semibold">{formatMoney(scoreNumber(opportunity.currentScore?.priorityEfficiency))}</span>
                <span>{opportunity.organization.name}</span>
                <span>{opportunity.title}</span>
                <span>{opportunity.status}</span>
                <span>{action?.description ?? "No next action"}</span>
              </Link>
            );
          })
        ) : (
          <p className="px-4 py-6 text-sm text-muted">No opportunities match these filters.</p>
        )}
      </div>

      <WarningRow label={`${stale.length} stale (no activity 14+ days)`} action="Review all" opportunities={stale} />
      <WarningRow label={`${noNextAction.length} opportunities have no next action`} action="Fix" opportunities={noNextAction} />
    </section>
  );
}

function FilterRow({
  label,
  items,
  current,
  path,
  state,
  sort,
  param,
}: {
  label: string;
  items: ReadonlyArray<{ label: string; value: string }>;
  current: string;
  path?: string;
  state?: string;
  sort: string;
  param: "path" | "state";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-semibold">{label}:</span>
      {items.map((item) => (
        <FilterLink
          key={item.value}
          label={item.label}
          href={hrefFor({ path: param === "path" ? item.value : path ?? "all", state: param === "state" ? item.value : state ?? "active", sort })}
          active={current === item.value}
        />
      ))}
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-md border px-3 py-1.5 ${active ? "border-[#17375e] bg-[#17375e] text-white" : "border-border bg-white"}`}
    >
      {label}
    </Link>
  );
}

function WarningRow({
  label,
  action,
  opportunities,
}: {
  label: string;
  action: string;
  opportunities: PipelineOpportunity[];
}) {
  return (
    <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold">{label}</span>
        <span>{action}</span>
      </div>
      {opportunities.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {opportunities.map((opportunity) => (
            <Link key={opportunity.id} href={`/tif/oi/opportunities/${opportunity.id}`} className="underline">
              {opportunity.organization.name}: {opportunity.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function hrefFor(params: { path: string; state: string; sort: string }) {
  return `/tif/oi/opportunities?path=${params.path}&state=${params.state}&sort=${params.sort}`;
}

function scoreNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  return 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
