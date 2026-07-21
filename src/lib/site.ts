export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO helps specialty medical groups, MSOs, and provider-side healthcare operators identify the operational causes of prior-authorization delays, avoidable denials, rework, and staff dependency before they fund more automation.",
  cta: "Request a Diagnostic Fit Call",
  socialImage: "/og-pa-v2.png",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "t.e.kovalsky@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
