export const site = {
  name: "TKO Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tkosolutions.com",
  description:
    "Healthcare workflow modernization for leaders who need to reduce administrative burden, recover stalled transformations, and build governed operational systems.",
  cta: "Schedule an Operational Recovery Assessment",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
