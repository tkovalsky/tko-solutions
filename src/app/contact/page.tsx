import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { submitProgramReview } from "@/app/contact/actions";
import { ProgramReviewForm } from "@/components/site/diagnostic-form";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Confidential Program Review",
  description:
    "Request a confidential 30-minute conversation about a transformation program, workflow, AI initiative, fractional leadership need, prior authorization issue, or consulting delivery partnership.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Confidential Program Review",
    description:
      "Bring one program or initiative under pressure and the executive decision required within 90 days.",
    url: absoluteUrl("/contact"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "Request a confidential program review with TKO Solutions.",
      },
    ],
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
        <div className="max-w-[68ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
            Confidential program review
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Bring one program or initiative under pressure.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            In a confidential 30-minute discussion, Todd will determine whether a
            Program Pressure Test, Transformation Recovery Diagnostic, specialist
            review, or another path is warranted.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="lg:pt-1">
            <h2 className="text-xl font-semibold text-foreground">What happens next</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-muted">
              <li><span className="font-semibold text-foreground">1.</span> Todd reviews every submission personally.</li>
              <li><span className="font-semibold text-foreground">2.</span> If the need appears plausible, he replies within one business day with a 30-minute call invitation.</li>
              <li><span className="font-semibold text-foreground">3.</span> The call tests the trigger, program boundary, sponsor, evidence, timing, budget class, and executive decision.</li>
              <li><span className="font-semibold text-foreground">4.</span> If there is mutual fit, TKO recommends the smallest defensible engagement and sends a concise scope. If not, Todd will say so directly.</li>
            </ol>
            <div className="mt-8 border border-border bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Good starting point</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                An active program, workflow, or initiative under pressure; a defined
                executive decision within 90 days; an identifiable sponsor or owner;
                and plausible readiness to fund the right next step.
              </p>
            </div>
          </aside>

          <div>
            {status === "submitted" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">Request received.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Todd personally reviews every submission and will respond within
                  one business day. The next step, when warranted, is a 30-minute
                  working conversation—not a generic sales presentation.
                </p>
              </div>
            ) : null}
            {status === "invalid" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">More detail is required.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Complete the required fields and describe the program and executive
                  decision with enough detail to qualify the need.
                </p>
              </div>
            ) : null}
            {status === "error" ? (
              <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
                <p className="font-semibold text-foreground">The request could not be submitted.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  No confirmation was recorded. Please try again or email Todd without
                  including patient, personal, confidential, or other sensitive information.
                </p>
              </div>
            ) : null}
            <ProgramReviewForm action={submitProgramReview} status={status} />
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm leading-6 text-muted">
                Prefer email? Write to Todd at{" "}
                <a href={`mailto:${site.email}`} data-conversion-event="email_link_click" data-cta-location="contact_page" data-cta-label="email" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary hover:underline">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
                . Do not send sensitive, confidential, personal, or patient information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
