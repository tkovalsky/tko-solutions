# Security summary and vendor due-diligence answers

Draft October 18, 2026. Written for RIA service-provider oversight (Regulation S-P) and marketplace reviews (Follow Up Boss, Wealthbox, Redtail). Two columns because the control set changes when the Sidecar application replaces the offline CLI. Answer truthfully for the mode in use; never claim the "application" column for a pilot-1 client.

| Question | Pilot 1 (offline CLI) | Sidecar application (planned) |
|---|---|---|
| Company and contact | TKO Solutions LLC [confirm registered name]; Todd Kovalsky, todd@tko.solutions; Delray Beach, FL | Same |
| What data do you hold? | Client contact export (identifiers, relationship facts, notes), suppression, dispositions, outcomes | Same, per client, in an isolated database |
| Where is it stored? | Provider device with full-disk encryption; encrypted lineup email via Resend | Neon PostgreSQL, one project per client, encrypted at rest; object storage for encrypted raw imports (30 days) and exports |
| Multi-tenancy | Not applicable (one client's data at a time, separate encrypted folders) | One database per client; no cross-client query path; control database holds only client metadata and encrypted credentials |
| Encryption in transit | TLS 1.2+ for all provider and CRM API traffic | Same |
| Encryption at rest | Full-disk encryption | Database and storage encryption; per-client key for credentials, destroyed first on deletion |
| Who has access? | Todd Kovalsky only | Named Provider personnel; client users via magic-link login with roles owner / agent / operator; support access time-boxed and logged |
| Authentication | Device login + MFA on all provider accounts | Magic-link email login; MFA on all infrastructure accounts; no shared secrets |
| Logging and monitoring | Import/lineup run logs retained 12 months | Audit log with user id on every read/write of identifiable data; per-client health row; daily operations summary |
| Incident response | Written procedure; notify client within 10 days (FIPA) or 72 hours (RIA) of determining a breach | Same, with automated alerts on failed jobs and unusual access |
| Backups and recovery | Encrypted copy of working data; raw file deleted at 30 days | Point-in-time restore per database; weekly encrypted logical export; quarterly restore test |
| Subprocessors | Resend; client's own CRM | See `SUBPROCESSORS.md`; 30 days' notice of changes |
| AI use | Not used in pilot 1 unless stated in the Order Form | Anthropic API with pseudonymized facts and redacted excerpts only; no identifiers or raw messages; no training on API data |
| Outbound communications | None from Provider to end clients; the client's CRM sends; lineup email goes to the client's operator only | Same |
| SMS / calling | None | None |
| Data retention | Raw import 30 days; working data for the term + 30 days; logs 12 months | Same |
| Deletion | Secure deletion of folders; written confirmation within 30 days | Revoke credentials, destroy key, drop database, delete storage; written confirmation within 30 days |
| Data subject requests | Within 10 business days | Same |
| Penetration testing / attestations | None yet; relies on subprocessor attestations (Vercel, Neon, Resend publish SOC 2 reports) | Annual third-party test planned once ≥10 clients; subprocessor attestations available on request |
| Insurance | Not yet in place (D2, 2026-10-20). Do not answer a DDQ with a coverage claim until a policy is bound. | Same |
| Business continuity | Single-operator risk disclosed; export bundle available at any time so the client is never locked in | Same disclosure; documented runbooks |
| Regulatory posture | Not a broker, agent, or investment adviser; performs no licensed activity | Same |
| Change management | Changes to processing require written client notice | Release lane with synthetic-tenant smoke test; migrations ledgered |
| Right to audit | Written questionnaire annually and after incidents; answered within 15 business days | Same |

Keep this in step with the Data Processing Terms. If an answer here is stronger than what the system actually does, fix the system or the answer before sending it to a client.
