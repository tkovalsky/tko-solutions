# Personal Opportunity Intelligence System — Operating Manual

**System name:** POIS (Personal Opportunity Intelligence System)
**Status:** Architecture baseline. Not yet implemented.
**Date:** 2026-07-31
**Operator:** Todd Kovalsky (sole operator)
**Deadline:** 2026-10-01 — **61 days from this document**
**Boundary:** Private, single-operator, internal. Not a product. Not client-facing.

This is an operating manual, not a PRD. It describes how Todd runs his commercial pipeline
using POIS. The architecture (`POIS-TARGET-ARCHITECTURE.md`) and the data model
(`POIS-DATA-MODEL.md`) exist to serve this manual, not the other way around.

---

## 1. Mission

POIS exists to buy back Todd's time and accelerate his exit from Cognizant.

It does this by answering one question every morning, in under 30 minutes:

> **What is my fastest credible path to $25,000–$30,000/month or a $225,000+ full-time role?**

Every capability in the system must materially improve Todd's ability to identify, evaluate,
pursue, or convert a valuable opportunity **within the next 60 days**. Capabilities that fail
that test are deferred or deleted from scope. There is no partial credit for architectural
elegance.

POIS is a multiplier on one person's judgment. It is not:

- a SaaS platform
- a generic CRM
- a recruiting platform
- a content management system
- an autonomous sales agent
- a knowledge graph
- an enterprise intelligence platform

---

## 2. The deadline and what counts as success

**By 2026-10-01, Todd spends under 30 minutes per day managing pipeline while consistently
advancing enough qualified opportunities to replace Cognizant income.**

### Income replacement target

Define **target annualized income** = **$300,000** ($25,000/month). All expected-value math
normalizes to this number so employment and consulting opportunities can be compared on one
axis. See `POIS-SCORING-AND-DECISION-MODEL.md` §7.

### Acceptable outcome paths

| Path | Definition | Annualized value | Typical cycle time |
|---|---|---|---|
| **A — Full-time role** | One FTE role ≥ $225,000 base, remote strongly preferred, appropriate seniority and scope | $225K–$300K+ | 6–14 weeks from application to offer |
| **B — Anchor engagement** | One high-value consulting engagement, ideally recurring or expandable | $150K–$300K+ | 4–10 weeks from first conversation |
| **C — Portfolio** | One small + one medium/anchor engagement, or two medium engagements | $300K combined | 6–12 weeks, staggered |

All three paths are live simultaneously. **The system must never force Todd to choose one
path before the market does.** A single buying initiative can legitimately produce an FTE
opportunity, a consulting assessment, and a partnership route at the same account.

### What the deadline implies for build sequencing

61 days is not enough time to build a platform. It is enough time to build a narrow,
usable loop and then *use it for seven weeks*. Therefore:

- The system must be **usable by day 8** (intake → scored opportunity → next action).
- It must be a **daily driver by day 13** (Today view + workbench).
- Anything not shipped by **day 45** will not influence the October 1 outcome and should be
  treated as post-deadline work.

Build time is competing directly with pipeline time. Prefer the smaller build.

---

## 3. Operator constraints

These are architectural inputs, not caveats.

| Constraint | Implication for POIS |
|---|---|
| Employed full-time at Cognizant | Work happens in ~10–15 hrs/week: early mornings, evenings, weekends |
| No sales team, no assistant | Every workflow must be completable by one person |
| Cannot research 50 companies/day | The system filters *before* Todd starts working |
| Reputation is the asset | No mass outreach, no spam, no fabricated familiarity |
| Cognizant employment is current | Nothing in POIS may be public or attributable; all routes private |
| Limited budget | Prefer $0 and existing infrastructure; paid services need explicit approval |

**Design consequence:** POIS optimizes for *decisions per hour*, not records per day. A view
that shows Todd 40 opportunities has failed. A view that shows him three, with reasons, has
succeeded.

---

## 4. Core model: Signal → Initiative → Opportunity

The single most important modeling decision:

> **The buying initiative is the central intelligence object. The opportunity is the
> actionable commercial pursuit.**

```
Source ─→ Signal ─┐
Source ─→ Signal ─┼─→ Initiative ─┬─→ Opportunity (FTE)
Source ─→ Signal ─┘   (the real   ├─→ Opportunity (consulting assessment)
                       thing      └─→ Opportunity (partnership)
                       happening)
```

