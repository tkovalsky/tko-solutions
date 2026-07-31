# POIS Decision Records

**Date:** 2026-07-31
**Convention:** A decision is marked **BLOCKED** only when it materially affects commercial
positioning, legal/ethical boundaries, paid third-party services, destructive migration,
outbound communication, public-facing behavior, or substantial recurring cost. Everything
else is a technical decision Codex may act on.

| # | Decision | Codex may proceed |
|---|---|---|
| D-001 | Initiative is the central intelligence object | ✅ Yes |
| D-002 | Retire `OiPursuit`, harvest its scoring | ✅ Yes |
| D-003 | Keep the `Oi` database prefix | ✅ Yes |
| D-004 | Anthropic API for narrative and drafting | ⛔ **Todd's approval — cost** |
| D-005 | Draft-only outreach; no send capability | ⛔ **Todd's approval to ever change** |
| D-006 | Separate opportunities per commercial path | ✅ Yes |
| D-007 | Type-specific state machines | ✅ Yes |
| D-008 | Deterministic scoring; AI never scores | ✅ Yes |
| D-009 | Proof matching via a seeded pointer table | ✅ Yes |
| D-010 | Manual/URL intake only in the first release | ✅ Yes |
| D-011 | Automation boundaries | ✅ Yes |
| D-012 | Consolidate the duplicate Prisma clients | ✅ Yes |
| D-013 | No vector search, graph DB, or agents | ✅ Yes |
| D-014 | Seven routes, no route sprawl | ✅ Yes |
| D-015 | $300K normalization; $225K FTE floor | ⛔ **Todd's approval — positioning** |
| D-016 | Build freeze at day 45 | ⛔ **Todd's approval — schedule** |
| D-017 | LinkedIn: manual and operator-provided only | ✅ Yes (boundary is not revisitable) |
| D-018 | Keep `OiPursuit` table until after Oct 1 | ✅ Yes |
| D-019 | Decision Journal write side ships in Milestone 1, not 4 | ✅ Yes |
| D-020 | One `OiArtifact` model replaces `OiOutreachDraft` and six artifact types | ✅ Yes |
| D-021 | Opportunity Timeline is derived — no model | ✅ Yes |
| D-022 | Executive Brief is derived — no model | ✅ Yes |
| D-023 | Playbooks are data + display; `deriveNextAction()` is not replaced | ✅ Yes |
| D-024 | Person facts reuse `OiOpportunityFact` via `personId` | ✅ Yes |
| D-025 | Campaigns are grouping only, no campaign-level workflow | ✅ Yes |
| D-026 | Proposal builder reduced to template + checklist | ✅ Yes |
| D-027 | Milestone 5 is entirely post-October-1 | ✅ Yes |
| D-028 | RFP path deferred to post-October-1 | ⛔ **Todd's approval — cuts a path** |
| D-029 | Milestone 1 has zero AI dependency | ✅ Yes |
| D-030 | All schema ships in one Milestone 0 migration | ✅ Yes |
| D-031 | Story backlog split into 30–90 min sub-lettered chains; Rule 1 applies to the chain, not each letter | ✅ Yes |

---

## D-001 — The buying initiative is the central intelligence object

**Context.** The current schema has `OiOpportunity` hanging directly off `OiOrganization`
with no concept of the underlying funded change. A job posting therefore *is* an opportunity,
which is commercially wrong: a posting is one observable artifact of a funded program that
may also support a consulting engagement, a partnership, and several other roles.

**Decision.** Introduce `OiInitiative` between account and opportunity. Signals cluster into
initiatives; initiatives generate opportunities. Opportunity retains `initiativeId` as
**optional** so an opportunity can exist before an initiative is inferred.

**Alternatives considered.**
- *Keep opportunity as the top-level object, add an `initiativeName` string.* Rejected —
  cannot cluster signals, cannot represent one program producing several pursuits, cannot
  decay confidence.
