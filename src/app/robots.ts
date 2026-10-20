import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

// Public pages are open to search and answer engines alike. The operator console (/tif)
// and form endpoints (/api) are never indexable; the console is also auth-gated by
// middleware, so this is a courtesy signal rather than the security boundary.
const privatePaths = ["/tif", "/tif/", "/api", "/api/"];

// Answer-engine crawlers are named so the allow is explicit and auditable. They read the
// same public pages as search engines and are pointed at /llms.txt for the curated summary.
const answerEngineAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: answerEngineAgents, allow: ["/", "/llms.txt"], disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
