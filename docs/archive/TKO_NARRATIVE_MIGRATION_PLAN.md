# TKO Website — Narrative Migration & Content Architecture Plan

Date: 2026-06-22
Type: Architecture / narrative migration plan (NOT copy, NOT branding)
Migration: **Category → Theory → Framework → Offer**  ⟶  **Problem → Evidence → Pattern → Offer**

---

## The story the site must tell

The site currently presents *conclusions* (Operational Intelligence, the Decision Layer, Human-Approved AI) as if they were the starting point. They are not the start — they are the **earned result** of an accumulation of work. The architecture must reorder so the visitor experiences the work in the order that builds belief:

```
Phase 1  Enterprise Healthcare Transformation   ─┐
Phase 2  Program Recovery & Operational Governance│
Phase 3  Workflow Modernization                  ├─ EVIDENCE (years of it)
Phase 4  Decision Systems                         │
Phase 5  RachelOS  (proof the pattern travels)   ─┘
Phase 6  Operational Intelligence  ──────────────── PATTERN (the conclusion)
```

**RachelOS is Phase 5, not Phase 1.** It is the proof that the pattern earned inside enterprise healthcare works *outside* it. The entire migration hinges on demoting category language from "the lead" to "the conclusion," and promoting accumulated evidence to "the lead."

This implies one **structural rule applied to every page**: never let a category/framework word appear before a piece of concrete evidence on the same page. Problem → Evidence → Pattern → Offer, in that order, top to bottom.

---

## Deliverable 1 — Page inventory audit

| Page | Current purpose | Future purpose | Recommendation | Rationale |
| --- | --- | --- | --- | --- |
| `/` (home) | Category-first essay: OI → Missing Layer → RachelOS → framework → services | The full arc in one scroll: Problem → Evidence (accumulation timeline + RachelOS) → Pattern → Offer | **REPOSITION** (resequence, reuse most blocks) | Blocks are sound; the *order* and the hero's category lead are the problem. The accumulation timeline is missing entirely. |
| `/about` | Operator-first credibility tags + truth-framework method | **The accumulation narrative spine** — the 6-phase story that makes OI an earned conclusion | **REPOSITION** | This is the natural home for the career-as-evidence arc. Today it asserts posture ("operator first") instead of walking the phases. |
| `/services` (index) | Explains the "ladder / engagement logic" taxonomy | Offer menu that appears *after* evidence; problem-led, price-visible | **KEEP w/ MINOR REWRITE** | Structure is right; it leads with internal taxonomy instead of buyer outcome. |
| `/services/diagnostic` | Priced, scoped entry offer | Same | **KEEP AS-IS** (light de-jargon) | Strongest page on the site; price + timeline + deliverables present. |
| `/services/operating-system-build` | Build offer | Same | **KEEP AS-IS** | Structurally complete. |
| `/services/fractional-advisor` | Retainer offer | Same | **KEEP AS-IS** | Structurally complete. |
| `/case-studies` (index) | Proof section gated by "Proof Governance" framing | Rename to **Selected Work** — single evidence body across the career | **REPOSITION + RENAME** | "Case Studies" implies packaged, metric-bearing client deliverables → triggers the gated-metrics hedging. "Selected Work" lets healthcare + program recovery + RachelOS + reporting sit together as one accumulation. (Deliverable 5.) |
| `/case-studies/from-crm-to-operating-system` | RachelOS proof | **Cornerstone proof hub** (Phase 5 evidence) | **KEEP + EXPAND** (new URL, 301) | The single best proof asset; should become the most-linked page. |
| `/case-studies/prior-authorization-modernization` | Healthcare proof (hedged) | Evidence entry (Phase 1) + seed for a cornerstone article | **REPOSITION** | Strong, specific domain proof buried under "gated" language. |
| `/case-studies/enterprise-care-management-modernization` | Healthcare program proof | **Rename → Enterprise Program Recovery** (Phase 2 evidence) | **REPOSITION** | The recovery/governance phase has no home today; this work *is* it. |
| `/case-studies/healthcare-interoperability-platform` | Healthcare proof | Evidence entry (Phase 3, workflow/governance) | **KEEP w/ MINOR REWRITE** | Solid; de-hedge. |
| `/industries` | Abstract "same gap across 4 verticals" | — | **MERGE / DELETE** | Pure category-pattern abstraction with *no evidence per vertical*. Dilutes the narrative and fails the "proof on every page" rule. Fold a short context strip into home/Selected Work; build real vertical pages only where proof exists (Healthcare). |
| `/insights` (index) | Scaffolding page describing *future* content ("MDX-ready," "no empty article inventory") | Real article hub once cornerstones exist | **DELETE current / REPLACE** | A sales-funnel page whose subject is "the plan to have content" actively damages credibility. |
| `/insights/[slug]` | MDX article route (unused) | Houses the cornerstone articles | **KEEP (reuse engine)** | The publishing mechanism is fine; it just has nothing to publish yet. |
| `/contact` | Diagnostic intake | Same, but tiered entry + remove dev-state leak | **KEEP w/ MINOR REWRITE** | Renders a developer TODO to real users ([contact:60]); CTA assumes a ready-to-buy visitor. |
| `layout.tsx` / nav / footer | Category boilerplate | Reflect new IA (Selected Work, evidence-led) | **KEEP w/ MINOR REWRITE** | Nav must expose Selected Work as a primary item. |