- *Make initiative required on opportunity.* Rejected — a cold RFP or a direct referral
  legitimately has no inferred initiative, and blocking creation would add friction to the
  fastest paths.

**Rationale.** Signal clustering is the system's highest-leverage inference. Three related
signals at one account evidence a funded program; one signal is noise. Only a first-class
initiative can hold that aggregate, carry a confidence that decays, and tie an FTE pursuit to
a consulting pursuit.

**Consequences.** One new model plus a many-to-many join. Opportunity creation gains an
optional parent. The workbench must render sibling opportunities. Clustering logic needs
careful tests.

**Repository impact.** `prisma/schema.prisma`; new `intelligence/initiative-inference.ts`;
workbench and intake UI.

---

## D-002 — Retire `OiPursuit`; harvest its scoring

**Context.** `OiPursuit` is person-first (`personId` required), carries
`@@unique([personId, mode])`, and has **no foreign key to `OiOpportunity`**. The two halves of
OI share only `OiOrganization`. Separately, `src/lib/oi.ts` contains ~400 lines of well-tuned
scoring: seniority gating, authority weighting, source-freshness penalties, do-not-contact
suppression.

**Decision.** Retire the entity; harvest the logic. Backfill each pursuit into one
`OiOpportunity` + one `OiStakeholder` + one `OiNextAction`. Refactor `scoreOpportunity()`
into `scoreStakeholderAccess()`. Keep the table until after October 1.

**Alternatives considered.**
- *Add `opportunityId` to `OiPursuit` and keep it.* Rejected — leaves a person-first entity
  that cannot exist before a person is known, and duplicates hypothesis, score, status, and
  next-action fields that belong elsewhere.
- *Delete `src/lib/oi.ts` outright.* Rejected — the scoring logic is genuinely good and
  re-deriving it would be waste.

**Rationale.** `@@unique([personId, mode])` structurally caps Todd at one consulting pursuit
per person, forever. That alone disqualifies the entity. The brief is explicit that flawed
entities should not survive to avoid migration work.

**Consequences.** A backfill script is required. `src/lib/oi.ts` becomes a re-export for one
release. `OI_STARTER_PEOPLE` data survives via `OiPerson`.

**Repository impact.** `scripts/oi/backfill-pursuits.mjs`; `commercial/score/access.ts`;
`src/lib/oi.ts`; `/tif/opportunities` becomes legacy read-only.

---

## D-003 — Keep the `Oi` prefix

**Context.** The brief asked that `Oi*` naming not be preserved without evaluation.

**Decision.** Keep it. Product/doc name is **POIS**; the database prefix stays `Oi`.

**Alternatives considered.** *Rename to `Pois*`.* Rejected — a day of work across nine models
plus migrations, for zero commercial value, against a 61-day deadline.

**Rationale.** `Oi` = Opportunity Intelligence, which is precisely what these models are. It
namespaces cleanly against the TIF content models (`Asset`, `Evidence`, `AssetOpportunity`)
in a shared schema. The naming is accurate, not misleading.

**Consequences.** Docs say POIS, code says `Oi`. Documented here so the mismatch is a
recorded choice rather than drift.

---

## D-004 — Anthropic API for initiative narrative and outreach drafting ⛔

**Context.** No AI client exists anywhere in the repository. `ANTHROPIC_API_KEY`,
`OPENAI_API_KEY`, `AI_PROVIDER`, `AI_MODEL_FAST`, `AI_MODEL_QUALITY`, `AI_MAX_TOKENS_*`, and
`AI_DRAFT_TIMEOUT_MS` are declared in `.env.local` and referenced by zero lines of code.

**Decision.** Build `ai/client.ts` as a provider adapter using raw `fetch` (matching the
Resend pattern in `src/lib/leads/notify.ts`, no new SDK dependency), defaulting to Anthropic.
Used for exactly two things: the initiative narrative and outreach drafts. **Never for
scoring.**

**Alternatives considered.**
- *Template-only drafting.* Rejected — generic outreach is precisely what Todd is trying to
  avoid; his differentiator is research-grounded specificity.
