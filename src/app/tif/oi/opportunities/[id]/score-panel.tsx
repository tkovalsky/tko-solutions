"use client";

import { useState } from "react";
import type { OiOpportunityType } from "@prisma/client";

type ScorePanelProps = {
  opportunityType: OiOpportunityType;
  score: {
    fitScore: number;
    evidenceScore: number;
    accessScore: number;
    urgencyScore: number;
    estimatedValue: number | null;
    conversionProbability: number | null;
    expectedValue: number | null;
    estimatedHours: unknown;
    priorityEfficiency: unknown;
    scorePolicyVersion: string;
    capabilityProfileVersion: string;
    createdAt: Date;
    components: unknown;
  } | null;
};

type ComponentRow = {
  key: string;
  label: string;
  points: number;
  maxPoints: number;
  reason: string;
};

export default function ScorePanel({ score, opportunityType }: ScorePanelProps) {
  const [open, setOpen] = useState(false);
  if (!score) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        Score unavailable. Use Recompute after evidence is added.
      </div>
    );
  }

  const components = scoreComponents(score.components);
  const hours = numberValue(score.estimatedHours);
  const pe = numberValue(score.priorityEfficiency);
  const arithmetic = scoreArithmetic(score, components, opportunityType);

  return (
    <section className="rounded-md border border-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
        aria-expanded={open}
      >
        <span>Why this ranks here</span>
        <span>{open ? "Hide" : "Show"}</span>
      </button>
      {open ? (
        <div className="grid gap-5 border-t border-border p-4 text-sm">
          <ScoreGroup label="Fit" value={score.fitScore} max={100} components={components.filter((component) => !component.key.includes(".") && component.key !== "access")} />
          <ScoreGroup label="Evidence" value={score.evidenceScore} max={100} components={components.filter((component) => component.key.startsWith("evidence."))} />
          <ScoreGroup label="Access" value={score.accessScore} max={100} components={components.filter((component) => component.key === "access" || component.key.startsWith("access."))} />
          <ScoreGroup label="Urgency" value={score.urgencyScore} max={100} components={components.filter((component) => component.key.startsWith("urgency."))} />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Expected value</h3>
            <div className="mt-2 grid gap-1">
              <p>Estimated value = {money(score.estimatedValue)}</p>
              <p>{arithmetic.probabilityLine}</p>
              <p>Expected value = {money(score.estimatedValue)} x {decimalProbability(score.conversionProbability)} = {money(score.expectedValue)}</p>
              <p>{arithmetic.effortLine}</p>
              <p className="font-semibold">Priority efficiency = {money(score.expectedValue)} / {hours.toFixed(1)} = {money(pe)}/hr</p>
            </div>
          </div>

          <p className="text-xs text-muted">
            Policy {score.scorePolicyVersion} · Profile {score.capabilityProfileVersion} · Scored{" "}
            {score.createdAt.toISOString().slice(0, 16).replace("T", " ")}
          </p>
        </div>
      ) : null}
    </section>
  );
}

const BASE_PROBABILITY: Record<OiOpportunityType | "rfp_sub", number> = {
  fte: 0.08,
  consulting: 0.15,
  assessment: 0.22,
  fractional: 0.1,
  partnership: 0.18,
  rfp: 0.05,
  rfp_sub: 0.12,
};

const BASE_HOURS: Record<OiOpportunityType | "rfp_sub", number> = {
  fte: 24.5,
  consulting: 11.5,
  assessment: 6,
  fractional: 14.5,
  partnership: 6.5,
  rfp: 37,
  rfp_sub: 13,
};

