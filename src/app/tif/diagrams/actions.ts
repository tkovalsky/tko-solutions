"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AssetStatus, AssetType, BusinessUnit, ClaimStatus, ContentTenant, KnowledgeDiagramFormat } from "@prisma/client";
import { tifDb } from "@/lib/tif/db";
import { makeContentSlug } from "@/lib/tif/content-workflow";
import { parseDiagramList } from "@/lib/tif/knowledge-diagrams";

const createDiagramSchema = z.object({
  title: z.string().trim().min(3),
  tenant: z.enum(ContentTenant),
  businessUnit: z.enum(BusinessUnit),
  diagramFormat: z.enum(KnowledgeDiagramFormat),
  purpose: z.string().trim().min(10),
  executiveAudience: z.string().trim().min(2),
  businessProblem: z.string().trim().min(10),
  inputs: z.string().trim().min(2),
  outputs: z.string().trim().min(2),
  claimBoundary: z.string().trim().min(10),
  evidenceStatus: z.enum(ClaimStatus),
  evidenceSlugs: z.string().optional(),
});

export async function createKnowledgeDiagram(formData: FormData) {
  const parsed = createDiagramSchema.parse({
    title: formData.get("title"),
    tenant: formData.get("tenant"),
    businessUnit: formData.get("businessUnit"),
    diagramFormat: formData.get("diagramFormat"),
    purpose: formData.get("purpose"),
    executiveAudience: formData.get("executiveAudience"),
    businessProblem: formData.get("businessProblem"),
    inputs: formData.get("inputs"),
    outputs: formData.get("outputs"),
    claimBoundary: formData.get("claimBoundary"),
    evidenceStatus: formData.get("evidenceStatus"),
    evidenceSlugs: formData.get("evidenceSlugs") || undefined,
  });

  const slug = await uniqueDiagramSlug(makeContentSlug(parsed.title));
  const evidenceSlugs = parseDiagramList(parsed.evidenceSlugs ?? "");
  const evidence = evidenceSlugs.length
    ? await tifDb.evidence.findMany({ where: { slug: { in: evidenceSlugs } }, select: { id: true, slug: true } })
    : [];

  if (evidence.length !== evidenceSlugs.length) {
    const found = new Set(evidence.map((item) => item.slug));
    throw new Error(`Unknown evidence slug(s): ${evidenceSlugs.filter((slugItem) => !found.has(slugItem)).join(", ")}`);
  }

  const result = await tifDb.$transaction(async (tx) => {
    const knowledgeId = await nextKnowledgeDiagramId(tx);
    const opportunity = await tx.assetOpportunity.create({
      data: {
        slug,
        title: parsed.title,
        tenant: parsed.tenant,
        businessUnit: parsed.businessUnit,
        assetType: AssetType.knowledge_diagram,
        angle: parsed.purpose,
        audience: parsed.executiveAudience,
        sourceType: "title_idea",
        contextNotes: `Knowledge Diagram ${knowledgeId} · ${parsed.diagramFormat}\nBusiness problem: ${parsed.businessProblem}\nClaim boundary: ${parsed.claimBoundary}`,
      },
    });
    const asset = await tx.asset.create({
      data: {
        slug,
        title: parsed.title,
        tenant: parsed.tenant,
        businessUnit: parsed.businessUnit,
        assetType: AssetType.knowledge_diagram,
        status: AssetStatus.draft,
        outputPath: `asset-production/generated/${slug}.md`,
        opportunityId: opportunity.id,
      },
    });
    const diagram = await tx.knowledgeDiagram.create({
      data: {
        knowledgeId,
        assetId: asset.id,
        diagramFormat: parsed.diagramFormat,
        purpose: parsed.purpose,
        executiveAudience: parseCommaList(parsed.executiveAudience),
        businessProblem: parsed.businessProblem,
        inputs: parseDiagramList(parsed.inputs),
        outputs: parseDiagramList(parsed.outputs),
        claimBoundary: parsed.claimBoundary,
        evidenceStatus: parsed.evidenceStatus,
      },
    });
    if (evidence.length) {
      await tx.assetEvidence.createMany({
        data: evidence.map((item) => ({ assetId: asset.id, evidenceId: item.id })),
        skipDuplicates: true,
      });
    }
    return { diagram, asset };
  });

  revalidatePath("/tif");
  revalidatePath("/tif/diagrams");
  redirect(`/tif/diagrams/${result.asset.slug}`);
}

export async function linkAssetToDiagram(formData: FormData) {
  const diagramId = z.string().cuid().parse(formData.get("diagramId"));
  const assetId = z.string().cuid().parse(formData.get("assetId"));
  const diagram = await tifDb.knowledgeDiagram.findUnique({ where: { id: diagramId }, select: { assetId: true, asset: { select: { slug: true } } } });

  if (!diagram) throw new Error("Knowledge Diagram not found");
  if (diagram.assetId === assetId) throw new Error("A diagram cannot reference itself as a consuming asset");

  await tifDb.assetDiagram.upsert({
    where: { assetId_diagramId: { assetId, diagramId } },
    update: {},
    create: { assetId, diagramId },
  });

  revalidatePath("/tif/diagrams");
  revalidatePath(`/tif/diagrams/${diagram.asset.slug}`);
}

async function uniqueDiagramSlug(base: string) {
  let candidate = base;
  let suffix = 2;
  while (await tifDb.asset.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

async function nextKnowledgeDiagramId(tx: Pick<typeof tifDb, "knowledgeDiagram">) {
  const existing = await tx.knowledgeDiagram.findMany({ select: { knowledgeId: true } });
  const max = existing.reduce((current, item) => {
    const match = /^KD-(\d+)$/.exec(item.knowledgeId);
    return match ? Math.max(current, Number(match[1])) : current;
  }, 0);
  return `KD-${String(max + 1).padStart(3, "0")}`;
}

function parseCommaList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
