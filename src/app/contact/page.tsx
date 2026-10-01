import type { Metadata } from "next";
import { CalendarDays, Mail } from "lucide-react";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a 30-Minute Call",
  description: "Discuss a workflow problem, automation project, or AI use case with Todd Kovalsky. A free 30-minute conversation to find the right starting point.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a 30-Minute Call | TKO Solutions",
    description: "Tell me where the work keeps getting stuck.",
    url: absoluteUrl("/contact"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "Book a call with TKO Solutions." }],
  },
};
type SearchParams = { searchParams: Promise<{ status?: string }> };

export default async function ContactPage({ searchParams }: SearchParams) {
  const { status } = await searchParams;
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-[64ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Book a call</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">Bring the problem. We will find the starting point.</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{CONSTRAINT_CALL.summary}</p>
          <p className="mt-4 text-base leading-7 text-muted">A few sentences are enough. Projects for this year or next are welcome; scope and start dates are agreed around your priorities and available capacity.</p>
          {site.scheduling ? (
            <a href={site.scheduling} target="_blank" rel="noreferrer" data-conversion-event="primary_cta_click" data-cta-location="contact_scheduling" data-cta-label="Pick a time" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 border border-primary bg-primary px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-primary-dark hover:bg-primary-dark">
              <CalendarDays className="size-4" aria-hidden /> Pick a time
            </a>
          ) : null}
        </div>
        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside>
            <h2 className="text-xl font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-muted">
              <li><span className="font-semibold text-foreground">1.</span> I read the message myself and reply within two business days.</li>
              <li><span className="font-semibold text-foreground">2.</span> We spend 30 minutes on the workflow or AI use case, what should change, and your timeline.</li>
              <li><span className="font-semibold text-foreground">3.</span> I tell you where I would look first and whether a diagnostic, a build, or no engagement makes sense.</li>
              <li><span className="font-semibold text-foreground">4.</span> If TKO is not the right fit, I will say so plainly.</li>
            </ol>
            <div className="mt-8 border-l-2 border-primary bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">About the call</p>
              <p className="mt-3 text-sm leading-6 text-muted">{CONSTRAINT_CALL.boundary}</p>
            </div>
          </aside>
          <div>
            {status === "submitted" ? <Notice title="Got it." body="I'll reply within two business days to set up the call." /> : null}
            {status === "invalid" ? <Notice title="A little more detail, please." body="Complete the required fields and describe what's stuck in a sentence or two." /> : null}
            {status === "error" ? <Notice title="That didn't go through." body="Please try again, or email me directly." /> : null}
            {status === "notification-error" ? <Notice title="Your message was saved, but I couldn't confirm the notification." body="Please email me directly as well so it isn't missed." /> : null}
            <DiagnosticForm action={submitDiagnosticIntake} status={status} />
            <p className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted">
              Prefer email? Write to me at{" "}
              <a href={`mailto:${site.email}`} data-conversion-event="email_link_click" data-cta-location="contact_page" data-cta-label="email" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary hover:underline"><Mail className="size-4" aria-hidden />{site.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-6 rounded-md border border-primary/30 border-l-4 border-l-primary bg-surface p-5">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
