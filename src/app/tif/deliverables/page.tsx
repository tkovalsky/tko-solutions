import type { Metadata } from "next";
import Link from "next/link";
import {
  DELIVERABLE_STATUSES,
  DELIVERABLE_TYPES,
  type Deliverable,
  type DeliverableStatus,
  type DeliverableType,
  buildDeliverableRegistry,
  deliverableTypeLabel,
  getIgnoredDeliverables,
  getNextBestDeliverables,
  getPublishableDeliverables,
  getReadyToProduceDeliverables,
} from "@/lib/tif/deliverables";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "TIF Deliverables",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<DeliverableStatus, string> = {
  ready: "READY",
  in_progress: "IN PROGRESS",
  blocked: "BLOCKED",
  published: "PUBLISHED",
};

const STATUS_STYLES: Record<DeliverableStatus, string> = {
  ready: "border-success/30 bg-success/5 text-success",
  in_progress: "border-primary/25 bg-primary/5 text-primary",
  blocked: "border-warning/30 bg-warning/5 text-warning",
  published: "border-foreground/20 bg-foreground/5 text-foreground",
};

export default async function TifDeliverablesPage() {
  const [opportunities, assets] = await Promise.all([
    tifDb.assetOpportunity.findMany({
      orderBy: [{ assetType: "asc" }, { title: "asc" }],
      include: {
        evidenceLinks: { include: { evidence: true } },
        assets: { select: { slug: true, status: true }, orderBy: { createdAt: "desc" } },
      },
    }),
    tifDb.asset.findMany({
      orderBy: [{ assetType: "asc" }, { title: "asc" }],
      include: {
        opportunity: { select: { slug: true, title: true, angle: true, audience: true } },
        evidenceLinks: { include: { evidence: true } },
      },
    }),
  ]);

  const deliverables = buildDeliverableRegistry({ opportunities, assets });
  const readyToProduce = getReadyToProduceDeliverables(deliverables);
  const readyToPublish = deliverables.filter((item) => item.status === "ready" && item.has_asset);
  const blocked = deliverables.filter((item) => item.status === "blocked");
  const published = deliverables.filter((item) => item.status === "published");
  const nextBestDeliverables = getNextBestDeliverables(deliverables, 5);
  const publishableDeliverables = getPublishableDeliverables(deliverables);
  const ignoredDeliverables = getIgnoredDeliverables(deliverables, 5);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to console
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF v0.3 Deliverable-Centric View
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Evidence → Finding → Payload → Deliverable</h1>
        <p className="mt-3 max-w-[72ch] text-sm leading-6 text-muted">
          A production-management readout over existing Evidence, Opportunity, and Asset rows. It
          uses deterministic readiness rules only. No drafting, publishing, AI scoring, or storage
          redesign happens here.
        </p>
      </header>

      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Next Best Deliverables</h2>
            <p className="mt-1 text-sm text-muted">
              Ranked for a 2-hour operator window using readiness, missing components, evidence
              count, and status.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Highest business value: {topBusinessValue(deliverables)?.title ?? "None"}
          </p>
        </div>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {nextBestDeliverables.map((deliverable, index) => (
            <QueueRow key={deliverable.id} deliverable={deliverable} rank={index + 1} />
          ))}
          {nextBestDeliverables.length === 0 && (
            <p className="p-4 text-sm text-muted">No actionable deliverables in the current 2-hour window.</p>
          )}
        </div>
      </section>

      <section className="mb-10 grid gap-4 lg:grid-cols-4">
        <ActionPanel title="Ready To Produce" emptyLabel="Nothing is ready to produce.">
          {readyToProduce.map((deliverable) => (
            <ActionItem key={deliverable.id} deliverable={deliverable} />
          ))}
        </ActionPanel>
        <ActionPanel title="Publish Today" emptyLabel="Nothing is ready to publish.">
          {publishableDeliverables.map((deliverable) => (
            <ActionItem key={deliverable.id} deliverable={deliverable} />
          ))}
        </ActionPanel>
        <ActionPanel title="Blocked" emptyLabel="No blocked deliverables.">
          {blocked.map((deliverable) => (
            <BlockedItem key={deliverable.id} deliverable={deliverable} />
          ))}
        </ActionPanel>
        <ActionPanel title="Ignore For Now" emptyLabel="Nothing needs to be ignored.">
          {ignoredDeliverables.map((deliverable) => (
            <IgnoreItem key={deliverable.id} deliverable={deliverable} />
          ))}
        </ActionPanel>
      </section>

      <section className="mb-10 grid gap-3 md:grid-cols-4">
        <Metric label="Ready to Produce" value={readyToProduce.length} />
        <Metric label="Ready to Publish" value={readyToPublish.length} />
        <Metric label="Blocked" value={blocked.length} />
        <Metric label="Published" value={published.length} />
      </section>

      <section className="mb-12 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
          Factory Snapshot
        </h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {DELIVERABLE_TYPES.map((type) => {
            const typedDeliverables = deliverables.filter((item) => item.type === type);
            const readyCount = typedDeliverables.filter((item) => item.status === "ready").length;
            const blockedCount = typedDeliverables.filter((item) => item.status === "blocked").length;
            const publishedCount = typedDeliverables.filter((item) => item.status === "published").length;
            const queueEligibleCount = typedDeliverables.filter(
              (item) => item.status !== "published" && item.ignore_reason == null,
            ).length;
            return (
              <p key={type} className="text-sm text-muted">
                <span className="font-medium text-foreground">{deliverableTypeLabel(type)}:</span>{" "}
                {typedDeliverables.length} total · {readyCount} ready · {blockedCount} blocked ·{" "}
                {publishedCount} published · {queueEligibleCount} queue eligible
              </p>
            );
          })}
        </div>
      </section>

      {DELIVERABLE_TYPES.map((type) => (
        <DeliverableTypeSection
          key={type}
          type={type}
          deliverables={deliverables.filter((item) => item.type === type)}
        />
      ))}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function QueueRow({ deliverable, rank }: { deliverable: Deliverable; rank: number }) {
  return (
    <article className="grid gap-4 p-4 md:grid-cols-[2rem_1fr_auto] md:items-start">
      <p className="text-lg font-semibold text-muted">{rank}</p>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{deliverable.title}</h3>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[deliverable.status]}`}>
            {STATUS_LABELS[deliverable.status]}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{deliverable.next_action}</p>
        {deliverable.missing_components.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            <span className="font-semibold text-foreground/70">Missing:</span>{" "}
            {deliverable.missing_components.join(", ")}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs md:min-w-[18rem]">
        <Score label="Priority" value={deliverable.priority_score} />
        <Score label="Readiness" value={deliverable.readiness} suffix="%" />
        <Score label="Completion" value={deliverable.completion_probability} suffix="%" />
        <Score label="Effort" value={deliverable.estimated_effort_minutes} suffix=" min" />
      </div>
    </article>
  );
}

function ActionPanel({
  title,
  emptyLabel,
  children,
}: {
  title: string;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  const childArray = Array.isArray(children) ? children : [children];
  const hasChildren = childArray.some(Boolean);

  return (
    <section className="rounded-lg border border-border bg-white">
      <h2 className="border-b border-border px-4 py-3 text-sm font-semibold">{title}</h2>
      <div className="divide-y divide-border">
        {hasChildren ? children : <p className="p-4 text-sm text-muted">{emptyLabel}</p>}
      </div>
    </section>
  );
}

function ActionItem({ deliverable }: { deliverable: Deliverable }) {
  return (
    <article className="p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{deliverable.title}</h3>
          <p className="mt-1 text-xs text-muted">{deliverable.next_action}</p>
        </div>
        {deliverable.asset_slug && (
          <Link href={`/tif/assets/${deliverable.asset_slug}`} className="text-xs font-semibold text-primary hover:underline">
            Asset
          </Link>
        )}
        {!deliverable.asset_slug && deliverable.opportunity_slug && (
          <a href={`/tif#opportunity-${deliverable.opportunity_slug}`} className="text-xs font-semibold text-primary hover:underline">
            Opportunity
          </a>
        )}
      </div>
    </article>
  );
}

