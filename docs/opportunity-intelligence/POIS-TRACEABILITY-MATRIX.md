# POIS Traceability Matrix

**Date:** 2026-07-31
**Purpose:** Map every capability back to the commercial objective, so anything that does not
serve the October 1 outcome is visible and can be cut.

**Test applied to every row:** *Does this materially improve Todd's ability to identify,
evaluate, pursue, or convert a valuable opportunity within the next 60 days?*

---

## 1. The chain

```
Business objective
  → Operator need
    → Capability
      → Entity
        → Route
          → Service
            → Slice
              → Acceptance criterion
                → Metric
```

---

## 2. Primary trace — the critical path

### BO-1 — Find opportunities Todd would otherwise miss

| Layer | Value |
|---|---|
| **Operator need** | "I can't research 50 companies a day. Show me what matters." |
| **Capability** | Source intake → signal classification → tier-based suppression |
| **Entity** | `OiSource`, `OiSignal` |
| **Route** | `/tif/oi/intake` |
| **Service** | `intake/ingest.ts`, `intake/classify-signal.ts` |
| **Slice** | 1 |
| **Acceptance** | Paste → facts in under 5 s; tier displayed with reason; Tier 3 never surfaces |
| **Metric** | New qualified signals/week · signals rejected · signal→opportunity rate |

### BO-2 — Understand what is actually happening at an account

| Layer | Value |
|---|---|
| **Operator need** | "Three signals at one company mean something one doesn't." |
| **Capability** | Deterministic signal clustering into a confidence-scored initiative |
| **Entity** | `OiInitiative`, `OiInitiativeSignal` |
| **Route** | `/tif/oi/intake`, `/tif/oi/accounts/[id]` |
| **Service** | `intelligence/initiative-inference.ts` |
| **Slice** | 1 (deterministic), 2 (AI narrative) |
| **Acceptance** | Initiative proposed at ≥1 Tier 1 signal; **never** for Tier 2 alone; confidence matches the documented table |
| **Metric** | Opportunities with an approved initiative (target 100% of active) |

### BO-3 — Know whether an opportunity is worth Todd's time

| Layer | Value |
|---|---|
| **Operator need** | "What is my fastest credible path to $25–30K/month?" |
| **Capability** | Transparent scoring → expected value → priority efficiency |
| **Entity** | `OiScore` |
| **Route** | `/tif/oi/opportunities/[id]` (score panel) |
| **Service** | `commercial/score/*` |
| **Slice** | 1 (compute), 2 (explain) |
| **Acceptance** | All five worked examples reproduce exactly; `[ why? ]` shows the full arithmetic |
| **Metric** | Expected pipeline value · income replacement % · estimate accuracy |

### BO-4 — Know who owns the problem

| Layer | Value |
|---|---|
| **Operator need** | "Who do I actually contact, and is there a warm path?" |
| **Capability** | Role suggestion → candidate ranking → evidence-gated selection |
| **Entity** | `OiStakeholder`, `OiPerson`, `OiContactPoint` |
| **Route** | `/tif/oi/opportunities/[id]` (stakeholders), `/tif/oi/people/[id]` |
| **Service** | `intelligence/stakeholder-suggest.ts`, `commercial/score/access.ts` |
| **Slice** | 3 |
| **Acceptance** | Roles suggested per category; evidence-less roles cannot be selected; DNC suppressed at query level |
| **Metric** | Opportunities with an identified stakeholder · warm-path coverage |

### BO-5 — Say something credible

| Layer | Value |
|---|---|
| **Operator need** | "Give me a draft I'd actually send, grounded in real evidence." |
| **Capability** | Gated, evidence-grounded drafting with a claim validator |
| **Entity** | `OiOutreachDraft`, `OiProofItem` |
| **Route** | `/tif/oi/opportunities/[id]` (outreach) |
| **Service** | `action/outreach-compose.ts`, `action/claim-validator.ts`, `action/proof-match.ts` |
| **Slice** | 4 |
| **Acceptance** | Unsupported claims **block approval**; drafts cite specific evidence and proof; approval never sends |
| **Metric** | Research-informed outreach prepared · outreach→response rate |

### BO-6 — Never drop a thread

