"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

const intakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2).max(200).optional(),
  workflowSegment: z.string().min(10).max(2000),
  currentTrigger: z.enum([
    "denials",
    "turnaround-backlog",
    "staff-capacity",
    "inconsistent-workflow",
    "key-person-dependency",
    "automation-decision",
    "other",
  ]),
  timing: z.enum(["now", "30", "31-90", "exploring"]),
  privacyConsent: z.literal(true),
  message: z.string().max(2000).optional(),
  referrer: z.string().max(2000).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  device: z.enum(["mobile", "tablet", "desktop", "unknown"]).optional(),
  ctaLocation: z.string().max(200).optional(),
});

export async function submitDiagnosticIntake(formData: FormData) {
  if (getFormString(formData, "website")) {
    redirect("/contact?status=submitted");
  }

  const parsed = intakeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    role: getFormString(formData, "role"),
    workflowSegment: formData.get("workflowSegment"),
    currentTrigger: formData.get("currentTrigger"),
    timing: formData.get("timing"),
    privacyConsent: formData.get("privacyConsent") === "on",
    message: getFormString(formData, "message"),
    referrer: getFormString(formData, "referrer"),
    utmSource: getFormString(formData, "utmSource"),
    utmMedium: getFormString(formData, "utmMedium"),
    utmCampaign: getFormString(formData, "utmCampaign"),
    device: getFormString(formData, "device"),
    ctaLocation: getFormString(formData, "ctaLocation"),
  });

  if (!parsed.success) {
    redirect("/contact?status=invalid");
  }

  const submittedAt = new Date();
  const source = getFormString(formData, "source") || "contact_form";
  const landingPage = getFormString(formData, "landingPage") || "/contact";
  const payload: Record<string, string | boolean> = {};
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
    redirect("/contact?status=error");
  }

  if (!notificationSent) {
    redirect("/contact?status=notification-error");
  }

  redirect("/contact?status=submitted");
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}
