"use client";

import { CheckCircle2, Compass, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/button";
import { NetworkVisual } from "@/components/site/network-visual";

const pillars = [
  {
    icon: Eye,
    title: "Map The Workflow",
    description: "See where healthcare work actually stalls.",
  },
  {
    icon: Compass,
    title: "Expose Dependency",
    description: "Find where the human API carries the operation.",
  },
  {
    icon: TrendingUp,
    title: "Modernize Safely",
    description: "Keep AI governed and human-approved.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.16),_transparent_60%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Operational Knowledge Systems
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Operational Knowledge Systems for Complex{" "}
            <span className="text-primary-light">Workflows</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-8 text-white/75">
            We help organizations identify where critical knowledge, decisions,
            and workflow context live inside people instead of systems and build
            the operational layer that turns that knowledge into trusted action.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/contact">Schedule an Operational Recovery Assessment</LinkButton>
            <LinkButton
              href="/services/diagnostic"
              variant="secondary"
              className="border-white/25 text-white hover:border-white/50 hover:bg-white/5"
            >
              Schedule an Operational Truth Diagnostic
            </LinkButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/75">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Prior authorization
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Transformation recovery
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
              Human-in-the-loop AI
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
