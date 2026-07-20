import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { CredibilityStrip } from "@/components/site/credibility-strip";
import { CtaBand } from "@/components/site/cta-band";
import { EngagementPath } from "@/components/site/engagement-path";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { ProblemGrid } from "@/components/site/problem-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI-Assisted Operations Modernization for Complex Service Businesses",
  description:
    "Expose hidden handoffs, decision bottlenecks, and knowledge trapped in people, then design governed AI-assisted workflows that improve execution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI-Assisted Operations Modernization",
    description:
      "Turn messy work into an operating system your team and AI can actually use.",
    url: absoluteUrl("/"),
  },
};

const methodSteps = [
  {
    stage: "Expose the real work",
    description:
      "Map the official process against the exceptions, handoffs, workarounds, and judgment that keep the workflow moving.",
  },
  {
    stage: "Design the better operating model",
    description:
      "Make decision rights, ownership, escalation, measures, and the trusted next action explicit.",
  },
  {
    stage: "Implement and govern AI-assisted workflows",
    description:
      "Apply AI only where evidence, privacy, human review, and auditability support a measurable operating improvement.",
  },
];

const rachelosProofStrip = [
  {
    title: "Queue",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS queue showing ranked leads, action counts, and queue sections.",
  },
  {
    title: "Approval",
    image: "/proof/rachelos/human-approval.png",
    alt: "RachelOS human approval surface for relationship updates and recommended questions.",
  },
  {
    title: "Memory",
    image: "/proof/rachelos/relationship-memory.png",
    alt: "RachelOS relationship memory workspace showing current reality and next action.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TKO Solutions",
          url: absoluteUrl("/"),
          description:
            "AI-assisted operations modernization for complex service businesses: expose the real workflow, reduce operational friction, and design governed AI-assisted execution.",
        }}
      />

      <Hero />

      <CredibilityStrip />

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="The Operating Problem"
              title="The operation looks orderly on paper. The real work runs through exceptions, memory, and hidden coordination."
              description="That gap is where decisions slow down, senior people become human APIs, accountability blurs, and AI pilots fail to create measurable operating value."
            />
            <ul className="mt-6 space-y-2 text-base leading-7 text-muted">
              <li>
                <Link
                  href="/problems"
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  Recognize the pattern
                </Link>
              </li>
              <li>Meetings, email, spreadsheets, Slack, or Teams hold the workflow together</li>
              <li>Undocumented judgment determines how exceptions move</li>
              <li>Systems show activity but no trusted next action</li>
              <li>AI tools exist without a workflow, control model, or measurable outcome</li>
            </ul>
            <ArrowLink href="/problems" className="mt-8">
              Explore the operating symptoms
            </ArrowLink>
          </div>
          <ProblemGrid />
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies
            .filter((study) => ["from-crm-to-operating-system", "prior-authorization-modernization", "cre-intelligence-model"].includes(study.slug))
            .map((study) => (
              <Card key={study.slug}>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                  {study.proofLevel}
                </p>
                <h3 className="mt-5 text-2xl font-semibold">{study.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
                  <span className="font-semibold text-primary">Evidence scope: </span>
                  {study.evidence[0]}
                </p>
                <ArrowLink href={`/selected-work/${study.slug}`} className="mt-8">
                  View selected work
                </ArrowLink>
              </Card>
            ))}
        </div>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Operational truth"
          title="Improve the workflow that actually exists, not the one described in the procedure."
          description="TKO connects strategy, workflow, product, technology, and execution so the business can see what is happening, decide what should change, and use AI without surrendering human control."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {methodSteps.map((step, index) => (
            <Card key={step.stage}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{step.stage}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Method &amp; Evidence Proof
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight">
              RachelOS: proof the evidence method holds in production.
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              RachelOS is the reference implementation of how TKO works, not the
              product TKO sells. It is a live system, built and audited in
              public, where every capability is graded implemented, activated,
              validated, or unvalidated. It shows the same evidence discipline
              TKO brings to a transformation or program assessment. What
              transfers is the method and its governance, not the software.
            </p>
            <ArrowLink href="/proof/rachelos" className="mt-6">
              Review the RachelOS evidence
            </ArrowLink>
            <ArrowLink href="/proof/transfer" className="mt-3">
              Why this matters outside real estate
            </ArrowLink>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {rachelosProofStrip.map((asset) => (
              <figure
                key={asset.title}
                className="overflow-hidden border border-border bg-white"
              >
                <div className="relative aspect-[4/3] bg-background">
                  <Image
                    src={asset.image}
                    alt={asset.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <figcaption className="border-t border-border px-5 py-4 text-sm font-semibold text-foreground">
                  RachelOS {asset.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Healthcare credibility lane"
            title="The method travels. Healthcare remains a proving ground, not the boundary of the business."
            description="Healthcare payer and provider operations make exceptions, administrative burden, auditability, and multi-team dependencies impossible to ignore. The same operating pattern appears in financial services, enterprise technology, investment operations, property operations, and other complex service businesses."
          />
          <Card className="w-full max-w-2xl justify-self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Advisory background
            </p>
            <h3 className="mt-5 text-2xl font-semibold">Healthcare Transformation</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Prior authorization redesign, care-management modernization, and
              interoperability work show why the same operating pattern matters
              where administrative burden, exception handling, auditability, and
              multi-team dependencies are real constraints.
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Operating lesson: </span>
              Identify the dependency, make the decision path explicit, and build
              only after the operating truth is visible.
            </p>
            <ArrowLink href="/proof" className="mt-8">
              Review the proof registry
            </ArrowLink>
          </Card>
        </div>
      </Section>

      <Section className="border-t-0 bg-midnight text-white !py-16 md:!py-20">
        <div className="max-w-[65ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            Why TKO
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            The unresolved problems are usually the ones every specialist can see only in part.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Todd is a cross-functional operator who works across strategy,
            workflow, product, technology, and execution. He finds the gap
            between the documented process and operating reality, then creates
            enough structure to improve execution without adding bureaucracy.
          </p>
        </div>
        <p className="mt-10 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI matters only when it improves a real workflow with clear ownership,
          source evidence, privacy controls, human approval, and measurable
          operating value.
        </p>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Engagement Path"
          title="Start with one critical workflow. Implement only what the evidence supports."
          description="The flagship Diagnostic is a fixed-scope, three-week engagement. A separate three-month implementation installs the prioritized workflow, controls, measures, knowledge system, and first practical AI-assisted use cases."
        />
        <div className="mt-10">
          <EngagementPath />
        </div>
      </Section>
      <CtaBand
        title="Bring the workflow your best people keep holding together."
        description="Describe the handoffs, exceptions, delays, and decisions under pressure. TKO will help determine whether a focused Diagnostic is the right next move."
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="View Selected Work"
      />
    </>
  );
}
