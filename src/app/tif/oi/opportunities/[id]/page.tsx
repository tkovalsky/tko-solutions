import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DecisionCapture from "@/app/tif/oi/decision-capture";
import { buildTimeline } from "@/lib/opportunity-intelligence/action/timeline";
import { validTargetsFor } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { tifDb } from "@/lib/tif/db";
import {
  addOperatorFact,
  approveInitiative,
  dismissResearchGap,
  editInitiativeHypothesis,
  recomputeScore,
  resolveResearchGap,
  updateOpportunityStatus,
} from "./actions";
import ScorePanel from "./score-panel";

export const metadata: Metadata = {
  title: "POIS Workbench",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type WorkbenchPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ statusError?: string }>;
};

type WorkbenchOpportunity = NonNullable<Awaited<ReturnType<typeof getOpportunity>>>;

const inputClass = "w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm";

async function getOpportunity(id: string) {
  return tifDb.oiOpportunity.findUnique({
    where: { id },
    include: {
      organization: true,
      initiative: {
        include: {
          signalLinks: {
            include: { signal: { include: { source: true } } },
            orderBy: { createdAt: "desc" },
          },
          opportunities: {
            include: { currentScore: true },
            orderBy: { updatedAt: "desc" },
          },
        },
      },
      facts: {
        include: {
          evidence: {
            include: { source: true },
          },
        },
        orderBy: [{ field: "asc" }, { ordinal: "asc" }],
      },
      researchGaps: {
        orderBy: [{ status: "asc" }, { priority: "asc" }, { createdAt: "asc" }],
      },
      currentScore: true,
      nextActions: {
        where: { status: "open" },
        orderBy: [{ createdAt: "asc" }],
        take: 1,
      },
      activities: {
        orderBy: [{ occurredAt: "asc" }],
      },
      decisions: {
        orderBy: [{ createdAt: "asc" }],
      },
    },
  });
}

