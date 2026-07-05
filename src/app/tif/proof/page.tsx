import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  buildArchitectureIntelligence,
  buildChangelogIntelligence,
  buildDecisionIntelligence,
  buildFeatureIntelligence,
  buildProofRegistry,
  computeEvidenceCoverage,
  webPath,
} from "@/lib/tif/proof";

export const metadata: Metadata = {
  title: "TIF Proof Hub",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function TifProofHubPage() {
  const coverage = computeEvidenceCoverage();
  const proofs = buildProofRegistry();
  const features = buildFeatureIntelligence();
  const decisions = buildDecisionIntelligence();
  const architecture = buildArchitectureIntelligence();
  const changelog = buildChangelogIntelligence();
  const screenshots = proofs.filter((proof) => (proof.screenshotPaths ?? []).length > 0);
  const caseStudies = proofs.filter((proof) => proof.type === "Case Study" || proof.type === "Sales Asset");

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        Back to console
      </Link>

      <header className="mt-4 mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF Proof Factory
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Evidence → Proof → Documentation → Demonstration</h1>
        <p className="mt-3 max-w-[75ch] text-sm leading-6 text-muted">
          A computed read model over existing evidence YAML, screenshots, decisions, architecture
          docs, implementation reports, and audits. No schema changes, vector search, agents,
          publishing workflow, or autonomous generation.
        </p>
      </header>

      <section className="mb-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Metric label="Proof Assets" value={coverage.proofAssets} />
        <Metric label="Decisions" value={coverage.decisions} />
        <Metric label="Audits" value={coverage.audits} />
        <Metric label="Screenshots" value={coverage.screenshots} />
        <Metric label="Architecture Docs" value={coverage.architectureDocuments} />
        <Metric label="Source Links" value={coverage.sourceRelationships} />
      </section>

      <section className="mb-12 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">Proof Flow</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Existing TIF remains Knowledge → Insight → Deliverable → Channel Package → Publication
          → Measurement. This layer adds proof visibility by making Evidence → Proof →
          Documentation → Demonstration → Publication discoverable from the same source material.
        </p>
      </section>

      <HubSection title="Screenshots" count={screenshots.length}>
        <div className="grid gap-4 md:grid-cols-2">
          {screenshots.map((proof) => (
            <article key={proof.id} className="rounded-lg border border-border bg-white p-4">
              {proof.screenshotPaths?.[0] && (
                <Image
                  src={webPath(proof.screenshotPaths[0])}
                  alt={proof.title}
                  width={1200}
                  height={750}
                  className="mb-3 aspect-[16/10] w-full rounded-md border border-border object-cover"
                />
              )}
              <h3 className="font-semibold">{proof.title}</h3>
              <p className="mt-1 text-sm text-muted">{proof.description}</p>
              <ProofMeta proofId={proof.id} featureCount={proof.relatedFeatures.length} />
            </article>
          ))}
        </div>
      </HubSection>

      <HubSection title="Features" count={features.length}>
        <div className="grid gap-3 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.slug}
              href={`/tif/proof/features/${feature.slug}`}
              className="rounded-lg border border-border bg-white p-4 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{feature.title}</h3>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs uppercase text-muted">
                  {feature.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{feature.problem}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {feature.relatedProof.length} proof link(s) · {feature.sourceRefs.length} source(s)
              </p>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Decisions" count={decisions.length}>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {decisions.map((decision) => (
            <Link key={decision.id} href={`/tif/proof/decisions/${decision.id}`} className="block p-4 hover:bg-surface">
              <h3 className="font-semibold">{decision.title}</h3>
              <p className="mt-1 text-sm text-muted">{decision.decision}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-muted">
                {decision.relatedFeatures.length} feature(s) · {decision.relatedScreenshots.length} screenshot(s)
              </p>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Architecture" count={architecture.length}>
        <div className="grid gap-3 md:grid-cols-2">
          {architecture.map((entry) => (
            <Link
              key={entry.slug}
              href={`/tif/proof/architecture/${entry.slug}`}
              className="rounded-lg border border-border bg-white p-4 hover:border-primary/40"
            >
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="mt-2 text-sm text-muted">{entry.overview}</p>
              <p className="mt-3 font-mono text-xs text-muted">{entry.diagram}</p>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Changelog" count={changelog.length}>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {changelog.map((entry) => (
            <Link key={entry.slug} href={`/tif/proof/changelog/${entry.slug}`} className="block p-4 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{entry.date}</p>
              <h3 className="mt-1 font-semibold">{entry.release}</h3>
              <p className="mt-1 text-sm text-muted">{entry.changes[0]}</p>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Case Studies" count={caseStudies.length}>
        <div className="grid gap-3 md:grid-cols-2">
          {caseStudies.map((proof) => (
            <article key={proof.id} className="rounded-lg border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{proof.type}</p>
              <h3 className="mt-1 font-semibold">{proof.title}</h3>
              <p className="mt-2 text-sm text-muted">{proof.description}</p>
              <SourceList sources={proof.sourceRefs} />
            </article>
          ))}
        </div>
      </HubSection>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function HubSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-semibold">
        {title} <span className="text-muted">({count})</span>
      </h2>
      {children}
    </section>
  );
}

function ProofMeta({ proofId, featureCount }: { proofId: string; featureCount: number }) {
  return (
    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {proofId} · {featureCount} feature link(s)
    </p>
  );
}

function SourceList({ sources }: { sources: Array<{ label: string; path: string }> }) {
  return (
    <p className="mt-3 text-xs text-muted">
      Sources: {sources.map((source) => source.path).join(", ")}
    </p>
  );
}