---

## Deliverable 2 — Recommended future sitemap

| URL | Primary objective | Primary buyer | Funnel stage | Fate |
| --- | --- | --- | --- | --- |
| `/` | Walk Problem → Evidence (timeline + RachelOS) → Pattern → Offer in one scroll | COO / VP Ops / PE operating partner / health-tech ops | Entry (all stages) | **Survives** (resequenced) |
| `/about` | The accumulation narrative: 6 phases that make OI an earned conclusion | Skeptical evaluator validating depth | Consideration | **Survives** (repositioned to story spine) |
| `/selected-work` | One evidence body across the career; proof on the index itself | Skeptical evaluator | Consideration / proof | **Replaces** `/case-studies` |
| `/selected-work/rachelos` | Cornerstone proof hub: the pattern works outside healthcare | All buyers | Proof / conversion | **From** `/case-studies/from-crm-to-operating-system` (301) |
| `/selected-work/prior-authorization-modernization` | Phase 1 healthcare evidence | Healthcare ops | Proof | **From** existing slug (301) |
| `/selected-work/enterprise-program-recovery` | Phase 2 recovery/governance evidence | Transformation lead / PE | Proof | **From** `enterprise-care-management-modernization` (301, renamed) |
| `/selected-work/healthcare-interoperability` | Phase 3 workflow/governance evidence | Healthcare ops / CIO | Proof | **From** existing slug (301) |
| `/services` | Offer menu, problem-led, price-visible, after evidence | Decision-ready buyer | Decision | **Survives** (minor rewrite) |
| `/services/diagnostic` | Entry offer (priced) | Buyer with active problem | Decision / conversion | **Survives** |
| `/services/operating-system-build` | Core build offer | Post-diagnostic buyer | Decision | **Survives** |
| `/services/fractional-advisor` | Retainer offer | Post-build buyer | Retention | **Survives** |
| `/insights` | Real article hub (only when ≥3 cornerstones exist) | Search visitors / warm leads | Awareness / search | **Survives** as empty-until-real; current scaffolding **removed** |
| `/insights/why-most-ai-projects-fail` | Cornerstone (AI adoption) | Exec burned by an AI pilot | Awareness (high intent) | **New** |
| `/insights/why-dashboards-dont-drive-decisions` | Cornerstone (operations POV) | COO / VP Ops | Awareness → consideration | **New** |
| `/insights/prior-authorization-workflow-problem` | Cornerstone (healthcare) | Healthcare ops | Awareness (high search) | **New** |
| `/contact` | Tiered intake / book a call | Qualified buyer | Conversion | **Survives** (minor rewrite) |
| `/industries` | — | — | — | **Removed** (merged into home strip + Selected Work) |

Redirect discipline: every renamed page keeps a **301** from the old slug. The `/case-studies/*` → `/selected-work/*` moves and the `/industries` removal all need redirects to preserve any existing equity and avoid 404s.

---

## Deliverable 3 — Existing-page reuse analysis (avoid needless rewrites)

