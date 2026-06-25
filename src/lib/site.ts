export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tkosolutions.com",
  description:
    "Operational Intelligence Systems that help organizations turn existing data into priorities, decisions, and action.",
  cta: "Schedule a Diagnostic",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
