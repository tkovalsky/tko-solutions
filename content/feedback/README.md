# Guide Feedback Loop

The last step of the TIF loop:

> Buyer problem → research and evidence → useful guide → organic discovery → credibility →
> relevant offer → executive conversation → **captured market feedback** → improved guide

This directory is that capture step. It is deliberately a few CSV files and no software. A CRM
is not required to learn from twenty conversations, and building one would delay the
conversations that produce the learning.

## Files

| File | Purpose |
|---|---|
| `guide-usage.csv` | One row per use of a guide in a real conversation. |
| `post-performance.csv` | One row per published operator note (`content/proof/stories/operator-notes.json`) per measurement. |
| `../outreach/target-accounts.csv` | The target account list. See `../outreach/README.md`. |

Both open directly in Excel, Numbers, or Google Sheets. Edit them there and commit the result,
or keep the working copy in a spreadsheet and export back here periodically.

## What to record in `guide-usage.csv`

One row every time a guide is used — sent, referenced in a call, quoted in a proposal, or
posted. The row costs about thirty seconds and it is the only mechanism that makes the next
guide more specific than the last.

| Column | Meaning |
|---|---|
| `guide_slug` | The guide, matching its filename in `src/content/insights`. |
| `date` | ISO date of use. |
| `channel` | `outreach`, `recruiter`, `subcontract`, `proposal`, `social`, or `inbound`. |
| `organization` | Where it went. |
| `person`, `person_title` | Who received it. Title matters more than name for pattern-finding. |
| `how_used` | One line: what was said or sent. |
| `reply` | `yes` / `no`. |
| `buyer_question` | **The highest-value column.** The actual question they asked. |
| `objection` | The actual objection raised, in their words. |
| `cta_action` | `none`, `conversation_requested`, `specialist_inquiry`, `email`, `linkedin`. |
| `influenced_conversation` | Did this contribute to a qualified conversation? |
| `influenced_proposal` | Did this contribute to a proposal? |
| `opportunity_value` | Indicative value if it became a real opportunity. |
| `notes` | Anything else worth remembering. |

## What to record in `post-performance.csv`

Two rows per published operator note: one at 7 days and one at 30 days (`measured_at`). Copy
the platform numbers from the post's analytics; count conversations yourself.

| Column group | Columns | What it tells you |
|---|---|---|
| Distribution (leading) | `impressions`, `reactions`, `comments`, `reposts`, `saves` | Whether the post reached anyone. Never a goal by itself. |
| Authority (leading) | `profile_views`, `relevant_followers`, `site_visits` | Whether the right people looked further. `site_visits` comes from the note's `utm_campaign=operator-notes-<id>`. |
| Revenue (lagging) | `inbound_conversations`, `qualified_opportunities`, `opportunity_value` | Whether it produced a real conversation. Count only a conversation the post demonstrably started or materially advanced. |
| Efficiency | `review_minutes` | Human time spent editing and approving. If this exceeds the value of the conversations, write fewer, better notes. |

A note with impressions and no conversations after 30 days taught you about the hook, not the
business. A note that starts one qualified conversation is worth more than a hundred reposts.

## What to do with it

Review monthly, and ask three questions:

1. **Which buyer questions recur?** A question asked three times is the next guide, or a
   missing section in an existing one. Record it in the guide's `diagnostic_questions` or
   write the supporting guide.
2. **Which objections recur?** An objection raised three times belongs in the guide body or
   in the offer's `boundaries` in `src/lib/offers.ts` — answered before it is asked.
3. **Which guides influence nothing?** A guide with uses and no replies, no conversations, and
   no proposals is not earning its place. Rewrite the point of view or unpublish it.

## Metrics that count

- Qualified conversations influenced
- Replies influenced
- Proposals supported
- CTA actions from relevant visitors
- Search visibility for target problem queries

**Page views alone are not a success metric.** A guide read a thousand times by nobody who can
buy is worth less than one read by a COO who replies. The site emits conversion events
(`src/lib/conversion-events.ts`) for CTA actions; join those to this file rather than reporting
traffic on its own.
