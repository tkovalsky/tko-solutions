export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tkosolutions.com",
  description:
    "Operational Truth Diagnostics and decision-layer builds for healthcare and enterprise leaders with AI or workflow budget.",
  cta: "Book Discovery",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
