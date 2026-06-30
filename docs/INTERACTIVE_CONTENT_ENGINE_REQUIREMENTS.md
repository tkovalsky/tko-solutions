# Interactive Content Engine & Page Template System Requirements

**Status:** Proposed  
**Priority:** P1 — Growth & Lead Qualification  
**Owner:** Rachel Delray / TKO Solutions  
**System of record:** `ENGINEERING_BACKLOG.md` EPIC 14  

## Purpose

Transform the TKO Report Tool from a report generator into a reusable content production and
qualification engine for Rachel Delray. The engine should produce SEO-friendly page structures,
attach the correct interactive experience, and capture structured visitor signals without custom
design work for every page.

This is an extension of the existing TIF model: `Framework x Artifact x Voice`, one composer,
configuration-driven page/module definitions, and the v0.3 Execution Layer:
`Payload → Validation → Framework → Artifact → Fact Resolution → Template Population → Draft
Generation → Voice Refinement → Review → Approval → Publish`. It must not introduce per-page
generators such as `CommunityPageGenerator`, `RelocationGuideGenerator`, or `BuyerGuideGenerator`.

## Problem

The current content library is heavily guide-oriented and lacks:

- Interactive engagement.
- Visitor self-identification.
- Qualification capture.
- Consistent page structure.
- Scalable production templates.

Many pages function as static content assets but do not identify timeline, budget, intent,
community fit, representation readiness, relocation stage, or consultation readiness.

## Goals

Business goals:

- Increase qualified lead capture.
- Increase visitor engagement and time on site.
- Increase community and comparison page coverage.
- Improve buyer, seller, relocation, and representation-intent detection.
- Improve Rachel consultation conversion rate.

Product goals:

- Let operators generate complete page structures.
- Automatically assign the appropriate interactive module.
- Produce SEO-friendly pages consistently.
- Capture structured visitor signals for future CRM, scoring, routing, and outreach systems.

## Non-Goals

This phase does not include:

- New CRM.
- New scoring models beyond deterministic module scoring.
- New AI agent systems.
- New lead routing systems.
- New outreach automation.
- Client-facing SaaS.

## Page Type Requirements

### 1. Community Pages

Examples: Valencia Sound, Valencia Grand, Seven Bridges, The Bridges.

Required sections:

1. Hero.
2. Community Overview.
3. Lifestyle Fit.
4. Homes & Pricing.
5. Amenities.
6. Pros.
7. Cons.
8. Similar Communities.
9. FAQ.
10. CTA.

Interactive module: Community Fit Assessment.

Collect:

- Budget.
- Age range.
- Timeline.
- Full-time vs seasonal.
- Social activity preference.
- Golf interest.
- Pickleball interest.
- New construction preference.

Outputs:

- Community Fit Score.
- Recommended Similar Communities.
- Personalized comparison report (composed by TIF).
- Lead intelligence signals (captured per TIF-1405 / TIF-1409).

### 2. Comparison Pages

Examples: Delray vs Boca, Valencia Sound vs Valencia Grand.

Required sections:

1. Hero.
2. Quick Comparison Table.
3. Cost Comparison.
4. Lifestyle Comparison.
5. Amenities Comparison.
6. Buyer Recommendations.
7. FAQ.
8. CTA.

Interactive module: Comparison Match Tool.

Collect:

- Budget.
- Lifestyle preferences.
- Commute needs.
- Social preferences.

Outputs:

- Best Match.
- Match Percentage.
- Recommended Alternative.

### 3. Relocation Guides

Examples: Moving from New Jersey, Moving from Long Island, Moving from Connecticut.

Required sections:

1. Why People Move.
2. Cost Differences.
3. Taxes.
4. Healthcare.
5. Housing.
6. Common Mistakes.
7. Relocation Timeline.
8. FAQ.
9. CTA.

Interactive module: Relocation Readiness Assessment.

Collect:

- Timeline.
- Budget.
- Home sale dependency.
- Visit history.

Outputs:

- Ready Now.
- Planning.
- Researching.

### 4. Buyer Guides

Examples: Buying in Delray Beach, Buying in Boca Raton.

Required sections:

1. Market Overview.
2. Budget Expectations.
3. Financing.
4. Competition.
5. Common Buyer Mistakes.
6. FAQ.
7. CTA.

Interactive module: Buyer Readiness Assessment.

Collect:

