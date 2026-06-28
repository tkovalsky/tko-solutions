import type { Metadata } from "next";
import Link from "next/link";
import { tifDb } from "@/lib/tif/db";

export const metadata: Metadata = {
  title: "TIF Content Inventory",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const REPO_ORDER = ["tko-site", "rachel-realestate", "cre-intelligence"];

export default async function ContentInventoryPage() {
  const items = await tifDb.contentInventoryItem.findMany({
    orderBy: [{ repo: "asc" }, { assetType: "asc" }, { title: "asc" }],
  });

  const byRepo = new Map<string, typeof items>();
  for (const item of items) {
    byRepo.set(item.repo, [...(byRepo.get(item.repo) ?? []), item]);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        ← Back to console
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF v0.2 — Priority 2
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Content Inventory ({items.length})</h1>
        <p className="mt-2 max-w-[65ch] text-sm text-muted">
          Existing intellectual property across <code>tko-site</code>, <code>rachel-realestate</code>,
          and <code>cre-intelligence</code> — captured by <code>npm run tif:inventory</code>
          (<code>scripts/tif/inventory-scan.mjs</code>). Not yet linked to Evidence/Opportunity/Asset
          traceability — that mapping is a future EPIC 12 deliverable.
        </p>
      </header>

      {REPO_ORDER.map((repo) => {
        const repoItems = byRepo.get(repo) ?? [];
        if (repoItems.length === 0) return null;
        return (
          <section key={repo} className="mb-12">
            <h2 className="mb-4 text-lg font-semibold">
              {repo} <span className="text-muted">({repoItems.length})</span>
            </h2>
            <div className="divide-y divide-border rounded-xl border border-border bg-white">
              {repoItems.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted">{item.location}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 text-xs text-muted">
                    <span className="rounded-full border border-border px-2 py-0.5">{item.assetType}</span>
                    <span className="rounded-full border border-border px-2 py-0.5">{item.businessUnit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
