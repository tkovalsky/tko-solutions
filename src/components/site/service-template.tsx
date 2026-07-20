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
        primaryLabel="Find Your Highest-Leverage Workflow"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Commercial model
            </p>
            <p className="mt-4 text-3xl font-semibold">{service.price}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Timeline
            </p>
            <p className="mt-4 text-3xl font-semibold">{service.duration}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
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
            title="What should improve as a result."
            description="Every engagement is designed to reduce execution drag, clarify ownership, protect capacity or revenue, and give leadership a defensible next decision."
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
            title="A focused path from problem to action."
            description="The work stays grounded in the operating problem, the business exposure, the decision required, and the change most likely to improve performance."
          />
          <ol className="grid gap-3">
            {service.process.map((step, index) => (
              <li key={step} className="grid gap-5 border border-border p-5 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
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
        <SectionHeader eyebrow="FAQ" title="Questions to resolve before engaging." />
        <div className="mt-10">
          <Faq items={service.faqs} />
        </div>
      </Section>

      <CtaBand
        title={
          service.slug === "diagnostic"
            ? "Find the workflow where better design and governed AI can create measurable leverage."
            : "Start with the operating problem, not a preselected solution."
        }
        description={
          service.slug === "diagnostic"
            ? "The three-week engagement gives leaders the real workflow, prioritized AI opportunities, required human controls, and a 90-day implementation path."
            : "Build and advisory work follow when the operating problem is clear and there is a business case to improve it."
        }
      />
    </>
  );
}
