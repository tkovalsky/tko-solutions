# Client onboarding checklist (weeks 0–4)

Draft October 18, 2026. Operational, not legal. The client-facing version belongs on the product site's `/docs`. Items marked **RIA** apply only to registered investment advisers.

## Week 0: qualify and agree

- [ ] Discovery call held; the six qualification questions answered (CRM and key access; contact count and dated relationships; opt-out source of truth; who calls and logs; holdout accepted; **RIA**: CCO, archiving vendor, Reg S-P procedure).
- [ ] Plan chosen (Assessment / Core / Managed); Order Form completed with contact tier, CRM, start date, named operator, holdout percentage.
- [ ] Service Agreement and Data Processing Terms signed (**RIA**: RIA Addendum). Counsel-reviewed versions only.
- [ ] Data Authorization Letter signed (**RIA**: CCO named; archiving vendor named).
- [ ] Setup invoice issued and paid, or payment method on file.
- [ ] Market profile captured: time zone, service area, rest days, postal address for CAN-SPAM, unsubscribe mechanism, voice notes (how the client writes).
- [ ] **RIA**: client's vendor due-diligence questionnaire received; answered from `SECURITY_AND_VENDOR_DDQ.md` within 15 business days; certificate of insurance sent.

## Day 1: access

- [ ] FUB: client creates an API key in their own account and enters it in the secure form. Wealthbox: personal access token from Settings → API Access (support must enable on some accounts). Redtail / closed CRMs: CSV export uploaded through the secure form.
- [ ] No credential or file arrives by email, text, or chat. If one does, delete it, tell the client, and re-collect through the form.
- [ ] Record the access method and timestamp with the client record.

## Days 1–5: import and assessment

- [ ] Raw file hashed and stored encrypted; 30-day deletion date recorded.
- [ ] Normalize email and phone; merge duplicates (email, then phone, then name + address); keep all source ids.
- [ ] Classify provenance per contact: past_client, inquiry (dated), sphere, open_house, purchased_list, unknown; record the evidence field.
- [ ] Build the suppression union: CRM opt-outs, bounces, complaints, DNC, prior STOP.
- [ ] Drop sensitive fields if present; tell the client.
- [ ] Database Health Report delivered: counts by provenance, reachability, duplicates, stale; proposed segments; proposed holdout size; what is **not** reachable and why.

## Days 5–8: approval

- [ ] Client approves segments and holdout in writing.
- [ ] Sequence copy drafted per segment in the client's voice; CAN-SPAM address and unsubscribe present; one reply-to the client reads.
- [ ] Client approves each copy version; approval record stored (version hash, approver, date). **RIA**: CCO approves and the firm retains the record.
- [ ] Core: copy and load instructions handed over. Managed: Provider loads copy into the CRM.

## Day 10 (Core) / Day 14 (Managed): first lineup

- [ ] Nightly lineup running; morning email to the named operator only.
- [ ] Operator trained (30 minutes): how to read the lineup, the one-word disposition vocabulary (TALKED / VM / MORE / NO / BAD), how to record an appointment or closing.
- [ ] First sends begin from the client's CRM; events (replies, bounces, opt-outs) flow to the lineup; Managed: Provider triages replies within one business day.
- [ ] Suppression sync verified in both directions on the first opt-out.

## Days 15–30: operate

- [ ] Weekly segment refresh (new contacts age into dormant segments).
- [ ] Weekly check: dispositions logged? If fewer than 5 in a week, call the operator; adoption is the binding constraint.
- [ ] Any complaint or STOP handled within one business day and recorded.

## Day 30: report and renew

- [ ] Monthly report: conversations, appointments, bounces, opt-outs by segment, versus holdout.
- [ ] Review call (30 minutes); renewal conversation happens here.
- [ ] Record what the client asked for and what they objected to in `content/feedback/guide-usage.csv` or the client record; no invented data.

## Exit (any time after the initial term, 30 days' notice)

- [ ] Export bundle delivered (contacts with provenance, facts, segments, dispositions, outcomes).
- [ ] CRM credentials revoked; per-client key destroyed; database dropped; exports and raw files deleted.
- [ ] Written deletion confirmation sent within 30 days; copy retained with the client record.
