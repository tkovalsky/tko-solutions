# TIF Content Operating Model

**Status:** Canonical documentation rebaseline  
**Date:** 2026-07-01  
**Owner:** TKO Solutions  
**Scope:** Documentation and backlog alignment only. This document does not authorize feature
implementation, schema changes, migrations, new routes, or production behavior changes.

## Documentation Audit Summary

Reviewed authoritative and supporting TIF/content docs:

- `CURRENT_REALITY.md`
- `ENGINEERING_BACKLOG.md`
- `TKO_INTELLIGENCE_FACTORY_PRD.md`
- `DECISIONS.md`
- `docs/CONTENT_PIPELINE_ROADMAP.md`
- `docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md`
- `docs/CONTENT_STRATEGY.md`
- `docs/AUTHORITY_CONTENT_STRATEGY.md`
- `docs/WEBSITE_CONTENT_STRATEGY.md`
- `docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md`
- `docs/TIF_RACHEL_DRAFT_API.md`
- `content/architecture-overview.md`
- `content/roadmap.md`

Finding: the repo already documents a real v0.1 asset production spine, a deliverable-centric
operator view, a future execution layer, publication boundaries, Rachel page templates, and
authority content strategy. The gap is strategic framing: TIF was still described mainly as an
evidence-to-asset or artifact-generation system. The rebaseline models TIF as a complete content
operating system:

```text
Knowledge -> Insight -> Deliverable -> Channel Package -> Publication -> Measurement
```

Historical terms such as `Evidence`, `Asset`, and `Artifact` remain valid where they describe
implemented tables, traceability records, templates, or prior decisions. They should not be blindly
renamed. Going forward, planning language should use the operating-model terms below.

## Target Architecture

```text
Knowledge
-> Insight
-> Deliverable
-> Channel Package
-> Publication
-> Measurement
```

### 1. Knowledge

Reusable source material. Knowledge is the raw material of the factory.

Examples:

- CRM notes
- Lead conversations
- Call transcripts
- Research findings
- Market intelligence
- Project findings
- Screenshots
- Metrics
- Implementations
- Outcomes
- Testimonials
- Existing guides
- Existing comparison pages
- Existing case studies
- Existing reports

Terminology note: existing `Evidence` records are a governed subset of Knowledge. Evidence is
knowledge admitted for traceable use, usually with source, verifiability, confidentiality, and claim
guards. Do not replace every use of "Evidence" with "Knowledge"; keep "Evidence" when the document
means proof-grade, cited source material.

### 2. Insight

Reusable conclusions derived from knowledge. Insights can support many deliverables.

Examples:

- NJ retirees compare Boca and Delray before choosing where to buy.
- 55+ buyers struggle to compare communities.
- Relocation buyers need decision support, not generic area content.
- Healthcare operating systems fail when ownership and workflow accountability are unclear.
- Executive buyers need proof, not abstract AI thought leadership.

Terminology note: existing `Finding`, `Claim`, `Pattern`, and `Recommendation` concepts map into
this layer depending on specificity. A finding is often run-specific. A claim or pattern is more
reusable. An insight is the content-strategy unit that can be reused across deliverables.

### 3. Deliverable

A producible content or intelligence artifact. Deliverables are the center of the system.

Supported deliverable types:

- Guide
- Comparison
- Report
- Assessment
- Executive Brief
- Article
- Case Study
- Sales Asset
- Offer Asset
- Email Sequence
- Landing Page
- Ad Concept
- Social Post
- Reddit Post
- LinkedIn Post
- LinkedIn Carousel
- Facebook Post
- Facebook Ad
- CRM Next-Touch Asset

Comparison is a first-class deliverable type, not a subtype of article.

Examples:

- Boca vs Delray
- Delray vs Boynton
- Valencia Sound vs Valencia Bay
- GL Homes vs Toll Brothers
- 55+ vs All-Age Communities

Terminology note: existing `Asset` and `Artifact` terms remain valid for implementation records and
registry output contracts. "Deliverable" is the strategy and backlog term for what the operator is
trying to produce.

### 4. Channel Package

A channel-specific adaptation of a deliverable. One core deliverable can produce many channel
packages.

Example core deliverable:

```text
Boca vs Delray Comparison
```

Example channel packages:

- SEO Page
- PDF Guide
- LinkedIn Post
- LinkedIn Carousel
- Facebook Ad
- Facebook Post
- Reddit Post
- Email Sequence
- CRM Next-Touch Asset
- Sales One-Pager

Do not conflate deliverable type with channel format. A comparison can become an SEO page, PDF,
email sequence, LinkedIn carousel, Facebook ad, Reddit post, CRM next-touch asset, or sales
one-pager.

