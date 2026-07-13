import type { Metadata } from "next";
import Link from "next/link";
import { orchestrateAuthorityProduction, type AuthorityCoverageArea } from "@/lib/tif/authority-orchestrator";
import { buildAuthorityWorkQueue } from "@/lib/tif/authority-work-queue";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "TIF Authority Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// This route intentionally reads only persisted TIF records. Experience, Problem,
// Pattern, Framework, Package, Publication, and Measurement counts are shown as
// untracked until their existing compiler outputs are materialized relationally.
export default async function AuthorityDashboardPage() {
  const [evidence, assets, diagrams, opportunities] = await Promise.all([
    tifDb.evidence.findMany({
      select: { id: true, slug: true, domain: true, businessUnit: true, assets: { select: { assetId: true } } },
    }),
    tifDb.asset.findMany({
      select: {
        id: true,
        title: true,
        assetType: true,
        status: true,
        businessUnit: true,
        updatedAt: true,
        evidenceLinks: { select: { evidenceId: true } },
        diagramLinks: { select: { diagramId: true } },
      },
    }),
    tifDb.knowledgeDiagram.findMany({
      select: {
        id: true,
        knowledgeId: true,
        asset: { select: { title: true, status: true, evidenceLinks: { select: { evidenceId: true } } } },
        diagramLinks: { select: { assetId: true } },
      },
    }),
    tifDb.assetOpportunity.findMany({
      select: {
        id: true,
        title: true,
        assetType: true,
        angle: true,
        evidenceLinks: { select: { evidenceId: true } },
        _count: { select: { assets: true } },
      },
    }),
  ]);

  const result = orchestrateAuthorityProduction({
    experiences: [],
    problems: [],
    patterns: [],
    frameworks: [],
    packages: [],
    evidence: evidence.map((item) => ({
      id: item.id,
      title: item.slug,
      status: "unknown" as const,
      coverage: coverageFor(item.domain, item.businessUnit),
      assetIds: item.assets.map((link) => link.assetId),
      experienceIds: [],
    })),
    diagrams: diagrams.map((item) => ({
      id: item.id,
      title: item.asset.title,
      status: item.asset.status,
      coverage: [],
      evidenceIds: item.asset.evidenceLinks.map((link) => link.evidenceId),
      consumerAssetIds: item.diagramLinks.map((link) => link.assetId),
    })),
    assets: assets.map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.assetType,
      status: item.status,
      coverage: coverageFor(undefined, item.businessUnit),
      evidenceIds: item.evidenceLinks.map((link) => link.evidenceId),
      diagramIds: item.diagramLinks.map((link) => link.diagramId),
      updatedAt: item.updatedAt,
    })),
  });
  const workQueue = buildAuthorityWorkQueue({
    packages: [],
    assets: assets.map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.assetType,
      status: item.status,
      coverage: coverageFor(undefined, item.businessUnit),
      evidenceIds: item.evidenceLinks.map((link) => link.evidenceId),
      diagramIds: item.diagramLinks.map((link) => link.diagramId),
      updatedAt: item.updatedAt,
    })),
    opportunities: opportunities.map((item) => ({
      id: item.id,
      title: item.title,
      assetType: item.assetType,
      angle: item.angle,
      evidenceIds: item.evidenceLinks.map((link) => link.evidenceId),
      assetCount: item._count.assets,
    })),
  });

  const metricItems = [
    ["Approved Experiences", "Untracked"],
    ["Approved Evidence", result.dashboard.approvedEvidence],
    ["Knowledge Diagrams", result.dashboard.knowledgeDiagrams],
    ["Problems", "Untracked"],
    ["Patterns", "Untracked"],
    ["Frameworks", "Untracked"],
    ["Assets", result.dashboard.assets],
    ["Published Assets", result.dashboard.publishedAssets],
    ["Blocked Assets", result.dashboard.blockedAssets],
    ["Review Queue", result.dashboard.reviewQueue],
    ["Publication Queue", result.dashboard.publicationQueue],
    ["Authority Score", result.dashboard.authorityScore ?? "Untracked"],
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        ← Back to console
      </Link>
      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">TIF P0C Authority Production Orchestrator</p>
        <h1 className="mt-2 text-3xl font-semibold">What can be published, what is blocked, and what evidence is missing.</h1>
        <p className="mt-3 max-w-[78ch] text-sm leading-6 text-muted">
          Deterministic read model over the existing TIF evidence, asset, and diagram relations. It creates no proof, changes no approval state, and never publishes automatically.
        </p>
      </header>

      <section className="mb-10 rounded-lg border border-warning/30 bg-warning/5 p-5 text-sm leading-6 text-foreground">
        <strong>Data-model validation:</strong> the running schema currently persists Evidence, Assets, Derivatives, and Knowledge Diagrams. Experience, Problem, Pattern, Framework, Package, Publication, and Measurement are not yet queryable records, so this view labels them <em>Untracked</em> rather than inventing counts or coverage.
        {result.dashboard.unclassifiedEvidence > 0 ? <p className="mt-2">{result.dashboard.unclassifiedEvidence} Evidence record(s) still need structured approval classification before they can count as approved proof.</p> : null}
      </section>

      <section className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {metricItems.map(([label, value]) => <Metric key={label} label={label} value={value} />)}
      </section>

      <ReportSection title="Authority Work Queue" description="Ranked next actions only. This report creates no Opportunity, Asset, publication, or evidence record.">
        {workQueue.length ? <div className="grid gap-4">{workQueue.map((item) => <WorkQueueItem key={item.id} item={item} />)}</div> : <Empty label="No persisted work is currently queued. Compiler-package work will appear after reviewed Experience records are available." />}
      </ReportSection>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Authority Heat Map</h2>
        <p className="mt-2 text-sm text-muted">Coverage comes only from persisted metadata. Weak means no linked evidence or no asset in that area.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {result.dashboard.coverage.map((item) => <article key={item.area} className={`rounded-lg border p-4 ${item.weak ? "border-warning/30 bg-warning/5" : "border-success/30 bg-success/5"}`}>
            <h3 className="font-semibold">{item.area}</h3>
            <p className="mt-2 text-xs text-muted">Evidence {item.evidence} · Diagrams {item.diagrams} · Assets {item.assets}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide">{item.weak ? "Weak coverage" : "Covered"}</p>
          </article>)}
        </div>
      </section>

      <ReportSection title="Publication Planner" description="Recommendations are sequencing prompts, never publication actions.">
        <Planner label="Today" entries={result.publicationPlanner.today} empty="No persisted review work is currently queued." />
        <Planner label="This week" entries={result.publicationPlanner.thisWeek} empty="No approved assets or diagram dependency gaps are currently queued." />
        <Planner label="This month" entries={result.publicationPlanner.thisMonth} empty="Package-based opportunities require persisted approved Experience records." />
      </ReportSection>

      <ReportSection title="Diagram Dependency Report" description="Guide, assessment, proposal, and framework assets require an explicit diagram reference.">
        {result.diagramDependencies.length ? <ul className="divide-y divide-border rounded-lg border border-border bg-white">{result.diagramDependencies.map((item) => <li key={item.assetId} className="flex flex-wrap items-center justify-between gap-3 p-4"><span className="font-medium">{item.asset}</span><span className={`rounded-full border px-2 py-0.5 text-xs font-semibold uppercase ${item.status === "covered" ? "border-success/30 text-success" : "border-warning/30 text-warning"}`}>{item.status}</span></li>)}</ul> : <Empty label="No persisted diagram-dependent assets." />}
      </ReportSection>

      <ReportSection title="Missing Evidence Report" description="Problem-level reporting activates when Problems are materialized in the existing relational compiler.">
        <Empty label="No persisted Problem records are available for a truthful gap report." />
      </ReportSection>

      <ReportSection title="Package Readiness Report" description="One approved Experience produces a reviewable package manifest; blocked packages stay blocked.">
        <Empty label="No persisted Experience/Package records are available." />
      </ReportSection>

      <ReportSection title="Content Opportunity Report" description="Only missing package children become candidates; existing Asset matches are never duplicated.">
        <Empty label="No package-derived opportunities until approved Experiences are queryable." />
      </ReportSection>

      <ReportSection title="Evidence Capture Queue" description="Capture tasks are generated from explicit proof gaps, never from unsupported claims.">
        <Empty label="No package blockers are available to convert into capture tasks." />
      </ReportSection>

      <ReportSection title="Authority Quality Report" description="Duplicate, orphan, and unused records are computed from existing relations.">
        <div className="grid gap-3 md:grid-cols-2">
          <Quality label="Duplicate assets" entries={result.quality.duplicateAssets.flat().map((item) => item)} />
          <Quality label="Duplicate diagrams" entries={result.quality.duplicateDiagrams.flat().map((item) => item)} />
          <Quality label="Orphan evidence" entries={result.quality.orphanEvidence} />
          <Quality label="Unused diagrams" entries={result.quality.unusedDiagrams} />
          <Quality label="Unused assets" entries={result.quality.unusedAssets} />
          <Quality label="Unpublished SEO clusters" entries={result.quality.unusedSeoClusters} />
        </div>
      </ReportSection>
    </main>
  );
}

