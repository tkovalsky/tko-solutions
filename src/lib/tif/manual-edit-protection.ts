import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

type AssetManualEditInput = {
  outputPath: string;
  generatedAt: Date | null;
  generatedHash: string | null;
  updatedAt?: Date | null;
};

export type AssetManualEditState = {
  isManuallyEdited: boolean;
  generatedAt: Date | null;
  lastEditedAt: Date | null;
  currentHash: string | null;
};

export function shouldBlockRegeneration(editState: Pick<AssetManualEditState, "isManuallyEdited">, confirmed: boolean) {
  return editState.isManuallyEdited && !confirmed;
}

export function hashAssetContent(content: string) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

export async function getAssetManualEditState(asset: AssetManualEditInput): Promise<AssetManualEditState> {
  const generatedAt = asset.generatedAt ?? asset.updatedAt ?? null;
  let content: string;
  let mtime: Date | null = null;

  try {
    content = await readFile(asset.outputPath, "utf8");
    mtime = (await stat(asset.outputPath)).mtime;
  } catch {
    return {
      isManuallyEdited: false,
      generatedAt,
      lastEditedAt: null,
      currentHash: null,
    };
  }

  const currentHash = hashAssetContent(content);
  const isManuallyEdited = asset.generatedHash
    ? currentHash !== asset.generatedHash
    : Boolean(generatedAt && mtime && mtime.getTime() > generatedAt.getTime());

  return {
    isManuallyEdited,
    generatedAt,
    lastEditedAt: isManuallyEdited ? mtime : null,
    currentHash,
  };
}

export function formatAssetDate(date: Date | null) {
  if (!date) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
