# TKO Design Token Specification

**Status:** Approved baseline — Operational Intelligence visual system.
**Source of truth:** [`src/app/globals.css`](../src/app/globals.css) (`:root` + `@theme inline`).
**Companion audit:** [`DESIGN_SYSTEM_AUDIT.md`](./DESIGN_SYSTEM_AUDIT.md).

Design intent: **executive operating-system advisory**, not AI-startup landing page.
The palette is built from charcoal, navy, slate, and muted steel, with a single deep
**Intelligence Blue** accent used sparingly. Color is earned, not decorative.

> Implementation rule: **never** use a raw hex or a Tailwind stock color (`blue-600`,
> `indigo-500`, etc.) in a component. Reference a token (`bg-primary`, `text-muted`,
> `rgb(var(--primary-rgb)/α)`). All brand decisions live in `globals.css`.

---

## Brand Colors

| Role | Token | Value | On white (contrast) | Usage |
|---|---|---|---|---|
| **Primary** | `--primary` | `#1d4e89` Intelligence Blue | 8.4:1 ✅ AAA | CTA fill, links, eyebrows, key highlights, focus ring |
| Primary (hover) | `--primary-dark` | `#163a66` | 11.5:1 ✅ | Button hover / pressed |
| **Accent** | `--primary-light` | `#7da3c9` Steel Blue | — (for dark bg) | Accent on dark surfaces: dark-section eyebrows, hero highlight word, icons, network graphic |
| **Secondary** | `--navy` | `#0f1729` Charcoal Navy | — | Dark section backgrounds, secondary brand surface |
| Secondary (deep) | `--midnight` | `#060a14` | — | Hero / CTA band / footer backgrounds |
| **Surface** | `--surface` | `#f4f6fa` | — | Alternating light section background, cards-on-tint |
| **Muted Surface** | `--surface-muted` | `#e9edf3` | — | Layered panels, status callouts, secondary fills |
| **Border** | `--border` | `#e2e5eb` | — | Hairline dividers, card borders |
| Border (control) | `--input-border` / `--input-border-hover` | `#94a3b8` / `#64748b` | — | Form control border, inactive → hover |
| **Foreground** | `--foreground` | `#0a0e1a` Charcoal | 18.7:1 ✅ | Primary text |
| **Muted** | `--muted` | `#475569` Slate-600 | 8.0:1 ✅ | Body copy, captions, meta |
| **Success** | `--success` | `#15803d` | 4.6:1 ✅ | Positive status (sparingly) |
| **Warning** | `--warning` | `#b45309` | 4.9:1 ✅ | Caution status (sparingly) |

Channel-form tokens for glows/shadows (so effects track the brand):
`--primary-rgb: 29 78 137`, `--accent-rgb: 125 163 201`.
Use as `rgb(var(--primary-rgb) / 0.20)`.

**Accent restraint policy:** on any given light view, Intelligence Blue should appear only
in (a) the primary CTA, (b) text links and eyebrows, and (c) at most one supporting
highlight. Everything else is charcoal / slate / steel.

---

## Typography

Family: **Geist Sans** with `Inter, IBM Plex Sans, system-ui` fallback (`--font-sans`).
Mono: **Geist Mono** / `IBM Plex Mono` (`--font-mono`).

| Step | Size / Tailwind | Weight | Tracking / Leading | Color | Use |
|---|---|---|---|---|---|
| **Display** | `text-4xl`→`text-7xl` (clamp by breakpoint) | `font-bold` (700) | `tracking-tight`, `leading-[1.03–1.05]` | `--foreground` (or white on dark) | Page / hero H1 |
| **Heading** | `text-2xl`→`text-5xl` | `font-semibold` (600) | `tracking-tight`, `leading-tight` | `--foreground` | Section H2 |
| Subheading | `text-lg`–`text-2xl` | `font-semibold` | `leading-snug` | `--foreground` | Card / block H3 |
| **Body** | `text-base` / `text-lg` | `font-normal` | `leading-7` / `leading-8` | `--muted` | Paragraphs |
| **Small** | `text-sm` | `font-medium`/`font-semibold` | `leading-6` | `--muted` | Meta, captions, footer |
| Eyebrow | `text-sm` (14px **min**) | `font-semibold` | `uppercase tracking-[0.1em]` | `--primary` (light bg) / `--primary-light` (dark bg) | Section kickers |

