# METHOD — Intelligence Asset Production v0.1

**Status:** Authoritative method for producing TKO intelligence assets.
**Owner:** Todd Kovalsky
**What this is:** A manual, repeatable workflow — markdown + YAML + Claude. **Not software.**
There is no database, API, generation engine, or automation here, and none is sanctioned by
this document (see [`/GOVERNANCE.md`](../GOVERNANCE.md): TIF is DEFERRED). The workflow itself
is the product.

**Portfolio context:** This is the "Intelligence Asset Production" method referenced in
`/dev/PORTFOLIO_GOVERNANCE.md`. TKO owns the method; each proof repo supplies evidence; Claude
is the engine; a human approves every asset before it ships.

---

## 1. The production chain

Every asset — regardless of type — is manufactured by walking the same five stages in order:

```
Observation → Evidence → Finding → Recommendation → Asset
```

This chain is **orthogonal** to the TKO *operating* framework
(`Signals → Memory → Facts → State → Priority → Recommendation → Human Approval → Action → Outcome`).
The operating framework is what a built system (e.g. RachelOS) *does*. The production chain is how
Todd *manufactures an asset about it*. Do not confuse the two; an evidence record is tagged with an
operating-framework `framework_stage`, but it travels through the production chain below.

| Stage | Definition | Lives in |
|---|---|---|
| **Observation** | A specific, concrete thing noticed in a proof domain. Not a claim — a noticing. ("The morning began with reconstruction across four tools.") | an `evidence.yaml` record (`observation:`) |
| **Evidence** | The verifiable artifact that backs the observation — code reference, migration, deployed wiring, screenshot, diagram, or a documented experience pattern. No artifact, no evidence. | `proof_ref:` (and `visual:`) on the record |
| **Finding** | The generalizable pattern the evidence supports. Promotes a domain-specific observation into a reusable truth a buyer recognizes. ("A system of record is not a system of action.") | written by Claude into the asset, citing the record `id` |
| **Recommendation** | What the reader should do about the finding. The shape depends on asset type: the offer (case study / assessment), the action (intelligence report), or the thesis-action (article). | written by Claude into the asset |
| **Asset** | The published artifact in its house style, produced by filling a template. | `templates/*.md` → an output home |

**One pipeline, four output skins.** The five stages are identical for all four asset types.
Only the template and the framing of the Recommendation change.

| Asset type | Template | Recommendation frame | Output home |
|---|---|---|---|
| RachelOS case study | `templates/case-study.md` | governed operating loop | `content/selected-work/` |
| Healthcare assessment | `templates/assessment.md` | remediation roadmap = the offer | `content/offers/` |
| CRE intelligence report | `templates/intelligence-report.md` | action for owner / investor | `cre-intelligence` repo *(cross-repo)* |
| Thought-leadership article | `templates/article.md` | what leaders should do | `src/content/insights/` |

---

## 2. The brief — the single repeatable unit of work

To produce any asset, a human writes **one** `briefs/<id>.brief.yaml` file and runs Claude against
this METHOD. The brief is the only control surface. Its fields:

```yaml
id:           # kebab-case unique id for this asset
asset_type:   # case-study | assessment | intelligence-report | article
template:     # path to the template this asset fills
status:       # lifecycle state (see §6)
sources:      # evidence record ids consumed, as <domain>:<record-id>
angle:        # the single controlling idea of the asset
audience:     # who it is written for
output:       # destination path for the finished asset
constraints:  # explicit guardrails (claim guards, anti-slop notes) that apply to THIS asset
```

A worked example is in [`briefs/example-rachelos-case-study.brief.yaml`](briefs/example-rachelos-case-study.brief.yaml).

---

## 3. The evidence rule (hard)

**Only verifiable artifacts may be cited as evidence.** An evidence record is admissible only if
its `proof_ref` resolves to something real: implemented code, a migration, deployed wiring, a
captured screenshot/diagram, or a documented experience pattern in a proof library.

- If a `proof_ref` does not resolve, the record cannot be used. Fix or drop it.
- Findings may only generalize from admitted evidence. No finding may rest on an observation that
  has no `proof_ref`.
