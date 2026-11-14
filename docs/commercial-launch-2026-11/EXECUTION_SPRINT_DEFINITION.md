# TKO Execution Sprint — offer definition

Version 0.1 (proposed), 2026-11-13. Status: **not yet on the public site and not for sale.** This
document defines the offer so it can be validated with buyers (Phase 4) and published (Phase 2).
Once the offer is in `src/lib/offers.ts`, that file is the source of record for public prices and
wording; if the two disagree, the file wins and this document is corrected.

Companion documents: `EXECUTION_SPRINT_PLAYBOOK.md` (how a Sprint is delivered) and
`EXECUTION_SPRINT_TEMPLATES.md` (the documents each Sprint produces).

---

## 1. The offer in one paragraph

One qualifying operational workflow, implemented and running in the client's own environment in
about 30 days from kickoff, for a fixed fee. The client ends with a working improvement, written
acceptance against scenarios agreed in week one, a starting measure and a 30-day re-measure, and a
handoff their team can run. The delivery is done by Todd, using a repeatable method (§8), not a
packaged software product.

**The buyer's path:** identify a costly bottleneck → confirm a qualifying workflow → buy a
fixed-scope Sprint → receive a working improvement → verify the result → expand if justified.

## 2. Price

| Item | Value | Notes |
|---|---|---|
| Founding price | **$9,999** | The first **3** paid Sprints, standard scope only |
| Standard price | **from $14,999** | Fixed per Sprint. It rises above $14,999 only for the named scope factors in §2.1, each priced on the written order before signing |
| Blueprint credit | Fully credited | A $999 / $1,499 Execution Gap Blueprint is credited once against a Sprint signed within 45 days of Blueprint delivery (the Sprint exceeds the $7,500 credit minimum). The credit wording in `BLUEPRINT_CREDIT_TERMS` must name the Sprint when Phase 2 ships |
| Payment schedule | **Proposed:** 50% on signature, 50% on acceptance (§5) | Owner decision; see §9 |
| Third-party costs | Separate | Hosting, subscriptions, messaging, and model usage are billed to the client's own accounts |

The founding count follows the same rule as the Blueprint (`BLUEPRINT_OPERATING_PROCEDURE.md` §5):
the public price changes only on confirmed payment; a founding order is reserved on issue and
released if unpaid; never show a "spots left" count.

### 2.1 Scope factors that change the standard price

Only these, each named and priced on the order:

- A second source that needs an API integration (the first source is included; see §3).
- An accountable operator group larger than 5 users.
- A third system the workflow writes to (reading is included up to 3 systems).

Anything beyond these is not a bigger Sprint. It is a second Sprint, Operate & Improve, or the
enterprise path (§7).

## 3. Qualification — all must be true

