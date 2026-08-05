# Current State

**Last updated:** 2026-08-03  
**Status:** M0 and M1 are merged; M2 is half merged. The daily-driver loop runs end to end on
the consulting path.

## Dashboard

| Field | Current Value |
|---|---|
| Current milestone | M2 — Commercial Intelligence |
| Last completed work package | WP-011 Commercial Intelligence |
| Current work package | None active — MSP reconciliation fixes merged on top of WP-011 |
| Next work package | WP-012 Commercial Assets and Campaigns |
| Next story | `implementation/POIS-206-ai-client-adapter.md` — **blocked on D-004 approval** |
| Implementation progress | 59 of 93 stories merged (WP-001 through WP-011) |
| Known blockers | D-004 (paid AI service) gates the front of WP-012; the FTE `complete_role_profile` dead end is unresolved until WP-013 `POIS-307A/B`; Todd-owned content remains called out for `POIS-009A`, `POIS-009B`, `POIS-009C` |

## Work Package Status

| Work Package | Milestone | Stories | State |
|---|---|---:|---|
| WP-001 Repository Foundation | M0 | 3 | Complete |
| WP-002 Schema Foundation | M0 | 6 | Complete |
| WP-003 Existing Model Updates | M0 | 4 | Complete |
| WP-004 Migration, Scoring Port, Backfill | M0 | 7 | Complete |
| WP-005 Seed Data | M0 | 3 | Complete — offers now read by the workbench offer section |
| WP-006 Intake | M1 | 3 | Complete |
| WP-007 Classification and Initiative Decisioning | M1 | 6 | Complete |
| WP-008 Scoring and Next Actions | M1 | 8 | Complete |
| WP-009 Opportunity Pipeline and Workbench | M1 | 5 | Complete |
| WP-010 Today Dashboard and Decision Capture | M1 | 6 | Complete |
| WP-011 Commercial Intelligence | M2 | 8 | Complete |
| WP-012 Commercial Assets and Campaigns | M2 | 9 | Not started — blocked on D-004 |
| WP-013 Manual Outreach | M3 | 15 | Not started |
| WP-014 Learning | M4 | 10 | Not started |

## Reconciliation Fixes Merged on Top of WP-011

Applied 2026-08-03 outside the numbered story sequence, as defect fixes to already-merged
work rather than new capability:

- **Offer selection surface.** `select_offer` was derived as a next action with no UI to
  satisfy it, dead-ending every consulting, assessment, fractional, and partnership
  opportunity. The workbench now has an `#offer` section that lists the seeded active offers
  and sets `OiOpportunity.offerId`. This is the operator surface only — the deterministic
  offer *recommendation* logic remains WP-012 `POIS-208A`.
- **Zero-open-action leak.** D-032's successor exemption is now scoped to `prepare_outreach`
  only. Recorded as **D-035**.
- **Person-fact provenance.** `basis: "stated"` is rejected unless it carries a source and
  offsets that round-trip against that source's immutable `rawContent` (Rule 5). The person
  form no longer offers `stated`.
- **Decision-capture bypass.** The decision type is now derived server-side, so the generic
  status form cannot reach a pause or terminal transition without writing a decision record
  (Rule 9).
- **CI gate.** `.github/workflows/ci.yml` runs `prisma validate`, `npm test`, `npm run lint`,
  and `npm run build` on push and pull request.

## Known Gaps

- **FTE path still dead-ends.** `complete_role_profile` is derived for FTE opportunities and
  there is no role-profile UI; `OiRoleProfile` has no reader. The action now correctly stays
  open instead of vanishing, but Todd cannot clear it. Fixed by WP-013 `POIS-307A/B`.
- **`/tif/oi/accounts` and `/tif/oi/accounts/[id]`** are authorized in `POIS-OPERATOR-UX.md`
  §2 and appear in the shell wireframe, but no story in the 93-story backlog builds them.
  Either the UX doc or the backlog needs a correction.
- **Production database state is unverified in-repo.** Nothing records that the POIS migration
  was applied or that `npm run oi:seed` and `npm run oi:backfill` were run. The offer section
  renders a seeding hint when the catalogue is empty.

## Current Operating Model

Daily development starts here, then moves to `WORK_PACKAGES.md`, `IMPLEMENTATION_RULES.md`,
`CODEX_OPERATING_MODEL.md`, and exactly one story in `implementation/`.

The feature backlog is the POIS story set in `implementation/`. Older plans, audits, wireframes,
and reports are preserved in `archive/` for context only.

---

## PAUSED — 2026-08-05

**Opportunity Intelligence / POIS feature development is paused.** No further stories are
being worked, including WP-012 through WP-014. Decision D-004 (paid AI service) does not need
to be resolved while the work it gates is paused.

Existing code is preserved and continues to run. Permitted changes are limited to security and
production stability.

The target account list moved to `content/outreach/target-accounts.csv` — a spreadsheet is
sufficient for the current pursuit volume. Reopening condition: more than twenty concurrent
live pursuits.

See `docs/OPERATING-BOUNDARIES.md`.
