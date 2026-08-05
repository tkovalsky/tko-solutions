import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Program Recovery Conversation",
  description:
    "A structured 45-minute conversation about one healthcare transformation program that is behind, over budget, or about to fund automation on top of an unstable workflow.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Program Recovery Conversation",
    description:
      "Tell me which program is under pressure and what decision leadership needs to make.",
    url: absoluteUrl("/contact"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation program recovery." }],
  },
};

type SearchParams = {
  searchParams: Promise<{ status?: string; intent?: string }>;
};

export default async function ContactPage({ searchParams }: SearchParams) {
  const { status, intent } = await searchParams;
  const isSpecialist = intent === "specialist";

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-[60ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            {isSpecialist ? "Specialist availability" : "Program Recovery Conversation"}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {isSpecialist
              ? "Tell me about the engagement and the window."
              : "Tell me which program is under pressure."}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            {isSpecialist
              ? "For consultancies, system integrators, and advisory firms that already hold the client relationship and need senior healthcare specialist depth. Describe the account, the capability gap, and the timing. I will reply within one business day with current availability."
              : "A structured 45-minute working conversation about one program that is behind, over budget, or about to fund automation on top of a workflow that does not work yet. I will reply within one business day."}
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-xl font-semibold text-foreground">What happens next</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-muted">
              <li><span className="font-semibold text-foreground">1.</span> I read every submission personally.</li>
              <li><span className="font-semibold text-foreground">2.</span> If the scope appears plausible, I reply within one business day to schedule the 45-minute conversation.</li>
              <li><span className="font-semibold text-foreground">3.</span> The call tests the trigger, the program boundary, the sponsor, the evidence available, and the decision required.</li>
              <li><span className="font-semibold text-foreground">4.</span> You receive a one-page written readout afterward. If there is mutual fit, a short scope and fixed-fee proposal follows. Otherwise I will say so directly.</li>
            </ol>
            <div className="mt-8 border border-border bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Good starting point</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {isSpecialist
                  ? "A named engagement or active pursuit, a defined capability gap, and a start window."
                  : "A program under active pressure, a named executive sponsor, a bounded starting point, and intent to act within 90 days."}
              </p>
            </div>
            <div className="mt-5 border-l-2 border-border bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Scope of the conversation</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {PROGRAM_RECOVERY_CONVERSATION.boundary}
              </p>
            </div>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  I read every submission personally and will respond within
                  one business day. If there is a plausible fit, the next step is a
                  45-minute working conversation, not a generic sales presentation.
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
            {status === "error" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">The request could not be submitted.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  No confirmation was recorded. Please try again or email me without including patient or other sensitive information.
                </p>
              </div>
            ) : null}
            {status === "notification-error" ? (
              <div className="mb-6 rounded-md border border-warning/30 border-l-4 border-l-warning bg-surface p-5">
                <p className="font-semibold text-foreground">
                  Your request was saved, but the notification could not be confirmed.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Please email me directly so the request is not missed. Do not include patient or other sensitive information.
                </p>
              </div>
            ) : null}
            <DiagnosticForm action={submitDiagnosticIntake} status={status} />
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm leading-6 text-muted">
                Prefer email? Write to me at{" "}
                <a href={`mailto:${site.email}`} data-conversion-event="email_link_click" data-cta-location="contact_page" data-cta-label="email" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary hover:underline">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
                . Do not send sensitive or patient information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
