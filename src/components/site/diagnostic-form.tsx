"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getConversionAttribution, trackConversion } from "@/lib/conversion-events";
import { getRachelOSUseCase } from "@/lib/rachelos-use-cases";
import { getOffer, type OfferSlug } from "@/lib/offers";

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
  managedFollowUp = false,
  useCaseId,
  offerSlug,
}: {
  action: (formData: FormData) => void | Promise<void>;
  status?: string;
  managedFollowUp?: boolean;
  useCaseId?: string;
  offerSlug?: OfferSlug;
}) {
  const workflowExample = managedFollowUp ? undefined : getRachelOSUseCase(useCaseId);
  const selectedOffer = managedFollowUp || workflowExample ? undefined : getOffer(offerSlug ?? "");
  const healthcare = selectedOffer?.slug === "regulatory-implementation-readiness-sprint";
  const [attribution, setAttribution] = useState(defaultAttribution);
  const started = useRef(false);
  const validationErrorTracked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = getConversionAttribution();
    setAttribution({
      landingPage: campaign.landingPage,
      referrer: campaign.referrer,
      utmSource: campaign.utmSource,
      utmMedium: campaign.utmMedium,
      utmCampaign: campaign.utmCampaign,
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      ctaLocation: params.get("cta") || "contact_page",
    });
  }, []);

  useEffect(() => {
    if (status === "submitted") trackConversion("contact_form_submit_success");
    if (status === "invalid") {
      trackConversion("contact_form_submit_error", { errorType: "server_validation" });
    }
    if (status === "error" || status === "notification-error") {
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
    const activeTiming = formData.get("timing") !== "exploring";
    const revenueFit = ["5-20m", "20-100m", "100m-plus"].includes(String(formData.get("revenueBand")));
    trackConversion("contact_form_submit_attempt", { ctaLocation: "contact_form" });
    trackConversion("qualified_intake_indicator", { qualified: activeTiming && (healthcare || managedFollowUp || revenueFit) });
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
      <input type="hidden" name="source" value={managedFollowUp ? "managed_follow_up_pilot" : workflowExample ? `rachelos_use_case_${workflowExample.id}` : selectedOffer ? `commercial_offer_${selectedOffer.slug}` : "diagnostic_fit_call"} />
      {managedFollowUp ? <input type="hidden" name="offer" value="managed-follow-up" /> : null}
      {selectedOffer ? <input type="hidden" name="offer" value={selectedOffer.slug} /> : null}
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" />
        <Field id="email" label="Business email" type="email" autoComplete="email" />
        <Field id="company" label={managedFollowUp ? "Team / brokerage" : "Company"} autoComplete="organization" />
        <Field
          id="role"
          label="Title / role (optional)"
          autoComplete="organization-title"
          required={false}
        />
      </div>

      <Field
        id="transformationContext"
        label={managedFollowUp ? "Which follow-up keeps slipping?" : healthcare ? "Which mandate or platform transition needs readiness evidence?" : "What would you like to fix or build?"}
        placeholder={healthcare ? "The approved mandate or platform transition, affected teams and systems, and the readiness question you need answered. Do not include patient or confidential client data." : "The buyer inquiry, follow-up gap, or workflow you want to improve. Include the tools, decision owner, and what should happen next."}
        textarea
        defaultValue={workflowExample?.intake}
      />

      <SelectField key={workflowExample?.id ?? selectedOffer?.slug ?? "general"} id="currentPressure" label="Which sounds most like your business?" defaultValue={workflowExample?.pressure ?? (healthcare ? "healthcare-readiness" : undefined)}>
        <option value="">Select one</option>
        <option value="healthcare-readiness">A healthcare mandate or platform transition needs readiness evidence</option>
        <option value="leads-follow-up">Leads come in, but follow-up is inconsistent</option>
        <option value="owner-bottleneck">Everything routes through the owner or COO</option>
        <option value="crm-trust">We have a CRM, but nobody trusts it or uses it well</option>
        <option value="manual-work">People copy information between systems by hand</option>
        <option value="ai-tools">We want to put AI to work in a specific workflow</option>
        <option value="reporting-to-action">Reports don&apos;t tell anyone what to do</option>
        <option value="knowledge-risk">Too much depends on a few key people</option>
        <option value="other">Something else</option>
      </SelectField>

      {healthcare ? <fieldset className="space-y-6 rounded-lg border border-border bg-surface p-5"><legend className="px-2 font-semibold">Readiness scope</legend>
        <div className="grid gap-6 md:grid-cols-2"><Field id="targetDeadline" label="Target deadline or decision date" placeholder="For example: release decision in March, or date to be agreed" /><Field id="sponsor" label="Sponsor or accountable role" placeholder="For example: VP Operations; name optional" /></div>
        <Field id="affectedSystems" label="Affected systems and teams" placeholder="For example: intake, UM platform, claims adapter, and delegated vendor" textarea />
        <Field id="healthcareScope" label="Scope and the decision you need" placeholder="One approved change, the population or workflow in scope, and the decision your sponsor needs. Unknown boundaries can be stated explicitly." textarea />
      </fieldset> : null}

      <div className="grid gap-6 md:grid-cols-2">
        {!healthcare ? <SelectField id="revenueBand" label={managedFollowUp ? "Annual commission revenue (not property sales volume)" : "Annual revenue"}>
          <option value="">Select one</option>
          <option value="under-2m">Under $2M</option>
          <option value="2-5m">$2M–$5M</option>
          <option value="5-20m">$5M–$20M</option>
          <option value="20-100m">$20M–$100M</option>
          <option value="100m-plus">Over $100M</option>
        </SelectField> : null}

        <SelectField id="timing" label="When do you want this fixed?">
          <option value="">Select one</option>
          <option value="now">Now</option>
          <option value="30">Within 30 days</option>
          <option value="31-90">Within 90 days</option>
          <option value="exploring">Planning ahead / next year</option>
        </SelectField>
      </div>

      <Field
        id="message"
        label={managedFollowUp ? "Team size, CRM, and approximate contact count (optional)" : "Which tools do you run on? (optional)"}
        placeholder={managedFollowUp ? "For example: 3 agents, Follow Up Boss, about 1,200 contacts. Tell me which tools and people are involved." : "For example: HubSpot, spreadsheets, QuickBooks, Gmail, an industry CRM, a few AI tools."}
        textarea
        required={false}
      />

      <Field
        id="consequence"
        label="What happens if nothing changes? (optional)"
        placeholder="Lost deals, owner hours, a key person leaving, a growth plan the current setup can't support."
        textarea
        required={false}
      />

      <div className="rounded-md border border-border bg-surface p-4 text-sm leading-6 text-muted">
        Please don&apos;t include passwords, patient information, customer personal data, or other sensitive
        information. Details can be shared safely once we agree to work together.
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
          I consent to TKO using this information to review and respond to my request.{" "}
          <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
            Privacy notice
          </Link>
          .
        </Label>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {managedFollowUp ? "Discuss a Follow-Up Pilot" : "Request a Conversation"}
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
  defaultValue,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={id} required defaultValue={defaultValue} className={`${controlClass} min-h-12`}>
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
  defaultValue,
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
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
          defaultValue={defaultValue}
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