- *OpenAI.* Neutral — the adapter keeps it swappable; Anthropic is already provisioned.
- *Add an SDK.* Rejected — `fetch` is sufficient and the repo already prefers it.

**Rationale.** Todd's competitive edge is credible, specific outreach. Template boilerplate
would defeat the purpose. Estimated cost at 20 opportunities/week × ~2 calls, with prompt
caching on the stable prefix: **under $15/month.**

**Consequences.** A recurring third-party cost. Mitigated by: AI is never on the critical
path (every flow degrades deterministically), the client never throws, and prompt caching
covers the stable capability profile and proof catalogue.

**Impact of delay.** Slices 1, 2 (except the narrative), 3, 5, 6, 7, 8 all ship without it.
Only Slice 4 (outreach drafting) is materially degraded — it falls back to a structured
template. **The system is still usable without this approval**, just less sharp.

**⛔ Requires Todd's approval:** recurring third-party cost.

---

## D-005 — Draft-only outreach; no send capability in the codebase ⛔

**Context.** The fastest possible loop would have POIS send email directly. Resend is already
integrated for inbound lead notifications (`src/lib/leads/notify.ts`).

**Decision.** POIS prepares drafts and never sends. **No send capability exists in POIS
code.** Todd copies an approved draft into his own client, sends it, and logs the send. The
existing Resend integration is not wired to POIS.

**Alternatives considered.**
- *Send via Resend with confirmation.* Rejected — a single misdirected send while employed at
  Cognizant costs more than the system saves in a year.
- *Send with a delay/undo window.* Rejected — adds complexity and still leaves the capability
  present in the codebase.

**Rationale.** This is architectural, not procedural. A capability that does not exist cannot
be triggered by a bug, a misclick, or a future well-meaning change. Todd's reputation and
current employment are the assets at risk.

**Consequences.** ~1 minute of manual work per outreach. Logging depends on Todd's
discipline, which the follow-up next-action mechanic reinforces.

**Verification.** POIS-406 includes a manual test: grep POIS code for any email-send call;
it must return nothing.

**⛔ Requires Todd's approval to ever change.** Not revisitable by Codex under any
circumstance.

---

## D-006 — Separate opportunities per commercial path, unified by initiative

**Context.** One initiative can support an FTE role, a consulting assessment, and a
partnership simultaneously.

**Decision.** Create a **separate `OiOpportunity` per path**, all sharing one `initiativeId`.
Do not overload one record with a multi-path mode.

**Alternatives considered.** *One opportunity with a `paths[]` array (the current `OiPursuitMode`
"both" approach).* Rejected — states, stakeholders, cycle times, scoring formulas, and
outcomes all differ. A status enum spanning both becomes meaningless.

**Rationale.** An FTE pursuit at `interview_loop` and a consulting pursuit at `proposal_sent`
at the same account are genuinely different things with different next actions. Forcing one
record produces a status that describes neither.

**Consequences.** More rows. The workbench must show siblings so the relationship stays
visible. Path diversity in the Today ranking (scoring §9 rule 7) depends on this separation.

---

## D-007 — Type-specific state machines with a shared qualification prefix

**Decision.** All types share `identified → qualifying → qualified → dismissed`. After
`qualified`, each type uses its own machine (architecture §5).

**Alternatives considered.** *One universal machine.* Rejected — `recruiter_screen` is
meaningless for consulting; `proposal_sent` is meaningless for FTE. A shared enum would force
mislabeled states.

**Rationale.** Shared states are used only where they carry identical meaning. Everything
else is honest divergence.

**Consequences.** A larger status enum (~30 values). `canTransition()` must be type-aware and
well tested.

---

## D-008 — Deterministic scoring; AI never produces the authoritative number

**Decision.** Every score is computed by pure functions with versioned weights and golden
fixtures. AI may propose an initiative narrative and draft prose. It may never produce,
adjust, or rank a score.

