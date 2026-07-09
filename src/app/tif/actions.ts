"use server";

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  AssetStatus,
  AssetType,
  BusinessUnit,
  ContentTenant,
  DerivativeAssetType,
  OpportunitySourceType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  type DerivativeAssetKind,
  generateDerivativeCopy,
  makeContentSlug,
} from "@/lib/tif/content-workflow";
import { getAssetManualEditState, shouldBlockRegeneration } from "@/lib/tif/manual-edit-protection";
import { tifDb } from "@/lib/tif/db";

const execFileAsync = promisify(execFile);

// Reuses the existing TIF v0.1 compose pipeline (scripts/tif/compose-asset.mjs) as-is —
// no generation logic lives here. The console only triggers the same script a human would
// run via `npm run tif:compose <slug>`.
export async function generateAsset(formData: FormData) {
  const slug = formData.get("opportunitySlug");
  if (typeof slug !== "string" || !slug) {
    throw new Error("Missing opportunitySlug");
  }

  const regenerateAnyway = formData.get("regenerateAnyway") === "true";
  const existingAsset = await tifDb.asset.findUnique({
    where: { slug },
    select: {
      outputPath: true,
      generatedAt: true,
      generatedHash: true,
      updatedAt: true,
    },
  });

  if (existingAsset && !regenerateAnyway) {
    const editState = await getAssetManualEditState(existingAsset);
    if (shouldBlockRegeneration(editState, regenerateAnyway)) {
      throw new Error("Manual edits detected. Confirm regeneration before overwriting this asset.");
    }
  }

  await execFileAsync(
    process.execPath,
    ["--env-file=.env.local", "scripts/tif/compose-asset.mjs", slug],
    { cwd: process.cwd() },
  );

  revalidatePath("/tif");
  revalidatePath("/tif/deliverables");
  revalidatePath(`/tif/assets/${slug}`);
}

export async function createContentOpportunity(formData: FormData) {
  const title = requiredString(formData, "title");
  const tenant = enumValue(ContentTenant, requiredString(formData, "tenant"), "tenant");
  const businessUnit = enumValue(BusinessUnit, requiredString(formData, "businessUnit"), "businessUnit");
  const assetType = enumValue(AssetType, requiredString(formData, "assetType"), "assetType");
  const sourceType = enumValue(OpportunitySourceType, requiredString(formData, "sourceType"), "sourceType");
  const angle = requiredString(formData, "angle");
  const audience = optionalString(formData, "audience");
  const sourceUrl = optionalString(formData, "sourceUrl");
  const contextNotes = optionalString(formData, "contextNotes");
  const slug = await uniqueOpportunitySlug(makeContentSlug(title));

  await tifDb.assetOpportunity.create({
    data: {
      slug,
      title,
      tenant,
      businessUnit,
      assetType,
      sourceType,
      sourceUrl,
      contextNotes,
      angle,
      audience,
      status: "opportunity",
    },
  });

  revalidatePath("/tif");
  revalidatePath("/tif/deliverables");
  redirect(`/tif#opportunity-${slug}`);
}

export async function createRevisionRequest(formData: FormData) {
  const assetId = requiredString(formData, "assetId");
  const slug = requiredString(formData, "slug");
  const notes = requiredString(formData, "notes");
  const versionNumber = Number(formData.get("versionNumber")) || undefined;

  await tifDb.revisionRequest.create({
    data: {
      assetId,
      versionNumber,
      notes,
      requestedBy: optionalString(formData, "requestedBy"),
      status: "open",
    },
  });
  await tifDb.asset.update({
    where: { id: assetId },
    data: { status: "review" },
  });

  revalidatePath("/tif");
  revalidatePath("/tif/deliverables");
  revalidatePath(`/tif/assets/${slug}`);
}

export async function updateAssetWorkflowStatus(formData: FormData) {
  const assetId = requiredString(formData, "assetId");
  const slug = requiredString(formData, "slug");
  const status = enumValue(AssetStatus, requiredString(formData, "status"), "status");

  await tifDb.asset.update({
    where: { id: assetId },
    data: { status },
  });

  revalidatePath("/tif");
  revalidatePath("/tif/deliverables");
  revalidatePath(`/tif/assets/${slug}`);
}

export async function createDerivativeAsset(formData: FormData) {
  const assetId = requiredString(formData, "assetId");
  const slug = requiredString(formData, "slug");
  const type = enumValue(DerivativeAssetType, requiredString(formData, "type"), "type") as DerivativeAssetKind;

  const asset = await tifDb.asset.findUnique({
    where: { id: assetId },
    include: {
      versions: { orderBy: { versionNumber: "desc" }, take: 1 },
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }

  const latestVersion = asset.versions[0];
  const body =
    latestVersion?.body ??
    `Source asset "${asset.title}" has no captured draft version yet. Regenerate the asset first.`;

  await tifDb.derivativeAsset.create({
    data: {
      assetId,
      type,
      sourceVersionNumber: latestVersion?.versionNumber,
      body: generateDerivativeCopy({ type, title: asset.title, body }),
    },
  });

  revalidatePath(`/tif/assets/${slug}`);
}

async function uniqueOpportunitySlug(baseSlug: string) {
  let candidate = baseSlug;
  let suffix = 2;

  while (await tifDb.assetOpportunity.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing ${key}`);
  }
  return value.trim();
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function enumValue<T extends Record<string, string>>(values: T, value: string, label: string): T[keyof T] {
  if (!Object.values(values).includes(value)) {
    throw new Error(`Invalid ${label}`);
  }

  return value as T[keyof T];
}
