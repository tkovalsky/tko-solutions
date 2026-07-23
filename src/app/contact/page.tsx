import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Diagnostic Fit Call",
  description:
    "Request a qualified 30-minute conversation about the $25,000 Prior Authorization Performance Diagnostic.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Diagnostic Fit Call",
    description:
      "Tell Todd where prior authorization is losing time or capacity and what decision leadership needs to make.",
    url: absoluteUrl("/contact"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
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
            Diagnostic fit call
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Tell Todd where prior authorization is losing time or capacity.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            If the problem fits the 15-day Diagnostic, Todd will reply within one
            business day to schedule a 30-minute working conversation. The
            Diagnostic is a $25,000 fixed-fee engagement.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-xl font-semibold text-foreground">What happens next</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-muted">
              <li><span className="font-semibold text-foreground">1.</span> Todd reviews every submission personally.</li>
              <li><span className="font-semibold text-foreground">2.</span> If the scope appears plausible, he replies within one business day with a 30-minute call invitation.</li>
              <li><span className="font-semibold text-foreground">3.</span> The call tests the trigger, workflow boundary, sponsor, evidence, timing, and decision required.</li>
              <li><span className="font-semibold text-foreground">4.</span> If there is mutual fit, TKO sends a short scope and fixed-fee proposal. If not, Todd will say so directly.</li>
            </ol>
            <div className="mt-8 border border-border bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Good starting point</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                An active prior-authorization performance issue, a named decision
                owner, a bounded workflow or segment, and intent to act within 90 days.
              </p>
            </div>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Todd personally reviews every submission and will respond within
                  one business day. If the Diagnostic appears to fit, the next step
                  is a 30-minute working call, not a generic sales presentation.
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
                  No confirmation was recorded. Please try again or email Todd without including patient or other sensitive information.
                </p>
              </div>
            ) : null}
            {status === "notification-error" ? (
              <div className="mb-6 rounded-md border border-warning/30 border-l-4 border-l-warning bg-surface p-5">
                <p className="font-semibold text-foreground">
                  Your request was saved, but the notification could not be confirmed.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Please email Todd directly so the request is not missed. Do not include patient or other sensitive information.
                </p>
              </div>
            ) : null}
            <DiagnosticForm action={submitDiagnosticIntake} status={status} />
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm leading-6 text-muted">
                Prefer email? Write to Todd at{" "}
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
