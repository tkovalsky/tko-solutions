# Positioning Lock

**Owner:** Todd Kovalsky. **Recorded:** 2026-10-21, from `main` as deployed.

This file is the single source of truth for what TKO sells, to whom, under which names, and at
what price. It records the current site; it does not redesign it.

## The rule for every agent and contributor

**Do not change any of the following without Todd's explicit approval in the request itself:**

- the lanes or their buyers
- offer names, slugs, prices, or durations
- product or brand names, or adding a new one
- the homepage headline
- proof claims about RachelOS

An approved change updates **this file in the same commit** as the code. The test
`src/lib/positioning-lock.test.ts` fails if the price table below and `src/lib/offers.ts`
disagree. Fix the disagreement; never change the test to pass.

If a request would conflict with this file, stop and ask. Don't resolve it yourself.

## Company

- **Name:** TKO Solutions. One principal, Todd Kovalsky, who does the work himself and takes on a
  small number of clients. He has a full-time job: never imply unlimited availability.
- **Homepage headline:** "I turn complex operations into work that gets done."
- **Core idea:** most organizations have systems of record but no system of action. TKO builds the
  layer that turns scattered information into follow-up, decisions, and work that moves, with
  human review wherever judgment or customer contact is involved.

## Lanes

| Lane | Buyer | Entry page | Engine offer | Proof |
|---|---|---|---|---|
| Healthcare | Leaders implementing policy or regulatory change across many teams and systems | `/healthcare/impact-assessment` | Enterprise Transformation & Readiness Sprint | Synthetic decision lab; enterprise program experience |
| Owned demand / growing businesses | Wealth advisory, luxury services, boutique practices, owner-led firms | `/private-client-os` | Owned Demand & Governed AI Engine | RachelOS |

Supporting steps: Constraint Diagnostic (before a build) and Operate & Improve (after a build).
Healthcare continuation: Execution Assurance (fee set after the sprint).

## Offers and prices

```json positioning-lock
{
  "offers": [
    { "slug": "constraint-diagnostic", "name": "Constraint Diagnostic", "startingPrice": "$7,500", "commercial": "$7,500 fixed · standalone diagnostic", "duration": "2 weeks" },
    { "slug": "operating-system-build", "name": "Owned Demand & Governed AI Engine", "startingPrice": "$7,500", "commercial": "$7,500–$15,000 build · fixed scope", "duration": "4–8 weeks" },
    { "slug": "operate-and-improve", "name": "Operate & Improve", "startingPrice": "$1,500/mo", "commercial": "$1,500–$3,000 per month", "duration": "Monthly · 3-month minimum" },
    { "slug": "regulatory-implementation-readiness-sprint", "name": "Enterprise Transformation & Readiness Sprint", "startingPrice": "$15,000", "commercial": "$15,000 fixed · 3–4 weeks", "duration": "3–4 weeks" }
  ],
  "otherPricedPages": [
    { "path": "src/app/products/ambient-crm/page.tsx", "name": "Managed Follow-Up pilot", "mustContain": ["$5,000", "$1,500"] }
  ]
}
```

## Proof rules

- RachelOS is a system Todd designed, built, and runs for an independent South Florida
  real-estate operation. It is proof of method, not a product TKO sells.
- Every number about RachelOS must come from the current re-audit
  (`docs/strategy/CODEX_PROMPT_REVIEW_AND_REAUDIT.md`). The July 2026 figures are retired.
- No revenue, ROI, or conversion-lift claims unless records connect system activity to closed
  deals.
- Don't name Rachel or her business beyond "RachelOS" without her written permission.
- Employment history is experience, never endorsement.

## Open decisions (Todd to resolve; agents must not resolve these)

1. **Third priced offer outside `offers.ts`.** The Managed Follow-Up pilot ($5,000 for 30 days,
   then $1,500/month) lives at `/products/ambient-crm`. It targets real-estate agents, which
   risks reading as "a real-estate CRM company." Keep it, fold it into Operate & Improve, or
   retire it?
2. **The diagnostic costs as much as the cheapest build.** Both start at $7,500. Buyers may skip
   the diagnostic, or question its value. Options: lower the diagnostic, credit it toward the
   build, or raise the build floor.
3. **Too many names.** In public use: Private Client OS, Owned Demand & Governed AI Engine,
   Managed Follow-Up, the "ambient-crm" URL, Constraint Diagnostic, Enterprise Transformation &
   Readiness Sprint, Execution Assurance. SidecarOS and Ambient CRM also appear in internal
   content. Recommendation: one name per lane's engine, and one name per supporting step.
4. **Leftover healthcare-era alt text.** The share-image alt text on `/terms` still says
   "healthcare transformation and operating-model advisory." Minor; fix in the next copy pass.
