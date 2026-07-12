# RachelOS Capability Timeline — Repository Forensics

**Evidence basis:** `rachel-realestate` git history (1,528 commits, 2025-09-30 → 2026-07-11, single committer: Todd Kovalsky), migration file creation dates, module creation dates (`git log --diff-filter=A --follow`), `docs/DECISIONS.md` (83 numbered decisions + earlier entries), `docs/CURRENT_STATE.md` (authoritative 2026-07-11).
**Rule applied:** milestones, not commit dumps. Every date below is a verified file-creation or decision date.

## Commit cadence (verified via `git log --format='%ad' | sort | uniq -c`)

| Month | Commits | Dominant work |
|---|---:|---|
| 2025-09 | 2 | Repo init (Create Next App) |
| 2025-10 | 270 | Public site, branding pivot, guides, forms |
| 2025-11 | 242 | Content system, SEO surfaces, design system |
| 2025-12 | 168 | RSC architecture cleanup, production build hardening |
| 2026-01 | 112 | Acquisition/funnel iteration, paid-traffic handling |
| 2026-02 | 75 | Content + SEO consolidation |
| 2026-03 | 175 | **Lead database era begins** (migrations 001+, cron) |
| 2026-04 | 171 | Conversations, daily execution engine, AI provider |
| 2026-05 | 98 | Ops stabilization, smoke tests, content ops, governance (DECISIONS.md) |
| 2026-06 | 120 | Relationship Intelligence, canonical queue, RachelOS shell, outreach drafts |
| 2026-07 | 95 (through 07-11) | Behavioral layer, publishing, RDE Phase 1, pipeline visibility |

Total churn: ~455,800 lines added / ~172,900 deleted (`git log --numstat`). The deletion volume is itself evidence: roughly 38% of everything written was later removed or replaced — sustained refactoring, not accretion.

## Era 1 — Public acquisition site (2025-09-30 → 2026-02)

- **2025-09-30** — `git:c2799f41` Initial commit; `file:src/app/api/contact/route.ts` exists from day one (contact capture predates everything else).
- **2025-10-13** — `git` "v1: Rachel site working locally": pivot to the Rachel Delray real-estate business (repo briefly carried AtlanticHomeWatch branding on 2025-10-01 — the repo predates the final business focus).
- **Oct 2025 – Feb 2026** — ~870 commits building the public system: guide library (65 published guide files today), area/neighborhood/development pages, unified contact forms, share/newsletter surfaces, SEO templates, paid-traffic (Meta/Reddit) handling. This is the demand-capture foundation the operator system later monetizes.
- **2025-10-26** — `file:vercel.json` created (deployment configuration under version control from month one).

## Era 2 — Lead persistence and daily execution (2026-03 → 2026-04)

- **2026-03-05** — `file:migrations/001_lead_interactions.sql`: first migration. Leads move from form-to-email into a governed Postgres (Neon) schema. Migrations 001–011 in March: uniform logging, test mode, dedupe (email+phone), priority, follow-up fields, activities (append-only per decision:"append-only lead_activities"), assets/indexes.
- **2026-03-10** — first cron work ("cron jobs to daily for vercel hobby plan") — scheduling constraints handled inside platform limits rather than new infrastructure (decision:"No queue infrastructure — Vercel cron is the queue").
- **2026-04-02** — `file:migrations/012_conversations_and_messages.sql`: two-way communication becomes data.
- **2026-04-06** — `file:migrations/016_daily_execution_engine.sql` + `file:src/lib/ai/provider.ts`: the daily action engine and the single-provider AI wrapper (Anthropic only; thin wrapper; decision:"Single AI provider, thin wrapper") are born the same week.
- **2026-04-27** — `file:src/app/api/cron/run-all/route.ts`: single daily orchestrator (digest, drips, lead jobs, repair, reports) — still the production heartbeat today (`0 11 * * *` in vercel.json).

## Era 3 — Stabilization and governance (2026-05 → 2026-06-11)

- **2026-05-11** — `git` "stabilize ops workflows and add operational visibility foundation"; `file:migrations/030_smoke_test_runs.sql` — production smoke testing becomes a first-class table.
- **2026-05-20** — `docs/DECISIONS.md` created: architecture decisions with rationale become an audited artifact.
- **2026-05-21** — `file:migrations/040_content_tasks_metadata.sql` — the content-ops workflow (approval-gated AI generation, versioning) enters the schema (migrations 032–040).
- **2026-06-10/11** — forensic audit + stabilization closure: decision:DEC-12 (exactly three authoritative documents), decision:DEC-13 (9-engine PRD vision archived as falsified by audit), decision:DEC-14 (closure pass fixed exactly three blocking defects, `git:89196e0`, `git:0695f7b`), production baseline captured in `docs/BASELINE_2026.md`. 23 documents archived, 17 stubs deleted.

## Era 4 — Relationship Intelligence and the operator system (2026-06-09 → 2026-06-30)

