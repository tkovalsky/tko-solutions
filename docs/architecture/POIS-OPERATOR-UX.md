# POIS Operator UX

**Date:** 2026-07-31
**Operator:** Todd, one person, 10–15 hrs/week, mostly early morning
**Design constraint:** The daily loop must complete in under 30 minutes.

---

## 1. Design principles

1. **Decisions, not data.** Every screen presents a decision with enough context to make it.
   No screen exists to "show all records."
2. **One next action per opportunity.** Always visible, always specific, always with a time
   estimate.
3. **Hypotheses look different from facts.** Inferred content renders with a dashed border
   and an `inferred` chip. Sourced facts render solid with a source link. Todd must never
   have to remember which is which.
4. **Suppression is a feature.** Dismissed, stale, disqualified, and snoozed items are gone
   from working views by default.
5. **Two-minute intake.** If capture takes longer, the form is wrong.
6. **No sprawl.** Seven routes total. A new route requires deleting one or a decision record.
7. **Reuse existing patterns.** Same Tailwind tokens, card shapes, and badge treatments as
   the current `/tif` console. No new design system.

---

## 2. Information architecture

```
/tif                              existing TIF content console (unchanged)
/tif/opportunities                LEGACY pursuit queue — read-only banner, retire post-Oct-1

/tif/oi                           → redirect to /tif/oi/today
/tif/oi/today                     ① TODAY — the daily driver
/tif/oi/intake                    ② INTAKE — paste/URL capture + triage
/tif/oi/opportunities             ③ PIPELINE — all opportunities, filterable
/tif/oi/opportunities/[id]        ④ WORKBENCH — the single opportunity surface
/tif/oi/accounts                  ⑤ ACCOUNTS — org list + initiative rollup
/tif/oi/accounts/[id]             ⑥ ACCOUNT — initiatives, people, signals, opportunities
/tif/oi/people/[id]               ⑦ EXECUTIVE BRIEF — the stakeholder surface (§6.5)
/tif/oi/campaigns                 ⑧ CAMPAIGNS — theme rollup (M2)
/tif/oi/review                    ⑨ WEEKLY REVIEW (M4)
```

**Nine routes.** Everything else is a section within one of them.

Executive Brief deliberately does **not** get its own route — it *is* `/tif/oi/people/[id]`.
Timeline, decision journal, RFP, and research gaps are all sections, not routes.

Deliberately **not** built: a separate `/research` queue (gaps live in the workbench), a
separate `/rfp` route (RFP is an opportunity type, rendered by the workbench), a separate
`/settings/scoring` (policy is code + a `todd-v2` constant), a `/signals` route (triage lives
in intake), a `/stakeholders` list (stakeholders live on opportunities).

### Global shell

Persistent header on every `/tif/oi/*` route:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ POIS   Today(3)  Intake(5)  Pipeline(23)  Accounts        Oct 1: 61 days │
└──────────────────────────────────────────────────────────────────────────┘
```

- Counts: open next actions due today · untriaged signals · active opportunities.
- **The countdown is deliberate.** It is the single most motivating piece of information on
  the screen and costs one line of code.

---

## 3. ① Today — `/tif/oi/today`

**Purpose:** Answer, in 30 seconds: what do I work on, what can I ignore, what changed,
what is overdue.

**Primary action:** Start the top next action.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Today · Friday 31 July                                    Oct 1 · 61 days    │
│                                                                              │
│ Pipeline: $187,400 expected  ·  62% of $300K target  ·  2 paths live         │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░                             │
└──────────────────────────────────────────────────────────────────────────────┘

⚠ OVERDUE (1)
┌──────────────────────────────────────────────────────────────────────────────┐
│ Follow up · Regional Payer — Care Mgmt Recovery          due 2 days ago      │
│ Sent 9 days ago to Sarah Chen (VP Operations). No reply.                     │
│ [ Log reply ]  [ Send follow-up ]  [ Snooze 3d ]                       10min │
└──────────────────────────────────────────────────────────────────────────────┘

WORK THESE THREE
┌──────────────────────────────────────────────────────────────────────────────┐
│ 1 · Regional Payer Health                          CONSULTING   $5,063/hr    │
│     Care Management Platform Recovery                                        │
│                                                                              │
│     Why now: Stalled program publicly acknowledged. Warm path — Sarah Chen    │
│     was your colleague at [prior co]. Fit 99 · Evidence 90 · Access 82.       │
│     Changed: +1 signal yesterday (Q2 earnings call mention).                  │
│                                                                              │
│     Value $54,000 · 60% · EV $32,400 · 6.4 hrs remaining                      │
│                                                                              │
│     → NEXT: Prepare outreach                                          20min  │
│     [ Start ]   [ Open workbench ]   [ Snooze ]                              │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ 2 · Northeast Health Plan                                  FTE   $784/hr     │
│     VP Operations Transformation  ·  $240–265K  ·  Remote                     │
│                                                                              │
│     Why now: Posting closes in 9 days. Meets comp floor.                      │
│     Fit 88 · Evidence 65 · Access 40                                          │
│                                                                              │
│     → NEXT: Complete role profile (comp verified, reporting line)     10min  │
│     [ Start ]   [ Open workbench ]   [ Dismiss ]                             │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ 3 · Example Health Plan                              ASSESSMENT  $626/hr     │
│     Prior Authorization Modernization                                        │
│                                                                              │
│     Why now: CMS January deadline. New SVP Clinical Ops (41 days).            │
│     Fit 100 · Evidence 65 · Access 0  ← no stakeholder yet                    │
│                                                                              │
│     → NEXT: Identify stakeholder (SVP Clinical Ops / VP UM)           15min  │
│     [ Start ]   [ Open workbench ]   [ Snooze ]                              │
└──────────────────────────────────────────────────────────────────────────────┘

NEW SIGNALS (5 untriaged)                                    [ Go to intake → ] 
  Tier 1 · Humana — Director, UM Transformation posted            2h ago
  Tier 1 · Availity — CTO departure announced                     6h ago
  Tier 2 · Elevance — Q2 earnings: "administrative cost pressure" 1d ago
  + 2 more

WATCH (2)                                                            [ expand ]
  Example Health — new COO, no other signals yet         watching 12d

WHAT CHANGED
  ↑ Regional Payer +1 signal → initiative confidence 0.78 → 0.88
  ↓ Metro Health — posting closed, opportunity auto-disqualified
  ✓ You logged: reply from Availity (positive) 2d ago
```

