import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/assessment",
  primaryLabel = "Explore the Operational Recovery Assessment",
  secondaryHref = "/services/diagnostic",
  secondaryLabel = "Schedule an Operational Truth Diagnostic",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-5xl">
          {eyebrow ? (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-foreground md:text-7xl">
            {title}
          </h1>
          <p className="mt-8 max-w-[65ch] text-xl leading-9 text-muted">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={primaryHref}>{primaryLabel}</LinkButton>
            {secondaryHref && secondaryLabel ? (
              <LinkButton href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