**Preserve as-is (content is strong and correctly framed):**
- The three service *detail* pages — price/timeline/deliverables/FAQ structure is exactly right.
- The RachelOS case-study body (situation/problem/system/outcome) — reuse wholesale; only the wrapper framing and URL change.
- The `Signals → Memory → Facts → State → Priority → Human Approval → Action` framework component — content is good; it just must move to Level 3 (Pattern), never lead.

**Structurally correct, narratively wrong (reposition, don't rewrite from scratch):**
- Home — every section block is reusable; the fix is *order* + the hero's category lead + adding the accumulation timeline. ~80% reuse.
- About — credibility content is reusable as the raw material of the 6-phase arc; reframe from "tag cloud + posture" into "phases."
- The three healthcare case studies — the *facts* are strong; remove the "gated/pending/Proof Governance/Evidence available and gated" hedging layer that currently smothers them.

**Requires complete replacement:**
- `/insights` index — its subject (the plan to publish) is wrong by definition; rebuild only when real articles exist.
- `/industries` — abstract, evidence-free; do not rewrite, retire it.
- The "Proof Governance" block (`/case-studies` index) and the "Evidence available and gated" section (`/case-studies/[slug]`) — delete outright; replace with concrete evidence.

---

## Deliverable 4 — Cornerstone assets

| # | Asset | Recommended URL | Search intent | Buyer intent | Internal links (in / out) | Supporting pages |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | **From CRM to Operating System (RachelOS)** | `/selected-work/rachelos` | Low direct ("relationship intelligence," "CRM that nobody trusts") — primarily a *proof hub*, not a search target | **Highest** (closes belief) | IN: home, every service page, about, all cornerstones. OUT: `/services/operating-system-build`, `/contact` | RachelOS visual walkthrough; reporting-platform note as a sibling proof |
| 2 | **Why Prior Authorization Is a Workflow Problem Before It Is an AI Problem** | `/insights/prior-authorization-workflow-problem` | **High** ("prior authorization automation," "prior auth AI," "reduce prior auth burden") | High (healthcare ops) | IN: home healthcare strip, `/selected-work/prior-authorization-modernization`. OUT: prior-auth work page, `/services/diagnostic` | The prior-auth Selected Work page is its proof |
| 3 | **Why Dashboards Don't Drive Decisions** | `/insights/why-dashboards-dont-drive-decisions` | Moderate ("dashboards vs decisions," "dashboards no action") | High (COO/VP Ops) — category POV that converts | IN: home Pattern section. OUT: `/selected-work/rachelos`, `/services/diagnostic` | RachelOS as the "what it looks like solved" proof |
| 4 | **Why Most AI Projects Fail** | `/insights/why-most-ai-projects-fail` | **Highest volume + intent** ("why AI projects fail," "AI pilot failed") | High (any exec burned by a pilot) | IN: home, AI-adoption strip. OUT: RachelOS (human-approved AI), prior-auth article, `/services/diagnostic` | RachelOS + prior-auth as the counter-examples that worked |

All four point *inward* to RachelOS and *forward* to the Diagnostic. #2 and #4 are the search acquisition engines; #1 is the conversion hub; #3 is the bridge.

---

## Deliverable 5 — Case Study strategy: rename to **Selected Work**

**Recommendation: Yes — convert `/case-studies` into `/selected-work`, and put Prior Authorization, Care Management / Program Recovery, Workflow Modernization, RachelOS, and the Reporting Platform together in one evidence-focused section.**

Rationale:
- **"Case Studies" sets a contract the content can't honor.** It implies a named client, a commissioned engagement, and hard before/after metrics. That expectation is exactly what forces the "metrics gated / pending confirmation" hedging — and the hedging is what destroys credibility. "Selected Work" sets an honest, accurate expectation: *here is a body of work across a career.*
- **It unifies the accumulation story.** The 6 phases stop reading as scattered case studies and start reading as one arc that earns the Operational Intelligence conclusion. Healthcare enterprise work and RachelOS belong on the same wall.
- **It lets RachelOS be Phase 5, not a standalone "featured case study,"** which is the whole point of the migration.
- **It removes the proof/anti-proof whiplash.** Today the index *advertises* its own caution ("Proof Governance," "Evidence is stated carefully"). Selected Work just shows the work.

Structure of `/selected-work`: a single chronological/thematic evidence wall (the 6 phases), each entry leading with the *problem it solved* and the *concrete scope*, RachelOS positioned as the proof the pattern travels. The Reporting Platform / CRE Intelligence appears as a secondary entry (it widens the evidence without fragmenting the consultancy narrative — keep it minor).

---

## Deliverable 6 — SEO reality check (ignore category terms)

Assume **zero** search volume for "Operational Intelligence" and "Decision Layer." Acquire on symptoms; keep category terms only for the in-room POV.

| Group | Target keywords (symptom-led) | Existing pages that can rank | Missing pages |
| --- | --- | --- | --- |
| **Healthcare** | "prior authorization automation," "reduce prior auth burden," "care management modernization," "CMS interoperability operations," "healthcare administrative burden" | Prior-auth + interoperability Selected Work pages (after de-hedging) | Cornerstone #2 (prior-auth workflow article); a single evidence-led Healthcare page |
| **Operations** | "operational bottlenecks," "work stalls between teams," "operational visibility," "process improvement consultant," "where are we losing time" | Home + `/services/diagnostic` (partially) | Cornerstone #3 (dashboards); a symptom-led operations diagnostic landing |
| **Transformation** | "transformation program stalled," "program recovery consultant," "why transformation programs fail," "delivery dependency risk" | `/selected-work/enterprise-program-recovery` | A program-recovery POV article (Phase 2 cornerstone candidate) |
| **AI Adoption** | "why AI projects fail," "AI pilot failed," "human in the loop AI," "AI adoption operations" | Scattered home/service references | Cornerstone #4 (AI projects fail) — top priority for reach |
| **Relationship Intelligence** | "relationship intelligence," "CRM follow-up problems," "client follow-up system," "accounts falling through cracks" | `/selected-work/rachelos` | None major — RachelOS is the asset; add an FAQ/long-tail section to it |

**SEO ordering insight:** the two highest-volume, highest-intent targets ("why AI projects fail," "prior authorization automation") map directly to TKO's two strongest proof areas (RachelOS' human-approved AI; CMS prior-auth depth). That alignment is rare and should drive the content roadmap order: #4 and #2 first.

