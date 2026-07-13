import type { Metadata } from "next";
import Link from "next/link";
import { BusinessUnit, ContentTenant } from "@prisma/client";
import { tifDb } from "@/lib/tif/db";
import { CLAIM_STATUS_LABELS, KNOWLEDGE_DIAGRAM_FORMAT_LABELS } from "@/lib/tif/knowledge-diagrams";
import { createKnowledgeDiagram } from "./actions";

export const metadata: Metadata = {
  title: "TIF Knowledge Diagrams",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function KnowledgeDiagramsPage() {
  const [diagrams, evidence] = await Promise.all([
    tifDb.knowledgeDiagram.findMany({
      orderBy: { knowledgeId: "asc" },
      include: {
        asset: { include: { _count: { select: { evidenceLinks: true } } } },
        _count: { select: { diagramLinks: true } },
      },
    }),
    tifDb.evidence.findMany({ orderBy: [{ domain: "asc" }, { slug: "asc" }], select: { slug: true } }),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">← Back to console</Link>
      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">TIF Knowledge Diagram Registry</p>
        <h1 className="mt-2 text-3xl font-semibold">Executive diagrams are reusable, traceable assets.</h1>
        <p className="mt-3 max-w-[72ch] text-sm leading-6 text-muted">A Knowledge Diagram is an Asset subtype. Its parent Asset owns versions, review status, evidence links, and channel derivatives; the diagram record owns purpose, audience, business problem, inputs, outputs, and claim boundary.</p>
      </header>

      <section className="mb-12 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-xl font-semibold">Register a Knowledge Diagram</h2>
        <p className="mt-2 text-sm text-muted">This creates a draft Asset and opportunity. Use the existing Asset workflow to compose the diagram specification, request revisions, approve, and publish.</p>
        <form action={createKnowledgeDiagram} className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Title"><input name="title" required className="rounded-md border border-input-border px-3 py-2" placeholder="Executive Dependency Map" /></Field>
          <Field label="Diagram format"><select name="diagramFormat" className="rounded-md border border-input-border px-3 py-2" defaultValue="dependency_map">{Object.entries(KNOWLEDGE_DIAGRAM_FORMAT_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
          <Field label="Tenant"><select name="tenant" className="rounded-md border border-input-border px-3 py-2" defaultValue="tko">{Object.entries(ContentTenant).filter(([key]) => Number.isNaN(Number(key))).map(([, value]) => <option key={value} value={value}>{value}</option>)}</select></Field>
          <Field label="Business unit"><select name="businessUnit" className="rounded-md border border-input-border px-3 py-2" defaultValue="tko">{Object.entries(BusinessUnit).filter(([key]) => Number.isNaN(Number(key))).map(([, value]) => <option key={value} value={value}>{value}</option>)}</select></Field>
          <Field label="Executive audience"><input name="executiveAudience" required className="rounded-md border border-input-border px-3 py-2" placeholder="CEO, COO, transformation leader" /></Field>
          <Field label="Evidence status"><select name="evidenceStatus" className="rounded-md border border-input-border px-3 py-2" defaultValue="experience_based">{Object.entries(CLAIM_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
          <Field label="Purpose" wide><textarea name="purpose" required rows={3} className="rounded-md border border-input-border px-3 py-2" /></Field>
          <Field label="Business problem" wide><textarea name="businessProblem" required rows={3} className="rounded-md border border-input-border px-3 py-2" /></Field>
          <Field label="Inputs (one per line)" wide><textarea name="inputs" required rows={4} className="rounded-md border border-input-border px-3 py-2" placeholder="Evidence record or source artifact" /></Field>
          <Field label="Outputs (one per line)" wide><textarea name="outputs" required rows={4} className="rounded-md border border-input-border px-3 py-2" placeholder="Executive decision or understanding" /></Field>
          <Field label="Claim boundary" wide><textarea name="claimBoundary" required rows={3} className="rounded-md border border-input-border px-3 py-2" /></Field>
          <Field label="Evidence slugs (one per line; optional)" wide><textarea name="evidenceSlugs" rows={3} className="rounded-md border border-input-border px-3 py-2" placeholder={evidence.slice(0, 3).map((item) => item.slug).join("\n")} /></Field>
          <div className="md:col-span-2"><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Create draft diagram</button></div>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Diagram registry ({diagrams.length})</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {diagrams.map((diagram) => <article key={diagram.id} className="rounded-lg border border-border bg-white p-5">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-primary">{diagram.knowledgeId} · {KNOWLEDGE_DIAGRAM_FORMAT_LABELS[diagram.diagramFormat]}</p><h3 className="mt-2 text-xl font-semibold">{diagram.asset.title}</h3></div><span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase text-muted">{diagram.asset.status}</span></div>
            <p className="mt-3 text-sm leading-6 text-muted">{diagram.purpose}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs"><div><dt className="text-muted">Evidence</dt><dd className="mt-1 font-semibold">{diagram.asset._count.evidenceLinks}</dd></div><div><dt className="text-muted">Referenced by assets</dt><dd className="mt-1 font-semibold">{diagram._count.diagramLinks}</dd></div><div><dt className="text-muted">Evidence status</dt><dd className="mt-1 font-semibold">{CLAIM_STATUS_LABELS[diagram.evidenceStatus]}</dd></div></dl>
            <Link href={`/tif/diagrams/${diagram.asset.slug}`} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">Review diagram →</Link>
          </article>)}
          {diagrams.length === 0 ? <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted">No Knowledge Diagrams registered. Use the P0 backlog as reviewed candidates; do not bulk-create them without evidence review.</p> : null}
        </div>
      </section>
    </main>
  );
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={`grid gap-1 text-sm ${wide ? "md:col-span-2" : ""}`}><span className="font-semibold">{label}</span>{children}</label>;
}
