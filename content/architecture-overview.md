# TKO Architecture Overview

Last updated: 2026-06-15

## Proven Architecture Pattern

The reusable architecture proven in RachelDelray.com is:

```text
Input signals
  -> Relationship updates
  -> Structured facts
  -> Journey and relationship state
  -> Canonical action queue
  -> Human operator workflow
  -> Approved action or draft
  -> Activity/outcome log
```

## Core Components

| Component | Role | Rachel Evidence |
|---|---|---|
| Signal capture | Collect forms, notes, replies, texts, events, and manual updates. | Lead capture, inbound email/SMS, ops updates, lead events. |
| Relationship memory | Preserve raw human context before interpretation. | `relationship_updates`. |
| Fact layer | Store current known facts with source and supersession. | `lead_facts`. |
| Interpretation layer | Infer current journey/stage without making it the truth layer. | `lead_journey_state`, relationship-state derivation. |
| Gap acquisition | Ask for the missing information that changes decisions. | `lead_questions`, `intelligenceGaps.ts`, Needs Rachel. |
| Decision layer | Determine one next action from facts, state, freshness, and governance. | `canonicalQueue.ts`. |
| Operator layer | Show why the action exists and capture the human update. | `/ops/leads`, `/ops/needs-rachel`, daily digest. |
| Approval layer | Require a human before outbound AI copy or content goes live. | `/api/draft-action`, `/api/ops/content/generate`, publishing workflow. |
| Reliability layer | Detect silent failures and stale operations. | Cron logging, heartbeat, operational alerts, smoke tests. |

## AI Boundary

AI is used for:

- Fact extraction.
- Journey classification.
- Draft copy generation.
- Content generation.

AI is not used as the final authority for:

- Human facts.
- Canonical next actions.
- Autonomous outreach.
- Publishing.
- Lifecycle ownership.

Deterministic code owns the queue. Humans own approval.

## Data Authority Rules

- Raw updates are preserved.
- Facts are source-aware.
- Human/lead facts outrank AI facts.
- Journey state is interpretation, not truth.
- Relationship state is a fact.
- Canonical queue rows are operator next-action truth.
- Draft state is draft lifecycle only, not lead lifecycle.

## Current Gaps

- Behavioral engagement is not fully converted into relationship intelligence.
- Conversion outcomes are not yet robustly measured.
- Referral lifecycle needs close-loop states.
- Reporting is template/workflow-level, not an automated engine.
- Shared cross-domain services are not justified yet.

