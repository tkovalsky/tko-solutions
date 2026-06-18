# TKO Design System Audit

**Date:** 2026-06-18
**Scope:** Full design-token audit of the marketing site implementation.
**Trigger:** Site was rendering with framework-default accent colors (cornflower/indigo
blue derived from Tailwind's default `blue-600`/`blue-400`), which signals "AI startup
landing page" rather than the approved positioning: *executive operating-system advisory*.

This audit is a **token-implementation** review, not a redesign. Content, layout, and
information architecture are unchanged. The companion spec is
[`DESIGN_TOKEN_SPEC.md`](./DESIGN_TOKEN_SPEC.md).

Legend:
- **Approved?** — does the value belong in the TKO system?
- **Framework default?** — is the value (or its origin) a generic Tailwind/SaaS default?
- **Action** — `KEEP`, `REPLACE` (done in this pass), or `ADD`.

---

## 1. Global Color Tokens

Source of truth: [`src/app/globals.css`](../src/app/globals.css) `:root`.

| Token | Before | Source | Approved? | Framework default? | Replacement / Action |
|---|---|---|---|---|---|
| `--primary` | `#2563eb` | globals.css | ❌ | ✅ Tailwind `blue-600` | `#1d4e89` Intelligence Blue — **REPLACE** |
| `--primary-dark` | `#1d4ed8` | globals.css | ❌ | ✅ Tailwind `blue-700` | `#163a66` — **REPLACE** |
| `--primary-light` | `#60a5fa` | globals.css | ❌ | ✅ Tailwind `blue-400` (cornflower/sky) | `#7da3c9` Steel Blue — **REPLACE** |
| `--foreground` | `#0a0e1a` | globals.css | ✅ Charcoal near-black | ❌ | **KEEP** |
| `--muted` | `#475569` | globals.css | ✅ Slate-600 | Slate scale, intentional | **KEEP** (raised from `#51596b` earlier) |
| `--border` | `#e2e5eb` | globals.css | ✅ Muted steel hairline | ❌ | **KEEP** |
| `--navy` | `#0f1729` | globals.css | ✅ Charcoal navy | ❌ | **KEEP** |
| `--midnight` | `#060a14` | globals.css | ✅ Near-black surface | ❌ | **KEEP** |
| `--surface` / `--slate-light` | `#f4f6fa` | globals.css | ✅ Cool slate surface | ❌ | **KEEP** |
| `--input-border` | `#94a3b8` | globals.css | ✅ Steel-400 | Slate scale, intentional | **KEEP** |
| `--surface-muted` | _(absent)_ | — | — | — | `#e9edf3` — **ADD** (layering token) |
| `--success` | _(absent)_ | — | — | — | `#15803d` — **ADD** |
| `--warning` | _(absent)_ | — | — | — | `#b45309` — **ADD** |
| `--primary-rgb` | _(absent)_ | — | — | — | `29 78 137` — **ADD** (channel form for glows/shadows) |
| `--accent-rgb` | _(absent)_ | — | — | — | `125 163 201` — **ADD** |

**Root cause of the "cornflower" signal:** `--primary` and `--primary-light` were set to
Tailwind's stock `blue-600`/`blue-400`. Because every accent in the system references these
two custom properties, a single wrong pair of values propagated the SaaS look everywhere.

---

## 2. Tailwind Theme Extensions

Source: [`src/app/globals.css`](../src/app/globals.css) `@theme inline` block.

| Mapping | Status | Notes |
|---|---|---|
| `--color-primary*` → `var(--primary*)` | KEEP | Correct indirection; only the underlying values were wrong. |
| `--color-navy`, `--color-midnight`, `--color-surface`, `--color-slate-light` | KEEP | Approved neutrals. |
| `--color-surface-muted`, `--color-success`, `--color-warning` | ADD | Mapped so `bg-success` / `bg-surface-muted` utilities exist for future use. |
| `--font-sans`, `--font-mono` | KEEP | Geist + Inter/IBM Plex fallback stack (see §5). |

No `tailwind.config` extension file exists — this is a **Tailwind v4 CSS-first** setup, so
all theming lives in `globals.css`. That is correct for v4; no migration needed.

---

## 3. CSS Custom Properties

All brand color decisions are centralized in `:root` (good). The only non-tokenized color
decisions were **hardcoded `rgba()` literals of the cornflower blue** embedded in component
class strings and one canvas constant (see §4). These were re-pointed at
`--primary-rgb` / `--accent-rgb` so they can never drift from the brand again.

---

## 4. Component-Level Hardcoded Colors

| Location | Before | Approved? | Default? | Action |
|---|---|---|---|---|
| [`network-visual.tsx:15`](../src/components/site/network-visual.tsx) | `PRIMARY = "37, 99, 235"` (cornflower nodes/links) | ❌ | ✅ | `"125, 163, 201"` steel + lower alpha — **REPLACE** |
| [`hero.tsx:31`](../src/components/site/hero.tsx) | `radial-gradient(... rgba(37,99,235,0.18) ...)` | ❌ | ✅ | `rgb(var(--accent-rgb)/0.16)` — **REPLACE** |
| [`cta-band.tsx:16`](../src/components/site/cta-band.tsx) | `radial-gradient(... rgba(37,99,235,0.16) ...)` | ❌ | ✅ | `rgb(var(--accent-rgb)/0.16)` — **REPLACE** |
| [`problem-grid.tsx:29`](../src/components/site/problem-grid.tsx) | `shadow-[... rgba(37,99,235,0.25)]` | ❌ | ✅ | `rgb(var(--primary-rgb)/0.20)` — **REPLACE** |
| [`card.tsx:8`](../src/components/ui/card.tsx) | `shadow-[... rgba(15,23,41,0.12)]` | ✅ neutral navy drop shadow | ❌ | **KEEP** |
| `industries/page.tsx` (prior) | `bg-[#111111] text-white` | ❌ caused invisible card | ❌ | Removed in prior pass |
| `contact/page.tsx` (prior) | `border-[#111111]` | ❌ off-system | ❌ | Replaced with token border in prior pass |

After this pass there are **no hardcoded brand-blue literals** left in components; every
accent resolves through a token.

---

## 5. Typography Tokens

| Role | Implementation | Source | Status |
|---|---|---|---|
| Font family | Geist Sans, Inter / IBM Plex Sans fallback | `globals.css` / `layout.tsx` | KEEP |
| Display (h1) | `text-4xl`→`text-7xl`, `font-bold`, `leading-[1.03–1.05]`, `tracking-tight` | `page-hero.tsx`, `hero.tsx` | KEEP — formalized in spec |
| Heading (h2/h3) | `text-3xl`→`text-5xl` / `text-lg`–`text-2xl`, `font-semibold` | `section.tsx`, cards | KEEP |
| Body | `text-base`/`text-lg`, `leading-7`/`leading-8`, `text-muted` | shared | KEEP |
| Eyebrow / label | `text-sm` (14px) semibold uppercase `tracking-[0.1em]` `text-primary` | shared | KEEP (raised from 12px earlier) |
| Small / meta | `text-sm`, `text-muted` | cards, footer | KEEP |

Typography was **not** a framework-default problem; values are intentional. The spec
documents them so they stop being re-derived per component.

---

## 6. Spacing Scale

| Usage | Implementation | Status |
|---|---|---|
| Section rhythm | `py-20 md:py-28` (`Section`) | KEEP — canonical section spacing |
| Compact section | `py-12 md:py-16` (contact intake) | KEEP — documented variant |
| Container | `max-w-7xl px-6 lg:px-8` | KEEP — canonical gutter |
| Card padding | `p-6 md:p-8` | KEEP |
| Grid gaps | `gap-3 / gap-4 / gap-6 / gap-12` | KEEP — standard Tailwind 4px scale |

Spacing uses the default Tailwind 4px scale, which is appropriate and **not** a branding
issue. Canonicalized in the spec.

---

## 7. Border / Radius Tokens

| Token | Implementation | Source | Status |
|---|---|---|---|
| Hairline border | `--border: #e2e5eb` | globals.css | KEEP |
| Control border | `--input-border: #94a3b8`, hover `#64748b` | globals.css | KEEP |
| Radius — cards/controls | `rounded-xl` (0.75rem), `rounded-md` (0.375rem), `rounded-lg` (0.5rem), `rounded-full` | components | KEEP — codified as radius scale in spec |

Note: radius was **not** previously tokenized as named steps; the spec defines a named
radius scale that maps onto the existing Tailwind values (no visual change).

---

## 8. Shadow Tokens

| Usage | Before | Status |
|---|---|---|
| Card hover | `shadow-[0_16px_40px_-16px_rgba(15,23,41,0.12)]` | KEEP (neutral navy) |
| Problem card hover | `shadow-[0_12px_30px_-12px_rgba(37,99,235,0.25)]` | REPLACE → `rgb(var(--primary-rgb)/0.20)` |
| Buttons / inputs | none (flat) + focus ring `ring-primary/30` | KEEP |

Shadows are intentionally restrained (long, soft, low-opacity). The only off-system shadow
was the cornflower-tinted problem-card hover, now re-pointed at the brand token.

---

## Summary of Changes Applied

1. Re-pointed the three `--primary*` tokens from Tailwind stock blue to the **Intelligence
   Blue / Steel Blue** brand pair.
2. Added `--surface-muted`, `--success`, `--warning`, `--primary-rgb`, `--accent-rgb`
   tokens and exposed the first three as utilities.
3. Replaced all four hardcoded cornflower `rgba()` literals (canvas, two glows, one shadow)
   with token-referencing `rgb(var(--…)/α)`.
4. Dialed back the hero network graphic (steel color, lower alpha) for restraint.

**Net effect:** zero layout/content/IA change; the accent system now reads as a deep,
restrained, executive intelligence blue instead of a default SaaS cornflower.
