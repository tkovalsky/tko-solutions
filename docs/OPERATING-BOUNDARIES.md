# Operating Boundaries

**Effective 2026-08-05.**

The commercial objective for the next ninety days is qualified executive conversations, through
three parallel paths:

1. Executive or senior leadership roles
2. Specialist subcontracting through healthcare consultancies and integrators
3. Transformation Diagnostic, Operating Model & Transformation Design Sprint, and Transformation Execution Authority engagements

The website and TIF exist to serve those paths. They are not independent products and do not
get their own growth strategies. Every boundary below follows from that.

---

## What TIF is

TIF is an **internal enabler for TKO**. Its job is to help produce evidence-backed guides and
proof assets that answer problems healthcare executives are actively researching, make TKO
discoverable for those problems, demonstrate judgment, connect to a relevant offer, and learn
from real buyer conversations.

The loop:

> Buyer problem → research and evidence → useful guide → organic discovery → credibility →
> relevant offer → executive conversation → captured market feedback → improved guide

**TIF is not** a standalone SaaS product, a public product requiring its own positioning, a
general-purpose content generator, a CRM or opportunity-management platform, a reason to delay
outreach, or a large software-development roadmap.

### TIF implementation surface

| Loop step | Where it lives |
|---|---|
| Structured guide brief | Guide frontmatter · [`asset-production/GUIDE_BRIEF_TEMPLATE.md`](../asset-production/GUIDE_BRIEF_TEMPLATE.md) |
| Evidence and sources | `sources` frontmatter · `content/proof/**/evidence.yaml` |
| Draft generation | Existing composer (`src/lib/tif/draft-composer.ts`, `scripts/tif/compose-asset.mjs`) |
| Human editorial review | `status` + `reviewer` + `reviewed_date`, enforced by the gate |
| Claim and citation review | Evidence Trail table in each guide body |
| Publication | `src/content/insights/*.md` → `/insights/<slug>` |
| SEO and structured metadata | `src/app/insights/[slug]/page.tsx` (canonical, OpenGraph, JSON-LD) |
| Offer and CTA mapping | `offer` + `cta` frontmatter → `src/lib/offers.ts` |
| Repurposing | `src/lib/tif/repurposing.ts`, surfaced at `/tif/guides` |
| Performance feedback | `content/feedback/guide-usage.csv` |

No database was introduced for the guide pipeline. Guides are repository-native markdown
because that was already sufficient.

---

## Frozen

### RachelOS (`/Users/todd/dev/rachel-realestate`)

**No new feature development.** RachelOS is preserved as existing implementation proof — it
demonstrates that Todd builds and implements, not only advises. It is secondary proof behind
healthcare experience, and it is already sufficient for that purpose.

Permitted: security patches, dependency updates required for it to keep running, and factual
corrections to claims made about it on the TKO site.

Not permitted without an explicit decision to reopen: new capabilities, new screens, new
models, refactors, or scope expansion.

Rationale: the marginal credibility of additional RachelOS work is close to zero, and the
capacity it consumes is the same capacity the three commercial paths require.

---

## Paused

### Opportunity Intelligence / POIS (`src/lib/opportunity-intelligence`, `/tif/oi`)

**No new features.** Existing code is preserved and continues to run. Permitted changes are
limited to security and production stability.

The 93-story POIS backlog in `docs/implementation/` is paused where it stands, including
WP-012 through WP-014. Decision D-004 (paid AI service) does not need to be resolved while the
work it gates is paused.

Replacement: [`content/outreach/target-accounts.csv`](../content/outreach/target-accounts.csv).
A sixty-account list does not need a CRM. No automated enrichment, scraping, or sequencing.

Reopening condition: more than twenty concurrent live pursuits, at which point the spreadsheet
genuinely stops working.

---

## Archive candidates

Dormant projects that no longer serve any of the three commercial paths. **No files have been
moved** — these are outside this repository, and relocating them is Todd's call:

| Project | Last commit | Status |
|---|---|---|
| `cre-intelligence` | 2026-06-30 | Dormant. Not a proof domain for the healthcare positioning. |
| `rachel-realestate-marketing` | 2026-07-03 | Dormant. |
| `atlantichomewatch` | — | Unrelated to the objective. |
| `commission-tracker` | — | Unrelated. |
| `property-manager`, `property-manager-clean` | — | Unrelated. |
| `shoptobooks-original` | — | Unrelated. |
| `experiments` | — | Unrelated. |

Suggested action: move to `/Users/todd/dev/_archive/` and leave the git history intact.

---

## Deprioritized content

Removed from TKO's primary commercial pathway. **Not destroyed** — other projects may still
use it, and it remains in the repository:

| Content | Action | Reason |
|---|---|---|
| `src/content/insights/operational-intelligence-vs-reporting.md` | `status: draft`, redirect → `/insights` | Thesis is not differentiated enough to earn an executive's forward. Its strongest argument is carried in the program-recovery pillar guide. |
| `src/content/insights/prior-authorization-operational-quality-problem.md` | Merged into the flagship guide, file removed, redirect in place | Two guides on one idea split the ranking and the argument. |
| `asset-production/generated/why-buyers-choose-rachel-delray.md` | No change; not referenced from TKO's commercial path | RachelDelray marketing, not TKO positioning. |
| `asset-production/generated/buyer-strategy-vs-listing-strategy.md` | No change; not referenced | Real-estate buyer content. |
| `asset-production/generated/why-most-crms-fail-real-estate-teams.md` | No change; not referenced | Real-estate content. |

---

## Scope note

This change set exceeds the file-count threshold in `CLAUDE.md` / `AGENTS.md` §Scope Control.
It was executed under an explicit implementation instruction covering positioning, offers,
content consolidation, minimum-viable TIF, and repository boundaries as one coherent change.
The default architect-mode behaviour (audit → recommendation → handoff package → stop) still
applies to subsequent requests.
