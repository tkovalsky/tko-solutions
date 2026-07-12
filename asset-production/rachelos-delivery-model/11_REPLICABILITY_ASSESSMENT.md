# Replicability Assessment — What Transfers From RachelOS

**Purpose:** the bridge from proof to engagement. Classification: **Industry Specific** (real-estate/relocation bound) · **Reusable** (relationship-business pattern, needs domain vocabulary swap) · **Highly Reusable** (industry agnostic — the pattern itself is the product). Honest caveat everywhere: transfer claims are **reasonable inference from architecture**, not demonstrated by a second deployment. n=1 is conceded, not hidden.

## Component classification

| Component (brief vocabulary) | Repo reality | Classification | What actually transfers |
|---|---|---|---|
| Intake routing ("Traffic Cop" — term not in repo) | Canonical capture path: dedupe, test-gating, recovery, notification decisioning | **Highly Reusable** | Every business with inbound demand needs one canonical persistence + recovery path; zero domain logic in the pattern |
| Relationship Intelligence (facts/updates/journey) | `lead_facts`, `relationship_updates`, derived journey state | **Reusable** | The architecture (facts authoritative, interpretation derived, human facts immutable by AI) is agnostic; the fact *taxonomy* (target_market, sale_dependency…) is domain work — the real cost of transfer |
| Gap detection / question generation | Gap types → daily questions → operator prompts | **Reusable** | "What don't we know about this relationship, and who do we ask?" applies to any pipeline; gap types are domain-specific |
| Behavioral Layer | BX-01..50: Hick's law, goal gradient, peak-end, substitution applied to operator screens | **Highly Reusable** | Optimizes the *operator*, not the industry. Call avoidance, queue paralysis, capture postponement exist in every follow-up-driven role |
| Sales Package / call sheets / Call Block Mode | Workbench queue card, `/ops/calls` | **Reusable** | Execution-surface pattern transfers; the card's fields are domain vocabulary |
| Canonical Queue | One explained action per relationship; deterministic, idempotent; explanation metadata required | **Highly Reusable** | The single most transferable asset. "One answer per item, with reasons" is the antidote to multi-queue reconciliation in any operation |
| Content Factory (RachelOS side) | Approval-gated generation, versioning, review workflow | **Highly Reusable** | Human-approved AI content is industry agnostic; only the source facts change |
| TIF | Evidence → Opportunity → Asset → Traceability spine (tko-site) | **Highly Reusable** | Already cross-domain by design (capture sources include healthcare, cre, rachel) |
| Recommendation systems (RDE) | Community-fit scoring from structured facts | **Industry Specific** | The engine shape (facts → registry → scored fit) reuses; the decision vocabulary is relocation-bound — and it's unvalidated even in-domain (0 snapshots). Do not sell this component |
| Operator workflows (Today/Leads/Comms/Outcomes) | 25 protected screens around the daily loop | **Reusable** | Capture → truth → one action → execute → outcome → next commitment is the universal loop; screens are skins |
| Governance layer (decision log, four-status vocabulary, evidence hierarchy, activation gates) | DECISIONS.md, CURRENT_STATE conventions, env-gated activation | **Highly Reusable** | Transfers to any org adopting AI-assisted delivery — this is the method TKO actually sells |

## Industry applicability

Scoring what maps: perishable relationship facts • follow-up as revenue • one-person-as-integration-layer • compliance/approval sensitivity. (Positioning guardrail: healthcare leads, per confirmed hierarchy.)

| Industry | Fit | The mapped problem | Notes |
|---|---|---|---|
| **Healthcare (ops)** | **Strongest — lead wedge** | Prior-auth/referral/care-coordination queues: work breaks across systems, status truth is split, follow-up drops | Approval-gated AI + auditability match compliance posture; existing TKO assets already frame this (prior-auth pieces in asset-production/generated/) |
| Professional services | Strong | Proposal follow-up, client development, dormant-relationship reactivation | Near-isomorphic to the lead book |
| Consulting | Strong | Pipeline + relationship memory across long cycles | TKO is its own first deployment here (TIF) |
| Wealth management | Strong | Client life-events as perishable facts; review cadences as commitments | Compliance requires the human-approval architecture RachelOS already has |
| Recruiting | Strong | Candidate/client two-sided follow-up; ghosting = the untouched-cohort problem | Queue + gap detection map directly |
| Insurance | Moderate-strong | Renewal/claims follow-up, book-of-business intelligence | Regulated comms favor draft-approval loop |
| Financial services | Moderate | Relationship coverage, KYC-adjacent fact capture | Heavier integration/compliance lift |
| SaaS | Moderate | CS/AM renewal risk and expansion signals | Competes with dense existing tooling; differentiation is the canonical-queue + explanation layer |
| Home services | Moderate | Estimate follow-up, seasonal reactivation | Simpler fact model; value concentrated in capture-recovery + queue |

## The consulting bridge (how this cashes out)

1. **What's sold is the method, not the codebase:** evidence-hierarchy audit → Built/Activated/Validated map → ranked constraints → governed build with activation gates. Every step is demonstrated in this package on RachelOS itself.
2. **Entry engagement:** AI Delivery / Operational Intelligence Assessment (05 §4) — the audit that found "35 never-touched leads" and "2.2% email-first" in RachelOS, run on the client's operation.
3. **Component order for a client build:** canonical capture → fact/update memory → canonical queue with explanations → approval-gated drafts → outcomes. This mirrors the RachelOS build order *minus its detours* (the failed-bets ledger is the justification for the sequence).
4. **What we refuse to promise:** recommendation engines (unvalidated even at home), autonomous outreach (against architecture), revenue attribution (unproven at home). Refusals are credibility.
