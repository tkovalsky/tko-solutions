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
  if (opportunity.evidenceLinks.length === 0) {
    throw new Error(`Opportunity "${slug}" has no linked evidence — cannot compose (traceability requires >=1).`);
  }

  const templatePath = TEMPLATE_BY_ASSET_TYPE[opportunity.assetType];
  const templateRaw = await readFile(templatePath, "utf8");

  const sourcesList = opportunity.evidenceLinks
    .map(({ evidence }) => `  - ${frontMatterDomainPrefix(evidence.domain)}:${evidence.slug}`)
    .join("\n");

  const evidenceTrailRows = opportunity.evidenceLinks
    .map(({ evidence }) => `| [...] | ${evidence.domain}:${evidence.slug} | ${evidence.proofRef} | ${evidence.claimGuard} |`)
    .join("\n");

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
    }`,
  );

  // Append a filled evidence trail (in addition to the template's own placeholder table).
  filled += `\n\n<!-- TIF v0.1 composed evidence trail (traceability) -->\n| Claim | Evidence record | proof_ref | Claim guard |\n|---|---|---|---|\n${evidenceTrailRows}\n`;

  await mkdir(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, `${opportunity.slug}.md`);
  await writeFile(outputPath, filled, "utf8");
  const generatedAt = new Date();
  const generatedHash = hashAssetContent(filled);

  const asset = await prisma.asset.upsert({
    where: { slug: opportunity.slug },
    update: {
      title: opportunity.title,
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
      assetType: opportunity.assetType,
      businessUnit: opportunity.businessUnit,
      status: "draft",
      outputPath,
      generatedAt,
      generatedHash,
      opportunityId: opportunity.id,
    },
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

  console.log(`Composed "${opportunity.title}" -> ${outputPath} (status: draft)`);
  return outputPath;
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
