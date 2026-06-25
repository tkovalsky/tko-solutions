# SERVICE_ALIGNMENT_AUDIT.md
**Phase 6 — Service-offering vs demonstrated-expertise audit**
Audited: 2026-06-24.

Current website offerings (`src/lib/content.ts` `services[]`):
1. **Operational Diagnostic** — $15K, 2–3 wks, "primary entry point."
2. **Operational Intelligence System Build** — $50K–$100K, 8–12 wks.
3. **Fractional Operational Intelligence Advisor** — $12K–$25K/mo, 3–6 mo.

---

## Capability-as-service audit

| Service / capability | Represented on site? | Proven by built work? | Verdict |
|---|---|---|---|
| **Operational Intelligence** (umbrella) | Yes (core category) | **Yes** — RachelOS implements the full framework end-to-end | **Keep — lead with it** |
| **Workflow Intelligence** | Partial (diagnostic) | Yes — journey/lifecycle/pipeline state engines (RachelOS) | Keep; name it |
| **Decision Systems** | Implied ("decision layer") | **Yes** — `buildDecision.ts`, canonical queue, tiers | **Promote to a named capability** |
| **Business Operating Systems** | Yes ("from CRM to operating system") | **Yes** — RachelOS literally is one | Keep |
| **Reporting Systems** | Weak | Partial — RachelOS ops dashboards; CRE report builder | Add as a concrete capability |
| **Operational Analytics** | Weak | Partial — intent/score snapshots, engagement summaries | Add cautiously (don't overstate dashboards) |
| **AI-Assisted Operations** | Yes (human-in-the-loop theme) | **Yes** — live Anthropic AI in outreach drafting + fact extraction, gated by approval | **Keep — strongest current differentiator** |
| **Relationship Intelligence** | Underplayed | **Yes** — the RIE *is* relationship intelligence (`rie.ts`, relationship memory, referral) | **Promote — most demoable, most defensible** |
| **Content Intelligence** | No | Partial — RachelOS content recommendation/ops + CRE content-gap engine | Add as secondary capability |
| **Automation** | Implied | Yes — drips, cron, SMS/email workflows | Fold under "AI-Assisted Operations" |
| **Operational Reporting / Visibility** | Narrative only | Yes — `ops/system-health`, smoke tests | Show as proof, not a separate SKU |

---

## Services that should be ADDED / re-packaged

1. **"Relationship Intelligence System" as a named productized build.** RachelOS is the reference implementation; relationship-driven businesses (advisory, wealth mgmt, brokerage, agencies, professional services) are the most credible near-term buyers. Currently buried inside generic "Operational Intelligence."
2. **A productized "AI-Assisted Operations (human-in-the-loop)" offer.** This is the live, differentiated proof. Package it explicitly: "AI that drafts and surfaces; your people approve and act."
3. **A low-cost entry product below the $15K diagnostic** — e.g. a fixed-fee "Decision-Gap Assessment" or a paid teardown/workshop. The current cheapest front door is $15K; for a new consultancy with one public proof, that is a steep first commitment (see GTM report, fastest-paths).

## Future-state service opportunity

**Enterprise Value & Exit Readiness Assessment** belongs as a future packaging opportunity, not an added current service. It would apply the same dependency, operational memory, workflow scalability, and AI readiness analysis to founders, business owners, healthcare practice groups, PE, search funds, business brokers, and M&A advisors.

Do not add it to the current service list until the diagnostic method has proof and the buyer language has been validated.

## Services that should be REMOVED / softened

1. **Nothing should be removed outright** — all three offerings map to real expertise.
2. **Soften the healthcare-heavy framing** in `industries[]` / About until a provable healthcare case exists. The *demonstrated* (code-backed) expertise is relationship-intelligence + AI-assisted ops, not healthcare delivery. Leading with healthcare promises proof the public site can't show.
3. **Do not introduce any "market data / CRE data product" service** — CRE collection is manual and unpersisted; selling it as a data capability would be overstatement (the one real D-risk in this audit).

## Alignment verdict
The **three core services are well-aligned with real, demonstrated expertise** — the Build offering is directly proven by RachelOS, and AI-assisted/human-in-the-loop is a live differentiator. The misalignment is **emphasis**: the site foregrounds *healthcare* (unprovable publicly) and a generic "Operational Intelligence" umbrella, while underselling the two things actually built and demoable — **Relationship Intelligence** and **AI-Assisted Operations**.
