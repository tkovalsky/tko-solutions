import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { site } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string | null;
  secondaryLabel?: string | null;
};

export function CtaBand({
  title = "Find the constraint holding performance back.",
  description = "Bring the workflow, revenue process, or operating problem under pressure. TKO will help determine where execution is breaking down and what deserves action first.",
  primaryHref = "/contact",
  primaryLabel = "Discuss an Active Initiative",
  secondaryHref = null,
  secondaryLabel = null,
}: CtaBandProps) {
  const resolvedSecondaryHref = secondaryHref;
  const resolvedSecondaryLabel = secondaryLabel;

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-midnight py-16 text-white md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgb(var(--accent-rgb)/0.16),_transparent_60%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1.3fr_auto] md:items-end lg:px-8">
        <div className="max-w-[65ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary-light">
            Executive operating review
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">{description}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:flex-col md:items-stretch">
          <LinkButton href={primaryHref} className="bg-primary hover:bg-primary-dark">
            {primaryLabel}
          </LinkButton>
          {resolvedSecondaryHref && resolvedSecondaryLabel ? (
            <Link
              href={resolvedSecondaryHref}
              className="group inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline md:justify-start"
            >
              {resolvedSecondaryLabel}
              <ArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ) : null}
          <p className="text-center text-sm leading-6 text-white/60 md:text-left">
            Or directly:{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              email
            </a>
            <span className="mx-1.5 text-white/40">·</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
