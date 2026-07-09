import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTENT_TENANT_LABELS,
  OPPORTUNITY_SOURCE_LABELS,
} from "@/lib/tif/content-workflow";
import { getAssetManualEditState, formatAssetDate } from "@/lib/tif/manual-edit-protection";
import { tifDb } from "@/lib/tif/db";
import { createContentOpportunity } from "./actions";
import { AssetGenerationStatus, RegenerateAssetForm } from "./regenerate-asset-form";

export const metadata: Metadata = {
  title: "TIF Operator Console",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const BUSINESS_UNIT_STYLES: Record<string, string> = {
  rachel: "bg-pink-100 text-pink-800",
  cre: "bg-blue-100 text-blue-800",
  tko: "bg-emerald-100 text-emerald-800",
};

function BusinessUnitBadge({ unit }: { unit: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        BUSINESS_UNIT_STYLES[unit] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {unit}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
      {status}
    </span>
  );
}

export default async function TifConsolePage() {
  const [evidence, opportunities, assets] = await Promise.all([
    tifDb.evidence.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { assets: true } } },
    }),
    tifDb.assetOpportunity.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { evidenceLinks: true, assets: true } } },
    }),
    tifDb.asset.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        opportunity: { select: { slug: true, title: true } },
        evidenceLinks: { include: { evidence: { select: { slug: true, domain: true } } } },
        revisionRequests: { where: { status: "open" }, orderBy: { createdAt: "desc" } },
        _count: { select: { evidenceLinks: true, versions: true, derivativeAssets: true } },
      },
    }),
  ]);

  const assetEditStateBySlug = new Map(
    await Promise.all(
      assets.map(async (asset) => [asset.slug, await getAssetManualEditState(asset)] as const),
    ),
  );

  const evidenceByUnit = countByUnit(evidence);
  const opportunitiesByUnit = countByUnit(opportunities);
  const assetsByUnit = countByUnit(assets);
  const unstartedOpportunities = opportunities.filter((opp) => opp._count.assets === 0);
  const inProgressAssets = assets.filter((asset) =>
    asset.status === "draft" || asset.revisionRequests.length > 0,
  );
  const needsReviewAssets = assets.filter((asset) => asset.status === "review");
  const rejectedAssets = assets.filter((asset) => asset.revisionRequests.length > 0);
  const publishedAssets = assets.filter((asset) => asset.status === "published");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF v0.1 Operator Console
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Content Factory Workflow</h1>
        <p className="mt-3 max-w-[65ch] text-muted">
          Operator workflow across TKO, BoundOS, and RachelDelray: Opportunity → Context → Draft →
          Review → Revision → Approval → Publish → Derivatives.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/tif/deliverables" className="font-semibold text-primary underline-offset-2 hover:underline">
            Deliverables →
          </Link>
          <Link href="/tif/proof" className="font-semibold text-primary underline-offset-2 hover:underline">
            Proof Hub →
          </Link>
          <Link href="/tif/inbox" className="font-semibold text-primary underline-offset-2 hover:underline">
            Capture Inbox →
          </Link>
          <Link href="/tif/inventory" className="font-semibold text-primary underline-offset-2 hover:underline">
            Content Inventory →
          </Link>
        </div>
      </header>

      <section className="mb-10 grid gap-3 md:grid-cols-5">
        <WorkflowMetric label="Create Next" value={unstartedOpportunities.length} />
        <WorkflowMetric label="In Progress" value={inProgressAssets.length} />
        <WorkflowMetric label="Needs Review" value={needsReviewAssets.length} />
        <WorkflowMetric label="Rejected" value={rejectedAssets.length} />
        <WorkflowMetric label="Published" value={publishedAssets.length} />
      </section>

      <section className="mb-12 rounded-lg border border-border bg-white p-5">
        <h2 className="text-lg font-semibold">Create Opportunity</h2>
        <form action={createContentOpportunity} className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Title idea</span>
            <input name="title" required className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Tenant</span>
            <select name="tenant" className="rounded-md border border-input-border px-3 py-2" defaultValue="tko">
              {Object.entries(CONTENT_TENANT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Business unit</span>
            <select name="businessUnit" className="rounded-md border border-input-border px-3 py-2" defaultValue="tko">
              <option value="tko">TKO</option>
              <option value="rachel">Rachel</option>
              <option value="cre">CRE</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Asset type</span>
            <select name="assetType" className="rounded-md border border-input-border px-3 py-2" defaultValue="article">
              <option value="article">Article</option>
              <option value="landing_page">Landing page</option>
              <option value="case_study">Case study</option>
              <option value="assessment">Assessment</option>
              <option value="executive_brief">Executive brief</option>
              <option value="comparison_guide">Comparison guide</option>
              <option value="intelligence_report">Intelligence report</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Source type</span>
            <select name="sourceType" className="rounded-md border border-input-border px-3 py-2" defaultValue="title_idea">
              {Object.entries(OPPORTUNITY_SOURCE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Source URL</span>
            <input name="sourceUrl" type="url" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-semibold">Angle</span>
            <textarea name="angle" required rows={2} className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold">Audience</span>
            <input name="audience" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-semibold">Research inputs / operator context</span>
            <textarea name="contextNotes" rows={5} className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
              Create Opportunity
            </button>
          </div>
        </form>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Workflow Queue</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <QueuePanel title="What should I create next?" emptyLabel="No unstarted opportunities.">
            {unstartedOpportunities.slice(0, 6).map((opp) => (
              <QueueOpportunity key={opp.id} opportunity={opp} />
            ))}
          </QueuePanel>
          <QueuePanel title="What needs review?" emptyLabel="No assets in review.">
            {needsReviewAssets.slice(0, 6).map((asset) => (
              <QueueAsset key={asset.id} asset={asset} />
            ))}
          </QueuePanel>
          <QueuePanel title="What was rejected?" emptyLabel="No open revision requests.">
            {rejectedAssets.slice(0, 6).map((asset) => (
              <QueueAsset key={asset.id} asset={asset} />
            ))}
          </QueuePanel>
          <QueuePanel title="What was published?" emptyLabel="No published assets.">
            {publishedAssets.slice(0, 6).map((asset) => (
              <QueueAsset key={asset.id} asset={asset} />
            ))}
          </QueuePanel>
        </div>
      </section>

      <Section
        id="evidence"
        title="Evidence"
        total={evidence.length}
        byUnit={evidenceByUnit}
      >
        <p className="mb-4 text-xs text-muted">
          Confidence and maturity are tracked in the markdown registries
          (<code>content/proof/*/evidence.yaml</code>), not yet on the DB model — not shown here
          to avoid displaying fabricated values.
        </p>
        <div className="divide-y divide-border rounded-xl border border-border bg-white">
          {evidence.map((record) => (
            <div key={record.id} id={`evidence-${record.slug}`} className="flex flex-wrap items-start justify-between gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{record.domain}:{record.slug}</p>
                <p className="mt-1 max-w-[60ch] text-sm text-muted">{record.observation}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <BusinessUnitBadge unit={record.businessUnit} />
                <span className="text-xs text-muted">{record._count.assets} derived asset(s)</span>
              </div>
            </div>
          ))}
          {evidence.length === 0 && <EmptyRow label="No evidence records yet." />}
        </div>
      </Section>

      <Section
        id="opportunities"
        title="Opportunities"
        total={opportunities.length}
        byUnit={opportunitiesByUnit}
      >
        <p className="mb-4 text-xs text-muted">
          Priority is not yet a DB field on AssetOpportunity (markdown audit ranks opportunities
          high/medium/low manually) — not shown here for the same reason.
        </p>
        <div className="divide-y divide-border rounded-xl border border-border bg-white">
          {opportunities.map((opp) => (
            <div key={opp.id} id={`opportunity-${opp.slug}`} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{opp.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {opp.tenant} · {opp.sourceType} · {opp.assetType} · {opp._count.evidenceLinks} linked evidence record(s)
                </p>
                {opp.contextNotes && <p className="mt-1 line-clamp-2 text-xs text-muted">{opp.contextNotes}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <BusinessUnitBadge unit={opp.businessUnit} />
                <StatusBadge status={opp.status} />
                <RegenerateAssetForm
                  opportunitySlug={opp.slug}
                  label={opp.status === "composed" ? "Regenerate Asset" : "Generate Asset"}
                  hasManualEdits={assetEditStateBySlug.get(opp.slug)?.isManuallyEdited ?? false}
                />
              </div>
            </div>
          ))}
          {opportunities.length === 0 && <EmptyRow label="No opportunities yet." />}
        </div>
      </Section>

      <Section id="assets" title="Assets" total={assets.length} byUnit={assetsByUnit}>
        <div className="grid gap-4 md:grid-cols-2">
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/tif/assets/${asset.slug}`} className="font-medium underline-offset-2 hover:underline">
                  {asset.title}
                </Link>
                <BusinessUnitBadge unit={asset.businessUnit} />
              </div>
              <p className="mt-1 text-xs text-muted">
                {asset.assetType} · <StatusBadge status={asset.status} />
              </p>
              <p className="mt-1 text-xs text-muted">
                {asset.tenant} · v{asset.currentVersionNumber || "—"} · {asset._count.derivativeAssets} derivative(s)
              </p>

              <div className="mt-3">
                <AssetGenerationStatus
                  isManuallyEdited={assetEditStateBySlug.get(asset.slug)?.isManuallyEdited ?? false}
                  generatedAtLabel={formatAssetDate(assetEditStateBySlug.get(asset.slug)?.generatedAt ?? null)}
                  lastEditedAtLabel={formatAssetDate(assetEditStateBySlug.get(asset.slug)?.lastEditedAt ?? null)}
                />
              </div>

              <div className="mt-4 space-y-1 text-xs text-muted">
                <p className="font-semibold uppercase tracking-wide text-foreground/70">Traceability</p>
                <ol className="space-y-1">
                  {asset.evidenceLinks.map(({ evidence: ev }) => (
                    <li key={ev.slug}>
                      Evidence:{" "}
                      <a className="underline" href={`/tif#evidence-${ev.slug}`}>
                        {ev.domain}:{ev.slug}
                      </a>
                    </li>
                  ))}
                  <li>
                    Opportunity:{" "}
                    {asset.opportunity ? (
                      <a className="underline" href={`/tif#opportunity-${asset.opportunity.slug}`}>
                        {asset.opportunity.title}
                      </a>
                    ) : (
                      "— (no linked opportunity)"
                    )}
                  </li>
                  <li>
                    Asset:{" "}
                    <Link className="underline" href={`/tif/assets/${asset.slug}`}>
                      {asset.title}
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          ))}
          {assets.length === 0 && <EmptyRow label="No assets generated yet." />}
        </div>
      </Section>
    </main>
  );
}

function Section({
  id,
  title,
  total,
  byUnit,
  children,
}: {
  id: string;
  title: string;
  total: number;
  byUnit: Record<string, number>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {title} <span className="text-muted">({total})</span>
        </h2>
        <div className="flex gap-2 text-xs text-muted">
          {Object.entries(byUnit).map(([unit, count]) => (
            <span key={unit}>
              <BusinessUnitBadge unit={unit} /> {count}
            </span>
          ))}
        </div>
      </div>
      {children}
    </section>
  );
}

function WorkflowMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function QueuePanel({
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
      <h3 className="border-b border-border px-4 py-3 text-sm font-semibold">{title}</h3>
      <div className="divide-y divide-border">
        {hasChildren ? children : <p className="p-4 text-sm text-muted">{emptyLabel}</p>}
      </div>
    </section>
  );
}

function QueueOpportunity({
  opportunity,
}: {
  opportunity: {
    slug: string;
    title: string;
    tenant: string;
    assetType: string;
    sourceType: string;
  };
}) {
  return (
    <article className="flex items-start justify-between gap-3 p-4 text-sm">
      <div>
        <h4 className="font-semibold">{opportunity.title}</h4>
        <p className="mt-1 text-xs text-muted">
          {opportunity.tenant} · {opportunity.sourceType} · {opportunity.assetType}
        </p>
      </div>
      <a href={`/tif#opportunity-${opportunity.slug}`} className="shrink-0 text-xs font-semibold text-primary hover:underline">
        Open
      </a>
    </article>
  );
}

function QueueAsset({
  asset,
}: {
  asset: {
    slug: string;
    title: string;
    status: string;
    tenant: string;
    currentVersionNumber: number;
    revisionRequests: { notes: string }[];
  };
}) {
  return (
    <article className="p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold">{asset.title}</h4>
          <p className="mt-1 text-xs text-muted">
            {asset.tenant} · {asset.status} · v{asset.currentVersionNumber || "—"}
          </p>
        </div>
        <Link href={`/tif/assets/${asset.slug}`} className="shrink-0 text-xs font-semibold text-primary hover:underline">
          Asset
        </Link>
      </div>
      {asset.revisionRequests[0] && (
        <p className="mt-2 text-xs text-muted">Revision: {asset.revisionRequests[0].notes}</p>
      )}
    </article>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <p className="p-4 text-sm text-muted">{label}</p>;
}

function countByUnit(records: { businessUnit: string }[]) {
  return records.reduce<Record<string, number>>((acc, r) => {
    acc[r.businessUnit] = (acc[r.businessUnit] ?? 0) + 1;
    return acc;
  }, {});
}
