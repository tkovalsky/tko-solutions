import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { QueueWalkthroughModal } from "@/components/marketing/QueueWalkthroughModal";
import { CheckCircle2, ShieldCheck, Zap, Globe, Smartphone, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "The Private Client Operating System | TKO Solutions",
  description: "Governed AI relationship intelligence for boutique brokerages, M&A advisors, and private client firms closing high-consideration deals.",
};

export default function PrivateClientOSPage() {
  return (
    <div className="flex flex-col pb-24">
      {/* HERO SECTION */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-8">
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">
            The Private Client Operating System
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            The Model Drafts. You Approve. <br className="hidden md:inline" />
            <span className="text-blue-600 dark:text-blue-400">Your Firm Never Loses a High-Value Client.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Governed AI relationship intelligence for boutique brokerages, M&A advisors, and private client firms closing $50,000 to $500,000+ fee transactions.
          </p>
          
          <div className="pt-8 flex flex-col items-center gap-4">
            <QueueWalkthroughModal>
              <Button className="text-lg px-8 py-6 h-auto">
                Request a Private Queue Walk-Through
              </Button>
            </QueueWalkthroughModal>
            <p className="text-sm text-slate-500">
              Direct 1-on-1 session with the system architect. 15 minutes. No sales pitch.
            </p>
          </div>
          
          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
            Proof in Production: Operating on live luxury client portfolios in South Florida. Zero autonomous sends.
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-24 pt-16">
        
        {/* THE PROBLEM */}
        <Section>
          <SectionHeader
            title="The High-Ticket Paradox"
            description="Generic CRM Automation Destroys High-Net-Worth Relationships."
          />
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              If you sell $200 SaaS subscriptions, automated marketing sequences work fine. If you broker $5M to $25M transactions, standard automation actively harms your reputation.
            </p>
            
            <div className="grid gap-8 pt-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="text-red-500">01.</span> Spam Rejection
                </h3>
                <p className="text-base">
                  Sophisticated buyers research quietly for 6 to 12 months. When dumped into a HubSpot sequence or an Apollo cold drip, they disengage permanently. High-value clients demand peer-level discretion.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="text-red-500">02.</span> AI Liability
                </h3>
                <p className="text-base">
                  Generic AI wrappers run loose. In a seven-figure deal, an AI hallucination regarding property zoning or deal EBITDA can kill a transaction. Unchecked models cannot be trusted with client communications.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="text-red-500">03.</span> Fragmented Memory
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
            title="The Architectural Moat"
            description="Engineered for High Stakes: The Governed Relationship Engine."
          />
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              We built The Private Client Operating System around an uncompromising architectural boundary: <strong>AI may synthesize context, but only licensed human principals speak to clients.</strong>
            </p>

            <div className="space-y-8 pt-4">
              <div className="border-l-4 border-blue-600 pl-6 space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">The Governed Fact Layer</h3>
                <p>
                  Human-entered records always supersede AI inferences. If your broker notes that a client prefers deep-water dockage in Delray Beach, the model cannot suggest a country club property in Boca Raton. Facts are immutable; model suggestions are strictly constrained.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">The Audited Model Wrapper</h3>
                <p>
                  Deterministic lifecycle state machines govern every prompt. Built-in schema enforcement, strict timeouts, and fallback states prevent runaway behavior. The engine generates peer-level correspondence grounded exclusively in observed data.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">The 5-Second Mobile Approval Queue</h3>
                <p>
                  Nothing ever sends autonomously. Outreach drafts land in a centralized operator queue on your phone or laptop. You review the context, make any necessary adjustments, and tap Approve. Five seconds of review gives you 10x relationship coverage without a fraction of the reputational risk.
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
          <div className="grid gap-6 md:grid-cols-2 pt-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <Globe className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. Authority Content Engine</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Comprehensive market dossiers, property briefs, and deal analysis assets built specifically for high-consideration buyers. Prospects consume institutional-grade analysis on your private domain rather than searching elsewhere.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. Buyer-Journey Telemetry</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Passive, privacy-conscious tracking that monitors high-net-worth research patterns over weeks and months. The system detects return visits, dossier velocity, and specific asset concentration without interrupting the prospect.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Governed AI Drafter & Memory</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                When telemetry indicates rising intent, the engine synthesizes the client&apos;s past notes and viewing history to draft a bespoke, highly personal touchpoint. The note sounds like an experienced partner writing from their desk.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <Smartphone className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">4. Human-in-the-Loop &quot;One-Tap&quot; Queue</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The draft arrives in your morning action queue with full context. Tap once to send, swipe to edit, or dismiss with a single keystroke.
              </p>
            </div>
          </div>
        </Section>

        {/* THE FEEDER CORRIDOR MULTIPLIER */}
        <Section>
          <SectionHeader
            title="The Feeder Corridor Multiplier"
            description="Not Just Software. An Exclusive Two-Way Wealth Network."
          />
          <div className="bg-slate-900 text-slate-50 p-8 rounded-2xl shadow-xl space-y-6">
            <Network className="w-10 h-10 text-blue-400" />
            <p className="text-lg leading-relaxed text-slate-300">
              High-net-worth capital moves along established geographic corridors: Greenwich to Palm Beach, Manhattan to the Hamptons, Aspen to South Florida winter estates.
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              When you install The Private Client Operating System, you join a closed network of non-competing luxury operators. A boutique brokerage in Greenwich does not compete with RachelDelray in Florida; they complement each other. Our system allows participating firms to share qualified high-net-worth referrals along the corridor, turning a technology investment into immediate transaction flow.
            </p>
          </div>
        </Section>

        {/* COMMERCIAL TIERS */}
        <Section>
          <SectionHeader
            title="Production Deployments"
            description="Commercial Tiers & Platform Access."
          />
          
          <div className="grid gap-8 md:grid-cols-3 pt-6">
            {/* Founding Partner */}
            <div className="bg-white dark:bg-slate-900 border-2 border-blue-600 rounded-2xl p-6 shadow-lg relative flex flex-col h-full">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                First 2 Deployments Only
              </div>
              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Founding Partner</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Designed for premier boutique operators willing to serve as flagship corridor case studies.
                </p>
                <div className="pt-4 pb-6 space-y-1 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$7,500</span>
                    <span className="text-sm text-slate-500 font-medium">Setup</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-700 dark:text-slate-300">+$2,000</span>
                    <span className="text-sm text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-1">6-month commitment</p>
                </div>
                <ul className="space-y-3 pt-4 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> 1 Dedicated Operator Seat</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Custom domain config and brand voice</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Initial database hygiene import</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Direct access to South Florida network</li>
                </ul>
              </div>
            </div>

            {/* Standard */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full">
              <div className="space-y-4 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Standard Production</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  For established boutique firms seeking disciplined relationship intelligence.
                </p>
                <div className="pt-4 pb-6 space-y-1 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$12,500</span>
                    <span className="text-sm text-slate-500 font-medium">Setup</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300">+$2,500</span>
                    <span className="text-sm text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-1">6-month commitment</p>
                </div>
                <ul className="space-y-3 pt-4 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Up to 2 Operator Seats</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Full telemetry tracking</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Weekly prompt tuning</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> 48-hour engineering SLA</li>
                </ul>
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full">
              <div className="space-y-4 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Enterprise</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  For multi-partner advisory firms, RIAs, and commercial brokerages.
                </p>
                <div className="pt-4 pb-6 space-y-1 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$20,000</span>
                    <span className="text-sm text-slate-500 font-medium">Setup</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300">+$3,500</span>
                    <span className="text-sm text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-1">12-month commitment</p>
                </div>
                <ul className="space-y-3 pt-4 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Up to 5 Operator Seats</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Custom CRM bi-directional sync</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Private database instance</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Priority SLA with bespoke reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* PRIMARY CTA */}
        <div className="pt-12 pb-24 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            See the Live South Florida Queue in Action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            We do not run canned slide decks. In a 15-minute briefing, we open the live RachelDelray production queue, walk through real high-net-worth buyer telemetry, and show you how a single operator handles 50 high-consideration relationships in 10 minutes a day.
          </p>
          <div className="pt-8 flex flex-col items-center gap-4 w-full">
            <QueueWalkthroughModal>
              <Button className="w-full md:w-auto text-lg px-12 py-8 h-auto font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Schedule an Architectural Walk-Through
              </Button>
            </QueueWalkthroughModal>
            <p className="text-sm font-medium text-slate-500 pt-4">
              Direct line: 917.601.4103 | Delray Beach, Florida
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