function BlockedItem({ deliverable }: { deliverable: Deliverable }) {
  return (
    <article className="p-4 text-sm">
      <h3 className="font-semibold">{deliverable.title}</h3>
      <p className="mt-1 text-xs text-muted">
        Priority {deliverable.priority_score} · {deliverable.estimated_effort_minutes} min estimated
      </p>
      <div className="mt-3 text-xs text-muted">
        <p className="font-semibold text-foreground/70">Missing:</p>
        <ul className="mt-1 space-y-1">
          {deliverable.blocker_details.map((blocker) => (
            <li key={`${deliverable.id}-${blocker.kind}-${blocker.label}`}>{blocker.label}</li>
          ))}
        </ul>
      </div>
      <details className="mt-3 text-xs text-muted">
        <summary className="cursor-pointer font-semibold text-foreground/70">Source assets</summary>
        <ul className="mt-2 space-y-1">
          {deliverable.source_records.map((record) => (
            <li key={`${deliverable.id}-${record.kind}-${record.ref}`}>
              {record.kind}: {record.ref}
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

function IgnoreItem({ deliverable }: { deliverable: Deliverable }) {
  return (
    <article className="p-4 text-sm">
      <h3 className="font-semibold">{deliverable.title}</h3>
      <p className="mt-1 text-xs text-muted">{deliverable.ignore_reason}</p>
      <p className="mt-2 text-xs text-muted">
        Priority {deliverable.priority_score} · Completion {deliverable.completion_probability}%
      </p>
    </article>
  );
}

function Score({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <p className="font-semibold text-foreground">{value}{suffix}</p>
      <p className="mt-0.5 uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function DeliverableTypeSection({
  type,
  deliverables,
}: {
  type: DeliverableType;
  deliverables: Deliverable[];
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {deliverableTypeLabel(type)} <span className="text-muted">({deliverables.length})</span>
        </h2>
        {deliverables.length === 0 && <span className="text-xs text-muted">missing</span>}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {DELIVERABLE_STATUSES.map((status) => (
          <StatusGroup
            key={status}
            status={status}
            deliverables={deliverables.filter((item) => item.status === status)}
          />
        ))}
      </div>
    </section>
  );
}

function StatusGroup({
  status,
  deliverables,
}: {
  status: DeliverableStatus;
  deliverables: Deliverable[];
}) {
  return (
    <div className="rounded-lg border border-border bg-white">
      <div className={`border-b border-border px-4 py-3 text-xs font-semibold tracking-wide ${STATUS_STYLES[status]}`}>
        {STATUS_LABELS[status]} ({deliverables.length})
      </div>

      <div className="divide-y divide-border">
        {deliverables.map((deliverable) => (
          <DeliverableRow key={deliverable.id} deliverable={deliverable} />
        ))}
        {deliverables.length === 0 && <p className="p-4 text-sm text-muted">None</p>}
      </div>
    </div>
  );
}

function DeliverableRow({ deliverable }: { deliverable: Deliverable }) {
  return (
    <article className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{deliverable.title}</h3>
          <p className="mt-1 text-xs text-muted">
            {deliverable.business_unit} · {deliverable.evidence_count} evidence record(s) ·{" "}
            {deliverable.readiness}% ready · priority {deliverable.priority_score}
          </p>
          <p className="mt-2 text-xs text-muted">{deliverable.next_action}</p>
        </div>
        {deliverable.asset_slug ? (
          <Link
            href={`/tif/assets/${deliverable.asset_slug}`}
            className="shrink-0 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Asset
          </Link>
        ) : (
          <a
            href={`/tif#opportunity-${deliverable.opportunity_slug}`}
            className="shrink-0 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Opportunity
          </a>
        )}
      </div>

      {deliverable.missing_components.length > 0 && (
        <div className="mt-3 text-xs text-muted">
          <p className="font-semibold text-foreground/70">Missing:</p>
          <p>{deliverable.missing_components.join(", ")}</p>
        </div>
      )}

      <details className="mt-3 text-xs text-muted">
        <summary className="cursor-pointer font-semibold text-foreground/70">Source records</summary>
        <ul className="mt-2 space-y-1">
          {deliverable.source_records.map((record) => (
            <li key={`${record.kind}-${record.ref}`}>
              {record.kind}: {record.ref}
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

function topBusinessValue(deliverables: Deliverable[]) {
  return [...deliverables]
    .filter((deliverable) => deliverable.status !== "published")
    .sort((a, b) => b.business_value_score - a.business_value_score || b.priority_score - a.priority_score)[0];
}
