# Documentation

This directory is the repository operating manual.

## Start Here

1. Read `CURRENT_STATE.md` to understand the active milestone, current work package, next work package, progress, and blockers.
2. Read `WORK_PACKAGES.md` to choose the correct implementation story.
3. Read `IMPLEMENTATION_RULES.md` and `CODEX_OPERATING_MODEL.md` before any implementation session.
4. Read exactly one story from `implementation/`.

## Canonical Entry Points

| Document | Purpose |
|---|---|
| `README.md` | Documentation index and navigation. |
| `CURRENT_STATE.md` | One-page project dashboard. |
| `WORK_PACKAGES.md` | Canonical map of work packages to implementation stories. |
| `IMPLEMENTATION_RULES.md` | Immutable implementation rules. |
| `CODEX_OPERATING_MODEL.md` | Codex execution contract. |
| `PR_CHECKLIST.md` | Merge-readiness checklist for implementation PRs. |
| `implementation/README.md` | Canonical executable story index. |
| `implementation/IMPLEMENTATION_PROMPT.md` | Implementation-session prompt. |

## Folders

| Folder | Contains | Use When |
|---|---|---|
| `architecture/` | Product architecture, data models, UX specs, scoring models, runtime models, PRDs, and target operating models. | A story references architecture, data, scoring, UX, or system behavior. |
| `decisions/` | Decision records and decision memos. | You need the rationale behind a rule, exception, or unresolved decision. |
| `implementation/` | Executable implementation stories, the story index, and the implementation prompt. | You are executing one work item. |
| `archive/` | Historical audits, drafts, retired plans, older backlogs, reports, wireframes, and superseded strategy documents. | You need historical context; archived documents do not override canonical docs. |

## Canonical Rules

- `IMPLEMENTATION_RULES.md` wins over all other implementation guidance.
- `CODEX_OPERATING_MODEL.md` governs how Codex executes a story.
- `implementation/README.md` wins over older milestone plans.
- `WORK_PACKAGES.md` maps every executable story exactly once.
- `archive/` is preserved context, not active direction.
