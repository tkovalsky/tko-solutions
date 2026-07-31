"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ingestPastedOpportunity } from "@/lib/opportunity-intelligence/intake/ingest";
import { tifDb } from "@/lib/tif/db";

const INTAKE_PATH = "/tif/oi/intake";

const intakeSchema = z.object({
  rawContent: z.string().trim().min(200, "Too short to extract from"),
  canonicalUrl: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .pipe(z.string().url("Enter a valid source URL.").optional()),
  organizationName: z.string().trim().min(1, "Organization is required."),
  title: z.string().trim().min(1, "Role / context is required."),
});

function redirectWithError(message: string): never {
  redirect(`${INTAKE_PATH}?error=${encodeURIComponent(message)}`);
}

export async function captureManualIntake(formData: FormData) {
  if (formData.get("intent") === "reviewDuplicate") {
    const sourceId = z.string().trim().min(1).parse(formData.get("sourceId"));
    const opportunityId = z.string().trim().min(1).parse(formData.get("opportunityId"));
    redirect(
      `${INTAKE_PATH}?capture=reviewed&sourceId=${encodeURIComponent(
        sourceId,
      )}&opportunityId=${encodeURIComponent(opportunityId)}`,
    );
  }

  const parsed = intakeSchema.safeParse({
    rawContent: formData.get("rawContent"),
    canonicalUrl: formData.get("canonicalUrl") || undefined,
    organizationName: formData.get("organizationName"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    redirectWithError(parsed.error.issues[0]?.message ?? "Invalid intake input.");
  }

  let result;
  try {
    result = await ingestPastedOpportunity(
      {
        organization: { name: parsed.data.organizationName },
        title: parsed.data.title,
        rawContent: parsed.data.rawContent,
        canonicalUrl: parsed.data.canonicalUrl,
      },
      tifDb,
    );
  } catch (error) {
    redirectWithError(error instanceof Error ? error.message : "Intake failed.");
  }

  revalidatePath(INTAKE_PATH);
  const capture = result.duplicate ? "duplicate" : "created";
  redirect(
    `${INTAKE_PATH}?capture=${capture}&sourceId=${encodeURIComponent(
      result.sourceId,
    )}&opportunityId=${encodeURIComponent(result.opportunityId)}`,
  );
}
