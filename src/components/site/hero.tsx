"use client";

import { ArrowRight, CheckCircle2, Compass, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { NetworkVisual } from "@/components/site/network-visual";

const proofStrip = [
  "Healthcare transformation",
  "RachelOS operational knowledge system",
  "Workflow modernization",
  "Governed recovery expertise",
];

const pillars = [
  {
    icon: Eye,
    title: "Reduce Dependency",
    description: "Move critical operating knowledge out of individual heads.",
  },
  {
    icon: Compass,
    title: "Expose Bottlenecks",
    description: "Find where handoffs, ownership, and decisions slow down.",
  },
  {
    icon: TrendingUp,
    title: "Create AI-Ready Processes",
    description: "Make workflow, approval, and visibility explicit first.",
  },
];

const proofLadder = [
  {
    label: "Healthcare Transformation",
    proof: "Multi-team governance",
  },
  {
    label: "RachelOS",
    proof: "Relationship intelligence operating system",
  },
  {
    label: "CRE Intelligence",
    proof: "Intelligence and recommendation engine",
  },
  {
    label: "Outcome",
    proof: "Operational Recovery Assessment",
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
            Operational Knowledge Systems
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Operational Knowledge Systems for Complex{" "}
            <span className="text-primary-light">Workflows</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-8 text-white/80">
            We help organizations identify where critical knowledge, decisions,
            and workflow context live inside people instead of systems and build
            the operational layer that turns that knowledge into trusted action.
          </p>
          <ul className="mt-7 grid gap-2 border-y border-white/10 py-4 text-sm font-medium text-white/75 sm:grid-cols-2">
            {proofStrip.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton
              href="/contact"
              className="shadow-[0_10px_30px_-10px_rgb(var(--primary-rgb)/0.6)]"
            >
              Schedule an Operational Recovery Assessment
            </LinkButton>
            <Link
              href="/services/diagnostic"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Operational Truth Diagnostic
              <ArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
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
            Proof Ladder
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
            Existing proof, ordered by credibility.
          </h2>
          <div className="mt-6 space-y-3">
            {proofLadder.map((item, index) => (
              <div
                key={item.label}
                className="grid gap-3 rounded-lg border border-white/10 bg-midnight/45 p-4 sm:grid-cols-[1fr_auto_1.1fr] sm:items-center"
              >
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <ArrowRight
                  className="hidden size-4 text-primary-light sm:block"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-white/70">{item.proof}</p>
                {index === proofLadder.length - 1 ? (
                  <span className="mt-1 inline-flex w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary-light sm:col-span-3">
                    Primary conversion path
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/65">
            The page moves from healthcare credibility to built-system proof to
            second-domain portability, then asks leaders to start with a fixed-scope
            recovery assessment.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
