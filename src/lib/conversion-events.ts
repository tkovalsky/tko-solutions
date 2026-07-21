export const conversionEventNames = [
  "service_view",
  "case_study_view",
  "primary_cta_click",
  "secondary_cta_click",
  "contact_form_start",
  "contact_form_submit_attempt",
  "contact_form_submit_success",
  "contact_form_submit_error",
  "email_link_click",
  "linkedin_click",
  "qualified_intake_indicator",
] as const;

export type ConversionEventName = (typeof conversionEventNames)[number];

export type ConversionProperties = {
  ctaLocation?: string;
  ctaLabel?: string;
  referencedService?: string;
  caseStudy?: string;
  errorType?: "client_validation" | "server_validation" | "submission_failure";
  qualified?: boolean;
};

export type ConversionEvent = ConversionProperties & {
  event: ConversionEventName;
  pagePath: string;
  timestamp: string;
  referralSource?: string;
  utmSource?: string;
  deviceCategory: "mobile" | "tablet" | "desktop";
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __tkoConversionEvents?: ConversionEvent[];
  }
}

export function trackConversion(
  event: ConversionEventName,
  properties: ConversionProperties = {},
) {
  if (typeof window === "undefined") return;

  const detail: ConversionEvent = {
    event,
    pagePath: window.location.pathname,
    timestamp: new Date().toISOString(),
    referralSource: safeReferrerHost(document.referrer),
    utmSource: safeUtmSource(window.location.search),
    deviceCategory:
      window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
    ...sanitizeEventProperties(properties),
  };

  window.__tkoConversionEvents = [...(window.__tkoConversionEvents ?? []).slice(-49), detail];
  window.dispatchEvent(new CustomEvent("tko:conversion", { detail }));
  window.dataLayer?.push({ ...detail });
}

export function sanitizeEventProperties(properties: ConversionProperties) {
  const sanitized: ConversionProperties = {};
  if (properties.ctaLocation) sanitized.ctaLocation = safeToken(properties.ctaLocation);
  if (properties.ctaLabel) sanitized.ctaLabel = safeToken(properties.ctaLabel);
  if (properties.referencedService) sanitized.referencedService = safeToken(properties.referencedService);
  if (properties.caseStudy) sanitized.caseStudy = safeToken(properties.caseStudy);
  if (properties.errorType) sanitized.errorType = properties.errorType;
  if (typeof properties.qualified === "boolean") sanitized.qualified = properties.qualified;
  return sanitized;
}

function safeToken(value: string) {
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, 120);
}

function safeReferrerHost(referrer: string) {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).hostname.slice(0, 120) || undefined;
  } catch {
    return undefined;
  }
}

function safeUtmSource(search: string) {
  const value = new URLSearchParams(search).get("utm_source");
  return value ? safeToken(value) : undefined;
}
