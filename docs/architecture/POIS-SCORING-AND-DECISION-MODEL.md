# POIS Scoring and Decision Model

**Date:** 2026-07-31
**Policy version:** `pois-v1`
**Capability profile version:** `todd-v2`
**Principle:** Todd must be able to read any ranking and say "yes, that's right" — or
disagree with a specific number and change it.

---

## 1. Design rules

1. **Deterministic.** Same inputs → same score, always. Golden fixtures in tests.
2. **No AI in the number.** AI may propose a hypothesis or draft prose. It never produces,
   adjusts, or ranks a score.
3. **Every component carries a reason.** Persisted as text, rendered in the UI. This is how
   "why is A above B?" is answered — no separate explanation system.
4. **Separate axes.** Fit, evidence, access, and urgency are computed independently and
   never averaged into a single opaque number. A high-fit / low-evidence opportunity should
   produce *research*, not confident outreach.
5. **Hard filters run first.** Disqualification short-circuits scoring and names the rule
   that fired.
6. **Operator overrides win** and are recorded with a reason.
7. **Versioned.** Weight changes create a new policy version; old snapshots stay comparable.
8. **Type-specific where the commerce differs.** FTE and RFP do not share a value formula
   with consulting.

---

## 2. Opportunity type classification

Runs at ingestion, before scoring. Deterministic, operator-correctable.

```
classifyOpportunityType(signal, facts, source) -> OiOpportunityType[]
```

| Rule (evaluated in order) | Type produced |
|---|---|
| `sourceType = job_posting` AND seniority ∈ {Director, VP, SVP, C-suite} | `fte` |
| `sourceType = job_posting` AND comp band present AND max < floor | `fte` (will be hard-filtered) + `consulting` candidate |
| Source mentions solicitation/RFP/RFI/RFQ number, or portal is a procurement domain | `rfp` |
| Signal type = `stalled_program` | `consulting` (program recovery) |
| Signal type ∈ {`transformation_announcement`, `stated_operational_problem`, `concentrated_hiring`} | `consulting` + `assessment` |
| Signal type = `leadership_appointment` alone | **none** — watch only |
| Source is a consulting/SI firm seeking senior capability | `partnership` |
| Facts mention "interim", "fractional", "advisor" | `fractional` |

**A single source may produce more than one typed opportunity.** A Director posting at a
payer running a PA program legitimately produces an `fte` opportunity *and* a `consulting`
opportunity under one initiative. Todd keeps, rejects, or reclassifies each.

---

## 3. Signal strength scoring

Computed at ingestion. Drives triage order and feeds initiative confidence.

### 3.1 Base by tier

| Tier | Base points |
|---|---|
| Tier 1 | 60 |
| Tier 2 | 30 |
| Tier 3 | 5 |

### 3.2 Modifiers

| Modifier | Points | Condition |
|---|---|---|
| Recency | +15 / +8 / 0 / −10 | ≤7d / ≤30d / ≤90d / >90d since `occurredAt` |
| Domain match | +12 | ≥2 tags overlap `todd-v2.domains` |
| Domain match (partial) | +6 | exactly 1 tag overlaps |
| Named problem | +10 | a `business_problem` fact was extracted |
| Named executive | +8 | a person is identified in the source |
| Regulatory driver | +10 | urgency fact cites a rule, deadline, or mandate |
| Account is watched | +5 | `OiOrganization.isWatched` |
| Account tier 1 industry | +8 | `OiOrganization.tier = 1` |
| Aggregator source | −5 | not the company's own domain |

**Signal strength = clamp(0, 100, base + modifiers).**

Triage order = signal strength descending. Tier 3 never surfaces in Today regardless of
score.

### 3.3 Initiative confidence — deterministic clustering

This is the highest-leverage inference in the system, and it is entirely deterministic. The
AI narrative (§9) explains a conclusion the clustering already reached.

**Clustering:** signals at the same account, within a 90-day window, sharing ≥1 domain tag.

