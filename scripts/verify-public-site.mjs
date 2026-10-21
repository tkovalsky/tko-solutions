import fs from "node:fs";
import path from "node:path";

// Run from the site checkout after npm run build. Read-only: no form submissions.
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), ".next/prerender-manifest.json"), "utf8"));
// Discovery files are seeded explicitly: they are not HTML, so nothing links to them.
const discovery = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/security.txt"];
const seeds = [...new Set([...Object.keys(manifest.routes).filter(p => !p.startsWith("/_")), "/contact", "/contact?offer=regulatory-implementation-readiness-sprint", "/contact?offer=operating-system-build", "/contact?offer=managed-follow-up", "/terms", ...discovery])];
const queue = [...seeds];
const pages = new Map();
const fragments = [];
const redirects = [];
const failures = [];
const decode = s => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
while (queue.length) {
  const target = queue.shift();
  if (pages.has(target)) continue;
  const url = new URL(target, base);
  let response;
  try { response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) }); }
  catch (error) { failures.push({ path: target, error: error.message }); pages.set(target, { status: "error" }); continue; }
  const type = response.headers.get("content-type") ?? "";
  const html = type.includes("text/html") ? await response.text() : "";
  if (!html) await response.body?.cancel();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => decode(m[1])));
  pages.set(target, { status: response.status, final: response.url, ids });
  if (response.status !== 200) failures.push({ path: target, status: response.status });
  if (new URL(response.url).pathname !== url.pathname) redirects.push({ path: target, final: response.url });
  for (const match of html.matchAll(/<(a|img|video|source|iframe)\b[^>]*>/g)) {
    const attrs = [...match[0].matchAll(/\b(href|src|poster)="([^"]+)"/g)];
    for (const attr of attrs) {
      let ref;
      try { ref = new URL(decode(attr[2]), new URL(response.url)); } catch { continue; }
      if (ref.protocol !== "http:" && ref.protocol !== "https:") continue;
      // Canonical absolute links become relative targets on a preview deployment.
      if (![base.host, "tko.solutions", "www.tko.solutions"].includes(ref.host)) continue;
      if (ref.pathname === "/_next/image") ref = new URL(ref.searchParams.get("url") ?? "", base);
      if (/^\/(tif|api)(\/|$)/.test(ref.pathname) || ref.pathname.startsWith("/_next/")) continue;
      const next = ref.pathname || "/";
      if (ref.hash && match[1] === "a") fragments.push({ source: target, path: next, id: decodeURIComponent(ref.hash.slice(1)) });
      if (!pages.has(next) && !queue.includes(next)) queue.push(next);
    }
  }
}
for (const fragment of fragments) {
  const target = pages.get(fragment.path);
  if (target?.status === 200 && !target.ids.has(fragment.id)) failures.push({ ...fragment, error: "missing fragment" });
}
// Rejected captures and unknown content must remain inaccessible, even when
// no rendered page links to them. These checks prevent accidental republication.
const mustBeMissing = [
  "/proof/rachelos/relationship-memory.png",
  "/proof/rachelos/system-health.png",
  "/videos/rachelos-governed-ai.webm",
  "/videos/rachelos-governed-ai-poster.webp",
  "/videos/rachelos-governed-ai-full-page.webp",
  "/services/unknown-offer",
  "/insights/unknown-guide",
];
for (const target of mustBeMissing) {
  try {
    const response = await fetch(new URL(target, base), { signal: AbortSignal.timeout(20000) });
    await response.body?.cancel();
    if (response.status !== 404) failures.push({ path: target, status: response.status, expected: 404 });
  } catch (error) { failures.push({ path: target, error: error.message }); }
}
console.log(JSON.stringify({ base: base.href, checkedAt: new Date().toISOString(), seededRoutes: seeds.length, checkedTargets: pages.size, redirects, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
