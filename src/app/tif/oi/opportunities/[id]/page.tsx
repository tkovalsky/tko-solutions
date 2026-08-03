import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DecisionCapture from "@/app/tif/oi/decision-capture";
import { buildTimeline } from "@/lib/opportunity-intelligence/action/timeline";
import { validTargetsFor } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { suggestStakeholderRoles } from "@/lib/opportunity-intelligence/intelligence/stakeholder-suggest";
import { tifDb } from "@/lib/tif/db";
import {
  addContactPoint,
  addOperatorFact,
  addStakeholder,
  approveInitiative,
  dismissResearchGap,
  editInitiativeHypothesis,
  markDoNotContact,
  recomputeScore,
  resolveResearchGap,
  selectStakeholder,
  updateOpportunityStatus,
  updateStakeholder,
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
        where: { status: { in: ["open", "completed"] } },
        orderBy: [{ status: "asc" }, { completedAt: "desc" }, { createdAt: "asc" }],
      },
      activities: {
        orderBy: [{ occurredAt: "asc" }],
      },
      decisions: {
        orderBy: [{ createdAt: "asc" }],
      },
      stakeholders: {
        include: {
          person: {
            include: {
              contactPoints: {
                orderBy: [{ createdAt: "desc" }],
              },
            },
          },
        },
        orderBy: [{ isSelected: "desc" }, { updatedAt: "desc" }],
      },
    },
  });
}

export default async function OpportunityWorkbenchPage({ params, searchParams }: WorkbenchPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const opportunity = await getOpportunity(id);
  if (!opportunity) notFound();
  const nextAction = opportunity.nextActions.find((action) => action.status === "open");
  const awaitingManualOutreach = isAwaitingManualOutreach(opportunity);

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
        <ScorePanel score={opportunity.currentScore} opportunityType={opportunity.type} />

        <div className="mt-5 rounded-md border border-border bg-[#f7f8fb] p-4 text-sm">
          <p className="font-semibold">
            Next action: {awaitingManualOutreach ? awaitingManualOutreachMessage : nextAction?.description ?? "No open next action"}
          </p>
          {awaitingManualOutreach ? (
            <p className="mt-1 text-muted">Outreach preparation is manual until M3; send it outside POIS, then log the reply or follow-up when it happens.</p>
          ) : nextAction?.rationale ? (
            <p className="mt-1 text-muted">{nextAction.rationale}</p>
          ) : null}
        </div>

        <nav className="mt-5 flex flex-wrap gap-3 text-sm font-semibold" aria-label="Workbench sections">
          <a href="#initiative" className="underline">Initiative</a>
          <a href="#evidence" className="underline">Evidence</a>
          <a href="#gaps" className="underline">Gaps</a>
          <a href="#stakeholders" className="underline">Stakeholders</a>
          <a href="#timeline" className="underline">Timeline</a>
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
        <StakeholdersSection opportunity={opportunity} />
        <TimelineSection opportunity={opportunity} />
      </div>
    </section>
  );
}

const awaitingManualOutreachMessage = "Awaiting manual outreach";

