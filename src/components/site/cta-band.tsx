import { LinkButton } from "@/components/ui/button";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({
  title = "Start with operational truth.",
  description = "The Diagnostic establishes where work is actually failing, what should happen next, and which recovery opportunities deserve executive attention.",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-midnight py-20 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.16),_transparent_60%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1.3fr_auto] md:items-end lg:px-8">
        <div className="max-w-[65ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary-light">
            Diagnostic Entry Point
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">{description}</p>
        </div>
        <LinkButton
          href="/contact"
          className="bg-primary hover:bg-primary-dark"
        >
          Start the Diagnostic
        </LinkButton>
      </div>
    </section>
  );
}

