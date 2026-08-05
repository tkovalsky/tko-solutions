import Link from "next/link";

// One place where the evidence boundary lives. Every other surface links here
// instead of restating a disclaimer, so the boundary stays accurate without
// becoming the dominant reading experience.

const notes = [
  {
    title: "Employment history demonstrates experience",
    body: "Roles and scope are verifiable and are presented as experience. No employer or client endorses this practice or its conclusions.",
  },
  {
    title: "Client outcomes are not published without permission",
    body: "Enterprise programs carry confidentiality obligations that outlast the engagement. Where a result cannot be published, the mechanism and my role are described and the number is left out rather than estimated.",
  },
  {
    title: "Each case supports a specific capability",
    body: "Healthcare cases establish domain and operating experience. RachelOS shows implementation discipline in an environment I built and run. They answer different questions and are not interchangeable.",
  },
];

export function EvidenceNote({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border border-border bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold">How to read this evidence</h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <div key={note.title}>
              <dt className="text-sm font-semibold text-foreground">{note.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{note.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** Compact pointer used on individual case pages so the boundary is one click away. */
export function EvidenceNoteLink({ className }: { className?: string }) {
  return (
    <p className={className}>
      <Link
        href="/selected-work#how-to-read-this-evidence"
        className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
      >
        How to read this evidence
      </Link>
    </p>
  );
}
