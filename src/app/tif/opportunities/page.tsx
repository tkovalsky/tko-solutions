import type { Metadata } from "next";
import Link from "next/link";
import type { OiPursuitStatus, Prisma } from "@prisma/client";
import {
  formatOrganizationKind,
  formatSeniority,
  type OiScoreResult,
} from "@/lib/oi";
import { tifDb } from "@/lib/tif/db";
import {
  bootstrapOpportunityIntelligence,
  createOpportunityCandidate,
  saveProfessionalContactPath,
  updatePursuitStatus,
} from "./actions";

export const metadata: Metadata = {
  title: "Opportunity Intelligence Engine",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ACTIVE_STATUSES: OiPursuitStatus[] = [
  "prospect",
  "research_ready",
  "contact_ready",
  "contacted",
  "conversation",
];

export default async function OpportunityIntelligencePage() {
  const [anchors, pursuits] = await Promise.all([
    tifDb.oiPerson.findMany({
      where: { isLookalikeAnchor: true },
      include: { organization: true },
      orderBy: [{ organization: { name: "asc" } }, { name: "asc" }],
    }),
    tifDb.oiPursuit.findMany({
      where: { status: { in: ACTIVE_STATUSES } },
      include: { person: true, organization: true },
      orderBy: [{ score: "desc" }, { updatedAt: "desc" }],
    }),
  ]);

  const contactReady = pursuits.filter((pursuit) => pursuit.status === "contact_ready");
  const researchReady = pursuits.filter((pursuit) => pursuit.status === "research_ready");
  const consultingPipeline = pursuits
    .filter((pursuit) => pursuit.mode !== "employment")
    .reduce((sum, pursuit) => sum + pursuit.targetMonthlyValue, 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href="/tif"
        className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline"
      >
        Back to TIF console
      </Link>

      <header className="mt-5 overflow-hidden rounded-2xl border border-[#17375e] bg-[#07192e] px-6 py-8 text-white shadow-sm md:px-9 md:py-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8fb9e7]">
              Opportunity Intelligence Engine · v0.1
            </p>
            <h1 className="mt-3 max-w-[20ch] text-4xl font-semibold leading-[1.06] tracking-[-0.03em] md:text-5xl">
              Who should I contact next?
            </h1>
            <p className="mt-4 max-w-[68ch] text-sm leading-6 text-slate-300">
              Director+ payer and health-tech leaders ranked by budget authority, hiring influence,
              transformation relevance, lookalike fit, source confidence, and the ability to support
              a $20K+/month consulting path.
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-5 lg:w-64">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              North-star outcome
            </p>
            <p className="mt-2 text-2xl font-semibold">$20K+/month</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              One qualified consulting engagement—or a senior FTE path that reflects the value of
              your payer transformation experience.
            </p>
          </div>
        </div>
      </header>

      {anchors.length === 0 && pursuits.length === 0 ? (
        <section className="my-8 rounded-xl border border-primary/25 bg-primary/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Start here</p>
          <h2 className="mt-2 text-2xl font-semibold">Load the first lookalike cohort</h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted">
            This creates your four operator-defined anchors and an initial sourced research cohort
            across Elevance Health, Humana, Availity, and Epic. It does not discover or send email
            addresses.
          </p>
          <form action={bootstrapOpportunityIntelligence} className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Load starter cohort
            </button>
          </form>
        </section>
      ) : null}

      <section className="my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Contact ready" value={contactReady.length} note="Verified enough to prepare" />
        <Metric label="Research next" value={researchReady.length} note="High fit, missing confidence" />
        <Metric label="Lookalike anchors" value={anchors.length} note="Your reference set" />
        <Metric
          label="Consulting potential"
          value={formatMoney(consultingPipeline)}
          note="Unweighted target value"
        />
      </section>

      <details className="mb-10 rounded-xl border border-border bg-white p-5">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Operator guide
              </p>
              <h2 className="mt-1 text-xl font-semibold">How to use this tool</h2>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary">
              Open guide
            </span>
          </div>
        </summary>
        <ol className="mt-5 grid gap-3 md:grid-cols-5">
          <GuideStep
            number="1"
            title="Load or add"
            body="Load the starter cohort once. Add new people only when you have a public professional source or direct context."
          />
          <GuideStep
            number="2"
            title="Research"
            body="Open the public source. Verify the current title, Director+ level, relevant initiative, and likely budget or hiring authority."
          />
          <GuideStep
            number="3"
            title="Prioritize"
            body="Work contact-ready people first. For research-ready people, complete the stated next action instead of drafting an email too early."
          />
          <GuideStep
            number="4"
            title="Find contact path"
            body="Add only a professional email from a legitimate source. Record where it came from and whether deliverability was verified."
          />
          <GuideStep
            number="5"
            title="Act and record"
            body="Send manually after personal review. Mark Contacted, then Conversation if they respond. The tool schedules a seven-day follow-up."
          />
        </ol>
        <div className="mt-4 rounded-lg bg-[#f3f7fb] p-4 text-sm leading-6 text-muted">
          <span className="font-semibold text-foreground">Daily rhythm:</span> spend the first block
          verifying two research-ready people, then prepare highly specific messages for no more
          than three contact-ready people. The goal is qualified conversations—not email volume.
        </div>
      </details>

      <section className="mb-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Today&apos;s contact queue
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Highest-value people first</h2>
          </div>
          <p className="max-w-md text-right text-xs leading-5 text-muted">
            Scores prioritize fit; readiness still requires a current source and evidence of budget
            or hiring authority.
          </p>
        </div>

        <div className="grid gap-4">
          {pursuits.slice(0, 10).map((pursuit, index) => (
            <PursuitCard key={pursuit.id} rank={index + 1} pursuit={pursuit} />
          ))}
          {pursuits.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
              No active pursuits yet. Load the starter cohort or add a candidate below.
            </p>
          ) : null}
        </div>
      </section>

      <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Lookalike DNA
        </p>
        <h2 className="mt-1 text-2xl font-semibold">People who define the target</h2>
        <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted">
          These are reference profiles, not outreach targets. The engine looks for overlapping
          authority, market, transformation, workflow, product, and implementation traits.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {anchors.map((anchor) => (
            <article key={anchor.id} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{anchor.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {anchor.organization.name} · {anchor.title}
                  </p>
                </div>
                <span className="rounded-full bg-[#07192e] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Anchor
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {anchor.domainTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-2 py-1 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">{anchor.sourceLabel}</p>
            </article>
          ))}
        </div>
      </section>

      <CandidateForm />
    </main>
  );
}

type PursuitWithRelations = Prisma.OiPursuitGetPayload<{
  include: { person: true; organization: true };
}>;

function PursuitCard({
  pursuit,
  rank,
}: {
  pursuit: PursuitWithRelations;
  rank: number;
}) {
  const score = pursuit.scoreBreakdown as unknown as OiScoreResult;
  const topComponents = [...score.components]
    .filter((component) => component.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="grid lg:grid-cols-[84px_1fr_250px]">
        <div className="flex items-center justify-center border-b border-border bg-[#f3f7fb] p-4 lg:border-r lg:border-b-0">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">#{rank}</p>
            <p className="mt-1 text-3xl font-semibold text-primary">{pursuit.score}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted">score</p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{pursuit.person.name}</h3>
                <StatusBadge status={pursuit.status} />
              </div>
              <p className="mt-1 text-sm text-muted">
                {pursuit.person.title} · {pursuit.organization.name}
              </p>
              <p className="mt-1 text-xs text-muted">
                {formatSeniority(pursuit.person.seniority)} ·{" "}
                {formatOrganizationKind(pursuit.organization.kind)} ·{" "}
                {formatMode(pursuit.mode)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-muted">Target value</p>
              <p className="font-semibold">{formatMoney(pursuit.targetMonthlyValue)}/mo</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Why this person
              </p>
              <p className="mt-1 text-sm leading-6">{pursuit.fitHypothesis}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Visible problem
              </p>
              <p className="mt-1 text-sm leading-6">{pursuit.problemHypothesis}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {topComponents.map((component) => (
              <span
                key={component.key}
                title={component.reason}
                className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800"
              >
                +{component.points} {component.label}
              </span>
            ))}
          </div>

          {score.warnings.length ? (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold text-amber-900">Verify before contact</p>
              <ul className="mt-1 grid gap-1 text-xs leading-5 text-amber-900/80">
                {score.warnings.map((warning) => (
                  <li key={warning}>• {warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="border-t border-border bg-surface p-5 lg:border-t-0 lg:border-l">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Next action</p>
          <p className="mt-2 text-sm font-medium leading-5">{pursuit.nextAction}</p>

          {pursuit.person.sourceUrl ? (
            <a
              href={pursuit.person.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Review public source ↗
            </a>
          ) : null}

          {pursuit.professionalEmail ? (
            <div className="mt-4 rounded-lg border border-border bg-white p-3">
              <p className="text-xs font-semibold">{pursuit.professionalEmail}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted">
                {pursuit.emailVerifiedAt ? "Deliverability marked verified" : "Not yet verified"} ·{" "}
                {pursuit.emailSource}
              </p>
            </div>
          ) : (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs font-semibold text-primary">
                Add professional contact path
              </summary>
              <form action={saveProfessionalContactPath} className="mt-3 grid gap-2">
                <input type="hidden" name="pursuitId" value={pursuit.id} />
                <input
                  name="professionalEmail"
                  type="email"
                  required
                  placeholder="Professional email"
                  className="rounded-md border border-input-border bg-white px-3 py-2 text-xs"
                />
                <input
                  name="emailSource"
                  required
                  placeholder="Where it came from"
                  className="rounded-md border border-input-border bg-white px-3 py-2 text-xs"
                />
                <label className="flex items-center gap-2 text-[11px] text-muted">
                  <input type="checkbox" name="emailVerified" value="true" />
                  Deliverability verified
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white"
                >
                  Save contact path
                </button>
              </form>
            </details>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatusButton pursuitId={pursuit.id} status="contacted" label="Contacted" />
            <StatusButton pursuitId={pursuit.id} status="conversation" label="Conversation" />
            <StatusButton pursuitId={pursuit.id} status="paused" label="Pause" />
            <StatusButton pursuitId={pursuit.id} status="closed" label="Close" />
          </div>
        </aside>
      </div>
    </article>
  );
}

function StatusButton({
  pursuitId,
  status,
  label,
}: {
  pursuitId: string;
  status: OiPursuitStatus;
  label: string;
}) {
  return (
    <form action={updatePursuitStatus}>
      <input type="hidden" name="pursuitId" value={pursuitId} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-[11px] font-semibold text-muted hover:border-primary hover:text-primary"
      >
        {label}
      </button>
    </form>
  );
}

function CandidateForm() {
  const inputClass =
    "w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm text-foreground";

  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Add to the research queue
      </p>
      <h2 className="mt-1 text-2xl font-semibold">Score another Director+ candidate</h2>
      <p className="mt-2 max-w-[72ch] text-sm leading-6 text-muted">
        Add only public professional information or context you are authorized to use. Authority
        levels are operator judgments, not verified facts, until supported by a source.
      </p>
      <form action={createOpportunityCandidate} className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Person name">
          <input name="name" required className={inputClass} />
        </Field>
        <Field label="Current title">
          <input name="title" required className={inputClass} />
        </Field>
        <Field label="Organization">
          <input name="organizationName" required className={inputClass} />
        </Field>
        <Field label="Organization website">
          <input name="organizationWebsite" type="url" className={inputClass} />
        </Field>
        <Field label="Organization type">
          <select name="organizationKind" defaultValue="payer" className={inputClass}>
            <option value="payer">Health plan / payer</option>
            <option value="health_tech">Health technology</option>
            <option value="health_system">Health system</option>
            <option value="consulting">Consulting / services</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Seniority">
          <select name="seniority" defaultValue="director" className={inputClass}>
            <option value="director">Director</option>
            <option value="vice_president">Vice President</option>
            <option value="senior_vice_president">Senior Vice President</option>
            <option value="c_suite">C-suite</option>
            <option value="other">Unverified</option>
          </select>
        </Field>
        <Field label="Pursuit path">
          <select name="mode" defaultValue="both" className={inputClass}>
            <option value="both">Consulting or FTE</option>
            <option value="consulting">Consulting</option>
            <option value="employment">FTE</option>
          </select>
        </Field>
        <Field label="Target monthly consulting value">
          <input
            name="targetMonthlyValue"
            type="number"
            min="0"
            step="1000"
            defaultValue="20000"
            className={inputClass}
          />
        </Field>
        <Field label="Public source URL">
          <input name="sourceUrl" type="url" className={inputClass} />
        </Field>
        <Field label="Source label">
          <input
            name="sourceLabel"
            placeholder="Company leadership page"
            className={inputClass}
          />
        </Field>
        <Field label="Source date">
          <input name="sourcePublishedAt" type="date" className={inputClass} />
        </Field>
        <Field label="Public professional profile">
          <input name="publicProfileUrl" type="url" className={inputClass} />
        </Field>
        <LevelField name="budgetAuthority" label="Budget authority" />
        <LevelField name="hiringAuthority" label="Hiring influence" />
        <LevelField name="transformationRelevance" label="Transformation relevance" defaultValue="3" />
        <LevelField name="relationshipStrength" label="Relationship / warm path" />
        <LevelField name="sourceConfidence" label="Source confidence" defaultValue="2" />
        <Field label="Domain tags" wide>
          <input
            name="domainTags"
            required
            defaultValue="payer, enterprise-transformation, workflow-modernization"
            className={inputClass}
          />
        </Field>
        <Field label="Visible operating problem" wide>
          <textarea name="problemHypothesis" required rows={3} className={inputClass} />
        </Field>
        <Field label="Why Todd is relevant" wide>
          <textarea name="fitHypothesis" required rows={3} className={inputClass} />
        </Field>
        <Field label="Evidence summary" wide>
          <textarea name="evidenceSummary" required rows={3} className={inputClass} />
        </Field>
        <Field label="Operator notes" wide>
          <textarea name="notes" rows={2} className={inputClass} />
        </Field>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Add and score candidate
          </button>
        </div>
      </form>
    </section>
  );
}

function LevelField({
  name,
  label,
  defaultValue = "0",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <Field label={label}>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-input-border bg-white px-3 py-2 text-sm"
      >
        <option value="0">0 — Unknown / none</option>
        <option value="1">1 — Possible</option>
        <option value="2">2 — Likely</option>
        <option value="3">3 — Strong</option>
      </select>
    </Field>
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

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: number | string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}

function GuideStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-lg border border-border bg-surface p-4">
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
        {number}
      </span>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
    </li>
  );
}

function StatusBadge({ status }: { status: OiPursuitStatus }) {
  const styles: Record<OiPursuitStatus, string> = {
    prospect: "bg-slate-100 text-slate-700",
    research_ready: "bg-amber-100 text-amber-900",
    contact_ready: "bg-emerald-100 text-emerald-800",
    contacted: "bg-blue-100 text-blue-800",
    conversation: "bg-violet-100 text-violet-800",
    paused: "bg-slate-100 text-slate-700",
    closed: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMode(mode: string) {
  return mode === "both" ? "Consulting or FTE" : mode === "employment" ? "FTE" : "Consulting";
}