function scoreArithmetic(score: NonNullable<ScorePanelProps["score"]>, components: ComponentRow[], opportunityType: OiOpportunityType) {
  const probabilityFactors = probabilityMultiplierFactors(score, components);
  const baseProbability = BASE_PROBABILITY[opportunityType] ?? 0.1;
  const rawProbability = probabilityFactors.reduce((value, factor) => value * factor.value, baseProbability);
  const capped = hasProbabilityCap(score, components);
  const probabilityParts = [`${baseProbability.toFixed(2)} base`, ...probabilityFactors.map((factor) => `${formatFactor(factor.value)} ${factor.label}`)];
  const probabilityLine = `Probability = ${probabilityParts.join(" x ")} = ${rawProbability.toFixed(3)}${capped ? ", capped at 60%" : ""}; current result ${score.conversionProbability ?? 0}%`;

  const baseHours = BASE_HOURS[opportunityType] ?? 10;
  const effortFactors = effortReductionFactors(baseHours, numberValue(score.estimatedHours), score);
  const effortLine = effortFactors.length > 0
    ? `Remaining hours = ${[baseHours.toFixed(1), ...effortFactors.map((factor) => `${formatFactor(factor.value)} ${factor.label}`)].join(" x ")} = ${numberValue(score.estimatedHours).toFixed(1)}`
    : `Remaining hours = ${numberValue(score.estimatedHours).toFixed(1)}`;

  return { probabilityLine, effortLine };
}

function probabilityMultiplierFactors(score: NonNullable<ScorePanelProps["score"]>, components: ComponentRow[]) {
  const factors = components.flatMap((component) => {
    const match = component.reason.match(/\bx([0-9]+(?:\.[0-9]+)?)\b/);
    if (!match || component.key === "access.probability_cap") return [];
    return [{ label: component.label.toLowerCase().replace(" multiplier", ""), value: Number(match[1]) }];
  });
  if (score.evidenceScore >= 75) factors.push({ label: "evidence", value: 1.3 });
  if (score.evidenceScore < 50) factors.push({ label: "evidence", value: 0.6 });
  if (score.fitScore >= 80) factors.push({ label: "fit", value: 1.3 });
  if (score.fitScore < 45) factors.push({ label: "fit", value: 0.4 });
  return factors;
}

function hasProbabilityCap(score: NonNullable<ScorePanelProps["score"]>, components: ComponentRow[]) {
  return score.conversionProbability === 60 || components.some((component) => component.key === "access.probability_cap");
}

function effortReductionFactors(baseHours: number, hours: number, score: NonNullable<ScorePanelProps["score"]>) {
  const candidates = [
    [
      { label: "researched", value: 0.7 },
      { label: "known-stakeholder", value: 0.8 },
    ],
    [{ label: "researched", value: 0.7 }],
    [{ label: "known-stakeholder", value: 0.8 }],
    score.evidenceScore < 50 ? [{ label: "low-evidence", value: 1.5 }] : [],
  ];
  return candidates.find((factors) => round1(factors.reduce((value, factor) => value * factor.value, baseHours)) === hours) ?? [];
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function formatFactor(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

function decimalProbability(value: number | null) {
  return ((value ?? 0) / 100).toFixed(2);
}

function ScoreGroup({
  label,
  value,
  max,
  components,
}: {
  label: string;
  value: number;
  max: number;
  components: ComponentRow[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label} {value}/{max}
      </h3>
      <div className="mt-2 grid gap-1">
        {components.map((component) => (
          <div key={component.key} className="grid gap-2 sm:grid-cols-[1fr_auto_1.5fr]">
            <span>{component.label}</span>
            <span className="font-semibold">
              {component.points}/{component.maxPoints}
            </span>
            <span className="text-muted">{component.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function scoreComponents(value: unknown): ComponentRow[] {
  return Array.isArray(value)
    ? value.filter(
        (component): component is ComponentRow =>
          typeof component === "object" &&
          component !== null &&
          "key" in component &&
          "label" in component &&
          "points" in component &&
          "maxPoints" in component &&
          "reason" in component,
      )
    : [];
}

function numberValue(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  return 0;
}

function money(value: number | null) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value ?? 0);
}
