import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { QueueWalkthroughModal } from "@/components/marketing/QueueWalkthroughModal";
import { ShieldCheck, Zap, Globe, Smartphone, Network } from "lucide-react";

import { getOffer } from "@/lib/offers";

const build = getOffer("operating-system-build")!;
const support = getOffer("operate-and-improve")!;

export const metadata: Metadata = {
  title: "The Private Client Operating System",
  description: "Owned buyer education, inquiry capture, and follow-up with human-reviewed AI drafting for wealth advisory, luxury services, and boutique practices.",
  alternates: { canonical: "/private-client-os" },
};

export default function PrivateClientOSPage() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
            The Private Client Operating System
          </p>
          <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
            The Model Drafts. You Approve. <br className="hidden md:inline" />
            <span className="text-primary">Keep the next client action visible.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-8 text-muted md:text-xl md:leading-9">
            Own the path from buyer research to inquiry and follow-up. TKO connects useful content, recorded relationship context, and human-reviewed AI drafting around the tools your firm already uses.
          </p>
          
          <div className="mt-8 flex flex-col items-start gap-4">
            <QueueWalkthroughModal>
              <Button>
                Request a Private Queue Walk-Through
              </Button>
            </QueueWalkthroughModal>
            <p className="text-sm text-muted">
              Direct 1-on-1 session with the system architect. 15 minutes. No sales pitch.
            </p>
          </div>
          
          <div className="mt-8 inline-flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-white p-4 text-sm leading-6 text-muted">
            <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" />
            RachelOS is the independent, single-operator proof. It demonstrates workflow and approval mechanisms, not client retention or revenue results.
          </div>
        </div>
      </section>

      <div className="w-full">
        
        {/* THE PROBLEM */}
        <Section>
          <SectionHeader
            title="When the record exists but the next step is missing"
            description="Give an operator the context, open questions, and next action before preparing outreach."
          />
          <div className="mt-8 max-w-none space-y-6 text-lg leading-8 text-muted">
            <p>
              A prospect can read your content, ask a question, and return weeks later. The workflow needs to preserve that context and make the next commitment visible to the person responsible.
            </p>
            
            <div className="grid gap-8 pt-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">01.</span> Spam Rejection
                </h3>
                <p className="text-base">
                  Useful buyer content gives prospects a reason to visit a channel you own. Capture an inquiry with permission and carry the question into follow-up instead of starting from a generic sequence.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">02.</span> AI Liability
                </h3>
                <p className="text-base">
                  A draft can sound convincing and still misstate a client preference or agreed term. Keep the source facts visible and give a named person the final review before client-facing outreach.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-primary">03.</span> Fragmented Memory
                </h3>
                <p className="text-base">
                  Notes remain trapped in iMessage, call logs, and fragmented memory. When transaction flow peaks, high-probability buyers drop off the radar because your team lacks the bandwidth for disciplined follow-up.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* THE ARCHITECTURAL MOAT */}
        <Section>
          <SectionHeader
            title="The controls around the model"
            description="Recorded facts, visible failures, and a named reviewer."
          />
          <div className="mt-8 max-w-none space-y-6 text-lg leading-8 text-muted">
            <p>
              The RachelOS pattern separates proposed prose from recorded facts: <strong>a model can prepare a draft; a person reviews the exact message before AI-assisted outreach is sent.</strong> Your implementation is scoped against your permissions, sources, and review requirements.
            </p>

            <div className="space-y-8 pt-4">
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <h3 className="text-xl font-semibold text-foreground">The Governed Fact Layer</h3>
                <p>
                  Keep recorded facts, their sources, and unresolved questions visible. Human updates take precedence over model suggestions. A reviewer still checks the draft against the record; a prompt is not a factual guarantee.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6 space-y-2">
                <h3 className="text-xl font-semibold text-foreground">The Audited Model Wrapper</h3>
                <p>
                  RachelOS routes model attempts through an audited wrapper with timeouts and failure classification. The surrounding workflow determines what assistance is permitted and what happens when the provider is unavailable.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6 space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Exact-message review</h3>
                <p>
                  An operator checks the exact message, edits or rejects it, and explicitly authorizes AI-assisted outreach. Deterministic transactional or approved fixed-copy paths are separate. Review time and business results must be measured, not promised.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* THE 4 PILLARS */}
        <Section>
          <SectionHeader
            title="System Operation"
            description="The Four Core Pillars of the Operating System."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl border border-border space-y-3">
              <Globe className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg text-foreground">1. Authority Content Engine</h3>
              <p className="text-muted text-sm leading-relaxed">
                  Useful guides and decision material on your own site. Answer the questions a buyer asks while researching, then connect an inquiry to the question that brought them to you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border space-y-3">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg text-foreground">2. Buyer-Journey Telemetry</h3>
              <p className="text-muted text-sm leading-relaxed">
                The scope identifies which consented inquiries and permitted activity signals can be recorded, how they are linked to a relationship, and what remains unknown. Anonymous visits do not establish a person’s identity or buying intent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border space-y-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg text-foreground">3. Governed AI Drafter & Memory</h3>
              <p className="text-muted text-sm leading-relaxed">
                Use recorded relationship context to prepare a draft when the agreed workflow calls for it. The operator verifies the facts, tone, permissions, and proposed next step before use.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border space-y-3">
              <Smartphone className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg text-foreground">4. Human-in-the-Loop &quot;One-Tap&quot; Queue</h3>
              <p className="text-muted text-sm leading-relaxed">
                The draft arrives in your morning action queue with full context. Review the exact message, edit or reject it, and authorize sending through the configured workflow.
              </p>
            </div>
          </div>
        </Section>

        {/* THE FEEDER CORRIDOR MULTIPLIER */}
        <Section>
          <SectionHeader
            title="Referrals with an accountable handoff"
            description="Use relationships your firm already has permission to involve."
          />
          <div className="mt-10 rounded-2xl bg-midnight p-6 text-white md:p-10 space-y-6">
            <Network className="w-10 h-10 text-primary-light" />
            <p className="text-lg leading-relaxed text-slate-300">
              A referral needs the same operating detail as a direct inquiry: consent, context, a named recipient, and a next step.
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              Where referrals are in scope, TKO maps the handoff to your existing approved partners. The engagement does not include access to an exclusive network or a promise of transaction flow.
            </p>
          </div>
        </Section>

        {/* COMMERCIAL TIERS */}
        <Section>
          <SectionHeader
            title="A defined build. Optional ongoing care."
            description="Work directly with Todd. Agree the workflow, deliverables, and commercial terms before implementation."
          />
          
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-primary/30 bg-white p-7">
              <h3 className="text-xl font-semibold">Owned Demand &amp; Governed AI Engine</h3>
              <p className="mt-4 text-2xl font-semibold">{build.commercial}</p>
              <p className="mt-4 leading-7 text-muted">One bounded content, inquiry, and follow-up workflow. Scope states the supported integrations, review controls, owner, handoff, and starting measures.</p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-7">
              <h3 className="text-xl font-semibold">Optional monitoring and improvement</h3>
              <p className="mt-4 text-2xl font-semibold">{support.commercial}</p>
              <p className="mt-4 leading-7 text-muted">{support.duration}. Supported systems, hours, monitoring cadence, and response expectations are agreed in writing. Larger changes receive a separate scope.</p>
            </article>
          </div>
          <p className="mt-6 text-sm leading-7 text-muted">Hosting, CRM subscriptions, messaging, and model usage are separate. No lead volume, retention, revenue, or time advantage over aggregators is guaranteed.</p>
        </Section>

        {/* PRIMARY CTA */}
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-16 md:py-24 lg:px-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Inspect the RachelOS pattern
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            In a 15-minute briefing, Todd walks through approved demonstration material: relationship context, a visible next action, and the controls around model drafting. We then identify the sources, permissions, and workflow your version would need.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 w-full">
            <QueueWalkthroughModal>
              <Button className="w-full sm:w-auto">
                Schedule an Architectural Walk-Through
              </Button>
            </QueueWalkthroughModal>
            <p className="text-sm font-medium text-muted pt-4">
              Direct line: 917.601.4103 | Delray Beach, Florida
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