| Cluster composition | Confidence |
|---|---|
| 1 Tier 2 signal only | 0.30 — **cannot auto-propose an initiative** |
| 2+ Tier 2 signals | 0.40 — **cannot auto-propose** |
| 1 Tier 1 signal | 0.45 |
| 1 Tier 1 + 1 Tier 2 | 0.62 |
| 2 Tier 1 signals | 0.78 |
| 3+ related signals (≥2 Tier 1) | 0.88 |
| Operator-confirmed | 0.95 |

**Decay:** −0.10 per 90 days with no reinforcing signal (`OiInitiative.lastEvidenceAt`), floor
0.20. Below 0.30 the initiative drops out of Today and appears in the weekly stale sweep.

**Auto-proposal threshold: 0.45.** Below it, signals attach to the account and wait. This is
what stops a lone executive appointment from manufacturing a fake opportunity — the Example C
behavior in the operating manual.

---

## 4. Fit scoring — `fitScore` (0–100)

Extends the implemented `scoreOpportunityFit()`
(`src/lib/opportunity-intelligence/score.ts`), which already produces exactly this shape.
Weights are retuned; the mechanism is preserved.

| Component | Max | Full points when | Partial |
|---|---|---|---|
| `business_problem` | 20 | Stated problem matches `todd-v2.businessProblems` or `domains` | 10 if stated but unmatched |
| `transformation` | 20 | Transformation/recovery/modernization language matching profile | 10 if change language present but unaligned |
| `responsibility` | 15 | Owns delivery outcomes matching profile | 8 if responsibilities present but unmatched |
| `domain` | 15 | **NEW** — healthcare/payer/health-tech domain confirmed | 8 for adjacent regulated industry |
| `technology` | 10 | ≥1 technology matches profile | 4 if tech present, unmatched |
| `urgency` | 10 | Timing/deadline/regulatory signal present | 0 |
| `seniority_scope` | 10 | **NEW** — Director+ scope or executive access | 5 for manager scope |

**Total: 100.**

`evidence_strength` and `reporting_line` are removed from fit — they moved to the evidence
and access axes, where they belong. This corrects a real flaw in `opportunity-fit-v1`, where
evidence quality inflated fit.

> **Component maxima are hard caps.** No component may exceed its `Max`. A component never
> "overflows and is capped" — the computed value is bounded before it enters the sum, so
> `points ≤ maxPoints` always holds in the persisted `components` array.

---

## 3A. Precedence — which document wins

**The rules are authoritative. The worked examples are derived from the rules.**

When §14's arithmetic disagrees with §4–§10, **the rules win and §14 is a defect to be
corrected.** Worked examples exist to demonstrate the rules, never to extend or override
them.

Codex must not implement a number from §14 that cannot be derived from §4–§10. If a conflict
is found: stop, report it, and fix §14 — do not special-case the implementation to reproduce
a bad example.

*Applied 2026-08-01 to resolve the WP-008 block. See `POIS-DECISIONS.md` D-031.*

### `todd-v2` capability profile

Extends `todd-v1` (`capability-profile.ts`), which is preserved and versioned.

```ts
export const TODD_CAPABILITY_PROFILE_V2 = {
  version: "todd-v2",
  domains: [
    // v1
    "healthcare", "payer", "health plan", "prior authorization",
    "utilization management", "health tech", "clinical",
    // v2 additions
    "care management", "claims", "interoperability", "medicaid", "medicare",
    "provider operations", "revenue cycle", "population health",
    "regulated operations", "financial services",
  ],
  businessProblems: [
    // v1
    "operational recovery", "workflow", "turnaround", "cost", "quality",
    "access", "scale", "implementation", "delivery", "operating model",
    // v2 additions
    "administrative burden", "denial", "turnaround time", "governance",
    "decision rights", "program recovery", "stalled", "delayed", "at risk",
    "exception handling", "manual process", "handoff", "escalation",
  ],
  transformationLanguage: [
    "enterprise change", "modernization", "operating model", "program recovery",
    "transformation", "turnaround", "remediation", "stabilization",
    "digital transformation", "workflow redesign",
  ],
  responsibilities: [
    "build", "deliver", "drive", "implement", "lead", "manage", "own",
    "oversee", "recover", "scale", "govern", "stand up", "turn around",
  ],
  technologies: [ /* v1 list preserved verbatim */ ],

  // NEW in v2 — thresholds live with the profile, not scattered in code
  thresholds: {
    fteCompFloor: 225_000,
    consultingMonthlyFloor: 20_000,
    targetAnnualIncome: 300_000,
    minFitScore: 45,
    minEvidenceForOutreach: 50,
  },
} as const;
```

