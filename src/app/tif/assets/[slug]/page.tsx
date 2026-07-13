import { readFile } from "node:fs/promises";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DERIVATIVE_ASSET_LABELS,
  compareVersionText,
} from "@/lib/tif/content-workflow";
import { getAssetManualEditState, formatAssetDate } from "@/lib/tif/manual-edit-protection";
import { tifDb } from "@/lib/tif/db";
import {
  createDerivativeAsset,
  createRevisionRequest,
  generateAsset,
  updateAssetWorkflowStatus,
} from "../../actions";

export const metadata: Metadata = {
  title: "TIF Asset",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; to?: string }>;
};

export default async function TifAssetDetailPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { from, to } = await searchParams;

  const asset = await tifDb.asset.findUnique({
    where: { slug },
    include: {
      opportunity: { select: { slug: true, title: true, tenant: true, sourceType: true, sourceUrl: true, contextNotes: true } },
      evidenceLinks: { include: { evidence: true } },
      versions: { orderBy: { versionNumber: "desc" } },
      revisionRequests: { orderBy: { createdAt: "desc" } },
      derivativeAssets: { orderBy: { createdAt: "desc" } },
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
  const compareFrom =
    asset.versions.find((version) => String(version.versionNumber) === from) ?? asset.versions[1];
  const compareTo =
    asset.versions.find((version) => String(version.versionNumber) === to) ?? asset.versions[0];
  const comparison =
    compareFrom && compareTo && compareFrom.id !== compareTo.id
      ? compareVersionText(compareFrom.body, compareTo.body)
      : null;
  const openRevisionRequests = asset.revisionRequests.filter((request) => request.status === "open");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/tif" className="text-xs font-semibold uppercase tracking-wide text-muted hover:underline">
        ← Back to console
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="text-2xl font-semibold">{asset.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {asset.tenant} · {asset.assetType} · {asset.status} · {asset.businessUnit} · {asset.outputPath}
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

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <WorkflowStatusForm assetId={asset.id} slug={asset.slug} currentStatus={asset.status} />
        <RevisionRequestForm
          assetId={asset.id}
          slug={asset.slug}
          versionNumber={asset.currentVersionNumber || undefined}
        />
        <DerivativeForm assetId={asset.id} slug={asset.slug} />
      </section>

      {asset.opportunity && (
        <section className="mb-8 rounded-lg border border-border bg-white p-5 text-sm">
          <h2 className="font-semibold">Opportunity Context</h2>
          <p className="mt-2 text-muted">
            {asset.opportunity.tenant} · {asset.opportunity.sourceType}
            {asset.opportunity.sourceUrl ? ` · ${asset.opportunity.sourceUrl}` : ""}
          </p>
          {asset.opportunity.contextNotes && (
            <p className="mt-3 whitespace-pre-wrap text-muted">{asset.opportunity.contextNotes}</p>
          )}
        </section>
      )}

      <section className="mb-8 rounded-lg border border-border bg-white p-5">
        <h2 className="text-lg font-semibold">Revision Requests</h2>
        <div className="mt-4 divide-y divide-border">
          {asset.revisionRequests.map((request) => (
            <div key={request.id} className="py-3 text-sm">
              <p className="font-semibold">
                {request.status} {request.versionNumber ? `· v${request.versionNumber}` : ""}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-muted">{request.notes}</p>
            </div>
          ))}
          {asset.revisionRequests.length === 0 && <p className="text-sm text-muted">No revision requests yet.</p>}
        </div>
        {openRevisionRequests.length > 0 && (
          <form action={generateAsset} className="mt-4">
            <input type="hidden" name="opportunitySlug" value={asset.slug} />
            <input type="hidden" name="regenerateAnyway" value="true" />
            <button type="submit" className="rounded-lg border border-primary px-3 py-1.5 text-sm font-semibold text-primary">
              Regenerate With Revision Notes
            </button>
          </form>
        )}
      </section>

      <section className="mb-8 rounded-lg border border-border bg-white p-5">
        <h2 className="text-lg font-semibold">Draft History</h2>
        <div className="mt-4 divide-y divide-border">
          {asset.versions.map((version) => (
            <div key={version.id} className="flex flex-wrap items-start justify-between gap-3 py-3 text-sm">
              <div>
                <p className="font-semibold">Draft v{version.versionNumber}</p>
                <p className="mt-1 text-xs text-muted">
                  {version.createdBy} · {version.createdAt.toLocaleString()}
                </p>
                {version.revisionNotes && (
                  <p className="mt-2 max-w-[70ch] whitespace-pre-wrap text-xs text-muted">
                    Revision notes: {version.revisionNotes}
                  </p>
                )}
              </div>
              <Link
                href={`/tif/assets/${asset.slug}?from=${Math.max(1, version.versionNumber - 1)}&to=${version.versionNumber}`}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Compare
              </Link>
            </div>
          ))}
          {asset.versions.length === 0 && <p className="text-sm text-muted">No captured versions yet. Regenerate this asset to create v1.</p>}
        </div>
      </section>

      {comparison && compareFrom && compareTo && (
        <section className="mb-8 rounded-lg border border-border bg-white p-5">
          <h2 className="text-lg font-semibold">
            Compare v{compareFrom.versionNumber} → v{compareTo.versionNumber}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {comparison.changedLineCount} changed line(s). Showing first {comparison.changedLines.length}.
          </p>
          <div className="mt-4 divide-y divide-border rounded-md border border-border">
            {comparison.changedLines.map((line) => (
              <div key={line.line} className="grid gap-0 text-xs md:grid-cols-2">
                <pre className="overflow-x-auto whitespace-pre-wrap bg-red-50 p-3">- {line.before || " "}</pre>
                <pre className="overflow-x-auto whitespace-pre-wrap bg-emerald-50 p-3">+ {line.after || " "}</pre>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8 rounded-lg border border-border bg-white p-5">
        <h2 className="text-lg font-semibold">Derivative Assets</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {asset.derivativeAssets.map((derivative) => (
            <article key={derivative.id} className="rounded-md border border-border bg-surface p-4">
              <p className="text-sm font-semibold">
                {DERIVATIVE_ASSET_LABELS[derivative.type]} {derivative.sourceVersionNumber ? `· v${derivative.sourceVersionNumber}` : ""}
              </p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-muted">{derivative.body}</pre>
            </article>
          ))}
          {asset.derivativeAssets.length === 0 && <p className="text-sm text-muted">No derivative assets yet.</p>}
        </div>
      </section>

      <article className="whitespace-pre-wrap rounded-xl border border-border bg-white p-6 font-mono text-sm leading-6">
        {markdown}
      </article>
    </main>
  );
}

function WorkflowStatusForm({
  assetId,
  slug,
  currentStatus,
}: {
  assetId: string;
  slug: string;
  currentStatus: string;
}) {
  return (
    <form action={updateAssetWorkflowStatus} className="rounded-lg border border-border bg-white p-4">
      <input type="hidden" name="assetId" value={assetId} />
      <input type="hidden" name="slug" value={slug} />
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Approval gate</span>
        <select name="status" defaultValue={currentStatus} className="rounded-md border border-input-border px-3 py-2">
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
        </select>
      </label>
      <button type="submit" className="mt-3 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white">
        Update Status
      </button>
    </form>
  );
}

function RevisionRequestForm({
  assetId,
  slug,
  versionNumber,
}: {
  assetId: string;
  slug: string;
  versionNumber?: number;
}) {
  return (
    <form action={createRevisionRequest} className="rounded-lg border border-border bg-white p-4">
      <input type="hidden" name="assetId" value={assetId} />
      <input type="hidden" name="slug" value={slug} />
      {versionNumber && <input type="hidden" name="versionNumber" value={versionNumber} />}
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Revision request</span>
        <textarea name="notes" required rows={4} className="rounded-md border border-input-border px-3 py-2" />
      </label>
      <button type="submit" className="mt-3 rounded-lg border border-primary px-3 py-1.5 text-sm font-semibold text-primary">
        Request Revision
      </button>
    </form>
  );
}

function DerivativeForm({ assetId, slug }: { assetId: string; slug: string }) {
  return (
    <form action={createDerivativeAsset} className="rounded-lg border border-border bg-white p-4">
      <input type="hidden" name="assetId" value={assetId} />
      <input type="hidden" name="slug" value={slug} />
      <label className="grid gap-2 text-sm">
        <span className="font-semibold">Derivative asset</span>
        <select name="type" className="rounded-md border border-input-border px-3 py-2" defaultValue="linkedin_post">
          {Object.entries(DERIVATIVE_ASSET_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <details className="mt-3 text-sm" open>
        <summary className="cursor-pointer font-semibold">Channel context</summary>
        <div className="mt-3 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-muted">Voice</span>
            <select name="voice" defaultValue="rachel" className="rounded-md border border-input-border px-3 py-2">
              <option value="rachel">Rachel</option>
              <option value="todd">Todd / TKO</option>
              <option value="consumer">Consumer</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Audience</span>
            <input name="audience" placeholder="NJ buyers relocating to Florida" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Objective</span>
            <input name="objective" placeholder="Drive qualified guide visits" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">CTA</span>
            <input name="cta" defaultValue="Learn More" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Tracked content link</span>
            <input name="destinationUrl" type="url" placeholder="https://...?...utm_source=" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Geography</span>
            <input name="geography" defaultValue="Florida" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Privacy treatment</span>
            <select name="privacyMode" defaultValue="not_applicable" className="rounded-md border border-input-border px-3 py-2">
              <option value="not_applicable">Not applicable</option>
              <option value="anonymized">Anonymized real situation</option>
              <option value="composite">Clearly labeled composite</option>
              <option value="consent_backed">Consent-backed story</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Channel rules / notes</span>
            <textarea name="channelNotes" rows={2} placeholder="Subreddit rules, placement limits, claim guards..." className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Behavioral alignment</p>
          </div>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Buyer domain</span>
            <select name="buyerDomain" defaultValue="rachel_luxury" className="rounded-md border border-input-border px-3 py-2">
              <option value="rachel_luxury">Rachel luxury / relocation</option>
              <option value="tko_executive">TKO operator / executive</option>
              <option value="cre_tenant_rep">CRE tenant representation</option>
              <option value="business_owner_exit">Business-owner exit readiness</option>
              <option value="general">General</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Buyer journey stage</span>
            <select name="journeyStage" defaultValue="exploring" className="rounded-md border border-input-border px-3 py-2">
              <option value="exploring">Exploring possibilities</option>
              <option value="defining">Defining the decision</option>
              <option value="comparing">Comparing options</option>
              <option value="validating">Validating trust and proof</option>
              <option value="ready_to_act">Ready to act</option>
              <option value="post_decision">Post-decision</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Search intent</span>
            <select name="searchIntent" defaultValue="specific" className="rounded-md border border-input-border px-3 py-2">
              <option value="broad">Broad research</option>
              <option value="specific">Specific / detailed question</option>
              <option value="high_intent">High intent</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Observed search phrase</span>
            <input name="searchPhrase" placeholder="Where can I find the Florida home that fits my next chapter?" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Decision job</span>
            <select name="decisionJob" defaultValue="certainty" className="rounded-md border border-input-border px-3 py-2">
              <option value="possibility">Possibility / aspiration</option>
              <option value="identity">Identity / next role</option>
              <option value="belonging">Belonging / community</option>
              <option value="certainty">Certainty</option>
              <option value="simplification">Simplification</option>
              <option value="legacy">Legacy / family</option>
              <option value="control">Control / governance</option>
              <option value="risk_reduction">Risk reduction</option>
              <option value="location_fit">Location / occupancy fit</option>
              <option value="transferability">Business transferability</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Expressed motivation</span>
            <textarea name="expressedMotivation" rows={2} placeholder="Use the person's own words; do not infer sensitive traits." className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Barrier or unanswered question</span>
            <textarea name="barrier" rows={2} placeholder="What is keeping the person from deciding?" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Price / value context</span>
            <input name="priceOrValueContext" placeholder="$2M–$5M homes or Director–VP operating impact" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Desired next action</span>
            <textarea name="desiredAction" rows={2} placeholder="Call Rachel for a guided shortlist; connect with Todd about the operating problem..." className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Commercial context</p>
          </div>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Market / corridor</span>
            <input name="market" placeholder="Delray Beach east; Congress Avenue corridor" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Property or business type</span>
            <input name="propertyOrBusinessType" placeholder="Medical office, restaurant, professional services firm..." className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Lease or exit horizon</span>
            <input name="leaseOrExitHorizon" placeholder="Renewal in 12 months; owner exit in 24–36 months" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Field observation summary</span>
            <textarea name="fieldObservationSummary" rows={3} placeholder="Dated observations from a safe drive-by or site visit; separate visible facts from judgment." className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Licensed referral partner</span>
            <input name="referralPartner" placeholder="Confirm person and brokerage before publishing" className="rounded-md border border-input-border px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-muted">Licensing disclosure</span>
            <textarea name="licenseDisclosure" rows={3} placeholder="Educational intelligence only; licensed services handled by..." className="rounded-md border border-input-border px-3 py-2" />
          </label>
        </div>
      </details>
      <button type="submit" className="mt-3 rounded-lg border border-primary px-3 py-1.5 text-sm font-semibold text-primary">
        Generate Channel Package
      </button>
    </form>
  );
}
