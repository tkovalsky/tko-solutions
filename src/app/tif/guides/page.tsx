import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsights } from "@/lib/insights";
import { validateGuide } from "@/lib/guide-validation";
import { buildRepurposingPack } from "@/lib/tif/repurposing";
import { getGuideCluster, guideClusters } from "@/lib/guide-clusters";
import { getOffer } from "@/lib/offers";

export const metadata: Metadata = {
  title: "TIF Guide Workbench",
  robots: { index: false, follow: false },
};

// Repository-native: guides are markdown on disk, so this reads the filesystem at
// request time rather than a database. No new storage was introduced for TIF.
export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-100 text-emerald-800",
  in_review: "bg-amber-100 text-amber-800",
  draft: "bg-gray-100 text-gray-700",
};

export default function TifGuidesPage() {
  const guides = getAllInsights();
  const results = guides.map((guide) => ({
    guide,
    validation: validateGuide(guide),
    pack: buildRepurposingPack(guide, guides),
  }));

  const blocked = results.filter((result) => result.validation.issues.length > 0);
  const publishedCount = guides.filter((guide) => guide.published).length;
  const coverage = guideClusters.map((cluster) => ({
    cluster,
    count: guides.filter((guide) => guide.published && guide.brief.cluster === cluster.slug).length,
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold">Guide Workbench</h1>
        <p className="mt-3 max-w-[70ch] text-sm leading-6 text-muted">
          Every guide in <code>src/content/insights</code>, its publication-gate status, and its
          repurposing pack. Packs are deterministic drafts derived from the guide brief — edit
          before use. Nothing here publishes, sends, or schedules anything.
        </p>
        <p className="mt-4 text-sm font-semibold">
          {publishedCount} published · {guides.length - publishedCount} draft/in-review ·{" "}
          {blocked.length === 0 ? "gate clean" : `${blocked.length} blocked by the gate`}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Cluster coverage</h2>
        <p className="mt-2 text-sm text-muted">
          One pillar guide per cluster. Supporting guides only where they answer a distinct
          question — a second guide with the same search intent cannibalizes the first.
        </p>
        <table className="mt-5 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Cluster</th>
              <th className="py-2 pr-4 font-semibold">Published</th>
              <th className="py-2 font-semibold">Executive problem</th>
            </tr>
          </thead>
          <tbody>
            {coverage.map(({ cluster, count }) => (
              <tr key={cluster.slug} className="border-b border-border/60 align-top">
                <td className="py-2 pr-4 font-medium">{cluster.name}</td>
                <td className="py-2 pr-4">
                  {count === 0 ? <span className="text-muted">none</span> : count}
                </td>
                <td className="py-2 text-muted">{cluster.executiveProblem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-12 space-y-8">
        <h2 className="text-xl font-semibold">Guides</h2>
        {results.map(({ guide, validation, pack }) => {
          const cluster = getGuideCluster(guide.brief.cluster ?? "");
          const offer = getOffer(guide.brief.offer ?? "");

          return (
            <article key={guide.slug} className="border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {guide.slug} · {guide.wordCount} words · {guide.sourceCount} sources
                    {guide.brief.reviewer ? ` · reviewed by ${guide.brief.reviewer}` : ""}
                    {guide.brief.reviewedDate ? ` on ${guide.brief.reviewedDate}` : ""}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                    STATUS_STYLES[guide.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {guide.status}
                </span>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-muted">Cluster</dt>
                  <dd>{cluster?.name ?? <span className="text-muted">unassigned</span>}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Offer</dt>
                  <dd>{offer?.name ?? <span className="text-muted">unmapped</span>}</dd>
                </div>
              </dl>

              {validation.issues.length > 0 ? (
                <div className="mt-4 border-l-2 border-amber-500 bg-amber-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                    Blocked by the publication gate
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-amber-900">
                    {validation.issues.map((issue) => (
                      <li key={`${issue.field}-${issue.message}`}>
                        <span className="font-mono">{issue.field}</span> — {issue.message}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {guide.published ? (
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Repurposing pack (drafts — edit before use)
                  </summary>
                  <div className="mt-4 space-y-4 text-sm">
                    <Pack label="Personalized outreach excerpt" body={pack.outreachExcerpt} />
                    <Pack label="Executive email angle" body={pack.executiveEmailAngle} />
                    <Pack label="Professional-network post" body={pack.networkPost} />
                    <Pack label="Proposal-support excerpt" body={pack.proposalExcerpt} />
                    <PackList label="Conversation prompts" items={pack.conversationPrompts} />
                    <PackList label="Future guide questions" items={pack.futureGuideQuestions} />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Suggested internal links
                      </p>
                      <ul className="mt-2 space-y-1">
                        {pack.suggestedInternalLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className="text-primary underline-offset-4 hover:underline">
                              {link.label}
                            </Link>
                            <span className="text-muted"> — {link.reason}</span>
                          </li>
                        ))}
                        {pack.suggestedInternalLinks.length === 0 ? (
                          <li className="text-muted">None yet — this cluster has no sibling guide.</li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </details>
              ) : null}
            </article>
          );
        })}
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-xs leading-5 text-muted">
        <p>
          Record which guide influenced which conversation in{" "}
          <code>content/feedback/guide-usage.csv</code>. Qualified conversations influenced,
          replies, and proposals supported are the metrics that matter — page views alone are not
          a success measure.
        </p>
      </footer>
    </main>
  );
}

function Pack({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap border border-border bg-surface p-3 text-xs leading-5">
        {body}
      </pre>
    </div>
  );
}

function PackList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {items.length === 0 ? <li className="text-muted">None.</li> : null}
      </ul>
    </div>
  );
}
