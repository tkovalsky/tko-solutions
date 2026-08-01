"use client";

import { useState } from "react";

type ScorePanelProps = {
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

export default function ScorePanel({ score }: ScorePanelProps) {
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
              <p>
                Probability = base and multipliers, capped at 60%; current result {score.conversionProbability ?? 0}%
              </p>
              <p>Expected value = {money(score.estimatedValue)} x {(score.conversionProbability ?? 0) / 100} = {money(score.expectedValue)}</p>
              <p>
                Remaining hours = {hours.toFixed(1)} after effort-reduction factors including 0.7 researched and 0.8 known-stakeholder when applicable
              </p>
              <p className="font-semibold">Priority efficiency = {money(score.expectedValue)} / {hours.toFixed(1)} = {money(pe)}/hr</p>
            </div>
          </div>

          <div className="rounded-md border border-border bg-[#f7f8fb] p-3">
            <p className="font-semibold">Worked example arithmetic check</p>
            <p className="mt-1">
              0.15 base x 2.5 warm x 1.4 access x 1.3 evidence x 1.3 fit = 0.887, capped at 60%.
              $54,000 x 0.60 = $32,400. 11.5 base x 0.7 researched x 0.8 known-stakeholder = 6.4.
              $32,400 / 6.4 = $5,063/hr.
            </p>
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
