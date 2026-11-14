# TKO Execution Sprint — 30-day delivery playbook

Version 0.1 (proposed), 2026-11-13. How one Sprint is delivered, day by day, and the ten components
every Sprint produces. Offer terms, qualification, and acceptance live in
`EXECUTION_SPRINT_DEFINITION.md`; the documents named here are in `EXECUTION_SPRINT_TEMPLATES.md`.

Client material never goes into this repository. Each Sprint gets a private folder and its own code
repository (or a branch in the client's repository, if the client prefers), created at kickoff.

---

## 1. Before Day 1

| Step | Output | Exit condition |
|---|---|---|
| Fit confirmed (Blueprint, or a qualification call against Q1–Q10) | Ledger row; fit note | All ten criteria true, or redirected in writing |
| Written order sent | Order naming workflow, sources, systems, users, owner, approver, price, start date | Signed; deposit paid per the payment schedule |
| Kickoff scheduled | Calendar | Client owner and one operator attend |

## 2. The 30 days

Days are calendar days from kickoff. Hours are Todd's focused hours (target 40–60 in total).

| Days | Phase | Work | Output | Checkpoint |
|---|---|---|---|---|
| 1–5 | **Intake and model** | Kickoff (60 min). Access requested. Current-state walk-through with an operator. Baseline taken from existing data | Intake record (§3.1), workflow model (§3.2), baseline, signed acceptance scenarios | **Day 5:** access granted, scenarios signed. If not, the date moves (definition §6) |
| 6–14 | **Build the loop** | Source connection, record model, state rules, owner assignment, next-action rules, draft templates, approval gate | Working loop on synthetic or test records | **Day 10:** last day for no-charge scope swaps. Mid-Sprint demo to the owner |
| 15–21 | **Evidence and pilot** | Audit trail, measurement view, operator view. Operators use it on authorized records, with every action approved | Pilot log; issue list | **Day 21:** issue list closed or moved out of scope in writing |
| 22–26 | **Acceptance** | Run each signed scenario in the client's environment; record results | Acceptance record (§3.3) | Owner accepts, or lists failed scenarios within 5 business days |
| 27–30 | **Handoff** | Training (2 × 45 min), runbook, credentials and ownership confirmed in the client's accounts | Handoff pack (§3.5) | Sprint closed in the ledger |
| +30 | **Re-measure** | Same measure as the baseline, same definition | One-page result note; expansion recommendation, if any | Proposal for Operate & Improve or a second Sprint only if the data supports it |

Weekly: a 30-minute status call and a written status note (done, next, blocked, decisions needed).

## 3. The ten delivery components

Each component has one artifact and one check. "Reference" points to the Lead-to-Next-Action
reference implementation (Phase 3, **not built yet**). Until it exists, every component is built
by hand in each Sprint, following the RachelOS pattern listed in the definition's capability map.

| # | Component | What it answers | Artifact | Done when | Reference |
|---|---|---|---|---|---|
| 1 | **Intake** | What is the workflow, who owns it, what does it cost today? | Intake record | Owner signs it | Phase 3 |
| 2 | **Workflow model** | Which states can an item be in, and what moves it? | Workflow model: states, transitions, triggers, owner per state | Every acceptance scenario maps to a transition | Phase 3 |
| 3 | **Source integration** | Where do items come from, and how often? | Connector (form/webhook, CSV, or one API) with a duplicate rule | A test record arrives once, and a repeated record is not created twice | Phase 3 |
| 4 | **State** | Where is each item now? | State rules as code with tests | Every state in the model is reachable, and stale items are flagged | Phase 3 |
| 5 | **Ownership** | Who must act next? | Assignment rule; named person per item | No open item lacks an owner | Phase 3 |
| 6 | **Action** | What should that person do next, and with what? | Next-action rules; message or task templates | Each state has a defined next action or an explicit "no action" | Phase 3 |
| 7 | **Approval** | Who allowed this to happen? | Approval gate recording the named approver, time, and exact content | Nothing customer-facing leaves without an approval record | Phase 3 |
| 8 | **Evidence** | What happened, and can we prove it? | Audit log with correlation IDs; failures visible to the operator | Every external attempt has a log entry, including failures | RachelOS `audit/auditEvents.ts` pattern |
| 9 | **Measurement** | Is it better than before? | Baseline, live measure, 30-day re-measure, same definitions | Baseline recorded before go-live | Phase 3 |
| 10 | **Handoff** | Can the client run it without TKO? | Runbook, training, ownership and credentials record | A client operator completes the daily routine unaided | Template §3.5 |

**Send-boundary rules for every Sprint** (closing the gaps found in RachelOS): consent, suppression,
and quiet hours are checked inside the single send function, not by callers; commercial email
includes the client's postal address; the approver is a named person, not a role.

## 4. Roles

| Role | Who | Time |
|---|---|---|
| Delivery lead and builder | Todd | ~12 h/week |
| Client owner (accepts scope and result) | Named on the order | 2 h/week, plus acceptance |
| Approver (approves customer-facing actions) | Named on the order; may be the owner | During pilot |
| Operators (use the daily view) | ≤ 5 users in standard scope | Pilot and training |

## 5. Sprint ledger

Private, alongside the Blueprint ledger. Columns:

| id | client | blueprint_id | order_sent | price | founding # | deposit_paid_on | kickoff_on | access_complete_on | scenarios_signed_on | accepted_on | final_paid_on | hours | baseline | remeasure_30d | change_requests | followon | collected_total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

`collected_total` is cash received. `hours` is actual focused time.

## 6. Stop rules

- Access not granted by Day 10: pause the Sprint and reschedule the remaining days.
- A source system's terms prohibit the integration: stop the build and change the source through
  change control, or end the Sprint under the cancellation terms.
- Regulated data appears in the material: stop, have the client delete it from shared space, and
  continue only if the workflow can be delivered without it.
