import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  getAssetManualEditState,
  hashAssetContent,
  shouldBlockRegeneration,
} from "./manual-edit-protection";

describe("manual edit protection", () => {
  it("allows a generated asset to regenerate when content still matches the generated hash", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tif-clean-asset-"));
    const outputPath = join(dir, "asset.md");
    const content = "# Generated asset\n";

    await writeFile(outputPath, content, "utf8");
    const state = await getAssetManualEditState({
      outputPath,
      generatedAt: new Date("2026-06-30T12:00:00Z"),
      generatedHash: hashAssetContent(content),
    });

    expect(state.isManuallyEdited).toBe(false);
    expect(shouldBlockRegeneration(state, false)).toBe(false);

    await rm(dir, { recursive: true, force: true });
  });

  it("detects a manually edited asset and blocks unconfirmed regeneration", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tif-edited-asset-"));
    const outputPath = join(dir, "asset.md");
    const generatedContent = "# Generated asset\n";

    await writeFile(outputPath, "# Human-edited asset\n", "utf8");
    const state = await getAssetManualEditState({
      outputPath,
      generatedAt: new Date("2026-06-30T12:00:00Z"),
      generatedHash: hashAssetContent(generatedContent),
    });

    expect(state.isManuallyEdited).toBe(true);
    expect(state.lastEditedAt).toBeInstanceOf(Date);
    expect(shouldBlockRegeneration(state, false)).toBe(true);
    expect(shouldBlockRegeneration(state, true)).toBe(false);

    await rm(dir, { recursive: true, force: true });
  });

  it("uses Asset.updatedAt as a legacy generation timestamp when generatedHash is missing", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tif-legacy-edited-asset-"));
    const outputPath = join(dir, "asset.md");

    await writeFile(outputPath, "# Human-edited legacy asset\n", "utf8");
    const state = await getAssetManualEditState({
      outputPath,
      generatedAt: null,
      generatedHash: null,
      updatedAt: new Date("2020-01-01T00:00:00Z"),
    });

    expect(state.isManuallyEdited).toBe(true);
    expect(shouldBlockRegeneration(state, false)).toBe(true);

    await rm(dir, { recursive: true, force: true });
  });
});
