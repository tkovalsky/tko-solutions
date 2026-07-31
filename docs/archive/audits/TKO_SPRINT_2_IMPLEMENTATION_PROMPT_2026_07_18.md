# TKO POSITIONING SPRINT 2 — REMAINING BACKLOG IMPLEMENTATION PROMPT

Paste this into a fresh implementation session. It is self-contained.

You are acting as:
- B2B Positioning Strategist
- Enterprise Consulting Growth Advisor
- Conversion Optimization Lead
- Front-end Implementer (Next.js / TypeScript / Tailwind)

This is implementation only. The P0/P1 positioning sprint is already shipped. This sprint closes the remaining backlog and gaps from the 2026-07-18 audit.

---

## CONTEXT (already true on the site — do not redo)

Primary narrative, live and consistent: "An independent transformation and program recovery advisor for healthcare and regulated operations who identifies where initiatives are actually failing and provides evidence-backed recommendations." Healthcare-first, not healthcare-only (capital markets, asset management, wealth platforms, enterprise transformation, product leadership are preserved as breadth).

Already done: homepage proof hierarchy re-sequenced (enterprise track record leads, RachelOS reframed as method/evidence proof), one narrative across all metadata, CTA standardized to "Request a Program Assessment", senior-led clarity, three enterprise case studies rewritten, healthcare disclaimer rebalanced, RachelOS delivery-model executive summary added, Services/Offers differentiated and cross-linked, zero buyer-facing em dashes.

## GLOBAL GUARDRAILS (hard constraints)

- Do NOT create a new company, services, offerings, or funnels.
- Do NOT redesign the site or introduce a new design system.
- Do NOT introduce any claim that cannot be substantiated. No invented metrics, logos, names, or testimonials.
- Do NOT weaken the evidence standards or the claim-boundary language.
- Preserve the RachelOS evidence discipline and all "no revenue attribution" language.
- Copy, sequencing, light components, and one new content page only.
- Zero em dashes in any rendered buyer-facing copy (maintain the standard).

---

## WORK ITEMS

### ITEM 1 (P0-carryover) — Wire in a named external proof point
**Objective:** Add the one thing the site still lacks: a verifiable third-party signal. This is the highest-trust addition.
**Precondition:** Todd supplies the material. Do NOT proceed on this item without at least one of: (a) a client or employer logo he can legitimately display, (b) a named reference willing to be listed, or (c) one quantified, attributable outcome. If none is supplied, skip Item 1 and note it as still-open.
**Scope:** A tasteful, honest credibility element. Options in priority order: a recognizable-employer logo strip (Apollo, Sapient/GSAM/JPMAM, FolioDynamix, ELLKAY, Cognizant are verifiable employment facts, not client endorsements), a single named testimonial block, or an attributable outcome stat on the relevant case study.
**Files to modify:** `src/components/site/credibility-strip.tsx` (or a new `logo-strip.tsx`), `public/logos/*` (assets), `src/lib/content.ts` (case-study reference field if a named reference is provided), `src/app/page.tsx` (placement).
**Files to avoid:** RachelOS evidence claims in `lib/content.ts` (`deliveryModel*`), `app/proof/*` boundary language.
**Implementation steps:** Confirm which signal type is supplied. If logos: add optimized SVG/PNG assets, render a monochrome logo strip under the homepage credibility band with an "employment history, verifiable on LinkedIn" caption (accurate framing, not client endorsement). If testimonial/outcome: add a single bordered block with attribution and, where relevant, "reference available under NDA."
**Test plan:** `npx eslint`, `npx tsc --noEmit`, visual check that framing is accurate (employment vs endorsement).
**Acceptance criteria:** At least one verifiable third-party signal is visible above the fold or on the founder/proof path, with framing that does not overstate the relationship.

### ITEM 2 (P1.5) — Navigation relabels
**Objective:** Make labels read for an enterprise buyer.
**Scope:** Label text only. Keep all hrefs unchanged to avoid route/SEO changes.
**Files to modify:** `src/components/site/header.tsx` (`navItems`), `src/components/site/footer.tsx` (`footerLinks`), verify `src/components/site/mobile-nav.tsx` inherits from header.
**Implementation steps:** Change "Founder" → "About" (href stays `/founder`); change "Guides" → "Insights" (href stays `/insights`). Do not rename routes or files.
**Files to avoid:** `src/app/founder/*`, `src/app/insights/*` route files.
**Test plan:** `npx eslint`; click every nav/footer link renders.
**Acceptance criteria:** Header and footer show "About" and "Insights"; all links resolve; no 404s; sitemap unchanged.

