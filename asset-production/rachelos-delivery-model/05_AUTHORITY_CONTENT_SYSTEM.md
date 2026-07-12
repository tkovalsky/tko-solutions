# Authority Content System + Consulting Conversion Strategy

All derivative assets cite `06_TIF_EVIDENCE_PACKAGE.yaml` records by id. No asset restates evidence; each asset frames it for one audience. TIF artifact-type mapping uses the actual Prisma enums (`AssetType`, `DerivativeAssetType`) — every asset below is producible by the existing system.

## 1. Asset manifest (flagship → derivatives)

| # | Asset | TIF type | Home | Evidence records used |
|---|---|---|---|---|
| 1 | Flagship case study: delivery model | `case_study` | `content/selected-work/` | all |
| 2 | Executive brief: operator-led AI delivery | `executive_brief` | `content/offers/` | dm-competency-map, dm-not-compressed, dm-governance |
| 3 | Architecture deep dive | `article` | `src/app/insights/` | dm-capability-map, dm-decision-log, dm-queue |
| 4 | Delivery model analysis | `article` | insights | dm-comparison, dm-cadence, dm-not-compressed |
| 5 | Operating system overview | `article` | insights | existing rachelos evidence.yaml records |
| 6 | Transformation story (website → platform) | `article` | insights | dm-timeline-eras |
| 7–11 | 5 service proof blocks | (site content) | `/services` pages | one record each: governance / approval-gated AI / canonical queue / evidence-audited state / same-day iteration |
| 12 | LinkedIn series (12 posts, below) | `linkedin_post` | derivative queue | one record per post |
| 13 | Email series (5) | `email_draft` | derivative queue | mirrors LinkedIn arcs |
| 14 | Sales deck section | `summary` | deck | dm-comparison + production evidence table |
| 15 | Lead magnet: "The AI Delivery Audit Checklist" — 15 questions an executive should ask of any AI-built system (derived from the claim-audit method itself) | `assessment` | `content/offers/` | dm-claim-audit-method |
| 16 | 3 webinar topics: (a) What AI compresses and what it can't; (b) Governance for human-approved AI operations; (c) From system of record to system of action | — | — | |
| 17 | 3 podcast topics: solo-operator delivery model; the bus-factor tradeoff; behavioral design for operator software | — | — | |
| 18 | 3 conference abstracts: evidence-audited AI delivery; 83 decisions — governance as a solo discipline; the approval-gated outreach loop | — | — | |

## 2. LinkedIn series (12 posts, one evidence record each)

1. 1,528 commits, one committer, ten months — what the cadence data actually shows (dm-cadence)
2. The system crossed competency boundaries normally spread across 12–18 roles — here's the map (dm-competency-map)
3. What AI could NOT compress: judgment, validation, reliability, adoption, accountability (dm-not-compressed)
4. We logged 83 architecture decisions. The log is why the system survived (dm-decision-log)
5. 38% of every line written was later deleted. That's the feature, not the bug (dm-churn)
6. A capability isn't real until it's ACTIVATED and VALIDATED — our four-status honesty scale (dm-status-vocabulary)
7. Same-day loop: a workflow gap ticketed at breakfast shipped to production by evening (dm-same-day)
8. Human facts are immutable by AI — the single rule that makes the intelligence trustworthy (dm-human-facts)
9. 77 messages went out. Every one was approved by a human first (dm-approval-loop)
10. Our email reply rate was 2.2%. Publishing that number is the point (dm-honest-metrics)
11. Bus factor = 1 is the real cost of this model. Here's how we mitigate (not solve) it (dm-bus-factor)
12. The queue explains itself: every recommended action carries its reasons as required metadata (dm-queue)

## 3. Email series (5)

1. The claim audit: how to tell a real AI-built system from a demo → CTA: checklist lead magnet
2. What 10 months of commit data says about AI-assisted delivery → CTA: flagship
3. The approval-gated loop (AI drafts, humans decide, systems remember) → CTA: architecture overview
4. The five things AI didn't compress → CTA: delivery-model analysis
5. Is your operation a candidate? → CTA: AI Delivery Assessment

## 4. Consulting conversion strategy

**Chosen conversion asset: the AI Delivery Assessment.** Rationale: the flagship's audience is leaders evaluating AI-assisted delivery credibility; the natural next step is "assess *my* operation/delivery," and it generalizes across healthcare/professional-services/ops (the Operational Recovery Assessment already exists as an entry engagement — the AI Delivery Assessment is its delivery-model sibling; Revenue Operations and Relationship Intelligence assessments remain persona-specific variants, offered on RevOps and broker paths only).

Structure (mirrors the existing `content/offers/recovery-assessment` engagement pattern):
- **Input:** the prospect's current tools, follow-up workflow, and any AI usage
- **Method:** the same evidence hierarchy used on RachelOS (implementation > configuration > production evidence > documentation)
- **Output:** a Built/Activated/Validated map of their operation + a ranked constraint list (the CURRENT_STATE §14 format, applied to them)
- **Path:** assessment → scoped build/recovery engagement

No "Contact Us" endings anywhere in the system: every asset ends at an assessment or the checklist lead magnet, which nurtures into the assessment via the email series.
