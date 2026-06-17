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
    <section className="border-t border-border bg-[#111111] py-20 text-white md:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1.3fr_auto] md:items-end lg:px-8">
        <div className="max-w-[65ch]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
            Diagnostic Entry Point
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">{description}</p>
        </div>
        <LinkButton
          href="/contact"
          variant="secondary"
          className="border-white bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
        >
          Start the Diagnostic
        </LinkButton>
      </div>
    </section>
  );
}

