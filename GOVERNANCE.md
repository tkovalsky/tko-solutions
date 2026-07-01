# GOVERNANCE — TKO

**Status:** Authoritative classification for this repository
**Last Updated:** 2026-06-26
**Owner:** Todd Kovalsky
**Portfolio context:** Governed by `/dev/PORTFOLIO_GOVERNANCE.md`. Reality lives in
[`CURRENT_REALITY.md`](CURRENT_REALITY.md) (the v2.0 baseline) — this doc classifies initiatives
into CLOSED / ACTIVE / BACKLOG / DEFERRED and routes the older planning docs.

> **Why this doc exists.** This repo conflates **two different things** that were drifting into
> one undifferentiated plan:
> 1. A **live marketing website** (positioning, proof, assessment offers) — the actual near-term
>    revenue surface, actively being worked.
> 2. The **TKO Intelligence Factory (TIF)** — an engineering backlog
>    (`ENGINEERING_BACKLOG.md`) for an internal knowledge/asset engine.
>
> This doc makes the split explicit and classifies each piece. **Update (2026-06-28):** TIF has been
> reclassified. It is no longer a blanket-DEFERRED speculative platform. Its narrow **v0.1 Asset
> Production Spine** (Evidence Registry · Asset Opportunity Registry · Asset Composer · Traceability ·
> Capture Inbox) is now a **production accelerator** — a multiplier for the revenue work across
> Rachel / CRE / TKO — and is classified **SANCTIONED NEXT**. The speculative tail (knowledge graph,
> vectors, agents, generic platform) **stays DEFERRED**. The v0.3 Execution Layer is the documented
> runtime contract that makes the existing registries operational; it is not a new product, platform,
> or scope expansion. The website + assessment GTM remain ACTIVE and still ship first.

---

## 1. What Is Actually True

- **Live site** (`src/app/`): `about`, `services`, `selected-work`, `case-studies`, `industries`,
  `insights`, `contact`, homepage. Recently refreshed positioning (last several commits).
- **Positioning baseline:** `CURRENT_REALITY.md` v2.0 (2026-06-25) is authoritative — "Operational
  Knowledge Systems," healthcare-first, Operational Recovery Assessment ($5K–$8K) as the entry offer,
  RachelOS as primary proof.
- **Human-API reframe done:** "Human API" is a *finding type / diagnostic lens*, not an offer or
  pricing tier (`CURRENT_REALITY.md`, `docs/ROADMAP.md` banner).
- **TIF is not built yet.** `ENGINEERING_BACKLOG.md` describes a Next.js/Prisma/Postgres asset
  engine. None of it exists in this repo today; the repo is the website. What is now sanctioned to
  build is the narrow **v0.1 Asset Production Spine**, not the full knowledge graph.
- **The asset-production *method* is real and manual.** `asset-production/METHOD.md` + templates +
  briefs implement the v0.1 Asset Production Spine (`Observation → Evidence → Finding →
  Recommendation → Asset`) with markdown/YAML/Claude and a hard human gate — **no software**. This
  is the live way assets get made today; the deferred TIF software (and EPIC 11's Content
  Intelligence Pipeline) is what would *automate* it later, not a replacement for it now.

---

## 2. Classification

### CLOSED (decided/done — do not reopen)
- Positioning v2.0 baseline (`CURRENT_REALITY.md`) — strategy is set; stop re-litigating positioning.
- Human-API → "finding type, not offer" reframe (2026-06-25).
- Prior-Authorization Operational Assessment strategy note (`docs/strategy/`).
- Live website shell (routes exist and deploy).
- Offer architecture defined (Offer 0 / 0A / 1 / 2 / 3).
- Intelligence Asset Production method v0.1 (`asset-production/METHOD.md` + templates + briefs) —
  the manual, no-software spine for making assets. *Method* is closed/decided; *using* it to
  produce assets is ongoing active work (the "intelligence asset sprint" in PORTFOLIO §3).

### ACTIVE (≤3; currently 2 — the TKO entries in the portfolio's 5)

**A1 — First Paid Assessment** *(PORTFOLIO P2)*
- **Objective:** Package + sell the Operational Recovery Assessment ($5K–$8K) and the Tier-1 Prior
  Authorization Operational Assessment. Finalize one-page offers, build a 20–30 target list, run
  discovery → pilot.
