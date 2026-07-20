import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Conversation",
  description:
    "Describe the critical workflow, hidden coordination, or stalled cross-functional operation you want to improve.",
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
            Highest-leverage workflow
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Start with the workflow your best people keep holding together.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Share the workflow or operating problem under pressure, who owns it,
            and when leadership needs a decision. TKO will determine whether the
            fixed-scope Diagnostic is the right next step.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-lg font-semibold text-foreground">
              Prefer a direct path?
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-2 border border-border bg-white px-4 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-border bg-white px-4 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
                Connect on LinkedIn
              </a>
              {site.scheduling ? (
                <a
                  href={site.scheduling}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-border bg-white px-4 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  Book a working session
                </a>
              ) : null}
            </div>
            <h2 className="mt-8 text-lg font-semibold text-foreground">
              Or start the conversation prepared.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              The short intake makes the first call a working conversation. The
              strongest starting point is a measurable performance gap, stalled
              decision, hidden handoff, key-person dependency, or knowledge-loss
              risk, not a general interest in AI.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Engagements are senior-led and direct. Prior-engagement context and
              references are available under NDA once there is mutual fit.
            </p>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Todd personally reviews every submission and will respond within
                  two business days. If there is a mutual fit, the next step is a
                  30-minute working conversation, no automated sales sequence is
                  triggered.
                </p>
              </div>
            ) : null}
            {status === "invalid" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">More detail is required.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Complete the required fields and describe the workflow with enough detail to qualify the operating problem.
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
