# Guide Feedback Loop

The last step of the TIF loop:

> Buyer problem → research and evidence → useful guide → organic discovery → credibility →
> relevant offer → executive conversation → **captured market feedback** → improved guide

This directory is that capture step. It is deliberately two CSV files and no software. A CRM
is not required to learn from twenty conversations, and building one would delay the
conversations that produce the learning.

## Files

| File | Purpose |
|---|---|
| `guide-usage.csv` | One row per use of a guide in a real conversation. |
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
