import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buildFeatureIntelligence,
  buildProofRegistry,
  changelogForFeature,
  webPath,
} from "@/lib/tif/proof";

export const metadata: Metadata = {
  title: "TIF Feature Proof",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function FeatureProofPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = buildFeatureIntelligence().find((item) => item.slug === slug);
  if (!feature) notFound();

  const proofById = new Map(buildProofRegistry().map((proof) => [proof.id, proof]));
  const relatedProof = feature.relatedProof.map((id) => proofById.get(id)).filter(Boolean);
  const changelog = changelogForFeature(feature.slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif/proof" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to proof hub
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Feature Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{feature.title}</h1>
        <p className="mt-3 text-sm text-muted">
          Status: <span className="font-semibold uppercase">{feature.status}</span>
        </p>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <InfoBlock title="Problem" body={feature.problem} />
        <InfoBlock title="Solution" body={feature.solution} />
        <InfoBlock title="Architecture" body={feature.architecture} />
        <InfoBlock title="Business Impact" body={feature.businessImpact} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedProof.flatMap((proof) =>
            (proof?.screenshotPaths ?? []).map((screenshot) => (
              <Image
                key={`${proof?.id}-${screenshot}`}
                src={webPath(screenshot)}
                alt={proof?.title ?? "Proof screenshot"}
                width={1200}
                height={750}
                className="aspect-[16/10] w-full rounded-lg border border-border object-cover"
              />
            )),
          )}
          {relatedProof.every((proof) => (proof?.screenshotPaths ?? []).length === 0) && (
            <p className="text-sm text-muted">No screenshot is linked to this feature yet.</p>
          )}
        </div>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <RelationshipList title="Related Features" items={feature.relatedFeatures} basePath="/tif/proof/features" />
        <RelationshipList title="Related Decisions" items={feature.relatedDecisions} basePath="/tif/proof/decisions" />
        <RelationshipList title="Changelog" items={changelog} basePath="/tif/proof/changelog" />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Related Proof</h2>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {relatedProof.map((proof) => (
            <article key={proof?.id} className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{proof?.type}</p>
              <h3 className="mt-1 font-semibold">{proof?.title}</h3>
              <p className="mt-2 text-sm text-muted">{proof?.description}</p>
              {proof?.claimGuard && <p className="mt-2 text-xs text-muted">Guard: {proof.claimGuard}</p>}
            </article>
          ))}
        </div>
      </section>

      <SourceList sources={feature.sourceRefs} />
    </main>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
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
