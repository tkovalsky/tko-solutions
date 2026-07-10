export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tkosolutions.com",
  description:
    "TKO helps leaders make hidden work visible, recover stalled workflows, and build systems of action for complex operations.",
  cta: "Explore the Operational Recovery Assessment",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
