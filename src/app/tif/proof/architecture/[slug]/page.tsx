import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildArchitectureIntelligence } from "@/lib/tif/proof";

export const metadata: Metadata = {
  title: "TIF Architecture Proof",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ArchitectureProofPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = buildArchitectureIntelligence().find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif/proof" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to proof hub
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Architecture Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{page.title}</h1>
        <p className="mt-3 max-w-[70ch] text-sm leading-6 text-muted">{page.overview}</p>
      </header>

      <section className="mb-10 rounded-lg border border-border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">Diagram</h2>
        <p className="mt-4 overflow-x-auto rounded-md bg-surface p-4 font-mono text-sm text-muted">
          {page.diagram}
        </p>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <FlowList title="Data Flow" items={page.dataFlow} />
        <FlowList title="Decision Flow" items={page.decisionFlow} />
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <RelationshipList title="Related Features" items={page.relatedFeatures} basePath="/tif/proof/features" />
        <RelationshipList title="Related Decisions" items={page.relatedDecisions} basePath="/tif/proof/decisions" />
        <RelationshipList title="Related Proof" items={page.relatedProof} basePath="/tif/proof#proof" />
      </section>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold">Sources</h2>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {page.sourceRefs.map((source) => (
            <li key={source.path}>{source.path}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function FlowList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">{title}</h2>
      <ol className="mt-3 space-y-2 text-sm leading-6 text-muted">
        {items.map((item, index) => (
          <li key={item}>
            {index + 1}. {item}
          </li>
        ))}
      </ol>
    </section>
  );
}

function RelationshipList({ title, items, basePath }: { title: string; items: string[]; basePath: string }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) =>
          basePath.includes("#") ? (
            <p key={item}>{item}</p>
          ) : (
            <Link key={item} href={`${basePath}/${item}`} className="block underline-offset-2 hover:underline">
              {item}
            </Link>
          ),
        )}
        {items.length === 0 && <p>None linked.</p>}
      </div>
    </section>
  );
}
