import { industries } from "@/lib/content";

export function IndustryPattern() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <article key={industry.title} className="bg-white p-6">
            <p
              className={
                industry.priority === "Launch wedge"
                  ? "text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                  : "text-xs font-semibold uppercase tracking-[0.14em] text-muted"
              }
            >
              {industry.priority}
            </p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{industry.title}</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted">{industry.description}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-muted">
        Same operating failure, different industries: work crosses boundaries faster than
        leaders can observe, govern, and act on it.
      </p>
    </div>
  );
}
