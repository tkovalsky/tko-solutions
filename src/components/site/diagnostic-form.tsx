"use client";

import { Button } from "@/components/ui/button";

const controlClass =
  "mt-2 w-full rounded-md border border-[color:var(--input-border)] bg-white px-4 text-base text-foreground transition-colors placeholder:text-[color:var(--input-border-hover)] hover:border-[color:var(--input-border-hover)] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function DiagnosticForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="source" value="highest_leverage_workflow" />
      <input type="hidden" name="landingPage" value="/contact" />

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" />
        <Field id="email" label="Business email" type="email" autoComplete="email" />
        <Field id="company" label="Company" autoComplete="organization" />
        <Field id="role" label="Role" autoComplete="organization-title" />
      </div>

      <Field
        id="workflow"
        label="Which workflow or operating problem is under pressure?"
        placeholder="Describe the handoffs, exceptions, delays, undocumented judgment, or decision bottleneck."
        textarea
      />

      <div>
        <Label htmlFor="timing">When does leadership need a decision?</Label>
        <select id="timing" name="timing" required className={`${controlClass} min-h-12`}>
          <option value="">Select one</option>
          <option value="now">Now / active priority</option>
          <option value="30-60">Within 30-60 days</option>
          <option value="60-90">Within 60-90 days</option>
          <option value="exploring">Exploring options</option>
        </select>
      </div>

      <Field
        id="message"
        label="Optional context"
        placeholder="What has already been tried, and what decision is currently blocked?"
        textarea
        required={false}
      />

      <div className="rounded-md border border-border bg-surface p-4 text-sm leading-6 text-muted">
        Do not submit PHI, personal financial information, credentials,
        confidential client information, or other sensitive data. Appropriately
        de-identified artifacts can be discussed after scope and handling controls are agreed.
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Find Your Highest-Leverage Workflow
      </Button>
    </form>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className="text-sm font-semibold text-foreground" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function Field({
  id,
  label,
  textarea = false,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={`${controlClass} resize-y py-3 leading-7`}
        />
      ) : (
        <input
          id={id}
          name={id}
          required={required}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${controlClass} min-h-12`}
        />
      )}
    </div>
  );
}
