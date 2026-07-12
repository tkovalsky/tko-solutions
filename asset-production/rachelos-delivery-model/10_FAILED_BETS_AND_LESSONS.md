# Failed Bets & Lessons Learned — The Transparency Ledger

**Rule:** every entry is evidenced in the repo's own decisions, audits, or production records. Nothing here is confession theater — each item carries its current status, and several were *recovered from*, which is the more useful story. Format: Hypothesis → Implementation → Outcome → Lesson → Status.

## 1. The 9-engine platform vision (abandoned concept)

- **Hypothesis:** RachelOS should grow into a 9-engine "Relocation Operating System" platform (content strategy, market intelligence, authority, autonomous milestones, multi-domain abstraction).
- **Implementation:** Full PRD v3.0 with a capability matrix.
- **Outcome:** The 2026-06-10 forensic audit **falsified the PRD's capability claims**; the vision conflicted with the stabilization freeze.
- **Lesson:** Vision documents drift from reality unless audited against code; ambition is cheap, evidence is not.
- **Status:** Archived as historical vision (decision:DEC-13). Anything from it must be re-justified.

## 2. Five competing lifecycle representations (over-engineering by accretion)

- **Hypothesis (implicit):** each new workflow could add its own status/stage field.
- **Implementation:** `status`, `stage`, `lead_stage`, `lifecycle_stage`, journey state — five representations of "where is this lead?"
- **Outcome:** The platform's "#1 'which field is real?' tax" (decision:DEC-1). Production records still show cross-field disagreement today.
- **Lesson:** The expensive defect in intelligence systems isn't a bug — it's two sources of truth. Consolidation (DEC-1, DEC-51, DEC-75) cost multiple workstreams.
- **Status:** Consolidated to a single 7-value lifecycle for runtime consumers; compatibility fields remain and are honestly listed as PARTIAL.

## 3. The phantom scoring column (false assumption, then fixed)

- **Hypothesis:** `priority_score` drives digest ordering.
- **Implementation:** Column existed; five scoring systems accumulated across iterations.
- **Outcome:** Audit found the column was **never written** — two of five scoring systems actually influenced anything.
- **Lesson:** Unused sophistication is negative value; it misleads future reasoning. Score systems must prove influence on a real decision.
- **Status:** Fixed (persisted daily since 2026-05-26); the superseded decision entry retained in the log as history. `score` and `confidenceScore` remain dead and documented as dead.

## 4. Parallel email paths / double-email risk (configuration failure, recovered)

- **Hypothesis:** drips, QStash follow-ups, and the daily engine could each send email independently.
- **Implementation:** Three uncoordinated send paths.
- **Outcome:** Confirmed duplicate sends; `DRIP_MODE` pinned to `nudge` for weeks; QStash scheduling disabled to this day.
- **Lesson:** In outbound systems, every new send path multiplies coordination burden; suppression must be shared infrastructure (`EMAIL_ACTIVITY_TYPES` check, proven live in both directions 2026-06-10).
- **Status:** Suppression fixed; QStash remains deliberately off (deferred-work table); `DRIP_MODE=email` still works by enum fall-through — a *disclosed* residual config risk.

## 5. Inbound email receiving (activation failure — open)

- **Hypothesis:** replies would flow into the lead timeline via Resend receiving.
- **Implementation:** Complete (`src/lib/leads/inboundEmailReply.ts`, DEC-45/46/47).
- **Outcome:** Zero `email.received` production events. Replies may be happening outside the system's sight.
- **Lesson:** Implemented ≠ activated. The gap between finished code and a verified production event is where operational value silently dies — hence the four-status vocabulary.
- **Status:** Ranked among the top current constraints; activation is a next-7-days action in CURRENT_STATE.

## 6. Email-first outreach (missed expectation, measured)

- **Hypothesis:** email volume would produce conversations.
- **Implementation:** Email became the dominant first-touch channel (drafts, drips, nurture).
- **Outcome:** 2.2% email-first response in the July 8 funnel study; 9 responded of 117 touched; observed ordering call (25%) > text (8.3%) > email — small observational samples, labeled as such.
- **Lesson:** Channel mix is a product decision, not a default. The system's job became *making calls/texts easier* (Call Block Mode), not sending more email.
- **Status:** Constraint #1 in the system's own ranking; operating shift in progress.

## 7. Public recommendation flow / RDE (activation failure — open)

- **Hypothesis:** a quiz → community-recommendation flow would convert visitors.
- **Implementation:** Components, API, engine, registry, console, snapshot persistence — all built.
- **Outcome:** No landing page has `published:true`; the API returns persistence metadata rather than recommendations to the visitor; **zero production snapshots**.
- **Lesson:** A conversion flow isn't a feature list; unpublished last-mile = zero value. Also a scope lesson: the engine was built before the entry point was proven.
- **Status:** Dormant; phased re-entry authorized (DEC-83) with the first snapshot as the gate.

## 8. Content factory publishing (last-mile gap — open)

- **Hypothesis:** TIF drafting → human review → GitHub PR publishing closes the loop.
- **Outcome:** Drafting and review validated on 3 real items (6 versions); **0 publication jobs** — the final mile has never run in production.
- **Lesson:** Pipelines earn their name only end-to-end; "operational through review" is the honest label.
- **Status:** Ready items waiting; first PR is a 30-day action.

## 9. One-time tooling that almost became systems (caught early)

- **Backlog queue:** 17 hardcoded lead IDs, human triage judgment — explicitly ruled ephemeral, delete-after-run (decision:DEC-20).
- **Per-lead referral script:** ran once for one lead, flagged for deletion; permanent UI surface demanded instead (decision:DEC-19).
- **Lesson:** The failure mode was recognized *before* it calcified: scripts that encode judgment calls must not masquerade as algorithms.

## 10. Marketing droughts (external dependency lesson)

- **Outcome:** Two zero-lead windows (May 17–22, June 6–9) attributed marketing-side; a zero-lead alert now exists because of them. GL Homes guide cluster fragmented into 5 competing guides before consolidation.
- **Lesson:** Acquisition volatility is outside the operating system's control; detection (alerting) is inside it. SEO sprawl is a real cost of high-velocity content production — consolidation with 301s was the fix.

## What this ledger buys

Items 1–3 prove the self-audit works (bets were falsified *by the project's own process*, not by outside embarrassment). Items 5–8 are the honest "unfinished" answer for the FAQ. Items 4 and 9 are governance-in-action stories that transfer to any org adopting AI-assisted delivery.
