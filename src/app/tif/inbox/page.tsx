import type { Metadata } from "next";
import Link from "next/link";
import { tifDb } from "@/lib/tif/db";
import { createCaptureItem } from "./actions";

export const metadata: Metadata = {
  title: "TIF Capture Inbox",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const SOURCES = [
  "conversation",
  "phone_call",
  "client_work",
  "healthcare",
  "cre",
  "rachel",
  "reddit",
  "linkedin",
  "web_research",
  "personal_observation",
] as const;

export default async function CaptureInboxPage() {
  const items = await tifDb.captureItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        ← Back to console
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          TIF v0.2 — Priority 1
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Capture Inbox</h1>
        <p className="mt-2 max-w-[60ch] text-sm text-muted">
          Capture first, organize later. No AI, no classification, no opportunity generation —
          and no editing after creation. If you got it wrong, capture a new item rather than
          fix this one.
        </p>
      </header>

      <form action={createCaptureItem} className="space-y-4 rounded-xl border border-border bg-white p-6">
        <Field label="Title">
          <input
            name="title"
            required
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="One line — what happened"
          />
        </Field>

        <Field label="Observation">
          <textarea
            name="observation"
            required
            rows={4}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="What you noticed, in your own words"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business Unit (optional)">
            <select name="businessUnit" defaultValue="" className="w-full rounded-lg border border-border px-3 py-2 text-sm">
              <option value="">— not yet classified —</option>
              <option value="rachel">rachel</option>
              <option value="cre">cre</option>
              <option value="tko">tko</option>
            </select>
          </Field>

          <Field label="Source">
            <select name="source" required defaultValue="" className="w-full rounded-lg border border-border px-3 py-2 text-sm">
              <option value="" disabled>
                select a source
              </option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Tags (optional, comma-separated)">
          <input name="tags" className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder="human-api, pa, denial" />
        </Field>

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          Capture
        </button>
      </form>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">
          Captured ({items.length})
        </h2>
        <div className="divide-y divide-border rounded-xl border border-border bg-white">
          {items.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
                  {item.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{item.observation}</p>
              <p className="mt-2 text-xs text-muted">
                {item.source}
                {item.businessUnit ? ` · ${item.businessUnit}` : " · unclassified"}
                {item.tags.length > 0 ? ` · ${item.tags.join(", ")}` : ""}
              </p>
            </div>
          ))}
          {items.length === 0 && <p className="p-4 text-sm text-muted">Nothing captured yet.</p>}
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
