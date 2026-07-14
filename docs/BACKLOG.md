# TKO Launch Program — Backlog

Deferred work, documented rather than dropped. Each item was evaluated against the Decision Framework (enterprise trust, conversion, reduced complexity, deduplication, SEO value, dependency). Items that answered "no" to most were downgraded.

**Last updated:** 2026-07-13

---

## BL-001 — CTA analytics event instrumentation

- **Previous priority:** P0 (implied by CTA workstream)
- **New priority:** P0 — moved to the Analytics workstream (roadmap #9)
- **Reason deferred:** Instrumentation is cross-cutting and belongs with the broader analytics/measurement setup (audit P0.10), not the CTA-copy workstream. Standardizing CTA identity first makes event taxonomy cleaner.
- **Business value:** High — required to measure conversion-path performance and CTA effectiveness.
- **Dependencies:** Analytics provider + Search Console/Bing verification (audit P0.10).
- **Estimated effort:** M
- **Recommended future sprint:** Analytics workstream (next P0 batch)
- **Acceptance criteria:** Header/hero/inline/CtaBand CTA clicks fire events tagged with source page and CTA role; form starts/completions/validation failures tracked; proof→service and service→contact paths observable.

## BL-002 — Sticky mobile CTA on long content pages

- **Previous priority:** —
- **New priority:** P2
- **Reason deferred:** Conversion polish; the standardized in-page CTAs and mobile menu CTA already provide clear, repeated conversion access. Not required for launch quality.
- **Business value:** Low–Medium.
- **Dependencies:** None.
- **Estimated effort:** S
- **Recommended future sprint:** Post-launch conversion optimization.
- **Acceptance criteria:** A single persistent, dismissible CTA on long templates that does not obscure content or harm CLS/accessibility.

## BL-003 — Content Clusters (roadmap #12)

- **Previous priority:** P2
- **New priority:** P2 (confirmed)
- **Reason deferred:** Authority/SEO expansion. Does not materially change launch trust or the single conversion path. Depends on Services Rewrite and Selected Work being finalized first.
- **Business value:** Medium (compounding SEO).
- **Dependencies:** Services Rewrite (#10), Selected Work (#11), Technical SEO (#7).
- **Estimated effort:** L
- **Recommended future sprint:** Post-launch demand capture (audit Days 61–90).
- **Acceptance criteria:** Three coherent clusters (Operational Transformation, Healthcare Operations, Enterprise AI/Product) with problem → guide → framework → proof → service paths.

## BL-004 — Authority-expansion assets (frameworks hub, templates, videos, additional diagrams, secondary keyword pages)

- **Previous priority:** Various (audit P2 / "New Content Opportunities")
- **New priority:** P2
- **Reason deferred:** Program directive to defer authority expansion, downloadable templates, videos, visual polish, speculative landing pages, additional diagrams, and secondary keyword targets. None are required to launch an enterprise-ready site; several risk re-introducing thin/duplicate content.
- **Business value:** Medium, compounding — but not launch-blocking.
- **Dependencies:** Proof vs Framework (#5) must define the evidence model first; a `/frameworks` hub should launch only when ≥3 complete assets exist.
- **Estimated effort:** L (ongoing)
- **Recommended future sprint:** Post-launch, phased.
- **Acceptance criteria:** Each new asset owns a distinct buyer, intent, and evidence set, with crawlable standalone content and deliberate cluster links (no thin pages).

## BL-006 — Content-cleanup sweep of remaining internal language

- **Previous priority:** P0 (Content Cleanup workstream)
- **New priority:** P0 — continue in a dedicated pass
- **Reason deferred (partial):** The high-visibility placeholder leakage on live framework pages was removed during the Proof/Framework split. The remaining internal-language instances (`Primary search query`, "Proposal and downloadable asset placeholders…", "Commercial offer / bounded assessment" in `OfferAuthorityPage`; `entry` funnel labels like "Low-friction entry point"/"downstream conversion offer" in `content.ts`; diagram internal IDs) live mostly on redirect-intercepted or lower-traffic surfaces and are best cleaned in one focused sweep rather than piecemeal.
- **Business value:** High — internal terminology erodes executive trust.
- **Dependencies:** Overlaps BL-005 (dead `/offers` pages carry much of this leakage).
- **Estimated effort:** M
- **Recommended future sprint:** Next P0 batch (Content Cleanup).
- **Acceptance criteria:** No buyer-facing page exposes search-query labels, funnel/entry labels, publication status, evidence/workflow IDs, or proposal/download placeholders.

## BL-005 — Remove redirect-intercepted legacy page files (`/offers/*`, `/assessment/*`)

- **Previous priority:** —
- **New priority:** P1 — Information Architecture (Phase B)
- **Reason deferred:** The 308 redirects make these routes unreachable, so deleting the files is not launch-blocking. Removal is cleaner to do alongside the Services Rewrite that creates the real lane pages (avoids stale imports of `offerPages`).
- **Business value:** Low (code hygiene / reduced complexity).
- **Dependencies:** IA Phase B (Services data model reshape).
- **Estimated effort:** S
- **Recommended future sprint:** Information Architecture / Services Rewrite.
- **Acceptance criteria:** `app/offers/**` and `app/assessment/**` removed; `offerPages` retired or repurposed; redirects still resolve; build green.