---

## 5. Evidence scoring — `evidenceScore` (0–100)

**Independent from fit.** High fit + low evidence = research task, never outreach.

| Check | Points |
|---|---|
| ≥1 source with verified offsets | 15 |
| Source is primary (company domain, not aggregator) | 10 |
| Source published within 30 days | 10 |
| Business problem stated (not inferred) | 15 |
| Initiative approved by operator | 15 |
| ≥1 stakeholder with a sourced role claim | 15 |
| No blocking research gaps open | 10 |
| ≥2 independent sources | 10 |

**Gate: `evidenceScore ≥ 50` is required to prepare outreach.** Below that, the next action
is always a research gap.

---

## 6. Access scoring — `accessScore` (0–100)

**Harvested from `scoreOpportunity()` in `src/lib/oi.ts`**, which contains genuinely good
logic that would be wasteful to discard. Refactored into
`commercial/score/access.ts` as `scoreStakeholderAccess()`.

Computed per stakeholder; the opportunity takes the **maximum** across its stakeholders.

| Component | Points | From `oi.ts` |
|---|---|---|
| Seniority | director 8 / VP 10 / SVP 12 / C-suite 10 / other 0 | preserved |
| Budget authority | level × 4 (0–3 scale) | preserved |
| Hiring authority | level × 3 | preserved |
| Transformation relevance | level × 4 | preserved |
| Relationship strength | level × 4 | preserved |
| Source confidence | level × 2 | preserved |
| **Warm path** | cold 0 / warm_referral +15 / warm_history +20 / existing_client +25 | **new** |
| **Role clarity** | economic_buyer +10 / exec_sponsor +8 / operational_owner +6 / hiring_manager +8 / recruiter +2 / influencer +3 / blocker −10 | **new** |
| **Contact reachable** | +8 if an active `OiContactPoint` exists with provenance better than `pattern_inferred` | **new** |

### Penalties (preserved from `oi.ts`)

| Penalty | Points | Condition |
|---|---|---|
| Seniority gate | −20 | seniority = `other` (unverified) |
| Authority gap | −8 | budget = 0 AND hiring = 0 |
| Missing source | −10 | source confidence = 0 |
| Stale role | −6 | role source > 12 months old |
| Do not contact | **hard filter** | `OiPerson.doNotContact` |

**Clamped 0–100.**

---

## 7. Urgency scoring — `urgencyScore` (0–100)

| Component | Points |
|---|---|
| Regulatory deadline within 6 months | 30 |
| Posting closes within 14 days | 25 |
| RFP submission deadline within 21 days | 30 |
| New executive within 90 days (mandate window) | 20 |
| Stated urgency language in source | 15 |
| Concentrated hiring (3+ related roles) | 15 |
| Stalled program publicly acknowledged | 20 |
| Fiscal-year-end within 90 days | 10 |
| No urgency signal | 0 |

Clamped 0–100. Urgency does **not** feed expected value; it is a **tiebreaker** in ranking
(§9) and a driver of next-action due dates. A high-urgency, low-value opportunity should not
outrank a high-value one — but among comparable opportunities, the one with a deadline wins.

---

## 8. Commercial value and expected value

### 8.1 Normalization — the key move

Everything normalizes to **annualized income contribution** so an FTE role and a consulting
engagement are comparable on one axis.

| Type | `estimatedValue` (annualized USD) |
|---|---|
| `fte` | Total comp estimate (base + bonus + equity) |
| `consulting` (project) | Engagement value (one-time; not multiplied) |
| `assessment` | Engagement value + (expansion probability × typical follow-on value) |
| `fractional` | Monthly × 12 |
| `partnership` | Expected annual subcontract revenue |
| `rfp` | Contract value ÷ contract years; × 0.5 if bidding as sub |

