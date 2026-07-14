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

      // --- Commercial path consolidation (Phase A) ---
      // Retire the parallel /offers and /assessment namespaces into the single
      // /services commercial path. Assessments become entry offers within a lane.
      { source: "/offers", destination: "/services", permanent: true },
      { source: "/offers/executive-recovery", destination: "/services/recovery", permanent: true },
      { source: "/offers/program-recovery", destination: "/services/recovery", permanent: true },
      { source: "/offers/portfolio-recovery", destination: "/services/recovery", permanent: true },
      { source: "/offers/operational-intelligence", destination: "/services/recovery", permanent: true },
      { source: "/offers/executive-ai", destination: "/services/enterprise-ai", permanent: true },
      { source: "/offers/healthcare-operating", destination: "/healthcare", permanent: true },
      { source: "/offers/prior-authorization", destination: "/services/prior-authorization-assessment", permanent: true },
      { source: "/offers/decision-rights-workshop", destination: "/services/prior-authorization-assessment", permanent: true },
      { source: "/offers/executive-operating-review", destination: "/services/fractional-leadership", permanent: true },
      { source: "/assessment", destination: "/services/recovery", permanent: true },
      { source: "/assessment/ai-delivery", destination: "/services/enterprise-ai", permanent: true },

      // Interim lane targets: the final lane URLs do not exist yet. Point them at
      // the nearest existing page so no redirect resolves to a 404. Phase B creates
      // /services/recovery, /services/enterprise-ai, /services/product, and
      // /services/fractional-leadership and removes the interim rows below.
      { source: "/services/recovery", destination: "/services/recovery-assessment", permanent: false },
      { source: "/services/fractional-leadership", destination: "/services/fractional-advisor", permanent: false },
      { source: "/services/enterprise-ai", destination: "/services", permanent: false },
      { source: "/services/product", destination: "/services", permanent: false },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
