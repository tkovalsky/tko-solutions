# RachelOS Evidence Library

**Purpose:** A structured inventory of every implemented RachelOS capability, mapped to
the code that proves it and the website/sales surfaces that should use it. This is the
primary proof asset for TKO's Tier 1 claim in [`CURRENT_REALITY.md`](../../../CURRENT_REALITY.md):
*RachelOS is a deployed Operational Knowledge System that converts fragmented signals
into governed action.*

**Source repo:** `rachel-realestate` (Next.js, Postgres via `@/lib/db`, Anthropic Claude).
**Deployment reality:** Vercel production cron `/api/cron/run-all` daily at `0 11 * * *`
(`vercel.json`); 59 sequential SQL migrations; ~20K LOC of decision logic in `src/lib/leads/`;
57 `*.test.ts` files; live Anthropic (`claude-haiku-4-5-20251001`) via `src/lib/ai/provider.ts`;
shipped operator UI under `src/app/ops/`.

**Evidence rule:** Only implemented code, migrations, and deployed wiring are cited as
proof. No revenue figures are claimed (deliberate — the honest non-claim is itself a
credibility asset for skeptical operator buyers). Screenshots are **required but not yet
captured**; this document specifies what to capture, it does not produce images.

**Framework spine (TKO):** `Signals → Memory → Facts → State → Priority → Recommendation → Human Approval → Action → Outcome`. Each capability below is tagged with the stage(s) it implements.

---

## Wave 1 required capability coverage

| Required capability | Library entry | What it proves | Screenshot required | Diagram required | Primary site use |
|---|---|---|---|---|---|
| Canonical Queue | #1 Canonical Queue | Priority can be computed into one trusted action list. | `/ops/queue` ranked list with freshness classes. | Signal → scoring → ranked queue → action. | Homepage RachelOS proof, Selected Work, Build page, sales deck, Assessment collateral. |
| Relationship Memory | #2 Relationship Memory | Institutional knowledge can live in a system instead of one person's head. | Relationship memory detail with situation, facts, open questions, and timeline. | Human API before/after: one head vs governed memory. | Homepage human-API proof, Selected Work, Assessment collateral. |
| Journey Intelligence | #4 Journey Intelligence | Facts can become state and recommended next step. | Journey/lifecycle state with derived recommendation. | Facts → state → recommendation. | Selected Work and Build page. |
| Human Approval | #6 Human-Approved AI ("Needs Rachel") | AI can draft or surface action while humans retain approval control. | `/ops/needs-rachel` pending review queue. | AI draft/recommendation → approval gate → action. | Homepage, all service pages, sales deck, Assessment collateral. |
| Daily Action Engine | #5 Daily Action Engine | Priority can become a daily execution artifact. | Rendered daily digest email. | Cron → queue/context → daily digest → operator action. | Homepage, Selected Work, sales deck, Assessment collateral. |
| Content Recommendation | #8 Content Recommendation | Facts and state can drive a specific recommended asset. | Recommended content in relationship context. | Facts + state → content selection → governed outreach. | Build page and supporting selected-work detail. |
| Intelligence Gaps | #10 Intelligence Gaps | The system can identify what it does not know and ask for the highest-value missing fact. | Intelligence-gap prompt in relationship context. | Known facts vs missing facts → next best question. | Homepage differentiator, Selected Work, sales deck, Assessment collateral. |

No screenshots or diagrams are produced in Wave 1. This library defines requirements only.

---

## How to read each entry

Every capability documents:

- **Capability** — the named subsystem
- **Framework stage** — where it sits on the TKO spine
- **What It Solves** — the operational pain it removes
- **Why It Exists** — the design intent
- **What It Demonstrates** — the TKO claim it proves
- **Supporting Evidence** — code references · documentation references · screenshots required
- **Visual Assets Required** — screenshot · diagram · workflow map · architecture graphic
- **Website Uses** — Homepage · Case Study · Service Pages · Sales Deck · Assessment PDF

---

## 1. Canonical Queue

- **Framework stage:** Priority → Action
- **What It Solves:** The morning no longer begins with reconstruction across four tools. One ranked, freshness-classified "who needs you now and why," recomputed on every signal.
- **Why It Exists:** A single source-of-truth next action per relationship is required so that prioritization is not re-derived by a human every day. Replaces scattered judgment with a recomputed ranking of the entire book.
- **What It Demonstrates:** TKO can build the **priority layer** — the system that converts a full book of relationships into one trusted, ordered action list.

