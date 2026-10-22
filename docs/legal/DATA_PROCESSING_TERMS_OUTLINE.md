# SidecarOS data processing terms: outline for counsel

Draft October 18, 2026. Not legal advice. Attached to every service agreement. The RIA Addendum (§ 12) applies only when the Client is a registered investment adviser.

## 1. Roles

- Client is the **controller / owner** of Client Data and the **covered entity** under the Florida Information Protection Act (§ 501.171). For RIA Clients, Client is the **covered institution** under Regulation S-P.
- Provider is the **processor / third-party agent** acting on documented instructions.
- Provider's subprocessors are listed in `SUBPROCESSORS.md` and may change only with 30 days' notice and a right to object.

## 2. Data classes and minimization

| Class | Examples | Handling |
|---|---|---|
| Identifiers | Name, email, phone, postal address, CRM id | Stored in the Client's isolated database, encrypted at rest; never sent to an AI provider |
| Relationship facts | Dated closing, inquiry, meeting, stated timeline or area, provenance class | Stored; typed facts only; may be sent to an AI provider **pseudonymized** |
| Free text | Notes, messages | Stored; **redacted excerpts only** for extraction; raw bodies never sent to a model |
| Suppression | Opt-outs, bounces, complaints, DNC, prior STOP | Stored; most restrictive wins; synced back to the Client CRM |
| Outcomes | Dispositions, appointments, closings | Stored; used for the monthly report |
| Raw import file | CSV or API backfill | Encrypted; hashed; **deleted 30 days after import** |

Provider does not collect sensitive categories (SSN, account numbers, health, protected characteristics). If present in a Client export, Provider drops the field at import and notifies the Client.

## 3. Processing instructions

Import and deduplicate; classify provenance; apply eligibility and suppression; assign holdout; compute daily lineup; record dispositions and outcomes; produce reports; write tasks and notes back to the Client CRM where connected. **No other use.** No sale, no sharing, no training of models on Client Data, no combination with another client's data.

## 4. Eligibility rules Provider applies

- Email: provenance in past_client, inquiry, sphere, or open_house **with a dated relationship**, not suppressed. unknown and purchased_list are never emailed.
- SMS: none.
- Calls: by Client personnel only; Provider marks contacts lacking a prior relationship for DNC scrub before the Client calls.
- Fair housing / fair treatment: no segmentation on protected characteristics or inferred financial condition.
- Holdout: 10–20 percent per segment, randomized, excluded from Provider-prepared sequences for 90 days; the Client may still contact them.

## 5. Security measures

- Isolation: one database per Client; no query path crosses clients.
- Encryption: TLS in transit; encryption at rest for databases, raw files, and exports; CRM credentials encrypted with a per-client key that deletion destroys first.
- Access: named Provider personnel only (initially Todd Kovalsky); support access time-boxed and logged; magic-link authentication for Client users; roles owner / agent / operator.
- Logging: every read and write of identifiable data carries a user id; audit log retained 12 months.
- Secrets: CRM keys and tokens entered through a form or OAuth, never by email or chat.
- Backups: provider point-in-time restore plus weekly encrypted logical export; tested restore quarterly.
- Pilot-1 exception: when the Services run on the offline CLI before the Sidecar application exists, the Client export is stored encrypted on Provider's device with full-disk encryption and deleted per § 2; the Client is told in the Order Form which mode applies.

## 6. Incident notification

- **FIPA § 501.171:** as third-party agent, Provider notifies Client **within 10 days** of determining a breach of security affecting personal information, with the information Client needs for its own notices [V statute; counsel confirm trigger].
- **Regulation S-P (RIA Clients):** Provider notifies Client **as soon as possible and no later than 72 hours** after becoming aware of a breach resulting in unauthorized access to a customer information system maintained by Provider [V rule summary; counsel confirm exact trigger in 17 CFR 248.30].
- Where both apply, the shorter period governs.
- Notice includes: nature of the incident, data classes and approximate counts, steps taken, contact person. Provider cooperates with Client's individual and regulator notices and does not notify individuals itself unless instructed.

## 7. Email compliance (CAN-SPAM)

- Every message Provider prepares carries the Client's valid postal address, a working unsubscribe honored within 10 business days, accurate header and subject, and identification as advertising where applicable.
- Client is the sender; Provider applies suppression and syncs unsubscribes back to the CRM within one business day.
- No message is sent from a Provider-controlled address in v1.

## 8. Telephone and text

Provider performs no SMS, automated calls, or dialing. If a future version adds SMS, a separate addendum covering the Florida Telephone Solicitation Act, TCPA consent evidence per contact, and A2P 10DLC registration is required before use.

## 9. Subprocessors

Per `SUBPROCESSORS.md`. Provider flows down equivalent obligations and remains responsible. AI provider receives pseudonymized facts only; contractual no-training terms confirmed at signing.

## 10. Data subject requests, export, deletion

- Individual erasure or access request: executed within 10 business days; Client notified.
- Export: one-click CSV bundle (contacts with provenance, facts, segments, dispositions, outcomes) on request and at termination.
- Deletion at termination: revoke CRM credentials, destroy per-client key, drop the client database, delete object-storage exports and backups beyond the retention window, confirm in writing **within 30 days**.
- Retention: raw import 30 days; audit log 12 months; everything else for the term plus 30 days.

## 11. Audit and questionnaires

Client may send a written security questionnaire once per year and after any incident; Provider answers within 15 business days (see `SECURITY_AND_VENDOR_DDQ.md`). On-site audit is replaced by documentation and, where available, third-party attestations of subprocessors.

## 12. RIA Addendum [counsel: securities compliance]

1. Client acknowledges Provider holds **customer information** under GLBA / Regulation S-P and that this DPA is part of Client's service-provider oversight program; Provider will cooperate with Client's due diligence and ongoing monitoring.
2. 72-hour incident notice per § 6.
3. Provider prepares communications only; **all client-facing communications are sent from Client systems** captured by Client's archiving vendor. Provider introduces no unarchived channel. Client decides whether the daily lineup email to its personnel is archived and configures journaling accordingly.
4. Every copy template is pre-approved by Client's Chief Compliance Officer; Provider keeps the approval record (template hash, approver, date) and will not use unapproved versions.
5. Segmentation uses only facts recorded in Client systems; no inference of financial condition, suitability, or protected characteristics.
6. Provider will not reference Client as a customer, quote any Client personnel, or publish results without written consent and Client's Marketing Rule review.
7. Provider provides a certificate of insurance and this document's current version on request.
