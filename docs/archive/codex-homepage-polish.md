# Codex Task: Homepage Polish Pass (TKO)

> **Sequence:** Run [`codex-hero-task.md`](./codex-hero-task.md) **first**. This polish pass runs **after** the hero task lands.
> Self-contained — no other context required.

## Context
Repo: `tko-site` (Next.js 15 App Router, Tailwind v4, framer-motion, lucide-react). This task resolves credibility (P0) and consistency (P1/P2) issues on the homepage (`src/app/page.tsx`) and its components — through small, reversible UI edits.

**Constraints (hard):**
- No redesign, no architecture change, no copy-strategy change.
- Do NOT edit `src/lib/content.ts` (data/copy), `src/lib/tif/**`, `src/lib/db/**`, `prisma/**`.
- Do NOT restructure the hero — that is handled by the separate hero task.
- Within guardrails: ≤10 files modified, 1 new file, 0 new dirs, 0 services, 0 migrations.

## Files To Modify
1. `src/components/site/header.tsx` — P0-1
2. `src/app/page.tsx` — P0-2, P1-2, P1-3, P2-3, P2-4
3. `src/components/ui/card.tsx` — P2-1
4. `src/components/site/problem-grid.tsx` — P2-1, P2-2
5. `src/components/site/operating-framework.tsx` — P2-2
6. `src/components/site/cards.tsx` — P1-1 (adopt `ArrowLink`)
7. `src/app/globals.css` — P2-1 (add `--shadow-card` token)

## Files To Create
1. `src/components/ui/arrow-link.tsx` — P1-1 shared tertiary link

## Files To Avoid
- `src/lib/content.ts`, `src/lib/tif/**`, `src/lib/db/**`, `prisma/**`
- `src/components/site/hero.tsx` and `network-visual.tsx` (owned by the hero task)

---

## Implementation Steps

### Step 1 — P0-1 · Header CTA wraps to two lines of tiny text
`src/components/site/header.tsx:30` currently forces the long label into a cramped 2-line button:
`min-h-10 max-w-56 whitespace-normal px-4 text-center text-xs leading-tight`.
- Change the header label to a concise single-line string (`Book Assessment`). This is nav microcopy, not page copy strategy.
- Remove `max-w-56 whitespace-normal text-center text-xs leading-tight`; use the default button sizing (`text-sm`, base `min-h-11`). Keep `px-4`.

### Step 2 — P0-2 · Unify the two "proof" containers
Adjacent proof blocks use different containers. Proof Ladder /2 (RachelOS, `src/app/page.tsx:115`) is a raw square `<div className="border border-border bg-white p-7">`; Proof Ladder /3 (CRE, `page.tsx:150`) uses `<Card>`.
- Replace the RachelOS raw `<div>` wrapper with `<Card>` (already imported). Keep inner content identical.

### Step 3 — P1-1 · Extract one tertiary "arrow link" with hover/focus affordance
Create `src/components/ui/arrow-link.tsx`:
```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
```
Replace the uppercase inline arrow links (which currently have **no hover state**) with `<ArrowLink>`:
- `src/app/page.tsx` ~lines 96, 132, 161 ("View selected work", "See how RachelOS works", "View CRE proof")
- `src/components/site/cards.tsx` ~lines 26, 55 ("View service", "View selected work")
Leave the sentence-case "Start with the Prior Authorization assessment" link (`page.tsx:69`) as-is (intentional different style).

### Step 4 — P1-2 · Primary-market list looks half-disabled
`src/app/page.tsx:54-67`: the first item (`Prior Authorization`) is a bold `text-foreground` link while the four siblings are plain muted text — reads as "one active, four disabled."
- Make the list uniform. Smallest fix: drop `font-medium text-foreground` from the link so it matches the muted siblings' weight/color, keeping only `hover:text-primary hover:underline` as the affordance.