### Why this matters commercially

A job posting is **not** an opportunity. It is a *signal* that may reveal:

- a funded initiative
- a capability gap
- an executive priority
- a stalled implementation
- an organizational redesign
- a regulatory response
- a staffing problem
- a transformation budget
- a role Todd may apply for
- a consulting wedge
- **or nothing actionable at all**

POIS must distinguish these cases. Treating every posting as an opportunity is how people
end up applying to 200 jobs and getting nowhere.

### The compounding rule

Three related signals at one account are worth far more than one isolated signal, because
together they evidence a *funded initiative* rather than a routine backfill.

> Example: "SVP Clinical Ops hired" + "Director of PA Transformation posted" + "CMS interop
> rule effective January" = a funded prior-authorization modernization program with a new
> executive owner and a regulatory deadline. That is an initiative. Any one of those signals
> alone is noise.

Signal clustering into initiatives is the system's highest-leverage inference. See
`POIS-SCORING-AND-DECISION-MODEL.md` §3.

### Never assume

- A job posting is an opportunity.
- A recruiter is the buyer.
- The person named in an article owns the initiative.
- High compensation means a good role.
- A large RFP is a realistic opportunity.
- An inferred reporting line is a fact.

Every one of these is a labeled hypothesis with confidence and evidence, or it does not
appear in the system.

---

## 5. Signal hierarchy

Signals are tiered. Tier drives ingestion priority, scoring weight, and whether the system
bothers Todd about it.

### Tier 1 — act on these

| Signal type | Why it matters |
|---|---|
| Senior healthcare transformation job posting | Funded initiative with a named owner and a budget |
| PA / UM / interoperability / workflow / implementation / AI-governance / program-recovery posting | Direct capability match |
| Open RFP with a plausible Todd or partner role | Explicit funded scope with a deadline |
| Senior leadership appointment or departure | New executive = new mandate = 90-day window |
| Concentrated hiring around one transformation theme | Strongest evidence of a funded program |
| Explicit operational/compliance/delivery/implementation problem stated publicly | Named pain |
| Announced major transformation program | Budget exists |
| Public evidence of a stalled or troubled program | Program-recovery wedge, Todd's sharpest offer |

### Tier 2 — cluster these, act when they compound

Acquisitions and mergers · new funding · major vendor selection or replacement ·
earnings-call statements · regulatory deadlines or enforcement · technology modernization
announcements · major partnerships · conference presentations by likely buyers ·
consulting/implementation partner changes.

A Tier 2 signal alone does not create an opportunity. Two Tier 2 signals at one account, or
one Tier 2 plus one Tier 1, do.

### Tier 3 — record, do not surface

General healthcare news · generic thought leadership · weakly connected corporate
announcements · isolated junior job openings.

Tier 3 exists so Todd can dismiss it in one click and so the account history is complete.
Tier 3 signals never appear in the Today view.

---

## 6. Opportunity hierarchy

### Highest priority

1. **FTE leadership role ≥ $225K** — Path A, fastest to full income replacement
2. **High-value consulting engagement** — Path B anchor
3. **Fractional transformation / program-recovery leadership** — recurring, Path C anchor
4. **Paid diagnostic or assessment that can expand** — fastest to *first dollar*, seeds Path B/C
5. **Subcontract / specialist partnership with a credible prime** — low CAC, uses someone
   else's client access

### Secondary

Medium consulting engagement · paid workshop or executive briefing · referral or channel
partnership · state RFP with realistic access · federal opportunity with a realistic partner
path.

### Low priority — the system should suppress these

Unpaid speaking · generic networking · uncompensated advisory · mass job applications ·
RFPs Todd cannot credibly bid, prime, or partner on · anything with no identifiable
urgency, sponsor, or access path.

**Suppression is a feature.** The system earns its keep by refusing to show Todd work that
cannot pay.

---

## 7. Priority industries

**Tier 1 (optimize the first release for these):** healthcare payers · healthcare providers ·
health technology companies · healthcare services organizations · healthcare-focused PE
portfolio companies.

**Tier 2:** insurance · regulated financial services · government healthcare programs ·
healthcare consulting/implementation firms seeking senior independent capability.

**Deferred unless exceptional fit:** pharma · unrelated technology · general public sector ·
industries with no connection to Todd's record.

