"use client";

import { CheckCircle2, Search, Workflow, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/button";
import { NetworkVisual } from "@/components/site/network-visual";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Search,
    title: "Expose",
    description: "See the real work, including exceptions and undocumented judgment.",
  },
  {
    icon: Workflow,
    title: "Design",
    description: "Make handoffs, decisions, ownership, and measures explicit.",
  },
  {
    icon: ShieldCheck,
    title: "Implement",
    description: "Apply AI with evidence, approval, privacy, and auditability.",
  },
];

const careerProof = [
  {
    label: "Complex service operations",
    proof: "Cross-functional workflows where exceptions, judgment, and handoffs determine performance.",
  },
  {
    label: "Regulated workflows",
    proof: "Healthcare, financial services, investment operations, and interoperability experience.",
  },
  {
    label: "Built-system evidence",
    proof: "Inspectable knowledge, priority, recommendation, approval, and action patterns in production.",
  },
];

export function Hero() {
  return (
    <section className="hero-readable relative isolate overflow-hidden bg-midnight text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-40 sm:opacity-60">
        <NetworkVisual className="absolute inset-0 h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/35"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="hero-kicker text-sm font-semibold uppercase tracking-[0.2em]">
            AI-assisted operations modernization
          </p>
          <h1 className="hero-title mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Turn messy work into an operating system your team and AI can actually use.
          </h1>
          <p className="hero-lead mt-6 max-w-[52ch] text-lg leading-8">
            TKO helps complex service businesses expose hidden handoffs, decision
            bottlenecks, and knowledge trapped in people, then builds governed
            AI-assisted workflows that improve speed, accountability, and execution.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton
              href="/contact"
              className="shadow-[0_10px_30px_-10px_rgb(var(--primary-rgb)/0.6)]"
            >
              {site.cta}
            </LinkButton>
            <LinkButton
              href="/selected-work"
              variant="secondary"
              className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
            >
              View Selected Work
            </LinkButton>
          </div>
          <div className="hero-divider mt-10 grid gap-5 border-t pt-7 sm:grid-cols-3 sm:gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-3">
                <div className="hero-icon flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <pillar.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="hero-label text-sm font-semibold">{pillar.title}</p>
                  <p className="hero-muted mt-1 text-sm leading-5">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hero-proof-panel relative z-10 w-full rounded-xl border p-5 shadow-[0_24px_80px_-42px_rgb(0_0_0/0.85)] md:p-7"
          aria-label="TKO track record"
        >
          <p className="hero-kicker text-xs font-semibold uppercase tracking-[0.16em]">
            Built for an executive owner
          </p>
          <h2 className="hero-title mt-4 text-2xl font-semibold leading-tight md:text-3xl">
            For leaders accountable for a critical workflow that is too dependent on coordination and memory.
          </h2>
          <div className="mt-6 space-y-3">
            {careerProof.map((item) => (
              <div
                key={item.label}
                className="hero-proof-row grid gap-3 rounded-lg border p-4 sm:grid-cols-[1fr_auto_1.1fr] sm:items-center"
              >
                <p className="hero-label text-sm font-semibold">{item.label}</p>
                <CheckCircle2 className="hero-kicker hidden size-4 sm:block" aria-hidden="true" />
                <p className="hero-muted text-sm leading-6">{item.proof}</p>
              </div>
            ))}
          </div>
          <p className="hero-muted hero-divider mt-6 border-t pt-5 text-sm leading-6">
            Fixed scope. Remote delivery. One critical workflow. Senior-led from
            first interview through executive readout.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