**Supporting Evidence**

- Code references: `src/lib/leads/canonicalQueue.ts`, `src/lib/leads/canonicalQueueRows.test.ts`, `src/lib/leads/queueReadModel.ts`, `src/app/ops/queue`, `src/app/api/ops/needs-rachel/queue`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#3); `CURRENT_REALITY.md` Tier 1
- Screenshots required: the `/ops/queue` view showing ranked entries with freshness classes (Healthy / Aging / Stale / Critical)

**Visual Assets Required**

- Screenshot: ops queue, ranked with freshness badges
- Diagram: "every signal recomputes the queue" loop
- Workflow map: signal in → re-rank → top action surfaced
- Architecture graphic: queue as the convergence point of all scoring inputs

**Website Uses**

- Homepage: ✅ (headline proof — "one ranked list of who needs attention")
- Case Study: ✅ (centerpiece)
- Service Pages: ✅ (Decision Layer Build Sprint — prioritization model)
- Sales Deck: ✅
- Assessment PDF: ✅ (illustrates "trusted next action" outcome)

---

## 2. Relationship Memory

- **Framework stage:** Memory
- **What It Solves:** Knowledge trapped in one person's head. A persistent, timeline-based per-relationship snapshot — current situation, known facts, open questions, health, and high-value events across sources — that survives outside any individual.
- **Why It Exists:** Directly attacks the "human becomes the operating system" failure mode. Institutional memory must live in the system, not in Rachel.
- **What It Demonstrates:** TKO can build the **memory layer** — durable operational knowledge that does not depend on a person being available.

**Supporting Evidence**

- Code references: `src/lib/leads/relationshipMemory.ts` (+ `.test`), `migrations/055_relationship_memory.sql`, `migrations/042_relationship_updates.sql`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#2); the "human API" pattern in `CURRENT_REALITY.md`
- Screenshots required: relationship-memory view showing situation + facts + timeline of events

**Visual Assets Required**

- Screenshot: relationship memory detail (situation, known facts, open questions, timeline)
- Diagram: "knowledge in one head" vs "knowledge in the system" before/after
- Workflow map: multi-source events → durable per-relationship memory
- Architecture graphic: memory store fed by all signal channels

**Website Uses**

- Homepage: ✅ (the "human API" antidote)
- Case Study: ✅
- Service Pages: ✅ (Build Sprint — operational memory model)
- Sales Deck: ✅
- Assessment PDF: ✅ (maps to dependency-risk finding)

---

## 3. Lead Facts (Relationship Intelligence Engine)

- **Framework stage:** Facts (core spine — Signals → Memory → Facts → State)
- **What It Solves:** Unstructured notes, emails, and texts that never become reliable, queryable truth. The RIE ingests human + AI updates, extracts facts, sets journey state, and generates the next question — with human updates superseding AI.
- **Why It Exists:** "Facts are truth. Journey state is an interpretation." A governed fact layer with a source-authority model (human > AI) is the foundation the rest of the system rests on.
- **What It Demonstrates:** TKO can build a **governed fact layer with provenance and an authority model** — the buyer-grade differentiator behind trustworthy AI.

**Supporting Evidence**

- Code references: `src/lib/leads/rie.ts` (+ `.test`), `migrations/045_lead_facts.sql`, `migrations/046_lead_journey_state.sql`, `migrations/044_lead_questions.sql`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#1); framework "Facts" stage
- Screenshots required: a relationship's resolved facts with source attribution (human vs AI)

**Visual Assets Required**

- Screenshot: fact set with source/authority labels
- Diagram: authority model — human supersedes AI
- Workflow map: raw update → fact extraction → resolved fact
- Architecture graphic: RIE as the spine ingesting updates and emitting facts + state + questions

**Website Uses**

- Homepage: ➖ (supporting; concept stated, not headline)
- Case Study: ✅ (the governance/provenance story)
- Service Pages: ✅ (Build Sprint — fact model)
- Sales Deck: ✅ ("AI you can govern")
- Assessment PDF: ➖ (referenced in AI readiness section)

---

## 4. Journey Intelligence

