import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { IndustryPattern } from "@/components/site/industry-pattern";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries | Transformation & Program Recovery",
  description:
    "TKO works deepest in healthcare, where prior authorization, utilization management, and interoperability define the operating problem. The same program-recovery method transfers to financial services, technology, and private equity operations.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Transformation & Program Recovery",
    description:
      "Healthcare is the primary practice. The operating failure pattern, and the evidence method that resolves it, transfers across regulated and relationship-driven operations.",
    url: absoluteUrl("/industries"),
  },
};

const productLeadershipLinks = [
  {
    title: "RachelOS: the evidence method in production",
    body: "A live, human-governed operating system with a published self-audit. The directly inspectable proof that the assessment method holds under real production work.",
    href: "/proof/rachelos",
    label: "Review the RachelOS evidence",
  },
  {
    title: "Operating System Build & AI Governance",
    body: "How a governed decision layer is designed and built after an assessment: source authority, human approval, escalation logic, and measurement, with AI kept under human control.",
    href: "/services/operating-system-build",
    label: "See the Build engagement",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TKO Industries",
          url: absoluteUrl("/industries"),
          description:
            "Healthcare is the primary practice for TKO. The same operating-intelligence and program-recovery method transfers to financial services, technology, and private equity operations.",
          about: ["Healthcare", "Financial Services", "Technology", "Private Equity"],
        }}
      />
      <PageHero
        eyebrow="Industries"
        title="Healthcare is the practice. The operating pattern transfers."
        description="TKO works deepest in healthcare, where prior authorization, utilization management, and interoperability make the operating problem sharpest. The same failure pattern, and the same evidence method that resolves it, appears across regulated and relationship-driven operations."
        primaryHref="/contact"
        primaryLabel="Request a Program Assessment"
        secondaryHref="/healthcare"
        secondaryLabel="See the Healthcare practice"
      />

      <Section>
        <SectionHeader
          eyebrow="Where TKO works"
          title="One operating failure, several industries."
          description="Each of these industries shares the same condition: information is available, but priorities, attention, and next actions are still resolved manually inside one person's head."
        />
        <div className="mt-10">
          <IndustryPattern />
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-8 border border-border bg-white p-8 md:grid-cols-[1.2fr_auto] md:items-center md:p-12">
          <div className="max-w-[60ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Primary practice
            </p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Healthcare transformation and program recovery
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Two decades inside payer operations, prior authorization, care management,
              and CMS interoperability. This is where the program-recovery method is
              sharpest and where most TKO engagements begin.
            </p>
          </div>
          <Link
            href="/healthcare"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            Explore the Healthcare practice
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Transferability"
          title="The method travels because the pattern does."
          description="Outside healthcare, the same work applies wherever execution crosses teams, tools, and handoffs: turn fragmented signals into trusted facts, make the next decision explicit, and keep humans in control of any automation."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Evidence before category",
              body: "TKO starts from the operating problem, not an industry playbook. The assessment names where the initiative is failing and what to fix first.",
            },
            {
              title: "The same governed path",
              body: "Signal, fact, state, priority, human approval, action, outcome. The path is consistent even when the domain and the vocabulary change.",
            },
            {
              title: "Proof outside healthcare",
              body: "RachelOS demonstrates the operational knowledge pattern in a non-healthcare, relationship-driven workflow, without becoming a separate service line.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="For technical and product buyers"
          title="Prefer to inspect the built system first?"
          description="The transformation work is the practice. For buyers who want to evaluate the product-leadership and AI-governance capability directly, the built proof is one click away."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {productLeadershipLinks.map((item) => (
            <Card key={item.href}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
              <Link
                href={item.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                {item.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Start from the industry, land on the operating problem."
        description="Bring the transformation, program, or workflow under pressure. TKO will help determine where execution is breaking down and what deserves action first."
        primaryLabel="Request a Program Assessment"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
