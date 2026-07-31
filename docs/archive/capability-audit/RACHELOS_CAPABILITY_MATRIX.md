# RACHELOS_CAPABILITY_MATRIX.md
**Phase 2 — RachelOS implemented-capability inventory**
Repo: `rachel-realestate` (Next.js, Postgres via `@/lib/db`, Anthropic Claude). Audited: 2026-06-24.

> Evidence rule honored: only **implemented code, migrations, and deployed wiring** are counted. Planning docs (CLAUDE.md, README, docs/) were used only as a map, never as proof.

## Deployment / reality check (evidence it actually runs)
- **Deployed on Vercel** with a production cron: `vercel.json` → `/api/cron/run-all` daily at `0 11 * * *`.
- **Postgres data model:** 59 sequential SQL migrations (`migrations/001…059`).
- **AI is live, not stubbed:** `src/lib/ai/provider.ts` calls Anthropic (`claude-haiku-4-5-20251001`) via `callAIJson`; OpenAI/Ollama explicitly stubbed.
- **Scale of logic:** `src/lib/leads/` ≈ **19,700 LOC** of pure/business logic; **57 `*.test.ts`** files across the repo.
- **Operator UI shipped:** `src/app/ops/` (queue, today, needs-rachel, messaging, publishing, system-health, leads, content).
- **The code's own architecture mirrors the TKO framework 1:1:** Signals → Memory → Facts → State → Priority → Human Approval → Action. (`rie.ts`: "Facts are truth. Journey state is an interpretation.")

**Maturity legend:** `Production` (deployed + tested + cron/UI wired) · `Built` (implemented + tested, in-app) · `Partial` (implemented, thin coverage) · `Scaffolded` (present, not load-bearing).

---