**Assessment expansion is where the wedge earns its ranking.** A $6K assessment with a 40%
chance of a $60K follow-on is worth $6K + (0.40 × $60K) = **$30K annualized** — which
correctly ranks it near a mid-size consulting engagement rather than at the bottom.

### 8.2 Default value bands

Seeded from `OiOffer` and `CURRENT_REALITY.md`. Operator-adjustable per opportunity.

| Offer | Low | High | Recurring | Expansion P | Follow-on |
|---|---|---|---|---|---|
| Operational Recovery Assessment | $5,000 | $8,000 | no | 0.40 | $60,000 |
| Prior Auth Operational Assessment | $5,000 | $8,000 | no | 0.45 | $75,000 |
| Operational Truth Diagnostic | $15,000 | $30,000 | no | 0.35 | $90,000 |
| Decision Layer Build Sprint | $45,000 | $150,000 | no | 0.20 | $60,000 |
| Fractional Operational Advisor | $144,000 | $300,000 | **yes** | — | — |
| Executive Briefing / Workshop | $3,000 | $6,000 | no | 0.30 | $30,000 |
| Specialist Subcontract | $10,000 | $40,000 | no | 0.30 | $40,000 |
| FTE role | $225,000 | $350,000 | **yes** | — | — |

`estimatedValue` = midpoint of the band, plus expansion term where applicable.

### 8.3 Conversion probability

Base rate by type, adjusted by evidence and access. **These are estimates, and the system
labels them as such.** They exist to rank, not to forecast.

| Type | Base P | Rationale |
|---|---|---|
| `fte` | 0.08 | Senior roles, many candidates, long process |
| `consulting` | 0.15 | Cold outreach to an executive with a real problem |
| `assessment` | 0.22 | Low price point, low commitment, easiest yes |
| `fractional` | 0.10 | Longer commitment, higher trust bar |
| `partnership` | 0.18 | Mutual interest, lower stakes |
| `rfp` (prime) | 0.05 | Competitive, incumbent-favored |
| `rfp` (sub) | 0.12 | Prime does the winning; Todd is a line item |

**Adjustments (multiplicative):**

| Condition | Multiplier |
|---|---|
| Warm referral path | ×2.0 |
| Warm history | ×2.5 |
| Existing client | ×3.0 |
| `accessScore ≥ 70` | ×1.4 |
| `accessScore < 30` | ×0.5 |
| `evidenceScore ≥ 75` | ×1.3 |
| `evidenceScore < 50` | ×0.6 |
| `fitScore ≥ 80` | ×1.3 |
| `fitScore < 45` | ×0.4 |
| Incumbent identified (RFP) | ×0.5 |
| Comp below floor (FTE) | ×0.3 |

**Final probability = clamp(1, 60, base × multipliers × 100).** Capped at 60% — nothing in
cold commercial development is more likely than that, and a higher number would distort
ranking.

### 8.4 Expected Value

```
expectedValue = estimatedValue × (conversionProbability / 100)
```

### 8.5 Effort estimate — Todd-hours

| Type | Research | Outreach prep | Conversation | Proposal / process | Total |
|---|---|---|---|---|---|
| `fte` | 1.5 | 1.0 | 2.0 | 20.0 (interviews) | **24.5** |
| `consulting` | 2.0 | 1.5 | 2.0 | 6.0 | **11.5** |
| `assessment` | 1.5 | 1.0 | 1.5 | 2.0 | **6.0** |
| `fractional` | 2.0 | 1.5 | 3.0 | 8.0 | **14.5** |
| `partnership` | 1.0 | 1.0 | 1.5 | 3.0 | **6.5** |
| `rfp` (prime) | 4.0 | 2.0 | 1.0 | 30.0 | **37.0** |
| `rfp` (sub) | 2.0 | 2.0 | 1.0 | 8.0 | **13.0** |

**Adjustments.** Applied multiplicatively, in this order, to the type base. Each condition is
stated as a boolean expression so it is directly testable — no judgment required.

