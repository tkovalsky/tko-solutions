"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

const intakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  workflow: z.string().min(10),
  timing: z.enum(["now", "30-60", "60-90", "exploring"]),
  message: z.string().max(2000).optional(),
});

export async function submitDiagnosticIntake(formData: FormData) {
  const parsed = intakeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    role: formData.get("role"),
    workflow: formData.get("workflow"),
    timing: formData.get("timing"),
    message: getFormString(formData, "message"),
  });

  if (!parsed.success) {
    redirect("/contact?status=invalid");
  }

  const submittedAt = new Date();
  const source = getFormString(formData, "source") || "contact_form";
  const landingPage = getFormString(formData, "landingPage") || "/contact";

  const lead = await persistInboundLead({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    role: parsed.data.role,
    source,
    landingPage,
    payload: parsed.data,
    submittedAt,
  });

  await notifyLead(lead);

  redirect("/contact?status=submitted");
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}
