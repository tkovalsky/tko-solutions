"use client";

import { CheckCircle2, Compass, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/button";
import { NetworkVisual } from "@/components/site/network-visual";

const pillars = [
  {
    icon: Eye,
    title: "See the Truth",
    description: "Surface what's actually happening.",
  },
  {
    icon: Compass,
    title: "Drive Alignment",
    description: "Turn insight into trusted next actions.",
  },
  {
    icon: TrendingUp,
    title: "Deliver Outcomes",
    description: "Improve performance that compounds.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.18),_transparent_60%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Operational Intelligence
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Operational Intelligence Systems for Complex{" "}
            <span className="text-primary-light">Organizations</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-8 text-white/75">
            TKO helps leaders see where work is actually failing, establish
            operational truth, and build systems that turn scattered signals
            into governed facts, trusted next actions, human approval, and
            measurable outcomes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/contact">Start the Diagnostic</LinkButton>
            <LinkButton
              href="/case-studies"
              variant="secondary"
              className="border-white/25 text-white hover:border-white/50 hover:bg-white/5"
            >
              View Case Studies
            </LinkButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/75">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Healthcare-proven launch wedge
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Production-system proof
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Human-governed AI
            </li>
          </ul>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-3">
                <pillar.icon className="mt-0.5 size-5 shrink-0 text-primary-light" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">{pillar.title}</p>
                  <p className="mt-1 text-sm leading-5 text-white/70">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative hidden h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:block"
        >
          <NetworkVisual className="absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
