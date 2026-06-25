import { industries } from "@/lib/content";

export function IndustryPattern() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <article key={industry.title} className="bg-white p-6">
            <p
              className={
                industry.title === "Healthcare"
                  ? "text-sm font-semibold uppercase tracking-[0.1em] text-primary"
                  : "text-sm font-semibold uppercase tracking-[0.1em] text-muted"
              }
            >
              {industry.priority}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{industry.title}</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted">{industry.description}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-[80ch] text-sm leading-6 text-muted">
        These industries share a practical operating condition: information is
        available, but priorities, attention, and next actions are still resolved
        manually. Operational Intelligence turns that unresolved work into a
        repeatable execution system.
      </p>
    </div>
  );
}
