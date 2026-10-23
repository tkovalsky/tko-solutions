# SidecarOS service agreement: outline for counsel

Draft October 18, 2026. Not legal advice. Bracketed items are decisions or counsel review points.

## 1. Parties and definitions

- **Provider:** TKO Solutions LLC (registered name confirmed by Todd, 2026-10-22) [counsel: confirm Florida principal address]. Trading as TKO Solutions / SidecarOS.
- **Client:** the licensed real-estate agent or team, or the registered investment adviser, that signs. If the Client is an individual agent, [counsel: whether the brokerage must consent or co-sign for data export].
- **Services:** the plan selected in the Order Form (Assessment, Core, Managed) as described in Schedule A.
- **Client Data:** contacts, notes, activity, and outcomes the Client supplies or authorizes Provider to read from the Client's CRM.
- **Deliverables:** Database Health Report, segment plan, approved sequence copy, daily lineup, monthly outcome report.
- **Order Form:** plan, fees, contact-count tier, CRM, start date, named Client operator, holdout percentage.

## 2. Services and plan descriptions (Schedule A)

| Element | Assessment | Core | Managed |
|---|---|---|---|
| Import and Database Health Report | Yes | Yes | Yes |
| Segment plan, eligibility screen, holdout | — | Yes | Yes |
| Sequence copy for the Client to load into their CRM | — | Yes | Provider loads and runs |
| Daily lineup (email and signed page) | — | Yes | Yes |
| Reply triage into the lineup | — | — | Yes, one business day |
| Monthly outcome report and 30-minute review | — | Yes | Yes, weekly review |
| Contact limit | 8,000 | 3,000 | 8,000 |

**Exclusions (all plans):** any outbound the Client's CRM cannot send; SMS or calling on the Client's behalf; appointment setting; website, advertising, or transaction work; negotiating, explaining contracts, or substantive real-estate or investment conversations [counsel: unlicensed-activity boundary, FREC permissible activities]; investment advice of any kind.

## 3. Client responsibilities

- Work the lineup and log a one-word disposition for each contact attempted.
- Approve all copy before it is loaded or sent; for RIA Clients, approval by the Chief Compliance Officer and retention of the approval record [counsel: Marketing Rule].
- Maintain opt-outs, do-not-contact, and bounce suppression in the CRM named as source of truth; inform Provider of any complaint within one business day.
- Make all calls and hold all substantive conversations through licensed or registered personnel.
- Warrant the authority to export and use Client Data (see Data Authorization Letter) and compliance with the Client's brokerage or firm policies.
- Provide the postal address and unsubscribe mechanism required on every email (CAN-SPAM) and confirm consent basis for any contact Provider marks eligible.
- Report closings, appointments, and other outcomes needed for the monthly report.

## 4. Provider responsibilities

- Deliver the Services described in Schedule A within the onboarding timeline in Schedule B (first lineup by day 10 for Core, day 14 for Managed, subject to timely access).
- Prepare copy only; never send to a Client contact from a Provider-controlled address in v1.
- Apply the eligibility rules in the Data Processing Terms; exclude contacts without a dated relationship or with any suppression signal; apply the holdout.
- Keep an approval record for every copy version and a log of every lineup, disposition, and report.
- Provide support by email with a one-business-day response (Managed) or two business days (Core). No on-call.

## 5. Fees and payment

- Fees per the Order Form: [D1 — proposed: Assessment $500 one-time credited to setup within 60 days; Core $1,500 setup + $500/month; Managed $2,500 setup + $1,200/month].
- Setup invoiced on signature; monthly fees invoiced in advance; net 15. Card or ACH via [Stripe] or invoice.
- Fees are for software and administrative services and are **independent of any real-estate transaction, referral, appointment, or closing** [counsel: § 475.25(1)(h) characterization risk; this clause must be reviewed].
- Late payment: suspend lineup after 15 days' notice; no deletion during suspension.
- Price changes with 60 days' notice, effective at the next renewal.

## 6. Term, renewal, cancellation

- Initial term: three months from the first lineup, then month to month.
- Cancellation: 30 days' written notice by either party after the initial term; Provider may terminate immediately for breach of § 3 consent obligations or non-payment.
- On termination: export bundle (contacts with provenance, facts, segments, dispositions, outcomes) within 10 business days; deletion per the Data Processing Terms within 30 days with written confirmation.

## 7. Intellectual property

- Client owns Client Data, outcomes, and the approved copy as adapted to the Client.
- Provider owns the Sidecar software, scoring logic, templates, report formats, and anything of general application; Client receives a non-exclusive license for the term.
- Provider may use pseudonymized, aggregated metrics for its own analysis and marketing; no Client name, contact, or identifiable detail without separate written consent [counsel: RIA testimonial/endorsement rules].

## 8. Confidentiality

Mutual. Client Data is Confidential Information. Provider personnel with access are listed and time-boxed per the Data Processing Terms.

## 9. Data protection

The Data Processing Terms are incorporated. For RIA Clients the RIA Addendum applies (Reg S-P 72-hour notice, questionnaire and audit rights, archiving acknowledgment).

## 10. Compliance representations

- Provider is not a licensed real-estate broker or sales associate and will not perform licensed activities; Provider is not a registered investment adviser and will not provide investment advice.
- Each party complies with CAN-SPAM; Client, as the sender and the party whose services are promoted, is responsible for the content and consent basis; Provider is responsible for applying suppression and the eligibility rules it is given.
- No SMS or automated calling is performed under this agreement.
- Segmentation follows the Fair Housing Act and, for RIA Clients, the firm's marketing and suitability policies; no inference of protected characteristics.

## 11. Warranties and disclaimers

Provider warrants the Services will be performed in a professional manner. **No warranty of conversations, appointments, closings, assets, or revenue.** Results are measured against the holdout and reported; they are not promised.

## 12. Limitation of liability

Cap at fees paid in the prior six months; exclusion of indirect damages; carve-outs for confidentiality and data-protection breaches [counsel: cap level and carve-outs].

## 13. Indemnities

Client indemnifies for claims arising from Client Data it lacked authority to use, from Client-approved copy, and from Client's own communications. Provider indemnifies for its breach of the Data Processing Terms. [counsel]

## 14. Insurance

Provider maintains professional (E&O) and cyber liability insurance of at least [$1,000,000] and will provide a certificate on request [D2: no policy is in place as of 2026-10-20; bind E&O and cyber coverage before client 1 signs, or remove this clause].

## 15. Independent contractor; no referral relationship

Provider is an independent contractor. Nothing creates a brokerage, team, agency, or referral relationship; any real-estate referral involving any licensee is documented in a separate broker-to-broker agreement to which Provider is not a party and from which Provider receives nothing. [counsel: Offer A]

## 16. General

Florida law; venue Palm Beach County; notices by email to named addresses; entire agreement = this agreement + Order Form + Data Processing Terms (+ RIA Addendum) + Data Authorization Letter; amendments in writing; assignment with consent; survival of §§ 6–9, 11–13.

## Schedule B: onboarding timeline

See `CLIENT_ONBOARDING_CHECKLIST.md`.
