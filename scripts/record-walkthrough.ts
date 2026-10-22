import fs from "node:fs";
import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";
import { click, installCursor, moveTo, scrollTo, select, updateCaption } from "./helpers/cursor-simulator";

const root = path.resolve(import.meta.dirname, "..");
const port = Number(process.env.WALKTHROUGH_PORT ?? 3000);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("WALKTHROUGH_PORT must be a port from 1024 to 65535");
const baseUrl = `http://localhost:${port}`;
const output = path.join(root, ".private/proof-quarantine");
const raw = path.join(output, "raw");
const viewport = { width: 1920, height: 1080 };
let server: ChildProcess | undefined;
let browser: Browser | undefined;
let cleaning: Promise<void> | undefined;
let serverError: Error | undefined;

async function responds() {
  try { return (await fetch(baseUrl, { signal: AbortSignal.timeout(4000) })).status === 200; }
  catch { return false; }
}

function stopServer(signal: NodeJS.Signals) {
  if (!server?.pid || server.exitCode !== null || server.signalCode !== null) return;
  try { process.kill(-server.pid, signal); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error; }
}

function cleanup() {
  return cleaning ??= (async () => {
    await browser?.close().catch(() => {});
    if (server?.pid && server.exitCode === null && server.signalCode === null) {
      stopServer("SIGTERM");
      await Promise.race([new Promise<void>((resolve) => server!.once("exit", () => resolve())), delay(5000)]);
      stopServer("SIGKILL");
    }
    // All recordings remain private until the subject, caption, and redaction are reviewed.
    if (fs.existsSync(raw) && fs.readdirSync(raw).length === 0) fs.rmdirSync(raw);
  })();
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => { void cleanup().finally(() => process.exit(signal === "SIGINT" ? 130 : 143)); });
}

async function ensureServer() {
  if (await responds()) { console.log(`Using the existing server on port ${port}.`); return; }
  server = spawn("npm", ["run", "dev", "--", "--port", String(port)], { cwd: root, detached: true, stdio: "inherit" });
  server.once("error", (error) => { serverError = error; });
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (serverError) throw serverError;
    if (server.exitCode !== null) throw new Error(`Development server exited (${server.exitCode})`);
    if (await responds()) return;
    await delay(1000);
  }
  throw new Error("Server did not return HTTP 200 within two minutes");
}

async function poster(page: Page, name: string) {
  // Playwright screenshots are PNG/JPEG. Convert PNG pixels to a real WebP file.
  const png = await page.screenshot({ fullPage: true, type: "png", animations: "disabled" });
  await sharp(png).webp({ quality: 85 }).toFile(path.join(output, `${name}-full-page.webp`));
  // A 16:9 player needs a viewport poster; retain the full-page evidence separately.
  const frame = await page.screenshot({ type: "png", animations: "disabled" });
  await sharp(frame).webp({ quality: 85 }).toFile(path.join(output, `${name}-poster.webp`));
}

async function record(name: string, route: string, scenario: (page: Page) => Promise<void>) {
  const context = await browser!.newContext({ viewport, deviceScaleFactor: 1, recordVideo: { dir: raw, size: viewport } });
  // Hide embedded recordings before the first paint, including repeat captures.
  await context.addInitScript(() => {
    const style = document.createElement("style");
    style.textContent = "figure:has(video), nextjs-portal { display:none !important } * { caret-color:transparent !important }";
    if (document.documentElement) document.documentElement.append(style);
    else {
      const observer = new MutationObserver(() => {
        if (document.documentElement) { document.documentElement.append(style); observer.disconnect(); }
      });
      observer.observe(document, { childList: true });
    }
  });
  const page = await context.newPage();
  const video = page.video()!;
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let complete = false;
  try {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 60_000 });
    if (response?.status() !== 200) throw new Error(`Demo route failed: ${route}`);
    await page.evaluate(() => document.fonts.ready);
    await installCursor(page);
    await scenario(page);
    if (errors.length) throw new Error(`Browser errors: ${errors.join("; ")}`);
    complete = true;
  } finally {
    await context.close();
    if (!complete) await video.delete();
  }
  fs.renameSync(await video.path(), path.join(output, `${name}.webm`));
  console.log(`Recorded ${name}.webm and ${name}-poster.webp`);
}

async function main() {
  fs.mkdirSync(raw, { recursive: true });
  await ensureServer();
  // Compile demo routes before opening a recorded browser context.
  for (const route of ["/healthcare/impact-assessment", "/selected-work/from-crm-to-operating-system"]) {
    const response = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(120_000) });
    if (response.status !== 200) throw new Error(`Could not warm ${route} (HTTP ${response.status}). If another app occupies port ${port}, set WALKTHROUGH_PORT to an available port.`);
    await response.arrayBuffer();
  }
  browser = await chromium.launch({ headless: true });
  await record("healthcare-decision-lab", "/healthcare/impact-assessment", async (page) => {
    await updateCaption(page, "Synthetic Prior-Authorization Decision Trace");
    await scrollTo(page, page.locator("#authorization-decision-lab"));
    await select(page, page.getByLabel("Mandate context"), "CMS-0057-F");
    await page.waitForTimeout(2000);
    await updateCaption(page, "Simulating Failure Mode: Core Platform Decoupling");
    await select(page, page.getByLabel("Failure mode"), "core-platform-decoupling");
    await page.waitForTimeout(2500);
    await updateCaption(page, "9-Part Implementation Chain: Policy → Control → Evidence");
    const chain = page.getByRole("group", { name: "Implementation chain" }).getByRole("button");
    for (let i = 0; i < 9; i++) {
      await click(page, chain.nth(i));
      await page.waitForTimeout(2000);
    }
    await poster(page, "healthcare-decision-lab");
    await updateCaption(page, "Inspect the controlling facts and downstream decision trace");
    const facts = page.getByRole("group").filter({ has: page.getByRole("button", { name: "Yes", exact: true }) });
    for (let i = 0; i < await facts.count(); i++) {
      await moveTo(page, facts.nth(i));
      await page.waitForTimeout(2000);
    }
    await updateCaption(page, "A policy waiver still needs the claims control artifact");
    await scrollTo(page, page.getByText("Determination", { exact: true }));
    await page.waitForTimeout(3000);
  });
  await record("rachelos-governed-ai", "/selected-work/from-crm-to-operating-system", async (page) => {
    await scrollTo(page, page.locator("#architecture-explorer"));
    const captions = [
      "Computed Relationship Context",
      "Input Validation and Visible Exceptions",
      "Exact-Message Review — Separate from the Operator Snapshot",
      "Structured Knowledge and Buyer Context",
    ];
    for (let i = 0; i < captions.length; i++) {
      await updateCaption(page, captions[i]);
      await click(page, page.getByRole("tab").nth(i));
      await page.locator("#architecture-panel img").evaluateAll((images) => Promise.all(images.map((image) => (image as HTMLImageElement).decode())));
      await page.waitForTimeout(5000);
      if (i === 2) await poster(page, "rachelos-governed-ai");
    }
    await updateCaption(page, "Your context. Human review. An accountable next action.");
    await page.waitForTimeout(3000);
  });
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(cleanup);
