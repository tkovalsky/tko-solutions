export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO helps complex service businesses expose hidden handoffs, decision bottlenecks, and knowledge trapped in people, then design governed AI-assisted workflows that improve execution.",
  cta: "Find Your Highest-Leverage Workflow",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "t.e.kovalsky@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/toddkovalsky",
  scheduling: process.env.NEXT_PUBLIC_SCHEDULING_URL,
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
