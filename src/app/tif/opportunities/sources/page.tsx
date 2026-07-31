import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { tifDb } from "@/lib/tif/db";
import { createOpportunitySource, saveOpportunityThesis } from "../actions";

export const metadata: Metadata = {
  title: "Opportunity Source Intake",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SourcePageProps = {
  searchParams: Promise<{
    opportunityId?: string;
    capture?: "created" | "duplicate" | "reviewed";
  }>;
};

type ScoreComponent = {
  key: string;
  label: string;
  points: number;
  maxPoints: number;
  reason: string;
};

const inputClass =
  "w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm text-foreground";

export default async function OpportunitySourcesPage({ searchParams }: SourcePageProps) {
  const { opportunityId, capture } = await searchParams;
  const [selected, recent] = await Promise.all([
    opportunityId
      ? tifDb.oiOpportunity.findUnique({
          where: { id: opportunityId },
          include: {
            organization: true,
            currentScore: true,
            facts: {
              include: { evidence: { select: { excerpt: true } } },
              orderBy: [{ field: "asc" }, { ordinal: "asc" }],
            },
            researchGaps: {
              orderBy: [{ status: "asc" }, { createdAt: "asc" }],
            },
            sources: {
              orderBy: [{ retrievedAt: "desc" }, { createdAt: "desc" }],
            },
          },
        })
      : Promise.resolve(null),
    tifDb.oiOpportunity.findMany({
      include: {
        organization: true,
        currentScore: true,
        _count: { select: { sources: true, facts: true, researchGaps: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 12,
    }),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href="/tif/opportunities"
        className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline"
      >
        Back to Opportunity Intelligence
      </Link>

      <header className="mt-5 rounded-2xl border border-[#17375e] bg-[#07192e] px-6 py-8 text-white md:px-9">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8fb9e7]">
          Source intake
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
          Add the opportunity before the person.
        </h1>
        <p className="mt-4 max-w-[72ch] text-sm leading-6 text-slate-300">
          Paste a permitted public posting or other source. TIF stores an immutable snapshot,
          extracts only source-supported facts, creates a reproducible score, and identifies the
          research still required. It does not fetch the URL, apply, or contact anyone.
        </p>
      </header>

      {capture ? <CaptureNotice capture={capture} /> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <section className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            New source
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Paste a job or funded-work signal</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            For Ashby, Greenhouse, or another ATS, use the organization as the company—not the ATS.
            The source URL preserves where the posting came from.
          </p>

          <form action={createOpportunitySource} className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Organization">
              <input name="organizationName" required className={inputClass} placeholder="Rula" />
            </Field>
            <Field label="Organization website">
              <input
                name="organizationWebsite"
                type="url"
                className={inputClass}
                placeholder="https://www.example.com"
              />
            </Field>
            <Field label="Organization type">
              <select name="organizationKind" defaultValue="health_tech" className={inputClass}>
                <option value="payer">Health plan / payer</option>
                <option value="health_tech">Health technology</option>
                <option value="health_system">Health system</option>
                <option value="consulting">Consulting / services</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Source type">
              <select name="sourceType" defaultValue="job_posting" className={inputClass}>
                <option value="job_posting">Job posting</option>
                <option value="company_announcement">Company announcement</option>
                <option value="referral">Referral or conversation</option>
                <option value="regulatory_event">Regulatory event</option>
                <option value="pasted_text">Other pasted text</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Opportunity title" wide>
              <input
                name="title"
                required
                className={inputClass}
                placeholder="Sr. Product Manager – Provider Experience"
              />
            </Field>
            <Field label="Source URL" wide>
              <input
                name="canonicalUrl"
                type="url"
                className={inputClass}
                placeholder="https://jobs.ashbyhq.com/..."
              />
            </Field>
            <Field label="Published date">
              <input name="publishedAt" type="date" className={inputClass} />
            </Field>
            <div className="hidden md:block" aria-hidden="true" />
            <Field label="Full source text" wide>
              <textarea
                name="rawContent"
                required
                rows={14}
                className={inputClass}
                placeholder="Paste the complete posting or permitted source text here."
              />
            </Field>
            <Field label="Operator thesis (optional)" wide>
              <textarea
                name="operatorThesis"
                rows={4}
                className={inputClass}
                placeholder="Why this organization is spending, what changed, why the work fits, and what still needs verification."
              />
            </Field>
            <p className="text-xs leading-5 text-muted md:col-span-2">
              Use public professional information or material you are authorized to capture. Do not
              paste patient data, private communications, credentials, or other sensitive records.
            </p>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Save and analyze
              </button>
            </div>
          </form>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Recent opportunities
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Review the latest sources</h2>
          <div className="mt-5 grid gap-3">
            {recent.map((opportunity) => (
              <Link
                key={opportunity.id}
                href={`/tif/opportunities/sources?opportunityId=${encodeURIComponent(opportunity.id)}`}
                className={`rounded-xl border bg-white p-4 transition-colors hover:border-primary ${
                  opportunity.id === opportunityId ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {opportunity.organization.name}
                    </p>
                    <h3 className="mt-1 font-semibold">{opportunity.title}</h3>
                  </div>
                  <span className="rounded-full border border-border px-2 py-1 text-xs font-semibold">
                    {opportunity.currentScore?.total ?? "—"}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-muted">
                  {opportunity._count.sources} source(s) · {opportunity._count.facts} fact(s) ·{" "}
                  {opportunity._count.researchGaps} research gap(s)
                </p>
              </Link>
            ))}
            {recent.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted">
                No person-free opportunities have been captured yet.
              </p>
            ) : null}
          </div>
        </section>
      </div>

      {selected ? <OpportunityReview opportunity={selected} /> : null}
    </main>
  );
}

type SelectedOpportunity = Prisma.OiOpportunityGetPayload<{
  include: {
    organization: true;
    currentScore: true;
    facts: {
      include: { evidence: { select: { excerpt: true } } };
    };
    researchGaps: true;
    sources: true;
  };
}>;

function OpportunityReview({ opportunity }: { opportunity: SelectedOpportunity }) {
  const components = scoreComponents(opportunity.currentScore?.components);
  const openGaps = opportunity.researchGaps.filter((gap) => gap.status === "open");
  const latestSource = opportunity.sources[0];

  return (
    <section className="mt-10 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {opportunity.organization.name} · {opportunity.status}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">{opportunity.title}</h2>
          <p className="mt-2 text-sm text-muted">
            {latestSource ? sourceHost(latestSource.canonicalUrl) : "Pasted source"} ·{" "}
            {opportunity.sources.length} immutable source snapshot(s)
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ReviewMetric label="Fit score" value={opportunity.currentScore?.total ?? "—"} />
          <ReviewMetric
            label="Completeness"
            value={
              opportunity.currentScore ? `${opportunity.currentScore.completeness}%` : "—"
            }
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="space-y-6">
          <ReviewPanel title="Score explanation">
            <div className="divide-y divide-border">
              {components.map((component) => (
                <div key={component.key} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-sm font-semibold">{component.label}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{component.reason}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {component.points}/{component.maxPoints}
                  </p>
                </div>
              ))}
              {components.length === 0 ? (
                <p className="py-3 text-sm text-muted">No score snapshot is available.</p>
              ) : null}
            </div>
          </ReviewPanel>

          <ReviewPanel title={`Extracted facts (${opportunity.facts.length})`}>
            <div className="divide-y divide-border">
              {opportunity.facts.map((fact) => (
                <div key={fact.id} className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eef4fb] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {fact.field.replaceAll("_", " ")}
                    </span>
                    <span className="text-[11px] text-muted">
                      {fact.basis} · {fact.confidence}% confidence
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6">{fact.value}</p>
                  {fact.evidence?.excerpt && fact.evidence.excerpt !== fact.value ? (
                    <p className="mt-1 text-xs leading-5 text-muted">
                      Source excerpt: {fact.evidence.excerpt}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </ReviewPanel>

          {latestSource ? (
            <details className="rounded-xl border border-border bg-white p-5">
              <summary className="cursor-pointer text-sm font-semibold">
                Inspect preserved source snapshot
              </summary>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
                <span>Captured {formatDate(latestSource.retrievedAt)}</span>
                {latestSource.publishedAt ? (
                  <span>Published {formatDate(latestSource.publishedAt)}</span>
                ) : null}
                {latestSource.canonicalUrl ? (
                  <a
                    href={latestSource.canonicalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    Open public source ↗
                  </a>
                ) : null}
              </div>
              <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-lg bg-surface p-4 text-xs leading-5 text-foreground">
                {latestSource.rawContent}
              </pre>
            </details>
          ) : null}
        </div>

        <aside className="space-y-6">
          <ReviewPanel title={`Research next (${openGaps.length})`}>
            <div className="divide-y divide-border">
              {openGaps.map((gap) => (
                <div key={gap.id} className="py-3">
                  <p className="text-sm font-semibold">{gap.question}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{gap.reason}</p>
                </div>
              ))}
              {openGaps.length === 0 ? (
                <p className="py-3 text-sm text-muted">
                  No open extraction gaps. Operator judgment is still required before action.
                </p>
              ) : null}
            </div>
          </ReviewPanel>

          <ReviewPanel title="Operator thesis">
            <p className="text-xs leading-5 text-muted">
              Record your conclusion separately from the source. Saving it reruns the deterministic
              score and resolves the missing-thesis gap without changing the original evidence.
            </p>
            <form action={saveOpportunityThesis} className="mt-4">
              <input type="hidden" name="opportunityId" value={opportunity.id} />
              <textarea
                name="operatorThesis"
                rows={7}
                defaultValue={opportunity.operatorThesis ?? ""}
                className={inputClass}
                placeholder="Why this work is funded, why it fits, and what needs verification."
              />
              <button
                type="submit"
                className="mt-3 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
              >
                Save review
              </button>
            </form>
          </ReviewPanel>
        </aside>
      </div>
    </section>
  );
}

function CaptureNotice({
  capture,
}: {
  capture: "created" | "duplicate" | "reviewed";
}) {
  const copy = {
    created: {
      title: "Opportunity captured.",
      body: "The source snapshot, extracted facts, score, and research gaps are ready for review.",
    },
    duplicate: {
      title: "Already captured.",
      body: "TIF matched the organization and source content, so it opened the existing opportunity instead of creating a duplicate.",
    },
    reviewed: {
      title: "Operator review saved.",
      body: "The thesis is stored separately from source evidence and the current score has been rebuilt.",
    },
  }[capture];

  return (
    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
      <p className="font-semibold">{copy.title}</p>
      <p className="mt-1 text-sm leading-6">{copy.body}</p>
    </div>
  );
}

function Field({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-1 text-sm ${wide ? "md:col-span-2" : ""}`}>
      <span className="font-semibold">{label}</span>
      {children}
    </label>
  );
}

function ReviewPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ReviewMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-28 rounded-xl border border-border bg-white p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

function scoreComponents(value: Prisma.JsonValue | undefined): ScoreComponent[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is ScoreComponent => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return false;
    }
    return (
      typeof item.key === "string" &&
      typeof item.label === "string" &&
      typeof item.points === "number" &&
      typeof item.maxPoints === "number" &&
      typeof item.reason === "string"
    );
  });
}

function sourceHost(url: string | null) {
  if (!url) {
    return "Pasted source";
  }
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Linked source";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
