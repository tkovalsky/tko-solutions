# RachelOS Verified Capability Map + Production Evidence Table

**Evidence basis:** `docs/CURRENT_STATE.md` (authoritative, reconciled 2026-07-11 against a read-only production DB snapshot), repo inspection 2026-07-11. Status vocabulary is RachelOS's own: IMPLEMENTED / ACTIVATED / VALIDATED / UNVALIDATED / PARTIAL. **Never mix these categories in published assets.**

## Capability inventory

| Capability | Business purpose | Primary files | Current state | Production status | Known limitations |
|---|---|---|---|---|---|
| Public acquisition | Turn South-Florida relocation search demand into inquiries | `src/app/` public routes, 65 guide files, area/neighborhood/development templates | IMPLEMENTED | ACTIVATED + VALIDATED (leads span homepage, buyer, seller, listing, guide, area, contact sources) | No authoritative visitor/session dataset → traffic-to-lead conversion unknowable today |
| Lead capture | Persist every inquiry with dedupe + recovery | `src/app/api/contact/route.ts`, `api/guide-download/route.ts`, `failed_leads` | IMPLEMENTED | VALIDATED — 152 non-test leads; 49 in prior 30 days; latest 2026-07-11; 0 unrecovered failures | Legacy source consistency |
| Intake routing ("Traffic Cop" in older vocabulary — term absent from repo) | Dedupe, test-mode gating, notification decisioning at capture | `api/contact/route.ts`, intake pre-notification flag | IMPLEMENTED | ACTIVATED | Not a named subsystem; don't present as one |
| Fact extraction (RIC) | Convert freeform updates + intake into structured facts | migrations 042–046, capture-time AI, `lead_facts` | IMPLEMENTED | VALIDATED — 927 active facts across all 152 leads; 224 relationship updates | Human facts immutable by AI (by design); accuracy beyond observed records partially validated |
| Relationship Intelligence (RIE) | Derive journey state, gaps, questions from facts | `src/lib/leads/journeyIntelligence.ts` | IMPLEMENTED | VALIDATED — 134 active journey states | Journey state is interpretation; facts win on conflict (by design) |
| Journey / Relationship State | Current truth of the relationship as a first-class fact | DEC-22 state vocabulary, snapshot read models | IMPLEMENTED | ACTIVATED — active_search, toured_stuck, under_contract, paused, lost, DNC present in prod | Adoption concentrated in a subset of leads |
| Gap detection | Surface what the system doesn't know | gap types, daily question generation | IMPLEMENTED | ACTIVATED | Operational accuracy not separately measured |
| Recommendation engine (content/guide) | Suggest next content per lead | content recommendation engine, published-guide inventory | IMPLEMENTED | ACTIVATED in read models; adoption UNVALIDATED — 0 leads with `last_content_sent` | No adoption/conversion metric |
| RDE (Relocation Decision Engine) | Community-fit recommendation from structured facts | `src/lib/leads/relocationDecisionEngine.ts`, registry, console | IMPLEMENTED | **NOT ACTIVATED publicly; 0 production snapshots** | Entire public flow dormant; do not present as live |
| Canonical Queue | One explained next action per active lead | `src/lib/leads/canonicalQueue.ts`, DEC-23/24 | IMPLEMENTED | VALIDATED — 145 open + 97 completed canonical actions | Some messaging paths historically skipped queue recalc |
| Today | Primary daily work surface | `/ops/today`, `todaysWork` | IMPLEMENTED | ACTIVATED; page-level adoption UNVALIDATED | Daily completion metric reads 0 despite real completed actions (open defect) |
| Lead Detail / Sales workbench | Understand → act in one place | lead detail read model (DEC-67), queue card (DEC-48), `/ops/calls` (DEC-73) | IMPLEMENTED | ACTIVATED; workflow use evidenced by live actions/updates | Multiple legacy status vocabularies remain |
| Email outbound | Human-reviewed sends via Resend | draft workflow, `outbound_messages` | IMPLEMENTED | VALIDATED at provider acceptance — 77 accepted draft-review sends | **Delivery UNVALIDATED** — 0 `email.delivered` webhook events; 104 recent sends unproven at inbox |
| Inbound email | Replies enter the lead timeline | `src/lib/leads/inboundEmailReply.ts` (DEC-45) | IMPLEMENTED | **DORMANT — no `email.received` production event** | Highest-relevance unactivated capability |
| SMS | Two-way texting | migration 027, Twilio integration | IMPLEMENTED | VALIDATED — 42 outbound rows all with Twilio SIDs; inbound present | Auto-ack, follow-up, digest SMS deliberately off |
| Drips | Scheduled nurture | drip processor, migration 065 idempotency | IMPLEMENTED | VALIDATED; July 4–5 overdue alert recovered | Delivery events missing; DRIP_MODE=email works by fall-through (config risk) |
| Outreach drafts | AI drafts, human approves, system sends + logs | `outreachDrafts.ts`, migrations 050/054/056/058, DEC-16..18, DEC-69 | IMPLEMENTED | **VALIDATED — flagship loop**: 77 accepted sends, 74 send activities, first-touch/follow-up/re-engagement/validate-recovery types | 5 pending drafts at snapshot; generation can outpace review |
| Notifications / digest | Daily operator briefing + alerts | `run-all`, daily-action engine, DEC-9 alert routing | IMPLEMENTED | VALIDATED through 2026-07-10, zero step errors in recent series | **July 11 run missing** (open incident); heartbeat not independently scheduled |
| Outcomes / commitments | Record what happened; schedule what's promised | canonical action outcomes, scheduled-event commitments (DEC-62) | IMPLEMENTED | PARTIAL — 3 tour_completed, 1 under_contract outcomes; conversation/voicemail/bad-number outcomes in use | Appointment→offer→close progression not internally consistent across stores |
| Content Factory (TIF integration) | Governed AI content drafts → human review → publish | content ops migrations 032–040/064, TIF compose, `/ops/publishing` | IMPLEMENTED | VALIDATED through review — 3 real items draft→revise→regenerate→ready_to_publish, 6 versions | **Publication unvalidated: 0 `publication_jobs`**; GitHub PR path configured but unproven |
| Publishing (GitHub PR) | Human-triggered release of approved content | `src/lib/publishing/githubPublish.ts` | IMPLEMENTED | CONFIGURED, UNVALIDATED end-to-end | No PR evidence in production |
| Operations / admin | Health, flags, smoke tests, reconciliation | `/ops/system-health`, smoke runs (migration 030) | IMPLEMENTED | ACTIVATED; live health endpoint works | Diagnostics on in prod (deliberate exception or drift) |
| Testing | Regression safety on a live revenue system | 145 test files, 1,341 test cases, smoke checklist | IMPLEMENTED | CI build green; E2E suite chronically red since May (pre-existing env issues, non-blocking) | E2E red is a real, documented gap |
| Governance | Decisions, doc authority, release discipline | `DECISIONS.md` (83 numbered decisions), DEC-12, evidence hierarchy | IMPLEMENTED | ACTIVE — decisions dated, superseded entries retained | Requires operator discipline to maintain |

