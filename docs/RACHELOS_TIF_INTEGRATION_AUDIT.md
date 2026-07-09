# RachelOS + TIF Operational Integration Audit

**Role:** Principal Architect (audit / recommend / package — no code changed to produce this)
**Date:** 2026-07-07
**Scope:** Make TIF operational inside the existing ecosystem to drive Rachel's transactions.
Ignores GitHub Apps, marketplace, multi-tenant, OAuth, installations.
**Evidence base:** `tko-site` (TIF) + `rachel-realestate` (RachelOS), cited inline by file.

---

## 0. The one-sentence finding

RachelOS already manufactures rich relationship intelligence every day (questions, objections,
facts, journey signals) and TIF already has a working Evidence→Opportunity→Asset spine — **but the
two are not wired in the direction that produces revenue.** The only cross-repo connection points
the wrong way (Rachel *pulls* draft content from TIF) and is a stateless stub. The highest-leverage
move is a thin, one-way, read-only **Opportunity Feeder** that turns the questions leads actually ask
into content opportunities.

---

## 1. Current Reality

### 1a. TIF (`tko-site`) — what physically exists

| Component | Evidence | Real? |
|---|---|---|
| Evidence Registry | `prisma/schema.prisma:124` `Evidence` | ✅ table live (Neon) |
| Asset Opportunity Registry | `schema.prisma:142` `AssetOpportunity` | ✅ live |
| Asset + traceability | `schema.prisma:169` `Asset`, `:191` `AssetEvidence` | ✅ live |
| Asset Composer | `scripts/tif/compose-asset.mjs` | ✅ **template-fill only, no AI** |
| Capture Inbox | `schema.prisma:61` `CaptureItem`, `/tif/inbox` | ✅ live, capture-only (no edit endpoint) |
| Content Inventory (156 items) | `schema.prisma:105` `ContentInventoryItem`, `/tif/inventory` | ✅ read-only awareness |
| Inbound Lead capture | `schema.prisma:83` `InboundLead`, `src/lib/leads/persist.ts` | ✅ website forms only |
| Deliverables read model | `src/lib/tif/deliverables.ts`, `/tif/deliverables` | ✅ deterministic, read-only |
| Operator Console | `/tif`, `/tif/proof/*` | ✅ read-only visibility |
| `POST /api/tif/compose` (Rachel draft API) | `src/app/api/tif/compose/route.ts` → `runCompose` (`src/lib/tif/execution.ts:29`) | ⚠️ **stateless template stub** |

### 1b. The critical structural fact

There are **two TIF "composers" that never touch each other**:

1. **DB spine composer** (`scripts/tif/compose-asset.mjs`) — reads `AssetOpportunity` + linked
   `Evidence` from the DB, fills a markdown template, writes an `Asset` + `AssetEvidence` trace.
   Fed **manually** by `scripts/tif/seed.mjs`.
2. **API composer** (`runCompose` → `composeRachelDraft`) — a pure function over a JSON `inputs`
   payload. It **never reads the Evidence/Opportunity DB, never reads any RachelOS lead, never
   persists** (`execution.ts:14` — "identifiers are NOT yet persisted"). It proves a contract
   *shape*, not a data flow.

So TIF's "registry" and TIF's "API" are disconnected, and neither is fed by RachelOS.

### 1c. RachelOS (`rachel-realestate`) — the signal-rich system

RachelOS is **live in production** and far more mature than TIF. Relevant to opportunity generation
(`docs/CURRENT_REALITY.md`):