- **Framework stage:** State
- **What It Solves:** Raw relationship state with no consistent interpretation. Deterministic stage→recommendation mapping (with out-of-service-area logic) where resolved facts override stage.
- **Why It Exists:** Turns interpreted state into recommended content and actions consistently, instead of relying on a person to "just know" the right next step.
- **What It Demonstrates:** TKO can build the **state layer** — turning facts into a current, interpretable position that drives recommendations.

**Supporting Evidence**

- Code references: `src/lib/leads/journeyIntelligence.ts`, `src/lib/leads/journeyView.ts` (+ `.test`), `src/lib/leads/lifecycleState.ts`, `src/lib/leads/pipelineStage.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#5); framework "State" stage
- Screenshots required: a relationship's journey/lifecycle state with the derived recommendation

**Visual Assets Required**

- Screenshot: journey state view with recommendation
- Diagram: stage → recommendation deterministic map (facts override stage)
- Workflow map: facts → state → recommended content/action
- Architecture graphic: state engine position between facts and priority

**Website Uses**

- Homepage: ➖
- Case Study: ✅
- Service Pages: ✅ (Build Sprint — state model)
- Sales Deck: ➖
- Assessment PDF: ➖

---

## 5. Daily Action Engine

- **Framework stage:** Action (operationalizes Priority)
- **What It Solves:** No single artifact that tells the operator what to do today. Composes ONE daily email — TODAY'S FOCUS, DO THESE TODAY (exact message + action buttons), NEXT UP. Never emails the leads themselves.
- **Why It Exists:** The whole book must be operationalized into a single morning digest so execution does not depend on the operator assembling it manually. Wired to a production cron.
- **What It Demonstrates:** TKO can build the **action layer** — "one email a day that runs the business," deployed and running on a daily cadence.

**Supporting Evidence**

- Code references: `src/lib/leads/dailyActionEngine.ts` (+ `.test`), `src/app/api/cron/daily-action`, `src/app/api/cron/run-all`, `vercel.json` (`0 11 * * *`)
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#4); `CURRENT_REALITY.md` Tier 1 (Daily Action Engine)
- Screenshots required: the rendered daily digest email (focus / do-these-today / next-up sections)

**Visual Assets Required**

- Screenshot: daily digest email
- Diagram: cron → compose digest → operator inbox (never to leads)
- Workflow map: queue + state → digest sections
- Architecture graphic: deployed daily cadence (Vercel cron)

**Website Uses**

- Homepage: ✅ ("deployed, runs daily" headline proof)
- Case Study: ✅ (centerpiece alongside the queue)
- Service Pages: ✅ (Build Sprint — workflow orchestration)
- Sales Deck: ✅
- Assessment PDF: ✅

---

## 6. Human-Approved AI ("Needs Rachel")

- **Framework stage:** Human Approval
- **What It Solves:** AI that acts without control. A dedicated operator queue where AI drafts and recommendations wait for human review before anything is sent.
- **Why It Exists:** In any regulated or relationship-sensitive operation, AI must stay governed and human-approved. This is the literal human-in-the-loop control point.
- **What It Demonstrates:** TKO's defining differentiator — **AI that drafts and surfaces; people approve and act.** Provably enforced in code, not promised in a deck.

**Supporting Evidence**

- Code references: `src/app/ops/needs-rachel`, `src/app/api/ops/needs-rachel/queue`, `src/app/api/ops/relationship-updates`; approval-gated states in `src/lib/leads/outreachDrafts.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#8); `CURRENT_REALITY.md` (Human-Approved AI)
- Screenshots required: the "Needs Rachel" approval surface with pending drafts awaiting review

**Visual Assets Required**

- Screenshot: "Needs Rachel" approval queue
- Diagram: AI drafts → approval gate → action (nothing sends unapproved)
- Workflow map: recommendation/draft → human review → send/skip
- Architecture graphic: approval as a mandatory gate on the action path

**Website Uses**

- Homepage: ✅ (lead differentiator)
- Case Study: ✅
- Service Pages: ✅ (all offers — human approval model)
- Sales Deck: ✅ (the "AI-assisted, human-approved" headline)
- Assessment PDF: ✅ (AI readiness / governance)

---

## 7. Outreach Intelligence (Approval-Gated Drafting)

