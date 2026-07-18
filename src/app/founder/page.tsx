import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  capabilityAtlas,
  careerTimeline,
  executiveSummary,
  experienceAtlas,
} from "@/lib/founder";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todd Kovalsky | Founder, TKO Solutions",
  description:
    "Todd Kovalsky is an operational intelligence advisor: 20+ years across Apollo, Sapient (GSAM, JPMAM), FolioDynamix, ELLKAY, and Fortune 5 healthcare transformation at Cognizant, plus RachelOS as production proof.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Todd Kovalsky | Founder, TKO Solutions",
    description:
      "The verified career record, operating philosophy, and evidence boundaries behind TKO's operational intelligence advisory.",
    url: absoluteUrl("/founder"),
  },
};

const decisions = [
  {
    title: "Choosing an operating system over a better CRM view",
    body: "The problem was not missing records. It was that relationship context, priority, and next action still had to be reconstructed by one person. The decision was to build RachelOS around durable memory, priority, recommendation, human approval, and action—not simply improve storage.",
    lesson: "The product was a trusted answer to “what should happen next?”",
  },
  {
    title: "Refusing fully autonomous outbound AI",
    body: "AI could draft or recommend outreach, but relationship-sensitive errors and factual uncertainty made autonomous action the wrong tradeoff. RachelOS keeps AI-assisted outbound action behind a human approval gate.",
    lesson: "Governance is part of the product—not a policy attached later.",
  },
  {
    title: "Letting production behavior change the priority",
    body: "A documented 2.2% email-first reply rate was evidence that more email automation was not the right answer. The operating priority shifted toward creating conversations, rather than building more software around an underperforming path.",
    lesson: "Production evidence should overrule an attractive product narrative.",
  },
];

const wrong = [
  ["A cleaner CRM would solve follow-up.", "The information existed, but priority and next action still had to be reconstructed manually. RachelOS moved toward memory, prioritization, and a daily operating loop."],
  ["Built capabilities meant product maturity.", "Some capabilities remained dormant, unvalidated, or unsafe to activate. Built, activated, and validated became separate states."],
  ["Scheduled automation could be assumed to be working.", "A missed automation run made observability a production requirement: health checks, run records, and visible failure states."],
  ["AI could be treated as an action engine.", "Source authority and human approval became explicit controls because a relationship-sensitive error has a real business consequence."],
];

const ladder = [
  ["Observed repeatedly", "A useful operating pattern, not a universal result.", "Key-person dependency and decision-latency patterns across finance and healthcare."],
  ["Implemented personally", "A working mechanism I designed, built, or operated.", "RachelOS memory, priority, approval, and health controls."],
  ["Measured", "A defined production fact for a specific context and period.", "The documented 2.2% email-first reply rate; owner-confirmed transaction activity."],
  ["Validated in multiple environments", "Evidence across separate operating contexts.", "Not yet established for a repeatable product claim."],
  ["Still a hypothesis", "A plausible idea that has not earned a repeatable claim.", "BoundOS as a future repeatable platform."],
];

