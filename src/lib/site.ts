export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "TKO helps leaders find operational bottlenecks, decision gaps, and revenue leakage, then build systems that improve execution.",
  cta: "Book an operating performance conversation",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
