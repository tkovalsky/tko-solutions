"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const QUESTION_IDS = ["problem", "systems", "notWorking", "aiDeployed", "decision"] as const;
const TOTAL_QUESTIONS = QUESTION_IDS.length;

const controlClass =
  "mt-2 w-full rounded-md border border-[color:var(--input-border)] bg-white px-4 text-base text-foreground transition-colors placeholder:text-[color:var(--input-border-hover)] hover:border-[color:var(--input-border-hover)] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function DiagnosticForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  const completed = QUESTION_IDS.filter((id) => answered[id]).length;
  const percent = Math.round((completed / TOTAL_QUESTIONS) * 100);

  function track(id: string, value: string) {
    setAnswered((prev) => {
      const isAnswered = value.trim().length > 0;
      if (prev[id] === isAnswered) return prev;
      return { ...prev, [id]: isAnswered };
    });
  }

  return (
    <form action={action} className="space-y-6">
      <div
        className="rounded-md border border-border bg-surface px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>
            Question {Math.min(completed + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}
          </span>
          <span className="text-muted">{percent}% complete</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <Field
        id="problem"
        index={1}
        label="What operational problem are you trying to solve?"
        textarea
        onValue={track}
      />
      <Field
        id="systems"
        index={2}
        label="Which systems are involved?"
        textarea
        onValue={track}
      />
      <Field
        id="notWorking"
        index={3}
        label="What is not working today?"
        textarea
        onValue={track}
      />
      <div>
        <Label htmlFor="aiDeployed" index={4}>
          Have you deployed AI already?
        </Label>
        <select
          id="aiDeployed"
          name="aiDeployed"
          required
          className={`${controlClass} min-h-12`}
          onChange={(e) => track("aiDeployed", e.target.value)}
        >
          <option value="">Select one</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">Unsure</option>
        </select>
      </div>
      <Field
        id="decision"
        index={5}
        label="What decision must be made in the next 90 days?"
        textarea
        onValue={track}
      />

      <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-2">
        <Field id="name" label="Name" onValue={track} />
        <Field id="email" label="Email" type="email" onValue={track} />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Start the Diagnostic
      </Button>
    </form>
  );
}

function Label({
  htmlFor,
  index,
  children,
}: {
  htmlFor: string;
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-2 text-sm font-semibold text-foreground" htmlFor={htmlFor}>
      {index ? (
        <span className="mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </label>
  );
}

function Field({
  id,
  label,
  index,
  textarea = false,
  type = "text",
  onValue,
}: {
  id: string;
  label: string;
  index?: number;
  textarea?: boolean;
  type?: string;
  onValue: (id: string, value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} index={index}>
        {label}
      </Label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required
          rows={3}
          className={`${controlClass} resize-y py-3 leading-7`}
          onInput={(e) => onValue(id, e.currentTarget.value)}
        />
      ) : (
        <input
          id={id}
          name={id}
          required
          type={type}
          className={`${controlClass} min-h-12`}
          onInput={(e) => onValue(id, e.currentTarget.value)}
        />
      )}
    </div>
  );
}
