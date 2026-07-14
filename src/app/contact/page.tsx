import type { Metadata } from "next";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Conversation",
  description:
    "Request a focused conversation about the bottleneck, decision gap, or revenue leakage holding your operation back.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Conversation",
    description:
      "A focused executive conversation for leaders facing an active operating, execution, or revenue-performance problem.",
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
            Operating performance conversation
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Start with the part of the business that is not performing.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Five questions to establish whether TKO can help. Describe the
            workflow, revenue process, or transformation effort under pressure—and
            the decision leadership needs to make next.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-lg font-semibold text-foreground">
              The conversation starts with a concrete business problem.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Answer as specifically as you can. The strongest starting point is a
              measurable performance gap, stalled decision, key-person dependency,
              or revenue risk—not a general interest in AI or automation.
            </p>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Todd personally reviews every submission and will respond within
                  two business days. If there is a mutual fit, the next step is a
                  30-minute working conversation—no automated sales sequence is
                  triggered.
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