Rule: eyebrows are never smaller than 14px; body copy never lighter than `--muted`
(`#475569`).

---

## Radius Scale

| Name | Token / class | Value | Use |
|---|---|---|---|
| sm | `rounded-md` | 0.375rem | Inputs, selects, status callouts |
| md | `rounded-lg` | 0.5rem | Icon tiles |
| lg | `rounded-xl` | 0.75rem | Cards, panels, primary containers |
| pill | `rounded-full` | 9999px | Tags, badges, progress bar |

Buttons are intentionally **square** (no radius) — a deliberate "operating console"
signal that distinguishes TKO from rounded SaaS buttons. Keep as-is.

---

## Shadow Scale

| Name | Definition | Use |
|---|---|---|
| none | — | Default for buttons, inputs (flat) |
| card-rest | none / border only | Cards at rest |
| card-hover | `0 16px 40px -16px rgb(var(--primary-rgb)/0.12)`–`rgba(15,23,41,0.12)` | Card / panel hover |
| accent-hover | `0 12px 30px -12px rgb(var(--primary-rgb)/0.20)` | Interactive accent cards (problem grid) |
| focus-ring | `ring-2 ring-primary/30` + `:focus-visible` 2px `--primary` outline | Keyboard/focus state |

Shadows are long, soft, and low-opacity — never the tight gray drop shadow of default UI
kits.

---

## Layout Grid

| Property | Value |
|---|---|
| Max content width | `max-w-7xl` (80rem) |
| Gutter | `px-6 lg:px-8` |
| Primary column splits | `lg:grid-cols-[0.8fr_1.2fr]`, `[0.7fr_1.3fr]`, `[1.05fr_0.95fr]` |
| Card grids | `sm:grid-cols-2` → `lg:grid-cols-3/4` |
| Standard gap | `gap-4` (cards) / `gap-12` (major columns) |

---

## Section Spacing

| Variant | Class | Use |
|---|---|---|
| Standard section | `py-20 md:py-28` | Default vertical rhythm (`Section`) |
| Compact section | `py-12 md:py-16` | Form / intake / utility pages |
| Dark band | `py-20 md:py-24` | CTA band, framework band |
| Divider | `border-t border-border` | Between adjacent light sections |

---

## Card System

Base: [`src/components/ui/card.tsx`](../src/components/ui/card.tsx).

- Container: `rounded-xl border border-border bg-white p-6 md:p-8`
- Hover: `hover:border-primary/30` + `card-hover` shadow
- Eyebrow → Heading → Body → optional footer link/`dl`
- **Do not** invert a card to a dark background by passing `bg-*` overrides — `cn()` is a
  plain join (not tailwind-merge), so a conflicting `bg-*` will not reliably win and can
  produce invisible content. For emphasis, use the **launch-wedge treatment**:
  `border-primary/40 ring-1 ring-primary/20` with a `text-primary` eyebrow.

---

## CTA System

| Variant | Token classes | Use |
|---|---|---|
| **Primary** | `bg-primary text-white hover:bg-primary-dark`, square, `uppercase tracking-[0.08em] text-sm font-semibold`, `min-h-11` | The single most important action per view |
| **Secondary** | `border border-foreground/20 text-foreground hover:border-foreground/40` (or `border-white/25 text-white` on dark) | Supporting action |
| **Ghost / link** | `text-primary font-semibold` + arrow icon | Inline navigation |

**Language:** the diagnostic CTA reads **"Start the Diagnostic"** everywhere — defined
once in [`src/lib/site.ts`](../src/lib/site.ts) as `site.cta`. No "Go to Intake",
"Begin Intake", or "Start Diagnostic" variants.

Contrast guarantee: primary CTA is always white on `--primary` (8.4:1). Never dark text
on the blue fill.
