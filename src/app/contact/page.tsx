import type { Metadata } from "next";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule an Operational Recovery Assessment",
  description:
    "Submit the five-question intake for a TKO Operational Recovery Assessment or Operational Truth Diagnostic.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Schedule an Operational Recovery Assessment",
    description:
      "Diagnostic intake for leaders with active workflow, prioritization, operational visibility, or AI adoption problems.",
    url: absoluteUrl("/contact"),
  },
};

type SearchParams = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ContactPage({ searchParams }: SearchParams) {
  const { status } = await searchParams;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-[60ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            Recovery Assessment Intake
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Start with the workflow that is under pressure.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Five questions. The intake qualifies whether the one-week
            Operational Recovery Assessment or the deeper Operational Truth
            Diagnostic is the right next step for leaders facing administrative
            burden, stalled transformation, human API dependency, or AI adoption
            risk.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-lg font-semibold text-foreground">
              The Assessment starts only when the workflow problem is concrete.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Answer as specifically as you can. Each response should describe a real
              operating problem, not a general AI, automation, or tool-selection interest.
            </p>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Intake received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  If there is a fit, follow-up will come directly from TKO. No
                  automated sales sequence is triggered.
                </p>
              </div>
            ) : null}
            {status === "invalid" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">More detail is required.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Each answer should be specific enough to qualify the operating problem.
                </p>
              </div>
            ) : null}
            <DiagnosticForm action={submitDiagnosticIntake} />
          </div>
        </div>
      </div>
    </section>
  );
}
