# TKO 2.0 Route and Content Migration

Updated 2026-08-21. This matrix implements `docs/TKO-2.0-STRATEGY.md`.

| Current | Decision | Destination / treatment |
|---|---|---|
| `/` | Rewrite | Problem-led TKO 2.0 thesis, offer ladder, proof, founder, and conversion path. |
| `/healthcare` | Rewrite | Healthcare transformation practice: burden, operating models, governed AI, execution. |
| `/services` | Rewrite | Five-stage land-and-expand advisory ladder. |
| `/services/program-recovery-review` | Merge | Permanent redirect to `/services/transformation-diagnostic`; recovery becomes a use case. |
| `/services/fractional-transformation-lead` | Merge | Permanent redirect to `/services/principal-transformation-advisor`. |
| `/services/specialist-subcontract` | Remove as offer | Permanent redirect to `/services#delivery-partners`; retain restrained partner language only. |
| `/services/executive-diagnostic` | New | Bounded 1–2 week paid entry diagnostic. |
| `/services/transformation-diagnostic` | New | Standard 2–3 week diagnostic and recovery entry point. |
| `/services/operating-model-design` | New | Future-state operating-model and transformation design. |
| `/services/principal-transformation-advisor` | New | Recurring principal advisory. |
| `/services/transformation-leadership` | New | Execution architecture and implementation advisory. |
| `/approach` | New | Five TKO methodologies and governed-decision-system thesis. |
| `/selected-work` | Keep / rewrite | Canonical evidence center; do not create `/work`. |
| Existing case-study slugs | Merge / redirect | Replace with the curated enterprise, interoperability, RachelOS, and CRE evidence set; redirect retired slugs to the closest case or index. |
| `/founder` | Keep / rewrite | Canonical founder page and strategist/translator/orchestrator/operator identity. |
| `/about` | Keep redirect | Continue permanent redirect to `/founder`. |
| `/insights` and published guides | Keep / align | Preserve useful articles; update terminology, metadata, links, and CTAs. |
| `/program-recovery-readiness-check` | Keep / demote | Preserve targeted resource and URL; remove from primary navigation and point to Transformation Diagnostic. |
| `/contact` | Rewrite | General transformation qualification with unchanged persistence and notification architecture. |
| `/privacy` | Keep | No material content change. |
| `/tif/**` | Avoid | Private operating system remains untouched. |

## Content Migration

| Current content | Decision | TKO 2.0 use |
|---|---|---|
| Program-recovery positioning | Narrow / merge | Use as one transformation trigger, never the company category. |
| Prior authorization and UM | Keep / reframe | Healthcare evidence and market wedge. |
| Healthcare interoperability | Keep | Evidence of regulated implementation and business/technology translation. |
| Founder career record | Keep / rewrite | Support the strategist identity; chronology remains secondary evidence. |
| RachelOS | Keep / subordinate | Inspectable proof of systems thinking, workflow, human review, and feedback. |
| CRE evidence | Keep / subordinate | Method portability, not healthcare outcome proof. |
| Hourly subcontract offer | Remove | No public hourly or staff-augmentation positioning. |
| Recovery Readiness Check | Keep / retarget | Supporting diagnostic resource. |

## SEO and Rollback

- Preserve `/selected-work`, `/founder`, insight slugs, and the readiness-check URL.
- Add permanent redirects before removing old offer references.
- Update sitemap, canonicals, OpenGraph, structured data, and internal links in the same phase.
- Roll back phase-by-phase; no data or schema rollback is required.
