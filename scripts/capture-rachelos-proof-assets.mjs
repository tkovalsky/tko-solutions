import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const sourceRoot = "/Users/todd/dev/rachel-realestate";
const envPath = path.join(sourceRoot, ".env.local");
const outputRoot = path.resolve("public/proof/rachelos");
const baseUrl = process.env.RACHELOS_BASE_URL ?? "http://localhost:3001";

function readEnvValue(file, keys) {
  const contents = fs.readFileSync(file, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || !keys.includes(match[1])) continue;
    return match[2].replace(/^['"]|['"]$/g, "").trim();
  }
  return undefined;
}

const opsKey = process.env.OPS_SECRET ?? process.env.OPS_KEY ?? readEnvValue(envPath, ["OPS_SECRET", "OPS_KEY"]);

if (!opsKey) {
  throw new Error("OPS_SECRET/OPS_KEY was not found in the environment or RachelOS .env.local.");
}

fs.mkdirSync(outputRoot, { recursive: true });

const routes = [
  ["canonical-queue", "/ops/queue"],
  ["today-work", "/ops/today"],
  ["human-approval", "/ops/needs-rachel"],
  ["system-health", "/ops/system-health"],
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1,
});

await context.addCookies([
  {
    name: "ops_auth",
    value: opsKey,
    url: baseUrl,
    httpOnly: true,
    sameSite: "Lax",
  },
]);

const page = await context.newPage();

async function stabilizeAndRedact({ broadNames = true, extraReplacements = [] } = {}) {
  await page.addStyleTag({
    content: `
      * { caret-color: transparent !important; }
      [data-nextjs-toast], nextjs-portal { display: none !important; }
    `,
  });

  await page.evaluate(({ broadNames, extraReplacements }) => {
    const replacements = new Map([
      ["Rachel", "Operator"],
      ["Todd", "Reviewer"],
      ["OperatorDelray", "RachelOS"],
      ["OperatorOS", "RachelOS"],
      ["Robin Chambers", "Sample Lead A"],
      ["Curtis Allen Lerch", "Sample Lead B"],
      ["Brenda Strauss", "Sample Lead C"],
      ["Seymour Braff", "Sample Lead D"],
      ...extraReplacements,
    ]);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let sampleLeadIndex = 1;
    const safeTitleCase = new Set([
      "Active Search",
      "Admin",
      "Calls",
      "Capture",
      "Command",
      "Content",
      "Contactability",
      "Created",
      "Draft Eligible",
      "Draft Exists",
      "Due Queue",
      "Emails",
      "First Contact",
      "Journey Gaps",
      "Last Contact",
      "Leads",
      "Messages",
      "Next Action",
      "Missing Email",
      "Missing Journey",
      "Missing Phone",
      "New Leads Contactable",
      "New Leads Missing Phone",
      "New Leads Missing Timeline",
      "New Leads",
      "Open Lead",
      "Queue",
      "Referrals",
      "Remaining",
      "System Health",
      "Texts",
      "Today",
      "Tours",
      "Unknown",
      "Validate",
      "Wait",
    ]);

    for (const node of nodes) {
      let text = node.nodeValue ?? "";
      text = text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "sample@example.com");
      text = text.replace(/\+\d{10,15}\b/g, "(555) 010-0123");
      text = text.replace(/\b(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g, "(555) 010-0123");
      for (const [from, to] of replacements) {
        text = text.replaceAll(from, to);
        text = text.replaceAll(from.toLowerCase(), to.toLowerCase());
      }
      const trimmed = text.trim();
      const personLike =
        /^[A-Z][a-z]+(?:\s+[A-Z]\.?)?(?:\s+(?:[A-Z][a-z]+(?:-[A-Z][a-z]+)?|[a-z]+)){0,3}$/.test(trimmed);
      if (broadNames && personLike && !safeTitleCase.has(trimmed)) {
        text = text.replace(trimmed, `Sample Lead ${sampleLeadIndex++}`);
      }
      if (broadNames) {
        const safeTokens = new Set([
          "Active", "Add", "Admin", "All", "And", "Answer", "Are", "As", "Ask", "Awaiting",
          "Blocked", "Budget", "Buy", "Call", "Calls", "Capture", "Command", "Confidence",
          "Contact", "Contactable", "Content", "Derived", "Do", "Draft",
          "Drafts", "Due", "Eligible", "Email", "Emails", "Engagement",
          "Exists", "First", "Florida", "Focus", "Guide", "Healthy", "Interest",
          "Is", "Journey", "Known", "Last", "Lead", "Leads", "Likely", "Look",
          "Market", "Medium", "Messages", "Missing", "More", "Move", "Needs", "Never", "New",
          "Next", "One", "Open", "Operator", "Ops", "Overdue", "Person", "Phone", "Planning", "Position",
          "Qualification", "Queue", "RachelOS", "Rachelos", "Recognize",
          "Recommended", "Recording", "Referral", "Referrals", "Relationship", "Relocation", "Remaining",
          "Rent", "Replied", "Reviewer", "Sample", "Search", "Share", "Since", "South", "Stage", "Starter",
          "State", "Straight", "System", "Tap", "Target", "Text", "Texts", "This", "Timeline", "Today",
          "Top", "Touring", "Tours", "Unknown", "Updates", "Validate", "Wait", "What", "When", "Why",
          "Work", "You",
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",
          "Nov", "Dec",
        ]);
        text = text.replace(/\b[A-Z][a-z]+(?:-[A-Z][a-z]+)?\b/g, (token) =>
          safeTokens.has(token) ? token : "Sample Lead",
        );
      }
      node.nodeValue = text;
    }
  }, { broadNames, extraReplacements });
}

async function capture(name, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 30000 });
  if (page.url().includes("/ops/login")) {
    throw new Error(`Authentication failed for ${route}`);
  }
  await page.waitForTimeout(600);
  await stabilizeAndRedact();
  await page.screenshot({
    path: path.join(outputRoot, `${name}.png`),
    fullPage: false,
  });
  console.log(`${name}.png`);
}

for (const [name, route] of routes) {
  await capture(name, route);
}

await page.goto(`${baseUrl}/ops/leads`, { waitUntil: "networkidle", timeout: 30000 });
await stabilizeAndRedact();
const leadHref = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a[href^='/ops/leads/']"));
  return links.map((link) => link.getAttribute("href")).find(Boolean) ?? null;
});

if (leadHref) {
  await capture("relationship-memory", leadHref);
} else {
  const rowButton = page.locator('button[style*="grid-column:2"]').first();
  if ((await rowButton.count()) > 0) {
    await Promise.all([
      page.waitForURL(/\/ops\/leads\/\d+/, { timeout: 10000 }),
      rowButton.click(),
    ]);
    await page.waitForTimeout(600);
    const leadName = (await page.locator("h1").first().textContent().catch(() => ""))?.trim();
    const leadFirstName = leadName?.split(/\s+/)[0];
    await stabilizeAndRedact({
      broadNames: false,
      extraReplacements: [
        ...(leadName ? [[leadName, "Sample Lead 1"]] : []),
        ...(leadFirstName ? [[leadFirstName, "this lead"]] : []),
      ],
    });
    await page.screenshot({
      path: path.join(outputRoot, "relationship-memory.png"),
      fullPage: false,
    });
    console.log("relationship-memory.png");
  }
}

await browser.close();
