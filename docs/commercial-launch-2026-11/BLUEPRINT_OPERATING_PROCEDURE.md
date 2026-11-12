# Execution Gap Blueprint — operating procedure

Version 1.0, 2026-11-12. This covers how a Blueprint request becomes a paid, delivered engagement
and, where it is worth it, a follow-on proposal. It uses what already exists: the `/contact` intake,
the `InboundLead` table, the authenticated `/tif/oi/today` review view, and a manual invoice. It adds
no CRM and no payment code.

Commercial terms come from `src/lib/offers.ts` (`blueprintLaunch`, `BLUEPRINT_CREDIT_TERMS`). If
this document and that file disagree, the file wins; fix this document.

---

## 1. The path

| # | Stage | Who | System of record | Target |
|---|---|---|---|---|
| 1 | Request submitted at `/contact?offer=execution-gap-blueprint` | Buyer | `InboundLead` (source `commercial_offer_execution-gap-blueprint`, payload `offer`) | — |
| 2 | Operator notified | System | Resend email, or **amber "Email pending" row in `/tif/oi/today`** | Immediate |
| 3 | Fit confirmed or redirected | Todd | Email reply; ledger row | ≤ 2 business days |
| 4 | Written order + invoice sent | Todd | Invoicing tool; ledger | Same day as fit |
| 5 | Payment confirmed | Invoicing tool | Ledger `paid_on` (from the tool, never from the buyer's word) | — |
| 6 | Intake call (30 min) held, materials requested | Todd + buyer | Ledger | ≤ 5 business days after payment |
| 7 | Blueprint delivered | Todd | `BLUEPRINT_TEMPLATE.md` copy; ledger | 5 business days after complete inputs |
| 8 | Clarification round closed | Todd | Ledger | ≤ 5 business days after readout |
| 9 | Follow-on proposal sent (if worth doing) | Todd | Ledger; proposal with credit line | With the readout |
| 10 | Follow-on signed / declined / expired (45 days) | Buyer | Ledger | Day 45 after delivery |

**Whenever lead email is not confirmed working**, step 2 depends on Todd opening `/tif/oi/today`
every business day. A lead is never lost: the form reports
success only after the row is saved, and the row stays amber until it is notified.

## 2. Fit check (step 3)

Accept when all are true:

- One workflow in one business function is named, and at most three systems are involved.
- The person requesting can make or influence the decision to fix it.
- No production access, regulated records, or PHI are needed to understand it.
- Todd can hold the intake call within five business days.

Redirect, in writing, when:

- The problem spans several functions or needs interviews → Constraint Diagnostic.
- A funded enterprise or healthcare program already exists → scope the engagement directly.
- The buyer wants implementation now and the fix is already clear → build scoping.
- It is not a fit for TKO → say so and, where possible, name who would be.

Reply template (fit):

> Thanks, [name]. [Workflow] across [systems] fits the Blueprint scope. I'll send a short written
> order and an invoice for [price on order]. Once it's paid, pick a 30-minute intake slot and send
> anything that shows how the work runs today (screenshots, an export, process notes). Please don't
> send passwords, patient records, or customer contact lists. The Blueprint is targeted for five
> business days after I have what I need.

## 3. Written order (step 4)

One page, sent with the invoice. It states:

1. Parties: TKO Solutions LLC and the client entity.
2. Scope: the named workflow, function, and up to three named systems.
3. Deliverables: the six items on the public page, delivered as a document plus a live or recorded
   readout.
4. Exclusions: no credentials, no system changes, no software development, one clarification round,
   not legal, tax, compliance, or clinical advice.
5. Price: the founding or standard price **current on the date the order is issued** (see §5).
6. Timing: targeted five business days after the intake call and complete materials; the date moves
   if materials arrive late.
7. Credit: the published credit terms, verbatim from `BLUEPRINT_CREDIT_TERMS`.
8. Payment: due on receipt; work starts on payment.
9. **Cancellation and refund: OWNER DECISION REQUIRED before the first order is sent.** Proposed:
   full refund if cancelled before the intake call; no refund after the intake call is held;
   if TKO cannot deliver, full refund.
10. Confidentiality: client material is used only for this engagement and deleted on request.

## 4. Payment (step 5)

- **Recommended:** a hosted invoice (Stripe Invoicing, QuickBooks, or the tool Todd already uses for
  TKO Solutions LLC). Card and ACH only. **Do not enable BNPL** (Klarna, Affirm, Afterpay).
- No card data ever touches tko.solutions. There is no checkout on the site, deliberately: at five
  sales a checkout adds risk and no conversion value. Revisit after ten paid Blueprints.
- `paid_on` in the ledger is set only from the invoicing tool's paid status, never from an email
  saying "paid".
- Sales tax: professional services; confirm Florida treatment with the accountant before the first
  invoice (owner action).

## 5. Founding allocation (auditable count)

- The first **5 paid** Blueprints are at the founding price. "Paid" means `paid_on` is set.
- When a Blueprint is paid, add the ledger row and, in the same commit, increment
  `blueprintLaunch.foundingPaid` in `src/lib/offers.ts`. Git history is the audit trail.
- When `foundingPaid` reaches 5, every public surface switches to the standard price on the next
  deploy. Orders already issued at the founding price are honored.
- Never display a "spots left" count.

## 6. Ledger

Keep this table private (a spreadsheet, or a private copy of this file outside the repository). It
stores company names and money, so it does not belong in a public repository. The repo copy below is
the column definition only.

| id | lead_id | company | source / utm | requested | fit (Y/N/redirect) | order_sent | price | paid_on | founding # | intake_on | delivered_on | hours | proposal_sent | proposal_value | followon_signed_on | credit_applied | collected_total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Rules: `hours` is actual focused time (target 3–4; if two consecutive Blueprints exceed 6, tighten
the scope before the next sale). `collected_total` is cash received, never invoiced or proposed.

## 7. Credit application (step 10)

Apply the credit only if all are true: follow-on fixed fee ≥ $7,500; agreement signed ≤ 45 days
after `delivered_on`; no credit applied before for this client; not combined with another credit.
Show it as a separate negative line on the follow-on invoice. Existing signed agreements keep their
terms.

## 8. Funnel reconciliation (weekly, 15 minutes)

The site measures only what it can observe: service-page views, CTA clicks, form start/attempt/
result (`src/lib/conversion-events.ts`) and stored leads with UTM source, medium, campaign, and CTA
location (`InboundLead.payload`). Everything after the form is manual and comes from the ledger:

| Metric | Source |
|---|---|
| Qualified inquiries | `InboundLead` rows with offer set, fit = Y |
| Discovery / intake calls held | ledger `intake_on` |
| Blueprints sold | ledger `paid_on` |
| Fulfillment hours and margin | ledger `hours`, `price` |
| Follow-on won | ledger `followon_signed_on` |
| Collected revenue | ledger `collected_total` |
| Source → customer | ledger `source / utm` joined to `paid_on` |

Do not record bookings or revenue from button clicks. No personal data goes to analytics.

## 9. Rollback

Withdrawing the offer: remove the `execution-gap-blueprint` entry from `offers` in
`src/lib/offers.ts` and deploy. Leads already stored keep their payload. Honor every order already
issued.