| # | Adjustment | Condition (exact) | Multiplier |
|---|---|---|---|
| 1 | Initiative reuse | `initiative !== null && initiative.createdAt < opportunity.createdAt` | **×0.7** |
| 2 | Stakeholder known | at least one stakeholder with `isSelected === true` **or** `roleEvidenceUrl !== null` | **×0.8** |
| 3 | Thin evidence | `evidenceScore < 50` | **×1.5** |

`remainingHours = round(base × m₁ × m₂ × m₃, 1)` — rounded to one decimal, once, at the end.

**Notes that resolve real ambiguity:**

- **Initiative reuse requires a *pre-existing* initiative.** An initiative created during the
  same ingestion that created the opportunity is not reuse — no prior research was banked, so
  `createdAt` is not strictly earlier and the discount does not apply. This is why §14.1 keeps
  its full 6.0 hours despite having an approved initiative.
- **Thin evidence uses the same threshold as the outreach gate (50) but is a different rule.**
  The gate blocks outreach *below* 50; the effort penalty applies *below* 50. At
  `evidenceScore ≥ 50` neither applies. Do not conflate "the outreach gate has not been
  cleared yet for other reasons" with "evidence is thin."

Only **remaining** hours count. An opportunity already at `conversation` no longer carries
research and outreach hours, which is what lets in-flight opportunities correctly outrank
new ones.

### 8.6 Priority Efficiency — the ranking number

```
priorityEfficiency = expectedValue / remainingHours
```

Read as **expected dollars per hour of Todd's time.** This is the primary sort for the Today
view, and it is the number that makes the system's advice non-obvious and genuinely useful.

**Worked comparison:**

| Opportunity | Value | P | EV | Hours | **PE** |
|---|---|---|---|---|---|
| FTE Director, $240K, cold | $240,000 | 8% | $19,200 | 24.5 | **$784/hr** |
| PA Assessment, warm referral | $39,750 | 44% | $17,490 | 6.0 | **$2,915/hr** |
| Build sprint, cold, weak evidence | $97,500 | 4% | $3,900 | 11.5 | **$339/hr** |
| RFP prime, incumbent present | $180,000 | 2.5% | $4,500 | 37.0 | **$122/hr** |

**The assessment with a warm path wins**, despite the smallest headline value. That is the
correct commercial answer, it is not what intuition suggests, and it is exactly the kind of
call Todd should not have to make manually at 6am.

---

## 9. Ranking

```
1. Exclude: disqualified, dismissed, paused, snoozed, terminal states
2. Exclude: initiative confidence < 0.30
3. Sort by priorityEfficiency DESC
4. Tiebreak (within 15%): urgencyScore DESC
5. Tiebreak: lastActivityAt ASC (oldest untouched first)
6. Cap at 5
7. Enforce path diversity: at least one FTE and one consulting item
   in the top 5 if both exist above PE $300/hr
```

**Rule 7 is deliberate.** A hard deadline with a single-path pipeline is a single point of
failure. The system enforces two live paths even when pure PE ranking would not.

---

## 10. Hard filters — disqualification

Run **before** scoring. Short-circuit, record the rule, skip everything else.

| Rule | Condition | Type | Recoverable? |
|---|---|---|---|
| `DQ_COMP_FLOOR` | FTE comp max < $225,000 | `fte` | Yes — reclassify as consulting |
| `DQ_SENIORITY` | Role below Director/equivalent | `fte` | No |
| `DQ_ONSITE_REQUIRED` | 100% on-site, non-commutable, no relocation | `fte` | Operator override |
| `DQ_DO_NOT_CONTACT` | All stakeholders flagged DNC | any | No |
| `DQ_RFP_DEADLINE` | Submission deadline < 5 days and no prepared response | `rfp` | No |
| `DQ_RFP_CANNOT_QUALIFY` | Mandatory requirement Todd cannot meet and no partner path | `rfp` | Yes — find a prime |
| `DQ_RFP_MANDATORY_CONF_MISSED` | Mandatory conference already passed | `rfp` | No |
| `DQ_STALE_POSTING` | Posting closed or unverified > 30 days | `fte` | Yes — reverify |
| `DQ_VALUE_FLOOR` | Consulting estimated value < $5,000 | consulting | Operator override |
| `DQ_NO_ACCESS_PATH` | No stakeholder, no warm path, no application URL | any | Yes — research |
| `DQ_OUT_OF_SCOPE` | Industry tier 3 AND fit < 40 | any | Operator override |

