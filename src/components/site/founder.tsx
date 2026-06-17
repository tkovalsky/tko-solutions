import { founderCredibility } from "@/lib/content";

export function Founder() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Founder Credibility
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          Operational complexity looks different.{" "}
          <span className="text-primary">The failure patterns do not.</span>
        </h2>
        <p className="mt-6 max-w-[60ch] text-base leading-7 text-muted">
          The same operating failures appear in healthcare, wealth management, asset
          management, capital markets, and enterprise programs: work crosses boundaries
          faster than leaders can observe, govern, and act on it. TKO is built on
          recognizing that pattern, not on industry tenure alone.
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