The data model supports expansion. The scoring profile ships tuned for Tier 1.

---

## 8. Commercial ladders

POIS supports two ladders. **They must not be collapsed into one indistinguishable
workflow** — the states mean different things and the cycle times differ by 3×.

### Consulting ladder

```
Relevant signal or introduction
  → Evidence-backed point of view
  → Executive conversation
  → Paid assessment / workshop / diagnostic
  → Program recovery / transformation / implementation engagement
  → Recurring advisory, fractional leadership, or expansion
```

The wedge is the paid assessment. It converts a conversation into revenue in 2–4 weeks and
buys the right to propose the larger engagement. Todd's existing offer architecture
(Operational Recovery Assessment, $5K–$8K; Prior Authorization Operational Assessment) maps
directly onto this rung. See `docs/strategy/PRIOR_AUTHORIZATION_OPERATIONAL_ASSESSMENT.md`.

### Employment ladder

```
Relevant role or initiative signal
  → Hiring-context and stakeholder analysis
  → Targeted application AND direct outreach (both, not either)
  → Executive or hiring-manager conversation
  → Interview process
  → $225K+ offer
```

The differentiator is **step 3 run in parallel**. An application alone lands in an ATS
queue. An application plus a researched, evidence-grounded note to the hiring executive is a
different process with a different response rate. POIS exists to make that second half cheap
enough to always do.

### Cross-ladder rule

If an account has a Tier 1 signal and Todd is credible for both, create **two opportunities**
under **one initiative** — one FTE, one consulting. Track them separately, because their
states, stakeholders, and cycle times differ. Do not force a choice up front; let the market
respond first.

---

## 9. Daily operating workflow

**Target: under 30 minutes. Hard cap: 45 minutes.**

### Morning (20–30 min)

1. **Open `/tif/oi/today`.** (2 min)
   Read the top of the page: what changed since yesterday, what is overdue.

2. **Triage new signals.** (5 min)
   The system shows newly ingested signals with a tier and a proposed classification.
   For each: **Promote** (becomes/joins an initiative), **Dismiss** (one click + optional
   reason), or **Watch** (keep at account, do not surface).
   Dismissal reasons feed the learning loop; they are not throwaway.

3. **Work the top three.** (15–20 min)
   The Today view presents **at most five** opportunities, ranked by Priority Efficiency
   (expected value ÷ Todd-hours required). Each carries exactly one next action with a
   time estimate. Do the top three. Typical actions:
   - Review and approve an initiative hypothesis
   - Close one research gap
   - Approve a stakeholder as the outreach target
   - Review and approve a prepared outreach draft, then send it manually
   - Log a reply and set the next follow-up

4. **Log anything that happened externally.** (3 min)
   Replies, calls, intro requests. Append-only. This is the only manual bookkeeping the
   system requires, and it is what makes the learning loop real.

### Evening (optional, 5 min)

Capture anything encountered during the day: a URL, a name, a paste. Intake must take under
two minutes or Todd will not do it. Everything else can wait for morning triage.

### What Todd should never do daily

Browse a list of all opportunities · re-read source material he has already reviewed ·
manually re-derive who a stakeholder is · rewrite an outreach draft from scratch · check
whether a follow-up is due.

---

## 10. Weekly operating workflow

**Sunday or Monday, 45–60 minutes.**

1. **Pipeline review.** Every active opportunity, its stage, age, and next action.
   Anything with no next action is a defect — either assign one or close it.
2. **Stale sweep.** The system surfaces opportunities with no activity in 14 days and
   sources older than the freshness thresholds (§13). Advance, pause, or close each.
3. **Coverage check.** Are all three income paths live? If the pipeline is 100% consulting
   or 100% FTE, correct it — a single-path pipeline is a single point of failure against a
   hard deadline.
4. **Income replacement math.** The system computes expected annualized income contribution
   across the pipeline. If it is below $300K, the constraint is top-of-funnel: add sources.
5. **Source review.** Which sources produced qualified opportunities this week? Add one
   source type, drop one that produced nothing.

### The weekly review surface

From Milestone 4 the weekly review has its own screen at `/tif/oi/review`
(`POIS-OPERATOR-UX.md` §8.5). It auto-computes the metrics and asks Todd for the four things
that cannot be computed: what changed, where time went, lessons, and next week's focus.