- **Framework stage:** Recommendation → Human Approval → Action
- **What It Solves:** Generic or absent follow-up. AI drafts contextual outreach with copy-safety validation and an explicit lifecycle (pending / sent / skipped / superseded / expired / failed); the queue recalculates on send.
- **Why It Exists:** Drafting must be context-aware and safe, and every send must be a governed state transition — not an ad-hoc message.
- **What It Demonstrates:** TKO can build **AI recommendation with built-in safety and lifecycle governance**, closing the loop back into the queue.

**Supporting Evidence**

- Code references: `src/lib/leads/outreachDrafts.ts` (+ `.test`), `src/lib/leads/draftMessageGenerator.ts`, `migrations/050_outreach_drafts.sql`, `migrations/054_draft_message_columns.sql`, `src/app/api/ops/outreach-send`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#7)
- Screenshots required: an outreach draft with its lifecycle state and copy-safety indication

**Visual Assets Required**

- Screenshot: outreach draft detail with state + safety check
- Diagram: draft lifecycle state machine
- Workflow map: context → draft → safety check → approval → send → re-rank
- Architecture graphic: outreach as governed recommendation feeding action

**Website Uses**

- Homepage: ➖ (folds under Human-Approved AI)
- Case Study: ✅
- Service Pages: ✅ (Build Sprint — human approval model)
- Sales Deck: ✅
- Assessment PDF: ➖

---

## 8. Content Recommendation

- **Framework stage:** Recommendation
- **What It Solves:** Deciding what to send. Picks the next-best content (guide / area / development) per relationship from journey state + facts.
- **Why It Exists:** Personalized content is a relationship action, not a marketing blast — it should be derived from the same facts and state as every other recommendation.
- **What It Demonstrates:** TKO can turn **facts + state into a specific, personalized next asset** — content as a governed recommendation.

**Supporting Evidence**

- Code references: `src/lib/leads/contentRecommendation.ts` (+ `.test`); consumed by `src/lib/leads/outreachDrafts.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#12)
- Screenshots required: a recommended content item shown in context of a relationship

**Visual Assets Required**

- Screenshot: content recommendation in relationship context
- Diagram: facts + state → content selection
- Workflow map: recommendation → outreach draft
- Architecture graphic: content engine as one recommendation source among several

**Website Uses**

- Homepage: ➖
- Case Study: ➖ (supporting detail)
- Service Pages: ✅ (secondary capability — content intelligence)
- Sales Deck: ➖
- Assessment PDF: ➖

---

## 9. Referral Intelligence

- **Framework stage:** Priority / Recommendation
- **What It Solves:** Out-of-area or non-fit relationships that are dropped instead of monetized. Detects and tracks referral-partner opportunities and surfaces "refer" as a canonical action.
- **Why It Exists:** Value should not leak when a relationship is not a direct fit — the system should route it to a partner as a first-class action.
- **What It Demonstrates:** TKO builds systems that **capture value at the edges of the workflow**, not just the happy path — relevant to PE/ops buyers focused on leakage.

**Supporting Evidence**

- Code references: `migrations/051_referral_partner_opportunity.sql`, `src/app/api/referral`, `src/app/agent-referral-partners`; referral handling in `src/lib/leads/canonicalQueue.ts` and `src/lib/leads/rie.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#14); `TKO_ALIGNMENT_MATRIX.md` (referral = Missing on site)
- Screenshots required: a referral opportunity surfaced as a canonical action

**Visual Assets Required**

- Screenshot: referral action in the queue
- Diagram: non-fit detection → referral action
- Workflow map: out-of-area signal → referral opportunity → partner routing
- Architecture graphic: referral as a branch off the priority layer

**Website Uses**

- Homepage: ➖
- Case Study: ➖ (supporting)
- Service Pages: ✅ (capability bullet — value-leakage relevant to PE/ops)
- Sales Deck: ✅ (PE/ops audience)
- Assessment PDF: ➖

---

## 10. Intelligence Gaps

- **Framework stage:** Facts (proactive gap-closing)
- **What It Solves:** Operating on incomplete information without knowing it. The system decides the single highest-value missing fact to ask next (buy-vs-rent, budget, timeline…), scored by freshness + confidence.
- **Why It Exists:** A trustworthy system should surface what it does **not** know and proactively close the most valuable gap — rather than silently guessing.
- **What It Demonstrates:** A rare, memorable differentiator — **"the system that knows its blind spots."** Few systems surface their own ignorance and prioritize closing it.

