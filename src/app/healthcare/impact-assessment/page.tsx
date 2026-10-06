import type { Metadata } from "next";
import Link from "next/link";
import { AuthorizationDecisionLab } from "@/components/healthcare/authorization-decision-lab";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Healthcare Change Execution Assessment",
  description:
    "Explore a synthetic prior-authorization modernization scenario across eligibility, benefits, procedure policy, provider qualification, UM routing, and claims controls.",
  alternates: { canonical: "/healthcare/impact-assessment" },
  openGraph: {
    title: "Healthcare Change Execution Assessment | TKO Solutions",
    description:
      "An inspectable synthetic decision model for turning healthcare policy change into operational and claims behavior.",
    url: absoluteUrl("/healthcare/impact-assessment"),
    images: [{
      url: site.socialImage,
      width: 1200,
      height: 630,
      alt: "TKO Solutions healthcare change execution assessment.",
    }],
  },
};

const systemAuthorities = [
  ["Member & eligibility", "Which coverage is active for the service date, and which plan and line of business govern?"],
  ["Benefit coverage", "Is the requested service covered? This is not the same question as whether authorization is required."],
  ["Procedure policy", "For this plan, service, place, state, and effective date, what administrative requirement applies?"],
  ["Provider program", "Does an active qualification apply to the submitted provider TIN and the requested service?"],
  ["UM orchestration", "Should the request bypass review, enter plan UM, or route to a delegated specialty workflow?"],
  ["Claims control", "Which durable record must downstream adjudication find so the claim follows the intended path?"],
] as const;

const assessmentDimensions = [
  ["Commitment", "The burden-reduction, access, regulatory, or platform outcome leadership has committed to deliver."],
  ["Population", "Affected plans, lines of business, accounts, provider entities, services, states, and effective dates."],
  ["Authority", "The system or team that owns each fact, rule, qualification, exception, and approval."],
  ["Execution", "The applications, integrations, operational teams, delegated partners, releases, and migration paths involved."],
  ["Control", "The evidence, exception route, appeal, requalification, audit trail, and claims artifact that keep the change safe."],
  ["Outcome", "The baseline and observations required to prove activation, administrative-burden change, and unintended fallout."],
] as const;

const measurementRows = [
  ["Activation", "Eligible scenarios reaching the intended route", "Decision traces by plan, provider, service, and effective date"],
  ["Administrative burden", "Touches, active minutes, calls, rework, and elapsed time", "A pre-change baseline and segmented post-change observations"],
  ["Claims continuity", "Missing or mismatched control artifacts and related fallout", "Notification/auth creation matched to downstream claim behavior"],
  ["Exceptions", "Unresolved inputs, manual routes, appeals, and requalification", "Root-cause categories with an accountable owner"],
] as const;