- **Expected outcome:** "Someone paid TKO money" (Stage 1, `CURRENT_REALITY.md` success metrics).
- **Effort:** Medium. **Blocking deps:** soft-depends on A2 for credibility; start outreach with
  existing one-pagers regardless.

**A2 — Proof-Led Website Migration** *(PORTFOLIO P3)*
- **Objective:** Ship the proof-ladder homepage (Hero → Healthcare experience → RachelOS → CRE →
  methodology → Services → CTA); add Operational Recovery Assessment offer, `/selected-work`,
  RachelOS/digest/queue screenshots; remove generic AI-consultancy language and proofless industry
  pages; discovery-call intake as the shared conversion path.
- **Expected outcome:** A credibility surface that converts A1 outreach.
- **Effort:** Medium. **Blocking deps:** RachelOS screenshots (available); approved healthcare/
  transformation stories (drafts in `docs/`).

### SANCTIONED NEXT (un-gated; advances on excess capacity, behind ACTIVE revenue work)

**N2 — TIF v0.2 Asset Normalization & Content Migration Framework** *(analysis/planning, not software)*
- **Objective:** Inventory and classify existing content across `tko-site`, `rachel-realestate`, and
  `cre-intelligence`; map it to the v0.1 Evidence/Opportunity/Asset model; produce a migration plan
  (keep / normalize / rewrite / decompose / archive) and canonical template definitions
  (`ENGINEERING_BACKLOG.md` → "EPIC 12 — Asset Normalization & Content Migration Framework").
- **Depends on:** N1 (TIF v0.1 spine — Evidence Registry, Opportunity Registry, Asset Composer,
  Traceability) must exist first; it does.
- **Scope discipline:** **This is analysis and migration planning, not implementation.** It produces
  documents (content inventory, classification matrix, evidence coverage matrix, opportunity
  backlog, migration strategy, publication ownership model) — no migration scripts, no new schema,
  no cross-repo automation. Building those, if ever justified, is separately gated.
- **Rule:** Same as N1 — un-gated but does not jump ahead of ACTIVE revenue work and does not raise
  the ≤3-active / ≤5-portfolio caps.

**N1 — TIF v0.1 Asset Production Spine** *(production accelerator)*
- **Objective:** Build the narrow asset engine that turns admitted evidence into trust assets with
  full traceability — **Evidence Registry · Asset Opportunity Registry · Asset Composer ·
  Traceability · Capture Inbox** (`ENGINEERING_BACKLOG.md` → "TIF v0.1 — Asset Production Spine"
  scope block; EPIC 7 + EPIC 11 TIF-1101/1103 + TIF-604). It automates
  [`asset-production/METHOD.md`](asset-production/METHOD.md); it does not replace its human approval
  gate.
- **Why it changed from DEFERRED:** TIF is no longer scoped as a speculative platform. v0.1 is a
  **multiplier for revenue-producing work** across Rachel / CRE / TKO — more conversations, more
  pipeline, more published proof — so it is an accelerator, not a thing to do "after revenue."
- **Rule:** Un-gated, but **does not jump ahead of ACTIVE revenue work** and **does not raise the
  caps** (≤3 active / ≤5 portfolio still hold). It may consume **excess** capacity, and advances
  only when it directly supports Rachel, CRE, or TKO asset production.
- **Explicitly out of v0.1 (stays DEFERRED):** knowledge graph, vector search, agent framework,
  generic platform infrastructure.
- **Built (2026-06-28):** Neon-backed Evidence/Opportunity/Asset registries, Asset Composer, and
  the v0.1/v0.2 Operator Console (`/tif`, `/tif/inbox`, `/tif/inventory`) — see `ENGINEERING_BACKLOG.md`
  EPIC 13. EPIC 13 Priority 4 manual-edit-overwrite protection is implemented: generated assets
  store generated metadata, edited files are detected before regeneration, and an explicit
  confirmation is required before overwrite. EPIC 13 Priority 3 (Asset Health) and Priority 5
  (deeper traceability) remain planned, not built.
- **Architecture update (v0.3):** the Execution Layer formalizes the runtime path
  `Payload → Validation → Framework → Artifact → Fact Resolution → Template Population → Draft →
  Voice Refinement → Review → Approval → Publish`. It bridges the existing registries and Asset
  Composer; it does not authorize client-facing SaaS, autonomous agents, or generic platform work.