### Step 5 — P1-3 · Homepage proof cards hide existing outcome data
`src/app/page.tsx:90-104` renders only `proofLevel`, `title`, `problem` for healthcare cards, omitting `study.outcome` (which already exists in the data and is shown by `CaseStudyCards` in `cards.tsx:51-54`).
- Add the outcome line above the `ArrowLink`, mirroring the existing pattern:
```tsx
<p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
  <span className="font-semibold text-primary">Outcome — </span>
  {study.outcome}
</p>
```

### Step 6 — P2-1 · Tokenize + unify card hover shadow
`card.tsx:8` uses a hardcoded navy `rgba(15,23,41,0.12)`; `problem-grid.tsx:29` uses brand blue `rgb(var(--primary-rgb)/0.20)` — two different hover glows.
- Add to `:root` in `globals.css`: `--shadow-card: 0 16px 40px -16px rgb(var(--primary-rgb)/0.16);`
- `card.tsx:8`: replace the hardcoded shadow with `hover:shadow-[var(--shadow-card)]`.
- `problem-grid.tsx:29`: align its hover shadow to the same token.

### Step 7 — P2-2 · Standardize icon chips
`problem-grid.tsx:31` = `size-10 ... bg-primary/10`; `operating-framework.tsx:25` = `size-9 ... bg-primary/15`.
- Set both to `size-10` and `bg-primary/10`. Operating-framework keeps its `text-primary-light` foreground (dark section).

### Step 8 — P2-3 · Eyebrow consistency in Proof Ladder /4
`src/app/page.tsx:174` hand-rolls the eyebrow as `text-xs ... tracking-[0.14em]`, diverging from `SectionHeader` (`text-sm ... tracking-[0.1em]`, see `section.tsx:34`).
- Change the Proof Ladder /4 eyebrow to `text-sm ... tracking-[0.1em]` to match.

### Step 9 — P2-4 · Constrain single-card columns
Proof Ladder /2 and /3 (`page.tsx:109`, `:144`) use `lg:grid-cols-[0.8fr_1.2fr]` with a single card in the 1.2fr cell, stretching it very wide/short.
- Add `max-w-xl` to the lone card/block so proof rungs share a consistent card width.

---

## Open Decisions (confirm before coding)
1. **P1-4 CTA routing:** "Assessment" CTAs currently route to three destinations — header/hero → `/contact`, page link → `/services/prior-authorization-assessment`, service card → `/services/recovery-assessment`. Confirm one canonical destination for Recovery Assessment intent, then align `href`s. If intentional, skip.
2. **Header label (Step 1):** Approve `Book Assessment` (or preferred concise label).
3. **P1-5 founder credibility (optional, not included above):** Surface the existing `src/components/site/founder.tsx` on the homepage. Deferred — it adds a section rather than adjusting one. Include only if approved.

## Test Plan
1. `npm run dev`; verify the homepage at 375 / 768 / 1280 / 1536px.
2. Header CTA is single-line at all breakpoints; matches nav scale.
3. RachelOS and CRE proof blocks are visually identical containers (radius, padding, hover).
4. All tertiary arrow links show arrow nudge + color shift on hover and a visible `:focus-visible` ring (keyboard tab through).
5. Primary-market list reads as a uniform list (no false disabled/active look).
6. Each homepage healthcare card shows an `Outcome —` line.
7. Card and ProblemGrid hover shadows match; icon chips match size/tint; Proof Ladder /4 eyebrow matches; single cards no longer stretch.
8. Reduced-motion respected for arrow transform (global rule in `globals.css`).
9. `npm run lint` clean; no TypeScript errors (confirm `outcome` field present on filtered studies).

## Acceptance Criteria
- No structural/layout changes beyond `max-w-xl` and the shadow/icon/eyebrow tokens.
- No edits to `content.ts`, TIF, RachelOS, DB, or the hero/network visual.
- All tertiary links share one component with hover + focus affordance.
- Adjacent proof rungs are visually consistent; homepage proof cards display outcomes.
- Lint + typecheck pass; visual check passes at four breakpoints.
