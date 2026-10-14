import { track, type BeforeSendEvent } from "@vercel/analytics";

export const conversionEventNames = [
  "service_view",
  "case_study_view",
  "primary_cta_click",
  "secondary_cta_click",
  "contact_form_start",
  "contact_form_submit_attempt",
  "contact_form_result_view",
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
  utmMedium?: string;
  utmCampaign?: string;
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
  if (typeof window === "undefined" || window.location.pathname.startsWith("/tif")) return;
  const attribution = getConversionAttribution();

  const detail: ConversionEvent = {
    event,
    pagePath: window.location.pathname,
    timestamp: new Date().toISOString(),
    referralSource: attribution.referrer || undefined,
    utmSource: attribution.utmSource || undefined,
    utmMedium: attribution.utmMedium || undefined,
    utmCampaign: attribution.utmCampaign || undefined,
    deviceCategory:
      window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
    ...sanitizeEventProperties(properties),
  };

  window.__tkoConversionEvents = [...(window.__tkoConversionEvents ?? []).slice(-49), detail];
  window.dispatchEvent(new CustomEvent("tko:conversion", { detail }));
  window.dataLayer?.push({ ...detail });
  // Analytics must never interrupt navigation or inquiry submission.
  try { track(event, { ...detail }); } catch { /* The local event remains inspectable. */ }
}

export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url);
    if (url.pathname.startsWith("/tif")) return null;
    url.pathname = landingPath(url.pathname);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch { return null; }
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

const attributionKey = "tko:attribution:v1";
const attributionLifetime = 30 * 60 * 1000;

export type ConversionAttribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

function campaignToken(value: unknown): string {
  return typeof value === "string" && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value) ? value : "";
}

function landingPath(value: unknown): string {
  return typeof value === "string" && /^\/[a-zA-Z0-9/_-]{0,199}$/.test(value) && !value.startsWith("/tif") ? value : "/";
}

// First public landing context survives navigation in this tab for 30 minutes.
// Store only the path, referrer host, and constrained campaign labels, never raw URLs.
export function getConversionAttribution(): ConversionAttribution {
  if (typeof window === "undefined") return { landingPage: "/", referrer: "", utmSource: "", utmMedium: "", utmCampaign: "" };
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(attributionKey) ?? "null");
    if (stored && typeof stored.expiresAt === "number" && stored.expiresAt > Date.now() && stored.expiresAt <= Date.now() + attributionLifetime) {
      return { landingPage: landingPath(stored.landingPage), referrer: safeReferrerHost(`https://${stored.referrer ?? ""}`) ?? "", utmSource: campaignToken(stored.utmSource), utmMedium: campaignToken(stored.utmMedium), utmCampaign: campaignToken(stored.utmCampaign) };
    }
  } catch { /* Storage may be disabled. The inquiry must still work. */ }
  const params = new URLSearchParams(window.location.search);
  const context = {
    landingPage: landingPath(window.location.pathname),
    referrer: safeReferrerHost(document.referrer) ?? "",
    utmSource: campaignToken(params.get("utm_source")),
    utmMedium: campaignToken(params.get("utm_medium")),
    utmCampaign: campaignToken(params.get("utm_campaign")),
  };
  try { window.sessionStorage.setItem(attributionKey, JSON.stringify({ ...context, expiresAt: Date.now() + attributionLifetime })); }
  catch { /* No persistent storage is required for submitting an inquiry. */ }
  return context;
}
