# TKO Launch Program — Implementation Status

Tracks execution of the audit (`docs/TKO_SITE_EXECUTIVE_MESSAGING_SEO_CONVERSION_AUDIT_2026_07_13.md`) in highest-business-value order. One workstream per reviewable commit. Deferred work is documented in `docs/BACKLOG.md`, not dropped.

**Last updated:** 2026-07-13

## Roadmap & Status

| # | Workstream | Priority | Status |
|---|---|---|---|
| 1 | Executive Messaging | P0 | Not started |
| 2 | Information Architecture | P0 | **Partial** — commercial-path consolidation (Phase A) done; services rewrite (Phase B/C) pending |
| 3 | CTA & Conversion | P0 | **Completed** |
| 4 | Enterprise Credibility | P0 | Not started |
| 5 | Proof vs Framework | P0 | **Completed** |
| 6 | Content Cleanup | P0 | **Partial** — internal placeholder leakage removed from framework pages; broader sweep pending |
| 7 | Technical SEO | P0 | Not started |
| 8 | Contact Experience | P0 | **Completed** (delivered within CTA & Conversion) |
| 9 | Analytics | P0 | Not started |
| 10 | Services Rewrite | P1 | Not started (depends on IA Phase B) |
| 11 | Selected Work | P1 | Not started |
| 12 | Content Clusters | P2 | Deferred — see BACKLOG |

## Completed

### IA — Commercial Path Consolidation (Phase A)
- **Audit finding:** P0.1 Consolidate the Commercial Architecture (three parallel taxonomies: `/services`, `/offers`, `/assessment`).
- **Implementation:** Retired `/offers/*` and `/assessment/*` to 301/308 redirects into a single `/services` path; removed them from nav, footer, sitemap, and internal links; excluded framework-class `/proof/*` children from the sitemap. Interim lane redirects added so no destination 404s.
- **Files changed:** `next.config.ts`, `components/site/header.tsx`, `components/site/footer.tsx`, `app/sitemap.ts`, `components/site/authority-links.tsx`, `lib/authority.ts`, and internal links across `founder`, `proof`, `proof/rachelos`, `proof/founder`, `healthcare`, `problems`, `selected-work/[slug]`, `not-found.tsx`, `hero.tsx`.
- **Validation:** build ✓; all retired URLs 308→lane; sitemap clean.

### CTA & Conversion (roadmap #3) + Contact Experience (roadmap #8)
- **Audit findings:** P0.3 Make the CTA Promise Truthful and Consistent; P0.9 Reduce Contact Friction (confirmation/expectations portion); mobile-navigation and header-clipping notes.
- **Implementation:** Canonical CTA system — **Discuss an Active Initiative** (→ `/contact`), **Review Selected Work** (→ `/selected-work`), **Request a Conversation** (form submit). Standardized via 4 shared components so pages inherit defaults. Eliminated all `Book`/`Schedule` wording. Replaced the mobile horizontal-scroll nav with an accessible hamburger menu (`mobile-nav.tsx`). Rewrote contact confirmation to state reviewer, response time, and next step.
- **Files changed:** see `docs/audits/CTA_CONVERSION_AUDIT.md` → "Pages Modified".
- **Validation:** build ✓ (63/63), lint ✓, typecheck ✓ (modified files), live smoke test ✓.
- **Detail:** `docs/audits/CTA_CONVERSION_AUDIT.md`.

### Proof vs Framework Separation (roadmap #5)
- **Audit finding:** P0.6 Reserve "Proof" for Proof — five `/proof/*` children were frameworks/synthesized operating patterns, not direct evidence.
- **Implementation:** Reclassified the five operating-model pages (prior-authorization, gold-card, program-recovery, executive-operating-system, ai-governance) into a new `/frameworks` hub + `/frameworks/[slug]`. Renamed data model (`ProofPage`→`FrameworkPage`, `proofPages`→`frameworkPages`, `getProofPage`→`getFrameworkPage`); component `ProofAuthorityPage`→`FrameworkAuthorityPage` with canonical CTA ("Discuss an Active Initiative" → `/contact`), `/frameworks` breadcrumb/canonical, and the "downloadable executive brief placeholder" internal-language line removed. Trimmed the `/proof` hub to inspectable evidence only and added a single pointer to `/frameworks`. Deleted the obsolete `/proof/[slug]` route. Repointed all internal `/proof/{slug}` links (founder/offer relatedProof, searchClusters) to `/frameworks/{slug}`. Added 301 redirects, sitemap coverage, and a footer "Frameworks" link.
- **Files changed:** `lib/authority.ts`, `components/site/authority-page.tsx`, `components/site/footer.tsx`, `app/frameworks/page.tsx` (new), `app/frameworks/[slug]/page.tsx` (new), `app/proof/page.tsx`, `app/proof/[slug]/page.tsx` (deleted), `app/sitemap.ts`, `next.config.ts`.
- **Validation:** build ✓ (64/64), lint ✓, typecheck ✓; smoke test — all 5 `/proof/{slug}`→`/frameworks/{slug}` 308s; new routes 200; proof hub carries no framework links; framework canonical/breadcrumb/CTA correct; sitemap includes `/frameworks*` and excludes the old `/proof/{slug}`.
- **Acceptance:** Proof now contains only inspectable evidence; frameworks are a separate, indexed class.

## In Progress

_None._

## Deferred

See `docs/BACKLOG.md`. Summary: CTA analytics instrumentation (→ Analytics workstream), sticky mobile CTA (P2), Content Clusters (P2), authority-expansion/framework/template/video/diagram items (P2).

## Blocked

_None._
