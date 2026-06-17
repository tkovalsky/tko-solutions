import type { Metadata } from "next";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start the Diagnostic",
  description:
    "Submit the five-question intake for the TKO Operational Intelligence Diagnostic.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start the Diagnostic",
    description:
      "Diagnostic intake for leaders with active operational visibility, transformation recovery, governance, or AI adoption problems.",
    url: absoluteUrl("/contact"),
  },
};

type SearchParams = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ContactPage({ searchParams }: SearchParams) {
  const { status } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Diagnostic Intake"
        title="Start with the operating problem."
        description="This intake is for leaders with an active, funded operational problem who need to see where work is actually failing and what decision should be made in the next 90 days."
        primaryHref="#intake"
        primaryLabel="Go to Intake"
      />
      <Section id="intake">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Five-Question Intake"
            title="The Diagnostic starts only when the problem is concrete."
            description="The form asks for the minimum information needed to qualify whether the Operational Intelligence Diagnostic is the right next step."
          />
          <div>
            {status === "submitted" ? (
              <div className="mb-6 border border-[#111111] bg-surface p-5">
                <p className="font-semibold">Intake received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  The submission has been captured by the server action. Connect
                  this action to email, CRM, or database storage before production launch.
                </p>
              </div>
            ) : null}
            {status === "invalid" ? (
              <div className="mb-6 border border-[#111111] bg-surface p-5">
                <p className="font-semibold">More detail is required.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Each answer should be specific enough to qualify the operating problem.
                </p>
              </div>
            ) : null}
            <form action={submitDiagnosticIntake} className="space-y-6">
              <Field
                id="problem"
                label="What operational problem are you trying to solve?"
                textarea
              />
              <Field id="systems" label="Which systems are involved?" textarea />
              <Field id="notWorking" label="What is not working today?" textarea />
              <div>
                <label className="text-sm font-semibold" htmlFor="aiDeployed">
                  Have you deployed AI already?
                </label>
                <select
                  id="aiDeployed"
                  name="aiDeployed"
                  required
                  className="mt-2 min-h-12 w-full border border-border bg-white px-4 text-base"
                >
                  <option value="">Select one</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">Unsure</option>
                </select>
              </div>
              <Field
                id="decision"
                label="What decision must be made in the next 90 days?"
                textarea
              />
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Name" />
                <Field id="email" label="Email" type="email" />
              </div>
              <Button type="submit">Start the Diagnostic</Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({
  id,
  label,
  textarea = false,
  type = "text",
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required
          rows={5}
          className="mt-2 w-full resize-y border border-border bg-white px-4 py-3 text-base leading-7"
        />
      ) : (
        <input
          id={id}
          name={id}
          required
          type={type}
          className="mt-2 min-h-12 w-full border border-border bg-white px-4 text-base"
        />
      )}
    </div>
  );
}