**Alternatives considered.** *LLM-assisted fit scoring.* Rejected — non-reproducible,
non-auditable, and would make the ranking untrustworthy.

**Rationale.** Todd must be able to audit any ranking or he will stop following it, at which
point POIS becomes a filing cabinet. Reproducibility is also what makes "did the new policy
rank better?" answerable.

**Consequences.** Weight tuning is manual and versioned. The learning loop is advisory only.

---

## D-009 — Proof matching via a thin seeded pointer table

**Context.** Outreach should cite Todd's case studies and frameworks. Those live as TIF
content (`Asset`, MDX, docs) with no problem-domain tags.

**Decision.** Create `OiProofItem` — a ~15-row table with `slug`, `title`, `kind`,
`publicUrl`, `internalRef` (soft pointer, **no FK**), and domain/problem tags. Match by
deterministic tag overlap.

**Alternatives considered.**
- *Add tags to `Asset` and query it directly.* Rejected — modifies the content spine for a
  commercial purpose and couples the two bounded contexts.
- *Full-text search over content.* Rejected — imprecise and slower to build than 30 minutes
  of seeding.

**Rationale.** ~30 minutes of seeding versus days of retrofitting, and the contexts stay
decoupled.

**Consequences.** Todd maintains the proof table manually. Acceptable at 15 items.

---

## D-010 — Manual and URL intake only in the first release

**Decision.** Phase 1 sources are: pasted text, operator-provided URLs, manual notes. No
connectors, no scheduled fetching, no crawling.

**Alternatives considered.** *Ship Greenhouse/Lever/Ashby connectors in Slice 1.* Rejected —
~5 days of work that competes directly with pipeline time, before the manual loop has proven
useful.

**Rationale.** Real volume is 5–20 signals/day. Manual intake handles that comfortably.
Connectors reduce the cost of a workflow that must first be worth running.

**Consequences.** Todd pastes sources himself — roughly 2 minutes each, ~15 minutes/day. Phase
2 connectors are almost certainly post-October-1.

---

## D-011 — Automation boundaries

**Decision.** Adopt the three-tier boundary in operating manual §14: automate deterministic
and AI-assisted analysis; require Todd's approval for every consequential commitment; keep
relationships, judgment, and pricing fully human.

**Rationale.** The system's value is filtering and preparation. Its risk is acting on Todd's
behalf. The boundary sits exactly where a mistake becomes externally visible.

**Consequences.** Encoded as gates in `lifecycle.ts` and `canPrepareOutreach()`, not as
documentation.

---

## D-012 — Consolidate the duplicate Prisma clients

**Context.** `src/lib/db/prisma.ts` and `src/lib/tif/db.ts` each instantiate a `PrismaClient`
with identical adapter config against the same database.

**Decision.** `src/lib/tif/db.ts` re-exports the canonical client as `tifDb`. Existing call
sites are untouched.

**Rationale.** Two pools against one Neon database wastes connections. A one-line alias fixes
it with zero risk.

---

## D-013 — No vector search, graph database, or agent framework

**Decision.** Relational joins and tag matching only.

**Rationale.** At Todd's scale (hundreds of opportunities, thousands of facts), Postgres joins
are fast and debuggable. No current requirement needs semantic retrieval. Agents have
unbounded failure modes and no approval boundary — categorically wrong for a system where a
mistake is externally visible.

**Consequences.** If semantic search becomes genuinely necessary, it requires a new decision
record with a concrete requirement.

---

## D-014 — Seven routes, no sprawl

**Decision.** Exactly seven routes (`POIS-OPERATOR-UX.md` §2). A new route requires deleting
one or writing a decision record.

**Explicitly not built:** separate `/research`, `/rfp`, `/signals`, `/stakeholders`, or
`/settings/scoring` routes. Each of those is a section within an existing view.

**Rationale.** Navigation depth is friction, and friction at 6am is what kills a daily habit.
The earlier OI requirements doc proposed ten routes; that is too many for one operator.

---

## D-015 — $300K normalization and $225K FTE floor ⛔

