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
    "TKO applies Operational Intelligence to healthcare operations, financial services, technology operations, and private equity value creation.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries",
    description:
      "Operational Intelligence for healthcare efficiency, client engagement, revenue operations, and portfolio execution visibility.",
    url: absoluteUrl("/industries"),
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Different industries. The same gap between data and action."
        description="TKO is organized around operational problems, not vertical sprawl. Healthcare, Financial Services, Technology, and Private Equity each face the same decision-system gap in different operating contexts."
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-4">
          {industries.map((industry) => {
            const isLaunchWedge = industry.title === "Healthcare";
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
          description="These problems explain why operational intelligence matters across healthcare operations, revenue operations, customer lifecycle management, client engagement, and portfolio value creation."
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
