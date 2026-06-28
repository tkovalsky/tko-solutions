# TIF v0.2 — Content Inventory, Classification, and Migration Plan

**Status:** Audit deliverable for EPIC 12 (`ENGINEERING_BACKLOG.md`), governed by `GOVERNANCE.md` §2 (N2).
**Scope:** Analysis and migration planning only. No migration scripts, schema, or automation were
built as part of this audit (per the EPIC 12 scope discipline).
**Repos audited:** `tko-site`, `rachel-realestate`, `cre-intelligence`.
**Method:** Read-only inventory via repo exploration. Counts are point-in-time (2026-06-28).

---

## A. Repository Content Inventory

### tko-site

| Area | Count | Examples |
|---|---|---|
| Live pages (`src/app/`) | 4 landing, 5 service detail, 1 case-study route | Homepage, About, Services hub, 5 service pages, `/selected-work`, `/case-studies/[slug]` |
| Published case studies (`content/selected-work/`) | 1 primary + 1 companion narrative | `RACHELOS_FLAGSHIP_CASE_STUDY.md` |
| Evidence registries (`content/proof/*/evidence.yaml`) | 2 domains, ~21 records | healthcare (12 records), rachelos (11 records) |
| Proof libraries / story libraries | 5 markdown docs | Healthcare Experience/Story Library, RachelOS Evidence Library, Transformation Story Library |
| Diagrams | 5 mermaid-backed `.md`/`.mmd` pairs | prior-auth, decision-latency, knowledge-concentration, operational-memory |
| Asset-production templates | 4 | article, case-study, assessment, intelligence-report |
| Asset-production generated drafts (TIF v0.1 output) | 6 | why-buyers-choose-rachel-delray + 5 others (all `status: draft`) |
| Internal strategy/governance docs (`docs/`) | ~35 | positioning, frameworks, audits, wireframes — **not content assets** |

### rachel-realestate

| Area | Count | Best-fit type(s) |
|---|---|---|
| Guides (`src/content/guides/`) | 67 | comparison_guide, buyer_resource, relocation_guide, thought_piece |
| Areas (`src/content/areas/*/index.md`) | 7 | service_page |
| Neighborhoods (`src/content/areas/*/neighborhoods/`) | 15 | guide (sub-type of service_page) |
| Developments (`src/content/areas/*/developments/`) | 31 | service_page |
| Area articles | 2 | guide |
| Landing pages (`src/content/landing-pages/`) | 5 | landing_page |
| Research reports (`src/content/research/`) | 3 | intelligence_report (1), proof_asset (2, property-specific) |
| Testimonials (`src/content/testimonials/`) | 4 | proof_asset |
| **Total publishable items** | **134** | |

This repo is the **largest content surface in the portfolio** and is consumer-facing by design
(acquisition/SEO), unlike `tko-site` (proof-led B2B) or `cre-intelligence` (report product).

### cre-intelligence

| Area | Count | Status |
|---|---|---|
| Center reports (`data/centers/*.yaml`) | 5 | Published, SSG, indexed, PDF-exportable |
| Neighborhood dossiers (`data/neighborhoods/*.yaml`) | 2 | Coded, rendered, **not indexed** |
| Area dossiers (`data/areas/*.yaml`) | 1 | Coded, rendered, **not indexed** |
| Comparison reports | engine only | Engine production-built, **no UI** |
| Strategic/design docs (root + `docs/`) | ~19 | Internal — not content assets |
| Schema reference (`data/schemas/commercial-entities.md`) | 1 | Internal — not loaded at runtime |

**Total publishable items: 8 intelligence reports** (all YAML, not prose) + 1 product-overview page
that doubles as a landing page (`README.md` / homepage copy).

---

## B. Asset Classification Matrix

Counts by primary type across all three repos (secondary classifications not tallied — optional
per EPIC 12 scope):

| Asset type | tko-site | rachel-realestate | cre-intelligence | Total |
|---|---|---|---|---|
| `article` / `thought_piece` | 6 (drafts) | ~6 | 1 (PRODUCT_STRATEGY.md) | ~13 |
| `landing_page` | 4 | 5 | 1 | 10 |
| `service_page` | 5 | 53 (7 areas + 15 neighborhoods + 31 developments) | 0 | 58 |
| `case_study` | 2 | 0 | 0 | 2 |
| `comparison_guide` | 0 (template only) | ~20 | 0 (engine, no UI/content) | ~20 |
| `assessment` | 0 (published; templates/playbooks only) | 0 | 0 | 0 |
| `intelligence_report` | 1 (template only) | 1 | 8 | 9 |
| `executive_brief` | 0 | 0 | 0 | 0 |
| `proof_asset` | ~17 (evidence + libraries + diagrams) | 6 (3 research, mixed; 4 testimonials, mixed) | 0 | ~23 |
| Relocation/buyer-resource (rachel-specific subtype of `service_page`/`thought_piece`) | — | ~12 | — | ~12 |
| Not a content asset (governance/strategy/internal) | ~35 | 0 | ~20 | ~55 |