## Production evidence table (snapshot 2026-07-11, aggregates only — no PII)

| Metric | Value | Category |
|---|---:|---|
| Non-test leads | 152 | Validated |
| Leads created, prior 30 days | 49 | Validated |
| Leads with a logged deliberate outbound touch | 117 | Validated |
| Leads marked responded | 9 | Validated (and honestly low — cited as the constraint) |
| Active facts | 927 | Validated |
| Relationship updates | 224 | Validated |
| Active journey states | 134 | Validated |
| Canonical next actions (open / completed) | 145 / 97 | Validated |
| Accepted draft-review sends (`outbound_messages`) | 77 | Validated |
| `outreach_draft_sent` activities | 74 | Validated |
| Outbound SMS with Twilio SIDs | 42 | Validated |
| Guide downloads (distinct guides) | 6 (4) | Validated |
| Tour completed / under-contract canonical outcomes | 3 / 1 | Validated |
| Active deals / status=closed / converted_at | 2 / 3 / 1 | Built+recorded; **no attribution chain — never claim revenue** |
| TIF content items ready_to_publish (versions) | 3 (6) | Validated through review |
| Production publication jobs | 0 | Not validated — publishing unproven |
| RDE recommendation snapshots | 0 | Not validated — public flow dormant |
| Consecutive no-error daily cron runs | 2026-06-22 → 2026-07-10 | Validated (07-11 run missing — open incident) |
| SQL migrations | 67 | Verified (repo) |
| Test files / test cases | 145 / 1,341 | Verified (repo) |
| API routes / operator screens | 67 / 25 | Verified (repo) |
| Lines in `src/lib/leads/` | ~42,150 | Verified (repo) |
| Commits / committers | 1,528 / 1 | Verified (repo) |
| Lines added / deleted over project life | ~455.8k / ~172.9k | Verified (repo) |
