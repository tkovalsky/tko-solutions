import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildDecisionIntelligence, webPath } from "@/lib/tif/proof";

export const metadata: Metadata = {
  title: "TIF Decision Proof",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DecisionProofPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decision = buildDecisionIntelligence().find((item) => item.id === id);
  if (!decision) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif/proof" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to proof hub
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Decision Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{decision.title}</h1>
        <p className="mt-3 text-sm text-muted">Source decision: {decision.id}</p>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <InfoBlock title="Problem" body={decision.problem} />
        <InfoBlock title="Decision" body={decision.decision} />
        <InfoBlock title="Implementation" body={decision.implementation} />
        <InfoBlock title="Impact" body={decision.impact} />
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <RelationshipList title="Related Features" items={decision.relatedFeatures} basePath="/tif/proof/features" />
        <RelationshipList title="Related Changelog" items={decision.relatedChangelogEntries} basePath="/tif/proof/changelog" />
        <SourceList sources={decision.sourceRefs} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Related Screenshots</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {decision.relatedScreenshots.map((screenshot) => (
            <Image
              key={screenshot}
              src={webPath(screenshot)}
              alt={decision.title}
              width={1200}
              height={750}
              className="aspect-[16/10] w-full rounded-lg border border-border object-cover"
            />
          ))}
          {decision.relatedScreenshots.length === 0 && (
            <p className="text-sm text-muted">No screenshot is linked to this decision yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">{title}</h2>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted">{body || "Not separated in source decision."}</p>
    </section>
  );
}

function RelationshipList({ title, items, basePath }: { title: string; items: string[]; basePath: string }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <Link key={item} href={`${basePath}/${item}`} className="block underline-offset-2 hover:underline">
            {item}
          </Link>
        ))}
        {items.length === 0 && <p>None linked.</p>}
      </div>
    </section>
  );
}

function SourceList({ sources }: { sources: Array<{ label: string; path: string }> }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-sm font-semibold">Sources</h2>
      <ul className="mt-3 space-y-1 text-sm text-muted">
        {sources.map((source) => (
          <li key={source.path}>{source.path}</li>
        ))}
      </ul>
    </section>
  );
}