**Observation:** `assessment` and `executive_brief` are defined as asset types in both v0.1 and
this PRD but have **zero published instances anywhere in the portfolio** — confirmed gap, not an
audit miss. `comparison_guide` is rachel-realestate's dominant content type (20 of its 67 guides)
but has no canonical template yet (Phase 5 gap, tracked below).

---

## C. Evidence Coverage Matrix

| Asset (or asset class) | Evidence exists? | Evidence source |
|---|---|---|
| RachelOS Flagship Case Study | Yes | `content/proof/rachelos/evidence.yaml` (8 cited records) |
| TIF v0.1 generated drafts (6) | Yes | TIF Evidence Registry (Neon/Prisma) — `market-signal-001` + 9 others |
| Healthcare service pages / advisory content | Partial | `content/proof/healthcare/evidence.yaml` exists (12 records) but **not yet cited into any published asset** — evidence without an asset |
| tko-site homepage/about/services copy | No formal citation | Written from `src/lib/content.ts` structured data, not evidence-cited per METHOD.md §3 |
| rachel-realestate guides/neighborhoods/developments (134 items) | No | No `evidence.yaml`-equivalent exists in that repo; content is authored directly from market/MLS knowledge, not cited to an evidence registry |
| rachel-realestate testimonials (4) | Partial | Testimonials are themselves a proof artifact but aren't linked to a TIF Evidence record |
| cre-intelligence center reports (5, published) | Partial | Field-observed (dated, named center, in-situ tenant mix) — strong evidence in substance, but not represented as `evidence.yaml`/Evidence-registry records |
| cre-intelligence neighborhood/area dossiers (3, unpublished) | Partial | Same as above — observed data, not registry-backed |

**Findings:**
- **Assets with evidence:** RachelOS case study, TIF v0.1's 6 generated drafts.
- **Assets missing evidence (by METHOD.md's hard rule):** all 134 rachel-realestate items, all
  tko-site homepage/service copy, all cre-intelligence reports. None of these are wrong or
  unsupported — they're field/market-authored — but none are represented as citable Evidence
  records, so none could currently be traced the way TIF v0.1 traces `market-signal-001`.
- **Evidence without an asset:** the healthcare `evidence.yaml` (12 records) has no published
  asset yet — this is the same gap TIF v0.1's Opportunity Registry exists to close (see EPIC 11
  TIF-1103); it should produce opportunities, not a new mechanism.

---

## D. Opportunity Backlog (evidence exists, no asset yet)

| Opportunity | Evidence basis | Business unit | Rank |
|---|---|---|---|
| Healthcare advisory article(s) from `content/proof/healthcare/evidence.yaml` (12 unused records: PA decision-rights, UM prioritization, care-management memory, transformation-dashboard-green, human-api-root-pattern, etc.) | Existing evidence.yaml, zero assets composed | tko | **High** — largest unused evidence pool in the portfolio |
| Prior Authorization assessment — promote `prior-authorization-operational-quality-problem` (composed under TIF v0.1) from `draft` to reviewed/published | Already composed (Asset exists, status draft) | tko | **High** — closest to done |
| cre-intelligence neighborhood/area reports — index and publish (2 neighborhoods + 1 area, coded but not discoverable) | Field-observed data exists; SSG/indexing is the only blocker | cre | **High** — pure unblock, no new authoring |
| cre-intelligence comparison reports — build the `/compare/[a]/[b]` UI (engine exists) | Engine production-built; evidence is the underlying center YAMLs | cre | **Medium** — engineering lift, not content lift |
| RachelOS evidence records not yet cited beyond the flagship case study (e.g. `referral-intelligence`, `content-recommendation` — allowed_use limited to service-pages/deck) | Existing evidence.yaml, partial use | rachel | **Medium** |
| rachel-realestate testimonials (4) — no formal evidence registry exists for this repo at all | Testimonials exist as raw proof but uncited | rachel | **Low** — repo doesn't yet participate in the TIF spine; bootstrapping it is a bigger lift than the asset value justifies right now |

---

## E. Canonical Template Definitions

Templates already covered by TIF v0.1 (`asset-production/templates/`): **article, case-study,
assessment, intelligence-report.** Per the EPIC 12 reuse-first rule, these are not redefined here.

Newly scoped types (no template exists yet) — minimum definition only, not authored in full:

