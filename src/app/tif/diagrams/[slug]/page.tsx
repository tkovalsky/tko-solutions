import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLAIM_STATUS_LABELS, KNOWLEDGE_DIAGRAM_FORMAT_LABELS } from "@/lib/tif/knowledge-diagrams";
import { tifDb } from "@/lib/tif/db";
import { linkAssetToDiagram } from "../actions";

export const metadata: Metadata = {
  title: "TIF Knowledge Diagram",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export default async function KnowledgeDiagramDetailPage({ params }: Params) {
  const { slug } = await params;
  const [diagram, assets] = await Promise.all([
    tifDb.knowledgeDiagram.findFirst({
      where: { asset: { slug } },
      include: {
        asset: {
          include: {
            evidenceLinks: { include: { evidence: true } },
            versions: { orderBy: { versionNumber: "desc" }, take: 1 },
            revisionRequests: { where: { status: "open" }, orderBy: { createdAt: "desc" } },
          },
        },
        diagramLinks: { include: { asset: { select: { slug: true, title: true, assetType: true, status: true } } }, orderBy: { createdAt: "desc" } },
      },
    }),
    tifDb.asset.findMany({ orderBy: { title: "asc" }, select: { id: true, slug: true, title: true, assetType: true, status: true } }),
  ]);

  if (!diagram) notFound();
  const candidateAssets = assets.filter((asset) => asset.id !== diagram.assetId && !diagram.diagramLinks.some((link) => link.assetId === asset.id));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif/diagrams" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">← Knowledge Diagram Registry</Link>
      <header className="mt-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{diagram.knowledgeId} · {KNOWLEDGE_DIAGRAM_FORMAT_LABELS[diagram.diagramFormat]}</p><h1 className="mt-2 text-3xl font-semibold">{diagram.asset.title}</h1></div>
          <div className="flex gap-2"><span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase text-muted">Asset: {diagram.asset.status}</span><span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase text-muted">{CLAIM_STATUS_LABELS[diagram.evidenceStatus]}</span></div>
        </div>
        <p className="mt-4 max-w-[70ch] text-base leading-7 text-muted">{diagram.purpose}</p>
        <Link href={`/tif/assets/${diagram.asset.slug}`} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">Open existing Asset review workflow →</Link>
      </header>

      <section className="grid gap-5 py-10 md:grid-cols-2">
        <Detail title="Business problem"><p>{diagram.businessProblem}</p></Detail>
        <Detail title="Claim boundary"><p>{diagram.claimBoundary}</p></Detail>
        <Detail title="Executive audience"><ul className="list-disc space-y-1 pl-5">{diagram.executiveAudience.map((item) => <li key={item}>{item}</li>)}</ul></Detail>
        <Detail title="Publication readiness"><p>Inherited from the parent Asset: <strong>{diagram.asset.status}</strong>. Drafts, revisions, approval, and publication remain in the existing Asset workflow.</p></Detail>
        <Detail title="Inputs"><List value={diagram.inputs} /></Detail>
        <Detail title="Outputs"><List value={diagram.outputs} /></Detail>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="text-2xl font-semibold">Linked evidence</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{diagram.asset.evidenceLinks.map(({ evidence }) => <article key={evidence.id} className="rounded-lg border border-border bg-white p-4"><p className="text-sm font-semibold">{evidence.domain}:{evidence.slug}</p><p className="mt-2 text-sm leading-6 text-muted">{evidence.observation}</p><p className="mt-3 text-xs text-muted"><span className="font-semibold">Boundary:</span> {evidence.claimGuard}</p></article>)}{diagram.asset.evidenceLinks.length === 0 ? <p className="text-sm text-muted">No Evidence records are linked. The diagram cannot be approved as proof until evidence is attached.</p> : null}</div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="text-2xl font-semibold">Assets that reference this diagram</h2>
        <p className="mt-2 text-sm text-muted">Guides, assessments, proposals, Operator Notes, and website assets link here through an explicit join.</p>
        <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-white">{diagram.diagramLinks.map((link) => <div key={link.assetId} className="flex items-center justify-between gap-4 p-4"><div><p className="font-semibold">{link.asset.title}</p><p className="text-xs text-muted">{link.asset.assetType} · {link.asset.status}</p></div><Link href={`/tif/assets/${link.asset.slug}`} className="text-sm font-semibold text-primary hover:underline">Open asset</Link></div>)}{diagram.diagramLinks.length === 0 ? <p className="p-4 text-sm text-muted">No consuming assets linked yet.</p> : null}</div>
        {candidateAssets.length > 0 ? <form action={linkAssetToDiagram} className="mt-5 flex flex-wrap items-end gap-3"><input type="hidden" name="diagramId" value={diagram.id} /><label className="grid gap-1 text-sm"><span className="font-semibold">Link an existing Asset</span><select name="assetId" className="rounded-md border border-input-border px-3 py-2">{candidateAssets.map((asset) => <option key={asset.id} value={asset.id}>{asset.title} ({asset.assetType})</option>)}</select></label><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Link asset</button></form> : null}
      </section>

      <section className="border-t border-border py-10"><h2 className="text-2xl font-semibold">Diagram review workflow</h2><ol className="mt-4 grid gap-3 text-sm leading-6 text-muted"><li>1. Verify purpose, audience, business problem, inputs, outputs, evidence status, and claim boundary here.</li><li>2. Compose the diagram specification through the existing Asset Composer.</li><li>3. Request revisions and move the parent Asset through draft → review → approved → published.</li><li>4. Link every consuming guide, assessment, proposal, or Operator Note to this record.</li><li>5. When Experience, Problem, Pattern, and Framework registries are implemented, add typed links here; do not maintain temporary duplicate lists.</li></ol></section>
    </main>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="rounded-lg border border-border bg-surface p-5"><h2 className="text-sm font-semibold uppercase tracking-wide text-primary">{title}</h2><div className="mt-3 text-sm leading-6 text-muted">{children}</div></article>;
}

function List({ value }: { value: unknown }) {
  const items = Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  return <ul className="list-disc space-y-1 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