- **No metric is asserted unless a `proof_ref` backs it.** No revenue, lead volume, conversion,
  ROI, adoption, percentage, dollar, or timeline figure may appear in an asset unless evidence
  proves it. The honest non-claim is itself a credibility asset — preserve it deliberately.

---

## 4. The claim-guard rule (hard)

Every evidence record carries a `claim_guard` — a per-record limit on what may be claimed from it.
**The claim guard travels with the evidence into the asset.** When Claude uses a record, it must
honor that record's guard, and the brief's `constraints:` stack on top.

Two standing domain guards:

- **RachelOS** — cite only implemented code, migrations, and deployed wiring. Claim no business
  outcome metrics. Screenshots are proof of capability, not of results.
- **Healthcare** — present as **advisory experience / background, not deployed-product proof and
  not a named case study.** Never pair with a metric. No employer, payer, provider, vendor, or
  program is named. Describe impact as a *pattern*, never a measured result.

---

## 5. Anti-slop review checklist

Before an asset leaves `review`, a human checks every box. Any unchecked box blocks the asset.

- [ ] **Every claim traces to a `sources:` record.** No assertion without a cited `id`.
- [ ] **Evidence rule honored.** No metric appears without a resolving `proof_ref`.
- [ ] **Claim guards honored.** Each record's `claim_guard` is respected; healthcare stays advisory;
      RachelOS stays code-backed; no names where forbidden.
- [ ] **No generic AI-consultancy language.** No "leverage," "synergy," "transform your business,"
      "cutting-edge," "seamless," "empower," or filler that any vendor could write. (See
      [`docs/TKO_ANTISLOP_AUDIT.md`](../docs/TKO_ANTISLOP_AUDIT.md).)
- [ ] **A real finding exists.** The asset promotes observation → finding, not just description.
      For a case study: if nothing was invisible/stalled, it is not a TKO case study.
- [ ] **The recommendation is specific and earned** by the findings — not a bolted-on CTA.
- [ ] **Voice and structure match the template** and the existing exemplars in the output home.
- [ ] **Authority is correct.** Positioning agrees with [`/CURRENT_REALITY.md`](../CURRENT_REALITY.md);
      that document wins on any conflict.

---

## 6. Asset lifecycle

The lifecycle is the brief's `status:` field. The file is the state — there is nothing else to
update.

```
brief ──► evidence ──► findings ──► draft ──► review ──► published
```

| State | Gate to advance | Owner |
|---|---|---|
| `brief` | `sources[]` + `angle` declared | Todd |
| `evidence` | every `proof_ref` in the selected records resolves to a real artifact | Todd (Claude assists) |
| `findings` | each used observation has a finding with ≥1 citation | Claude |
| `draft` | template fully filled; evidence appendix complete | Claude |
| `review` | the **§5 anti-slop checklist passes in full** | **Todd (human, hard gate)** |
| `published` | asset moved to its output home; brief moved to `briefs/_archive/` | Todd |

---

## 7. Human approval requirement (non-negotiable)

**No asset is published without explicit human approval.** Claude may move a brief as far as
`draft` and may *prepare* the `review` checklist, but only Todd advances `review → published`. This
mirrors the RachelOS "Needs Rachel" gate: the engine drafts and surfaces; a person approves and
acts. The human gate is the credibility moat, not a formality — it is where the evidence rule, the
claim guards, and the anti-slop checklist are enforced against a real publish decision.

---

## 8. How to run it (no software required)

1. **Select evidence.** Open the relevant `content/proof/<domain>/evidence.yaml` and choose the
   records whose observations you want to build on.
2. **Write a brief.** Copy the example brief, set `asset_type`, `template`, `sources`, `angle`,
   `audience`, `output`, and `constraints`. Set `status: brief`.
3. **Run Claude against this METHOD.** Point Claude at this file, the brief, the chosen template,
   and the cited evidence records. Ask it to walk Observation → Evidence → Finding → Recommendation
   → Asset, advancing the brief through `evidence → findings → draft`.
4. **Review and approve.** Run the §5 checklist. When every box is checked, advance to `published`,
   move the asset to its output home, and archive the brief.

That is the entire workflow. No database, API, page, or automation is involved or required.