| Layer | Value |
|---|---|
| **Operator need** | "I can't hold follow-ups in my head." |
| **Capability** | Append-only activity log + auto-scheduled follow-up + overdue surfacing |
| **Entity** | `OiActivity`, `OiNextAction` |
| **Route** | `/tif/oi/today`, `/tif/oi/opportunities/[id]` (log) |
| **Service** | `action/activity.ts`, `commercial/next-action.ts` |
| **Slice** | 4 |
| **Acceptance** | Logging a send creates one activity + one +7d follow-up; overdue renders above everything |
| **Metric** | Follow-ups completed · % of opportunities with a next action (target 100%) |

### BO-7 — Spend under 30 minutes a day

| Layer | Value |
|---|---|
| **Operator need** | "Tell me the three things worth doing. Filter the rest." |
| **Capability** | Bounded ranked queue with path diversity and change detection |
| **Entity** | derived (no new entity) |
| **Route** | `/tif/oi/today` |
| **Service** | `queue/today.ts`, `queue/changes.ts`, `reporting/pipeline-summary.ts` |
| **Slice** | 5 |
| **Acceptance** | Max 5 cards; both paths represented; **full daily loop under 30 minutes** |
| **Metric** | Time from signal to first action · daily loop duration |

### BO-8 — Run the employment path properly

| Layer | Value |
|---|---|
| **Operator need** | "A $225K role is a real path. Don't let me waste time below the floor." |
| **Capability** | Comp floor enforcement · application tracking · interview stages · dual-track prompt |
| **Entity** | `OiRoleProfile` |
| **Route** | `/tif/oi/opportunities/[id]` (role profile) |
| **Service** | `commercial/role-profile.ts` |
| **Slice** | 6 |
| **Acceptance** | $224,999 disqualifies / $225,000 passes; below-floor retained as consulting lead; dual-track prompt renders |
| **Metric** | Applications submitted · application→interview rate · FTE comp under consideration |

### BO-9 — Learn what actually converts

| Layer | Value |
|---|---|
| **Operator need** | "Which signals and approaches produced revenue?" |
| **Capability** | Outcome capture + conversion analysis (advisory only) |
| **Entity** | `OiOutcome` |
| **Route** | `/tif/oi/opportunities/[id]` (outcome), `/tif/oi/today` (scorecard) |
| **Service** | `action/outcome.ts`, `reporting/conversion.ts` |
| **Slice** | 8 |
| **Acceptance** | Terminal transitions require an outcome; **no automatic weight tuning** |
| **Metric** | Conversion by signal type / score band / type · revenue attributed |

### BO-11 — Know whether Todd's judgment is improving

| Layer | Value |
|---|---|
| **Operator need** | "Was I right? Where am I systematically wrong?" |
| **Capability** | Prediction captured at decision time; reality compared later |
| **Entity** | `OiDecision` |
| **Route** | inline modal on every decision point; `/tif/oi/review` |
| **Service** | `action/decision.ts`, `reporting/conversion.ts` |
| **Milestone** | **1 (write)** / 4 (read) |
| **Acceptance** | Capture ≤20 s, pre-filled from score; unresolved predictions surface weekly |
| **Metric** | Decisions recorded · decisions resolved · predictions wrong · estimate accuracy |

### BO-12 — Walk into every conversation prepared

| Layer | Value |
|---|---|
| **Operator need** | "What do I actually know about this person?" |
| **Capability** | Assembled executive brief with provenance and research prompts |
| **Entity** | **derived** — person facts, signals, initiatives, stakeholder, gaps |
| **Route** | `/tif/oi/people/[id]` |
| **Service** | `action/executive-brief.ts` |
| **Milestone** | 2 |
| **Acceptance** | 13 sections; assembles <1 s; empty sections show a research prompt |
| **Metric** | Opportunities with a complete brief before outreach |

### BO-13 — Work a theme across many accounts

| Layer | Value |
|---|---|
| **Operator need** | "PA modernization is live at four payers — show me all of it." |
| **Capability** | Campaign grouping and pipeline rollup |
| **Entity** | `OiCampaign`, `OiCampaignOpportunity` |
| **Route** | `/tif/oi/campaigns` |
| **Service** | `reporting/pipeline-summary.ts` |
| **Milestone** | 2 |
| **Acceptance** | Many-to-many membership; EV and best-PE rollup per campaign |
| **Metric** | Campaign pipeline EV · accounts engaged per theme |

### BO-14 — Reset weekly with real numbers

