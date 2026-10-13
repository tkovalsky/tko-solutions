"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { MermaidDiagram } from "@/components/site/mermaid-diagram";
import { LinkButton } from "@/components/ui/button";
import { getRachelOSUseCase, rachelosUseCases, rachelosUseCaseContactHref } from "@/lib/rachelos-use-cases";
import { cn } from "@/lib/utils";

export function RachelOSUseCaseExplorer() {
  const [selectedId, setSelectedId] = useState(rachelosUseCases[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [campaignSearch, setCampaignSearch] = useState("");
  const selected = getRachelOSUseCase(selectedId) ?? rachelosUseCases[0];
  const step = selected.steps[stepIndex];
  const diagram = `flowchart TB
    A["01 · ${selected.flow[0]}"] --> B["02 · ${selected.flow[1]}"]
    B --> C["03 · ${selected.flow[2]}"]
    classDef active fill:#2563eb,color:#ffffff,stroke:#2563eb
    class ${["A", "B", "C"][stepIndex]} active`;

  useEffect(() => {
    function readHash() {
      setCampaignSearch(window.location.search);
      const useCase = getRachelOSUseCase(window.location.hash.replace(/^#use-case-/, ""));
      if (useCase) {
        setSelectedId(useCase.id);
        setStepIndex(0);
      }
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  function chooseUseCase(id: string) {
    setSelectedId(id);
    setStepIndex(0);
    // Replace only the hash; keep channel attribution and the current route.
    window.location.hash = `use-case-${id}`;
  }

  return (
    <section id="use-cases" className="scroll-mt-24 border-t border-border bg-surface py-20 md:py-28" aria-labelledby="use-case-heading">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-[70ch]">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Explore the problem</p>
          <h2 id="use-case-heading" className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Where does work break down?</h2>
          <p className="mt-5 text-lg leading-8 text-muted">Pick a familiar problem. See the workflow. Imagine your version.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3" role="group" aria-label="Choose a business problem">
          {rachelosUseCases.map((useCase, index) => (
            <button
              key={useCase.id}
              id={`use-case-${useCase.id}`}
              type="button"
              aria-pressed={selected.id === useCase.id}
              aria-controls="use-case-walkthrough"
              onClick={() => chooseUseCase(useCase.id)}
              className={cn("scroll-mt-24 rounded-xl border p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary", selected.id === useCase.id ? "border-primary bg-primary text-white" : "border-border bg-white hover:border-primary")}
            >
              <span className={cn("text-xs font-semibold uppercase tracking-[0.12em]", selected.id === useCase.id ? "text-white/80" : "text-primary")}>Use case 0{index + 1}</span>
              <span className="mt-3 block text-lg font-semibold leading-6">{useCase.title}</span>
              <span className={cn("mt-3 block text-sm leading-6", selected.id === useCase.id ? "text-white/85" : "text-muted")}>{useCase.summary}</span>
            </button>
          ))}
        </div>

        <div id="use-case-walkthrough" className="mt-8 overflow-hidden rounded-2xl border border-border bg-white">
          <div className="px-6 pb-8 pt-10 md:px-12 md:pt-12" aria-live="polite" aria-atomic="true">
            <h3 className="max-w-[40ch] text-2xl font-semibold leading-tight md:text-3xl">{selected.question}</h3>
          </div>

          <div className="grid gap-8 px-6 pb-10 md:px-12 md:pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <MermaidDiagram compact source={diagram} title={selected.title} textAlternative={selected.flow.join(" → ")} />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Walk through the example</p>
              <div className="mt-5 flex gap-2" role="group" aria-label="Walkthrough steps">
                {selected.steps.map((candidate, index) => (
                  <button key={candidate.title} type="button" aria-label={`Step ${index + 1}: ${candidate.title}`} aria-pressed={stepIndex === index} onClick={() => setStepIndex(index)} className={cn("flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", stepIndex === index ? "border-primary bg-primary text-white" : "border-border hover:border-primary")}>{String(index + 1).padStart(2, "0")}</button>
                ))}
              </div>
              <div className="mt-6 min-h-40" aria-live="polite" aria-atomic="true">
                <h4 className="text-xl font-semibold">{step.title}</h4>
                <p className="mt-4 max-w-[48ch] text-base leading-7 text-muted">{step.action}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                <button type="button" disabled={stepIndex === 0} onClick={() => setStepIndex((index) => Math.max(0, index - 1))} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary disabled:cursor-default disabled:text-muted/50"><ArrowLeft className="size-4" aria-hidden="true" />Previous</button>
                <button type="button" disabled={stepIndex === selected.steps.length - 1} onClick={() => setStepIndex((index) => Math.min(selected.steps.length - 1, index + 1))} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary disabled:cursor-default disabled:text-muted/50">Next step<ArrowRight className="size-4" aria-hidden="true" /></button>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">Illustrative example. No live client data or messages sent.</p>
            </div>
          </div>

          <div className="border-t border-border px-6 md:px-12">
            <details key={`proof-${selected.id}`} className="py-6">
              <summary className="cursor-pointer text-base font-semibold text-primary">See it inside RachelOS</summary>
              <figure className="mt-6 max-w-3xl">
                <a href={selected.proof.image} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="Open the redacted RachelOS screenshot at full size (new tab)">
                  <Image src={selected.proof.image} alt={selected.proof.alt} width={1440} height={1100} className="h-auto w-full" sizes="(min-width: 1024px) 60vw, 90vw" />
                </a>
                <figcaption className="mt-4 text-sm leading-6 text-muted">{selected.proof.caption}</figcaption>
              </figure>
            </details>
            <details key={`context-${selected.id}`} className="border-t border-border py-6">
              <summary className="cursor-pointer text-base font-semibold">How this translates to your business</summary>
              <div className="mt-6 grid gap-8 pb-3 md:grid-cols-2">
                <div><h4 className="font-semibold">The operating pattern</h4><p className="mt-3 text-sm leading-7 text-muted">{selected.mechanism}</p><p className="mt-4 text-sm leading-7 text-muted">{selected.problem}</p></div>
                <div><h4 className="font-semibold">What needs to be defined</h4><p className="mt-3 text-sm leading-7 text-muted">{selected.adaptation}</p><p className="mt-4 text-sm leading-7 text-muted">{step.context}</p></div>
              </div>
            </details>
          </div>
          <div className="bg-midnight px-6 py-10 text-white md:px-12 md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-light">Your business. Your version.</p>
            <p className="mt-4 max-w-[52ch] text-xl font-semibold leading-8">{selected.discussion}</p>
            <div className="mt-7">
              <LinkButton href={rachelosUseCaseContactHref(selected.id, campaignSearch)} ctaLocation={`rachelos_use_case_${selected.id}`}>Discuss this workflow with Todd</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