| Template | Purpose | Required sections | Evidence requirement | CTA requirement |
|---|---|---|---|---|
| `landing_page` | Conversion for a named segment (e.g. rachel-realestate's investor/seller/55+ pages) | Hero/segment hook, problem recognition, offer/inventory fit, proof, CTA | At least 1 evidence or testimonial citation per claim of fit | Single primary CTA (contact/intake), no competing CTAs |
| `comparison_guide` | Decision support between 2–4 named options (development vs. development, city vs. city) | Comparison table, criteria explanation, "who fits which option," recommendation | Each comparative claim (price, amenity, fit) needs a dated source; no metric without one | Soft CTA (schedule a tour/call) — comparison guides sell judgment, not urgency |
| `executive_brief` | One-page leadership communication of a finding (used for the PA assessment / Operational Recovery sales motion) | Situation, finding, risk if unaddressed, recommended next step | Findings must cite `sources:` records exactly as case-study/assessment do | CTA = scheduling the assessment, not a generic "contact us" |
| `thought_piece` | Challenge an assumption (e.g. "What Buyers Get Wrong About GL Homes") | Conventional belief, the actual pattern, why it matters, what to do instead | Cross-domain or cited observation; opinion must be earned by evidence, not asserted | Optional — thought pieces can end without a CTA if the goal is authority, not conversion |
| `proof_asset` | Screenshot/diagram/testimonial as a standalone citable unit | Caption, what it proves, what it does NOT prove (claim guard), source/date | Is itself evidence — must carry a `claim_guard` the way `evidence.yaml` records do | None — proof assets are cited, not browsed to a CTA |

**Recommendation:** author these five templates as `asset-production/templates/*.md` (extending
the existing four) before any first-25 migration touches a `landing_page`, `comparison_guide`,
`executive_brief`, `thought_piece`, or `proof_asset` item. This is template *extension*, consistent
with `asset-production/METHOD.md`'s existing format — not a new mechanism.

---

## F. Migration Strategy

Disposition guide, with the dominant pattern per repo (not an exhaustive per-file list — see §A/§H
for the highest-value individual items):

| Repo / class | Disposition | Why |
|---|---|---|
| tko-site: RachelOS flagship case study | **Keep As-Is** | Already evidence-cited, already published, already the Tier-1 proof asset |
| tko-site: TIF v0.1 generated drafts (6) | **Normalize** | Already evidence-cited and traced; need human review/refinement pass (METHOD.md §5 checklist) before `published` |
| tko-site: healthcare evidence.yaml (unused records) | **N/A (evidence, not asset)** | Feeds Phase D opportunities; the records themselves don't migrate, they generate new assets |
| tko-site: homepage/about/services copy | **Keep As-Is** | Live revenue surface (GOVERNANCE.md ACTIVE A2); not in scope for evidence-retrofitting now — would be a Rewrite if ever pursued, but that's not justified while it's converting |
| rachel-realestate: 31 developments + 15 neighborhoods + 7 areas (53 service_page items) | **Keep As-Is** | Structurally sound reference content; SEO/acquisition surface, not a credibility-evidence surface — TIF's evidence rule (claims need proof_ref) doesn't apply the same way to factual property/area listings |
| rachel-realestate: ~20 comparison_guides | **Normalize** | Strong content, no canonical template (Phase E gap) — once the template exists, retrofit frontmatter/structure, not rewrite the substance |
| rachel-realestate: relocation guides (NJ-town-specific, ~7) | **Decompose** | Each currently mixes a generic "leaving for Florida" thesis with town-specific specifics — the reusable thesis should become one `thought_piece`, town-specifics stay as lightweight pages that cite it |
| rachel-realestate: testimonials (4) | **Normalize** | Should become `proof_asset` records (with claim guards) rather than free-text quotes, so they're citable the way RachelOS evidence is |
| rachel-realestate: research reports (3) | **Keep As-Is** (market report) / **Normalize** (2 property-specific reports → `proof_asset`) | Market report is already structured as `intelligence_report`; the two property-specific ones are evidence for a future buyer, not reports themselves |
| cre-intelligence: 5 published center reports | **Keep As-Is** | Field-observed, already the right shape, already published |
| cre-intelligence: 2 neighborhood + 1 area dossiers | **Normalize** | Content is right; missing only SSG/indexing — an engineering unblock, not a content rewrite |
| cre-intelligence: 19 internal strategy/governance docs | **Archive** (from a *content* perspective only — they remain live engineering references in their own repo; they are simply out of scope as TIF content assets) | Not customer-facing; no disposition action needed in TIF |

---

## G. Publication Ownership Model

| Layer | Owns | Does not own |
|---|---|---|
| **TIF (this spine)** | Evidence Registry, Asset Opportunity Registry, Asset Composer, Traceability, canonical templates | Where an asset is *displayed*, brand voice, page design |
| **tko-site** | Placement + voice for consulting, healthcare advisory, operational-intelligence assets (`content/selected-work/`, future `content/offers/`, `src/content/insights/`) | Real estate or CRE-specific content |
| **rachel-realestate** | Placement + voice for relocation, real estate, comparison guides, development/neighborhood reference (`src/content/guides/`, `areas/`, `landing-pages/`) | Healthcare or CRE content; has no TIF Evidence Registry today (Phase D notes this as a gap, not yet closed) |
| **cre-intelligence** | Placement + voice for market intelligence, tenant representation, opportunity reports (`data/centers|neighborhoods|areas/`, `/reports/*`) | Healthcare advisory or real-estate-buyer content |

This mirrors `asset-production/METHOD.md`'s existing output-home table (case study →
`content/selected-work/`, assessment → `content/offers/`, intelligence report → cross-repo,
article → `src/content/insights/`) — extended to cover `rachel-realestate` and
`cre-intelligence` explicitly rather than treating them only as "cross-repo."