export default function HealthcareImpactAssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Healthcare Change Execution Assessment",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/healthcare/impact-assessment"),
          description: metadata.description,
          author: {
            "@type": "Person",
            name: "Todd Kovalsky",
            url: absoluteUrl("/founder"),
          },
          isAccessibleForFree: true,
        }}
      />

      <PageHero
        eyebrow="Healthcare proof asset · synthetic"
        title="A policy change is not real until every downstream system behaves differently."
        description="This assessment makes one prior-authorization modernization scenario inspectable across member eligibility, benefit coverage, procedure policy, provider qualification, UM routing, and the claims control that survives after clinical review is removed."
        primaryHref="#decision-lab"
        primaryLabel="Run the Scenario"
        secondaryHref="/services"
        secondaryLabel="Explore Services"
      />

      <Section className="!py-12 md:!py-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader
            eyebrow="The wedge"
            title="The commitment is simple. The execution environment is not."
            description="Removing prior-authorization review for a defined population sounds like one rule change. In practice, the answer is assembled from multiple authorities and must still produce behavior that legacy clinical and claims platforms can consume."
          />
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>
              Benefit coverage, authorization policy, provider qualification, clinical review,
              and claims evidence are different decisions. Collapsing them into one flag is how
              burden-reduction programs create payment defects, manual workarounds, and
              conflicting provider experiences.
            </p>
            <p>
              The first job of modernization is to make those decisions explicit: who owns each
              one, which inputs control it, when it is effective, what happens when facts conflict,
              and what record the next system needs.
            </p>
            <p className="font-semibold text-foreground">
              AI can assist the workflow. It cannot substitute for an undefined authority model.
            </p>
          </div>
        </div>
      </Section>

      <Section id="decision-lab" className="bg-surface !py-14 md:!py-20">
        <AuthorizationDecisionLab />
        <p className="mt-5 max-w-[90ch] text-sm leading-6 text-muted">
          This is a synthetic, educational prototype. It does not use PHI, determine benefits,
          reproduce a payer&apos;s policy, submit prior authorization, or make a clinical decision.
          Its purpose is to expose the operating and architecture questions a real implementation
          must answer.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="System boundaries"
          title="Six authorities. One reconstructable decision."
          description="The orchestration layer does not become the master of every fact. It resolves effective-dated inputs from the systems that already own them, applies governed logic, and records the resulting path."
        />
        <ol className="mt-10 border-t border-border">
          {systemAuthorities.map(([title, body], index) => (
            <li key={title} className="grid gap-3 border-b border-border py-6 md:grid-cols-[3rem_0.7fr_1.3fr]">
              <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-base leading-7 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-midnight text-white">
        <SectionHeader
          eyebrow="Assessment model"
          title="From executive commitment to observable outcome."
          description="A real assessment follows the change across six dimensions before recommending a platform, integration, automation, or AI intervention."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />
        <div className="mt-10 grid gap-px bg-white/20 md:grid-cols-2 lg:grid-cols-3">
          {assessmentDimensions.map(([title, body], index) => (
            <article key={title} className="bg-midnight p-6">
              <p className="font-mono text-xs text-primary-light">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader
            eyebrow="Impact, not activity"
            title="The prototype makes a decision. The engagement proves whether it changed the system."
            description="No administrative-burden or outcome claim is implied by the lab. Those claims require a baseline, activation evidence, and observed post-change behavior."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-border bg-surface">
                  <th className="p-4 font-semibold">Proof layer</th>
                  <th className="p-4 font-semibold">Question</th>
                  <th className="p-4 font-semibold">Required evidence</th>
                </tr>
              </thead>
              <tbody>
                {measurementRows.map(([layer, question, evidence]) => (
                  <tr key={layer} className="border-b border-border align-top">
                    <td className="p-4 font-semibold text-primary">{layer}</td>
                    <td className="p-4 leading-6 text-muted">{question}</td>
                    <td className="p-4 leading-6 text-muted">{evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="max-w-[80ch]">
          <h2 className="text-2xl font-semibold">Standards and evidence boundary</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The model is informed by public healthcare interoperability patterns, including the
            CMS Interoperability and Prior Authorization Final Rule and the HL7 Da Vinci Coverage
            Requirements Discovery, Documentation Templates and Rules, and Prior Authorization
            Support implementation guides. Those standards define important exchange behavior;
            this prototype&apos;s policy, qualification, orchestration, and claims-control model is TKO
            advisory work, not a claim of conformance.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
            <li><Link className="font-semibold text-primary underline underline-offset-4" href="https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f">CMS Interoperability and Prior Authorization Final Rule</Link></li>
            <li><Link className="font-semibold text-primary underline underline-offset-4" href="https://hl7.org/fhir/us/davinci-crd/">HL7 Da Vinci Coverage Requirements Discovery</Link></li>
            <li><Link className="font-semibold text-primary underline underline-offset-4" href="https://hl7.org/fhir/us/davinci-dtr/">HL7 Da Vinci Documentation Templates and Rules</Link></li>
            <li><Link className="font-semibold text-primary underline underline-offset-4" href="https://hl7.org/fhir/us/davinci-pas/">HL7 Da Vinci Prior Authorization Support</Link></li>
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Which healthcare commitment is getting lost between policy and production?"
        description="Bring one bounded change. TKO will map the authorities, decisions, systems, controls, failure paths, and evidence required to make it executable."
        primaryHref="/contact"
        primaryLabel="Discuss a Transformation"
        secondaryHref="/services/transformation-diagnostic"
        secondaryLabel="See the Diagnostic"
      />
    </>
  );
}
