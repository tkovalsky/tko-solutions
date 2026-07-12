# Claim Audit — RachelOS Delivery-Model Content System

Classification: **Verified** (code/git/production record inspected 2026-07-11) · **Reasonable Inference** (follows directly from verified evidence) · **Estimate** (bounded judgment, must be labeled) · **Unverified/Removed** (may not be published).

## Verified (safe to publish with citation)

| Claim | Evidence |
|---|---|
| 1,528 commits, one committer, 2025-09-30 → 2026-07-11 | git log / shortlog |
| 75–270 commits/month sustained for 10 months | git log by month |
| ~455.8k lines added / ~172.9k deleted (≈38% churn) | git log --numstat |
| 67 SQL migrations (001 dated 2026-03-05 → 066 dated 2026-07-10) | migrations/ + git add dates |
| 145 test files; 1,341 test cases; E2E CI chronically red since May 2026 | repo count; BASELINE_2026.md |
| 83 numbered architecture decisions incl. do-not-build rulings | docs/DECISIONS.md |
| 67 API routes; 25 protected operator screens; 643 src files; ~42.1k LOC in src/lib/leads | repo counts |
| 65 published guide files | src/content/guides count |
| 152 non-test leads; 49 in prior 30 days; 927 active facts; 224 relationship updates; 134 journey states | production snapshot in CURRENT_STATE.md (2026-07-11) |
| 77 accepted draft-review sends; 74 send activities; 42 Twilio-SID SMS | same snapshot |
| 145 open / 97 completed canonical actions | same snapshot |
| 3 TIF content items reached ready_to_publish with 6 versions | same snapshot + Phase 2 validation audit |
| Daily cron `0 11 * * *`; zero-error run series 2026-06-22→07-10; **07-11 run missing** | vercel.json; cron_runs |
| Email-first response 2.2% in July 8 funnel study; 9 of 117 touched leads responded | P8_3 audit; CURRENT_STATE §9 |
| Human-approval gates on outreach and content generation in production config | CONFIGURATION_REGISTRY / CURRENT_STATE §3 |
| Same-day ticket→production instance (CALL-001, 2026-07-09) | DEC-72/73 |
| Anthropic (claude-haiku-4-5) is the sole AI provider via one wrapper | src/lib/ai/provider.ts; decision |

## Reasonable Inference (publish with framing language)

| Claim | Basis | Required framing |
|---|---|---|
| The system crossed competency boundaries normally distributed across 12–18 professional roles | 18 evidenced competencies (03 §2) | Exactly this phrasing; never "replaced" |
| AI assistance materially compressed execution and coordination | cadence + churn + single committer + repo CLAUDE.md governing AI development | "consistent with", not measured multiplier — **no "10x" claims** |
| Coordination cost, not typing speed, was the main compression | decision-log-instead-of-meetings pattern | Present as analysis, not measurement |

## Estimate (must carry the word "estimate")

| Claim | Bound |
|---|---|
| Compact conventional team: core 5–7 + fractional specialists 4–6 + 2 domain operators | Range only; no salaries, no cost, no duration-multiple claims |

## Unverified / Removed (may NOT be published)

- Any revenue, commission, or deal attribution (2 active deals / 3 closed / 1 converted **have no attribution chain** — CURRENT_STATE §1 says so explicitly).
- Any traffic→lead conversion rate (no authoritative visitor dataset).
- "Traffic Cop" as a named subsystem (term absent from repo).
- RDE / Community Finder / inbound email / GitHub publishing presented as live (all dormant or unvalidated).
- Content Factory beyond Phase-1 scope (Phase 2 cross-tenant publish-at-scale is "in build", not proven).
- Email *delivery* success (provider acceptance only; 0 delivered events).
- Operator-screen adoption claims (telemetry absent).
- Any autonomous-AI framing; any "AI team" framing without the accountability sentence.
- Email open counts (2,905 vs 1 across two stores — sources disagree; unusable).
- Superseded architectures presented as current (e.g., the 9-engine PRD — archived as falsified, DEC-13).

## Hygiene checks

- **PII:** all cited figures are aggregates; lead names (e.g., in DEC-19/BASELINE) must never appear in published assets. ✔ enforced in package
- **Secrets/credentials:** none cited; config flags are boolean states only. ✔
- **Dormant-as-live:** limitations section required in every derivative (dm-bus-factor + dm-status-vocabulary records). ✔