**Context.** FTE and consulting opportunities must be comparable on one axis.

**Decision.** Normalize everything to **annualized income contribution**, target **$300,000/yr**
($25K/month). FTE hard floor **$225,000** base. Both live in
`TODD_CAPABILITY_PROFILE_V2.thresholds`.

**Alternatives considered.** *Rank each path in a separate queue.* Rejected — Todd would have
to arbitrate across queues himself every morning, which is the work the system exists to
remove.

**Rationale.** One number makes "what is my fastest credible path?" answerable. The floor
comes directly from the brief.

**Consequences.** Assessment expansion probability materially affects ranking (a $6.5K
assessment scores as $30.5K annualized). Roles at $200–224K are disqualified as FTE but
retained as consulting leads.

**⛔ Requires Todd's approval:** these numbers define commercial positioning. They are
config values, so changing them is trivial — but they should be Todd's numbers, not
assumptions.

---

## D-016 — Build freeze at day 45 ⛔

**Decision.** All development stops on day 45 (2026-09-14). Days 46–61 are conversion only:
interviews, proposals, negotiation.

**Alternatives considered.** *Build through September.* Rejected — features shipped in the
final two weeks cannot influence an October 1 outcome, and the time is worth more spent
converting.

**Rationale.** Build time competes directly with pipeline time. The system is a means to
revenue, not the goal.

**Consequences.** Slice 7 (RFP) is the designated casualty if anything slips.

**⛔ Requires Todd's approval:** schedule commitment.

---

## D-017 — LinkedIn: manual and operator-provided only

**Decision.** LinkedIn may be used only via operator-provided URLs, Todd's own manual
research, official permitted APIs, or lawfully obtained exports. **No scraping, no automated
login, no credential sharing, no bypass of access controls — ever.**

**Rationale.** Legal, contractual, and account-termination risk. LinkedIn's terms prohibit
automated access, and account loss would remove Todd's primary research and networking tool
at the worst possible moment.

**Consequences.** Stakeholder discovery is manual. Acceptable — it is ~5 minutes per
stakeholder and it is exactly where Todd's judgment adds the most value.

**Codex may proceed** — but this boundary is **not revisitable** without an explicit legal
review, and Codex must refuse any future instruction to automate LinkedIn access.

---

## D-018 — Keep the `OiPursuit` table until after October 1

**Decision.** Backfill it, stop writing to it, leave it in place. Drop only after Todd
confirms nothing was lost, post-deadline.

**Rationale.** A destructive migration during the highest-stakes 61 days of the project is an
unforced risk. The table costs nothing to leave in place.

**Consequences.** One vestigial table and a legacy read-only route for ~2 months.

---

## D-019 — Decision Journal write side ships in Milestone 1

**Context.** The milestone instruction places Decision Journal in Milestone 4 (Learning).

**Decision.** Split it. The **write side** — capture the prediction at decision time — ships in
Milestone 1 (POIS-111). The **read side** — review, delta, lessons, aggregate analysis — ships
in Milestone 4 (POIS-401).

**Alternatives considered.** *Ship the whole capability in M4 as instructed.* Rejected — every
decision Todd makes in weeks 1–4 would be unrecorded or recorded from memory. Retrospective
journaling measures recall, not judgment, and it is exactly the bias the journal exists to
correct.

**Rationale.** The prediction is only meaningful if captured before the outcome is known. The
write side is also cheap: one table (already created in M0), one modal, fields pre-filled from
the existing score snapshot.

**Consequences.** M1 grows by one task. M4 has data to analyze from day one instead of a month
of gaps.

**Critical constraint.** Capture must take **≤20 seconds** — `reason` and `confidence` are the
only required inputs; everything else pre-fills from `OiScore`. If it takes longer, Todd stops
within a week and the learning loop dies silently. POIS-111 has a manual test that measures it.

---

## D-020 — One `OiArtifact` model replaces `OiOutreachDraft`