function coverageFor(domain: string | undefined, businessUnit: string): AuthorityCoverageArea[] {
  if (domain === "healthcare") return ["Healthcare"];
  if (domain === "rachelos" || businessUnit === "rachel") return ["RachelOS"];
  if (domain === "cre" || businessUnit === "cre") return ["Commercial Real Estate"];
  if (domain === "tko" || businessUnit === "tko") return ["Enterprise Operations"];
  return [];
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <article className="rounded-lg border border-border bg-white p-4"><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p></article>;
}

function ReportSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="mb-12"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm text-muted">{description}</p><div className="mt-4">{children}</div></section>;
}

function Planner({ label, entries, empty }: { label: string; entries: string[]; empty: string }) {
  return <div className="mb-4 rounded-lg border border-border bg-white p-4"><h3 className="font-semibold">{label}</h3>{entries.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{entries.map((entry) => <li key={entry}>{entry}</li>)}</ul> : <p className="mt-2 text-sm text-muted">{empty}</p>}</div>;
}

function Quality({ label, entries }: { label: string; entries: string[] }) {
  return <article className="rounded-lg border border-border bg-white p-4"><h3 className="font-semibold">{label}</h3><p className="mt-2 text-sm text-muted">{entries.length ? entries.join(", ") : "None detected."}</p></article>;
}

