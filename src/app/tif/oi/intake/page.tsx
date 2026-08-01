import type { Metadata } from "next";
import type { ReactNode } from "react";
import { classifyOpportunity } from "@/lib/opportunity-intelligence/commercial/classify-opportunity";
import { inferInitiatives } from "@/lib/opportunity-intelligence/intelligence/initiative-inference";
import { classifySignal, signalTypeLabel } from "@/lib/opportunity-intelligence/intake/classify-signal";
import { tifDb } from "@/lib/tif/db";
import {
  captureManualIntake,
  dismissSignal,
  promoteProposedInitiative,
  promoteSignal,
  watchAccount,
} from "./actions";

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
      organization: {
        include: {
          signals: {
            include: { source: true },
            orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
          },
          initiatives: true,
        },
      },
      facts: {
        where: { OR: [{ evidence: { sourceId } }, { opportunityId }] },
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
        include: {
          signals: true,
        },
        take: 1,
      },
      sourceLinks: {
        where: { sourceId },
        include: {
          source: {
            include: {
              signals: true,
            },
          },
        },
        take: 1,
      },
      currentScore: true,
      nextActions: {
        where: { status: "open" },
        orderBy: [{ createdAt: "asc" }],
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
  const source = review.sources[0] ?? review.sourceLinks[0]?.source;
  const signal = source?.signals[0] ?? null;
  const facts = review.facts.map((fact) => ({
    field: fact.field,
    value: fact.value,
    normalizedValue: fact.normalizedValue,
  }));
  const signalReview =
    source && signal
      ? classifySignal({
          sourceType: source.sourceType,
          title: review.title,
          rawContent: source.rawContent,
          canonicalUrl: source.canonicalUrl,
          occurredAt: source.publishedAt,
          retrievedAt: source.retrievedAt,
          organization: review.organization,
          facts,
        })
      : null;
  const opportunityCandidates =
    source && signal
      ? classifyOpportunity({
          sourceType: source.sourceType,
          signalType: signal.signalType,
          rawContent: source.rawContent,
          canonicalUrl: source.canonicalUrl,
          organization: review.organization,
          facts,
        })
      : [];
  const proposedInitiatives =
    signal && signalReview
      ? inferInitiatives({
          accountName: review.organization.name,
          signals: review.organization.signals,
          existingInitiatives: review.organization.initiatives,
        })
      : [];

  return (
    <div className="grid gap-5">
      {review.currentScore ? <ScoreSummary score={review.currentScore} /> : null}
      {review.nextActions[0] ? <NextActionSummary action={review.nextActions[0]} /> : null}

      {source && signal && signalReview ? (
        <section className="rounded-md border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Signal classification
          </p>
          <h2 className="mt-1 text-xl font-semibold">
            {tierDisplay(signalReview.tier)} · {signalTypeLabel(signalReview.signalType)} · strength{" "}
            {signalReview.strength}
          </h2>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-[#17375e]">
              Show classification reasons
            </summary>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              {signalReview.reasons.map((reason) => (
                <li key={reason}>• {reason}</li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}

      {proposedInitiatives.length > 0 ? (
        <section className="rounded-md border border-dashed border-[#17375e] bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Proposed initiative
              </p>
              <h2 className="mt-1 text-xl font-semibold">{proposedInitiatives[0].name}</h2>
            </div>
            <span className="rounded-full border border-[#17375e] bg-[#eef4fb] px-3 py-1 text-sm font-semibold text-[#17375e]">
              inferred · {proposedInitiatives[0].confidence.toFixed(2)}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{proposedInitiatives[0].hypothesis}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Supporting signals</p>
              <ul className="mt-2 grid gap-2 text-sm text-muted">
                {proposedInitiatives[0].supportingSignals.map((supportingSignal) => (
                  <li key={supportingSignal.id}>
                    {formatDate(supportingSignal.occurredAt ?? supportingSignal.createdAt)} ·{" "}
                    {supportingSignal.source?.canonicalUrl ? (
                      <a className="text-[#17375e] underline" href={supportingSignal.source.canonicalUrl}>
                        {supportingSignal.summary}
                      </a>
                    ) : (
                      supportingSignal.summary
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Likely owner roles</p>
              <ul className="mt-2 grid gap-2 text-sm text-muted">
                {proposedInitiatives[0].likelyOwnerRoles.map((role) => (
                  <li key={role}>• {role}</li>
                ))}
              </ul>
            </div>
          </div>
          {source ? (
            <form action={promoteProposedInitiative} className="mt-5">
              <input type="hidden" name="sourceId" value={source.id} />
              <input type="hidden" name="opportunityId" value={review.id} />
              <button
                type="submit"
                className="rounded-md bg-[#17375e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2948]"
              >
                Promote initiative
              </button>
            </form>
          ) : null}
        </section>
      ) : null}

      {source && signal ? (
        <section className="rounded-md border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Opportunity classification
          </p>
          <h2 className="mt-1 text-xl font-semibold">Review candidates</h2>
          {opportunityCandidates.length > 0 ? (
            <form action={promoteSignal} className="mt-4 grid gap-3">
              <input type="hidden" name="sourceId" value={source.id} />
              <input type="hidden" name="opportunityId" value={review.id} />
              {opportunityCandidates.map((candidate) => (
                <label key={candidate.type} className="rounded-md border border-border p-3 text-sm">
                  <span className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="opportunityType"
                      value={candidate.type}
                      disabled={candidate.disqualified}
                      className="mt-1"
                    />
                    <span>
                      <span className="font-semibold">{humanize(candidate.type)}</span>
                      <span className="mt-1 block text-muted">{candidate.reason}</span>
                      {candidate.disqualified ? (
                        <span className="mt-2 block rounded-md bg-amber-50 px-3 py-2 text-amber-900">
                          {candidate.disqualifyingRule}: {candidate.disqualificationExplanation}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </label>
              ))}
              {proposedInitiatives.length > 0 ? (
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="approveInitiative" />
                  Approve proposed initiative with selected opportunities
                </label>
              ) : null}
              <button
                type="submit"
                className="w-fit rounded-md bg-[#17375e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2948]"
              >
                Promote selected
              </button>
            </form>
          ) : (
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              No opportunity candidate was produced. Watch the account instead.
            </div>
          )}

          <div className="mt-5 grid gap-3 border-t border-border pt-5">
            <form action={dismissSignal} className="grid gap-2">
              <input type="hidden" name="sourceId" value={source.id} />
              <input type="hidden" name="opportunityId" value={review.id} />
              <label className="grid gap-1 text-sm font-medium">
                Dismiss reason
                <input name="reason" className={inputClass} placeholder="Why this should not become an opportunity" />
              </label>
              <button
                type="submit"
                className="w-fit rounded-md border border-border px-4 py-2 text-sm font-semibold"
              >
                Dismiss signal
              </button>
            </form>
            <form action={watchAccount}>
              <input type="hidden" name="sourceId" value={source.id} />
              <input type="hidden" name="opportunityId" value={review.id} />
              <button
                type="submit"
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
              >
                Watch account
              </button>
            </form>
          </div>
        </section>
      ) : null}

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

function ScoreSummary({ score }: { score: NonNullable<NonNullable<ReviewResult>["currentScore"]> }) {
  const hourly = score.priorityEfficiency === null ? "n/a" : `$${Math.round(Number(score.priorityEfficiency)).toLocaleString("en-US")}/hr`;
  return (
    <section className="rounded-md border border-border bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Score summary
      </p>
      <h2 className="mt-1 text-xl font-semibold">
        Fit {score.fitScore} · Evidence {score.evidenceScore} · Access {score.accessScore} · {hourly}
      </h2>
      <p className="mt-3 text-sm text-muted">
        Value {formatMoney(score.estimatedValue)} × probability {score.conversionProbability ?? "n/a"}% =
        EV {formatMoney(score.expectedValue)} over {score.estimatedHours === null ? "n/a" : `${Number(score.estimatedHours).toFixed(1)}h`}.
      </p>
      {score.isDisqualified ? (
        <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Disqualified: {score.disqualifyingRules.join(", ")}
        </p>
      ) : null}
    </section>
  );
}

function NextActionSummary({ action }: { action: NonNullable<ReviewResult>["nextActions"][number] }) {
  return (
    <section className="rounded-md border border-[#17375e] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Next action
      </p>
      <h2 className="mt-1 text-xl font-semibold">{humanize(action.type)}</h2>
      <p className="mt-2 text-sm text-muted">{action.description}</p>
      {action.rationale ? <p className="mt-2 text-sm text-muted">{action.rationale}</p> : null}
      <p className="mt-3 text-sm font-semibold">
        {action.estimatedMinutes} min · {action.dueAt ? `due ${formatDate(action.dueAt)}` : "no due date"}
      </p>
    </section>
  );
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}

function tierDisplay(tier: string) {
  return tier.replace("tier_", "Tier ");
}

function formatDate(date?: Date | null) {
  if (!date) return "date unknown";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatMoney(value?: number | null) {
  return value === null || value === undefined ? "n/a" : `$${value.toLocaleString("en-US")}`;
}
