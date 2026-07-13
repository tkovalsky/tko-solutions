// TIF v0.1 Asset Composer — template-fill only. No AI, no workflow engine, no automation.
// Input: an AssetOpportunity (+ its linked Evidence) + a template file.
// Output: a draft markdown asset on disk, plus an Asset + AssetEvidence trace in the DB.
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TEMPLATE_BY_ASSET_TYPE = {
  article: "asset-production/templates/article.md",
  case_study: "asset-production/templates/case-study.md",
  assessment: "asset-production/templates/assessment.md",
  intelligence_report: "asset-production/templates/intelligence-report.md",
  knowledge_diagram: "asset-production/templates/knowledge-diagram.md",
  // landing_page, executive_brief, comparison_guide have no template yet (v0.1 gap).
  // Fall back to article.md rather than block composition.
  landing_page: "asset-production/templates/article.md",
  executive_brief: "asset-production/templates/article.md",
  comparison_guide: "asset-production/templates/article.md",
};

const OUTPUT_DIR = "asset-production/generated";

function frontMatterDomainPrefix(domain) {
  return domain;
}

function hashAssetContent(content) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

async function composeOpportunity(slug) {
  const opportunity = await prisma.assetOpportunity.findUnique({
    where: { slug },
    include: { evidenceLinks: { include: { evidence: true } } },
  });

  if (!opportunity) {
    throw new Error(`No AssetOpportunity found for slug "${slug}"`);
  }

  const templatePath = TEMPLATE_BY_ASSET_TYPE[opportunity.assetType];
  const templateRaw = await readFile(templatePath, "utf8");

  const sourcesList =
    opportunity.evidenceLinks.length > 0
      ? opportunity.evidenceLinks
          .map(({ evidence }) => `  - ${frontMatterDomainPrefix(evidence.domain)}:${evidence.slug}`)
          .join("\n")
      : "  - operator:opportunity-context";

  const evidenceTrailRows = opportunity.evidenceLinks
    .map(({ evidence }) => `| [...] | ${evidence.domain}:${evidence.slug} | ${evidence.proofRef} | ${evidence.claimGuard} |`)
    .join("\n");
  const openRevisionRequests = await prisma.revisionRequest.findMany({
    where: {
      asset: { slug: opportunity.slug },
      status: "open",
    },
    orderBy: { createdAt: "asc" },
  });
  const revisionContext = formatRevisionContext(openRevisionRequests.map((request) => request.notes));

  let filled = templateRaw
    .replace(/title:\s*"\[.*?\]"/, `title: "${opportunity.title}"`)
    .replace(/slug:\s*\[kebab-slug\]/, `slug: ${opportunity.slug}`)
    .replace(/sources:\n\s*-\s*\[domain:record-id\]/, `sources:\n${sourcesList}`)
    .replace(/summary:\s*>-\n\s*\[.*?\]/, `summary: >-\n  ${opportunity.angle}`)
    .replace(/^# \[Title\]$/m, `# ${opportunity.title}`);

  // Insert the opportunity angle as the hook under the title (the only authored line
  // the composer writes; everything else stays a [...] placeholder for the human/Claude
  // drafting pass per asset-production/METHOD.md).
  filled = filled.replace(
    /(\*\[Hook:.*?\]\*|\*\[One-line framing.*?\]\*)/,
    `$1\n\n> **Composer note.** Opportunity angle: ${opportunity.angle}${
      opportunity.audience ? `\n> Audience: ${opportunity.audience}` : ""
    }${opportunity.contextNotes ? `\n> Operator context: ${opportunity.contextNotes}` : ""}${
      opportunity.sourceUrl ? `\n> Source URL: ${opportunity.sourceUrl}` : ""
    }`,
  );

  // Append a filled evidence trail (in addition to the template's own placeholder table).
  if (revisionContext) {
    filled += `\n\n${revisionContext}\n`;
  }
  filled += `\n\n<!-- TIF v0.1 composed evidence trail (traceability) -->\n| Claim | Evidence record | proof_ref | Claim guard |\n|---|---|---|---|\n${
    evidenceTrailRows || "| [...] | operator:opportunity-context | Operator-provided context only. | Verify before publishing. |"
  }\n`;

  await mkdir(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, `${opportunity.slug}.md`);
  await writeFile(outputPath, filled, "utf8");
  const generatedAt = new Date();
  const generatedHash = hashAssetContent(filled);

  const asset = await prisma.asset.upsert({
    where: { slug: opportunity.slug },
    update: {
      title: opportunity.title,
      tenant: opportunity.tenant,
      assetType: opportunity.assetType,
      businessUnit: opportunity.businessUnit,
      outputPath,
      generatedAt,
      generatedHash,
      opportunityId: opportunity.id,
    },
    create: {
      slug: opportunity.slug,
      title: opportunity.title,
      tenant: opportunity.tenant,
      assetType: opportunity.assetType,
      businessUnit: opportunity.businessUnit,
      status: "draft",
      outputPath,
      generatedAt,
      generatedHash,
      opportunityId: opportunity.id,
    },
  });

  const latestVersion = await prisma.assetVersion.aggregate({
    where: { assetId: asset.id },
    _max: { versionNumber: true },
  });
  const versionNumber = (latestVersion._max.versionNumber ?? 0) + 1;

  await prisma.assetVersion.create({
    data: {
      assetId: asset.id,
      versionNumber,
      title: opportunity.title,
      body: filled,
      revisionNotes: openRevisionRequests.map((request) => request.notes).join("\n\n") || null,
      createdBy: "composer",
    },
  });

  await prisma.asset.update({
    where: { id: asset.id },
    data: { currentVersionNumber: versionNumber },
  });

  for (const { evidence } of opportunity.evidenceLinks) {
    await prisma.assetEvidence.upsert({
      where: { assetId_evidenceId: { assetId: asset.id, evidenceId: evidence.id } },
      update: {},
      create: { assetId: asset.id, evidenceId: evidence.id },
    });
  }

  await prisma.assetOpportunity.update({
    where: { id: opportunity.id },
    data: { status: "composed" },
  });

  if (openRevisionRequests.length > 0) {
    await prisma.revisionRequest.updateMany({
      where: { id: { in: openRevisionRequests.map((request) => request.id) } },
      data: { status: "applied", appliedAt: new Date() },
    });
  }

  console.log(`Composed "${opportunity.title}" -> ${outputPath} (draft v${versionNumber})`);
  return outputPath;
}

function formatRevisionContext(notes) {
  const cleaned = notes.map((note) => note.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";

  return [
    "<!-- Content Factory revision inputs -->",
    "REVISION REQUESTS TO ADDRESS:",
    ...cleaned.map((note, index) => `${index + 1}. ${note}`),
    "<!-- End revision inputs -->",
  ].join("\n");
}

const targetSlug = process.argv[2];
if (!targetSlug) {
  console.error("Usage: node scripts/tif/compose-asset.mjs <opportunity-slug>");
  process.exitCode = 1;
} else {
  composeOpportunity(targetSlug)
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
