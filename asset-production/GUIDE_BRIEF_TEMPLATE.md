# Guide Brief Template

Copy the frontmatter block below into a new file in `src/content/insights/<slug>.md`.

The brief lives in the guide's own frontmatter rather than in a separate planning system, so
the commercial intent of a guide travels with the guide and cannot drift from it.

**The gate:** `src/lib/guide-validation.ts` blocks `status: published` until every required
field is present and a named human has recorded a review. It runs in the test suite
(`npm run guides:validate`), so an incomplete guide fails CI rather than reaching the site.
Draft and in-review guides are exempt — they simply do not render publicly.

---

## Frontmatter

```yaml
---
title: "Title an executive would click, 15–110 characters"
description: "What the reader gets, 60–200 characters. This is the search snippet."
business_unit: tko
voice: tko-advisory

# --- Guide brief ---
cluster: <slug from src/lib/guide-clusters.ts>
primary_buyer: >-
  The specific titles and organization types this is written for.
buyer_problem: >-
  The expensive executive problem, stated as they would recognize it.
trigger_signal: >-
  The change signal that makes this urgent now rather than in principle.
search_intent: >-
  The question the reader is actually typing.
problem_hypothesis: >-
  What you believe is really going on underneath the presenting symptom.
point_of_view: >-
  The differentiated position. If a competitor could publish this sentence
  unchanged, it is not a point of view yet.
relevant_proof: >-
  The experience or evidence behind the argument, within the claim boundary.
ai_useful: >-
  Where AI genuinely helps with this problem.
ai_not_answer: >-
  Where AI adds risk instead of value. Required — a guide that only says AI helps
  is marketing, not judgment.
diagnostic_questions:
  - "At least three. The first three become the conversation prompts in the repurposing pack."
  - "Questions beyond the third are carried forward as candidate future guides."
  - "Each should have a documentary answer, or the absence of one is itself the finding."
recommended_action: >-
  The practical next step, useful whether or not they ever contact TKO.
offer: <slug from src/lib/offers.ts>
cta: "Request a Program Recovery Conversation"

# --- Editorial state ---
status: draft            # draft | in_review | published
reviewer: ""             # required to publish
reviewed_date: ""        # required to publish, ISO date

sources:                 # required to publish — evidence records or public URLs
  - healthcare:<evidence-record>
  - https://<public-source>
date: "YYYY-MM-DD"
slug: <slug>
published: true
featured: false
---
```

## Guide quality standard

A guide may not be published unless it:

- Addresses a specific executive problem
- Contains a differentiated point of view
- Includes evidence or clearly identified experience
- Separates fact from inference
- Avoids invented claims
- Contains practical diagnostic value
- Explains AI's appropriate **and** inappropriate role
- Maps to a real TKO offer
- Has been reviewed by a named human
- Includes a useful title, description, canonical URL, and structured metadata
- Passes existing content and build validation

The first nine are the author's judgment; the gate enforces what is mechanically checkable and
records the human who took responsibility for the rest.

## Body conventions

- Open with the problem in the reader's language, not with context-setting.
- Separate fact from inference explicitly. Where something is inference, say so.
- Close with an **Evidence Trail** table: claim · evidence record · proof basis · claim guard.
- Where a claim rests on employment-period experience, state the boundary in the same
  paragraph — not in a footnote.
- One restrained CTA near the end. The guide should be useful to someone who never contacts TKO.

## Cluster discipline

Each cluster owns one pillar guide. Add a supporting guide only when it answers a genuinely
distinct question — two guides sharing a search intent cannibalize each other and neither
ranks. Check `search_intent` against the existing guides in the cluster before writing.

Do not mass-generate thin content. Commercial relevance beats volume.

## After publication

1. Open `/tif/guides` and copy the repurposing pack. Everything in it is a draft — edit before use.
2. Record each use in `content/feedback/guide-usage.csv`.
3. Review recurring buyer questions and objections monthly; they are the next guide.
