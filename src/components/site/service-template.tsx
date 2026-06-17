import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getService } from "@/lib/content";

export function ServiceTemplate({ slug }: { slug: string }) {
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={service.entry}
        title={service.title}
        description={service.overview}
        primaryHref="/contact"
        primaryLabel="Start the Diagnostic"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Pricing Position
            </p>
            <p className="mt-4 text-3xl font-semibold">{service.price}</p>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Timeline
            </p>
            <p className="mt-4 text-3xl font-semibold">{service.duration}</p>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Service Role
            </p>
            <p className="mt-4 text-2xl font-semibold">{service.entry}</p>
          </Card>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Outcomes"
            title="What the engagement must make possible."
            description="Each service exists to improve operational truth, execution confidence, and the buyer's ability to decide what happens next."
          />
          <ul className="grid gap-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="border border-border bg-white p-5 text-muted">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Process"
            title="Constrained, evidence-led work."
            description="The work is structured to avoid open-ended consulting drift and keep the buyer focused on operational evidence."
          />
          <ol className="grid gap-3">
            {service.process.map((step, index) => (
              <li key={step} className="grid gap-5 border border-border p-5 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-7 text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Deliverables"
          title="The concrete assets produced by the engagement."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((deliverable) => (
            <div key={deliverable} className="border border-border bg-white p-5">
              <p className="font-semibold">{deliverable}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Questions buyers should resolve before intake." />
        <div className="mt-10">
          <Faq items={service.faqs} />
        </div>
      </Section>

      <CtaBand
        title={
          service.slug === "diagnostic"
            ? "Use the Diagnostic to establish operational truth."
            : "The right starting point is still the Diagnostic."
        }
        description={
          service.slug === "diagnostic"
            ? "The engagement is designed for leaders with an urgent, funded operating problem who need evidence, prioritization, and a 90-day recovery roadmap."
            : "Build and advisory work follow when the operating problem is already visible. The Diagnostic creates the evidence base for that decision."
        }
      />
    </>
  );
}

