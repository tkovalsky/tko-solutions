import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { industries, truthFramework } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "TKO's About page frames founder credibility through pattern recognition across healthcare, wealth management, asset management, capital markets, and enterprise operations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About TKO Solutions",
    description:
      "Pattern recognition across complex operating environments, not autobiography.",
    url: absoluteUrl("/about"),
  },
};

const credibility = [
  "Healthcare transformation and modernization",
  "Prior authorization and administrative burden",
  "Care management and enterprise healthcare operations",
  "Interoperability and compliance-driven operating change",
  "Wealth management, asset management, and capital markets operations",
  "Product ownership, program leadership, PMO transformation, and operating model design",
  "Operational Intelligence System design and production system-building",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Pattern recognition across complex operating environments."
        description="TKO is built on a repeatable observation: complex organizations rarely fail because no one is working. They fail because work crosses teams, systems, and governance structures faster than leaders can see, govern, and act."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Category Thesis"
            title="Operational Intelligence is the missing layer between activity and execution truth."
            description="Healthcare is the launch wedge because proof is strongest there. The same failure pattern appears in wealth management, asset management, capital markets, and enterprise operations."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <Card key={industry.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {industry.priority}
                </p>
                <h2 className="mt-5 text-xl font-semibold">{industry.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {industry.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Founder Credibility Architecture"
          title="Credibility organized by operating problem, not chronology."
          description="The relevant credential is the ability to recognize the same hidden failure pattern across regulated, workflow-heavy environments."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {credibility.map((item) => (
            <div key={item} className="border border-border bg-white p-5">
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Method"
            title="Pattern recognition becomes useful only when it becomes operational truth."
            description="The Operational Truth Framework is the bridge between executive concern and system design."
          />
          <ol className="space-y-3">
            {truthFramework.map((item, index) => (
              <li key={item} className="grid gap-5 border border-border p-5 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Proof Architecture"
          title="The site names proof according to what is actually evidenced."
          description="Production system proof, anonymized enterprise healthcare work, career credibility, and gated attribution each have a specific role. This protects credibility while the public proof base matures."
        />
      </Section>
      <CtaBand />
    </>
  );
}