| Layer | Value |
|---|---|
| **Operator need** | "What changed, what stalled, where did my time go?" |
| **Capability** | Auto-computed metrics + four reflection fields |
| **Entity** | `OiWeeklyReview` |
| **Route** | `/tif/oi/review` |
| **Service** | `reporting/weekly.ts` |
| **Milestone** | 4 |
| **Acceptance** | Review completes in under 15 minutes |
| **Metric** | Reviews completed · stalled opportunities resolved per review |

### BO-10 — Reach no-bid on an RFP in ten minutes — **DEFERRED post-Oct-1 (D-028)**

| Layer | Value |
|---|---|
| **Operator need** | "RFPs eat days and almost always end in no-bid. Get me there fast." |
| **Capability** | Deadline extraction · qualification filters · bid/no-bid with partner path |
| **Entity** | `OiRfpProfile` |
| **Route** | `/tif/oi/opportunities/[id]` (RFP) |
| **Service** | `commercial/rfp-qualification.ts` |
| **Slice** | 7 |
| **Acceptance** | Example D reproduces its documented recommendation and $1,846/hr PE; decision in under 10 min |
| **Metric** | RFP qualification time · no-bid rate |

---

## 3. Supporting trace — enabling, not directly revenue-producing

| Capability | Entity | Slice | Why it earns its place | Metric |
|---|---|---|---|---|
| Private access gate | — (existing middleware) | 0 | Todd is employed; exposure is unacceptable | — (guardrail) |
| Evidence provenance with verified offsets | `OiEvidence`, `OiOpportunityFact` | 0/1 | Outreach credibility depends on citable facts | % of claims traceable to a source |
| Research gap lifecycle | `OiResearchGap` | 1/2 | Directs research effort at decision-relevant unknowns | Gaps closed per qualified opportunity |
| State machine guards | — (service) | 2 | Prevents premature outreach on unready opportunities | Blocked-transition count |
| Entity resolution | `OiOrganization` | 1 | Prevents duplicate accounts fragmenting signal clusters | Duplicate rate |
| Offer catalogue | `OiOffer` | 0 | Grounds value estimates in Todd's real pricing | Estimate accuracy |
| Proof catalogue | `OiProofItem` | 0/4 | Makes outreach credible with real evidence | Proof cited per outreach |
| AI client adapter | — (service) | 2 | Enables narrative + drafting; degrades safely | AI availability rate |
| Backfill script | — | 0 | Preserves existing pursuit work | Rows migrated |

---

## 4. Metric definitions

### Leading (weekly)

| Metric | Definition | Target | Source |
|---|---|---|---|
| New qualified signals | Tier 1–2 signals promoted or attached | 10–15/wk | `OiSignal.status = promoted` |
| Signals rejected | Dismissed, with reason | — (health check) | `OiSignal.status = dismissed` |
| Active opportunities | Non-terminal, non-dismissed | 15–25 | `OiOpportunity.status` |
| With approved initiative | Initiative status ≥ `evidenced` | **100% of active** | join |
| With identified stakeholder | ≥1 `OiStakeholder` | ≥80% of qualified | join |
| **With a next action** | Exactly one open `OiNextAction` | **100%** | partial unique index |
| Outreach prepared | Drafts approved for manual use | 5–8/wk | `OiOutreachDraft.status` |
| Outreach sent | Logged sends | 5–8/wk | `OiActivity(outreach_sent)` |
| Applications submitted | FTE applications | 2–4/wk | `OiRoleProfile.appliedAt` |
| Follow-ups completed | Completed follow-up actions | 100% of due | `OiNextAction` |
| Conversations scheduled | Calls/meetings booked | 1–2/wk | `OiActivity(call_scheduled)` |

### Conversion

| Metric | Formula | Benchmark |
|---|---|---|
| Signal → opportunity | promoted ÷ captured | 20–40% |
| Opportunity → outreach | outreach sent ÷ qualified | 60–80% |
| Outreach → response | replies ÷ sent | 10–20% cold, 40–60% warm |
| Application → interview | screens ÷ applied | 10–20% |
| Conversation → proposal | proposals ÷ conversations | 30–50% |
| Proposal → engagement | won ÷ proposals | 25–40% |
| Signal → first action | median days | < 5 days |
| First action → conversation | median days | 14–28 days |
| Opportunity aging | days since `lastActivityAt` | < 14 days |