function isAwaitingManualOutreach(opportunity: Pick<WorkbenchOpportunity, "nextActions">) {
  const hasOpenAction = opportunity.nextActions.some((action) => action.status === "open");
  const latestCompletedAction = opportunity.nextActions.find((action) => action.status === "completed");
  return !hasOpenAction && latestCompletedAction?.type === "prepare_outreach";
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

function StakeholdersSection({ opportunity }: { opportunity: WorkbenchOpportunity }) {
  const suggestions = suggestStakeholderRoles(opportunity.initiative?.category, opportunity.type);
  const filledRoles = new Set(opportunity.stakeholders.map((stakeholder) => stakeholder.role));
  const unfilledRoles = suggestions.filter((role) => !filledRoles.has(role));

  return (
    <section id="stakeholders" className="rounded-md border border-border bg-white p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">Stakeholders</h3>
        <span className="text-sm text-muted">{opportunity.stakeholders.filter((stakeholder) => stakeholder.isSelected).length} selected</span>
      </div>

      {opportunity.stakeholders.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {opportunity.stakeholders.map((stakeholder) => (
            <article key={stakeholder.id} className="rounded-md border border-border p-4 text-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold">
                    {stakeholder.isSelected ? "Selected · " : ""}
                    <Link href={`/tif/oi/people/${stakeholder.personId}`} className="underline">
                      {stakeholder.person.name}
                    </Link>{" "}
                    · {stakeholder.person.title}
                  </p>
                  <p className="mt-1 text-muted">
                    Role: {label(stakeholder.role)} · Authority: {stakeholder.authority} · Confidence {stakeholder.roleConfidence}%
                  </p>
                  <p className="mt-1 text-muted">
                    Relationship: {label(stakeholder.relationshipType)}
                    {stakeholder.warmPathNotes ? ` - ${stakeholder.warmPathNotes}` : ""}
                  </p>
                  {stakeholder.relevanceToTodd ? <p className="mt-2">Relevance to Todd: {stakeholder.relevanceToTodd}</p> : null}
                  {stakeholder.person.doNotContact ? <p className="mt-2 font-semibold text-red-700">Do not contact</p> : null}
                  <ContactPointList stakeholder={stakeholder} opportunityId={opportunity.id} />
                </div>
                <div className="grid gap-2">
                  <form action={selectStakeholder}>
                    <input type="hidden" name="opportunityId" value={opportunity.id} />
                    <input type="hidden" name="stakeholderId" value={stakeholder.id} />
                    <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white" disabled={stakeholder.person.doNotContact}>
                      {stakeholder.isSelected ? "Selected" : "Select as target"}
                    </button>
                  </form>
                  <form action={markDoNotContact}>
                    <input type="hidden" name="opportunityId" value={opportunity.id} />
                    <input type="hidden" name="stakeholderId" value={stakeholder.id} />
                    <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">
                      Mark DNC
                    </button>
                  </form>
                </div>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">Edit stakeholder</summary>
                <StakeholderForm opportunity={opportunity} stakeholder={stakeholder} suggestions={suggestions} />
              </details>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">No stakeholders yet. Start with one of the suggested roles below.</p>
      )}

      <div className="mt-5 rounded-md border border-border bg-[#f7f8fb] p-4">
        <p className="text-sm font-semibold">Suggested roles not yet filled</p>
        <p className="mt-1 text-sm text-muted">{unfilledRoles.length > 0 ? unfilledRoles.map(label).join(" · ") : "All suggested roles have a stakeholder."}</p>
      </div>
      <StakeholderForm opportunity={opportunity} suggestions={suggestions} />
    </section>
  );
}

function StakeholderForm({
  opportunity,
  stakeholder,
  suggestions,
}: {
  opportunity: WorkbenchOpportunity;
  stakeholder?: WorkbenchOpportunity["stakeholders"][number];
  suggestions: string[];
}) {
  return (
    <form action={stakeholder ? updateStakeholder : addStakeholder} className="mt-4 grid gap-2 md:grid-cols-2">
      <input type="hidden" name="opportunityId" value={opportunity.id} />
      {stakeholder ? <input type="hidden" name="stakeholderId" value={stakeholder.id} /> : null}
      <input name="personName" className={inputClass} defaultValue={stakeholder?.person.name} placeholder="Person name" />
      <input name="title" className={inputClass} defaultValue={stakeholder?.person.title} placeholder="Title" />
      <select name="role" className={inputClass} defaultValue={stakeholder?.role ?? suggestions[0] ?? "unknown"}>
        {Array.from(new Set([...suggestions, "economic_buyer", "executive_sponsor", "operational_owner", "technical_owner", "hiring_manager", "recruiter", "champion", "influencer", "procurement", "partner", "blocker", "unknown"])).map((role) => (
          <option key={role} value={role}>
            {label(role)}
          </option>
        ))}
      </select>
      <select name="authority" className={inputClass} defaultValue={stakeholder?.authority ?? "unknown"}>
        {["unknown", "none", "low", "medium", "high"].map((authority) => (
          <option key={authority} value={authority}>{authority}</option>
        ))}
      </select>
      <select name="relationshipType" className={inputClass} defaultValue={stakeholder?.relationshipType ?? "cold"}>
        {["cold", "warm_referral", "warm_history", "existing_client"].map((relationship) => (
          <option key={relationship} value={relationship}>{label(relationship)}</option>
        ))}
      </select>
      <input name="roleEvidenceLabel" className={inputClass} defaultValue={stakeholder?.roleEvidenceLabel ?? ""} placeholder="Evidence label" />
      <input name="roleEvidenceUrl" className={inputClass} defaultValue={stakeholder?.roleEvidenceUrl ?? ""} placeholder="Evidence URL" />
      <input name="roleConfidence" className={inputClass} type="number" min="1" max="100" defaultValue={stakeholder?.roleConfidence ?? 50} />
      <input name="warmPathNotes" className={inputClass} defaultValue={stakeholder?.warmPathNotes ?? ""} placeholder="Warm path notes" />
      <input name="relevanceToTodd" className={inputClass} defaultValue={stakeholder?.relevanceToTodd ?? ""} placeholder="Relevance to Todd" />
      <label className="flex items-center gap-2 text-sm">
        <input name="operatorConfirmed" type="checkbox" defaultChecked={stakeholder?.roleConfidence === 100} />
        Operator confirmed
      </label>
      <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white">
        {stakeholder ? "Update stakeholder" : "Add stakeholder"}
      </button>
    </form>
  );
}

function ContactPointList({ stakeholder, opportunityId }: { stakeholder: WorkbenchOpportunity["stakeholders"][number]; opportunityId: string }) {
  return (
    <div className="mt-3">
      <p className="font-semibold">Contact points</p>
      {stakeholder.person.contactPoints.length > 0 ? (
        <ul className="mt-1 grid gap-1 text-muted">
          {stakeholder.person.contactPoints.map((point) => (
            <li key={point.id}>
              {point.type}: {point.value} · {point.provenance}
              {point.provenance === "pattern_inferred" ? " · not outreach eligible" : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-muted">No contact point captured yet.</p>
      )}
      <form action={addContactPoint} className="mt-2 grid gap-2 md:grid-cols-[auto_1fr_auto_auto]">
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <input type="hidden" name="personId" value={stakeholder.personId} />
        <select name="type" className={inputClass} defaultValue="email">
          {["email", "phone", "linkedin", "other"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input name="value" className={inputClass} placeholder="Contact value" />
        <select name="provenance" className={inputClass} defaultValue="publicly_listed">
          {["publicly_listed", "directly_provided", "provider_discovered", "verified_deliverable", "pattern_inferred"].map((provenance) => (
            <option key={provenance} value={provenance}>{provenance}</option>
          ))}
        </select>
        <button className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Add contact</button>
      </form>
    </div>
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

function label(value: string) {
  return value.replaceAll("_", " ");
}
