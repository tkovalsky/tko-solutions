import { createHash } from "node:crypto";

export function normalizeSourceContent(rawContent: string): string {
  return rawContent
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function hashSourceContent(normalizedContent: string): string {
  return createHash("sha256").update(normalizedContent, "utf8").digest("hex");
}

export function normalizeFactValue(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replace(/[^\p{L}\p{N}+$%./ -]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function canonicalizeSourceUrl(value?: string | null): string | null {
  const candidate = value?.trim();
  if (!candidate) {
    return null;
  }

  const url = new URL(candidate);
  url.hash = "";
  url.hostname = url.hostname.toLocaleLowerCase("en-US");

  if (
    (url.protocol === "https:" && url.port === "443") ||
    (url.protocol === "http:" && url.port === "80")
  ) {
    url.port = "";
  }

  const trackingKeys = new Set([
    "fbclid",
    "gclid",
    "mc_cid",
    "mc_eid",
    "ref",
    "source",
  ]);
  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith("utm_") || trackingKeys.has(key)) {
      url.searchParams.delete(key);
    }
  }
  url.searchParams.sort();

  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  return url.toString();
}
