# CTA & Conversion Audit and Standardization

**Workstream:** P0 — CTA & Conversion (roadmap item #3)
**Date:** 2026-07-13
**Status:** Complete — validated locally, no regressions.

## Objective

Make every public call-to-action consistent, truthful, and conversion-focused, so the public site reads as one coherent executive experience with a single conversion journey: **Problem → Evidence → Conversation**.

## Canonical CTA System

| Role | Approved wording | Destination |
|---|---|---|
| Primary (initiate a commercial conversation) | **Discuss an Active Initiative** | `/contact` |
| Secondary (direct to evidence) | **Review Selected Work** | `/selected-work` |
| Contact form submit | **Request a Conversation** | server action → `/contact?status=submitted` |

**Truthfulness rule applied:** no CTA promises an interaction that does not immediately occur. All `Book…` / `Schedule…` wording was removed because no calendar or scheduling system exists — the site accurately says *discuss* and *request*.

**Navigational links** that describe a destination (e.g. "Inspect RachelOS", "Back to proof registry", "Review the RachelOS evidence") were left descriptive and truthful; they are not conversion CTAs and are not forced into canonical wording. None use banned verbs.

Banned verbs eliminated: `Book`, `Schedule`, `Get Started`, `Start Here`, `Begin`, `Contact Us`, `Let's Talk`, `Book a Call`, and soft variants ("Start with an assessment", "Start the AI Delivery Assessment").

## Highest-leverage change: shared components

Rather than editing dozens of pages independently, the four shared CTA sources were standardized so every consumer inherits the correct default (Refactoring Rule):

| Component | Before (default) | After (default) |
|---|---|---|
| `src/lib/site.ts` `site.cta` | "Book an executive strategy session" | "Discuss an Active Initiative" |
| `src/components/site/page-hero.tsx` | "Book an operating performance conversation" | "Discuss an Active Initiative" |
| `src/components/site/cta-band.tsx` | "Book an operating performance conversation" | "Discuss an Active Initiative" |
| `src/components/site/service-template.tsx` | "Book an operating performance conversation" | "Discuss an Active Initiative" |

## CTA Inventory & Dispositions

| Location | Before → After (text) | Destination before → after | Notes |
|---|---|---|---|
| Header desktop CTA | Book an executive strategy session → **Discuss an Active Initiative** | `/services` → `/contact` | Now truthful conversion endpoint |
| Header mobile | horizontal-scroll link strip → **hamburger menu** with CTA | `/services` → `/contact` | See Responsive/A11y below |
| Homepage hero | Book… → **Discuss an Active Initiative** (+ new secondary **Review Selected Work**) | `/services/recovery` → `/contact`; secondary → `/selected-work` | Completes Problem→Evidence→Conversation |
| Homepage CtaBand | site.cta → **Discuss an Active Initiative** (+ secondary **Review Selected Work**) | `/contact`; `/selected-work` | |
| Contact form submit | Schedule an Operational Recovery Assessment → **Request a Conversation** | server action | |
| Contact confirmation | generic → response-time + Todd-reviews + next-step copy | — | See Contact Experience |
| Contact `<title>` / OG | "Book an Operating Performance Conversation" → **"Request a Conversation"** | — | Removed legacy verb from metadata |
| `PageHero` default (services, offers hub, founder, proof, etc.) | Book… → **Discuss an Active Initiative** | `/contact` | Inherited |
| `CtaBand` default (about, selected-work list, services hub, etc.) | Book… → **Discuss an Active Initiative** | `/contact` | Inherited |
| `ServiceTemplate` (diagnostic/build/fractional service pages) | Book… → **Discuss an Active Initiative** | `/contact` | Inherited |
| Insights article hero | Schedule an Operational Recovery Assessment → **Discuss an Active Initiative**; "View all insights" → **Review Selected Work** | `/contact`; `/insights` → `/selected-work` | Lower-friction journey |
| Insights article CtaBand | "Operational Recovery Assessment" override removed → default + **Review Selected Work** secondary | `/contact`; `/selected-work` | |
| Selected Work detail hero | conditional Schedule/Start labels → **Discuss an Active Initiative**; secondary Schedule Diagnostic → **Review Selected Work** | `/services/enterprise-ai`|`/services/diagnostic` → `/contact`; `/selected-work` | No longer routes into duplicate assessment pages |
| Selected Work detail inline (rachelos) | "Start the AI Delivery Assessment" → **Discuss an Active Initiative** | `/services/enterprise-ai` → `/contact` | |
| Healthcare hero | "Explore the PA assessment" / "Explore recovery assessment" → **Discuss an Active Initiative** + **Review Selected Work** | service pages → `/contact`; `/selected-work` | PA/recovery/AI service links retained in page body grid |
| Healthcare CtaBand | Schedule an assessment → **Discuss an Active Initiative**; "Inspect the evidence standard" → **Review Selected Work** | `/contact`; `/proof` → `/selected-work` | |
| Problems hero | Book… → **Discuss an Active Initiative**; "See the built proof" → **Review Selected Work** | `/services/recovery` → `/contact`; `/proof` → `/selected-work` | |
| Founder hero | secondary "Start with an assessment" → **Discuss an Active Initiative** (primary "Inspect RachelOS" retained) | `/services/recovery` → `/contact` | |
| Proof hub hero | secondary "Start with the assessment" → **Discuss an Active Initiative** | `/services/recovery` → `/contact` | |
| Proof/RachelOS hero | "Start with the assessment" → **Discuss an Active Initiative** | `/services/enterprise-ai` → `/contact` | |
| Recovery Assessment (2 inline CTAs + CtaBand) | Book… → **Discuss an Active Initiative**; CtaBand secondary added **Review Selected Work** | `/contact`; `/selected-work` | |
| Prior Authorization Assessment (hero + CtaBand) | Schedule a PA Assessment → **Discuss an Active Initiative**; "See the Operational Recovery Assessment" → **Review Selected Work** | `/contact`; `/services/recovery-assessment` → `/selected-work` | Avoids linking competing offers |
| About page inline CTA | "Book an operating conversation" → **Discuss an Active Initiative** | `/contact` | |
| `authority-page.tsx` (redirect-intercepted /offers/[slug]) | "Discuss this assessment" → **Discuss an Active Initiative**; CtaBand "Schedule…" → "Request a conversation…" | — | Page unreachable (308); cleaned pre-removal |
| `/offers`, `/assessment`, `/assessment/ai-delivery` (redirect-intercepted) | Book… / "Discuss an assessment" → **Discuss an Active Initiative** | — | Unreachable (308); cleaned pre-removal |

## Pages Modified

- Components: `header.tsx`, **`mobile-nav.tsx` (new)**, `hero.tsx`, `page-hero.tsx`, `cta-band.tsx`, `service-template.tsx`, `diagnostic-form.tsx`, `authority-page.tsx`
- Lib: `site.ts`
- Pages: `page.tsx` (home), `contact/page.tsx`, `insights/[slug]/page.tsx`, `selected-work/[slug]/page.tsx`, `healthcare/page.tsx`, `problems/page.tsx`, `founder/page.tsx`, `proof/page.tsx`, `proof/rachelos/page.tsx`, `services/recovery-assessment/page.tsx`, `services/prior-authorization-assessment/page.tsx`, `about/page.tsx`, and redirect-intercepted `offers/*`, `assessment/*`

## Navigation & Mobile

- **Desktop:** Header CTA now reads "Discuss an Active Initiative" — shorter than the previous string, so it no longer clips at the 1280px viewport that the original audit flagged. `whitespace-nowrap` retained; spacing balanced.
- **Mobile:** The horizontal-scrolling `overflow-x-auto` link strip was **removed** and replaced with a conventional accessible disclosure menu (`mobile-nav.tsx`):
  - Hamburger toggle (44px hit target) with `aria-label`, `aria-expanded`, `aria-controls`.
  - Panel closes on route change and on `Escape`; body scroll locks while open.
  - Full-width primary CTA inside the panel.
  - No horizontal scrolling; no clipped or wrapped controls.

## Contact Experience

Confirmation copy now states all three required facts:
> "Todd personally reviews every submission and will respond within two business days. If there is a mutual fit, the next step is a 30-minute working conversation—no automated sales sequence is triggered."

## Accessibility Findings

- Focus-visible outlines added to header nav links and the mobile toggle/links (`focus-visible:outline` utilities).
- Mobile toggle exposes state via `aria-expanded`/`aria-controls`; icon-only button has an `aria-label` that reflects open/closed state.
- All CTAs are real `<a>`/`<button>` elements (keyboard-operable by default); the existing `LinkButton`/`Button` primitives enforce `min-h-11` (≥44px) touch targets.
- Decorative arrow icons carry `aria-hidden="true"`.

## Responsive Fixes

- Mobile navigation converted from horizontal scroll to disclosure menu (primary fix).
- Homepage hero CTAs stack on mobile (`flex-col`) and align on `sm:` and up.
- Verified: no clipped buttons, no wrapped CTA text, no overlapping controls, no page-level horizontal scroll.

## Validation

- `npm run build` → ✓ Compiled successfully; 63/63 static pages generated.
- `npm run lint` → clean.
- `npx tsc --noEmit` → only a pre-existing, unrelated error in `src/lib/leads/persist.test.ts` (Prisma mock typing); all modified files typecheck clean.
- Live smoke test: all 12 key public routes return 200; header/hero CTA → `/contact`; contact submit renders "Request a Conversation"; homepage contains no `/offers` or `/assessment` hrefs; mobile menu toggle renders; horizontal-scroll strip gone.

## Outstanding Recommendations (backlogged)

- **CTA analytics instrumentation** — click events by source page and CTA role. Belongs to the Analytics workstream (roadmap #9); tracked in `docs/BACKLOG.md`.
- **Sticky mobile CTA** on long content pages — P2 conversion polish; backlogged.
- The redirect-intercepted `/offers/*` and `/assessment/*` page files remain in the tree (unreachable). Their deletion belongs to the Information Architecture workstream (IA Phase B).
