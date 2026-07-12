# Codex Implementation Package — Publish the Delivery-Model Authority System

Per CLAUDE.md operating mode: content/strategy production was explicitly instructed and is complete (this package's files). **Site implementation was NOT performed** — this is the Codex handoff for it, to execute only after Todd approves the drafts.

## Objective

Publish the approved RachelOS delivery-model flagship and its first derivatives on tko-site, with the AI Delivery Assessment as the conversion path.

## Scope

Phase A (this package): flagship page, one insight article (delivery-model analysis), assessment offer page, cross-links from the existing flagship. Nothing else. Phase B (persona briefs, transformation story, proof blocks) only after Phase A is live and approved.

## Files To Modify

- `content/selected-work/RACHELOS_FLAGSHIP_CASE_STUDY.md` — add cross-link to the new flagship (one paragraph, "companion" frontmatter already exists as a pattern)
- `src/app/selected-work/` — route/page for `rachelos-delivery-model` (follow the existing selected-work rendering pattern exactly)
- `src/app/insights/` — the delivery-model analysis article via the existing `[slug]` route (add content file per the insights content pattern)
- `src/lib/content.ts` — only if selected-work/insights indexes are registered there (verify before editing)
- `content/offers/` — new `ai-delivery-assessment/` mirroring `recovery-assessment/` structure
- Sitemap (`src/app/sitemap.ts`) — verify new routes are emitted

## Files To Avoid

- Anything under `/Users/todd/dev/rachel-realestate` (read-only evidence source)
- `prisma/` (no schema changes; TIF seeding is a script concern, not schema)
- Existing published guides/case studies beyond the single cross-link above

## Implementation Steps

1. Move approved drafts from `asset-production/rachelos-delivery-model/drafts/` into their content homes (strip DRAFT frontmatter, keep evidence citations as footnotes or a sources block). The executive FAQ renders as a section of the flagship page with FAQPage JSON-LD schema — not a separate route.
2. Create the selected-work page + insight article following existing patterns (extension, not new architecture).
3. Create the AI Delivery Assessment offer page from the recovery-assessment pattern; CTA wiring identical.
4. Add cross-links: existing flagship ⇄ new flagship; article → flagship; all CTAs → assessment.
5. Optional (separate commit): seed TIF — `scripts/tif/seed.mjs` pattern — with the 16 evidence records from `06_TIF_EVIDENCE_PACKAGE.yaml` as an `AssetOpportunity` + Evidence rows, source `rachel`, status per TIF conventions.

## Test Plan

- `npm run build` green; `npx vitest run` green (insights `[slug]` has an existing test — extend it for the new slug)
- Verify new routes render, appear in sitemap.ts output, and are absent from any noindex logic
- Verify no draft-status frontmatter leaks into rendered pages
- Grep rendered output for prohibited terms: "Traffic Cop", revenue figures, "replaced" + role counts

## Acceptance Criteria

- Flagship live at `/selected-work/rachelos-delivery-model` with claim-audit-compliant copy (spot-check against 07_CLAIM_AUDIT.md "Removed" list)
- Assessment page live and linked from all new assets
- Existing flagship unchanged except the cross-link
- ≤10 files modified; no new services; no schema changes

## Validation approach / rollback / regression risk

- Validation: build + tests + manual render check of 3 new routes
- Rollback: git revert (content-only change; no data)
- Regression risk: LOW — additive content following existing patterns; the only shared-file edits are index/sitemap registrations