The section that earns the review its place is **"predictions that were wrong."** Every
decision Todd recorded carries what he expected; the review shows where reality disagreed.
That is the only mechanism in the system that improves Todd's judgment rather than just his
throughput.

---

## 11. Monthly operating workflow

**45 minutes, first weekend of the month.** Realistically this runs twice before the
deadline: September 1 and October 1.

1. Close out won/lost opportunities with a reason and a lesson.
2. Review conversion rates by opportunity type, signal tier, and source.
3. Adjust the scoring policy — as an explicit **new version**, never an edit in place.
4. Reassess: is the current path mix right, given 30 fewer days?

---

## 12. Source strategy

Do not build integrations before the loop is proven. The manual loop must be genuinely
useful first; connectors only reduce the cost of a workflow that already works.

### Phase 1 — manual and URL intake (ship in Slice 1)

Pasted job descriptions · job URLs · pasted articles · press releases · manually entered
executive changes · manually added RFP links and documents · company pages · operator notes.

Everything is operator-initiated. No fetching, no crawling, no background jobs. This is
enough to run the entire commercial loop and it is enough to hit October 1.

### Phase 2 — evaluate only after Phase 1 is a daily habit

Greenhouse · Lever · Ashby · SmartRecruiters · public Workday listings · iCIMS · CMS ·
SAM.gov · selected state procurement portals · SEC filings · company press-release feeds ·
selected healthcare publications.

Each requires a documented terms review before implementation. Greenhouse, Lever, and Ashby
publish public job-board JSON endpoints intended for consumption and are the correct first
three. **Phase 2 is almost certainly post-October-1 work.**

### Restricted — LinkedIn

LinkedIn may be used **only** through:
- operator-provided URLs
- manual research Todd performs in his own browser
- permitted official APIs
- lawfully obtained data exports
- explicit operator input

**Never:** scraping, automated login, credential sharing, or any bypass of access controls.
This is a legal, contractual, and account-risk boundary, not a technical preference. It is
not negotiable and must not be revisited by Codex.

---

## 13. Freshness rules

Stale intelligence produces embarrassing outreach. Defaults:

| Record | Stale when | Consequence |
|---|---|---|
| Job posting | Closed/removed, or not reverified in 14 days | Score penalty; blocked from outreach prep |
| Person role | Older than 60 days | Must reverify before outreach |
| Contact point | Older than 30 days | Must reverify before use |
| Initiative signal | 90 days with no reinforcing evidence | Confidence downgraded |
| Relationship activity | Never expires | But derived state conclusions may |

---

## 14. Automation boundaries

This table is binding. `POIS-DECISIONS.md` D-011 records it as an approved decision.

### Automate (deterministic or AI-assisted, no approval needed)

Source ingestion · duplicate detection · structured extraction · initial classification ·
initiative inference (as a **labeled hypothesis**) · signal clustering · fit scoring ·
prioritization · research-gap generation · stakeholder-**role** suggestions · stakeholder
candidate discovery where permitted · research summaries · proof and offer suggestions ·
draft preparation · next-action calculation · reminders · pipeline aging · outcome metrics.

### Require Todd's explicit approval

Promotion from signal to active opportunity · final initiative hypothesis · selected
stakeholder · selected offer · **any outbound message** · application submission · proposal ·
commercial estimate · opportunity closure reason.

### Keep fully human

Relationship development · calls · negotiation · diagnostic judgment · proposal commitments ·
pricing · interpretation of ambiguous evidence · ethical and reputational decisions.

### What the system prepares (and never transmits)

POIS assembles all of the following. Todd sends every one of them himself.

| Artifact | Gate |
|---|---|
| Executive brief | Evidence exists |
| Research summary | Evidence exists |
| Talking points | Evidence exists |
| Meeting prep | Evidence exists |
| Email draft | Full outreach gate |
| LinkedIn draft | Full outreach gate |
| Intro request | Full outreach gate + a warm path |
| Application note | Full outreach gate |
| Follow-up draft | Prior outreach logged |
| Proposal outline | Template + checklist — Todd writes the prose |

All ten are one model (`OiArtifact`) with a `kind` enum. **There is no `sentAt` field
anywhere.** Sending is an activity Todd logs after sending from his own client.

### Absolute prohibitions for the first release

- **No autonomous outbound communication of any kind.** No email API. No LinkedIn API. No CRM
  sync. No calendar integration. No application submission. POIS prepares; Todd sends; Todd
  logs.
