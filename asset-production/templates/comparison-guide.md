<!--
TEMPLATE: comparison-guide
Produces: decision support between 2-4 named options (development vs. development, city vs.
city, plan vs. plan).
Output home: src/content/guides/ (rachel-realestate); cross-repo for cre-intelligence once the
/compare/[a]/[b] UI exists (engine already production-built per TIF_V0.2_CONTENT_AUDIT.md).
Read METHOD.md first. Every comparative claim (price, amenity, fit) needs a dated source — no
metric without one. CTA is soft (schedule a tour/call): comparison guides sell judgment, not
urgency. Fill every [BRACKET]; delete guidance before publishing.
-->
---
title: "[Option A vs Option B (vs ...) — comparison title]"
slug: [kebab-slug]
type: guide
asset_type: comparison-guide
business_unit: [rachel | cre | tko]
status: draft
summary: >-
  [Which options are being compared and who needs this decision support, in 1-2 sentences.]
evidence_basis: >-
  Every comparative claim (price, amenity, fit, market data) cites a dated source record. No
  metric without a resolving proof_ref.
sources:
  - [domain:record-id]
source_opportunity: [asset_opportunity id, or omit if authored directly from a brief]
voice: [tko-advisory | rachelos-product | cre-intelligence]
authority: /CURRENT_REALITY.md
---

# [Title]

*[Framing: the decision a reader is actually trying to make.]*

## Comparison table
<!-- The options laid out side by side on the criteria that actually decide the question. -->
[...]

## Criteria explanation
<!-- Why these criteria, not others. From METHOD: Observation -> Evidence. -->
[...]

## Who fits which option
<!-- The judgment layer: matches reader situations to options. From METHOD: Finding. -->
[...]

## Recommendation
<!-- The specific, earned recommendation -- not "it depends." From METHOD: Recommendation. -->
[...]

## Next step
<!-- Soft CTA: schedule a tour/call. Not urgency-driven. -->
[...]

---
<!-- Evidence trail kept out of the reader-facing body but retained for the review gate. -->
<!--
EVIDENCE TRAIL (delete or keep as HTML comment in published file):
| Claim / example | Evidence record | proof_ref | Claim guard |
|---|---|---|---|
| [...] | [domain:record-id] | [ref] | [guard] |
-->