| RachelOS capability | Status | Evidence |
|---|---|---|
| RIE (Relationship Intelligence Engine) Phase 1 | ✅ LIVE in prod | `CURRENT_REALITY.md:92,139` |
| `lead_facts` (authored qualification) | ✅ live | `:149` |
| `lead_questions` (open intelligence gaps) | ✅ live | `:148` |
| `relationship_updates` (append-only narrative) | ✅ live | `DOMAIN_MODEL.md` |
| Journey state / lifecycle | ✅ live | `:22,167` |
| Canonical Queue (deterministic next action) | ✅ live | `:95` |
| Daily Action Engine / Digest | ✅ operational, 16/16 green | `:90` |
| "Needs Rachel" mobile workflow | ✅ COMPLETE | `:211` |
| Next Content (`recommendNextContentForLead`) | ✅ COMPLETE | `:210` |
| Next Question (gap-driven generation) | ✅ COMPLETE | `:209` |
| Outreach Drafts (RNIE) | ✅ built, **GATED off** (`ENABLE_OUTREACH_DRAFTS` unset) | `:159` |
| Referral Intelligence | ✅ live | `:94` |
| Inbound SMS/email → RIE capture | ✅ SMS live; lead-reply email **dormant** (Resend Receiving not configured) | `:14,180` |

RachelOS already treats TIF as a **downstream content generator** (`CURRENT_REALITY.md:378`,
ratified DEC-56): "RachelOS is a **consumer** of TIF outputs, not a generator of them."

### 1d. Stage-by-stage current state

```
Lead Intelligence → Opportunity → Brief → Asset → Draft → Publish
```

| Stage | State | Evidence |
|---|---|---|
| **Lead Intelligence** | ✅ **Works, rich, live** — but trapped in `rachel-realestate` DB | RIE tables |
| **Opportunity** | ⚠️ Exists as a table, **fed by hand** (`seed.mjs`); no signal ingestion | `AssetOpportunity`, `seed.mjs` |
| **Brief** | ❌ **Missing** — no Brief object. `angle`/`audience` on `AssetOpportunity` is the closest thing | `schema.prisma:142` |
| **Asset** | ✅ Composer runs, template-fill only; human/Claude does the real drafting | `compose-asset.mjs`, `asset-production/METHOD.md` |
| **Draft** | ⚠️ Two paths: DB assets (markdown on disk) + stub API drafts (not persisted) | above |
| **Publish** | ❌ No publish workflow implemented (statuses modeled, not wired) | `schema.prisma:32` |

---

## 2. What Is Working (evidence-based)

- **RachelOS relationship capture** — leads' questions, facts, journey, and outcomes are captured
  deterministically and drive a live canonical queue and digest (`CURRENT_REALITY.md:90,92,95`).
- **TIF traceability spine** — every `Asset` cites the `Evidence` it came from; the join is
  enforced (composer refuses to run with zero evidence, `compose-asset.mjs:44`). This is the part
  of TIF worth keeping and building on.
- **The manual method is real** — `asset-production/METHOD.md` is how assets are actually made today
  (`Observation → Evidence → Finding → Recommendation → Asset` with a hard human gate).
- **Capture Inbox** — a working, low-friction intake surface (`/tif/inbox`) that already models the
  exact "raw signal → promote to Evidence" flow an integration needs.

## 3. What Is Not Working (evidence-based)

1. **No intelligence flows from RachelOS into TIF.** The richest opportunity source in the ecosystem
   (`lead_questions`, `relationship_updates`, inbound conversations) has **zero** path into TIF's
   Opportunity registry. Opportunities are typed in by hand (`seed.mjs`).
2. **The one cross-repo API is a stub pointed the wrong way.** `runCompose` doesn't read leads,
   doesn't read the registry, doesn't persist (`execution.ts:14`). It generates content *out* to
   Rachel; it does not pull intelligence *in*.
3. **No Brief stage.** The pipeline the brief names (`Opportunity → Brief → Asset`) has no Brief
   object — the composer jumps opportunity→asset with a single `angle` line.
4. **No publish loop, no measurement loop.** Assets die as markdown on disk. Nothing tracks whether a
   published asset produced a conversation, tour, or agreement — so "work backwards from
   transactions" is currently impossible to measure.
5. **RNIE outreach drafts are built but switched off** (`ENABLE_OUTREACH_DRAFTS` unset) — a
   revenue-adjacent capability sitting idle behind a flag.

## 4. Hidden Opportunities (already present, unused)