- Financing status.
- Budget confidence.
- Property type.
- Timeline.

Outputs:

- Readiness Score.
- Recommended Next Step.

### 5. Seller Guides

Examples: Selling Before Relocating, Delray Seller Guide.

Required sections:

1. Market Conditions.
2. Pricing Strategy.
3. Preparation Checklist.
4. Timing Considerations.
5. Common Seller Mistakes.
6. FAQ.
7. CTA.

Interactive module: Seller Readiness Assessment.

Collect:

- Home condition.
- Equity expectations.
- Timeline.
- Relocation plans.

Outputs:

- Seller Readiness Score.
- Preparation Recommendations.

### 6. Development Pages

Examples: Valencia Grand, GL Homes Communities.

Required sections:

1. Builder Overview.
2. Community Overview.
3. Floorplans.
4. Amenities.
5. Pricing.
6. Construction Timelines.
7. FAQ.
8. CTA.

Interactive module: Model Recommendation Tool.

Collect:

- Budget.
- Household size.
- Lifestyle preferences.

Outputs:

- Recommended Floorplan.
- Recommended Community.

### 7. Lifestyle Pages

Examples: Active Adult Living, Snowbird Living, Luxury Waterfront Living.

Required sections:

1. Lifestyle Overview.
2. Benefits.
3. Drawbacks.
4. Recommended Communities.
5. Cost Expectations.
6. FAQ.
7. CTA.

Interactive module: Lifestyle Match Assessment.

Collect:

- Lifestyle goals.
- Budget.
- Relocation goals.
- Activity preferences.

Outputs:

- Lifestyle Profile.
- Community Recommendations.

## Interactive Engine Requirements

Interactive modules are reusable components. Module logic must be configuration-driven and reusable
across pages; no logic may be hardcoded to a single page.

Supported inputs:

- Radio selections.
- Multi-select options.
- Budget ranges.
- Timeline ranges.
- Lifestyle preferences.

Supported outputs:

- Match score.
- Readiness score.
- Recommended communities.
- Recommended content.
- Recommended next steps.

Required module definition fields:

- `key`.
- `assessment_type`.
- `supported_page_types`.
- `questions`.
- `input_schema`.
- `scoring_rules`.
- `recommendation_rules`.
- `output_schema`.
- `lead_signal_mapping`.
- `cta_rules`.

## Lead Intelligence Capture

Store structured signals from completed assessments:

- Assessment type.
- Completion date.
- Page URL and page type.
- Timeline.
- Budget range.
- Preferred communities.
- Match scores.
- Readiness scores.
- Recommended communities.
- Recommended content.
- Recommended next step.
- Consent/contact fields where collected.

This data is captured for future integrations, but this phase does not implement new routing,
outreach, CRM, or predictive scoring.

## TKO Report Tool Enhancements

Add operator support for:

- Page type selection.
- Section generation.
- Interactive module assignment.
- FAQ generation.
- CTA generation.
- Internal link recommendations.
- Related content recommendations.

The output must be a page artifact plus an assigned interactive module contract. Publishing still
requires human approval.

## Rollout

Recommended first implementation slice:

1. Community Pages.
2. Comparison Pages.
3. Relocation Guides.

Rationale: these three page types cover the highest-value Rachel search intents first: specific
community research, side-by-side decision support, and out-of-state relocation intent. They also
share enough inputs (budget, timeline, lifestyle preferences, community interest) to prove the
interactive engine, lead intelligence capture, FAQ/CTA generation, and internal-link recommendation
patterns before adding buyer, seller, lifestyle, and development variants.

Phase 1:

- Community Pages.
- Comparison Pages.
- Relocation Guides.

Phase 2:

- Buyer Guides.
- Seller Guides.
- Lifestyle Pages.

Phase 3:

- Development Pages.
- Personalized recommendations.
- Dynamic content linking.

## Success Metrics

Measure:

- Assessment completion rate.
- Lead conversion rate.
- Time on page.
- Pages per session.
- Consultation requests.
- Community page coverage.
- Comparison page coverage.

## Implementation Principles

- Use page templates and module definitions, not bespoke page code.
- Extend existing artifact templates before creating new mechanisms.
- Keep public page content reviewable and human-approved before publishing.
- Keep qualification capture structured even when the visitor does not request a consultation.
- Preserve the separation between TIF-owned generation and Rachel-owned publication/lead handling.
