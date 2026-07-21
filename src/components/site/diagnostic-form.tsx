"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackConversion } from "@/lib/conversion-events";

const controlClass =
  "mt-2 w-full rounded-md border border-[color:var(--input-border)] bg-white px-4 text-base text-foreground transition-colors placeholder:text-[color:var(--input-border-hover)] hover:border-[color:var(--input-border-hover)] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Attribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  device: string;
  ctaLocation: string;
};

const defaultAttribution: Attribution = {
  landingPage: "/contact",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  device: "unknown",
  ctaLocation: "contact_page",
};

export function DiagnosticForm({
  action,
  status,
}: {
  action: (formData: FormData) => void | Promise<void>;
  status?: string;
}) {
  const [attribution, setAttribution] = useState(defaultAttribution);
  const started = useRef(false);
  const validationErrorTracked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      landingPage: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      ctaLocation: params.get("cta") || "contact_page",
    });
  }, []);

  useEffect(() => {
    if (status === "submitted") trackConversion("contact_form_submit_success");
    if (status === "invalid") {
      trackConversion("contact_form_submit_error", { errorType: "server_validation" });
    }
    if (status === "error") {
      trackConversion("contact_form_submit_error", { errorType: "submission_failure" });
    }
  }, [status]);

  function handleFormStart() {
    if (started.current) return;
    started.current = true;
    trackConversion("contact_form_start", { ctaLocation: "contact_form" });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const prepared = formData.get("commercialReadiness") === "prepared";
    const activeTiming = formData.get("timing") !== "exploring";
    trackConversion("contact_form_submit_attempt", { ctaLocation: "contact_form" });
    trackConversion("qualified_intake_indicator", { qualified: prepared && activeTiming });
  }

  function handleInvalid() {
    if (validationErrorTracked.current) return;
    validationErrorTracked.current = true;
    trackConversion("contact_form_submit_error", { errorType: "client_validation" });
  }

  return (
    <form
      action={action}
      className="space-y-6"
      onFocusCapture={handleFormStart}
      onSubmit={handleSubmit}
      onInvalidCapture={handleInvalid}
    >
      <input type="hidden" name="source" value="diagnostic_fit_call" />
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" />
        <Field id="email" label="Business email" type="email" autoComplete="email" />
        <Field id="company" label="Organization" autoComplete="organization" />
        <Field id="role" label="Title / role" autoComplete="organization-title" />
      </div>

      <SelectField id="organizationType" label="Organization type">
        <option value="">Select one</option>
        <option value="specialty-medical-group">Specialty medical group</option>
        <option value="mso">MSO</option>
        <option value="health-system">Health system</option>
        <option value="payer-health-plan">Payer / health plan</option>
        <option value="healthcare-technology-services">Healthcare technology or services</option>
        <option value="other">Other</option>
      </SelectField>

      <Field
        id="workflowSegment"
        label="Which prior-authorization workflow or specialty/payer segment is under pressure?"
        placeholder="Describe the workflow boundary, specialty, payer segment, location, or team involved. Use de-identified operating context only."
        textarea
      />

      <SelectField id="currentTrigger" label="What is the primary trigger or problem?">
        <option value="">Select one</option>
        <option value="denials">Avoidable denials or inconsistent outcomes</option>
        <option value="turnaround-backlog">Turnaround time or backlog</option>
        <option value="staff-capacity">Staff capacity or rework</option>
        <option value="inconsistent-workflow">Inconsistent payer or specialty workflow</option>
        <option value="key-person-dependency">Knowledge concentrated in experienced staff</option>
        <option value="automation-decision">Vendor, automation, or headcount decision</option>
        <option value="other">Other</option>
      </SelectField>

      <Field
        id="triggerContext"
        label="What changed or made this urgent now?"
        placeholder="Describe the operating pressure and the decision leadership needs to make."
        textarea
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField id="timing" label="When does leadership need a decision?">
          <option value="">Select one</option>
          <option value="now">Active now</option>
          <option value="30">Within 30 days</option>
          <option value="31-90">Within 31–90 days</option>
          <option value="exploring">Exploring only</option>
        </SelectField>
        <Field
          id="executiveSponsor"
          label="Executive sponsor / decision owner"
          placeholder="Name or role"
        />
      </div>

      <SelectField id="commercialReadiness" label="Commercial readiness">
        <option value="">Select one</option>
        <option value="prepared">
          Prepared to fund a $25,000 Diagnostic if fit is confirmed
        </option>
        <option value="approval-required">Budget approval required</option>
        <option value="early-exploration">Early exploration</option>
      </SelectField>

      <Field
        id="message"
        label="Optional context"
        placeholder="What has already been tried, and what evidence is available?"
        textarea
        required={false}
      />

      <div className="rounded-md border border-border bg-surface p-4 text-sm leading-6 text-muted">
        Do not submit PHI, patient identifiers, credentials, personal financial
        information, confidential client information, or other sensitive data.
        Appropriately de-identified artifacts can be discussed after scope and
        handling controls are agreed.
      </div>

      <div className="flex items-start gap-3">
        <input
          id="privacyConsent"
          name="privacyConsent"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-[color:var(--input-border)] accent-[color:var(--primary)] focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <Label htmlFor="privacyConsent">
          I consent to TKO using this information to review and respond to my request.
        </Label>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Request the Fit Call
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

function SelectField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={id} required className={`${controlClass} min-h-12`}>
        {children}
      </select>
    </div>
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
