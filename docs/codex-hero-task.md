# Codex Task: Hero Background Integration (TKO Homepage)

> Standalone task. Hand this to Codex **first**, before the broader homepage polish plan.
> Self-contained — no other context required.

## Context
Repo: `tko-site` (Next.js 15 App Router, Tailwind v4, framer-motion, lucide-react). The homepage hero renders an animated network canvas, but it's currently wrapped in a bordered, rounded, fixed-height card pinned to the right grid column — so it reads as a placeholder SaaS illustration sitting *next to* the hero instead of being part of the hero's background.

**Constraints (hard):**
- Do NOT change any copy, headline, or messaging.
- Do NOT redesign the page or touch other pages/components.
- Do NOT change the canvas animation/node logic in `network-visual.tsx`.
- This is a small, single-file UI change (plus optional opacity tuning).

## Current State
`src/components/site/hero.tsx:88-99` — the visual is boxed:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
  className="relative hidden h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:block"
>
  <NetworkVisual className="absolute inset-0" />
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
</motion.div>
```
The section (`hero.tsx:28-33`) also has a top-right radial glow and a `lg:grid-cols-[1.05fr_0.95fr]` two-column layout (text left, this card right). `NetworkVisual` already fills its container (`100%` w/h), is `aria-hidden`, respects `prefers-reduced-motion`, and pauses offscreen via IntersectionObserver.

## Target State
The network renders as a **full-bleed ambient background** behind the entire hero — no border, no rounded box, no fixed-height panel — legible at all breakpoints, with the primary CTA lifted off the now-textured background.

## Implementation Steps

1. **Promote the canvas to a full-section background layer.** Remove the `rounded-2xl border border-white/10 bg-white/[0.02] h-[460px] hidden lg:block` wrapper. Render `NetworkVisual` as an absolutely-positioned, full-section layer behind content:
   ```tsx
   <section className="relative isolate overflow-hidden bg-midnight text-white">
     <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
       <NetworkVisual className="absolute inset-0 h-full w-full" />
     </div>
     <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_60%)]" />
   ```

2. **Add a legibility scrim** above the canvas, below content, anchored left so text stays readable while the network shows through on the right:
   ```tsx
   <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/30" />
   ```
   Tune the `via`/`to` stops until the hero paragraph passes WCAG AA over the busiest part of the canvas.

3. **Put content above the background and make it breakpoint-independent.** The content wrapper becomes `relative z-10`. The canvas is now a section background, so it appears at all breakpoints — the old `hidden lg:block` gating is gone. The right grid column becomes empty space the background fills (keep the existing grid; do not relocate text).

4. **Lift the primary CTA** (`hero.tsx:52`) without changing color tokens:
   ```tsx
   className="shadow-[0_10px_30px_-10px_rgb(var(--primary-rgb)/0.6)]"
   ```
   Keep the secondary outline button subordinate.

5. **Normalize left-column vertical rhythm.** Replace the irregular `mt-7 / mt-9 / mt-8 / mt-12` chain with a consistent scale (e.g. paragraph `mt-6`, CTAs `mt-8`, checklist `mt-8`, pillars `mt-12`) and add a hairline `border-t border-white/10 pt-8` above the pillar grid to separate the two trust rows. No content removed.

6. **Mobile fallback (only if QA flags noise):** use `opacity-40 sm:opacity-60` on the canvas layer instead of re-hiding it.

## Files
- **Modify:** `src/components/site/hero.tsx`
- **Avoid:** `src/components/site/network-visual.tsx` (no logic changes), `src/app/page.tsx`, `globals.css`, all other components/pages.

## Test Plan
1. `npm run dev`; inspect hero at 375 / 768 / 1024 / 1280 / 1536px.
2. No visible border/box around the network; it bleeds to section edges and behind the text.
3. Network is present (subtly) on mobile and tablet, not just `lg+`.
4. Eyebrow, H1, and paragraph pass WCAG AA over the scrim.
5. Primary CTA visibly lifts; secondary remains subordinate.
6. `prefers-reduced-motion` still freezes the canvas; offscreen pause still works.
7. Background is `pointer-events-none`; all content is interactive.
8. `npm run lint` clean.

## Acceptance Criteria
- Network renders as a full-section ambient background with no card chrome (no border, no rounded box, no fixed height).
- Hero text legible (AA) at all breakpoints.
- Visual present at mobile/tablet, not desktop-only.
- Primary CTA reads as the dominant action.
- Zero copy/messaging changes; only `hero.tsx` modified.
- Reduced-motion and offscreen-pause behavior preserved.
