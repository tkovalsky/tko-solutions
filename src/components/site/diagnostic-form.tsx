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

export function ProgramReviewForm({
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
    const timing = formData.get("timing");
    const budgetRange = formData.get("budgetRange");
    const executiveDecision = formData.get("executiveDecision");
    const activeTiming = timing === "now" || timing === "30" || timing === "31-90";
    const definedDecision =
      typeof executiveDecision === "string" && executiveDecision.trim().length >= 10;
    const plausibleCommercialReadiness =
      budgetRange === "10-25" ||
      budgetRange === "25-50" ||
      budgetRange === "50-150" ||
      budgetRange === "150-plus";

    trackConversion("contact_form_submit_attempt", { ctaLocation: "contact_form" });
    trackConversion("qualified_intake_indicator", {
      qualified: activeTiming && definedDecision && plausibleCommercialReadiness,
    });
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
      <input type="hidden" name="source" value="confidential_program_review" />
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" />
        <Field id="email" label="Business email" type="email" autoComplete="email" />
        <Field id="company" label="Organization" autoComplete="organization" />
        <Field id="role" label="Title or role" autoComplete="organization-title" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField id="organizationType" label="Organization type">
          <option value="">Select one</option>
          <option value="healthcare-provider-mso">Healthcare provider or MSO</option>
          <option value="payer-health-plan">Payer or health plan</option>
          <option value="health-technology-services">Health technology or services</option>
          <option value="financial-services">Financial services</option>
          <option value="wealth-fintech">Wealth management or fintech</option>
          <option value="pe-backed-acquisitive">PE-backed or acquisitive business</option>
          <option value="consulting-firm">Consulting firm</option>
          <option value="other">Other</option>
        </SelectField>

        <SelectField id="engagementNeed" label="Engagement need">
          <option value="">Select one</option>
          <option value="program-under-pressure">Program under pressure</option>
          <option value="operating-workflow-issue">Operating workflow issue</option>
          <option value="ai-initiative">AI initiative</option>
          <option value="fractional-transformation-leadership">Fractional transformation leadership</option>
          <option value="prior-authorization">Prior authorization</option>
          <option value="consulting-delivery-partner">Consulting delivery partner</option>
          <option value="other">Other</option>
        </SelectField>
      </div>

      <Field
        id="programUnderPressure"
        label="Program or initiative under pressure"
        placeholder="Describe the bounded program, workflow, initiative, or delivery responsibility. Use non-confidential context only."
        textarea
      />

      <Field
        id="urgencyContext"
        label="What changed or made this urgent?"
        placeholder="Describe the trigger, exposure, or approaching decision without including sensitive information."
        textarea
      />

      <Field
        id="executiveDecision"
        label="Executive decision required within 90 days"
        placeholder="What must leadership decide, approve, reset, narrow, fund, stop, renegotiate, or escalate?"
        textarea
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField id="timing" label="Timing">
          <option value="">Select one</option>
          <option value="now">Active now</option>
          <option value="30">Within 30 days</option>
          <option value="31-90">Within 31–90 days</option>
          <option value="exploring">Exploring or more than 90 days out</option>
        </SelectField>
        <Field
          id="executiveSponsor"
          label="Executive sponsor or decision owner"
          placeholder="Name or role"
        />
      </div>

      <SelectField id="budgetRange" label="Approximate budget range">
        <option value="">Select one</option>
        <option value="under-10">Under $10,000</option>
        <option value="10-25">$10,000–$25,000</option>
        <option value="25-50">$25,000–$50,000</option>
        <option value="50-150">$50,000–$150,000</option>
        <option value="150-plus">$150,000+</option>
        <option value="not-determined">Not yet determined</option>
      </SelectField>

      <Field
        id="message"
        label="Optional context"
        placeholder="What has already been tried, and what non-sensitive evidence is available?"
        textarea
        required={false}
      />

      <div className="rounded-md border border-border bg-surface p-4 text-sm leading-6 text-muted">
        Do not submit PHI, patient identifiers, PII, credentials, personal financial
        information, confidential client or company information, or other sensitive
        data. Appropriately de-identified materials can be discussed only after scope
        and handling controls are agreed.
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
        Request a Confidential Program Review
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
