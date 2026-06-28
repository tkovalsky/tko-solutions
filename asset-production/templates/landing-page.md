<!--
TEMPLATE: landing-page
Produces: a conversion page for a named segment (e.g. a buyer/seller/55+ segment, a service
offer, an assessment intake page).
Output home: src/content/landing-pages/ (rachel-realestate) or content/offers/ (tko-site) —
placement is owned by the publication layer, not by TIF (see GOVERNANCE.md "Publication
Ownership Model").
Read METHOD.md first. Every claim of fit needs a sources: citation or a testimonial proof_asset.
One primary CTA only — no competing CTAs. Fill every [BRACKET]; delete guidance before publishing.
-->
---
title: "[Landing page title — names the segment or offer]"
slug: [kebab-slug]
type: offer
asset_type: landing-page
business_unit: [rachel | cre | tko]
status: draft
summary: >-
  [Who this page is for and what action it asks them to take, in 1–2 sentences.]
evidence_basis: >-
  Every claim of fit (inventory match, proof point, testimonial) traces to a cited evidence
  record or proof_asset. No metric without a resolving proof_ref.
sources:
  - [domain:record-id]
source_opportunity: [asset_opportunity id, or omit if authored directly from a brief]
voice: [tko-advisory | rachelos-product | cre-intelligence]
authority: /CURRENT_REALITY.md
---

# [Title]

*[Hero hook: the segment's situation, stated in their language.]*

## Segment hook
<!-- Who this page is for and why they landed here. From METHOD: Observation. -->
[...]

## Problem recognition
<!-- The specific friction or question this segment has, named plainly. -->
[...]

## Offer / inventory fit
<!-- What TKO/Rachel/CRE has that fits this segment. Each fit claim cites a sources record. From METHOD: Evidence -> Finding. -->
[...]

## Proof
<!-- Testimonial, screenshot, or evidence-backed proof point relevant to this segment. -->
[...]

## Primary CTA
<!-- Exactly one action: discovery call, intake form, tour request. No secondary CTA competing for attention. From METHOD: Recommendation. -->
[...]

---
<!-- Evidence trail kept out of the reader-facing body but retained for the review gate. -->
<!--
EVIDENCE TRAIL (delete or keep as HTML comment in published file):
| Claim / example | Evidence record | proof_ref | Claim guard |
|---|---|---|---|
| [...] | [domain:record-id] | [ref] | [guard] |
-->
