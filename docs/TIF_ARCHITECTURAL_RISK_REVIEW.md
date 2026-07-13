# TIF Architectural Risk Review

| Risk | Severity | Likelihood | Impact | Mitigation | Recommended owner |
|---|---|---|---|---|---|
| Runtime/compiler ambiguity | Critical | High | Read models or docs may be treated as durable records, leading to false counts and broken lineage. | Enforce [Runtime Model](TIF_RUNTIME_MODEL.md); label absent data `Untracked`; require code/migration review for new claims. | Principal Architect |
| Documentation drift | High | High | Future work may build against superseded diagrams or plans. | Make Runtime Model canonical; update it in the same change as any model/runtime change. | Principal Architect |
| Duplicate evidence stores | Critical | Medium | Conflicting proof/claim boundaries undermine governance. | Use `Evidence` as the persisted authority; treat YAML/strategy sources as sources or imports, not a replacement registry. | Evidence steward |
| Duplicate Opportunity generation | High | Medium | Same authority intent can create competing drafts and dilute review. | Use review-only Opportunity Adapter and deterministic candidate marker; search existing Opportunity before creation. | TIF operator |
| Claim-governance gaps | Critical | High | Free-text guards can be missed during composition/review. | P0 structured Evidence maturity and an eligibility read model; block unsupported proof. | Evidence steward + reviewer |
| Stale diagrams | Medium | Medium | A current Asset can rely on an obsolete visual model. | Track diagram review/effective dates in future Evidence maturity; show diagram dependencies now. | Knowledge reviewer |
| Stale packages | Medium | High | Compiler manifests can outlive their inputs. | Treat packages as recomputable contracts; never persist them as independent truth. | TIF operator |
| Stale measurements | Medium | Medium | Old observations can be interpreted as current performance. | Add period/source/effective metadata before measurement persistence. | Publication owner |
| Orphaned assets/evidence | High | Medium | Content becomes unverifiable or unreusable. | Run Authority Dashboard quality/readiness reports; repair joins before approval. | TIF operator |
| Missing lineage to Experience/knowledge | High | High | Reusable IP cannot be traced to scope and confidentiality. | Add reviewed Experience and typed knowledge joins before relying on package output operationally. | Principal Architect |
| Review bottlenecks | High | Medium | Drafts and unclassified proof accumulate, weakening authority. | Use Work Queue P0 items; keep reviewer decisions distinct even when performed by one person. | Content/evidence reviewer |
| Publication-state overstatement | High | Medium | `published` may be mistaken for a fully auditable release. | Add Publication record before operational reporting depends on destinations or release metadata. | Publication owner |
