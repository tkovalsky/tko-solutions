import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/case-studies/racheldelray-operating-system",
        destination: "/selected-work/from-crm-to-operating-system",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/selected-work",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/selected-work/:slug",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/selected-work",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
