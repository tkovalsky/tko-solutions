## Story Metadata

Milestone:
M2

Parent Task:
POIS-206

Story:
POIS-206

Depends On:
POIS-205B

Blocks:
POIS-207A

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Medium

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Introduce a single, minimal AI client adapter that every future
AI-assisted feature depends on, with a hard guarantee that AI unavailability never breaks the
product.

**User story:** As Codex, I need a `generateStructured<T>()` adapter using raw `fetch` — no new
SDK — that honors the already-declared environment variables and never throws, so that features
built on top of it (POIS-207 and beyond) degrade gracefully instead of crashing.

**Commercial outcome:** Unblocks all AI-assisted features in this milestone while protecting the
product from any AI outage, timeout, or misconfiguration — a visible AI-status indicator lets
Todd see the adapter's state at a glance.

---

# Scope

**Included:**
- `ai/client.ts` implementing `generateStructured<T>()` via raw `fetch`, with no new SDK
  dependency, honoring the already-declared environment variables (e.g. `ANTHROPIC_API_KEY`).
- Guaranteed non-throwing behavior: on any failure the function returns
  `{ status: "unavailable", reason }` rather than throwing.
- On success, returns `{ status: "ok", ... }` including the model and prompt version used.
- A small AI-status indicator surfaced in the shell, reflecting the adapter's current
  availability.
- This story creates the `ai/` directory for the first time (explicitly deferred from
  POIS-001).

**Excluded:**
- No prompt content or feature logic (POIS-207 and later stories own that).
- No new npm dependency — `package.json` must be unchanged.

---

# Files Expected

- `ai/client.ts`
- Shell AI-status indicator component (path determined during implementation)
- Corresponding tests covering every failure mode

---

# Dependencies

`POIS-205B-executive-brief-page.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` or architecture doc section defining the already-declared AI environment
  variables (whichever document names them — determined during implementation).

---

# Acceptance Criteria

- [ ] Missing API key returns `{ status: "unavailable", reason }`.
- [ ] A request timeout returns `{ status: "unavailable", reason }`.
- [ ] A non-2xx response returns `{ status: "unavailable", reason }`.
- [ ] A malformed JSON response returns `{ status: "unavailable", reason }`.
- [ ] A schema mismatch returns `{ status: "unavailable", reason }`.
- [ ] The adapter never throws across all of the above cases — covered by an explicit test.
- [ ] A successful call returns `{ status: "ok" }` including model and prompt version.
- [ ] `package.json` is unchanged (no new SDK dependency).
- [ ] The shell displays an AI-status indicator reflecting adapter availability.

---

# Validation

```
npm test -- ai/client
```

---

# Rollback

Unset `ANTHROPIC_API_KEY`; the adapter degrades to `unavailable` by design. To fully revert,
delete `ai/client.ts` and the shell status indicator.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-207A-initiative-narrative-generation.md`
