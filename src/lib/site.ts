export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tkosolutions.com",
  description:
    "Operational Intelligence Systems for complex organizations that need to see where work is actually failing.",
  cta: "Start the Diagnostic",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