**Context.** The instruction requests six generated artifacts (executive brief, research
summary, email draft, LinkedIn draft, talking points, meeting prep) plus a proposal builder.

**Decision.** Generalize `OiOutreachDraft` into `OiArtifact` with a `kind` enum covering all of
them plus intro request, application note, and follow-up draft. `OiOutreachDraft` is never
created.

**Alternatives considered.** *A model per artifact type.* Rejected — six near-identical tables
with the same provenance, validation, versioning, and approval fields.

**Rationale.** Every artifact shares the same lifecycle: generated from a context snapshot,
claim-validated, operator-edited, approved for manual use, never sent. Only the prompt and the
gate differ, and both are per-`kind` logic, not per-table structure.

**Consequences.** One table, one editor component, one approval path. Gates vary by kind:
brief/summary/talking-points/meeting-prep need only evidence; anything Todd would transmit
needs the full outreach gate.

---

## D-021 — Opportunity Timeline is derived

**Decision.** No `OiTimeline` or `OiTimelineEvent` model. `buildTimeline()` merges `OiSignal`
(via initiative), `OiActivity`, status-change activities, and `OiDecision`, sorted by date.

**Rationale.** The requested narrative — executive hired → transformation announced → role
opened → RFP released → proposal → outcome — is already fully represented in existing tables.
A timeline table would duplicate that data and immediately risk drifting from it.

**Consequences.** One query per render. Trivial at this volume. **Codex is explicitly told not
to create the table**, because building one is the more obvious move.

---

## D-022 — Executive Brief is derived, optionally snapshotted

**Decision.** No `OiBrief` model. The brief is assembled at request time from person facts,
signals, initiatives, stakeholder data, playbook guidance, and research gaps. When Todd
prepares outreach, it is snapshotted into `OiArtifact(kind = executive_brief)`.

**Rationale.** A stored brief goes stale the moment a new signal arrives. The canonical brief
must always reflect current data; a snapshot is only needed to freeze what a specific draft was
based on.

**Consequences.** Assembly must be fast — the target is under 1 second, comfortably achievable
at this data volume. Empty sections render a research prompt, which turns the brief into a work
surface rather than a static report.

---

## D-023 — Playbooks are data and display; they do not replace the next-action engine

**Context.** The instruction says "instead of hardcoding workflows, store reusable commercial
playbooks." Read literally, this means deleting `deriveNextAction()`.

**Decision.** Playbooks supply **research checklists, follow-up cadences, proof/offer guidance,
and common objections — for display**. `deriveNextAction()` remains the sole authority on what
the next action is.

**Alternatives considered.** *Make playbooks a workflow engine driving next actions.* Rejected
— it would remove working, tested, deterministic logic and replace it with unvalidated
data-driven indirection, mid-deadline.

**Rationale.** "What is the next action?" is a deterministic function of opportunity state and
must stay reproducible. "What research is typical for this kind of pursuit?" is reusable
content. These are different problems.

**Consequences.** Milestone 2 ships playbooks as data + display only. POIS-210 carries an
explicit test asserting `deriveNextAction()` is unchanged. If playbooks prove valuable by
mid-September, wiring `followUpRhythmDays` into due-date calculation is a small follow-up.

---

## D-024 — Person facts reuse `OiOpportunityFact` via `personId`

**Decision.** Add nullable `personId` to `OiOpportunityFact` and widen its CHECK constraint to
three possible parents. No new person-fact table. The model keeps its name.

**Rationale.** Executive Brief sections (career, responsibilities, interviews, conference
talks) are facts about a person and need exactly the same machinery every other fact has:
basis, confidence, evidence offsets, operator override. Reusing it is one column; a new table
would duplicate all of it.

**Consequences.** The model name is now slightly narrow. Renaming costs a migration and buys
nothing.

---

## D-025 — Campaigns are grouping only

**Decision.** `OiCampaign` + a many-to-many join. Opportunities belong to zero or more.
Campaigns provide a thesis, a rollup of PE and expected value, and target account names. **No
campaign-level actions, no campaign workflow, no campaign-scoped outreach.**

