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
        className="pointer-events-none absolute inset-0"
      >
        <NetworkVisual className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(6,10,20,0.98)_0%,_rgba(6,10,20,0.9)_38%,_rgba(6,10,20,0.68)_68%,_rgba(6,10,20,0.34)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-transparent to-midnight/70" />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_left,_rgba(6,10,20,0.95),_rgba(6,10,20,0.8)_42%,_transparent_74%)] sm:-inset-x-10 lg:-inset-y-12"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Operational Knowledge Systems
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Operational Knowledge Systems for Complex{" "}
            <span className="text-primary-light">Workflows</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/75">
            We help organizations identify where critical knowledge, decisions,
            and workflow context live inside people instead of systems and build
            the operational layer that turns that knowledge into trusted action.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/contact"
              className="shadow-[0_18px_38px_-18px_rgb(var(--accent-rgb)/0.95)] ring-1 ring-white/10 transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-18px_rgb(var(--accent-rgb)/1)]"
            >
              Schedule an Operational Recovery Assessment
            </LinkButton>
            <LinkButton
              href="/services/diagnostic"
              variant="secondary"
              className="border-white/25 text-white hover:border-white/50 hover:bg-white/5"
            >
              Schedule an Operational Truth Diagnostic
            </LinkButton>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/75">
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
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
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
      </div>
    </section>
  );
}
