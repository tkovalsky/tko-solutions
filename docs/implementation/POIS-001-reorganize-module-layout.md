## Story Metadata

Milestone:
M0

Parent Task:
POIS-001

Story:
POIS-001

Depends On:
None

Blocks:
POIS-002

Estimated PR Size:
Medium

Expected Review Time:
10-15 minutes

Risk:
Low

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Give every later story a stable, predictable place to land code, so
implementation sessions never have to guess where a file belongs.

**User story:** As Codex, I need a stable module layout so later tasks land in predictable
places.

**Commercial outcome:** None directly — this is pure groundwork. It exists so Milestones 1–4
can be built as small stories without renegotiating file layout each time.

---

# Scope

**Included:** Move files only. Change no logic, no exports, no behavior.

| From | To |
|---|---|
| `sources/normalize.ts` | `intake/normalize.ts` |
| `extract.ts` | `intake/extract.ts` |
| `ingest.ts` | `intake/ingest.ts` |
| `research-gaps.ts` | `intelligence/research-gaps.ts` |
| `score.ts` | `commercial/score/fit.ts` |

Move each file's `*.test.ts` alongside its subject. Create empty `action/`, `queue/`,
`reporting/` directories with `.gitkeep` so later stories have a home.

**Excluded:** Do not create `ai/` — that directory is created in a later story (formerly
POIS-206). Do not change any exported symbol name or function signature.

---

# Files Expected

The five files above, their test files, `.gitkeep` in three new directories, plus import-path
updates in:
- `src/app/tif/opportunities/actions.ts`
- `src/app/tif/opportunities/sources/page.tsx`

---

# Dependencies

None.

---

# Referenced Documents

None required beyond this story and `IMPLEMENTATION_RULES.md`.

---

# Acceptance Criteria

- [ ] `git diff` shows only file renames and import-line changes — no logic diff.
- [ ] `npm test` passes with no test content changed, only paths.
- [ ] `npm run build` passes.
- [ ] `/tif/opportunities/sources` still ingests a pasted posting (manual check).
- [ ] `ai/` directory does not exist.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

`git revert` — this is a pure file-move commit with no logic changes.

---

# Expected Diff Size

Medium (file moves show as large diffs in some tools, but line-level content changes are
zero).

---

# Estimated Time

45–60 minutes.

---

# Next Story

`POIS-002-consolidate-prisma-clients.md`