- No automated applications.
- No scraping of access-controlled sources.
- No AI-authored numeric score. AI may draft prose and propose hypotheses; the score is
  deterministic, versioned, and reproducible from fixtures.

**Rationale for draft-only:** Todd's reputation and current employment are the assets at
risk. A single bad automated send costs more than the system saves in a year.

---

## 15. Decision rules

Rules the system enforces so Todd does not have to remember them.

1. **No opportunity without a next action.** An opportunity with no next action is either
   closed or is a defect surfaced in the weekly review.
2. **No outreach without evidence.** Outreach preparation is blocked unless: the initiative
   hypothesis is operator-approved, at least one stakeholder is selected with a source, and
   the relevance statement is populated.
3. **No unsupported personalization.** Any claim in a draft that cannot resolve to a source
   or an operator-confirmed fact is flagged and blocks approval.
4. **Suppress rather than accumulate.** Disqualified, closed, duplicate, stale, and snoozed
   items never appear in the Today view.
5. **Cap the queue at five.** If more than five opportunities qualify, the ranking is wrong,
   not the cap.
6. **Two-minute intake.** If capturing a source takes longer, the intake form is wrong.
7. **Hypotheses are labeled.** Inferred initiative, inferred owner, and inferred reporting
   line always render visually distinct from sourced facts.
8. **Disqualify early and loudly.** Hard filters (comp floor, geography, non-viable RFP)
   reject before scoring and state which filter fired.
9. **Score changes are versioned.** Policy edits create a new version; historical snapshots
   remain immutable and comparable.
10. **Every meaningful decision records its prediction.** Promoting, qualifying, dismissing,
    selecting a stakeholder or offer, sending outreach, and closing all capture what Todd
    expected *before* the outcome is known. Pre-filled from the score; ≤20 seconds. This is
    the only way the system can later tell him where his judgment was wrong.

---

## 16. Success metrics

Tracked by the system, reviewed weekly. Full definitions in
`POIS-TRACEABILITY-MATRIX.md` §4.

### Leading indicators (weekly)

New qualified signals · signals rejected (and why) · active opportunities · opportunities
with an approved initiative · opportunities with an identified stakeholder · opportunities
with a current next action (**target: 100%**) · research-informed outreach prepared ·
applications submitted · outreach sent · follow-ups completed · conversations scheduled.

### Conversion indicators

Signal→opportunity rate · opportunity→outreach rate · outreach→response rate ·
application→interview rate · conversation→proposal rate · proposal→engagement rate ·
time from signal to first action · time from first action to conversation · opportunity
aging distribution.

### Commercial outcomes — the only ones that decide October 1

Consulting pipeline value · consulting expected value · recurring monthly revenue · booked
revenue · FTE compensation under consideration · interviews in progress · proposals
outstanding · engagements won · **income replacement percentage** (expected annualized
income ÷ $300,000).

### Explicitly not success

Total records · total AI calls · total generated words · total stored articles · number of
dashboards · number of automated agents · total applications submitted.

---

## 17. Build and operate schedule

**Superseded.** The schedule now lives in `POIS-CODEX-IMPLEMENTATION-PLAN.md` as Milestones
0-5. Maintaining two schedules guarantees they drift.

The shape Todd needs to know:

| | Ends | Todd can... |
|---|---|---|
| Milestone 0 - Stabilize | Aug 2 | (nothing new) |
| **Milestone 1 - Daily Driver** | **Aug 9** | **Run his real pipeline every morning** |
| Milestone 2 - Commercial Intelligence | Aug 18 | Know who to contact and what to offer |
| Milestone 3 - Manual Outreach | Aug 28 | Prepare everything he sends |
| Milestone 4 - Learning | Sep 6 | See whether his judgment is improving |
| **Build freeze** | **Sep 14** | **All remaining time goes to conversion** |
| Milestone 5 - Compounding | post-Oct-1 | *(not scheduled)* |

Two things matter more than the rest of this document:

1. **Todd starts using POIS on August 9**, on Milestone 1 alone, and keeps using it while the
   later milestones land. Waiting for "finished" is how this fails.
2. **Building stops on September 14.** Build time competes directly with conversion time, and
   after day 45 conversion is worth more.

## 18. Worked examples