**Supporting Evidence**

- Code references: `src/lib/leads/intelligenceGaps.ts`, `src/lib/leads/qualificationGaps.test.ts`, `src/lib/leads/nextMissingField.ts`, `src/lib/leads/guideFacts.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#6); `CASE_STUDY_GAP_ANALYSIS.md` (rare differentiator, under-sold)
- Screenshots required: the next highest-value missing fact prompted for a relationship

**Visual Assets Required**

- Screenshot: intelligence-gap prompt ("ask this next")
- Diagram: known facts vs missing facts → highest-value question
- Workflow map: gap detection → question generation → fact capture
- Architecture graphic: gap engine feeding the fact layer

**Website Uses**

- Homepage: ✅ (memorable differentiator — "knows its blind spots")
- Case Study: ✅ (promote to a named feature/insight)
- Service Pages: ✅ (Build Sprint — fact/gap model)
- Sales Deck: ✅
- Assessment PDF: ✅ (maps to "AI readiness / what you don't know" framing)

---

## 11. Operational Visibility (System Health)

- **Framework stage:** Outcome (close the loop) / cross-cutting
- **What It Solves:** No way to trust that the system itself is running. A system-health dashboard, smoke tests, cron-run tracking, ops alerts, and failure logging.
- **Why It Exists:** A governed operating system must be self-monitoring — execution trust requires visibility into the system's own health.
- **What It Demonstrates:** TKO builds **self-monitoring operational systems**, not unobservable black boxes — proof of "trusted execution."

**Supporting Evidence**

- Code references: `src/app/ops/system-health`, `src/lib/ops/runSmokeTest.ts`, `migrations/015_cron_runs.sql`, `migrations/030_smoke_test_runs.sql`, `migrations/024_system_failures.sql`, `src/lib/leads/leadOpsAlerts.ts`
- Documentation references: `RACHELOS_CAPABILITY_MATRIX.md` (#16)
- Screenshots required: the system-health dashboard with cron runs and smoke-test status

**Visual Assets Required**

- Screenshot: system-health dashboard
- Diagram: self-monitoring loop (run → record → alert)
- Workflow map: cron run → smoke test → health status → alert
- Architecture graphic: observability layer wrapping the operating system

**Website Uses**

- Homepage: ➖
- Case Study: ✅ (proves "trusted execution," not a separate SKU)
- Service Pages: ✅ (Build Sprint — operational dashboard; Fractional — governance)
- Sales Deck: ✅
- Assessment PDF: ✅ (operational risk / visibility)

---

## Capability → framework-stage coverage

| TKO stage | Capabilities proving it |
|---|---|
| Signals | (intake feeds all; see RACHELOS_CAPABILITY_MATRIX #9–11, #17) |
| Memory | Relationship Memory (#2) |
| Facts | Lead Facts / RIE (#3), Intelligence Gaps (#10) |
| State | Journey Intelligence (#4) |
| Priority | Canonical Queue (#1), Referral Intelligence (#9) |
| Recommendation | Outreach Intelligence (#7), Content Recommendation (#8) |
| Human Approval | Human-Approved AI / "Needs Rachel" (#6) |
| Action | Daily Action Engine (#5) |
| Outcome | Operational Visibility (#11) |

Every stage of the TKO framework spine has at least one deployed, code-backed RachelOS
capability behind it. This is the core "the category is real" proof.

---

## Screenshot capture backlog (consolidated)

All screenshots are **required and not yet captured.** Capture from the deployed
`rachel-realestate` ops UI (`src/app/ops/*`). Priority order for marketing weight:

1. `/ops/queue` — Canonical Queue with freshness classes
2. Daily digest email — Daily Action Engine output
3. `/ops/needs-rachel` — Human approval surface
4. Relationship memory detail — Memory + timeline
5. Intelligence-gap prompt — "ask this next"
6. `/ops/system-health` — Operational visibility
7. Outreach draft detail — lifecycle + copy-safety
8. Journey/lifecycle state with recommendation
9. Lead facts with source-authority labels
10. Referral action in queue
11. Content recommendation in context

See [`../../../VISUAL_ASSET_MASTER_PLAN.md`](../../../VISUAL_ASSET_MASTER_PLAN.md) for full
visual-asset specifications (purpose, audience, destination, required inputs).