---

## H. Recommended First 25 Assets To Normalize

Ranked by (a) evidence already exists or is cheap to attach, and (b) business value per
`CURRENT_REALITY.md`'s active revenue priorities (A1 assessment sales, A2 proof-led site).

1. `why-buyers-choose-rachel-delray` (TIF v0.1 draft) — review → published
2. `buyer-strategy-vs-listing-strategy` (TIF v0.1 draft) — review → published
3. `human-apis-become-organizational-bottlenecks` (TIF v0.1 draft) — review → published
4. `operational-intelligence-vs-reporting` (TIF v0.1 draft) — review → published
5. `why-most-crms-fail-real-estate-teams` (TIF v0.1 draft) — review → published
6. `prior-authorization-operational-quality-problem` (TIF v0.1 draft) — review → published; directly supports A1 (PA assessment offer)
7. Healthcare advisory article from `prior-auth-decision-rights` + `prior-auth-exception-routing` (new Opportunity → Asset; evidence already exists, zero new authoring needed for sourcing)
8. Healthcare advisory article from `transformation-dashboard-green` ("Dashboard Was Green" — strongest enterprise narrative per evidence.yaml claim_guard)
9. Healthcare advisory article from `human-api-root-pattern` (the cross-cutting healthcare thesis, currently unused)
10. cre-intelligence: index + publish `boca-raton-east.yaml` neighborhood report (unblock only)
11. cre-intelligence: index + publish `delray-beach-east.yaml` neighborhood report (unblock only)
12. cre-intelligence: index + publish `south-florida.yaml` area report (unblock only)
13. rachel-realestate: `boca-vs-delray.md` comparison_guide — normalize to canonical template once Phase E template exists
14. rachel-realestate: `lotus-vs-seven-bridges-vs-the-bridges-2026.md` — normalize (high-intent buyer comparison)
15. rachel-realestate: `should-you-choose-delray-boca-or-boynton-at-1m.md` — normalize (price-banded decision support)
16. rachel-realestate: `east-vs-west-delray-what-buyers-get-wrong.md` — normalize as `thought_piece`
17. rachel-realestate: `what-buyers-get-wrong-about-gl-homes.md` — normalize as `thought_piece`
18. rachel-realestate: decompose the 5 NJ-town relocation guides into 1 shared `thought_piece` ("Leaving New Jersey for South Florida") + lightweight town pages citing it
19. rachel-realestate: `south-florida-true-cost-of-ownership.md` — normalize as `thought_piece`
20. rachel-realestate: 4 testimonials — normalize into `proof_asset` records with claim guards
21. rachel-realestate: `delray-downtown-market-report-q4-2025.md` — keep as-is, confirm it matches `intelligence_report` template shape
22. tko-site: author the `landing_page` template (Phase E), then re-home the existing homepage hero/CTA logic so it's template-conformant for future segment pages
23. tko-site: author the `comparison_guide` template (Phase E) — blocks items 13–15 above
24. tko-site: author the `executive_brief` template (Phase E) — needed before assessment sales collateral can be produced as a TIF asset
25. cre-intelligence: build the `/compare/[a]/[b]` UI for the 5 published centers (engineering unblock; content/evidence already exists in the center YAMLs)

---

## Success Criteria Check

- **What content exists?** §A.
- **What type is it?** §B.
- **What evidence supports it?** §C.
- **Where should it live?** §G.
- **What template should it use?** §E (existing four reused; five gaps identified, not yet authored).
- **Keep / normalize / rewrite / decompose / archive?** §F, itemized further in §H.
- **Can a legacy asset migrate into the TIF model with traceability preserved?** Demonstrated
  already by TIF v0.1 (`market-signal-001` → `why-buyers-choose-rachel-delray`, status: draft,
  bidirectional trace verified in Neon). The pattern is proven; this audit identifies where to
  point it next. **No migration tooling was built — per EPIC 12 scope, this document is the
  deliverable.**
