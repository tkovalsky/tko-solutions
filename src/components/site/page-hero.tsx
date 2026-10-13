import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

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
  primaryHref = "/contact",
  primaryLabel = site.cta,
  secondaryHref,
  secondaryLabel,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-5xl">
          {eyebrow ? (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-8 text-muted md:text-xl md:leading-9">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href={primaryHref} ctaLocation="page_hero">{primaryLabel}</LinkButton>
            {secondaryHref && secondaryLabel ? (
              <LinkButton href={secondaryHref} variant="secondary" ctaLocation="page_hero">
                {secondaryLabel}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
