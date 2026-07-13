import type { Metadata } from "next";
import Link from "next/link";
import { tifDb } from "@/lib/tif/db";
import { CLAIM_STATUS_LABELS, KNOWLEDGE_DIAGRAM_FORMAT_LABELS } from "@/lib/tif/knowledge-diagrams";

export const metadata: Metadata = {
  title: "Executive Diagram Library",
  description: "Evidence-bound executive diagrams for healthcare operations, delivery governance, AI controls, and operational intelligence.",
  alternates: { canonical: "/diagrams" },
  openGraph: { title: "Executive Diagram Library", description: "Evidence-bound operating models for executive decisions." },
};

export const dynamic = "force-dynamic";

export default async function ExecutiveDiagramLibraryPage() {
  const diagrams = await tifDb.knowledgeDiagram.findMany({
    where: { asset: { status: "published" } },
    orderBy: { knowledgeId: "asc" },
    include: { asset: { include: { _count: { select: { evidenceLinks: true } } } } },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">TKO Solutions · Executive Diagram Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Operating models built for the decisions behind complex work.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">Each published visual connects a business problem to operating constraints, decision rights, failure modes, and a bounded executive takeaway. Evidence level and claim boundary stay visible.</p>
      </header>
      {diagrams.length ? <div className="mt-12 grid gap-5 md:grid-cols-2">{diagrams.map((diagram) => <Link key={diagram.id} href={`/diagrams/${diagram.asset.slug}`} className="rounded-xl border border-border bg-white p-6 transition hover:border-primary hover:shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{diagram.knowledgeId} · {KNOWLEDGE_DIAGRAM_FORMAT_LABELS[diagram.diagramFormat]}</p><h2 className="mt-3 text-2xl font-semibold text-ink">{diagram.asset.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{diagram.purpose}</p><dl className="mt-5 flex gap-5 border-t border-border pt-4 text-xs"><div><dt className="text-muted">Evidence</dt><dd className="mt-1 font-semibold text-ink">{diagram.asset._count.evidenceLinks} linked record{diagram.asset._count.evidenceLinks === 1 ? "" : "s"}</dd></div><div><dt className="text-muted">Evidence level</dt><dd className="mt-1 font-semibold text-ink">{CLAIM_STATUS_LABELS[diagram.evidenceStatus]}</dd></div></dl></Link>)}</div> : <section className="mt-12 rounded-xl border border-border bg-surface p-7"><h2 className="text-xl font-semibold text-ink">Publication review in progress</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">The library uses a human approval gate. Diagrams appear here only after their evidence, labels, and claim boundaries are approved for public use.</p></section>}
    </div>
  );
}
