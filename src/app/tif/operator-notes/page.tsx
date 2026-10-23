import type { Metadata } from "next";
import { getAllInsights } from "@/lib/insights";
import { getOffer } from "@/lib/offers";
import {
  assessOperatorNote,
  composeLinkedInPost,
  evidenceHref,
  findDuplicateTopics,
  loadOperatorNotes,
} from "@/lib/tif/operator-notes";

export const metadata: Metadata = {
  title: "TIF Operator Notes",
  robots: { index: false, follow: false },
};

// Repository-native, like the guide workbench: notes live in
// content/proof/stories/operator-notes.json and are read at request time.
export const dynamic = "force-dynamic";

const READINESS_STYLES: Record<string, string> = {
  ready: "bg-emerald-100 text-emerald-800",
  needs_evidence: "bg-amber-100 text-amber-800",
  not_publishable: "bg-red-100 text-red-800",
};

const READINESS_LABELS: Record<string, string> = {
  ready: "ready for review",
  needs_evidence: "needs evidence",
  not_publishable: "not publishable",
};

export default function TifOperatorNotesPage() {
  const notes = loadOperatorNotes();
  const guides = getAllInsights().map((guide) => ({ id: guide.slug, title: guide.title }));
  const duplicates = findDuplicateTopics(notes, guides);
  const results = notes.map((note) => ({
    note,
    assessment: assessOperatorNote(note),
    draft: composeLinkedInPost(note),
    duplicates: duplicates.filter((item) => item.noteId === note.id || item.otherId === note.id),
  }));
  const count = (readiness: string) => results.filter((result) => result.assessment.readiness === readiness).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold">Operator Notes</h1>
        <p className="mt-3 max-w-[70ch] text-sm leading-6 text-muted">
          Build-in-public stories from real RachelOS engineering and operating evidence. Each
          draft is composed from the note&apos;s verified fields, so edit the wording, not the
          facts. Nothing here posts, schedules, or contacts anyone. A note is published by a
          person, then recorded with its reviewer, date and permalink.
        </p>
        <p className="mt-4 text-sm font-semibold">
          {count("ready")} ready for review · {count("needs_evidence")} need evidence ·{" "}
          {count("not_publishable")} not publishable
          {duplicates.length > 0 ? ` · ${duplicates.length} duplicate topic(s)` : ""}
        </p>
      </header>

      <section className="mt-10 space-y-8">
        {results.map(({ note, assessment, draft, duplicates: noteDuplicates }) => {
          const offer = note.commercial.offer ? getOffer(note.commercial.offer) : undefined;

          return (
            <article key={note.id} className="border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    {note.rank}. {note.title}
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    {note.id} · {note.identity} voice · {note.storyType.replaceAll("_", " ")} · {note.format} ·{" "}
                    editorial: {note.editorial.status}
                    {note.editorial.reviewer ? ` · reviewed by ${note.editorial.reviewer}` : ""}
                    {note.editorial.reviewedDate ? ` on ${note.editorial.reviewedDate}` : ""}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                    READINESS_STYLES[assessment.readiness]
                  }`}
                >
                  {READINESS_LABELS[assessment.readiness]}
                </span>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-muted">Audience</dt>
                  <dd>{note.audience}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Commercial</dt>
                  <dd>
                    {note.commercial.relevance} · {offer?.name ?? "no TKO offer"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Sensitivity</dt>
                  <dd>
                    {note.sensitivity.confidentiality}
                    {note.sensitivity.notes ? ` — ${note.sensitivity.notes}` : ""}
                  </dd>
                </div>
              </dl>

              {assessment.issues.length > 0 || noteDuplicates.length > 0 ? (
                <div className="mt-4 border-l-2 border-amber-500 bg-amber-50 p-4">
                  <ul className="space-y-1 text-xs text-amber-900">
                    {assessment.issues.map((issue) => (
                      <li key={`${issue.field}-${issue.message}`}>
                        <span className="font-mono">{issue.field}</span> — {issue.message}
                      </li>
                    ))}
                    {noteDuplicates.map((item) => (
                      <li key={`${item.noteId}-${item.otherId}`}>
                        <span className="font-mono">duplicate</span> — {item.noteId} / {item.otherId}: {item.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {draft.ok ? (
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold">
                    LinkedIn draft ({draft.draft.characterCount} characters)
                  </summary>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border border-border bg-surface p-3 text-xs leading-5">
                    {draft.draft.body}
                  </pre>
                  {draft.draft.firstComment ? (
                    <p className="mt-2 text-xs">
                      <span className="font-semibold text-muted">First comment: </span>
                      <code className="break-all">{draft.draft.firstComment}</code>
                    </p>
                  ) : null}
                  {draft.draft.warnings.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted">
                      {draft.draft.warnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  ) : null}
                </details>
              ) : (
                <p className="mt-5 text-xs text-red-800">No draft: {draft.reasons.join("; ")}</p>
              )}

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold">Evidence ({note.evidence.length})</summary>
                <ul className="mt-3 space-y-2 text-xs leading-5">
                  {note.evidence.map((item) => {
                    const href = evidenceHref(item.ref);
                    return (
                      <li key={item.id}>
                        <span className="font-mono">{item.id}</span> · {item.kind.replaceAll("_", " ")} ·{" "}
                        {item.claimStatus.replaceAll("_", " ")} · {item.observedAt} —{" "}
                        {href ? (
                          <a href={href} className="text-primary underline-offset-4 hover:underline">
                            {item.ref}
                          </a>
                        ) : (
                          <span>{item.ref}</span>
                        )}
                        <p className="text-muted">{item.summary}</p>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </article>
          );
        })}
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-xs leading-5 text-muted">
        <p>
          After a note is published, record its permalink in the registry and its results in{" "}
          <code>content/feedback/post-performance.csv</code>. Impressions and reactions are leading
          indicators only; qualified conversations and opportunities are what count.
        </p>
      </footer>
    </main>
  );
}
