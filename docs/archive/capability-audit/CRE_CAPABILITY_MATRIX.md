# CRE_CAPABILITY_MATRIX.md
**Phase 3 — CRE Intelligence implemented-capability inventory**
Repo: `cre-intelligence` (Next.js 14, file-based YAML, no DB, no AI SDK). Audited: 2026-06-24.

> Evidence rule honored: only implemented code + data files counted. The repo contains many planning docs (`INTELLIGENCE_PLATFORM_PRD.md`, `PRODUCT_STRATEGY.md`, `*_ROADMAP.md`, `FUTURE_STATE_*`); **none were used as proof** — most describe intended, not built, state.

## Reality check (what actually exists)
- **~2,976 LOC** across `lib/` + `app/` (vs RachelOS's ~20K in one folder).
- **Dependencies:** `next`, `react`, `js-yaml` only. **No database, no AI provider, no scraping/HTTP-collection library.**
- **Data = 8 hand-authored YAML entities:** 5 centers, 2 neighborhoods, 1 area (`data/`). Plus `strip_malls/` = **raw field photos (.HEIC/.JPEG)** — i.e. manual, in-person data collection.
- **`pipeline/` and `scripts/` directories are EMPTY** — there is no automated data pipeline.
- **Reports persist in-memory only** (`lib/reports/store.ts`: process-scoped `Map`, explicitly "swap for a DB later").
- **No test files.**
- **RachelOS integration is a stub** unless `RACHEL_OS_URL` is set (`lib/rachel/client.ts`).

**Maturity legend:** `Working` (runs, produces output today) · `Prototype` (real code, thin/curated data) · `Scaffold` (architecture present, not usable end-to-end) · `Absent` (named in plans, no code).

---

| # | Capability (as requested) | Status | Proof (files) | Maturity |
|---|---|---|---|---|
| 1 | **Data Collection** | **Manual only.** Field visits → photos (`strip_malls/*.HEIC`) → hand-authored YAML. No scraper, no automated ingest (`pipeline/`, `scripts/` empty). | `data/centers/*.yaml`, `strip_malls/` | **Prototype (manual)** |
| 2 | **Data Modeling** | **Strong.** A genuinely well-designed domain-agnostic `Intelligence` model: provenance (confidence + source), entity→intelligence→report primitives, normalization of legacy YAML. | `lib/intelligence/model.ts` (277 LOC), `lib/intelligence/entities.ts`, `data/schemas/commercial-entities.md` | **Working** |
| 3 | **Report Generation** | **Working** for populated entity types. Entity → `generateIntelligence` → ordered sections via a common builder; per-type generators (center, generic). | `lib/reports/builder.ts`, `lib/intelligence/generators/{center,generic,index}.ts`, `app/api/reports/generate`, `app/reports/view/[entityType]/[entityId]` | **Working** |
| 4 | **Market Intelligence** | **Prototype.** Derived inside report intelligence from curated YAML (class, SF, positioning); no live market feeds. | `lib/intelligence/generators/center.ts`, center YAML | **Prototype** |
| 5 | **Area Intelligence** | **Prototype.** One area entity (`south-florida`) + 2 neighborhoods modeled and reportable. | `data/areas/south-florida.yaml`, `data/neighborhoods/*.yaml` | **Prototype** |
| 6 | **Development Intelligence** | **Scaffold.** Entity type contemplated; residential community/development data is **absent** (engines "degrade gracefully" when unpopulated — see recommendation.ts comments). | `lib/engines/recommendation.ts` (notes absent community data) | **Scaffold** |
| 7 | **Comparison Engine** | **Working.** Any two entities → similarities/differences/advantages/tradeoffs/best-fit. | `lib/engines/comparison.ts`, `app/compare/[entityA]/[entityB]`, `app/api/comparisons` | **Working** |
| 8 | **Recommendation Engine** | **Working (graceful-degraded).** Buyer/operator brief → scored areas/communities + reasons; mirrors RachelOS fact set; scores whatever entity types are populated. | `lib/engines/recommendation.ts`, `app/api/recommendations` | **Prototype** |
| 9 | **Content Intelligence (gap + factory)** | **Working.** Computes missing reports/comparisons/guides/FAQ structurally off the entity graph → content roadmap. | `lib/engines/content.ts`, `app/api/content-gap`, `app/api/content-plan` | **Working** |
| 10 | **Lease-Lifecycle Signals** | **Prototype.** Domain-agnostic lease-expiration/option-notice urgency model (commercial twin of buyer timeline); intended to feed RachelOS notifications. | `lib/intelligence/leaseSignals.ts` | **Prototype** |
| 11 | **Publishing** | **Absent as a system.** Reports render via Next SSG/routes; there is no publish/approval/rollback workflow (unlike RachelOS). | `app/reports/*` (rendering only) | **Scaffold** |
| 12 | **SEO** | **Minimal.** `app/sitemap.ts` + `app/layout.tsx` metadata exist; no programmatic SEO, no per-report metadata strategy implemented. | `app/sitemap.ts`, `app/layout.tsx` | **Scaffold** |
| 13 | **Search** | **Absent.** Only "searchDemand" as an *input field* on the (stubbed) Rachel signals contract — no search feature in the app. | `lib/rachel/client.ts` (field only) | **Absent** |
| 14 | **Analytics** | **Absent.** No analytics, tracking, or metrics code. | — | **Absent** |
| 15 | **Operational Reporting** | **Absent.** No system-health/usage/ops reporting (contrast RachelOS `ops/system-health`). | — | **Absent** |
| 16 | **RachelOS Integration** | **Scaffold.** Clean narrow HTTP boundary defined; returns stub payload unless `RACHEL_OS_URL` configured. | `lib/rachel/client.ts` | **Scaffold** |

---

## What is genuinely impressive here (despite early stage)
- The **shared Intelligence model + generic Entity→Intelligence→Report architecture** is the most reusable, well-reasoned asset. It is the same "facts have provenance, reports are views over structured intelligence" philosophy as RachelOS, generalized.
- **Comparison, recommendation, and content-gap engines work today** over the curated data and are domain-agnostic by design.
- The **lease-signal → opportunity-with-timing** idea is a real cross-domain insight (commercial lease expiry = the CRE twin of a residential buyer's timeline urgency).

## What it is NOT (be honest with prospects)
- Not an automated data platform — **data collection is a person with a phone camera and YAML.**
- Not persistent — **reports vanish on restart.**
- Not AI-powered (no model calls).
- Not integrated with RachelOS in production (stub).
- Only **~8 real entities**, geographically narrow (Boca/Delray/South Florida).

## Phase 3 conclusion
CRE Intelligence is a **promising architecture-first prototype**, not a deployed product. Its marketable value today is as (a) **proof of a reusable intelligence/report architecture** and (b) a **second domain proving the RachelOS pattern generalizes** — NOT as a standalone "market data" capability. The website is correct to omit overstated CRE claims, but it currently omits CRE *entirely*, losing the legitimate "the pattern generalizes" proof point (see `TKO_ALIGNMENT_MATRIX.md`).