- **Operator authorization (2026-06-30) — TIF↔RachelOS integration scaffold UNBLOCKED:** the
  operator has lifted the build gate for the **cross-site integration boundary** (see §6). The
  TIF v0.3 **Execution Layer v0.1 scaffold** and the **TKO↔Rachel compose contract** are authorized
  and built: `POST /api/tif/compose` now runs `Payload → Validation → Run → Draft → Response`
  (`src/lib/tif/execution.ts` + `contract.ts`), and RachelOS has a consumer client
  (`rachel-realestate/src/lib/tif/client.ts`). This is the integration boundary only — **not** the
  full assessment engine, content engine, publishing automation, or AI generation. All retained
  constraints in §6 still hold.

### BACKLOG (real, not started)
- Rachel case study as a polished sales asset.
- 2–3 thought-leadership essays (Human API, administrative burden).
- Target account list build-out (healthcare ops / practice admins / health-tech / consulting).
- `/selected-work` content depth; CRE proof tier on site.
- Partner/referral motion for assessments.
- **Interactive Content Engine & Page Template System** *(BACKLOG)* — a RachelDelray growth
  extension of the existing Asset Composer and v0.3 Execution Layer. Recommended first slice:
  Community Pages, Comparison Pages, and Relocation Guides. This is configuration-driven page and
  module production, not a client-facing platform or sold product. Spec: `ENGINEERING_BACKLOG.md`
  **EPIC 14** and `docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md`.
- **Community Intelligence Assessment (Community-Match framework)** *(BACKLOG / Discovery)* — the
  named flagship of EPIC 14 Phase 1. A guided RachelDelray assessment (`rachel_community`
  framework) whose inputs are age, budget, timeline, lifestyle, golf, pickleball, social
  preferences, full-time/seasonal, and new-construction preference, and whose outputs are
  recommended communities, a comparison guide, a personalized report, and lead intelligence.
  **Documentation-grade promotion only** — it is fully specified but **not** reclassified ACTIVE
  (that would violate the ≤3-active / ≤5-portfolio caps) and remains gated on revenue validation +
  a new operator approval (rachel `DECISIONS.md` DEC-49). The RachelOS completion contract is
  `TIF-1409`. Spec: `ENGINEERING_BACKLOG.md` **EPIC 14**.
- **TIF Fact Registry** *(BACKLOG / future capability — `ENGINEERING_BACKLOG.md` **EPIC 16**)* —
  canonical structured records for communities, developments, neighborhoods, cities, counties,
  guides, lifestyle profiles, and buyer personas so all generated assets share one fact base
  (SEO pages, reports, assessments, emails, social, comparison guides). Distinct from the runtime
  **Fact Resolution Layer** (which *consumes* the registry). Future capability only; implementation
  design is not authorized here. Sequenced after EPIC 15 (Execution Layer).

### DEFERRED (do not build until the gate is met)
| Item | Gate |
|---|---|
| **TIF speculative tail** — relational Knowledge Graph (full Experience→Observation→Pattern→FailureMode core, Epics 1/5/6), **Vector Search / pgvector** (Epic 10), **Agent Framework**, and any **generic platform / client-facing SaaS** infrastructure | The original deferral concerns still hold: prove the value with the v0.1 spine first. These remain *internal-only* if ever built — never a sold product. (The v0.1 spine itself is **SANCTIONED NEXT**, not here.) |
| **Full Content Intelligence Pipeline automation beyond the spine** — cron state machine, multi-cycle refinement, Rachel GPT refinement participant (`ENGINEERING_BACKLOG.md` **EPIC 11** tail) | Sequenced **after** the v0.1 spine ships and the manual `asset-production/METHOD.md` flow shows manual orchestration is the bottleneck. This is sanctioned *direction*, not deferred platform — but not started ahead of the spine. |
| Assessment *software* (intake tool, scoring dashboard, dependency graph, pgvector) | Assessment method validated manually across multiple paid engagements (`docs/ROADMAP.md` "What Could Eventually Become Software") |
| Enterprise Value & Exit Readiness assessment | Core assessment method has paid proof |
| Prior-Auth assessment prototype app (Provider/Payer/Authorization entities, etc.) | Manual assessment proof first (explicit in `docs/ROADMAP.md`) |
| Any client-facing platform / SaaS | Violates the 90-day "Not software" constraint — out indefinitely |

---

## 3. Document Map (routing the older docs)

