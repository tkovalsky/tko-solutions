// TIF v0.2 Priority 2 — Content Inventory scan.
// Walks known content directories across tko-site, rachel-realestate, and cre-intelligence,
// extracts a title and location for each item, and upserts ContentInventoryItem rows.
// Read-only against the source repos; only writes to this repo's Neon DB.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TKO_SITE_ROOT = process.cwd();
const RACHEL_ROOT = path.resolve(TKO_SITE_ROOT, "../rachel-realestate");
const CRE_ROOT = path.resolve(TKO_SITE_ROOT, "../cre-intelligence");

async function listFiles(dir, { extensions, recursive = false, exclude = [] } = {}) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (exclude.some((pattern) => entry.name.startsWith(pattern))) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && recursive) {
      files.push(...(await listFiles(full, { extensions, recursive, exclude })));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

async function extractTitle(filePath, fallbackKey = "title") {
  const raw = await readFile(filePath, "utf8");
  const match = raw.match(new RegExp(`^${fallbackKey}:\\s*"?(.*?)"?\\s*$`, "m"));
  if (match && match[1]) return match[1].trim();
  return path
    .basename(filePath)
    .replace(/\.(md|mdx|yaml|yml)$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugFor(repo, relativePath) {
  return `${repo}:${relativePath}`.toLowerCase().replace(/[^a-z0-9:_-]+/g, "-");
}

async function buildItems() {
  const items = [];

  // --- tko-site ---
  for (const file of await listFiles(path.join(TKO_SITE_ROOT, "content/selected-work"), {
    extensions: [".md"],
  })) {
    items.push({
      title: await extractTitle(file),
      location: path.relative(TKO_SITE_ROOT, file),
      repo: "tko-site",
      assetType: "case_study",
      businessUnit: "rachel",
    });
  }

  for (const file of await listFiles(path.join(TKO_SITE_ROOT, "asset-production/generated"), {
    extensions: [".md"],
  })) {
    const raw = await readFile(file, "utf8");
    const businessUnit = raw.match(/^business_unit:\s*(\w+)/m)?.[1] ?? "tko";
    const assetType = raw.match(/^asset_type:\s*([\w-]+)/m)?.[1]?.replace(/-/g, "_") ?? "article";
    items.push({
      title: await extractTitle(file),
      location: path.relative(TKO_SITE_ROOT, file),
      repo: "tko-site",
      assetType,
      businessUnit,
    });
  }

  for (const [domain, files] of Object.entries({
    healthcare: ["HEALTHCARE_EXPERIENCE_LIBRARY.md", "HEALTHCARE_STORY_LIBRARY.md"],
    rachelos: ["RACHELOS_EVIDENCE_LIBRARY.md"],
    stories: ["TRANSFORMATION_STORY_LIBRARY.md"],
  })) {
    for (const name of files) {
      const file = path.join(TKO_SITE_ROOT, "content/proof", domain, name);
      try {
        await readFile(file, "utf8");
      } catch {
        continue;
      }
      items.push({
        title: await extractTitle(file),
        location: path.relative(TKO_SITE_ROOT, file),
        repo: "tko-site",
        assetType: "proof_asset",
        businessUnit: domain === "healthcare" ? "tko" : domain === "rachelos" ? "rachel" : "tko",
      });
    }
  }

  // --- rachel-realestate ---
  for (const file of await listFiles(path.join(RACHEL_ROOT, "src/content/guides"), {
    extensions: [".md", ".mdx"],
  })) {
    const isComparison = /-vs-|\bvs\b/i.test(path.basename(file));
    items.push({
      title: await extractTitle(file),
      location: path.relative(RACHEL_ROOT, file),
      repo: "rachel-realestate",
      assetType: isComparison ? "comparison_guide" : "guide",
      businessUnit: "rachel",
    });
  }

  for (const file of await listFiles(path.join(RACHEL_ROOT, "src/content/areas"), {
    extensions: [".md", ".mdx"],
    recursive: true,
  })) {
    items.push({
      title: await extractTitle(file),
      location: path.relative(RACHEL_ROOT, file),
      repo: "rachel-realestate",
      assetType: "service_page",
      businessUnit: "rachel",
    });
  }

  for (const file of await listFiles(path.join(RACHEL_ROOT, "src/content/landing-pages"), {
    extensions: [".md", ".mdx"],
  })) {
    items.push({
      title: await extractTitle(file),
      location: path.relative(RACHEL_ROOT, file),
      repo: "rachel-realestate",
      assetType: "landing_page",
      businessUnit: "rachel",
    });
  }

  for (const file of await listFiles(path.join(RACHEL_ROOT, "src/content/research"), {
    extensions: [".md"],
    exclude: ["RESEARCH_REPORT_TEMPLATE"],
  })) {
    items.push({
      title: await extractTitle(file),
      location: path.relative(RACHEL_ROOT, file),
      repo: "rachel-realestate",
      assetType: "intelligence_report",
      businessUnit: "rachel",
    });
  }

  for (const file of await listFiles(path.join(RACHEL_ROOT, "src/content/testimonials"), {
    extensions: [".md"],
  })) {
    items.push({
      title: await extractTitle(file),
      location: path.relative(RACHEL_ROOT, file),
      repo: "rachel-realestate",
      assetType: "proof_asset",
      businessUnit: "rachel",
    });
  }

  // --- cre-intelligence ---
  for (const dir of ["data/centers", "data/neighborhoods", "data/areas"]) {
    for (const file of await listFiles(path.join(CRE_ROOT, dir), {
      extensions: [".yaml", ".yml"],
      exclude: ["_TEMPLATE"],
    })) {
      items.push({
        title: await extractTitle(file, "name"),
        location: path.relative(CRE_ROOT, file),
        repo: "cre-intelligence",
        assetType: "intelligence_report",
        businessUnit: "cre",
      });
    }
  }

  return items;
}

async function main() {
  const items = await buildItems();
  for (const item of items) {
    const slug = slugFor(item.repo, item.location);
    await prisma.contentInventoryItem.upsert({
      where: { slug },
      update: item,
      create: { slug, ...item },
    });
  }
  console.log(`Inventoried ${items.length} content items across tko-site, rachel-realestate, cre-intelligence.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
