"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";
import { isOfferSlug } from "@/lib/offers";

const intakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2).max(200).optional(),
  transformationContext: z.string().min(10).max(2000),
  currentPressure: z.enum([
    "healthcare-readiness",
    "leads-follow-up",
    "owner-bottleneck",
    "crm-trust",
    "manual-work",
    "ai-tools",
    "reporting-to-action",
    "knowledge-risk",
    "other",
  ]),
  revenueBand: z.enum(["under-2m", "2-5m", "5-20m", "20-100m", "100m-plus"]).optional(),
  targetDeadline: z.string().min(2).max(200).optional(),
  affectedSystems: z.string().min(2).max(1000).optional(),
  sponsor: z.string().min(2).max(200).optional(),
  healthcareScope: z.string().min(10).max(1000).optional(),
  crm: z.string().min(2).max(200).optional(),
  contactCount: z.enum(["under-500", "500-3000", "3000-8000", "over-8000", "unsure"]).optional(),
  consentEvidence: z.string().max(1000).optional(),
  caller: z.string().min(2).max(200).optional(),
  timing: z.enum(["now", "30", "31-90", "exploring"]),
  privacyConsent: z.literal(true),
  message: z.string().max(2000).optional(),
  consequence: z.string().max(2000).optional(),
  referrer: z.string().max(2000).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  device: z.enum(["mobile", "tablet", "desktop", "unknown"]).optional(),
  ctaLocation: z.string().max(200).optional(),
});

export async function submitDiagnosticIntake(formData: FormData) {
  const requestedOffer = getFormString(formData, "offer") ?? "";
  const selectedOffer = requestedOffer === "managed-follow-up" || isOfferSlug(requestedOffer) ? requestedOffer : undefined;
  const healthcare = selectedOffer === "regulatory-implementation-readiness-sprint";
  const managedFollowUp = selectedOffer === "managed-follow-up";
  const offer = selectedOffer ? `&offer=${selectedOffer}` : "";
  const contactResult = (status: string) => `/contact?status=${status}${offer}`;
  if (getFormString(formData, "website")) {
    redirect(contactResult("submitted"));
  }

  const parsed = intakeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    role: getFormString(formData, "role"),
    transformationContext: formData.get("transformationContext"),
    currentPressure: formData.get("currentPressure"),
    revenueBand: healthcare ? undefined : getFormString(formData, "revenueBand"),
    targetDeadline: healthcare ? getFormString(formData, "targetDeadline") : undefined,
    affectedSystems: healthcare ? getFormString(formData, "affectedSystems") : undefined,
    sponsor: healthcare ? getFormString(formData, "sponsor") : undefined,
    healthcareScope: healthcare ? getFormString(formData, "healthcareScope") : undefined,
    crm: managedFollowUp ? getFormString(formData, "crm") : undefined,
    contactCount: managedFollowUp ? getFormString(formData, "contactCount") : undefined,
    consentEvidence: managedFollowUp ? getFormString(formData, "consentEvidence") : undefined,
    caller: managedFollowUp ? getFormString(formData, "caller") : undefined,
    timing: formData.get("timing"),
    privacyConsent: formData.get("privacyConsent") === "on",
    message: getFormString(formData, "message"),
    consequence: getFormString(formData, "consequence"),
    referrer: getFormString(formData, "referrer"),
    utmSource: getFormString(formData, "utmSource"),
    utmMedium: getFormString(formData, "utmMedium"),
    utmCampaign: getFormString(formData, "utmCampaign"),
    device: getFormString(formData, "device"),
    ctaLocation: getFormString(formData, "ctaLocation"),
  });

  if (!parsed.success || (healthcare
    ? !parsed.data.targetDeadline || !parsed.data.affectedSystems || !parsed.data.sponsor || !parsed.data.healthcareScope
    : !parsed.data.revenueBand || (managedFollowUp && (!parsed.data.crm || !parsed.data.contactCount || !parsed.data.caller)))) {
    redirect(contactResult("invalid"));
  }

  const submittedAt = new Date();
  const source = getFormString(formData, "source") || "contact_form";
  const landingPage = getFormString(formData, "landingPage") || "/contact";
  const payload: Record<string, string | boolean> = {};
  if (selectedOffer) payload.offer = selectedOffer;
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) {
      payload[key] = value;
    }
  }
  let notificationSent = false;

  try {
    const lead = await persistInboundLead({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      role: parsed.data.role,
      source,
      landingPage,
      payload,
      submittedAt,
    });

    const notification = await notifyLead(lead);
    notificationSent = notification.status === "sent";
  } catch {
    redirect(contactResult("error"));
  }

  if (!notificationSent) {
    redirect(contactResult("notification-error"));
  }

  redirect(contactResult("submitted"));
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}