export default async function OpportunityWorkbenchPage({ params, searchParams }: WorkbenchPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const opportunity = await getOpportunity(id);
  if (!opportunity) notFound();
  const nextAction = opportunity.nextActions[0];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <Link href="/tif/oi/opportunities" className="text-sm font-semibold underline">
        Back to pipeline
      </Link>

      <header className="mt-4 rounded-md border border-border bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {opportunity.type} · {opportunity.status}
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{opportunity.organization.name}</h2>
            <p className="mt-1 text-lg">{opportunity.title}</p>
          </div>
          <form action={updateOpportunityStatus} className="grid min-w-72 gap-2">
            <input type="hidden" name="opportunityId" value={opportunity.id} />
            <select name="toStatus" className={inputClass} defaultValue="">
              <option value="" disabled>
                Change status
              </option>
              {validTargetsFor(opportunity.type, opportunity.status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input name="reason" className={inputClass} placeholder="Reason when required" />
            <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white">
              Update status
            </button>
          </form>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <StatusDecision
            label="Qualify"
            toStatus="qualified"
            decisionType="qualify_opportunity"
            opportunity={opportunity}
          />
          <StatusDecision
            label="Dismiss"
            toStatus="dismissed"
            decisionType="disqualify_opportunity"
            opportunity={opportunity}
          />
          <StatusDecision
            label="Disqualify"
            toStatus="dismissed"
            decisionType="disqualify_opportunity"
            opportunity={opportunity}
          />
          <StatusDecision
            label="Pause"
            toStatus="paused"
            decisionType="pause_opportunity"
            opportunity={opportunity}
          />
          <StatusDecision
            label="Close"
            toStatus="closed"
            decisionType="close_opportunity"
            opportunity={opportunity}
          />
        </div>

        {query.statusError ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {query.statusError}
          </p>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          <Metric label="Fit" value={opportunity.currentScore?.fitScore ?? 0} />
          <Metric label="Evidence" value={opportunity.currentScore?.evidenceScore ?? 0} />
          <Metric label="Access" value={opportunity.currentScore?.accessScore ?? 0} />
          <Metric label="Urgency" value={opportunity.currentScore?.urgencyScore ?? 0} />
          <Metric label="Priority" value={`${money(numberValue(opportunity.currentScore?.priorityEfficiency))}/hr`} />
        </div>
        <p className="mt-4 text-sm text-muted">
          Value {money(opportunity.currentScore?.estimatedValue ?? null)} · {opportunity.currentScore?.conversionProbability ?? 0}% · EV{" "}
          {money(opportunity.currentScore?.expectedValue ?? null)} · {numberValue(opportunity.currentScore?.estimatedHours).toFixed(1)} hrs remaining
        </p>
        <ScorePanel score={opportunity.currentScore} />

        <div className="mt-5 rounded-md border border-border bg-[#f7f8fb] p-4 text-sm">
          <p className="font-semibold">
            Next action: {nextAction?.description ?? "No open next action"}
          </p>
          {nextAction?.rationale ? <p className="mt-1 text-muted">{nextAction.rationale}</p> : null}
        </div>

        <nav className="mt-5 flex flex-wrap gap-3 text-sm font-semibold" aria-label="Workbench sections">
          <a href="#initiative" className="underline">Initiative</a>
          <a href="#evidence" className="underline">Evidence</a>
          <a href="#gaps" className="underline">Gaps</a>
          <a href="#timeline" className="underline">Timeline</a>
          <span className="text-muted">Stakeholders</span>
          <span className="text-muted">Offer</span>
          <span className="text-muted">Outreach</span>
          <span className="text-muted">Log</span>
        </nav>
      </header>

      <div className="mt-6 grid gap-6">
        <OverviewSection opportunity={opportunity} />
        <InitiativeSection opportunity={opportunity} />
        <EvidenceSection opportunity={opportunity} />
        <GapsSection opportunity={opportunity} />
        <TimelineSection opportunity={opportunity} />
      </div>
    </section>
  );
}

function StatusDecision({
  label,
  toStatus,
  decisionType,
  opportunity,
}: {
  label: string;
  toStatus: string;
  decisionType: "qualify_opportunity" | "disqualify_opportunity" | "pause_opportunity" | "close_opportunity";
  opportunity: WorkbenchOpportunity;
}) {
  return (
    <DecisionCapture
      action={updateOpportunityStatus}
      opportunityId={opportunity.id}
      type={decisionType}
      decision={toStatus}
      label={label}
      currentScore={opportunity.currentScore}
    >
      <input type="hidden" name="toStatus" value={toStatus} />
      <input type="hidden" name="reason" value={`${label} decision captured.`} />
    </DecisionCapture>
  );
}

function OverviewSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  return (
    <section id="overview" className="rounded-md border border-border bg-white p-5">
      <h3 className="text-lg font-semibold">Overview</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <Item label="Path" value={opportunity.type} />
        <Item label="Stage" value={opportunity.status} />
        <Item label="Thesis" value={opportunity.operatorThesis ?? "No operator thesis yet"} />
      </dl>
    </section>
  );
}

function InitiativeSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  const initiative = opportunity.initiative;
  return (
    <section id="initiative" className="rounded-md border border-border bg-white p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">Initiative</h3>
        {initiative ? (
          <span className="text-sm text-muted">
            {initiative.status} · {initiative.confidence}% · {initiative.approvedAt ? "approved" : "unapproved"}
          </span>
        ) : null}
      </div>
      {initiative ? (
        <div className="mt-4 grid gap-4">
          <p className="font-semibold">{initiative.name}</p>
          <p className={initiative.hypothesisBasis === "operator" ? "fact-operator" : "hypothesis-inferred"}>
            Hypothesis: {initiative.hypothesis}
          </p>
          <div>
            <p className="font-semibold">Signals ({initiative.signalLinks.length})</p>
            <ul className="mt-2 grid gap-2 text-sm">
              {initiative.signalLinks.map((link) => (
                <li key={link.signalId}>
                  {link.signal.summary} · {link.signal.source.canonicalUrl ?? "captured source"}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Sibling opportunities under this initiative</p>
            <ul className="mt-2 grid gap-2 text-sm">
              {initiative.opportunities
                .filter((sibling) => sibling.id !== opportunity.id)
                .map((sibling) => (
                  <li key={sibling.id}>
                    <Link href={`/tif/oi/opportunities/${sibling.id}`} className="underline">
                      {sibling.type} · {sibling.title} ({sibling.status}) {money(numberValue(sibling.currentScore?.priorityEfficiency))}/hr
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <form action={editInitiativeHypothesis} className="grid gap-2">
            <input type="hidden" name="opportunityId" value={opportunity.id} />
            <textarea name="hypothesis" defaultValue={initiative.hypothesis} className={inputClass} rows={3} />
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">
                Edit hypothesis
              </button>
            </div>
          </form>
          <DecisionCapture
            action={approveInitiative}
            opportunityId={opportunity.id}
            type="promote_signal"
            decision="promote"
            label="Promote"
            currentScore={opportunity.currentScore}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">No initiative attached.</p>
      )}
    </section>
  );
}

function TimelineSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  const timeline = buildTimeline(opportunity);
  return (
    <section id="timeline" className="rounded-md border border-border bg-white p-5">
      <h3 className="text-lg font-semibold">Timeline</h3>
      {timeline.length > 0 ? (
        <ol className="mt-4 grid gap-3">
          {timeline.map((entry) => (
            <li key={entry.id} className="grid gap-1 border-l-2 border-border pl-3 text-sm">
              <span className="text-xs font-semibold uppercase text-muted">
                {entry.kind} · {entry.occurredAt.toLocaleDateString("en-US")}
              </span>
              <span>{entry.label}</span>
              {entry.sourceHref ? (
                <a href={entry.sourceHref} className="underline">
                  Source
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-sm text-muted">No timeline history yet. New signals, activities, status changes, and decisions will appear here.</p>
      )}
    </section>
  );
}

function EvidenceSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  return (
    <section id="evidence" className="rounded-md border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Evidence</h3>
        <span className="text-sm text-muted">{opportunity.currentScore?.evidenceScore ?? 0}/100</span>
      </div>
      <div className="mt-4 grid gap-3">
        {opportunity.facts.map((fact) => (
          <details
            key={fact.id}
            className={`rounded-md border border-border p-3 text-sm ${fact.basis === "stated" ? "fact-stated" : fact.basis === "operator" ? "fact-operator" : "fact-inferred"}`}
          >
            <summary className="cursor-pointer font-semibold">
              {fact.field}: {fact.value} · {fact.basis} {fact.confidence}%
            </summary>
            {fact.evidence ? (
              <p className="mt-2 text-muted">
                <span>{fact.evidence.excerpt}</span> · offset {fact.evidence.startOffset}-{fact.evidence.endOffset} ·{" "}
                {fact.evidence.source.canonicalUrl ?? "captured source"}
              </p>
            ) : (
              <p className="mt-2 text-muted">Operator or inferred fact with no source offset.</p>
            )}
          </details>
        ))}
      </div>
      <form action={addOperatorFact} className="mt-4 grid gap-2 sm:grid-cols-[1fr_2fr_auto_auto]">
        <input type="hidden" name="opportunityId" value={opportunity.id} />
        <input name="field" className={inputClass} placeholder="Field" />
        <input name="value" className={inputClass} placeholder="Operator fact" />
        <input name="confidence" className={inputClass} type="number" min="1" max="100" defaultValue="85" />
        <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">
          Add operator fact
        </button>
      </form>
    </section>
  );
}

function GapsSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  const openGaps = opportunity.researchGaps.filter((gap) => gap.status === "open");
  return (
    <section id="gaps" className="rounded-md border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Research gaps</h3>
        <span className="text-sm text-muted">{openGaps.length} open</span>
      </div>
      <div className="mt-4 grid gap-4">
        {opportunity.researchGaps.map((gap) => (
          <div key={gap.id} className="rounded-md border border-border p-4 text-sm">
            <p className="font-semibold">
              {gap.status === "open" ? "Open" : gap.status.toUpperCase()} · {gap.question}
            </p>
            <p className="mt-1 text-muted">Why: {gap.reason}</p>
            {gap.suggestedSources.length > 0 ? (
              <p className="mt-1 text-muted">Try: {gap.suggestedSources.join(" · ")}</p>
            ) : null}
            {gap.resolution ? <p className="mt-2">Resolution: {gap.resolution}</p> : null}
            {gap.status === "open" ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <form action={resolveResearchGap} className="grid gap-2">
                  <input type="hidden" name="opportunityId" value={opportunity.id} />
                  <input type="hidden" name="gapId" value={gap.id} />
                  <input name="field" className={inputClass} placeholder="Fact field" />
                  <textarea name="finding" className={inputClass} placeholder="Resolve with a finding" rows={3} />
                  <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white">
                    Resolve with a finding
                  </button>
                </form>
                <form action={dismissResearchGap} className="grid gap-2">
                  <input type="hidden" name="opportunityId" value={opportunity.id} />
                  <input type="hidden" name="gapId" value={gap.id} />
                  <textarea name="operatorNotes" className={inputClass} placeholder="Dismiss reason" rows={3} />
                  <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">
                    Dismiss
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <form action={recomputeScore} className="mt-4">
        <input type="hidden" name="opportunityId" value={opportunity.id} />
        <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Recompute score</button>
      </form>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border bg-[#f7f8fb] p-3">
      <p className="text-xs font-semibold uppercase text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-muted">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

function numberValue(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  return 0;
}

function money(value: number | null) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value ?? 0);
}