### 5. Publication

The rendered or deployed output of a channel package.

Publication formats may include:

- Website
- PDF
- Email
- CRM
- Sales collateral
- Social platform
- Ad platform
- Internal console

Example:

```text
Deliverable:
Boca vs Delray Comparison

Channel Packages:
SEO Page
Facebook Ad
Email Sequence
LinkedIn Post

Publications:
Website URL
Meta Campaign Creative
Email Drafts
LinkedIn Draft
```

Publication remains downstream of human review and approval. TIF may generate drafts/packages, but
publication layers own placement, presentation, and publish gates.

### 6. Measurement

Performance and coverage feedback.

Examples:

- Page views
- Search impressions
- Guide downloads
- Lead conversion
- Email clicks
- Ad CTR
- CRM next-touch usage
- Topic coverage
- Funnel coverage
- Publication status
- Refresh age

Measurement should inform future content priorities by identifying stale content, high-performing
topics worth expansion, and missing coverage by topic, funnel stage, archetype, or channel.

## Content Archetypes

Every deliverable should be classified by content archetype:

- Educational
- Comparison
- Decision Support
- Proof
- Authority
- Conversion

Examples:

| Archetype | Example |
|---|---|
| Educational | Delray Relocation Guide |
| Comparison | Boca vs Delray |
| Decision Support | Should You Rent Before Buying? |
| Proof | RachelOS Transformation Case Study |
| Authority | 2026 Delray Relocation Intelligence Report |
| Conversion | Book a Relocation Consultation |

## Strategy Model

### Rachel / Relocation Priority

Priority order:

1. Comparison
2. Decision Support
3. Proof
4. Educational
5. Authority
6. Conversion

Reason: relocation buyers who compare places, communities, or buying paths are closer to action
than generic readers.

Rachel examples:

- Comparison: Boca vs Delray, Delray vs Boynton, Valencia Sound vs Valencia Bay.
- Decision Support: Should You Rent Before Buying?, 55+ vs All-Age Communities.
- Proof: RachelOS transformation case study, buyer strategy outcome story.
- Educational: Delray Relocation Guide, Florida tax explainer.
- Authority: 2026 Delray Relocation Intelligence Report.
- Conversion: Book a Relocation Consultation.

### TKO / Consulting Priority

Priority order:

1. Case Study
2. Assessment
3. Report
4. Executive Brief
5. Authority Article
6. Sales Asset

Reason: executive buyers need proof, diagnosis, and business relevance before they care about
thought leadership.

TKO examples:

- Case Study: RachelOS Transformation Case Study.
- Assessment: Healthcare Governance Assessment, Prior Authorization Operational Assessment.
- Report: Operational Recovery Intelligence Report.
- Executive Brief: Decision Latency Executive Brief.
- Authority Article: Administrative Burden Is Decision Latency.
- Sales Asset: Operational Intelligence Diagnostic one-pager.

## Readiness Model

Replace binary readiness thinking with staged readiness:

| Stage | Meaning |
|---|---|
| Knowledge Ready | Enough source material exists and has acceptable provenance. |
| Insight Ready | Reusable conclusion, point of view, or finding has been derived from knowledge. |
| Deliverable Draft Ready | The core deliverable has enough structure, evidence, and intended audience to draft. |
| Channel Package Ready | A specific channel adaptation has required format, CTA, claims, and review needs defined. |
| Publication Ready | The package has passed human review and target-specific publication requirements. |
| Measurement Active | The publication is live or in use and has feedback signals attached. |

Blocked states:

- Missing knowledge: source material is absent or too thin.
- Unsupported insight: conclusion is plausible but not backed by evidence.
- Undefined deliverable: no clear type, audience, archetype, or outcome.
- Missing channel requirements: package format, CTA, or compliance needs are unclear.
- Publication blocked: approval, target ownership, or placement is unresolved.
- Measurement unavailable: no analytics, CRM usage, or manual feedback path exists.

Examples:

- Ready: "Boca vs Delray Comparison" has market facts, buyer questions, clear audience, SEO page
  package, draft approved, and website performance tracking.
- Partially ready: "Valencia Sound vs Valencia Bay" has community facts and insight but no approved
  Facebook ad package or publication target.
- Blocked: "GL Homes vs Toll Brothers" is a strong comparison idea but lacks verified builder facts,
  claim guards, and publication ownership.

## Scenario-Based Validation Framework

Scenario-based validation means testing whether TIF documentation and future workflows can support
realistic business scenarios and expected outputs. It is validation planning, not implementation of a
test framework.