| Document | Type | Status |
|---|---|---|
| `CURRENT_REALITY.md` | Authority | Live — v2.0 positioning + strategy baseline |
| `GOVERNANCE.md` (this) | Authority | Live — classification |
| `asset-production/METHOD.md` (+ templates, briefs) | Method | **Live** — manual asset spine; canonical way assets are made today |
| `ENGINEERING_BACKLOG.md` (TIF) | Plan | **SPLIT** — v0.1 Asset Production Spine = **SANCTIONED NEXT**; v0.3 Execution Layer = runtime contract for the existing composer/registries; speculative tail (graph/vectors/agents/platform) = **DEFERRED**. EPIC 11 = Content Intelligence Pipeline spec; EPIC 12 = v0.2 Asset Normalization & Content Migration Framework (**SANCTIONED NEXT**, analysis/planning only) |
| `docs/TKO_ROADMAP.md` | Plan | **Superseded** — stale June phases; banner added → see this doc |
| `docs/ROADMAP.md` | Reference | Reframed (Human-API as finding type); read as input, not a separate offer |
| `docs/TKO_DECISION_MEMO.md`, `docs/TKO_ARCHITECTURE_DECISIONS.md` | Decisions | Reference |
| `docs/strategy/PRIOR_AUTHORIZATION_OPERATIONAL_ASSESSMENT.md` | Strategy | Live — canonical PA assessment note |
| `docs/capability-audit/*` | Audit | Reference — snapshot audits, not active backlog |
| `TKO_INTELLIGENCE_FACTORY_PRD.md`, `docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md` | Spec | Reference — read scoped to the v0.1 spine; their graph/vector sections are the deferred tail |
| Positioning/strategy docs in `docs/` (`TKO_POSITIONING_*`, `TKO_STRATEGIC_*`, `WEBSITE_*`, etc.) | Reference | Inputs to `CURRENT_REALITY.md`; that doc wins on conflict |
| `reality-audit-2026-06-15.md`, `TKO_*_AUDIT_*` | Audit | Reference/evidence |
| [`archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md`](archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md) | Audit | EPIC 12 deliverable — content inventory/classification/migration plan across `tko-site`, `rachel-realestate`, `cre-intelligence` |

| `docs/CONTENT_PIPELINE_ROADMAP.md` | Plan | **Live** — the unified cross-repo content & intelligence pipeline roadmap (7 phases) spanning RachelOS, TIF, and the publication layers |
| `docs/TIF_RACHEL_DRAFT_API.md` | Contract | **Live** — the TKO-side `POST /api/tif/compose` draft contract; the single TKO↔Rachel boundary |

**Standing rule:** new audits/reports go in a dated `archive/<date>/` folder. Do not add new
PRDs/roadmaps at the repo root.

---

## 5. Publication Layer (architecture boundary)

**TIF generates assets. Publication layers publish them.** This separation is canonical: TIF owns
generation, fact resolution, and traceability through the single `Framework × Artifact × Voice`
composer; publication layers own placement, presentation, lead handling, and the human
approval/publish gate. **No publication layer contains a generator, and TIF never publishes or
writes into a publication repo.**

There are three publication targets:

| Publication target | Repo | Asset types TIF produces for it |
|---|---|---|
| **RachelDelray** | `rachel-realestate` | community pages · comparison guides · relocation guides · buyer guides · seller guides · lifestyle pages |
| **TKO Site** | `tko-site` (public site) | articles · assessments · executive briefs · case studies · one-pagers |
| **CRE Intelligence** | `cre-intelligence` | intelligence reports · market reports · opportunity reports |

The same source facts (EPIC 16 Fact Registry, when built) power outputs across all three targets.
Downstream distribution (Google, Facebook, Email, YouTube, landing/community pages) is **DEFERRED**
and sits behind the standing no-auto-publish gate — see `ENGINEERING_BACKLOG.md` EPIC 17 and
`docs/CONTENT_PIPELINE_ROADMAP.md` Phases 6–7. The only live integration boundary today is the
TKO→Rachel draft contract in `docs/TIF_RACHEL_DRAFT_API.md`.

---

## 4. The Strategic Constraint (revised 2026-06-28)

> TKO optimizes for **proof and revenue**: build proof, publish evidence, sell assessments. The
> consulting capability is already demonstrated (RachelOS); the market needs to see it and buyers
> need to transact. **The TIF v0.1 Asset Production Spine serves this directly** — it is a
> *multiplier* for the revenue-producing initiatives across Rachel, CRE, and TKO (more published
> proof → more conversations → more pipeline), so it is sanctioned as a production accelerator, not
> deferred behind first revenue. It still advances **behind** active revenue work and within the
> caps; it never becomes a sold product.