---

## Migration sequence (what to do, in order — not copy)

1. **Resequence the home page** to Problem → Evidence (add the accumulation timeline) → Pattern → Offer; demote the category lead in the hero.
2. **Rebuild `/about`** as the 6-phase accumulation spine (reuse existing credibility facts).
3. **Convert `/case-studies` → `/selected-work`** (301s), strip all hedging blocks, reframe entries problem-first; rename the care-management page to Enterprise Program Recovery.
4. **Promote RachelOS** to `/selected-work/rachelos` (301) as the cornerstone proof hub.
5. **Retire `/industries`** (301 → home/Selected Work); defer real vertical pages until proof exists per vertical (Healthcare only, for now).
6. **Remove the `/insights` scaffolding;** publish cornerstone articles #4 and #2 first via the existing `/insights/[slug]` engine, then #3 and #1's expansion.
7. **Minor fixes:** services index (drop taxonomy lead), contact (remove dev-state leak, tier the CTA), nav/footer (expose Selected Work).

---

## What survives / moves / merges / deletes (one-glance)

- **Survives (reused):** home blocks, all three service detail pages, RachelOS body, the framework component, the MDX article engine, contact.
- **Moves (repositioned):** home order, about → accumulation story, healthcare studies → Selected Work, RachelOS → cornerstone URL.
- **Merges:** industries → home strip + Selected Work context.
- **Deletes:** `/insights` scaffolding index, "Proof Governance" block, "Evidence available and gated" section, `/industries` standalone, the contact dev-state note.

**The story the site should tell:** not "TKO is an Operational Intelligence consultancy," but "here is twenty-plus years of operational transformation work — healthcare modernization, program recovery, workflow redesign, decision systems — and here is RachelOS proving the same pattern works outside the enterprise. *That* is why the Operational Intelligence approach can be trusted." Evidence first. The category is the last thing the visitor reads, not the first.