- **2026-06-09** — `file:src/lib/leads/journeyIntelligence.ts`: RIE derivation layer (facts → journey state → advisory recommendations; decision:"AI extracts knowledge; system determines state; humans decide"). Migrations 042–046: relationship_updates, lead_questions, lead_facts, lead_journey_state.
- **2026-06-11** — `file:migrations/050_outreach_drafts.sql` + `file:src/lib/leads/outreachDrafts.ts`: RNIE Phase 1 (decision:DEC-16..DEC-18) — AI-drafted, human-approved outbound. Same day: 9A Agent Feedback Capture deployed and live-validated (decision:DEC-14), Referral Intelligence micro-feature (decision:DEC-19).
- **2026-06-12** — `file:src/lib/leads/canonicalQueue.ts`: one canonical next action per active lead with mandatory explanation metadata (decision:DEC-23, decision:DEC-24).
- **2026-06-15** — `file:src/components/ops/AppShell.tsx`: RachelOS becomes a navigable operator application (Today / Leads / Comms / Content / Admin — 25 protected operator screens today).
- **2026-06-22 → 06-29** — outreach verification closed (decision:DEC-42), queue redesigned as a sales workbench (decision:DEC-48), runtime timeline consumers consolidated (decision:DEC-51).
- **2026-06-26** — `file:src/lib/leads/inboundEmailReply.ts`: inbound replies as conversation artifacts on the lead timeline (decision:DEC-45).
- **2026-06-30** — decision:DEC-55 (audit ruled *against* migrating to Prisma — targeted hardening instead), decision:DEC-56 (RachelOS is a consumer of TIF, not the content generator — cross-repo boundary).

## Era 5 — Behavioral layer, activation, and current head (2026-07-01 → 2026-07-11)

- **2026-07-01/02** — canonical fact ingestion + daily intelligence-integrity audit (decision:DEC-58, DEC-59); Fact Taxonomy v2 (decision:DEC-60); commitments workstream closed with recorded limitations (decision:DEC-62).
- **2026-07-05** — `file:src/lib/publishing/githubPublish.ts`: content publishing via GitHub PR (implemented; production publication job still zero — production:publication_jobs=0).
- **2026-07-08** — Behavioral Layer Phase 1B ships (BX items per `docs/RACHEL_OS_BEHAVIORAL_LAYER.md`, decision:DEC-74 scope). Same day: decision:DEC-69 — `ENABLE_OUTREACH_DRAFTS` activated in production.
- **2026-07-09** — Call Block Mode `/ops/calls` built and shipped same day it was ticketed (decision:DEC-72, DEC-73).
- **2026-07-10** — Effective-timeline engine unified with decay + transition tracking (decision:DEC-75, DEC-76); Resend audience sync infrastructure with 10-contact live pilot, no campaign sent (decision:DEC-77..DEC-79); RDE Phase 1 authorized (decision:DEC-83).
- **2026-07-11** — `file:src/lib/leads/relocationDecisionEngine.ts` + `file:src/lib/ops/pipelineVisibility.ts` created; `docs/CURRENT_STATE.md` reconciled against a same-day production snapshot.

## Named capability evolutions (per the brief's checklist)

| Capability (brief vocabulary) | Repo reality | First evidence |
|---|---|---|
| First meaningful system | Public acquisition site + contact capture | 2025-09-30 → 2025-10-13 |
| Lead capture evolution | form→email → migrations 001–011 governed persistence → three-tier failed-capture recovery | 2026-03-05 |
| **Traffic Cop** | **Term does not exist in the repository.** Nearest verified capability: canonical intake routing in `/api/contact` (dedupe, test-mode gating, notification decisioning, intake pre-notification flag). Do not use "Traffic Cop" in published assets. | n/a |
| Relationship Intelligence | migrations 042–046, `journeyIntelligence.ts`, RIE/RIC decisions | 2026-06-09 |
| Queue | `canonicalQueue.ts`, DEC-23/24, queue redesign DEC-43/48, Queue-01..04 | 2026-06-12 |
| Today | `/ops/today` primary surface; `/ops` redirects to it | 2026-06 (AppShell era) |
| Lead Detail | read model + vocabulary governance (DEC-67) | 2026-06 → 07-07 |
| Outreach / Email / SMS | migrations 012, 027, 028; 77 accepted draft sends; 42 Twilio-SID SMS | 2026-04-02 → live today |
| Drips | drip system + lifecycle protection (DEC-64), idempotency migration 065 | 2026-03/04 → hardened 07 |
| Content / Content Factory | migrations 032–040 content ops; TIF compose integration; 3 items ready_to_publish | 2026-05-21 → validated 2026-07-08 |
| Behavioral Layer | `RACHEL_OS_BEHAVIORAL_LAYER.md`, BX-01..50, Phase 1B shipped | 2026-07-08 |
| Recommendation Engine | RDE engine + registry + console; **zero production snapshots** (dormant public path) | 2026-07-10/11 |
| Sales Package | call sheets / sales workbench queue card (DEC-48), Call Block Mode | 2026-05-11 → 2026-07-09 |
| Post-send continuity | inbound reply architecture (DEC-45/46), reply queue, reconciliation migration 063 | 2026-06-26 |
| Governance | DECISIONS.md, DEC-12 doc governance, evidence hierarchy, release discipline docs | 2026-05-20 → ongoing |
| Testing | "added tests" `git:2025-10-03` (day 3) → 145 test files / 1,341 test cases today; smoke-test runs table | 2025-10-03 |
| Production stabilization | BASELINE_2026 14-day green window, cron run series, integrity repair steps | 2026-06-11 |
