"use client";

import { CheckCircle2, Compass, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/button";
import { NetworkVisual } from "@/components/site/network-visual";

const pillars = [
  {
    icon: Eye,
    title: "Find the hidden work",
    description: "See the handoffs, exceptions, and risks that reports miss.",
  },
  {
    icon: Compass,
    title: "Name the constraint",
    description: "Identify where work, ownership, and decisions actually stall.",
  },
  {
    icon: TrendingUp,
    title: "Ship the smallest fix",
    description: "Build a decision system only when the evidence calls for one.",
  },
];

const rachelosProof = [
  {
    label: "Memory",
    proof: "Relationship context survives outside one person's head.",
  },
  {
    label: "Priority",
    proof: "A ranked queue surfaces the next action that deserves attention.",
  },
  {
    label: "Control",
    proof: "AI-assisted recommendations wait for human approval before action.",
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-midnight text-white">
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Healthcare transformation recovery
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            You have the data. You still do not know where work is stuck.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/80">
            TKO helps healthcare and complex-operations leaders diagnose stalled
            workflows, make the constraint visible, and decide whether a focused
            recovery, deeper diagnostic, or build is warranted.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary-light">
            Fixed-scope recovery assessment · one week · $5K–$8K
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton
              href="/assessment"
              className="shadow-[0_10px_30px_-10px_rgb(var(--primary-rgb)/0.6)]"
            >
              Start the recovery assessment
            </LinkButton>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary-light">
                  <pillar.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{pillar.title}</p>
                  <p className="mt-1 text-sm leading-5 text-white/70">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 w-full rounded-xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_24px_80px_-42px_rgb(0_0_0/0.85)] backdrop-blur md:p-7"
          aria-label="TKO proof ladder"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-light">
            Built and running
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
            RachelOS turns fragmented relationship data into daily operating work.
          </h2>
          <div className="mt-6 space-y-3">
            {rachelosProof.map((item) => (
              <div
                key={item.label}
                className="grid gap-3 rounded-lg border border-white/10 bg-midnight/45 p-4 sm:grid-cols-[1fr_auto_1.1fr] sm:items-center"
              >
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <CheckCircle2 className="hidden size-4 text-primary-light sm:block" aria-hidden="true" />
                <p className="text-sm leading-6 text-white/70">{item.proof}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/65">
            RachelOS is direct system proof. It demonstrates operating capability,
            not an unmeasured revenue or adoption claim.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