**The old "build TIF after revenue / not software" gate is removed.** What replaced it:

> **TIF is a multiplier for revenue-producing initiatives and may advance in parallel when it
> directly supports Rachel, CRE, or TKO asset production.**

### Constraints REMOVED
- "Build TIF *after* the first paid assessment" — the revenue gate on the v0.1 spine.
- The blanket "not software" prohibition as applied to internal asset-production tooling.
- The DEFERRED label on the TIF v0.1 spine (Evidence Registry · Asset Opportunity Registry · Asset
  Composer · Traceability · Capture Inbox).

### Constraints RETAINED
- **≤3 active initiatives / ≤5 total portfolio.** Discipline unchanged.
- **Revenue-producing initiatives ship first.** TIF does not jump ahead of active revenue work; it
  consumes **excess** capacity only.
- **No client-facing platform / SaaS, ever.** TIF is internal tooling, never a sold product.
- **Speculative tail stays DEFERRED:** knowledge graph, vector search (pgvector), agent framework,
  generic platform infrastructure.
- **Human approval gate on every published asset** (`asset-production/METHOD.md` §7) — the engine
  drafts and surfaces; a person approves and ships. Nothing auto-publishes or auto-distributes.
- **No new standalone planning docs** (PORTFOLIO_GOVERNANCE rule); update the docs of record.

ACTIVE work (§2) still serves the same two outcomes: **a credible proof surface (A2)** and **a
first paid assessment (A1)** — now accelerated by the SANCTIONED-NEXT v0.1 spine (N1).

---

## 6. Operator Authorization — TIF↔RachelOS Integration (2026-06-30)

The operator has **lifted the build gate** that previously kept the cross-site TIF integration in
BACKLOG/DEFERRED/Discovery. Both repos may now **implement, enhance, and integrate** the TIF compose
boundary between `tko-site` and `rachel-realestate`.

### UNBLOCKED (authorized to build now)
- **TIF v0.3 Execution Layer — v0.1 scaffold** (EPIC 15): `Payload → Validation → Run → Draft →
  Response`. Built: `src/lib/tif/execution.ts`, `src/lib/tif/contract.ts`, and
  `POST /api/tif/compose` now returns `{ runId, draftId, status, … }`.
- **TKO↔Rachel compose contract** (`docs/TIF_RACHEL_DRAFT_API.md`): the stable request/response
  boundary; mirrored type contract in both repos (`src/lib/tif/contract.ts`).
- **RachelOS consumer client** (`rachel-realestate/src/lib/tif/client.ts`):
  `composeAssessmentReport`, `composeCommunityGuide`, `composeComparisonGuide`.
- **EPIC 14 Phase-1 page types** and the **Community-Match framework** may be built incrementally on
  top of this contract (community/comparison/relocation first).
- **EPIC 16 Fact Registry** may proceed when the composer needs a shared fact base.

### RETAINED (still binding — NOT lifted by this authorization)
- **≤3 active / ≤5 portfolio caps** and **revenue work ships first** — integration advances on
  excess capacity; this authorization does not raise the caps.
- **No client-facing SaaS / sold product, ever.** TIF stays internal tooling.
- **Speculative tail stays DEFERRED:** knowledge graph, vector search, agent framework, generic
  platform.
- **Human approval gate on every published asset** — TIF returns drafts only; nothing auto-publishes
  or auto-distributes. Downstream distribution (EPIC 17 / Roadmap Phases 6–7) stays DEFERRED.
- **RachelOS internals are protected:** no integration work touches RachelOS scoring, queue ranking,
  lifecycle, or relationship-state derivation (`rachel-realestate/CLAUDE.md` rules).
- **Boundary discipline:** TKO owns composition; Rachel owns saving/editing/review/approval/
  publishing (DEC-56). TIF never publishes, writes into `rachel-realestate`, sends outreach, or
  creates CRM records.

### NOT authorized by this entry
The **full Community Intelligence Assessment** build (scoring, widget, lead-automation wiring) still
requires its own operator approval + revenue validation per `rachel-realestate` DEC-49/DEC-57. This
entry authorizes the **integration boundary/scaffold**, not the end-to-end assessment product.