const anchors = [
  ["#summary", "Executive summary"],
  ["#timeline", "Career timeline"],
  ["#experience", "Experience atlas"],
  ["#capabilities", "Capability atlas"],
  ["#philosophy", "Operating philosophy"],
  ["#evidence", "Evidence boundary"],
  ["#contact", "Contact"],
];

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Todd Kovalsky | Founder, TKO Solutions",
          url: absoluteUrl("/founder"),
          mainEntity: {
            "@type": "Person",
            name: "Todd Kovalsky",
            jobTitle: "Founder & Principal, Operational Intelligence Advisor",
            worksFor: { "@type": "Organization", name: site.name, url: site.url },
            sameAs: [site.linkedin],
            alumniOf: [
              { "@type": "Organization", name: "Apollo Global Management" },
              { "@type": "Organization", name: "Sapient" },
              { "@type": "Organization", name: "FolioDynamix" },
              { "@type": "Organization", name: "ELLKAY" },
              { "@type": "Organization", name: "Montclair State University" },
            ],
          },
        }}
      />

      {/* Executive summary */}
      <section id="summary" className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            Founder &amp; Principal
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-foreground md:text-7xl">
                {executiveSummary.headline}
              </h1>
              <p className="mt-8 max-w-[65ch] text-xl leading-9 text-muted">
                {executiveSummary.gloss} Twenty-plus years across financial
                services operations, enterprise transformation, product
                ownership, healthcare interoperability, and healthcare
                transformation—now focused on making AI-enabled operations
                governable, auditable, and real.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-border bg-white px-5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center gap-2 border border-border bg-white px-5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
              </div>
            </div>
            <Card className="bg-surface">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                The record in one paragraph
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {executiveSummary.facts.slice(1).map((fact) => (
                  <li key={fact} className="border-l-2 border-primary/30 pl-3">
                    {fact}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <nav
            aria-label="Founder page sections"
            className="mt-10 flex gap-x-5 gap-y-3 overflow-x-auto border-t border-border pt-5 text-sm font-semibold text-primary"
          >
            {anchors.map(([href, label]) => (
              <a key={href} href={href} className="shrink-0 hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Narrative */}
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Why TKO exists"
          title="Six vantage points on one problem—then I built the answer."
        />
        <div className="mt-10 max-w-[75ch] space-y-6 text-lg leading-8 text-muted">
          <p>
            My formation was the back office of leveraged finance through the
            post-2008 cycle: multi-billion-dollar loan settlements, LSTA trades,
            reconciliation under volume stress at Apollo. The lesson of that
            decade became the founding lesson of TKO—the system of record is
            never the operating truth. The truth lived in reconciliations, in
            exceptions, and in the few people who knew which counterparty always
            failed to settle.
          </p>
          <p>
            I then met the same gap from every other side: modernizing
            investment platforms for Goldman Sachs and JPMorgan asset management
            at Sapient, owning advisor-facing products at WBI and FolioDynamix,
            and turning the CMS Cures Act into machine-enforceable FHIR platform
            behavior at ELLKAY—where I learned that governance is architecture,
            not documentation. Inside a Fortune 5 healthcare transformation
            portfolio at Cognizant, I watched the enterprise-scale version:
            programs reporting green while the real state lives between
            workstreams, and AI arriving before decision rights do.
          </p>
          <p>
            No enterprise engagement would let one advisor implement the entire
            thesis—memory, governed facts, priority, human approval, observable
            health—end to end. So I built it myself, in a live business, and
            audited it in public. RachelOS is not a pivot into real estate. It
            is the controlled experiment the previous twenty years demanded.
          </p>
        </div>
      </Section>

      {/* Career timeline */}
      <Section id="timeline">
        <SectionHeader
          eyebrow="Career timeline"
          title="Twenty years, one thread: the gap between records and decisions."
          description="Each role is listed with its scope and the operating lesson it contributed to the TKO method."
        />
        <ol className="mt-10 space-y-0 border-l-2 border-border">
          {careerTimeline.map((entry) => (
            <li key={entry.organization} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-primary bg-white"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {entry.years} · {entry.era}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {entry.organization}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {entry.role}
              </p>
              <p className="mt-3 max-w-[70ch] text-base leading-7 text-muted">
                {entry.scope}
              </p>
              <p className="mt-3 max-w-[70ch] text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Lesson — </span>
                {entry.lesson}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Experience atlas */}
      <Section id="experience" className="bg-surface">
        <SectionHeader
          eyebrow="Experience atlas"
          title="Where each operating pattern was learned—and where it is proven."
          description="The patterns TKO sells were not invented for this site. Each one has a career origin and an inspectable implementation."
        />
        <div className="mt-10 overflow-x-auto border border-border bg-white">
          <table className="min-w-[820px] w-full text-left text-sm">
            <thead className="bg-surface text-foreground">
              <tr>
                <th scope="col" className="p-4 font-semibold">Operating pattern</th>
                <th scope="col" className="p-4 font-semibold">Where learned</th>
                <th scope="col" className="p-4 font-semibold">Where proven</th>
              </tr>
            </thead>
            <tbody>
              {experienceAtlas.map((row) => (
                <tr key={row.pattern} className="border-t border-border align-top">
                  <td className="p-4 font-semibold leading-6">{row.pattern}</td>
                  <td className="p-4 leading-6 text-muted">{row.learned}</td>
                  <td className="p-4 leading-6 text-muted">{row.proven}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Capability atlas */}
      <Section id="capabilities">
        <SectionHeader
          eyebrow="Capability atlas"
          title="What you can engage TKO to do, on what evidence, with the claim boundary stated."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {capabilityAtlas.map((row) => (
            <Card key={row.capability} className="flex flex-col">
              <h3 className="text-xl font-semibold">{row.capability}</h3>
              <p className="mt-4 text-sm leading-6 text-muted">
                <span className="font-semibold text-foreground">Career evidence — </span>
                {row.careerEvidence}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                <span className="font-semibold text-foreground">Proof evidence — </span>
                {row.proofEvidence}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Boundary — </span>
                {row.boundary}
              </p>
              <Link
                href={row.href}
                className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                View the engagement
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Operating philosophy */}
      <Section id="philosophy" className="bg-surface">
        <SectionHeader
          eyebrow="Operating philosophy"
          title="The work is choosing the right operating tradeoff—and recording it."
          description="Three decisions and four corrected assumptions from the production record, published because the method matters more than the highlight reel."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {decisions.map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
              <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Lesson — </span>
                {item.lesson}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {wrong.map(([assumption, response]) => (
            <Card key={assumption}>
              <h3 className="text-lg font-semibold">What I got wrong: {assumption}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{response}</p>
            </Card>
          ))}
        </div>
        <Link
          href="/selected-work/rachelos-delivery-model"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
        >
          Read the full AI-assisted delivery record
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      {/* Evidence boundary */}
      <Section id="evidence">
        <SectionHeader
          eyebrow="Evidence boundary"
          title="What I know, what I have built, what I have measured, and what I am still testing."
          description="A claim may not outrun its source. This ladder governs every claim on this site."
        />
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="min-w-[760px] w-full text-left text-sm">
            <thead className="bg-surface text-foreground">
              <tr>
                <th scope="col" className="p-4 font-semibold">Level</th>
                <th scope="col" className="p-4 font-semibold">Meaning</th>
                <th scope="col" className="p-4 font-semibold">Current evidence</th>
              </tr>
            </thead>
            <tbody>
              {ladder.map(([level, meaning, evidence]) => (
                <tr key={level} className="border-t border-border align-top">
                  <td className="p-4 font-semibold">{level}</td>
                  <td className="p-4 leading-6 text-muted">{meaning}</td>
                  <td className="p-4 leading-6 text-muted">{evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Contact path */}
      <Section id="contact" className="bg-surface">
        <div className="grid gap-10 border border-border bg-white p-8 md:grid-cols-[1.2fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Bring the operating problem. Choose whichever door you prefer.
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg leading-8 text-muted">
              Email directly, connect on LinkedIn, or use the five-question
              intake if you want the first conversation to start prepared.
              Every submission is reviewed personally within two business days.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-primary bg-primary px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-primary-dark"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email Todd
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-foreground hover:border-primary hover:text-primary"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Connect on LinkedIn
            </a>
            <LinkButton href="/contact" variant="secondary">
              Start the intake conversation
            </LinkButton>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
