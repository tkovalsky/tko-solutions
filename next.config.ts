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
      { source: "/assessment", destination: "/services/diagnostic", permanent: true },
      { source: "/assessment/ai-delivery", destination: "/services/enterprise-ai", permanent: true },

      // Interim lane targets: the final lane URLs do not exist yet. Point them at
      // the nearest existing page so no redirect resolves to a 404. Phase B creates
      // /services/recovery, /services/enterprise-ai, /services/product, and
      // /services/fractional-leadership and removes the interim rows below.
      { source: "/services/recovery", destination: "/services/diagnostic", permanent: false },
      { source: "/services/fractional-leadership", destination: "/services/operating-system-build", permanent: false },
      { source: "/services/enterprise-ai", destination: "/services", permanent: false },
      { source: "/services/product", destination: "/services", permanent: false },

      // One public entry offer and one bounded expansion path.
      { source: "/services/recovery-assessment", destination: "/services/diagnostic", permanent: true },
      { source: "/services/fractional-advisor", destination: "/services/operating-system-build", permanent: true },

      // --- Proof vs Framework separation (WS3) ---
      // Experience-based operating models move from /proof to /frameworks so that
      // /proof is reserved for inspectable built-system evidence.
      { source: "/proof/prior-authorization", destination: "/frameworks/prior-authorization", permanent: true },
      { source: "/proof/gold-card", destination: "/frameworks/gold-card", permanent: true },
      { source: "/proof/program-recovery", destination: "/frameworks/program-recovery", permanent: true },
      { source: "/proof/executive-operating-system", destination: "/frameworks/executive-operating-system", permanent: true },
      { source: "/proof/ai-governance", destination: "/frameworks/ai-governance", permanent: true },

      // --- Founder consolidation (Credibility Sprint, 2026-07-17) ---
      // One canonical founder destination. /about, /proof/founder, and the
      // eight /founder/* taxonomy pages merge into /founder (anchored sections).
      { source: "/about", destination: "/founder", permanent: true },
      { source: "/proof/founder", destination: "/founder", permanent: true },
      { source: "/founder/what-i-have-built", destination: "/founder#experience", permanent: true },
      { source: "/founder/what-i-have-owned", destination: "/founder#timeline", permanent: true },
      { source: "/founder/how-i-think", destination: "/founder#philosophy", permanent: true },
      { source: "/founder/operating-principles", destination: "/founder#philosophy", permanent: true },
      { source: "/founder/difficult-decisions", destination: "/founder#philosophy", permanent: true },
      { source: "/founder/what-i-got-wrong", destination: "/founder#philosophy", permanent: true },
      { source: "/founder/healthcare", destination: "/founder#experience", permanent: true },
      { source: "/founder/ai-delivery", destination: "/founder#capabilities", permanent: true },
      { source: "/founder/:slug", destination: "/founder", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
