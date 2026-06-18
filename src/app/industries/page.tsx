import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { industries, problems } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "TKO applies Operational Intelligence to healthcare first, with Financial Services, Wealth and Asset Management, and Capital Markets as secondary contexts.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries",
    description:
      "Healthcare leads the launch site. Secondary regulated industries support the same operational complexity pattern.",
    url: absoluteUrl("/industries"),
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Different industries. The same invisible operating failure."
        description="TKO is organized around Operational Intelligence problems, not vertical sprawl. Healthcare is the launch wedge because proof is strongest there. Financial Services, Wealth and Asset Management, and Capital Markets support the broader category."
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-4">
          {industries.map((industry) => {
            const isLaunchWedge = industry.priority === "Launch wedge";
            return (
              <Card
                key={industry.title}
                className={isLaunchWedge ? "border-primary/40 ring-1 ring-primary/20" : ""}
              >
                <p
                  className={
                    isLaunchWedge
                      ? "text-sm font-semibold uppercase tracking-[0.1em] text-primary"
                      : "text-sm font-semibold uppercase tracking-[0.1em] text-muted"
                  }
                >
                  {industry.priority}
                </p>
                <h2 className="mt-6 text-2xl font-semibold text-foreground">{industry.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{industry.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Operating Problems"
          title="Industry relevance is proven through shared operational complexity."
          description="The website should not create empty industry pages. These problems are the architecture that lets future proof fit without redesign."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <article key={problem.title} className="border border-border bg-white p-5">
              <h3 className="text-lg font-semibold">{problem.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

