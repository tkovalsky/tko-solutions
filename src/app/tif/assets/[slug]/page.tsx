import { readFile } from "node:fs/promises";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAssetManualEditState, formatAssetDate } from "@/lib/tif/manual-edit-protection";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "TIF Asset",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export default async function TifAssetDetailPage({ params }: Params) {
  const { slug } = await params;

  const asset = await tifDb.asset.findUnique({
    where: { slug },
    include: {
      opportunity: { select: { slug: true, title: true } },
      evidenceLinks: { include: { evidence: true } },
    },
  });

  if (!asset) {
    notFound();
  }

  const editState = await getAssetManualEditState(asset);

  let markdown: string;
  try {
    markdown = await readFile(asset.outputPath, "utf8");
  } catch {
    markdown = `_Could not read ${asset.outputPath} from disk — the Asset row exists but the file is missing._`;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        ← Back to console
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-semibold">{asset.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {asset.assetType} · {asset.status} · {asset.businessUnit} · {asset.outputPath}
        </p>
        <p className="mt-3 text-xs text-muted">
          Evidence:{" "}
          {asset.evidenceLinks.map(({ evidence }, i) => (
            <span key={evidence.slug}>
              {i > 0 && ", "}
              {evidence.domain}:{evidence.slug}
            </span>
          ))}
          {" · "}Opportunity: {asset.opportunity ? asset.opportunity.title : "—"}
        </p>
        <div className="mt-4 rounded-lg border border-border bg-surface p-4 text-sm">
          <p className={`font-semibold ${editState.isManuallyEdited ? "text-warning" : "text-success"}`}>
            {editState.isManuallyEdited ? "Manually Edited" : "Generated"}
          </p>
          <p className="mt-1 text-xs text-muted">Last Generated: {formatAssetDate(editState.generatedAt)}</p>
          {editState.isManuallyEdited && (
            <p className="text-xs text-muted">Last Edited: {formatAssetDate(editState.lastEditedAt)}</p>
          )}
        </div>
      </header>

      <article className="whitespace-pre-wrap rounded-xl border border-border bg-white p-6 font-mono text-sm leading-6">
        {markdown}
      </article>
    </main>
  );
}
