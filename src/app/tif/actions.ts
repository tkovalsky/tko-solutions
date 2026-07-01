"use server";

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { revalidatePath } from "next/cache";
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
  revalidatePath(`/tif/assets/${slug}`);
}