These are the acceptance narratives. If POIS cannot run all four, the architecture is wrong.

### Example A — Job posting

**Input:** Todd pastes a posting: "Director, Prior Authorization Transformation" at Example
Health Plan.

**System:**
1. Stores an immutable source snapshot; hashes it; detects it is new.
2. Extracts facts with verified source offsets: title, reporting line ("reports to VP
   Utilization Management"), business problem ("reduce turnaround time and denial rework"),
   technology ("Epic, FHIR"), urgency ("CMS January deadline"), compensation ("$180K–$210K").
3. Classifies signal: **Tier 1**, healthcare payer, PA/UM domain.
4. Checks the account: finds two existing signals — an SVP Clinical Ops appointment (41 days
   ago) and a CMS interoperability compliance note.
5. **Proposes an initiative:** "Prior authorization modernization under new clinical ops
   leadership, driven by CMS interop deadline." Confidence 0.78. Three supporting signals,
   each linked to its source.
6. Generates two opportunity candidates from one initiative:
   - **FTE:** the posted Director role. Comp $180–210K is **below the $225K floor** → hard
     filter fires → flagged "below comp floor; pursue only as consulting or as a negotiation
     anchor."
   - **Consulting:** Prior Authorization Operating Diagnostic. Estimated value $25K–$100K.
     Probability 0.20. **Expected value $5K–$20K.** Prep 25 min.
7. Opens research gaps: "Who owns the PA budget — VP UM or SVP Clinical Ops?", "Is there an
   incumbent consulting partner?"
8. Suggests stakeholder roles to find: economic buyer (SVP Clinical Ops), operational owner
   (VP UM), hiring manager (for the posted role).
9. **Next action:** "Approve the initiative hypothesis, then review the executive dossier."
   Estimated 10 minutes.

**Todd:** approves the initiative, rejects the FTE opportunity (below floor), keeps the
consulting opportunity, closes one research gap in five minutes of LinkedIn research.

### Example B — Article

**Input:** Todd pastes an article: "Regional Payer Delays Care Management Platform Rollout
by 18 Months."

**System:** creates a source, extracts the account and the stated problem, classifies as a
**Tier 1 stalled-program signal**, proposes initiative "Care management platform
implementation recovery," confidence 0.62 (single source), flags "no named owner" as the
top research gap, recommends the **program-recovery** wedge — Todd's sharpest and highest-
value offer — with estimated value $75K–$150K, and sets the next action to "Identify the
executive accountable for the delayed program."

**Why this matters:** a stalled program is the highest-conversion consulting signal that
exists, and it never appears on a job board.

### Example C — Executive move

**Input:** Todd pastes a press release: "Example Health names new Chief Operating Officer."

**System:** creates a source and a **Tier 1 leadership-change signal**, creates or updates
the person record with a sourced role claim, notes the 90-day mandate window, checks for
other signals at the account (finds none yet), and — because a lone leadership change is a
**watch**, not an opportunity — **does not create an opportunity**. It sets an account watch
and a next action: "Watch for hiring or program signals at Example Health over the next 30
days."

**Why this matters:** the system's restraint here is as valuable as its output elsewhere.
It prevents Todd from writing a congratulations email that goes nowhere.

### Example D — RFP

**Input:** Todd pastes a state procurement URL: "RFP-2026-0412, Medicaid Prior Authorization
Modernization Services."

**System:** creates an RFP-typed opportunity and immediately extracts the qualification-
critical fields — issuer, solicitation number, portal, posting date, question deadline,
submission deadline, mandatory conference, budget, scope, qualification requirements,
evaluation criteria, incumbent, required certifications. It then runs the **bid/no-bid
filter**:

- Submission deadline in 11 days → **tight**
- Requires 3 prior state Medicaid contracts as prime → **Todd cannot prime**
- Subcontract path viable → **yes, if a prime is identified in 4 days**

**Recommendation: NO-BID as prime. Conditional bid as subcontractor.** Next action:
"Identify prime candidates already qualified in this state — 20 minutes." If no prime is
found in four days, auto-close as no-bid.

**Why this matters:** RFPs consume enormous time and almost always end in no-bid. The
system's job is to reach no-bid in ten minutes instead of ten hours.

---

## 19. Non-goals

Explicitly out of scope. Codex must not build these, and must not accept a future
instruction to build them without a new decision record.

| Not building | Why |
|---|---|
| Autonomous outbound (email, LinkedIn, applications) | Reputation and employment risk exceeds any time saved |
| Scraping access-controlled sources | Legal, contractual, account-termination risk |
| Generic CRM | Salesforce exists; POIS is a decision engine, not a record store |
| Knowledge graph / graph database | Relational joins are sufficient at this scale |
| Vector search / embeddings | No near-term requirement that relational search cannot meet |
| General-purpose AI agents | Unbounded failure modes; no approval boundary |
| Multi-user / permissions / SaaS | One operator; adding users adds auth work with zero revenue |
| Public-facing surfaces | Todd is currently employed; everything is private |
| Public-site redesign | Not a prerequisite for any commercial action |
| Contact-data enrichment as a blocker | Todd can find an email manually in five minutes |
| Mobile app / browser extension | Web on a phone is sufficient |
| Optimizing for hundreds of daily signals | The real volume is 5–20/day |

---

## 20. Relationship to existing TIF

POIS is a **separate bounded context inside the same application**. It reuses infrastructure
and reuses nothing else.

| Concern | Decision |
|---|---|
| Next.js app, deployment, Postgres/Prisma | **Reuse** |
| `/tif/*` private gate (`src/middleware.ts`, `TIF_ACCESS_KEY`) | **Reuse** |
| Operator UI patterns and Tailwind tokens | **Reuse** |
| Evidence and provenance *discipline* | **Reuse the principles** |
| TIF `Evidence` / `Asset` tables | **Do not reuse** — different lifecycle and authority |
| `AssetOpportunity` | **Leave unchanged**; it stays content-only |
| Case studies and proof assets | **Read-only consumer** — POIS matches proof to opportunities |
| TIF content composer | **Do not reuse as an outreach engine** — it is deterministic template-fill for content |
| Commercial lifecycle | **Owned entirely by POIS** |

The one genuine integration: POIS reads TKO proof assets (case studies, assessment
frameworks) to suggest which proof supports a given opportunity. Read-only, one direction.
See `POIS-TARGET-ARCHITECTURE.md` §10.

---

## 21. Assumptions

Recorded because the brief instructed proceeding without blocking. Each is a default that
Todd can override; none prevents implementation.

| # | Assumption | Override cost |
|---|---|---|
| A1 | Target income $300K/yr ($25K/mo) is the normalization constant | Trivial — one config value |
| A2 | FTE comp floor is $225K base; roles below are hard-filtered but retained as consulting leads | Trivial — config |
| A3 | Remote is strongly preferred, not required; on-site is a scoring penalty, not a filter | Trivial — config |
| A4 | Consulting engagement values: assessment $5–8K, diagnostic $15–30K, recovery/build $45–150K, fractional $12–25K/mo (from `CURRENT_REALITY.md`) | Trivial — config |
| A5 | Todd has ~10–15 hrs/week for pipeline work | Affects Priority Efficiency calibration only |
| A6 | Draft-only outreach for the entire first release | Changing this requires a new decision record |
| A7 | Single operator; shared access key is acceptable | Adding a second user requires real auth |
| A8 | Anthropic is the AI provider (`ANTHROPIC_API_KEY` already provisioned) | Adapter boundary keeps this swappable |
| A9 | Healthcare Tier 1 focus for the first release | Config-driven; expansion is data, not code |
| A10 | Both employment and consulting paths run concurrently from day 1 | Structural — the data model assumes it |

---

## 22. What "done" means for the first release

Todd can, without leaving the system:

1. Paste a job posting, article, press release, or RFP in under two minutes.
2. See extracted facts, each traceable to an exact offset in the stored source.
3. See a proposed initiative with confidence and supporting signals.
4. See classified opportunities (FTE, consulting, RFP, partnership) with transparent scores.
5. Understand *why* opportunity A ranks above opportunity B.
6. See likely stakeholders with roles, authority, and evidence — labeled as hypotheses.
7. Approve a stakeholder and an offer.
8. Get a prepared, evidence-grounded outreach draft with no unsupported claims.
9. Send it himself, log it, and get a follow-up scheduled automatically.
10. Open one view each morning that tells him the three things worth doing today.
11. See what percentage of his income replacement target is represented in the pipeline.

If Todd can do those eleven things by day 20, the system has done its job and the remaining
41 days go into conversion, which is where the money actually is.