### Commercial outcomes — the only ones that decide October 1

| Metric | Definition | Target by Oct 1 |
|---|---|---|
| Consulting pipeline value | Σ `estimatedValue` (consulting types, active) | ≥ $400K |
| Consulting expected value | Σ `expectedValue` (consulting types, active) | ≥ $80K |
| FTE comp under consideration | Σ total comp (FTE at `interview_loop`+) | ≥ $450K (2 processes) |
| Interviews in progress | FTE at `recruiter_screen`+ | ≥ 2 |
| Proposals outstanding | `OiActivity(proposal_sent)` unresolved | ≥ 1 |
| Engagements won | `OiOutcome(engagement_won)` | ≥ 1 |
| Recurring monthly revenue | Σ `monthlyValue` where `isRecurring` | — |
| **Income replacement %** | Σ `expectedValue` ÷ $300,000 | **≥ 100%** |

### Guardrails

| Metric | Target | Why |
|---|---|---|
| Outreach with unsupported claims | **0** | Reputation |
| Contact attempts after DNC | **0** | Ethics and law |
| Autonomous sends | **0** | D-005 — architecturally impossible |
| Opportunities with no next action | **0** | Defect indicator |
| Stale opportunities (>14 d) | < 10% of active | Pipeline hygiene |
| Duplicate accounts | < 5% | Data integrity |

### Explicitly not tracked

Total records · total AI calls · total generated words · total sources stored · number of
dashboards · number of automated agents · total applications submitted **as a volume goal**.

None of these support an operating decision. Their absence is verified in POIS-802.

---

## 5. Coverage check — every slice serves an objective

| Milestone | Objectives served | Cuttable? |
|---|---|---|
| **0 — Stabilize** | Enables all | **No** — everything depends on it |
| **1 — Daily Driver** | BO-1, BO-2, BO-3, BO-6, BO-7, BO-11 (write) | **No** — this *is* the system. Never slips. |
| **2 — Commercial Intelligence** | BO-4, BO-12, BO-13 | **No** — outreach is impossible without stakeholders |
| **3 — Manual Outreach** | BO-5, BO-6, BO-8 | **No** — this is where the loop produces revenue |
| **4 — Learning** | BO-9, BO-11 (read), BO-14 | Degradable — weekly review matters, conversion analysis can wait |
| **5 — Compounding** | — | **Post-Oct-1 by definition** — depends on data that will not exist |
| *(deferred)* RFP | BO-10 | **Cut** — D-028 |

**No milestone exists without a business objective**, and Milestone 5 has none it can serve
before the deadline — which is exactly why it is unscheduled.

**Slip order:** M4 conversion analysis → M3 proposal outline → M2 campaigns → M2 playbooks.
**Milestone 1 never slips.**

---

## 6. Features considered and rejected

Recorded so they are not silently reintroduced.

| Rejected | Which objective it would serve | Why cut |
|---|---|---|
| ATS connectors | BO-1 | Manual intake handles 5–20/day; ~5 days of build against a 61-day deadline |
| Email lookup providers | BO-4 | Todd finds an email in 5 min; saves ~10 min/week |
| Email sending | BO-5 | Reputation risk exceeds the ~1 min/outreach saved (D-005) |
| Proposal generation | BO-9 | High-stakes; Todd should write these until a pattern is proven |
| CRM sync | none | No second user; nothing to sync with |
| Vector search | BO-2 | Tag matching meets every current need |
| Multi-user auth | none | One operator |
| Public-site integration | none | Not on any revenue path; Todd is employed |
| Mobile app | BO-7 | Responsive web at 390px is sufficient |
| Org-chart inference | BO-4 | Cannot be evidenced; would produce confident wrong answers |
| Autonomous discovery | BO-1 | No approval boundary; false-positive rate would destroy trust |
| `/research` route | BO-3 | Gaps belong in the workbench, next to the decision they affect |
| `/settings/scoring` route | BO-3 | Policy is versioned code, not runtime config |

---

## 7. Reading the matrix

**To cut scope:** find rows whose metric has no October 1 target. Those are candidates.

**To add scope:** a new capability must fill every column. If it has no operator need or no
metric, it does not belong in the first release.

**To check health:** any active opportunity without a next action is a defect. Any capability
with no metric is unfalsifiable and should be removed.