function Empty({ label }: { label: string }) {
  return <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted">{label}</p>;
}

function WorkQueueItem({ item }: { item: ReturnType<typeof buildAuthorityWorkQueue>[number] }) {
  const gaps = [
    ...item.missingEvidence,
    ...item.missingDiagram,
    ...item.missingFramework,
    ...item.missingAssets.map((asset) => `Missing Asset: ${asset}`),
  ];
  return <article className="rounded-lg border border-border bg-white p-5">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-muted">{item.priority} · unlocks an estimated {item.estimatedAssetsUnlocked} asset(s)</p><h3 className="mt-1 text-lg font-semibold">{item.title}</h3></div><div className="text-right text-xs text-muted"><p>Authority: {item.expectedAuthorityImpact}</p><p>SEO: {item.expectedSeoImpact}</p><p>Commercial: {item.expectedCommercialValue}</p></div></div>
    <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2"><div><dt className="font-semibold">Experience</dt><dd className="text-muted">{item.experience}</dd></div><div><dt className="font-semibold">Business Problem</dt><dd className="text-muted">{item.businessProblem}</dd></div><div><dt className="font-semibold">Missing / blocking</dt><dd className="text-muted">{[...gaps, ...item.blockingDependencies].join(" ") || "None."}</dd></div><div><dt className="font-semibold">Recommended Next Action</dt><dd className="text-muted">{item.recommendedNextAction}</dd></div></dl>
  </article>;
}