### Scenario: NJ Couple Relocating

Knowledge:

- Current location
- Budget
- Timeline
- Preferred lifestyle
- Tax concerns
- Community preferences

Expected deliverables:

- Delray Relocation Guide
- Boca vs Delray Comparison
- Rent Before Buying Decision Guide
- Florida Tax Explainer
- Relocation Consultation CTA

Expected channel packages:

- SEO Page
- Email Sequence
- Facebook Ad
- LinkedIn Post
- CRM Next-Touch Asset

### Scenario: Healthcare Governance Assessment

Knowledge:

- Fragmented ownership
- Manual status reporting
- Defect aging
- Intake confusion
- Executive visibility gaps

Expected deliverables:

- Assessment
- Executive Brief
- Case Study
- Sales Asset
- LinkedIn Post

Validation should confirm expected outputs, missing source material, blocked readiness stages, and
the difference between deliverable, channel package, and publication. It should not create new
routes, schemas, migrations, or automated tests in this documentation phase.

## Measurement Feedback Loop

Future measurement inputs:

- Google Search Console
- GA4
- Meta Ads
- CRM usage
- Email engagement
- Guide downloads
- Lead conversion
- Manual operator feedback

Measurement should inform:

- Refresh priorities when publication age or facts become stale.
- Expansion priorities when a topic performs well.
- Coverage priorities when a topic, funnel stage, archetype, or channel is missing.
- Retirement priorities when content is outdated, unsupported, or no longer strategic.

Example coverage view:

```text
Topic: Delray

Guides: 12
Comparisons: 8
Reports: 2
Assessments: 0
Case Studies: 0
Email Sequences: 4
Facebook Ads: 3
LinkedIn Posts: 5

Coverage: 55%
```

## Backlog Additions

The following backlog items are now documented in `ENGINEERING_BACKLOG.md`:

- Complete Content Operating Model.
- Comparison Deliverable Support.
- Channel Package System.
- Content Coverage Intelligence.
- Deliverable Readiness Model.
- Scenario-Based Validation Framework.
- Measurement Feedback Loop.

## Backlog Modifications

- EPIC 11 is reinterpreted as the content operating workflow, with the older
  `Observation -> Evidence -> Opportunity -> Research -> Draft -> Refinement -> Approval -> Publish`
  path retained as the v0.1/v0.2 implementation spine beneath the larger model.
- EPIC 12 content normalization should classify deliverables, archetypes, channel packages, and
  publications separately instead of treating "asset type" as the only taxonomy.
- EPIC 14 should treat Comparison as a first-class Rachel deliverable. Comparison pages are channel
  packages/publications of that deliverable, not the deliverable itself.
- EPIC 17 should remain deferred publication integration, but channel package planning and
  measurement feedback are now explicit upstream backlog concepts.

## Backlog Deprecations

Deprecated for future planning language:

- Binary "ready/not ready" framing.
- Treating `comparison_page` or `comparison_guide` as the whole comparison concept.
- Treating every output as only an `Asset` when strategy needs the deliverable/package/publication
  distinction.
- Treating publication and external distribution as a single step.

Not deprecated:

- `Evidence` as proof-grade admitted knowledge.
- `Asset` as the current implemented storage concept.
- `Artifact` as the PRD's registry/output-contract term.
- Historical decisions that describe shipped code.

## Decision Log Updates

`DECISIONS.md` now records the 2026-07-01 decision to adopt the complete content operating model
and preserve existing implementation terms as aliases where appropriate.

## Roadmap Recommendations

Recommended sequencing:

1. Documentation alignment around the operating model.
2. Deliverable registry terminology update, including first-class Comparison.
3. Readiness model update.
4. Channel package specification.
5. Coverage intelligence specification.
6. Scenario-based validation specification.
7. Publication integration after human approval gates are preserved.
8. Measurement feedback loop after publications and channel packages are traceable.

## Open Questions And Conflicts

- Existing code and decisions use `Asset`/`Artifact`; future planning should use `Deliverable`, but
  no schema rename is recommended in this documentation pass.
- Current `/tif/deliverables` support does not yet include every target deliverable type in this
  model. That is a backlog gap, not a production bug.
- `comparison_page`, `comparison_guide`, and `Comparison` currently overlap in docs. The new rule:
  Comparison is the deliverable; SEO page/PDF/social/email/ad/CRM variants are channel packages or
  publications.
- Measurement inputs are not yet integrated. Manual operator feedback remains acceptable until
  analytics/CRM integrations are authorized.
- Scenario-based validation is documentation-only for now; no test framework should be implemented
  until separately selected.
