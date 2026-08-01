import type { OiDecisionConfidence, OiDecisionType } from "@prisma/client";

const confidenceOptions: OiDecisionConfidence[] = ["low", "medium", "high"];

export default function DecisionCapture({
  action,
  opportunityId,
  type,
  decision,
  label,
  currentScore,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  opportunityId: string;
  type: OiDecisionType;
  decision: string;
  label: string;
  currentScore: {
    expectedValue?: number | string | { toNumber(): number } | null;
    estimatedHours?: number | string | { toNumber(): number } | null;
    conversionProbability?: number | null;
  } | null;
  children?: React.ReactNode;
}) {
  return (
    <details className="rounded-md border border-border bg-[#f7f8fb] p-3">
      <summary className="cursor-pointer text-sm font-semibold">{label}</summary>
      <form action={action} className="mt-3 grid gap-3">
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <input type="hidden" name="decisionType" value={type} />
        <input type="hidden" name="decision" value={decision} />
        {children}
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <ReadOnly label="Expected value" value={formatMoney(numberValue(currentScore?.expectedValue))} />
          <ReadOnly label="Expected effort" value={`${numberValue(currentScore?.estimatedHours).toFixed(1)} hrs`} />
          <ReadOnly label="Expected probability" value={`${currentScore?.conversionProbability ?? 0}%`} />
        </div>
        <textarea name="decisionReason" required className="rounded-md border border-input-border px-3 py-2 text-sm" placeholder="Decision reason" />
        <select name="decisionConfidence" className="rounded-md border border-input-border px-3 py-2 text-sm" defaultValue="medium">
          {confidenceOptions.map((confidence) => (
            <option key={confidence} value={confidence}>
              {confidence}
            </option>
          ))}
        </select>
        <input name="expectedOutcome" className="rounded-md border border-input-border px-3 py-2 text-sm" placeholder="Expected outcome (optional)" />
        <button className="rounded-md bg-[#17375e] px-3 py-2 text-sm font-semibold text-white">{label}</button>
      </form>
    </details>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold uppercase text-muted">{label}</span>
      <input readOnly value={value} className="rounded-md border border-input-border bg-white px-3 py-2" />
    </label>
  );
}

function numberValue(value?: number | string | { toNumber(): number } | null) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) return value.toNumber();
  return 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