### ITEM 3 (P2.3) — Replace the `/industries` redirect with a real page
**Objective:** Reinforce "healthcare-first, not healthcare-only" and remove the redirect expectation mismatch.
**Scope:** One light content page built from the existing `industries` array. No new offerings.
**Files to modify:** `src/app/industries/page.tsx` (currently a `permanentRedirect`), reuse `industries` from `src/lib/content.ts`; add to `src/app/sitemap.ts` if applicable.
**Implementation steps:** Build a PageHero + a grid of the four industries (Healthcare, Financial Services, Technology, Private Equity) already in `lib/content.ts`, each tying back to the program-recovery method, with healthcare framed as the sharpest vertical. Reuse existing `Section`, `Card`, `PageHero`, `CtaBand`. Add canonical metadata. Optionally add "Industries" to nav (decide: keep nav lean or add).
**Files to avoid:** Do not create new industry service lines or pricing.
**Test plan:** `npx tsc --noEmit`, `npx eslint`, page renders, canonical + JSON-LD present, zero em dashes.
**Acceptance criteria:** `/industries` renders a real page (no redirect), reinforces multi-vertical breadth, matches existing visual system.

### ITEM 4 (P2.4) — Reconsider enterprise pricing presentation
**Objective:** Keep pricing's qualification value while removing the "too small for our program" signal at the enterprise tiers.
**Scope:** Presentation of the Build and Fractional tiers only. Keep Assessment and Diagnostic bands as-is (they qualify well).
**Files to modify:** `src/lib/content.ts` (`services` price fields for `operating-system-build` and `fractional-advisor`), `src/components/site/service-template.tsx`, `src/components/site/engagement-path.tsx`.
**Implementation steps:** Present the two downstream tiers as "Scoped after assessment" (or keep a range but add "engagement scoped to program size"), so enterprise buyers do not read a fixed five-figure ceiling as "boutique." This is a reversible copy change; keep the numeric bands available on the detail pages.
**Files to avoid:** Do not remove pricing entirely; do not change Assessment/Diagnostic bands.
**Test plan:** `npx tsc --noEmit`, `npx eslint`, verify engagement-path and service-template render the new presentation.
**Acceptance criteria:** Build and Fractional no longer present a fixed low ceiling as the headline; Assessment/Diagnostic unchanged.

### ITEM 5 (P1.2-carryover) — Extend case-study story treatment to the remaining studies
**Objective:** Apply the stakes / scope / decision-enabled, active-voice treatment to the studies not covered in sprint 1.
**Scope:** `from-crm-to-operating-system`, `cre-intelligence-model` (the `rachelos-delivery-model` already has the executive summary; leave its audited body intact).
**Files to modify:** `src/lib/content.ts` (`caseStudies` `outcome`/`situation` fields for those two slugs).
**Implementation steps:** Rewrite `outcome` to lead with the decision enabled and the stakes, in active voice, preserving all existing evidence boundaries and the "no revenue attribution / method portability" language. Add "Reference available under NDA" ONLY where genuinely supportable (confirm with Todd).
**Files to avoid:** `deliveryModelNarrative`, `deliveryModelSnapshot`, `deliveryModelFaq` (audited, leave verbatim).
**Test plan:** `npx tsc --noEmit`, `npx eslint`, `npm test` (case-study pages), zero em dashes.
**Acceptance criteria:** Both studies read as decisions and outcomes rather than capability lists; no new unsupported claims.

### ITEM 6 (Risk mitigation) — Keep the product-leadership / AI thread discoverable
**Objective:** Ensure product-leadership buyers still find the RachelOS/AI thread after the transformation-forward reframe.
**Scope:** Light linking only.
**Files to modify:** `src/components/site/footer.tsx` (confirm RachelOS/proof links present), optionally `src/app/services/page.tsx` (one line linking to "Operating System Build & AI governance").
**Implementation steps:** Verify the RachelOS and "Operating System Build" paths are reachable within one click from services and footer. Add a single link if missing. Do not re-elevate RachelOS to the hero.
**Test plan:** Click-path check from `/services` and footer to RachelOS proof.
**Acceptance criteria:** A product/AI-oriented buyer can reach the RachelOS build-and-governance thread in one click; hero still leads with transformation.

---

## SPRINT TEST PLAN (run all before deploy)

1. `npx tsc --noEmit` — expect exactly 1 pre-existing error (`lib/leads/persist.test.ts` Prisma mock); zero new errors.
2. `npx eslint` — exit 0.
3. `npm test` — expect the one pre-existing failure only (`app/insights/[slug]/page.test.tsx`); no new failures. If touching that area, fix the stale test.
4. `npm run build` locally (Vercel/host has network for Prisma engine + Google Fonts) — must complete.
5. `grep -r "—" src/app src/components src/lib --include=*.tsx --include=*.ts | grep -v /tif` — expect zero buyer-facing em dashes.

## DEPLOY

1. `rm -f .git/index.lock` if a stale lock exists.
2. `git add src public docs/audits && git commit -m "feat: positioning sprint 2 (external proof, nav, industries, pricing, case studies)"`
3. `git push origin main` (triggers Vercel production deploy), or `vercel --prod`.

## ACCEPTANCE (sprint-level)

- One verifiable external signal live (or Item 1 explicitly deferred with reason).
- Nav reads "About" / "Insights"; `/industries` is a real page.
- Enterprise pricing no longer caps perceived scale; Assessment/Diagnostic unchanged.
- Remaining case studies read as decisions/outcomes.
- Product/AI thread reachable in one click.
- All guardrails honored; zero new build/lint/type/test regressions; zero buyer-facing em dashes.