**Disqualified ≠ deleted.** The opportunity persists with the rule recorded and appears in a
"Dismissed" filter. Recoverable disqualifications generate a research next action instead of
a dead end.

---

## 11. Overrides

Todd may override any of: `estimatedValue`, `conversionProbability`, `estimatedHours`,
`fitScore`, any hard filter, and the ranking position (pin to top).

Every override records: field, prior value, new value, reason (**required**), timestamp,
policy version. Overridden fields are visually flagged and **survive rescoring** — the same
guarantee `isOperatorOverride` already provides for facts in `ingest.ts:67`.

---

## 12. Confidence and versioning

**Confidence** is tracked separately for: fact extraction (0–100, per fact), initiative
clustering (0.0–1.0, deterministic), stakeholder role claim (0–100), and contact point
(enum provenance ladder). Confidence is never averaged into the score; it gates actions.

**Versioning.** `OiScore` stores `scorePolicyVersion` and `capabilityProfileVersion` on every
snapshot. Weight changes require a new version constant, a new golden fixture set, and an
explicit operator activation. Historical snapshots remain comparable, which is what makes
"did the new policy actually rank better?" answerable in §13.

---

## 13. Learning loop

After ≥10 closed outcomes, report:

- Conversion by **signal type** — which signals actually became revenue?
- Conversion by **score band** (0–40 / 41–60 / 61–80 / 81–100) — is fit predictive?
- Conversion by **opportunity type** — which path is working for Todd, specifically?
- Conversion by **warm vs. cold** — quantify the referral multiplier
- **Estimate accuracy** — actual value ÷ estimated value; actual hours ÷ estimated hours
- **Time from first signal to outcome**, by type

Output is **advisory**. It informs a proposed `pois-v2` policy that Todd reviews and
activates explicitly. **No automatic weight tuning** — that would destroy reproducibility,
which is the property the whole model depends on.

---

## 14. Worked examples

### 14.1 FTE — below comp floor

**Input:** "Director, Prior Authorization Transformation", Example Health Plan, $180K–$210K,
reports to VP UM, Epic/FHIR, CMS January deadline.

```
Classification:   fte (+ consulting candidate)
Hard filter:      DQ_COMP_FLOOR — $210,000 < $225,000  → DISQUALIFIED as fte
                  Recoverable: reclassify as consulting
```

**As `fte`:** disqualified. Displayed with "Below comp floor. Retained as a consulting
signal and as a negotiation anchor."

**As `consulting` (the sibling opportunity under the same initiative):**

```
fitScore       = 20 problem + 20 transformation + 15 responsibility
                 + 15 domain + 10 technology + 10 urgency + 10 seniority = 100
evidenceScore  = 15 offsets + 10 primary + 10 recent + 15 stated problem
                 + 15 initiative approved + 0 stakeholder + 0 gaps open + 0 = 65
accessScore    = 0 (no stakeholder identified yet)
urgencyScore   = 30 regulatory + 20 new exec = 50

estimatedValue = PA Assessment $6,500 + (0.45 × $75,000) = $40,250
probability    = 0.22 base × 1.3 (fit≥80) × 1.0 (evidence 65 ≥ 50, no penalty)
                 × 0.5 (access<30) = 0.143 → 14%
expectedValue  = $40,250 × 0.14 = $5,635
remainingHours = 6.0 base, no adjustments:
                   initiative reuse  NO  (created in this same ingestion)
                   stakeholder known NO  (none identified)
                   thin evidence     NO  (65 ≥ 50)
                 = 6.0
priorityEfficiency = $5,635 / 6.0 = $939/hr

Next action: identify_stakeholder (accessScore = 0 is the binding constraint)
```

The system's advice is specific: the highest-leverage next move is finding the person, not
polishing the pitch.

### 14.2 Consulting — warm referral, stalled program

**Input:** Article — "Regional Payer Delays Care Management Platform by 18 Months." Todd
knows a former colleague who is now VP Operations there.

