"use client";

import { useMemo, useState } from "react";
import {
  evaluateAuthorization,
  syntheticAuthorizationScenarios,
  type AuthorizationAssessmentInput,
} from "@/lib/healthcare-policy-execution";
import { cn } from "@/lib/utils";

export function AuthorizationDecisionLab() {
  const [input, setInput] = useState<AuthorizationAssessmentInput>(
    syntheticAuthorizationScenarios[0],
  );
  const result = useMemo(() => evaluateAuthorization(input), [input]);

  const chooseScenario = (scenarioId: string) => {
    const scenario = syntheticAuthorizationScenarios.find(
      (candidate) => candidate.scenarioId === scenarioId,
    );
    if (scenario) setInput(scenario);
  };

  const updateBoolean = (
    key: keyof Pick<
      AuthorizationAssessmentInput,
      | "memberEligible"
      | "benefitCovered"
      | "policyEffective"
      | "policyRequiresAuthorization"
      | "providerTinMatches"
      | "qualificationActive"
      | "programIncludesService"
      | "delegatedSpecialtyReview"
      | "advanceNotificationRequired"
    >,
    value: boolean,
  ) => setInput((current) => ({ ...current, [key]: value, scenarioName: "Custom variation" }));

  return (
    <div className="border border-border bg-white">
      <div className="border-b border-border bg-midnight p-6 text-white md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-light">
          Synthetic decision lab
        </p>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
          Change one fact. Inspect every downstream decision.
        </h2>
        <p className="mt-4 max-w-[70ch] text-sm leading-6 text-white/75">
          Select a starting scenario, change its controls, and follow the determination across
          source authorities. All identifiers and rules are illustrative. No patient data is
          collected or processed.
        </p>
      </div>

      <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r md:p-8">
          <label htmlFor="scenario" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Starting scenario
          </label>
          <select
            id="scenario"
            value={input.scenarioId}
            onChange={(event) => chooseScenario(event.target.value)}
            className="mt-3 min-h-12 w-full border border-border bg-white px-3 text-sm font-semibold text-foreground"
          >
            {syntheticAuthorizationScenarios.map((scenario) => (
              <option key={scenario.scenarioId} value={scenario.scenarioId}>
                {scenario.scenarioName}
              </option>
            ))}
          </select>

          <dl className="mt-7 grid gap-3 border-y border-border py-5 text-sm sm:grid-cols-2">
            <Fact label="Line of business" value={lineOfBusinessLabel(input.lineOfBusiness)} />
            <Fact label="Synthetic plan" value={input.planId} mono />
            <Fact label="Synthetic service" value={`${input.serviceCode} · ${input.serviceDescription}`} />
            <Fact label="Provider program" value={qualificationLabel(input.qualification)} />
          </dl>

          <fieldset className="mt-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Controlling facts
            </legend>
            <div className="mt-4 divide-y divide-border border-y border-border">
              <BooleanControl label="Member eligible" value={input.memberEligible} onChange={(value) => updateBoolean("memberEligible", value)} />
              <BooleanControl label="Benefit covered" value={input.benefitCovered} onChange={(value) => updateBoolean("benefitCovered", value)} />
              <BooleanControl label="Policy version effective" value={input.policyEffective} onChange={(value) => updateBoolean("policyEffective", value)} />
              <BooleanControl label="Policy requires PA" value={input.policyRequiresAuthorization} onChange={(value) => updateBoolean("policyRequiresAuthorization", value)} />
              <BooleanControl label="Provider TIN matches" value={input.providerTinMatches} onChange={(value) => updateBoolean("providerTinMatches", value)} />
              <BooleanControl label="Qualification active" value={input.qualificationActive} onChange={(value) => updateBoolean("qualificationActive", value)} />
              <BooleanControl label="Program includes service" value={input.programIncludesService} onChange={(value) => updateBoolean("programIncludesService", value)} />
              <BooleanControl label="Delegated specialty review" value={input.delegatedSpecialtyReview} onChange={(value) => updateBoolean("delegatedSpecialtyReview", value)} />
              <BooleanControl label="Advance notification required" value={input.advanceNotificationRequired} onChange={(value) => updateBoolean("advanceNotificationRequired", value)} />
            </div>
          </fieldset>
        </div>

        <div className="p-6 md:p-8" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Determination
          </p>
          <div className={cn(
            "mt-3 border-l-4 p-5",
            result.disposition === "UNRESOLVED"
              ? "border-warning bg-[#fff8ed]"
              : "border-primary bg-surface",
          )}>
            <p className="text-2xl font-semibold">{result.dispositionLabel}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{result.summary}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Fact label="Operational route" value={result.reviewRouteLabel} />
              <Fact label="Claims control artifact" value={result.claimsArtifactLabel} />
            </dl>
          </div>

          <h3 className="mt-9 text-lg font-semibold">Decision trace</h3>
          <ol className="mt-4 border-l-2 border-border">
            {result.trace.map((step) => (
              <li key={`${step.order}-${step.authority}`} className="relative pb-6 pl-7 last:pb-0">
                <span className="absolute -left-[0.42rem] top-1 flex size-3 items-center justify-center rounded-full border-2 border-primary bg-white" />
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  {String(step.order).padStart(2, "0")} · {step.authority}
                </p>
                <p className="mt-1 text-sm font-semibold">{step.question}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{step.finding}</p>
              </li>
            ))}
          </ol>

          {result.unresolvedFacts.length > 0 ? (
            <div className="mt-8 border border-warning/40 bg-[#fff8ed] p-5">
              <h3 className="font-semibold">Required before the workflow can continue</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {result.unresolvedFacts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function BooleanControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 py-2">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex shrink-0 border border-border" role="group" aria-label={label}>
        {[true, false].map((option) => (
          <button
            key={String(option)}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "min-h-9 min-w-12 px-3 text-xs font-semibold uppercase tracking-[0.08em] transition-colors",
              value === option ? "bg-primary text-white" : "bg-white text-muted hover:bg-surface",
            )}
          >
            {option ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Fact({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</dt>
      <dd className={cn("mt-1 leading-6 text-foreground", mono && "font-mono text-xs")}>{value}</dd>
    </div>
  );
}

function lineOfBusinessLabel(value: AuthorizationAssessmentInput["lineOfBusiness"]) {
  return {
    commercial: "Commercial",
    medicare_advantage: "Medicare Advantage",
    medicaid: "Medicaid",
  }[value];
}

function qualificationLabel(value: AuthorizationAssessmentInput["qualification"]) {
  return {
    none: "None",
    performance_waiver: "Performance-based waiver",
    rural_access: "Rural access",
  }[value];
}
