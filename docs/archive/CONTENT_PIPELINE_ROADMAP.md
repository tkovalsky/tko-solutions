# Content & Intelligence Pipeline Roadmap (cross-repo)

**Status:** Live — phased roadmap for the unified content production system
**Last Updated:** 2026-06-30
**Owner:** Todd Kovalsky
**Scope:** Documentation/architecture alignment. This roadmap sequences existing initiatives across
`rachel-realestate`, `tko-site`, and `cre-intelligence`. It authorizes **no** build by itself; each
phase keeps its own governance gate.

> **Authority:** `GOVERNANCE.md` (classification + Publication Layer §5) and `CURRENT_REALITY.md`
> (positioning) win on conflict. RachelOS governance (`rachel-realestate/CLAUDE.md`: no
> scoring/queue/lifecycle changes) and the portfolio caps (≤3 active / ≤5 total) are binding on
> every phase.

## The pipeline

```
Knowledge               CRM notes · lead conversations · transcripts · research · facts · proof
        ↓
Insight                 reusable conclusions, findings, claims, patterns, recommendations
        ↓
Deliverable             guide · comparison · report · assessment · case study · article · sales asset
        ↓
Channel Package         SEO page · PDF · email · social · ad · CRM next-touch · sales one-pager
        ↓
Publication             RachelDelray · TKO Site · CRE Intelligence · CRM · email · ad/social draft
        ↓
Measurement             search · analytics · guide downloads · lead conversion · CRM usage · feedback
```

The same source knowledge powers all outputs. Existing TIF registries still include Evidence,
Opportunity, Asset, Framework, Artifact, Voice, and Prompt records/contracts. The roadmap now treats
Deliverable, Channel Package, Publication, and Measurement as distinct planning layers. **TIF owns
generation, packaging, fact resolution, and traceability; publication layers own placement,
presentation, and the human approval/publish gate.**

## Repository ownership boundaries

| Layer | Owner | Notes |
|---|---|---|
| Fact Registry | `tko-site` (EPIC 16) | canonical source of truth, all targets |
| TIF Registries + Execution Layer | `tko-site` (EPIC 15) | one `Framework × Artifact × Voice` composer |
| Content Operating Model | `tko-site` (EPIC 18) | `Knowledge × Insight × Deliverable × Channel Package × Publication × Measurement` planning layer |
| Compose boundary | `POST /api/tif/compose` | drafts only; no publish — `docs/TIF_RACHEL_DRAFT_API.md` |
| RachelDelray publication + RachelOS | `rachel-realestate` | consumer of TIF outputs (DEC-56); system of record for lead/relationship state |
| TKO public site publication | `tko-site` | articles, assessments, briefs, case studies, one-pagers |
| CRE publication | `cre-intelligence` | intelligence/market/opportunity reports |

RachelOS is signal capture · lead/relationship intelligence · assessment intake · personalization —
**not** the content generator. It never publishes via TIF, and TIF never mutates RachelOS scoring,
queue, or lifecycle.

## Phases

| Phase | Scope | Repos | Primary specs | Gate / classification |
|---|---|---|---|---|
| **1 — Documentation alignment** | This roadmap + the cross-repo boundary docs | both | `GOVERNANCE.md` §5, DEC-56, this file | None — docs only (done with this pass) |
| **2 — TIF Execution Layer** | Make the registries operational (`Payload → … → Publish`) | `tko-site` | EPIC 15 | SANCTIONED-NEXT; excess capacity, behind revenue work, within caps |
| **3 — Fact Registry** | Canonical facts: communities, developments, neighborhoods, cities, counties, lifestyle profiles, buyer personas | `tko-site` | EPIC 16 | BACKLOG; after Phase 2 proves the composer needs a shared fact base |
| **4 — Content Operating Model** | Deliverable taxonomy, archetypes, channel package model, readiness stages, coverage, scenario validation, measurement loop | `tko-site` | EPIC 18, `docs/TIF_CONTENT_OPERATING_MODEL.md` | Docs/backlog only; no implementation authorized |
| **5 — Community Intelligence Assessment** | Community-Match framework + first-class comparison deliverables + Phase-1 page/channel packages | both | EPIC 14, `docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md` | BACKLOG; **revenue validation + new operator approval** (DEC-49). Documentation-grade promotion only — not reclassified ACTIVE |
| **6 — RachelOS Integration** | Assessment-completion contract: lead → answers → summary → recommend → compose → attach → surface | `rachel-realestate` + `tko-site` | TIF-1409, ROS §0E.11 | After Phase 5 build authorized; no manual copy/paste; no scoring/queue/lifecycle change |
| **7 — Channel Package System** | SEO/PDF/social/ad/email/CRM/sales packages from core deliverables | `tko-site` + publication targets | EPIC 18 / TIF-1803 | BACKLOG; human review retained |
| **8 — Publishing Integration** | Per-target publication adapters | all three | EPIC 17 / TIF-1701 | DEFERRED; human approval gate retained |
| **9 — External Distribution** | Google / Facebook / Email / YouTube / landing pages | publication layers | EPIC 17 / TIF-1702 | DEFERRED; explicit no-auto-publish review |
| **10 — Measurement Feedback** | Search, analytics, CRM usage, email/ad engagement, downloads, conversion, manual feedback | all three | EPIC 18 / TIF-1807 | BACKLOG; after publications/packages are traceable |

## Standing constraints (all phases)

- ≤3 active initiatives / ≤5 total portfolio. Revenue work ships first; the pipeline advances on
  excess capacity.
- One composer only — `Framework × Artifact × Voice`. No per-output generators, ever.
- Comparison is a first-class deliverable. `comparison_page` and `comparison_guide` are channel or
  publication forms of that deliverable.
- Human approval on every published/consumed asset. Nothing auto-publishes or auto-distributes.
- No client-facing platform / SaaS. The speculative tail (knowledge graph, vectors, agents, generic
  platform) stays DEFERRED.
- RachelOS scoring, queue ranking, lifecycle, and relationship-state derivation are not touched by
  any content-pipeline work.

## Cross-references

- `tko-site`: `GOVERNANCE.md`, `CURRENT_REALITY.md`, `TKO_INTELLIGENCE_FACTORY_PRD.md`,
  `ENGINEERING_BACKLOG.md` (EPIC 14/15/16/17), `docs/TIF_RACHEL_DRAFT_API.md`,
  `docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md`.
- `rachel-realestate`: `docs/CURRENT_REALITY.md` (Content Production Architecture),
  `docs/DECISIONS.md` (DEC-49, DEC-56), `docs/RELATIONSHIP_INTELLIGENCE_OPERATING_SYSTEM.md`
  (§0E.11).
