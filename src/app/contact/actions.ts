"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { notifyLead } from "@/lib/leads/notify";
import { persistInboundLead } from "@/lib/leads/persist";

const intakeSchema = z.object({
  problem: z.string().min(10),
  systems: z.string().min(3),
  notWorking: z.string().min(10),
  aiDeployed: z.enum(["yes", "no", "unsure"]),
  decision: z.string().min(10),
  name: z.string().min(2),
  email: z.string().email(),
});

export async function submitDiagnosticIntake(formData: FormData) {
  const parsed = intakeSchema.safeParse({
    problem: formData.get("problem"),
    systems: formData.get("systems"),
    notWorking: formData.get("notWorking"),
    aiDeployed: formData.get("aiDeployed"),
    decision: formData.get("decision"),
    name: formData.get("name"),
    email: formData.get("email"),
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