| # | Criterion | How it is confirmed |
|---|---|---|
| Q1 | One named workflow in one business function, with a visible trigger and a definable "next action" | Blueprint or qualification call |
| Q2 | One accountable operator group (≤ 5 users in standard scope) and one named client owner with 2 hours a week available | Named on the order |
| Q3 | At most 2 sources, each one of: web form or webhook; CSV or scheduled export; one system with a documented API the client is licensed to use and authorizes in writing | Source list on the order; terms of the source system checked before signing |
| Q4 | At most 3 systems touched in total | Order |
| Q5 | Customer-facing or record-changing actions stay human-approved | Order; acceptance scenarios |
| Q6 | A starting measure can be taken from data the client already has (for example time to first response, items without an owner, items overdue) | Baseline in week 1 |
| Q7 | Access (accounts, exports, API credentials held in the client's own vault) can be granted within 5 business days of kickoff | Order; Day-5 checkpoint |
| Q8 | No PHI, payment card data, or other regulated records are needed | Order |
| Q9 | The buyer is not a residential real-estate agent or team | Those go to BoundOS (`sidecar` in `offers.ts`) |
| Q10 | No conflict with Todd's other professional obligations (no healthcare payer or provider work in this offer) | Fit check |

**Redirects:** no workflow named yet → Execution Gap Blueprint. Several functions, interviews
needed → Constraint Diagnostic. Procurement, security review, multi-team, or regulated data →
enterprise path (§7). Residential real estate → BoundOS.

## 4. Exclusions

Not in any Sprint:

- Replacing the client's CRM or system of record, or migrating its data.
- Autonomous sending to customers, or any SMS without a consent record the client can show.
- Building on a system with no export or API, or one whose terms prohibit the integration.
- Custom model training, embeddings, vector search, or an AI agent framework.
- Ongoing support after the handoff (that is Operate & Improve), on-call coverage, or unrelated IT.
- Legal, tax, compliance, or clinical advice.
- Work for a second workflow, team, or business function.

## 5. Acceptance standard

1. **Scenarios agreed by Day 5.** Between 5 and 8 written acceptance scenarios, each with a given
   state, an action, and an observable expected result. Template: `EXECUTION_SPRINT_TEMPLATES.md` §3.
   They are signed by the client owner. Nothing added later is an acceptance condition unless it
   goes through change control (§6).
2. **Run in the client's environment** on authorized test records or synthetic records, never on
   live customers without the owner's written go-ahead.
3. **Pass means every scenario passes.** The client owner has 5 business days to accept or to list
   the scenarios that failed, with evidence. TKO fixes listed failures within scope and re-runs them
   once. **Proposed** (counsel to confirm): if no response arrives within 5 business days, the Sprint
   is deemed accepted.
4. **Measured, not promised.** Acceptance covers whether the workflow works. The starting measure and
   the 30-day re-measure are reported, but no business result (revenue, conversion, response rate)
   is guaranteed.

## 6. Change control

- Any change to the workflow, sources, systems, users, or acceptance scenarios uses the change
  request template (`EXECUTION_SPRINT_TEMPLATES.md` §4).
- **Before Day 10**, an equal-sized swap can be made at no charge if both sides agree in writing.
- **After Day 10**, a change goes to a later Sprint or Operate & Improve. It does not stretch the
  current Sprint.
- If client access or materials arrive late, the delivery date moves by the same number of business
  days. That is not a change in scope or price.

## 7. Enterprise path (kept)

Projects that need longer discovery, procurement, security review, regulated data, or several
teams do not become Sprints. They go to "Discuss an Enterprise Engagement" and, for health plans,
the Enterprise Transformation & Readiness Sprint. The Sprint is the small-business front door, not
a ceiling.

## 8. Capacity

- **One Sprint at a time.** Budget about 12 focused hours a week for 4–5 weeks (target 40–60 hours a
  Sprint). Record actual hours in the Sprint ledger. If two consecutive Sprints exceed 70 hours,
  tighten the qualification criteria before the next sale.
- New Sprints get a scheduled start date; a signed order does not start the clock until kickoff.

## 9. Release gates

The site may invite **requests to evaluate a Sprint** (no charge) once Phase 2 ships and intake is
verified. No Sprint order, invoice, or deposit until every gate below is closed.

| Gate | Owner | Status 2026-11-13 |
|---|---|---|
| Written cancellation and refund terms (Blueprint gate, extended to the Sprint deposit) | Todd | Open |
| Invoicing account for TKO Solutions LLC; card and ACH, no BNPL | Todd | Open |
| Sales-tax treatment confirmed for Florida (implementation services may differ from advisory) | Todd + accountant | Open |
| Sprint order terms reviewed by counsel: access, data handling, IP ownership, acceptance (incl. deemed acceptance), limitation of liability | Todd + counsel | Open. `docs/legal/` has outlines written for BoundOS, not for implementation work |
| Professional (E&O) and cyber liability insurance bound | Todd | Open. Decision D2 (2026-10-20) recorded no policy |
| Payment schedule chosen (proposed 50/50) | Todd | Open |

**Recommended but not a gate:** the Lead-to-Next-Action reference implementation (Phase 3) running
and documented on synthetic data before the first Sprint is signed, so the buyer can see the method
working instead of reading about it.

## 10. What can and cannot be claimed

Source for every capability claim: the RachelOS code (the private `rachel-realestate` repository),
inventoried read-only on 2026-11-13 at HEAD `8a9317185`. Re-verify before reuse.

**Safe to say:**

- Todd designed and built a production lead-operations system (RachelOS) for one independent
  real-estate business. It derives each lead's state, ranks the next action into a daily operator
  view, requires a human approval before a personal message is sent, sends through a provider with
  suppression rules, records an audit trail, and reports time to first personal contact.
- The Sprint applies that method to one workflow in another business.

**Must not be said:**

- That a reusable "TKO OS", platform, or kit exists, until Phase 3 components are built and verified.
- That RachelOS integrates with Follow Up Boss or any CRM, or imports CSVs. Shipped intake is its own
  web forms; CRM work exists only on unmerged branches.
- That RachelOS drafts outreach with AI today. That path was retired on 2026-10-08.
- Any revenue, conversion, or reply-rate outcome for a client, or a guaranteed result.
- "Replaced a team", or any healthcare, enterprise-scale, or HIPAA claim based on RachelOS.

## 11. Capability map

What the Sprint method needs, and what exists to draw on.
**Proven** = live in RachelOS production code. **Pattern** = live in RachelOS but coupled to real
estate, so rewritten per client. **Gap** = not built; the Sprint must build it or exclude it.

| Component | Status | RachelOS evidence (path under `src/lib/` unless noted) | Note for a client Sprint |
|---|---|---|---|
| Intake | Pattern | `leads/createLead.ts`, `leads/intakeProcessing.ts`, `src/app/api/contact` | Web form only. CSV and API sources are new work in every Sprint |
| Normalization | Pattern | `leads/normalizeLeadFacts.ts`, `leads/factMerge.ts` | The record model is per client |
| State | Pattern | `leads/lifecycleState.ts`, `leads/relationshipState.ts` | Explicit state rules written in the workflow model |
| Ownership | Gap (single operator) | `leads/operatorHandling.ts` | Named-owner assignment must be built |
| Next action | Pattern | `leads/canonicalQueue.ts`, `ops/battingLineup.ts`, `leads/humanNextAction.ts` | Rule-based; no client scoring model |
| Drafting | Pattern (templates) | `leads/deterministicTemplateSelection.ts`; AI path retired in `leads/outreachDrafts.ts` | Templates by default; model drafting only if scoped and approved |
| Approval | Proven, with a gap | `leads/outreachDrafts.ts` `approveDraftAndSend` | Records a role ("Ops"), not a person. Sprints record the named approver |
| Execution | Proven, with gaps | `email/sendEmail.ts`, `email/outboundPolicy.ts`, `sms/sendSms.ts` | Consent is checked by callers, not at the sender; no postal address enforced. Sprints check both at the send boundary |
| Evidence | Proven, generic | `audit/auditEvents.ts` | The most directly reusable module |
| Measurement | Pattern | `leads/operationsReport.ts` (same-day contact rate, median hours to first touch) | Baseline and 30-day re-measure per client |
| Operator view | Pattern | `src/app/ops/today/page.tsx` | Built or configured per client; may live in the client's existing tool |
