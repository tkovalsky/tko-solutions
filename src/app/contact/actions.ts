"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

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

  console.info("Diagnostic intake submitted", parsed.data);
  redirect("/contact?status=submitted");
}