- **`lead_questions` is a free content backlog.** Every open question a real buyer asked is a
  ranked, demand-validated content brief. Recurring questions = your highest-ROI guides. Nobody has
  to guess topics.
- **`relationship_updates` + inbound SMS/email = objection library.** The exact objections Rachel
  answers by hand are reusable asset seeds and next-touch copy.
- **`recommendNextContentForLead` already maps state→content need** (`CURRENT_REALITY.md:210`). Its
  *gaps* (a lead needs content that doesn't exist yet) are the single best-targeted opportunities in
  the system — content with a buyer already waiting for it.
- **The Capture Inbox already is the ingestion surface.** An integration doesn't need a new UI or
  table — it needs a feeder that writes `CaptureItem` rows.
- **Referral + journey signals** identify *who* to hand a finished asset to the moment it exists —
  closing the loop from asset back to conversation.

---

## 5. Recommended Operating Model

**One-way, read-only intelligence flow. Rachel stays the source of truth; TIF stays the factory.**

```
RachelOS (source of truth)                     TIF (factory)
─────────────────────────                      ─────────────
lead_questions ─┐
relationship_updates ├─►  Opportunity Feeder ──►  CaptureItem (inbox)
next-content gaps ─┘        (read-only export)     │  ← operator triages
                                                   ▼
                                          Evidence → Opportunity → Asset
                                                   │
                                                   ▼  (existing stub, later real)
                                     POST /api/tif/compose ──► Rachel publishes
                                                   │
                                                   ▼
                                     Published guide answers the exact question
                                                   │
                                                   ▼
                              Rachel next-touch: "I wrote this for you" → conversation
```

Principles:
- **Never write into `rachel-realestate` from TIF.** Read-only export or a read replica / SQL view.
- **Reuse the Capture Inbox** as the human triage gate. No new operator surface.
- **Human promotes** CaptureItem → Evidence → Opportunity. No auto-generation of assets.
- **Rank opportunities by frequency × journey-stage value** (a question 8 hot leads asked outranks a
  one-off).

---

## 6. Simplification Plan (KEEP / MERGE / REMOVE / DERIVE)

| System | Verdict | Rationale |
|---|---|---|
| TIF Evidence→Opportunity→Asset + traceability | **KEEP** | The durable spine; only real asset infra. |
| Capture Inbox | **KEEP** (and make it the integration seam) | Already the right shape. |
| `runCompose` / `/api/tif/compose` stub | **KEEP but re-scope** | Fine as Rachel's draft contract; stop treating it as "integration." Do not persist it yet. |
| Two disconnected composers | **MERGE (eventually)** | One composer contract; not MVP. |
| TIF "Brief" concept | **DERIVE**, don't build | Represent a brief as an `AssetOpportunity` + its linked Evidence + `angle`/`audience`. No new table. |
| Deliverables + Channel-Package readiness read models | **KEEP** | Read-only, cheap, already shipped. |
| Speculative tail (graph, vectors, agents, generic platform) | **REMOVE from scope** | Stays DEFERRED per `GOVERNANCE.md`. |
| RNIE outreach drafts (Rachel) | **KEEP, decide the flag** | Built; the question is operator activation, not more code. |

Net: the integration **adds one script and reuses one table**. Complexity does not go up.

---

## 7. Minimum Viable Integration Plan (the smallest thing that creates value)

**"Opportunity Feeder v0" — a read-only cron/script that turns recurring lead questions into TIF
CaptureItems.**

- Read (read-only) from RachelOS: `lead_questions` (open, grouped/normalized) joined to
  `lead_journey_state` for stage-value weighting. Optionally `relationship_updates` for objections.
- Aggregate by normalized question text; keep only questions asked by ≥N leads **or** by ≥1
  high-readiness lead.
- For each surviving cluster, upsert a TIF `CaptureItem` (`source = rachel`, `businessUnit = rachel`,
  `status = inbox`, `observation` = the question + lead count + stages).
- Operator opens `/tif/inbox`, promotes the good ones to `Evidence` → creates an `AssetOpportunity`,
  runs the existing composer, hands the draft to Rachel.

Why this is the MVP: **zero schema change, zero new service, one new script, reuses the Inbox and the
whole existing spine.** It makes the daily flow real end-to-end and immediately answers "what should I
write next?" with demand-validated topics.

---

## 8. Phased Roadmap (1–3 day increments)

- **Phase 1 (1–2 days) — Opportunity Feeder v0.** The MVP in §7. Read-only export → CaptureItem.
  Deterministic aggregation, no AI. *Ship this first.*
- **Phase 2 (1 day) — Ranking + dedup.** Add frequency × stage-value score to CaptureItems; suppress
  ones already promoted (reuse `promotedToEvidenceId`). Operator sees a ranked backlog.
- **Phase 3 (2 days) — Objection + next-content-gap sources.** Extend the feeder to
  `relationship_updates` objections and `recommendNextContentForLead` gaps (content a real lead needs
  that doesn't exist).
- **Phase 4 (2–3 days) — Measurement loop.** Tag published assets with the `lead_questions`/leads they
  answer; surface "asset → leads waiting for it" so Rachel can do the next-touch. This is where
  transactions get attributed.
- **Phase 5 (decision, not code) — Activate RNIE outreach drafts** for the leads whose questions a new
  asset just answered. Operator flag `ENABLE_OUTREACH_DRAFTS`.

Each phase is independently shippable and independently valuable. Stop after any phase if capacity is
needed for revenue work (governance ≤3 active).

---

## 9. 30-Day Success Metrics (business, not vanity)

- **Opportunities from real demand:** ≥15 TIF Opportunities created from RachelOS-sourced
  CaptureItems (vs. hand-typed).
- **Assets published against real questions:** ≥5 assets that each answer a question ≥2 real leads
  asked.
- **Next-touch conversations:** ≥10 lead touches where Rachel sends an asset that answers that lead's
  own logged question ("I made this for you").
- **Cycle time:** median question-logged → asset-drafted < 7 days.
- **Attribution proof:** ≥1 tour or agreement traceable to an asset that answered a logged question.
- *(Explicitly NOT measured: page views, traffic, social — per `CURRENT_REALITY.md` "Do Not Measure".)*

---

## 10. Top 10 Highest-Leverage Actions (ranked)

Ranked by Revenue Impact (R), Learning (L), Effort (E, lower=better), Strategic Leverage (S).

| # | Action | R | L | E | S |
|---|---|---|---|---|---|
| 1 | **Opportunity Feeder v0** — `lead_questions` → TIF CaptureItem (§7) | ●●●● | ●●●● | low | ●●●● |
| 2 | **Next-touch loop** — hand each finished asset back to the leads who asked | ●●●●● | ●●● | med | ●●●● |
| 3 | **Rank opportunities by frequency × readiness** so Rachel writes the right thing first | ●●●● | ●●●● | low | ●●● |
| 4 | **Objection library** from `relationship_updates` → CaptureItems | ●●●● | ●●●● | med | ●●● |
| 5 | **Activate RNIE outreach drafts** (flip `ENABLE_OUTREACH_DRAFTS`, monitor) | ●●●● | ●●● | trivial | ●●● |
| 6 | **Measurement/attribution** — asset ↔ question ↔ lead ↔ outcome (§8 P4) | ●●●●● | ●●●●● | med | ●●●● |
| 7 | **Next-content-gap feeder** — content a real lead needs that doesn't exist | ●●●● | ●●● | med | ●●●● |
| 8 | **Make `/api/tif/compose` real** (read Opportunity+Evidence, persist Run/Draft) | ●●● | ●● | med | ●●● |
| 9 | **Retire duplicate composer path** — one composer contract | ●● | ●● | med | ●●● |
| 10 | **Configure Resend Receiving** in Rachel so inbound lead replies feed RIE (unlocks a whole new signal source for #1/#4) | ●●● | ●●● | low(ops) | ●●● |

---

## Codex Implementation Package — Action #1 (Opportunity Feeder v0)

### Objective
Turn recurring RachelOS lead questions into TIF `CaptureItem` rows so the operator can triage
demand-validated content opportunities in the existing `/tif/inbox`.

### Scope
Read-only ingestion only. No schema change. No writes to `rachel-realestate`. No AI. No auto-promotion
to Evidence/Opportunity/Asset. No publishing.

### Files To Modify / Add
- **Add** `scripts/tif/feed-from-rachel.mjs` (new script; mirrors `scripts/tif/inventory-scan.mjs`
  structure and the `PrismaPg` connection pattern in `compose-asset.mjs:10`).
- **Add** `package.json` script `"tif:feed": "node --env-file=.env.local scripts/tif/feed-from-rachel.mjs"`.
- **Add** `.env.local` var `RACHEL_DATABASE_URL` (read-only connection string / replica).
- **Add** `scripts/tif/feed-from-rachel.test.mjs` (aggregation unit test with fixture rows).

### Files To Avoid
- `prisma/schema.prisma` (no schema change — reuse `CaptureItem`).
- `src/lib/tif/execution.ts`, `draft-composer.ts`, `src/app/api/tif/compose/*` (unrelated stub).
- Anything under `rachel-realestate/` (read-only; do not write).

### Implementation Steps
1. Connect to `RACHEL_DATABASE_URL` (read-only pg client — raw SQL, not Rachel's Prisma client).
2. Query open `lead_questions` joined to `lead_journey_state`; select question text, lead id, stage.
   Exclude answered/closed questions.
3. Normalize question text (lowercase, trim, collapse whitespace) and cluster by normalized key.
4. Keep clusters where `distinct lead count ≥ 2` **OR** any lead is in a high-readiness stage
   (parameterize the stage list; do not hardcode Rachel's lifecycle logic).
5. For each surviving cluster, upsert a TIF `CaptureItem` via TIF's Prisma client:
   `slug = "rachel-q-" + hash(normalizedKey)`, `title` = representative question,
   `observation` = question + `"asked by N leads; stages: [...]"`, `source = "rachel"`,
   `businessUnit = "rachel"`, `status = "inbox"`, `tags = ["lead-question"]`.
   Upsert on `slug` so re-runs are idempotent and don't duplicate.
6. Skip clusters whose `CaptureItem` already has `status` in (`promoted`,`archived`) — never resurrect
   triaged items.
7. Log a summary (`N clusters, M new, K skipped`).

### Test Plan
- Unit: feed fixture question rows → assert clustering, the ≥2/high-readiness filter, idempotent
  upsert (second run creates 0 new), and that `promoted`/`archived` slugs are skipped.
- Integration (manual, staging): run `npm run tif:feed` against a read-only Rachel replica; confirm
  new rows appear in `/tif/inbox` and none appear in `rachel-realestate`.
- Regression: `npm test` (existing TIF tests) stays green; no migration diff (`npm run tif:migrate:status`).

### Acceptance Criteria
- Running `npm run tif:feed` populates `/tif/inbox` with clustered, deduped lead-question CaptureItems.
- Re-running is idempotent (0 new on unchanged data).
- Zero writes to `rachel-realestate` (verify via read-only credential).
- No schema migration produced.
- Operator can promote an item to Evidence and run the existing composer unchanged.

### Validation / Rollback / Regression Risk
- **Validation:** row counts + `/tif/inbox` render; the read-only credential is the hard safety gate.
- **Rollback:** delete the script + package script; `CaptureItem` rows are inert (delete `source='rachel'`
  inbox rows if desired). No schema to revert.
- **Regression risk:** near-zero — additive script, no shared runtime code, no schema change. Only live
  risk is DB credentials; mitigate with a read-only role.

---

### STOP
Per CLAUDE.md operating mode: analysis + Codex package delivered. No code implemented. Awaiting
explicit instruction to proceed.