**Rationale.** The stated need is grouping opportunities around a strategic theme (Prior
Authorization → Humana, UHC, Elevance, GuideWell). That is a join table and a rollup view.
Campaign-level orchestration would be a workflow engine nobody has asked for yet.

**Consequences.** If Todd later wants to act at the campaign level, that is Milestone 5.

---

## D-026 — Proposal builder reduced to a template and checklist

**Decision.** `OiArtifact(kind = proposal_outline)` produces a structured outline: sections,
the matched offer's deliverables, cited proof, a pricing placeholder, and a completeness
checklist. **Todd writes the prose.** Full generation is post-October-1 and only after 3+ real
proposals reveal a repeatable structure.

**Alternatives considered.** *AI-generated full proposals.* Rejected — proposals are the
highest-stakes, lowest-volume artifact in the system. Todd will rewrite generated prose anyway,
and a bad proposal costs a deal.

**Rationale.** The structural work (which deliverables, which proof, what price band) is where
the system adds value. The prose is where Todd does.

---

## D-027 — Milestone 5 is entirely post-October-1

**Decision.** Relationship graph, pattern learning, market themes, heat maps, and portfolio
analytics are specified but **not scheduled** before the deadline.

**Rationale.** Every one of them depends on accumulated data that will not exist by October 1:
dense relationship history, ≥10 closed outcomes, a multi-month signal corpus. Building them
early would consume conversion time to visualize an empty dataset.

**Consequences.** Milestone 5 has no dates. Nothing should be planned against it.

---

## D-028 — RFP path deferred to post-October-1 ⛔

**Decision.** RFP qualification (`OiRfpProfile`, extraction, bid/no-bid) moves out of the
scheduled milestones. Specifications are retained verbatim in the data model, scoring model,
and UX doc.

**Alternatives considered.** *Keep it in Milestone 4.* Rejected — roughly 4 days for the
lowest-probability path (5% as prime, 12% as sub), during the period when those days are worth
more spent on the FTE and consulting paths.

**Rationale.** RFPs almost always end in no-bid. The system's RFP value is reaching that
conclusion fast — real, but not worth 4 of 45 build days when two higher-probability paths are
still being built out.

**Consequences.** If an attractive RFP appears before October 1, Todd qualifies it manually
using the documented bid/no-bid criteria. The scoring rules exist on paper.

**⛔ Requires Todd's approval:** this removes a commercial path from the build. If Todd's
pipeline is RFP-heavy, this decision should be reversed and something else deferred.

---

## D-029 — Milestone 1 has zero AI dependency

**Decision.** Milestones 0 and 1 are fully deterministic. The AI client first appears in
Milestone 2 (POIS-206).

**Rationale.** D-004 (Anthropic) is unapproved. If it stays unapproved, or the API is
unavailable, or prompt quality disappoints, **Todd still has a working daily driver on August
9.** Making the critical milestone independent of an unapproved external dependency is worth
more than an earlier narrative feature.

**Consequences.** Initiatives carry deterministic names (`{Account} — {tag} initiative`) until
M2. Perfectly usable.

---

## D-030 — All schema ships in one Milestone 0 migration

**Decision.** Every model — including the Milestone 2–4 additions (`OiDecision`, `OiCampaign`,
`OiPlaybook`, `OiArtifact`, `OiWeeklyReview`) — is created in the single `add_pois_core`
migration.

**Alternatives considered.** *A migration per milestone.* Rejected — three migrations mean
three chances to break the enum-alteration and table-rename traps, and `OiDecision` must exist
before M1 UI work regardless.

**Rationale.** Empty tables cost nothing. Migrations against a live database carry real risk,
and this schema has two known Postgres traps (`ALTER TYPE ... ADD VALUE` outside a transaction;
`@@map` to avoid a table rewrite). Hitting them once is better than three times.

**Consequences.** POIS-004 is a large task, but it is schema-only and validated by
`prisma validate` before any migration runs.

