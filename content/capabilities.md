# TKO Capabilities

Last updated: 2026-06-15

## Capability Matrix

| Capability | Status | Evidence | Commercial Use |
|---|---|---|---|
| Operational truth audit | LIVE AS METHOD | Rachel forensic audits, stabilization docs, closure reports. | Diagnostic offer for stalled transformation or invisible operations. |
| Lead capture reliability | LIVE | `/api/contact`, failed lead recovery, status normalization, cron/alerting. | Revenue leakage recovery for lead-driven businesses. |
| Relationship memory | LIVE | `relationship_updates`, `captureRelationshipUpdate()`. | Prevent context loss across handoffs, calls, emails, and notes. |
| Fact extraction | LIVE | `lead_facts`, `rie.ts`, AI extraction with source authority. | Convert freeform communication into structured operational memory. |
| Human-authoritative facts | LIVE | AI cannot supersede Rachel/Todd/lead facts. | Governance pattern for regulated or high-trust AI workflows. |
| Journey state | LIVE | `lead_journey_state`, valid journey stages. | Interpret current relationship phase without turning it into CRM status. |
| Relationship state | LIVE | `relationship_state` fact, state precedence, canonical queue input. | Make current relationship truth actionable. |
| Canonical next-action queue | LIVE | `lead_action_items` with `canonical:next-action`, `canonicalQueue.ts`. | Replace scattered task lists with one trusted next action per active case/lead. |
| Queue explainability | LIVE | Queue metadata stores decision reasons, triggering facts, freshness, source. | Operator trust and auditability. |
| Needs Rachel workflow | LIVE IN CODE | `/ops/needs-rachel`, gap questions, freeform update, action/content rationale. | Lightweight operator inbox for decision-support workflows. |
| Intelligence gap detection | LIVE IN CODE | `intelligenceGaps.ts`, `lead_questions.gap_type`. | Progressive qualification and stale-info recovery. |
| Content recommendation | LIVE IN CODE | `recommendNextContentForLead()`, static content map, lead fact matching. | Use content as relationship fuel. |
| Daily action engine | LIVE | `dailyActionEngine.ts`, cron run-all, heartbeat. | Morning operating system for human follow-up. |
| Approval-gated outreach drafting | BUILT, GATED | `outreach_drafts`, `outreachDrafts.ts`, `/api/draft-action`, env-gated digest generation. | AI writing support without autonomous sends. |
| Content generation workflow | LIVE | `/api/ops/content/generate`, content versions/tasks, human approval. | Governed content production and review. |
| Publishing operations | LIVE | `/ops/publishing`, sync drafts, content statuses. | Content ops workflow for expert-led sites. |
| Referral intelligence | LIVE, PARTIAL LIFECYCLE | `captureReferralOpportunity()`, `referral_partner_needed`, Refer queue action. | Exception/referral routing. Needs full close-loop states for broader packaging. |
| Behavioral signal intelligence | PARTIAL | Email events exist and are partially surfaced; page views and full event-to-RIE conversion not built. | Future enhancement, not current offering. |
| Conversion/outcome analytics | PARTIAL | Activities and status exist; appointments/closings/revenue reporting incomplete. | Near-term implementation priority. |
| Market/report generation | PARTIAL | Research markdown templates exist. No automated report engine or verified CRE app in this repo. | Sell as workflow modernization, not software product. |
| Shared platform services | NOT BUILT | No shared runtime, graph service, CRM integration, or model gateway. | Do not sell as existing. |

## Reusable Patterns

The reusable TKO pattern is:

`Signals -> Relationship Memory -> Facts -> State -> Canonical Action -> Human Approval -> Outcome`

The strongest reusable assets are:

- Source-aware fact model.
- Human override rules.
- Deterministic recommendation layer.
- Canonical queue with explainability.
- Intelligence-gap acquisition.
- Approval-gated AI drafts.
- Operator workflows designed around human attention.
- Reliability checks and alerting.

