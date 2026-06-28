"use server";

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { revalidatePath } from "next/cache";

const execFileAsync = promisify(execFile);

// Reuses the existing TIF v0.1 compose pipeline (scripts/tif/compose-asset.mjs) as-is —
// no generation logic lives here. The console only triggers the same script a human would
// run via `npm run tif:compose <slug>`.
export async function generateAsset(formData: FormData) {
  const slug = formData.get("opportunitySlug");
  if (typeof slug !== "string" || !slug) {
    throw new Error("Missing opportunitySlug");
  }

  await execFileAsync(
    process.execPath,
    ["--env-file=.env.local", "scripts/tif/compose-asset.mjs", slug],
    { cwd: process.cwd() },
  );

  revalidatePath("/tif");
  revalidatePath(`/tif/assets/${slug}`);
}
