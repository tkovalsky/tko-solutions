"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { BusinessUnit, CaptureSource } from "@prisma/client";
import { tifDb } from "@/lib/tif/db";

const captureSchema = z.object({
  title: z.string().trim().min(1),
  observation: z.string().trim().min(1),
  source: z.enum(CaptureSource),
  businessUnit: z.enum(BusinessUnit).optional(),
  tags: z.string().optional(),
});

function slugify(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${Date.now().toString(36)}`;
}

// Capture-only, per TIF v0.2 Priority 1: no edit/classification/workflow. The only mutation
// this file performs is an insert — there is no update or delete action for CaptureItem.
export async function createCaptureItem(formData: FormData) {
  const parsed = captureSchema.parse({
    title: formData.get("title"),
    observation: formData.get("observation"),
    source: formData.get("source"),
    businessUnit: formData.get("businessUnit") || undefined,
    tags: formData.get("tags") || undefined,
  });

  const tags = (parsed.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await tifDb.captureItem.create({
    data: {
      slug: slugify(parsed.title),
      title: parsed.title,
      observation: parsed.observation,
      source: parsed.source,
      businessUnit: parsed.businessUnit ?? null,
      tags,
    },
  });

  revalidatePath("/tif/inbox");
}
