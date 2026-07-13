import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MermaidDiagram } from "@/components/site/mermaid-diagram";
import { diagramTextAlternative, extractMermaidSource } from "@/lib/tif/diagram-markdown";
import { tifDb } from "@/lib/tif/db";
import { CLAIM_STATUS_LABELS, KNOWLEDGE_DIAGRAM_FORMAT_LABELS } from "@/lib/tif/knowledge-diagrams";

type Params = { params: Promise<{ slug: string }> };

async function getPublishedDiagram(slug: string) {
  return tifDb.knowledgeDiagram.findFirst({
    where: { asset: { slug, status: "published" } },
    include: { asset: { include: { evidenceLinks: { include: { evidence: true } }, versions: { orderBy: { versionNumber: "desc" }, take: 1 } } } },
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const diagram = await getPublishedDiagram(slug);
  if (!diagram) return {};
  return { title: diagram.asset.title, description: diagram.purpose, alternates: { canonical: `/diagrams/${slug}` }, openGraph: { title: diagram.asset.title, description: diagram.purpose } };
}

export const dynamic = "force-dynamic";

export default async function ExecutiveDiagramPage({ params }: Params) {
  const { slug } = await params;
  const diagram = await getPublishedDiagram(slug);
  if (!diagram) notFound();
  const source = extractMermaidSource(diagram.asset.versions[0]?.body ?? "");
  const textAlternative = diagramTextAlternative({ title: diagram.asset.title, purpose: diagram.purpose, businessProblem: diagram.businessProblem, claimBoundary: diagram.claimBoundary });

  return <article className="mx-auto max-w-6xl px-6 py-16"><header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{diagram.knowledgeId} · {KNOWLEDGE_DIAGRAM_FORMAT_LABELS[diagram.diagramFormat]}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{diagram.asset.title}</h1><p className="mt-5 text-lg leading-8 text-muted">{diagram.purpose}</p></header><dl className="mt-8 grid gap-4 md:grid-cols-3"><Fact label="Evidence level" value={CLAIM_STATUS_LABELS[diagram.evidenceStatus]} /><Fact label="Executive audience" value={diagram.executiveAudience.join(", ")} /><Fact label="Publication status" value="Published after human review" /></dl><div className="mt-10">{source ? <MermaidDiagram source={source} title={diagram.asset.title} textAlternative={textAlternative} /> : <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">The reviewed diagram source is not available.</p>}</div><section className="mt-12 grid gap-5 md:grid-cols-2"><Panel title="Why this matters"><p>{diagram.businessProblem}</p></Panel><Panel title="Executive decision"><List values={diagram.outputs} /></Panel><Panel title="Claim boundary"><p>{diagram.claimBoundary}</p></Panel><Panel title="Evidence summary"><div className="grid gap-3">{diagram.asset.evidenceLinks.map(({ evidence }) => <div key={evidence.id} className="rounded-lg border border-border bg-white p-4"><p className="font-semibold text-ink">{evidence.domain}:{evidence.slug}</p><p className="mt-2">{evidence.observation}</p><p className="mt-2 text-xs"><strong>Boundary:</strong> {evidence.claimGuard}</p></div>)}</div></Panel></section></article>;
}

function Fact({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-border bg-surface p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</dt><dd className="mt-2 text-sm leading-6 text-ink">{value}</dd></div>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-xl border border-border bg-surface p-6"><h2 className="text-lg font-semibold text-ink">{title}</h2><div className="mt-3 text-sm leading-6 text-muted">{children}</div></section>; }
function List({ values }: { values: unknown }) { return <ul className="list-disc space-y-1 pl-5">{Array.isArray(values) ? values.map((value) => <li key={String(value)}>{String(value)}</li>) : null}</ul>; }
