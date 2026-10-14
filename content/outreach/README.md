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
| `relevant_offer` | Use a current slug from `src/lib/offers.ts`: `regulatory-implementation-readiness-sprint` or `operating-system-build` for the two engines; `constraint-diagnostic` and `operate-and-improve` are supporting steps. |
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

## Healthcare audience

Health plans and payers · healthcare services organizations · PE-backed provider platforms ·
managed-care organizations · large provider organizations · healthcare consultancies and
system integrators needing senior specialists.

## Healthcare buyers

COO · Chief Transformation Officer · CIO/CTO · SVP/VP Operations · VP Clinical Operations ·
VP Utilization Management · VP Prior Authorization · VP Care Management · enterprise
transformation leaders · PE operating partners · consulting-firm practice and delivery leaders.

## Owned demand audience and buyers

Wealth-advisory firms, luxury services, and boutique practices with a specific buyer-inquiry or
follow-up problem. Start with the managing partner, owner, practice lead, or operations lead
who controls that workflow. A real inquiry handoff, CRM transition, or documented follow-up
gap is stronger than assuming that every business needs AI.

Lead with the [RachelOS case](https://tko.solutions/selected-work/from-crm-to-operating-system)
and map the conversation to `operating-system-build`. For healthcare, lead with the
[synthetic deliverables](https://tko.solutions/healthcare/readiness-preview) and map to
`regulatory-implementation-readiness-sprint`. The optional healthcare Execution Assurance
scope is a continuation discussed after the sprint, not another cold-outreach offer.

## Recording actual conversations

The CSV's example row is a field guide, not a researched account or real pursuit. Replace
example values only with verified facts; never count a template as pipeline. The historical
offer examples in that row must not be used as current commercial terms. Use the registry
slugs above and the reviewed drafts in `docs/COMMERCIAL_OUTREACH_PLAYBOOK.md`.

Keep outreach personal and approved. Record what was sent, the actual response, the next
step, and the buyer's own question. Do not fabricate accounts, replies, results, or proof.

## Related

Record what happens when a guide is used in one of these pursuits in
[`../feedback/guide-usage.csv`](../feedback/guide-usage.csv).
