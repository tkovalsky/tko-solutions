export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tko.solutions",
  description:
    "Executive strategy through implementation for complex operations. TKO turns operating problems into working strategy, operating models, products, and AI-enabled systems—from executive decision through production implementation.",
  cta: "Discuss an Active Initiative",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
