import type { Metadata } from "next";
import { CalendarDays, Mail } from "lucide-react";
import { submitDiagnosticIntake } from "@/app/contact/actions";
import { DiagnosticForm } from "@/components/site/diagnostic-form";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a 30-Minute Call",
  description: "Tell me what's stuck in your business. Thirty minutes, no pitch deck: where I'd look first, and whether a diagnostic is worth it.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a 30-Minute Call | TKO Solutions",
    description: "Tell me what's stuck. I'll tell you where I'd look first.",
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
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">Tell me what&apos;s stuck.</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{CONSTRAINT_CALL.summary}</p>
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
              <li><span className="font-semibold text-foreground">1.</span> I read every message myself and reply within one business day.</li>
              <li><span className="font-semibold text-foreground">2.</span> We talk for 30 minutes about what&apos;s stuck, what it costs, and what you&apos;ve tried.</li>
              <li><span className="font-semibold text-foreground">3.</span> I tell you where I&apos;d look first, and whether the paid diagnostic is worth it for you.</li>
              <li><span className="font-semibold text-foreground">4.</span> If it isn&apos;t, I&apos;ll say so, and point you somewhere better if I can.</li>
            </ol>
            <div className="mt-8 border-l-2 border-primary bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">About the call</p>
              <p className="mt-3 text-sm leading-6 text-muted">{CONSTRAINT_CALL.boundary}</p>
            </div>
          </aside>
          <div>
            {status === "submitted" ? <Notice title="Got it." body="I'll reply within one business day to set up the call." /> : null}
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