---

## D-031 — Story backlog split into sub-lettered chains; Rule 1 applies to the chain, not each letter

**Context.** `POIS-CODEX-TASKS.md` tasks are still milestone-sized — several bundle 5–8
independent files or entities into one PR (`POIS-004` alone added 19 models; `POIS-105` added
six score files plus a UI summary). That is too large a unit for a 30–90 minute, independently
reviewable Codex session, and it makes rollback and code review harder than necessary.

**Decision.** Every task in the backlog is re-expressed as one or more implementation stories
under `docs/implementation/`, named `POIS-XXX[letter]-slug.md`. A task that already fit
30–90 minutes becomes one story with no letter. A task that didn't is split along its natural
seams — by bounded-context/entity group for schema tasks, by pure-logic-vs-UI for vertical
slices, by concern for a hand-edited migration.

Splitting by logic-vs-UI means an intermediate letter in a chain (e.g., `POIS-105A`, the score
axis functions) can land with **no UI change** — which is, read literally, a violation of
`IMPLEMENTATION_RULES.md` Rule 1 ("ships schema → service → route → UI → test") and Rule 3
("no service with no UI").

**Resolution.** Rule 1 and Rule 3 apply to the **completed chain**, not to each letter in
isolation. Intermediate letters have a narrower Definition of Done (their own tests pass, build
succeeds, no user-visible claim made) and must not be described as "done" from Todd's
perspective. The **final letter** in a chain is where the full vertical-slice bar applies, and
a chain must complete within the milestone it belongs to — logic is never left stranded with no
story yet scheduled to surface it. This is spelled out operationally in
`docs/CODEX_OPERATING_MODEL.md` §2.3.

**Alternatives considered.**
- *Keep tasks at milestone-task granularity, accept larger PRs.* Rejected — this is the
  problem being solved; larger PRs cost more context per Codex session and are slower for Todd
  to review.
- *Split only by entity/file count, never by logic-vs-UI.* Rejected — several tasks (POIS-105,
  POIS-108, POIS-110) mix a nontrivial pure-logic component with UI wiring, and separating them
  is exactly what makes each piece small and independently testable.

**Consequences.** The backlog grows from 47 tasks to roughly 90 stories. Total scope, ordering,
and milestone boundaries are unchanged — this is subtraction of batch size, not addition of
work. `POIS-CODEX-TASKS.md` remains the historical record of the original task-level shape;
`docs/implementation/*.md` is the executable authority going forward.

---

## Open questions — non-blocking

These do not prevent implementation. Reasonable defaults are assumed and documented.

| # | Question | Assumed default | Where it lives |
|---|---|---|---|
| Q1 | Exact FTE/consulting effort split for the first 30 days | Both concurrent, no fixed split | Operating manual §8 |
| Q2 | Is remote a hard requirement or a preference? | Preference — scoring penalty, not a filter | Assumption A3 |
| Q3 | Which proof assets are approved for outreach? | Todd flags `isApprovedForOutreach` at seed time | POIS-008 |
| Q4 | Retention for closed/disqualified opportunities | Indefinite — no deletion in the first release | — |
| Q5 | What counts as a "meaningful conversation"? | A scheduled call with a stakeholder who has authority | Metrics |
| Q6 | Travel tolerance for consulting | Assumed acceptable; not scored | Scoring §7 |
| Q7 | Should the daily digest email to Todd exist? | Deferred to Slice 8, optional | Architecture §7.5 |

---

## What Codex must escalate rather than decide

1. Any request to add outbound send capability (**D-005**).
2. Any request to automate LinkedIn or scrape access-controlled sources (**D-017**).
3. Any change to the comp floor or income target (**D-015**).
4. Any new paid third-party service.
5. Any destructive migration, including dropping `OiPursuit` before October 1 (**D-018**).
6. Any public-facing surface or anything attributable to Todd externally.
7. Any change that would let AI produce or adjust a score (**D-008**).
8. Adding an eighth route (**D-014**).
