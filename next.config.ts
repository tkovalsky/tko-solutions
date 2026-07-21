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
        source: "/case-studies/rachelos-delivery-model",
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
      { source: "/offers/executive-recovery", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/program-recovery", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/portfolio-recovery", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/operational-intelligence", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/executive-ai", destination: "/services", permanent: true },
      { source: "/offers/healthcare-operating", destination: "/healthcare", permanent: true },
      { source: "/offers/prior-authorization", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/decision-rights-workshop", destination: "/services/diagnostic", permanent: true },
      { source: "/offers/executive-operating-review", destination: "/services/operating-system-build", permanent: true },
      { source: "/assessment", destination: "/services/diagnostic", permanent: true },
      { source: "/assessment/ai-delivery", destination: "/services", permanent: true },

      { source: "/services/recovery", destination: "/services/diagnostic", permanent: true },
      { source: "/services/fractional-leadership", destination: "/services/operating-system-build", permanent: true },
      { source: "/services/enterprise-ai", destination: "/services", permanent: true },
      { source: "/services/product", destination: "/services", permanent: true },

      // One public entry offer and one bounded expansion path.
      { source: "/services/prior-authorization-assessment", destination: "/services/diagnostic", permanent: true },
      { source: "/services/recovery-assessment", destination: "/services/diagnostic", permanent: true },
      { source: "/services/fractional-advisor", destination: "/services/operating-system-build", permanent: true },

      // Evidence consolidation: Selected Work is the single public proof center.
      { source: "/proof", destination: "/selected-work", permanent: true },
      { source: "/proof/rachelos", destination: "/selected-work/from-crm-to-operating-system", permanent: true },
      { source: "/proof/transfer", destination: "/selected-work#method-portability", permanent: true },
      { source: "/proof/prior-authorization", destination: "/healthcare", permanent: true },
      { source: "/proof/gold-card", destination: "/healthcare", permanent: true },
      { source: "/proof/program-recovery", destination: "/selected-work/enterprise-care-management-modernization", permanent: true },
      { source: "/proof/executive-operating-system", destination: "/selected-work", permanent: true },
      { source: "/proof/ai-governance", destination: "/selected-work/from-crm-to-operating-system", permanent: true },

      // Frameworks are supporting method content, not a parallel product library.
      { source: "/frameworks", destination: "/healthcare", permanent: true },
      { source: "/frameworks/prior-authorization", destination: "/healthcare", permanent: true },
      { source: "/frameworks/gold-card", destination: "/healthcare", permanent: true },
      { source: "/frameworks/program-recovery", destination: "/selected-work/enterprise-care-management-modernization", permanent: true },
      { source: "/frameworks/executive-operating-system", destination: "/selected-work", permanent: true },
      { source: "/frameworks/ai-governance", destination: "/selected-work/from-crm-to-operating-system", permanent: true },
      { source: "/frameworks/:slug", destination: "/healthcare", permanent: true },

      // Two RachelOS narratives are merged into one bounded case study.
      { source: "/selected-work/rachelos-delivery-model", destination: "/selected-work/from-crm-to-operating-system", permanent: true },

      // Broad taxonomies now resolve into the healthcare specialization.
      { source: "/industries", destination: "/healthcare", permanent: true },
      { source: "/problems", destination: "/healthcare", permanent: true },
      { source: "/diagrams", destination: "/healthcare", permanent: true },
      { source: "/diagrams/:slug", destination: "/healthcare", permanent: true },

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
