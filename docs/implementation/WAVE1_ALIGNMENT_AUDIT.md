# Wave 1 Alignment Audit

**Authority:** [`CURRENT_REALITY.md`](../../CURRENT_REALITY.md)

**Mission:** Move the repository from an interesting consulting website to an
evidence-backed firm for Operational Knowledge Systems, with healthcare workflow
modernization as the primary market wedge.

**Classification key:**
- **Aligned:** Supports the current story and offer ladder.
- **Underrepresented:** Present, but not strong enough or not visible enough.
- **Missing:** Required by strategy but absent.
- **Contradictory:** Conflicts with the current story or conversion path.

---

## Page Audit

| Surface | Classification | Notes | Wave 1 action |
|---|---|---|---|
| Homepage `/` | Underrepresented | Did not clearly separate company identity, healthcare wedge, proof ladder, offers, and CTA. | Rebuilt hierarchy around Operational Knowledge Systems, healthcare primary market, proof ladder, services, CTA. |
| Hero | Contradictory | Previously risked making a service line or AI spend the company identity. | Reframed as "Operational Knowledge Systems for Complex Workflows." |
| Navigation | Underrepresented | Offered Services/Selected Work/About but did not expose the Assessment. | Added Assessment as a primary nav item and kept Selected Work. |
| Services index `/services` | Aligned | Four-offer ladder exists. | Tightened language around healthcare workflow recovery and modernization. |
| Offer 0 `/services/recovery-assessment` | Aligned | Page exists and maps to the low-friction entry offer. | Added conversion requirements document; CTA now points to Assessment. |
| Offer 1 `/services/diagnostic` | Aligned | Truth Diagnostic exists and is differentiated from Assessment. | Kept as secondary CTA. |
| Offer 2 `/services/operating-system-build` | Aligned | Build Sprint exists and maps to the decision-layer offer. | Metadata aligned to Decision Layer Build Sprint. |
| Offer 3 `/services/fractional-advisor` | Aligned | Retainer offer exists. | No major Wave 1 change needed. |
| Selected Work `/selected-work` | Underrepresented | Page exists and replaces Case Studies, but proof ladder needed clearer ordering. | Added CRE proof entry and homepage proof ladder. |
| RachelOS selected work | Aligned | Strongest product proof. | Reinforced as proof that TKO can build. Screenshots still missing. |
| Healthcare selected work | Underrepresented | Healthcare examples exist, but story structures were not consolidated. | Added Healthcare Story Library. |
| CRE selected work | Missing | CRE proof was named in strategy but not public-facing. | Added CRE Intelligence Model entry. |
| Case Studies routes | Aligned | Old routes redirect to Selected Work. | Preserve redirects. |
| Industries route | Aligned | Standalone evidence-light industry page retired. | Redirects to Selected Work. |
| Insights route | Underrepresented | Empty insight scaffolding removed from nav, route redirects. | Wave 2 should publish real authority content. |
| About `/about` | Underrepresented | Founder credibility exists but should keep reinforcing accumulated evidence. | Retained accumulation narrative; further healthcare-specific credential detail remains a Wave 2 proof task. |
| Contact `/contact` | Underrepresented | Intake existed but was diagnostic/discovery framed. | Reframed as Recovery Assessment intake. |
| Metadata | Underrepresented | Prior metadata leaned toward narrower service-line language. | Updated global and homepage metadata toward Operational Knowledge Systems and healthcare workflow modernization. |

---

## Documentation Audit

| Document area | Classification | Notes | Wave 1 action |
|---|---|---|---|
| `CURRENT_REALITY.md` | Aligned | Authority document. Needed homepage order reconciliation. | Updated buyer lens and homepage order to match implementation. |
| RachelOS proof | Aligned | Evidence library existed and was strong. | Added Wave 1 coverage matrix for required capabilities. |
| Healthcare proof | Missing | Experience library existed, but story structures requested in Wave 1 were missing. | Added `HEALTHCARE_STORY_LIBRARY.md`. |
| Recovery Assessment conversion | Underrepresented | Playbook existed, but conversion requirements needed a consolidated requirements doc. | Added conversion requirements document. |
| Visual assets | Underrepresented | Requirements exist, but screenshots and diagrams are not produced. | Leave for Wave 2. |
| Insights/content strategy | Underrepresented | Many docs exist, but authority content is not public. | Leave publication for Wave 2. |

---

## Remaining Contradictions

No active public page should lead with generic AI consultancy language, SaaS plans, or
industry equivalence.

Known residual risk:
- Some older strategy docs in `docs/` predate `CURRENT_REALITY.md`. They are preserved for
  history but should not override the authority document.
- Public proof is still mostly textual until RachelOS screenshots and healthcare diagrams
  are produced.
