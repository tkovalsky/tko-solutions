import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildChangelogIntelligence } from "@/lib/tif/proof";

export const metadata: Metadata = {
  title: "TIF Changelog Proof",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ChangelogProofPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = buildChangelogIntelligence().find((item) => item.slug === slug);
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif/proof" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to proof hub
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Changelog Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{entry.release}</h1>
        <p className="mt-3 text-sm text-muted">{entry.date}</p>
      </header>

      <section className="mb-10 rounded-lg border border-border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">Changes</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
          {entry.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <RelationshipList title="Related Features" items={entry.relatedFeatures} basePath="/tif/proof/features" />
        <RelationshipList title="Related Decisions" items={entry.relatedDecisions} basePath="/tif/proof/decisions" />
        <RelationshipList title="Related Screenshots" items={entry.relatedScreenshots} basePath="" />
      </section>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold">Sources</h2>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {entry.sourceRefs.map((source) => (
            <li key={source.path}>{source.path}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function RelationshipList({ title, items, basePath }: { title: string; items: string[]; basePath: string }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) =>
          basePath ? (
            <Link key={item} href={`${basePath}/${item}`} className="block underline-offset-2 hover:underline">
              {item}
            </Link>
          ) : (
            <p key={item}>{item}</p>
          ),
        )}
        {items.length === 0 && <p>None linked.</p>}
      </div>
    </section>
  );
}