```
fitScore      = 20 problem + 20 transformation + 15 responsibility + 15 domain
                + 4 technology + 10 urgency (max) + 10 seniority = 94
evidenceScore = 15 + 10 + 10 + 15 + 15 + 15 + 10 + 0 = 90
accessScore   = 10 VP + 8 budget(2) + 6 hiring(2) + 12 transformation(3)
                + 8 relationship(2) + 4 source(2) + 20 warm_history
                + 6 operational_owner + 8 contact = 82
urgencyScore  = 20 stalled program

estimatedValue = Operational Truth Diagnostic $22,500 + (0.35 × $90,000) = $54,000
probability    = 0.15 × 2.5 (warm history) × 1.4 (access≥70) × 1.3 (evidence≥75)
                 × 1.3 (fit≥80) = 0.887 → capped at 60%
expectedValue  = $54,000 × 0.60 = $32,400
remainingHours = 11.5 base × 0.7 × 0.8:
                   initiative reuse  YES (initiative predates this opportunity)
                   stakeholder known YES (Sarah Chen isSelected)
                   thin evidence     NO  (90 ≥ 50)
                 = 6.44 → 6.4
priorityEfficiency = $32,400 / 6.4 = $5,063/hr

Next action: prepare_outreach (all gates met)
```

**This is the #1 item in Todd's Today view**, and correctly so. Warm path + stalled program
+ high fit is the single best commercial configuration available to him.

### 14.3 Assessment — cold, moderate fit

```
fitScore = 62, evidenceScore = 55, accessScore = 38, urgencyScore = 15

estimatedValue = $6,500 + (0.40 × $60,000) = $30,500
probability    = 0.22 × 1.0 (fit 45-80) × 1.0 (evidence 50-75) × 1.0 (access 30-70) = 22%
expectedValue  = $6,710
remainingHours = 6.0
priorityEfficiency = $1,118/hr

Next action: select_offer
```

Solid mid-queue work. Not urgent, but a good use of an hour when the top items are blocked.

### 14.4 Partnership

**Input:** Regional healthcare SI posts for subcontract transformation specialists.

```
fitScore = 78, evidenceScore = 60, accessScore = 45, urgencyScore = 10

estimatedValue = $25,000 + (0.30 × $40,000) = $37,000
probability    = 0.18 × 1.0 × 1.0 × 1.0 = 18%
expectedValue  = $6,660
remainingHours = 6.5
priorityEfficiency = $1,025/hr

Next action: identify_stakeholder (partner practice lead)
```

### 14.5 RFP — no-bid in ten minutes

**Input:** State Medicaid PA Modernization RFP. Submission in 11 days. Requires 3 prior
state Medicaid prime contracts. Incumbent named. Budget $2.4M over 3 years.

```
Hard filters:
  DQ_RFP_DEADLINE          — 11 days > 5  → does not fire
  DQ_RFP_CANNOT_QUALIFY    — 3 prior prime contracts required, Todd has 0
                             → FIRES. Recoverable via partner path.

canPrime = false
primeBlockers = ["3 prior state Medicaid prime contracts required"]
bidDecision = undecided
partnerSearchDeadlineAt = now + 4 days

As sub:
  estimatedValue = ($2,400,000 / 3) × 0.5 = $400,000
  probability    = 0.12 × 0.5 (incumbent identified) = 6%
  expectedValue  = $24,000
  remainingHours = 13.0
  priorityEfficiency = $1,846/hr

Recommendation: NO-BID as prime. Conditional bid as subcontractor.
Next action: find_partner — "Identify primes already qualified in this state" (20 min)
Auto-close as no_bid if no partner by {now + 4 days}.
```

**The system reached a defensible no-bid-as-prime in ten minutes** and kept a genuinely
attractive sub path alive with a hard expiry. That is the entire value of the RFP module.

---

### 14.6 Consolidated fixture table — authoritative for POIS-105E

Every value below is derived from §4–§10. **Assert these exact numbers.** If the
implementation disagrees, the implementation is wrong; if these disagree with §4–§10, this
table is wrong and must be corrected before implementation (§3A).

