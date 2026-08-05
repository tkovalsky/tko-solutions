# Target Accounts

`target-accounts.csv` is the target account list. It is a spreadsheet, on purpose.

Opportunity Intelligence (`src/lib/opportunity-intelligence`, `/tif/oi`) is **paused as a
software product** — see [`docs/OPERATING-BOUNDARIES.md`](../../docs/OPERATING-BOUNDARIES.md).
The existing code is preserved and still runs; no features are being added to it. A list of
sixty accounts does not need a CRM, and building one delays the outreach that the list exists
to produce.

No automated enrichment, scraping, sequencing, or CRM build is required or wanted here.

## Columns

| Column | Meaning |
|---|---|
| `organization` | The account. |
| `change_signal` | What changed. Organizations experiencing change buy; stable ones rarely do. |
| `signal_date` | When it changed. A signal older than six months is usually cold. |
| `problem_hypothesis` | What expensive problem this change likely created. Be specific. |
| `named_owner` | The individual who owns that problem. Not a department. |
| `owner_title` | Their title — the strongest pattern-matching field in the sheet. |
| `why_now` | Why this is urgent for them this quarter, not in principle. |
| `path_in` | `warm_intro`, `shared_history`, `alumni`, `vendor_overlap`, `referral`, or `cold`. |
| `relevant_credibility_asset` | The guide or proof asset to lead with. |
| `relevant_offer` | Which of the three offers fits, from `src/lib/offers.ts`. |
| `status` | Where it stands. |
| `last_action` / `next_action` / `next_action_date` | The only workflow this needs. |

## Signal taxonomy

Executive turnover · AI initiatives · acquisitions · large implementations · modernization
programs · heavy hiring · layoffs · organizational restructuring · vendor transitions · new
product launches · regulatory changes · press releases · funding events · RFPs · CMS
announcements · earnings calls.

## Qualification bar

A row is qualified only when all four are true:

1. A change signal within the last six months.
2. A named individual who owns the resulting problem.
3. A plausible path in.
4. The problem is expensive enough to justify the relevant offer.

Rows that fail any of the four should be marked `disqualified` rather than worked. An
unqualified list produces activity, not conversations.

## Primary audience

Health plans and payers · healthcare services organizations · PE-backed provider platforms ·
managed-care organizations · large provider organizations · healthcare consultancies and
system integrators needing senior specialists.

## Primary buyers

COO · Chief Transformation Officer · CIO/CTO · SVP/VP Operations · VP Clinical Operations ·
VP Utilization Management · VP Prior Authorization · VP Care Management · enterprise
transformation leaders · PE operating partners · consulting-firm practice and delivery leaders.

## Related

Record what happens when a guide is used in one of these pursuits in
[`../feedback/guide-usage.csv`](../feedback/guide-usage.csv).
