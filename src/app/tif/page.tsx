import type { Metadata } from "next";
import Link from "next/link";
import { tifDb } from "@/lib/tif/db";
import { generateAsset } from "./actions";

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
      include: { _count: { select: { evidenceLinks: true } } },
    }),
    tifDb.asset.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        opportunity: { select: { slug: true, title: true } },
        evidenceLinks: { include: { evidence: { select: { slug: true, domain: true } } } },
        _count: { select: { evidenceLinks: true } },
      },
    }),
  ]);

  const evidenceByUnit = countByUnit(evidence);
  const opportunitiesByUnit = countByUnit(opportunities);
  const assetsByUnit = countByUnit(assets);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF v0.1 Operator Console
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Evidence → Opportunity → Asset</h1>
        <p className="mt-3 max-w-[65ch] text-muted">
          Read-only visibility into the live TIF Asset Production Spine. No editing, search, or
          workflow here — see <code>ENGINEERING_BACKLOG.md</code> EPIC 11/12 for scope.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/tif/inbox" className="font-semibold text-primary underline-offset-2 hover:underline">
            Capture Inbox →
          </Link>
          <Link href="/tif/inventory" className="font-semibold text-primary underline-offset-2 hover:underline">
            Content Inventory →
          </Link>
        </div>
      </header>

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
                  {opp.assetType} · {opp._count.evidenceLinks} linked evidence record(s)
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <BusinessUnitBadge unit={opp.businessUnit} />
                <StatusBadge status={opp.status} />
                <form action={generateAsset}>
                  <input type="hidden" name="opportunitySlug" value={opp.slug} />
                  <button
                    type="submit"
                    className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {opp.status === "composed" ? "Regenerate Asset" : "Generate Asset"}
                  </button>
                </form>
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

function EmptyRow({ label }: { label: string }) {
  return <p className="p-4 text-sm text-muted">{label}</p>;
}

function countByUnit(records: { businessUnit: string }[]) {
  return records.reduce<Record<string, number>>((acc, r) => {
    acc[r.businessUnit] = (acc[r.businessUnit] ?? 0) + 1;
    return acc;
  }, {});
}
