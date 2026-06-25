import { founderCredibility } from "@/lib/content";

export function Founder() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
          Founder Credibility
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          Operator first.{" "}
          <span className="text-primary">Technologist second.</span>
        </h2>
        <p className="mt-6 max-w-[60ch] text-base leading-7 text-muted">
          Todd has led enterprise healthcare modernization, workflow
          transformation, and operational execution work where the hard problem was
          rarely the tool itself. The hard problem was helping leaders see what
          mattered, preserve knowledge, and move teams toward the right next action.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {founderCredibility.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
