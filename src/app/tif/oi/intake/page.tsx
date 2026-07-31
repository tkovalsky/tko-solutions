import type { Metadata } from "next";
import type { ReactNode } from "react";
import { tifDb } from "@/lib/tif/db";
import { captureManualIntake } from "./actions";

export const metadata: Metadata = {
  title: "POIS Intake",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type IntakePageProps = {
  searchParams: Promise<{
    capture?: "created" | "duplicate" | "reviewed";
    error?: string;
    sourceId?: string;
    opportunityId?: string;
  }>;
};

type ReviewResult = Awaited<ReturnType<typeof getReviewResult>>;

const inputClass =
  "w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm text-foreground";

async function getReviewResult(sourceId?: string, opportunityId?: string) {
  if (!sourceId || !opportunityId) {
    return null;
  }

  return tifDb.oiOpportunity.findUnique({
    where: { id: opportunityId },
    include: {
      organization: true,
      facts: {
        where: { evidence: { sourceId } },
        include: {
          evidence: {
            select: {
              excerpt: true,
              startOffset: true,
              endOffset: true,
            },
          },
        },
        orderBy: [{ field: "asc" }, { ordinal: "asc" }],
      },
      researchGaps: {
        orderBy: [{ status: "asc" }, { createdAt: "asc" }],
      },
      sources: {
        where: { id: sourceId },
        take: 1,
      },
    },
  });
}

export default async function OiIntakePage({ searchParams }: IntakePageProps) {
  const params = await searchParams;
  const review = await getReviewResult(params.sourceId, params.opportunityId);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-md border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Manual intake
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Capture an opportunity signal</h2>

          {params.error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {params.error}
            </p>
          ) : null}

          <form action={captureManualIntake} noValidate className="mt-6 grid gap-4">
            <Field label="Source content">
              <textarea
                name="rawContent"
                required
                minLength={200}
                rows={10}
                className={inputClass}
                placeholder="Paste the public posting, announcement, referral note, or other source text."
              />
            </Field>

            <Field label="Source URL / reference">
              <input
                name="canonicalUrl"
                type="url"
                className={inputClass}
                placeholder="https://example.com/opportunity"
              />
            </Field>

            <Field label="Organization">
              <input name="organizationName" required className={inputClass} placeholder="Rula" />
            </Field>

            <Field label="Role / context">
              <input
                name="title"
                required
                className={inputClass}
                placeholder="Director, Healthcare Transformation"
              />
            </Field>

            <button
              type="submit"
              className="rounded-md bg-[#17375e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2948]"
            >
              Capture
            </button>
          </form>
        </section>

        <section className="min-w-0">
          {params.capture === "duplicate" && review ? (
            <DuplicateNotice review={review} sourceId={params.sourceId} opportunityId={params.opportunityId} />
          ) : null}
          {review ? <ReviewPanel review={review} /> : <EmptyReview />}
        </section>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}

function EmptyReview() {
  return (
    <div className="rounded-md border border-dashed border-border bg-white p-6 text-sm text-muted">
      Captured facts and research gaps will appear here after a valid source is submitted.
    </div>
  );
}

function DuplicateNotice({
  review,
  sourceId,
  opportunityId,
}: {
  review: NonNullable<ReviewResult>;
  sourceId?: string;
  opportunityId?: string;
}) {
  return (
    <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-semibold">This source has already been captured.</p>
      <p className="mt-1">
        Existing capture: {review.organization.name} · {review.title}
      </p>
      <form action={captureManualIntake} className="mt-3">
        <input type="hidden" name="intent" value="reviewDuplicate" />
        <input type="hidden" name="sourceId" value={sourceId} />
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <button
          type="submit"
          className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-sm font-semibold text-amber-950"
        >
          Capture anyway
        </button>
      </form>
    </div>
  );
}

function ReviewPanel({ review }: { review: NonNullable<ReviewResult> }) {
  return (
    <div className="grid gap-5">
      <section className="rounded-md border border-border bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Extracted facts
        </p>
        <h2 className="mt-1 text-xl font-semibold">
          {review.organization.name} · {review.title}
        </h2>

        {review.facts.length > 0 ? (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted">
                  <th className="py-2 pr-3">Field</th>
                  <th className="py-2 pr-3">Value</th>
                  <th className="py-2 pr-3">Confidence</th>
                  <th className="py-2">Source quote</th>
                </tr>
              </thead>
              <tbody>
                {review.facts.map((fact) => (
                  <tr key={fact.id} className="border-b border-border align-top">
                    <td className="py-3 pr-3 font-medium">{humanize(fact.field)}</td>
                    <td className="py-3 pr-3">{fact.value}</td>
                    <td className="py-3 pr-3">{fact.confidence}%</td>
                    <td className="py-3">
                      <details>
                        <summary className="cursor-pointer text-[#17375e]">Show quote</summary>
                        <blockquote className="mt-2 rounded-md bg-[#f7f8fb] p-3 text-muted">
                          {fact.evidence?.excerpt}
                        </blockquote>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">No facts were extracted from this source.</p>
        )}
      </section>

      <section className="rounded-md border border-border bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Research gaps
        </p>
        {review.researchGaps.length > 0 ? (
          <ul className="mt-4 grid gap-3">
            {review.researchGaps.map((gap) => (
              <li key={gap.id} className="rounded-md border border-border p-3">
                <p className="font-medium">{gap.question}</p>
                <p className="mt-1 text-sm text-muted">{gap.reason}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">No open research gaps remain for this source.</p>
        )}
      </section>
    </div>
  );
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}