| # | Example | Type | fit | evid | access | urg | est. value | prob | EV | hours | **PE** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 14.1 | PA modernization, cold, no stakeholder | `assessment` | 100 | 65 | 0 | 50 | $40,250 | 14% | $5,635 | 6.0 | **$939** |
| 14.2 | Stalled program, warm history | `consulting` | 94 | 90 | 82 | 20 | $54,000 | 60% | $32,400 | 6.4 | **$5,063** |
| 14.3 | Assessment, cold, moderate fit | `assessment` | 62 | 55 | 38 | 15 | $30,500 | 22% | $6,710 | 6.0 | **$1,118** |
| 14.4 | SI subcontract | `partnership` | 78 | 60 | 45 | 10 | $37,000 | 18% | $6,660 | 6.5 | **$1,025** |
| 14.5 | Medicaid RFP, as sub | `rfp` | — | — | — | — | $400,000 | 6% | $24,000 | 13.0 | **$1,846** |

**Effort derivation** (§8.5), stated so no judgment is required:

| # | Base | Reuse ×0.7 | Stakeholder ×0.8 | Thin evid ×1.5 | Result |
|---|---|---|---|---|---|
| 14.1 | 6.0 | no — initiative created in the same ingestion | no | no — 65 ≥ 50 | **6.0** |
| 14.2 | 11.5 | **yes** — initiative predates the opportunity | **yes** — Sarah Chen selected | no — 90 ≥ 50 | **6.4** |
| 14.3 | 6.0 | no | no | no — 55 ≥ 50 | **6.0** |
| 14.4 | 6.5 | no | no | no — 60 ≥ 50 | **6.5** |
| 14.5 | 13.0 | no | no | n/a | **13.0** |

**Required PE ordering** (POIS-105E asserts this exact sequence):

```
14.2 ($5,063) > 14.5 ($1,846) > 14.3 ($1,118) > 14.4 ($1,025) > 14.1 ($939)
```

**Rounding:** `estimatedValue` and `expectedValue` round to the nearest dollar;
`conversionProbability` to the nearest whole percent; `remainingHours` to one decimal;
`priorityEfficiency` to the nearest dollar. Round **once**, at the end of each computation —
never on intermediates.

> **§8.6's "Worked comparison" table is illustrative only.** It uses a different, hypothetical
> set of opportunities to show how PE inverts intuition. **It is not a fixture set** and
> POIS-105E must not assert against it.

---

## 15. Implementation contract

```ts
// commercial/score/index.ts — pure, no I/O, golden-fixture tested

export type ScoreInput = {
  opportunity: { type; status; estimatedValueLow?; estimatedValueHigh?;
                 conversionProbabilityOverride?; estimatedHoursOverride? };
  facts: OpportunityFactForScoring[];
  initiative: { status; confidence; category; domainTags } | null;
  stakeholders: StakeholderScoreInput[];
  sources: { publishedAt; isPrimary; retrievedAt }[];
  researchGaps: { status; blocksOutreach }[];
  offer: OfferBand | null;
  roleProfile: RoleProfileScoreInput | null;
  rfpProfile: RfpProfileScoreInput | null;
  profile: ToddCapabilityProfileV2;
  asOf: Date;
};

export type ScoreResult = {
  isDisqualified: boolean;
  disqualifyingRules: string[];
  fitScore: number;
  evidenceScore: number;
  accessScore: number;
  urgencyScore: number;
  total: number;                 // weighted composite, display only
  completeness: number;
  estimatedValue: number | null;
  conversionProbability: number | null;
  expectedValue: number | null;
  estimatedHours: number | null;
  priorityEfficiency: number | null;
  components: ScoreComponent[];  // { key, label, points, maxPoints, reason }
  warnings: string[];
  scorePolicyVersion: "pois-v1";
  capabilityProfileVersion: "todd-v2";
};

export function scoreOpportunity(input: ScoreInput): ScoreResult;
```

**Test requirements:** golden fixtures for all five worked examples above; every hard filter
fires in isolation; overrides survive rescoring; identical inputs produce byte-identical
output; `priorityEfficiency` ordering matches §14's stated ranking.
