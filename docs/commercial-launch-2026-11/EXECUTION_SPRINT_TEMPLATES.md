# TKO Execution Sprint — delivery templates

Version 0.1 (proposed), 2026-11-13. Copy each template per Sprint into the client's private folder,
never into this repository. Evidence labels match the Blueprint: **[S]** stated by the client,
**[O]** observed in client material, **[I]** inference, **[E]** estimate.

---

## 3.1 Intake record

| | |
|---|---|
| Client / owner / approver | |
| Workflow (one) and business function | |
| Trigger: what starts an item | [S] |
| Done: what finishes an item | [S] |
| Operators (≤ 5) | |
| Sources (≤ 2) and type: form/webhook, CSV, or API | [O] |
| Systems touched (≤ 3), read or write | [O] |
| Terms of each source system checked for the integration | date, result |
| Consent records available for any customer messaging | [O] |
| Regulated data present? (must be "no") | |
| Current cost of the breakdown | [S] / [E] |
| Baseline measure and its exact definition | [O] |
| Blueprint on file? | id / none |

## 3.2 Workflow model

**States**

| State | Meaning | Owner | Next action | Becomes stale after |
|---|---|---|---|---|

**Transitions**

| From | To | Trigger (event or rule) | Approval needed? | Evidence recorded |
|---|---|---|---|---|

**Out of scope:** list the states and paths that are deliberately not handled.

## 3.3 Acceptance scenarios

Five to eight. Signed by the client owner by Day 5.

| # | Given (starting state and record) | When (event or action) | Then (observable result) | Evidence | Result (pass/fail, date, by) |
|---|---|---|---|---|---|
| A1 | | | | | |

Suggested set for a Lead-to-Next-Action workflow:

1. A new inquiry from the named source appears once, with an owner and a next action.
2. The same inquiry submitted twice does not create a second item.
3. An item with no action past its stale limit appears as overdue for its owner.
4. A drafted customer message cannot be sent without a named approval, and the approval is logged.
5. A contact who has opted out cannot be sent a message; the block is logged.
6. A failed send is visible to the operator and in the audit log.
7. The measurement view shows the same baseline definition before and after.

**Acceptance signature:** name, date, scenarios passed, scenarios failed (with evidence).

## 3.4 Change request

| | |
|---|---|
| Requested by / date | |
| Change (workflow, source, system, user, or scenario) | |
| Reason | |
| Sprint day | (before Day 10: equal-size swap possible; after: later Sprint or Operate & Improve) |
| Effect on scope, date, price | |
| Decision and signatures | |

## 3.5 Handoff pack

1. **What it does:** one page, in the client's words, with the workflow model diagram.
2. **Daily routine:** what an operator does each day, in under 10 steps.
3. **Runbook:** how to tell it is working; what to do when a source fails, a send fails, or an item
   is stuck; whom to contact.
4. **Ownership record:** every account, repository, credential location (the client's vault — never
   the value), and subscription, each with the client as owner.
5. **Measures:** baseline, definition, where to read the live measure, the date of the 30-day
   re-measure.
6. **Known limits:** what was out of scope, and what would be worth doing next.
7. **Training record:** dates, attendees, and the operator who completed the daily routine unaided.