| # | Capability | What it does | Proof (files) | Operational value | Maturity |
|---|---|---|---|---|---|
| 1 | **Lead / Relationship Intelligence Engine (RIE)** | Core spine: ingests human + AI updates, extracts facts, sets journey state, generates questions; human updates supersede AI. | `lib/leads/rie.ts`, `migrations/045_lead_facts.sql`, `046_lead_journey_state.sql`, `044_lead_questions.sql` | The "facts/state" engine the whole system rests on | **Production** |
| 2 | **Relationship Memory** | Persistent per-relationship snapshot: current situation, known facts, open questions, health, timeline of high-value events across sources. | `lib/leads/relationshipMemory.ts` (+ `.test`), `migrations/055_relationship_memory.sql`, `042_relationship_updates.sql` | Removes "knowledge trapped in one head" — the flagship narrative claim | **Production** |
| 3 | **Canonical Queue** | Single source-of-truth next-action per lead; ranks the whole book; freshness classes (Healthy/Aging/Stale/Critical); recalculated on every update. | `lib/leads/canonicalQueue.ts` (+ `canonicalQueueRows.test`, `queueReadModel.ts`), `app/ops/queue`, `app/api/ops/needs-rachel/queue` | The "one trusted next action" / morning queue | **Production** |
| 4 | **Daily Action Engine ("morning operating system")** | Composes ONE daily email: TODAY'S FOCUS, DO THESE TODAY (exact message + action buttons), NEXT UP. Never emails leads. | `lib/leads/dailyActionEngine.ts` (+ `.test`), `app/api/cron/daily-action`, `app/api/cron/run-all` | The daily executive digest / "what to do today" | **Production** |
| 5 | **Journey Intelligence** | Deterministic stage→recommendation mapping; out-of-service-area logic; facts override stage. | `lib/leads/journeyIntelligence.ts`, `journeyView.ts` (+ `.test`), `lifecycleState.ts`, `pipelineStage.ts` | Turns raw state into recommended content + actions | **Production** |
| 6 | **Qualification / Intelligence-Gap Engine** | Decides the single highest-value missing fact to ask next (buy-vs-rent, budget, timeline…), with freshness + confidence scoring. | `lib/leads/intelligenceGaps.ts`, `qualificationGaps.test.ts`, `nextMissingField.ts`, `guideFacts.ts` | "The system surfaces what it does NOT know" — proactive gap-closing | **Production** |
| 7 | **Outreach Drafting (approval-gated)** | AI drafts contextual outreach; copy-safety validation; lifecycle states (pending/sent/skipped/superseded/expired/failed); recalculates queue on send. | `lib/leads/outreachDrafts.ts` (+ `.test`), `draftMessageGenerator.ts`, `migrations/050_outreach_drafts.sql`, `054_draft_message_columns.sql`, `app/api/ops/outreach-send` | Human-approved AI — the defining "AI without losing control" proof | **Production** |
| 8 | **Human-Approval Surface ("Needs Rachel")** | Dedicated operator queue where drafts/recommendations wait for human review before anything goes out. | `app/ops/needs-rachel`, `app/api/ops/needs-rachel/queue`, `app/api/ops/relationship-updates` | The literal "human in the loop" control point | **Production** |
| 9 | **Unified Intake** | Normalizes all inbound (web forms, inbound email, SMS, guide downloads) into one lead model + job pipeline; dedupe on phone/email. | `lib/leads/intakeProcessing.ts` (+ `.test`), `createLead.ts`, `app/api/inbound-email`, `processLeadJobs.ts`, `migrations/006/007/022` (dedupe), `019_submission_tracking.sql` | One front door for every signal | **Production** |
| 10 | **Email Workflows + Drip** | Multi-track confirmation + nurture drips (buyer/seller/long-term), reliability/failsafe, open + engagement tracking, outbound policy. | `lib/email/**` (~30 templates), `lib/email/drip/*`, `lib/leads/processDrips.ts`, `app/api/cron/process-drips`, `migrations/020/021/031`, `emailEngagement.ts` | Automated nurture w/ deliverability discipline | **Production** |
| 11 | **SMS Workflows** | Twilio inbound/outbound, SMS sessions, consent fields, 10-min followup, SMS log. | `lib/sms/sendSms.ts`, `lib/leads/smsSession.ts`, `app/api/twilio/inbound`, `app/api/sms/followup-10min`, `migrations/005/018_sms_sessions/027` | Two-way conversational channel feeding the RIE | **Production** |
| 12 | **Content Recommendation** | Picks next best content (guide/area/dev) per lead from journey + facts. | `lib/leads/contentRecommendation.ts` (+ `.test`), used by `outreachDrafts.ts` | Personalized content as a relationship action | **Built** |
| 13 | **Intent / Scoring / Tiering** | Intent score, expected-value tier, attention tier, lead traits, classify lead, priority score. | `lib/leads/intentScore.ts`, `expectedValueTier.ts`, `attentionTier.ts`, `leadTraits.ts`, `classifyLead.ts`, `buildDecision.ts` (all `+.test`), `migrations/008_lead_priority`, `041_lead_score_snapshots` | Quantified prioritization beneath the queue | **Production** |
| 14 | **Referral Intelligence** | Detects + tracks referral-partner opportunities; surfaces "refer" as a canonical action. | `migrations/051_referral_partner_opportunity.sql`, `app/api/referral`, `app/agent-referral-partners`, referral handling in `canonicalQueue.ts`/`rie.ts` | Monetizes out-of-area / non-fit leads | **Built** |
| 15 | **Operator Workflows / Today view** | "Today's work," work items, queue sections, messaging center, recent outreach, freshness — the daily operator console. | `lib/ops/todaysWork.ts`, `workItems.ts`, `queueSections.ts`, `messagingCenter.ts`, `recentOutreach.ts`, `freshness.ts` (all `+.test`), `app/ops/today` | The operator's actual workspace | **Production** |
| 16 | **Operational Visibility / System Health** | System-health dashboard, smoke tests, cron-run tracking, ops alerts, failure logging. | `app/ops/system-health`, `lib/ops/runSmokeTest.ts`, `migrations/015_cron_runs`, `030_smoke_test_runs`, `024_system_failures`, `leadOpsAlerts.ts` | Self-monitoring / trust in the system | **Built** |
| 17 | **Guide Download Pipeline** | Gated guide downloads → attributed lead facts → intake → nurture. | `app/api/guide-download`, `lib/contentService/guides.ts`, `lib/leads/guideFacts.ts`, `migrations/059_guide_downloads_attribution.sql` | Lead-gen front end feeding the RIE | **Built** |
| 18 | **Reporting / Recovery / Outcomes** | Outcome resolution, recovery status, engagement summaries, lead score snapshots. | `lib/leads/outcomes.ts`, `recoveryStatus.ts`, `engagementSummary.ts` (all `+.test`) | Closes the measure-the-loop step | **Built** |
| 19 | **Content Ops / Publishing (marketing site)** | Content blocks, generation, sync, approval notes, publish/rollback, content-health admin. | `app/ops/publishing`, `app/api/ops/publishing/[id]/publish|rollback`, `lib/contentService.ts`, `migrations/032/034-040` | Programmatic SEO/content operations (adjacent, real) | **Built** |
| 20 | **Developer / Project Intelligence** | Developer intake + digest (a second vertical reusing the engine). | `lib/developerDigest.ts`, `app/admin/developer-intake`, `migrations/004_developer_intelligence.sql` | Proof the engine generalizes beyond one use | **Partial** |

---

## Capability → framework-stage map (proves the TKO category claim is real)

| TKO framework stage | RachelOS implementation |
|---|---|
| **Signals** | Unified intake, inbound email, Twilio SMS, web forms, guide downloads, email engagement |
| **Memory** | `relationshipMemory.ts`, `relationship_updates`, timeline of high-value events |
| **Facts** | `rie.ts` fact extraction, `lead_facts`, source-authority (human > AI) |
| **State** | `relationshipState.ts`, `journeyIntelligence.ts`, `lifecycleState.ts`, `pipelineStage.ts` |
| **Priority** | `buildDecision.ts`, `canonicalQueue.ts`, intent/attention/expected-value tiers |
| **Human Approval** | "Needs Rachel" queue, `outreachDrafts` pending state, copy-safety gate |
| **Action** | `dailyActionEngine`, outreach send, action-state engine (`migrations/016/017`) |
| **Outcome (loop)** | `outcomes.ts`, `recoveryStatus.ts`, score snapshots, cron re-run |

## Phase 2 conclusion
RachelOS is **not a CRM demo — it is a working, deployed Operational Intelligence System** that implements every stage of TKO's stated framework with real code, tests, a production cron, and an operator UI. The website massively underrepresents the specificity and depth of what exists here (see `TKO_ALIGNMENT_MATRIX.md`).
