"use client";

import Link from "next/link";

export default function OiError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="rounded-md border border-red-200 bg-red-50 p-6 text-red-950">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">Opportunity Intelligence</p>
        <h2 className="mt-2 text-2xl font-semibold">Something blocked this action.</h2>
        <p className="mt-3 text-sm">
          Try again, or return to Today and continue from the current queue.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <button type="button" onClick={reset} className="rounded-md bg-[#17375e] px-3 py-2 text-white">
            Try again
          </button>
          <Link href="/tif/oi/today" className="rounded-md border border-red-300 bg-white px-3 py-2">
            Back to Today
          </Link>
        </div>
      </section>
    </main>
  );
}