### Behavior

- **Max five opportunity cards.** If more qualify, ranking is wrong, not the cap.
- Ranked by Priority Efficiency, with path diversity enforced (§9 of the scoring doc).
- Overdue actions render above everything, always.
- `[ Start ]` navigates to the workbench section for that action type — never to a generic
  page.
- `[ Snooze ]` opens a 3-choice popover (3d / 1w / 2w) and requires no reason.
- `[ Dismiss ]` requires a reason (dropdown + optional text). **Reasons feed the learning
  loop**; this is the one place friction is justified.
- "What changed" covers the last 48 hours; capped at 6 lines.

### Empty state

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Nothing queued.                                          │
│                                                                              │
│   Your pipeline has 4 active opportunities, all waiting on external replies.  │
│                                                                              │
│   Best use of the next 20 minutes:                                           │
│   → Add a source. Paste a job posting, article, or RFP.     [ Go to intake ] │
│                                                                              │
│   Pipeline: $84,200 expected · 28% of target · below the pace for Oct 1.      │
└──────────────────────────────────────────────────────────────────────────────┘
```

The empty state gives a *directive*, not congratulations. At 28% of target with 61 days
left, "you're all caught up!" would be a lie.

---

## 4. ② Intake — `/tif/oi/intake`

**Purpose:** Capture in under two minutes; triage new signals.

### Wireframe

```
┌─ ADD A SOURCE ───────────────────────────────────────────────────────────────┐
│                                                                              │
│  Paste the content                                                           │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  (paste job posting, article, press release, or RFP text)              │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Source URL (optional)   [ https://…                                      ]  │
│  Organization            [ Example Health Plan          ] ← autocomplete     │
│  Source type             [ Job posting ▾ ]   Published  [ 2026-07-28 ]       │
│                                                                              │
│                                              [ Capture and analyze ]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Four required fields.** Organization autocompletes against existing accounts and shows
`+ Create "Acme Health"` when no match. Everything else is derived.

### After capture — review screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ✓ Captured · Example Health Plan · Job posting                               │
│                                                                              │
│ SIGNAL                                                                       │
│   Tier 1 · Senior role posting · strength 87                                 │
│   "Director, Prior Authorization Transformation"                             │
│                                                                              │
│ EXTRACTED FACTS                          (click any to see the source quote) │
│   Reporting line   "reports to VP, Utilization Management"        90% ▸      │
│   Business problem "reduce turnaround time and denial rework"     80% ▸      │
│   Technology       Epic, FHIR                                     95% ▸      │
│   Urgency          "ahead of the CMS January deadline"            85% ▸      │
│   Compensation     "$180,000 – $210,000"                          95% ▸      │
│                                                                              │
│ ┌ PROPOSED INITIATIVE ─────────────────────────── inferred · 0.88 ─────────┐ │
│ ┊  Prior authorization modernization under new clinical ops leadership,    ┊ │
│ ┊  driven by the CMS interoperability deadline.                            ┊ │
│ ┊                                                                          ┊ │
│ ┊  Supported by 3 signals:                                                 ┊ │
│ ┊   • SVP Clinical Operations appointed          41d ago    [source]       ┊ │
│ ┊   • Director PA Transformation posted          today      [source]       ┊ │
│ ┊   • CMS interoperability compliance note       18d ago    [source]       ┊ │
│ ┊                                                                          ┊ │
│ ┊  Likely owner roles: SVP Clinical Ops · VP Utilization Management        ┊ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ OPPORTUNITIES THIS WOULD CREATE                                              │
│   ☐ FTE — Director, PA Transformation                                        │
│        ⚠ DISQUALIFIED: comp max $210,000 < $225,000 floor                    │
│        Keep as a consulting signal and negotiation anchor.                    │
│   ☑ CONSULTING — Prior Authorization Operating Diagnostic                    │
│        Est. $40,250 · 14% · EV $5,635 · $626/hr                              │
│                                                                              │
│   [ Promote selected ]   [ Watch account only ]   [ Dismiss ▾ ]              │
└──────────────────────────────────────────────────────────────────────────────┘
```

The dashed border + `inferred · 0.88` chip on the initiative block is the primary
fact-vs-hypothesis affordance and appears identically everywhere hypotheses render.

### Triage queue (below the form)

```
UNTRIAGED SIGNALS (5)                          [ Tier 1 only ]  [ All ]
┌──────────────────────────────────────────────────────────────────────────────┐
│ T1 │ Humana · Director, UM Transformation posted            2h    strength 84│
│    │ → matches existing initiative "UM modernization" (0.78)                 │
│    │ [ Promote ]  [ Attach to initiative ]  [ Watch ]  [ Dismiss ▾ ]         │
├──────────────────────────────────────────────────────────────────────────────┤
│ T2 │ Elevance · Q2 earnings: "administrative cost pressure"  1d    strength 44│
│    │ → no initiative match. Tier 2 alone cannot propose one.                 │
│    │ [ Attach to initiative ]  [ Watch ]  [ Dismiss ▾ ]                      │
└──────────────────────────────────────────────────────────────────────────────┘
```

Tier 3 signals are hidden behind `[ All ]` and never counted in the header badge.

### Duplicate handling

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ℹ Already captured                                                           │
│   This content matches a source added 2026-07-22 (identical hash).           │
│   → Example Health Plan · Prior Authorization Modernization                  │
│   [ Open opportunity ]   [ Capture anyway as a new version ]                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

Detected by `contentHash`; the existing `ingestPastedOpportunity()` already returns
`{duplicate: true}` and this surfaces it. "Capture anyway" is offered because a re-posted
job with changed comp is genuinely a new signal.

### Errors

| Condition | Message |
|---|---|
| Content < 200 chars | "Too short to extract from. Paste the full posting or article." |
| No org and no match | "Pick an organization or create one — every source belongs to an account." |
| Extraction found 0 facts | "No structured facts found. Captured as a note; add an initiative manually." |
| AI unavailable | "Initiative narrative unavailable. Signals clustered deterministically; you can name it yourself." |

The AI-unavailable path is **not an error state** — it is a degraded-but-working path, and
the copy says so.

---

## 5. ③ Pipeline — `/tif/oi/opportunities`

**Purpose:** Weekly review and finding a specific opportunity. **Not** a daily view.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Pipeline                                            23 active · 4 stale      │
│                                                                              │
│ Path:  [ All ] [ FTE 6 ] [ Consulting 11 ] [ Assessment 4 ] [ RFP 1 ] [ P 1 ]│
│ State: [ Active ] [ Needs action 9 ] [ Waiting 8 ] [ Stale 4 ] [ Closed 12 ] │
│ Sort:  [ Priority ▾ ]                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ PE      │ Account            │ Opportunity           │ Stage       │ Next    │
│ $5,063  │ Regional Payer     │ Care Mgmt Recovery    │ outreach    │ Prepare │
│ $2,915  │ Midwest Health     │ PA Assessment         │ conversation│ Proposal│
│ $1,846  │ State of ___       │ Medicaid PA RFP       │ seeking prt │ Find prt│
│ $1,118  │ Coastal Health     │ Workflow Assessment   │ qualified   │ Offer   │
│ $784    │ Northeast Plan     │ VP Ops Transformation │ qualified   │ Profile │
│ …                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ ⚠ 4 stale (no activity 14+ days)                            [ Review all ]   │
│ ⚠ 2 opportunities have no next action                       [ Fix ]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

The two warning rows at the bottom are the weekly-review workflow, embedded rather than
given their own route. "No next action" is a defect indicator by design.

---

## 6. ④ Workbench — `/tif/oi/opportunities/[id]`

**Purpose:** Everything about one opportunity, and every action available on it. This is
where Todd spends most of his time.

Single scrolling page with anchored section nav — **not tabs.** Tabs hide state, and Todd
needs to see that evidence is thin while he looks at the draft.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Pipeline                                                                   │
│                                                                              │
│ Regional Payer Health                              CONSULTING · outreach_ready│
│ Care Management Platform Recovery                                            │
│                                                                              │
│ Fit 99   Evidence 90   Access 82   Urgency 20        PRIORITY  $5,063/hr     │
│ ────────  ────────     ────────    ──                                        │
│ Value $54,000 · 60% · EV $32,400 · 6.4 hrs remaining        [ why? ▾ ]       │
│                                                                              │
│ → NEXT ACTION: Prepare outreach · 20 min          [ Start ]  [ Change ]      │
│                                                                              │
│ Jump: Initiative · Evidence · Gaps · Stakeholders · Offer · Outreach · Log   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### `[ why? ]` — expanded score explanation

```
┌─ WHY THIS RANKS #1 ──────────────────────────────────────────────────────────┐
│ FIT 99/100                                                                   │
│   Funded problem fit        20/20  Stated problem aligns with todd-v2        │
│   Transformation mandate    20/20  "recovery", "delayed program"             │
│   Delivery ownership        15/15  Owns platform delivery outcomes           │
│   Domain                    15/15  Healthcare payer confirmed                │
│   Technology                 4/10  Tech context present, no todd-v2 match    │
│   Urgency                   15/10 → 10/10 (capped)                           │
│   Seniority scope           10/10  VP-level access confirmed                 │
│                                                                              │
│ ACCESS 82/100                                                                │
│   Warm history             +20     Sarah Chen — colleague at [prior co]      │
│   Transformation relevance +12     Level 3/3                                 │
│   Seniority                +10     Vice President                            │
│   … 5 more                                                                   │
│                                                                              │
│ EXPECTED VALUE                                                               │
│   Operational Truth Diagnostic  $15,000–$30,000  → midpoint $22,500          │
│   + expansion  0.35 × $90,000                    → $31,500                   │
│   = estimated value                                 $54,000                  │
│   × probability  0.15 base × 2.5 warm × 1.4 access × 1.3 ev × 1.3 fit        │
│                  = 0.887 → capped 60%                                        │
│   = expected value                                  $32,400                  │
│   ÷ 6.4 remaining hours (11.5 base × 0.7 researched × 0.8 known stakeholder) │
│   = PRIORITY EFFICIENCY                             $5,063/hr                │
│                                                                              │
│ Policy pois-v1 · Profile todd-v2 · Scored 2026-07-31 06:12   [ Override ▾ ]  │
└──────────────────────────────────────────────────────────────────────────────┘
```

**This panel is the trust mechanism for the whole system.** If Todd cannot audit the number,
he will not follow the ranking, and the system becomes a filing cabinet.

### Sections

```
┌─ INITIATIVE ─────────────────────────────── evidenced · 0.88 · approved ────┐
│ Care management platform implementation recovery                            │
│ Hypothesis: An 18-month delay on the care management platform indicates     │
│ implementation governance failure rather than a technology problem.         │
│                                                                             │
│ Signals (3)                                                                 │
│   • "Delays platform rollout by 18 months" — Modern Healthcare  12d [src]   │
│   • Q2 earnings: "implementation challenges"                     2d  [src]  │
│   • VP Ops hired from a competitor                              63d [src]   │
│                                                                             │
│ Sibling opportunities under this initiative:                                │
│   → FTE · VP Program Delivery (identified)                       $310/hr    │
│ [ Edit hypothesis ]  [ Add signal ]                                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ EVIDENCE ──────────────────────────────────────────────── 90/100 ─────────┐
│ Business problem  "the rollout has been delayed by 18 months"    stated 95% │
│                   Modern Healthcare · 2026-07-19 · offset 1,204–1,251 [▸]   │
│ Reporting line    "VP Operations reports to the COO"             stated 90% │
│ Urgency           "board-level visibility"                       stated 85% │
│ ┊ Ownership       ┊ VP Ops likely owns remediation             inferred 60% ┊│
│ [ Add operator fact ]                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ RESEARCH GAPS ──────────────────────────────────────────── 1 open ────────┐
│ ⚠ BLOCKING  Is there an incumbent SI already engaged on remediation?        │
│    Why: A retained incumbent changes the wedge from recovery to assessment. │
│    Try: company newsroom · LinkedIn (VP Ops posts) · vendor press releases  │
│    [ Resolve with a finding ]   [ Dismiss ]                        ~10 min  │
│                                                                             │
│ ✓ RESOLVED  Who owns the delayed program?                                   │
│    → Sarah Chen, VP Operations. Source: company leadership page. 2026-07-29 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ STAKEHOLDERS ─────────────────────────────────────────────────────────────┐
│ ★ SELECTED                                                     access 82   │
│   Sarah Chen · VP Operations · Regional Payer Health                        │
│   Role: operational owner        Authority: high     Confidence 85%         │
│   Relationship: warm history — colleague at [prior co], 2019–2021           │
│   ┊ Likely motivation: board pressure on the delayed rollout             ┊  │
│   ┊ Likely objection: "we already have a partner"                        ┊  │
│   Relevance to Todd: led an analogous payer platform recovery              │
│   Contact: s.chen@…  · publicly_listed · verified 2026-07-29                │
│   [ Edit ]  [ Deselect ]                                                    │
│                                                                             │
│   Michael Torres · COO                                          access 61   │
│   Role: economic buyer   Authority: high    Confidence 40% (inferred)       │
│   [ Select as target ]  [ Edit ]                                            │
│                                                                             │
│ SUGGESTED ROLES NOT YET FILLED                                              │
│   Technical owner (CIO / enterprise architect) — none identified            │
│   [ Add stakeholder ]                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ OFFER & PROOF ────────────────────────────────────────────────────────────┐
│ Selected offer: Operational Truth Diagnostic · $15,000–$30,000 · 2–3 wks    │
│                                                     [ Change offer ]        │
│ Matched proof (3):                                                          │
│   ☑ RachelOS Operational Recovery case study            match 88  [public]  │
│   ☑ Program Recovery Diagnostic framework               match 81  [public]  │
│   ☐ Decision Latency executive brief                    match 64  [public]  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ OUTREACH ─────────────────────────────────────────────────────────────────┐
│ Channel: [ Email ▾ ]   To: Sarah Chen                                       │
│                              [ Generate draft ]  ← all gates passed ✓       │
│                                                                             │
│ ── Draft v1 · claims validated ✓ ────────────────────────────────────────── │
│ Subject: The 18-month care management delay                                 │
│                                                                             │
│ Sarah — I saw the note about the care management rollout slipping to        │
│ 2028. …                                                                     │
│                                                                             │
│ Cited: Modern Healthcare 2026-07-19 · RachelOS case study                   │
│                                                                             │
│ [ Edit ]  [ Regenerate ]  [ Approve for manual use ]                        │
│                                                                             │
│ ℹ Approving does not send. Copy it into your own email client, send it,     │
│   then log it below.                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ ACTIVITY LOG ─────────────────────────────────── append-only ─────────────┐
│ [ + Log activity ]                                                          │
│                                                                             │
│ 2026-07-31 06:12  status_change   qualified → outreach_ready                │
│ 2026-07-29 21:40  note            Resolved: program owner is Sarah Chen     │
│ 2026-07-29 21:15  status_change   researching → qualified                   │
│ 2026-07-19 08:02  note            Opportunity created from Modern Healthcare│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Blocked outreach

```
┌─ OUTREACH ─────────────────────────────────────────────────────────────────┐
│ 🔒 Blocked — 2 requirements unmet                                           │
│    ✗ No stakeholder selected                    [ Go to stakeholders ]      │
│    ✗ 1 blocking research gap open               [ Go to gaps ]              │
│    ✓ Initiative approved                                                    │
│    ✓ Evidence score 90 ≥ 50                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Draft with unsupported claims

```
│ ⚠ 1 unsupported claim — approval blocked                                    │
│   "your team of 40 analysts" — no source or operator fact supports this.     │
│   [ Remove the claim ]   [ Add a supporting fact ]   [ Regenerate ]         │
```

Approval is **disabled**, not merely warned. This is the guardrail that makes AI drafting
safe enough to use at all.

---

### 6.5 Executive Brief — `/tif/oi/people/[id]` (Milestone 2)

**The primary stakeholder surface.** Assembled at request time. **No stored model** — see
`POIS-DATA-MODEL.md` §9.8.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Regional Payer Health                                                      │
│                                                                              │
│ Sarah Chen                                              ACCESS 82 · SELECTED │
│ VP Operations · Regional Payer Health                                        │
│ Role: operational owner   Authority: high   Relationship: warm history       │
│                                                    [ Snapshot to artifact ]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ CAREER                                                                       │
│  • VP Operations, Regional Payer Health (2024–)      sourced 95%  [company]  │
│  • Director Care Mgmt Ops, [prior co] (2019–2024)    operator     [—]        │
│                                                                              │
│ RESPONSIBILITIES                                                             │
│  • Owns care management platform delivery            sourced 90%  [10-K]     │
│                                                                              │
│ RECENT ANNOUNCEMENTS                          (signals, last 180 days)       │
│  • Q2 earnings cite "implementation challenges"       2d ago      [source]   │
│  • Platform rollout delayed 18 months                12d ago      [source]   │
│                                                                              │
│ KNOWN INITIATIVES                                                            │
│  • Care management platform recovery          evidenced · 0.88               │
│                                                                              │
│ ┊ LIKELY PRIORITIES                                    inferred · playbook ┊  │
│ ┊  • Stabilize the delayed rollout before year-end board review           ┊  │
│ ┊  • Reduce dependence on the incumbent SI                                ┊  │
│                                                                              │
│ ┊ LIKELY KPIs                                           inferred · playbook ┊  │
│ ┊  • Time-to-milestone · defect aging · vendor spend                      ┊  │
│                                                                              │
│ PUBLIC INTERVIEWS                                                            │
│  ⓘ Nothing recorded.                                                         │
│    → Research: search "Sarah Chen" + payer trade press          ~10 min      │
│                                                                              │
│ CONFERENCE TALKS                                                             │
│  ⓘ Nothing recorded.  → Research: AHIP / HLTH speaker lists     ~10 min      │
│                                                                              │
│ AUTHORITY                            access 82 · budget high · hiring med    │
│ RELATIONSHIP    warm history — colleague at [prior co], 2019–2021            │
│ WARM PATH       Direct. No introduction needed.                              │
│                                                                              │
│ ┊ RECOMMENDED APPROACH                        playbook: healthcare exec    ┊  │
│ ┊  Lead with the delay, not with capability. Offer: Operational Truth     ┊  │
│ ┊  Diagnostic. Proof: RachelOS recovery case study.                       ┊  │
│                                                                              │
│ RESEARCH GAPS BLOCKING OUTREACH (1)                                          │
│  ⚠ Is there an incumbent SI already engaged?          [ Resolve ]  ~10 min   │
│                                                                              │
│ OPPORTUNITIES (2)      Care Mgmt Recovery $5,063/hr · VP Program Del $310/hr │
│ ACTIVITY (0)           No contact logged yet.                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Two behaviors that make this a work surface rather than a report:**

1. **Every item shows basis and confidence.** Inferred sections use the dashed border +
   `inferred` chip, identical to every other hypothesis in the system.
2. **Empty sections show a research prompt with a time estimate — never blank space.** That is
   what converts "I don't know this" into a next action.

---

### 6.6 Decision capture — inline modal (Milestone 1)

Not a screen. A modal on the action Todd was already taking.

```
┌─ RECORD THIS DECISION ───────────────────────────────────────────────────────┐
│ Qualifying: Regional Payer — Care Management Recovery                        │
│                                                                              │
│ THE PREDICTION                              (from score pois-v1, 2026-07-31) │
│   Expected value      $32,400                                    read-only   │
│   Expected effort     6.4 hours                                  read-only   │
│   Probability         60%                                        read-only   │
│                                                                              │
│ Why are you doing this?  ← required                                          │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Warm path to the owner and a publicly acknowledged stalled program.      │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ Confidence    ( ) Low    (•) Medium    ( ) High                              │
│                                                                              │
│ What do you expect to happen?  (optional)                                    │
│ [ Reply within a week; call within two.                                    ] │
│                                                                              │
│                                        [ Skip ]        [ Record & continue ] │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Two required inputs. Everything else pre-filled. Target: ≤20 seconds.** `[ Skip ]` exists
because a journal Todd resents is a journal Todd abandons — but skipping is counted and shown
in the weekly review.

---

## 7. Type-specific workbench sections

> **RFP section (§7 below) is deferred to post-October-1** per D-028. Specification retained.

### FTE — replaces Offer & Proof

```
┌─ ROLE PROFILE ─────────────────────────────────────────────────────────────┐
│ Compensation  $240,000 – $265,000    source: posting     ✓ meets floor      │
│ Remote        Yes · fully remote (US)                                       │
│ Reports to    Chief Operating Officer                    inferred 70%       │
│ Seniority     VP                    Team ~45                                │
│ Posted        2026-07-24    Closes 2026-08-09  (9 days)  ✓ open (checked 1d)│
│                                                                             │
│ APPLICATION                                                                 │
│   URL   https://…/careers/vp-ops                        [ Open ]            │
│   Resume variant  [ Healthcare Transformation ▾ ]                           │
│   Status  ○ Not applied                                                     │
│   [ Mark applied ]                                                          │
│                                                                             │
│ ℹ Run both tracks: submit the application AND send a direct note to the     │
│   hiring executive. The direct note is what differentiates the application. │
│                                                                             │
│ INTERVIEW PROCESS                          (appears after applied)          │
│   ● Applied            2026-08-01                                           │
│   ● Recruiter screen   2026-08-08  positive                                 │
│   ○ Hiring manager     scheduled 2026-08-15 14:00                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### RFP — replaces Offer & Proof, appears first

```
┌─ RFP QUALIFICATION ────────────────────────── ⏱ 11 days to submit ─────────┐
│ Issuer   State of ___ Dept of Health      Solicitation  RFP-2026-0412       │
│                                                                             │
│ DEADLINES                                                                   │
│   Questions due     2026-08-04   (4 days)  ⚠                                │
│   Submission due    2026-08-11  (11 days)                                   │
│   Pre-bid conference 2026-08-01 · MANDATORY  ⚠ attend or disqualified       │
│                                                                             │
│ QUALIFICATION                                                               │
│   Budget      $2.4M / 3 years                                               │
│   Incumbent   [Existing vendor]                          ⚠ ×0.5 probability │
│   Required:                                                                 │
│     ✗ 3 prior state Medicaid prime contracts     ← Todd cannot meet         │
│     ✓ PA/UM domain expertise                                                │
│     ✓ Named senior personnel                                                │
│                                                                             │
│ ┌ BID / NO-BID RECOMMENDATION ─────────────────────────────────────────────┐│
│ │ NO-BID as prime.  Cannot meet the prime qualification requirement.        ││
│ │ CONDITIONAL BID as subcontractor.                                         ││
│ │   As sub: $400,000 annualized · 6% · EV $24,000 · $1,846/hr               ││
│ │ Auto-close as no-bid if no prime secured by 2026-08-04.                    ││
│ │ [ Accept: seek partner ]   [ Override: bid as prime ]   [ No-bid now ]    ││
│ └──────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│ PARTNER SEARCH                                          deadline 4 days     │
│   Candidates: (none yet)                                [ Add candidate ]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. ⑤⑥ Accounts

```
┌─ ACCOUNTS ─────────────────────────────────────────────── 18 · 6 watched ──┐
│ [ All ] [ Watched ] [ Tier 1 ] [ Has active opportunity ]                   │
│                                                                             │
│ Regional Payer Health          payer   ★  2 init · 2 opp · 5 sig · $5,063/hr│
│ Example Health Plan            payer   ★  1 init · 1 opp · 3 sig · $626/hr  │
│ Humana                         payer   ★  1 init · 0 opp · 4 sig · —        │
│ Availity                     health tech  0 init · 0 opp · 2 sig · watching │
└─────────────────────────────────────────────────────────────────────────────┘
```

Account detail shows initiatives (with their signals and opportunities), people, a signal
timeline, and closed history. Its purpose is answering "what is actually happening at this
company?" before outreach — the question that makes a note credible.

### 8.5 Weekly Review — `/tif/oi/review` (Milestone 4)

**Sunday, 15 minutes.** Auto-computed metrics plus the reflection that cannot be computed.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Weekly Review · Aug 25 – Aug 31                          Oct 1 · 31 days     │
│                                                                              │
│ PIPELINE                                                                     │
│   Expected value      $214,800    ↑ $27,400    72% of $300K target           │
│   Active              23          ↑ 4                                        │
│   Both paths live     ✓ FTE 7 · Consulting 16                                │
│                                                                              │
│ ACTIVITY                                                                     │
│   Signals captured 18 · promoted 7 · dismissed 11                            │
│   Outreach prepared 6 · sent 5 · applications 2                              │
│   Replies 2 · conversations 1 · proposals outstanding 1                      │
│                                                                              │
│ ⚠ WHAT STALLED (3)                                no activity 14+ days       │
│   Coastal Health — Workflow Assessment            21d   [ Advance ] [ Close ]│
│   Metro Health — VP Ops                           17d   [ Advance ] [ Close ]│
│                                                                              │
│ ✓ WHAT CLOSED (2)                                                            │
│   Midwest Health — PA Assessment      WON     $7,500   predicted $6,500  ✓   │
│   Northeast Plan — VP Ops             REJECTED         predicted 8%      ✓   │
│                                                                              │
│ ⚠ PREDICTIONS THAT WERE WRONG (2)                                            │
│   Coastal Health — expected reply in 7d, none in 21d                         │
│     You said: "strong fit, warm-ish path"      confidence: high              │
│     [ Resolve with a lesson ]                                                │
│                                                                              │
│ ○ UNRESOLVED PREDICTIONS (6)                      oldest 24 days             │
│                                                                              │
│ REFLECTION                                                                   │
│   What changed?      [                                                     ] │
│   Where did time go? [                                                     ] │
│   Lessons            [                                                     ] │
│   Next week's focus  [                                                     ] │
│                                                       [ Complete review ]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

Metrics are computed; the four reflection fields are Todd's. "Predictions that were wrong" is
the section that makes the decision journal worth having — it is where the system tells Todd
something about his own judgment that he would not otherwise notice.

### 8.6 Campaigns — `/tif/oi/campaigns` (Milestone 2)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Campaigns                                                                    │
│                                                                              │
│ PRIOR AUTHORIZATION MODERNIZATION                    active · 6 opportunities│
│   CMS interoperability deadlines plus denial-rework cost pressure make PA     │
│   modernization funded across major payers in 2026.                          │
│   Pipeline EV $96,200 · best $5,063/hr                                       │
│   Humana(2) · UnitedHealthcare(1) · Elevance(2) · GuideWell(1)                │
│   Targets not yet engaged: Centene, Molina                                    │
│                                                       [ Open opportunities ] │
└──────────────────────────────────────────────────────────────────────────────┘
```

Grouping and rollup only. No campaign-level actions (D-025).

---

## 9. States

### Loading

Server Components render the shell with skeletons for data regions. The Today view must
paint the header (countdown, pipeline %) before opportunity cards resolve — those numbers
come from a cheap aggregate.

**Only genuinely slow operation:** AI draft generation (2–6s). It gets an inline progress
state with a cancel affordance, never a full-page block.

### Errors

| Scope | Treatment |
|---|---|
| Field validation | Inline, below the field, red text, form state preserved |
| Server action failure | Toast + inline banner; form values retained; retry available |
| AI unavailable | Inline notice with a deterministic fallback path; never blocks the page |
| Score computation failure | Card shows "Score unavailable — [Recompute]"; opportunity still opens |
| Not found | "This opportunity no longer exists." + link to pipeline |

**Nothing in POIS shows a raw stack trace or a generic "Something went wrong."** Every error
names what failed and what Todd can do next.

### Empty states

| View | Copy |
|---|---|
| Today, no opportunities | Directive to add a source + pipeline gap vs. target (§3) |
| Today, all blocked | "4 opportunities are waiting on replies. Best next move: add a source." |
| Intake, no signals | "No untriaged signals. Paste something above." |
| Pipeline, empty | "No opportunities yet. Start at intake." |
| Stakeholders, empty | Suggested roles for this initiative type + `[ Add stakeholder ]` |
| Gaps, empty | "No open gaps. Evidence score 90 — ready for outreach." |
| Activity, empty | "No activity logged. Everything here is append-only." |

---

## 10. Duplicate handling

| Entity | Detection | Resolution |
|---|---|---|
| Source | `contentHash` (implemented) | Show existing; offer "capture anyway as a new version" |
| Organization | Normalized `domain`, then fuzzy name | Autocomplete with "Did you mean Humana Inc.?" |
| Person | `(organizationId, name, title)` (implemented) | Merge prompt, never silent merge |
| Opportunity | Same account + type + overlapping initiative | Warn: "Similar open opportunity exists" + link; allow both |
| Signal | Same source + type | Blocked at the source layer |

**No silent merges anywhere.** Ambiguity always produces a prompt.

---

## 11. Mobile

Todd will triage on a phone. Two views must work at 390px:

- **Today** — cards stack; score chips wrap to a second line; `[ Start ]` is full-width and
  at least 44px tall.
- **Intake** — the paste textarea is the whole screen; other fields collapse under a
  "Details" disclosure that defaults open only when the org is unknown.

Pipeline, workbench, and accounts are desktop-first and merely need to not break — they are
not part of the mobile loop.

Standard Tailwind breakpoints, matching existing TIF pages. No separate mobile routes.

---

## 12. Accessibility

- Semantic landmarks (`main`, `nav`, `section`) and a logical heading order on every route.
- **Score never communicated by color alone** — always accompanied by the number and label.
- Hypothesis-vs-fact distinguished by an `inferred` **text chip** plus the dashed border,
  never by color alone.
- All interactive elements keyboard reachable with a visible focus ring; `[ Start ]` on the
  top Today card is the first tab stop.
- Forms: every input has a `<label>`; errors use `aria-describedby`; `aria-invalid` set.
- Live regions announce async results (draft generated, activity logged, score recomputed).
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for UI boundaries.
- Timeline and log content is real text, never image or canvas.

---

## 13. Decision content per view

The information each view must present in order to be worth opening.

| View | Must answer |
|---|---|
| **Today** | What do I do now? Why this and not that? What changed? What is overdue? How am I tracking to $300K? |
| **Intake** | Is this worth pursuing? What did we learn? What initiative does it belong to? What would it create? |
| **Pipeline** | What is stalled? What has no next action? Are both income paths live? |
| **Workbench** | What do we know and how do we know it? Who owns it? Why is Todd relevant? What is it worth? What is blocking? What do I say? |
| **Account** | What is actually happening here? Who do we know? What have we already tried? |
| **Person** | Who is this? How do we know them? What have we said? What is their authority? |

If a view cannot answer its questions in one screen, the view is wrong — not the question.
