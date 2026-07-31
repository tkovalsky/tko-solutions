## Story Metadata

Milestone:
M1

Parent Task:
POIS-101

Story:
POIS-101A

Depends On:
POIS-009C

Blocks:
POIS-101B

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

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

**Business objective:** Give the Opportunity Intelligence System a real, navigable home before any
capture logic exists, so every later M1 route has a shell to hang off instead of each inventing
its own layout.

**User story:** As Todd, when I go to `/tif/oi`, I land on a real page with working navigation
(Today / Intake / Pipeline / Accounts), an Oct-1 countdown, and badge counts — even though most of
those sections are still placeholders.

**Commercial outcome:** None directly — this is the scaffold the rest of Milestone 1 depends on.
No opportunity intelligence is captured yet.

---

# Scope

**Included:**
- `src/app/tif/oi/layout.tsx` — the shared shell: top-level nav with four items (Today, Intake,
  Pipeline, Accounts), an Oct-1 countdown, and badge counts sourced from one aggregate query.
- `src/app/tif/oi/page.tsx` — `redirect("/tif/oi/today")`, nothing else.
- `src/app/tif/oi/today/page.tsx` — a placeholder page with the text "Today arrives in
  POIS-110". No queue logic, no cards.
- Standard M1 route preconditions apply: `robots: noindex`, `export const dynamic =
  "force-dynamic"`.

**Excluded:**
- No intake form, no capture logic, no extraction (POIS-101B/101C).
- No real Today dashboard content — the placeholder text is the entire page body
  (POIS-110C replaces it).
- No Pipeline or Accounts page content beyond what the nav needs to link to (those routes are
  built in POIS-107 and later; if they don't exist yet, the nav links may 404 until then — that's
  acceptable at this checkpoint).
- No badge-count business logic beyond one aggregate query wired into the shell.

---

# Files Expected

- `src/app/tif/oi/layout.tsx`
- `src/app/tif/oi/page.tsx`
- `src/app/tif/oi/today/page.tsx`

---

# Dependencies

`POIS-009C-seed-playbooks.md`

---

# Referenced Documents

- None required beyond this story file — the nav items, countdown, and badge-count concept are
  fully specified above. If a UX reference document exists for the nav shell, it is not required
  reading for this checkpoint.

---

# Acceptance Criteria

- [ ] Visiting `/tif/oi` redirects to `/tif/oi/today`.
- [ ] The shell renders a nav with four items: Today, Intake, Pipeline, Accounts.
- [ ] The nav displays an Oct-1 countdown and badge counts sourced from a single aggregate query
      (no per-item queries).
- [ ] `/tif/oi/today` renders the placeholder text "Today arrives in POIS-110" and nothing else.
- [ ] All new routes set `robots: noindex` and `export const dynamic = "force-dynamic"`.
- [ ] This is real, user-visible UI — Todd can navigate to `/tif/oi` today and see it working,
      even though most linked sections are not yet built.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Delete `src/app/tif/oi/layout.tsx`, `src/app/tif/oi/page.tsx`, and
`src/app/tif/oi/today/page.tsx`. No data was created; rollback is a pure file deletion.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-101B-intake-capture-form.md`
