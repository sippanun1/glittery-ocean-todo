# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Glittery Ocean** — a daily to-do list web app with a dark bioluminescent ocean aesthetic. Research and feature recommendations are in `rec_report.md`, which serves as the product spec.

## Git Workflow

Commit and push to GitHub after every meaningful unit of work — a completed component, a new feature, a config change, a bug fix. Never leave the repo in a state where local work could be lost.

**Rules:**

- Commit to `main` with a clean, descriptive message that explains _why_, not just _what_
- Always `git push origin main` after committing
- Stage specific files by name — never `git add .` or `git add -A`
- Each commit should leave the app in a working (or at minimum non-broken) state
- Co-author line on every commit: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

**Commit message format:**

```
Short imperative summary (50 chars max)

Optional body explaining context or decisions if non-obvious.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

**Remote:** https://github.com/sippanun1/glittery-ocean-todo (`origin/main`)

---

## Status

**Scaffolded and functional.** Run `npm install && npm run dev` to start.

The app is interactive: tasks can be added (with NLP parsing), completed, deleted, reordered, and moved between Kanban columns. Today/Inbox/Upcoming views, fuzzy search, and the Glittery Ocean visual theme are all working.

**MVP complete.** All 10 build steps done. 43 tests passing. Clean production build.

## Commands

```bash
npm run dev        # start dev server (Vite HMR)
npm run build      # production build → dist/
npm run preview    # preview production build locally
npm run test       # run Vitest tests
npm run test -- --watch src/utils/naturalLanguageParser.test.ts  # run single test file
npm run lint       # ESLint
npm run format     # Prettier
```

## Architecture

### Tech stack

- **Vite + React 18 + TypeScript** (strict mode) — client-only SPA, no SSR
- **TailwindCSS** with a custom `ocean` theme in `tailwind.config.ts`
- **Zustand** for all state; two stores: `taskStore` and `uiStore`
- **Framer Motion** for animations (completion burst, drag, transitions)
- **dnd-kit** for drag-and-drop (replaces abandoned react-beautiful-dnd)

### State layer

All app state lives in two Zustand stores persisted to `localStorage`:

- `src/store/taskStore.ts` — tasks array, labels; CRUD actions + `reorderTasks` + `moveToColumn`. Includes `schemaVersion: 1` and a `migrate` function — **always update both when changing the Task type**.
- `src/store/uiStore.ts` — view mode (`list | kanban | upcoming`), sidebar open state, active modal, `lastAction` (used for undo toast), search query.

Dates are stored as **UTC ISO strings** in the store and converted to local time only at the display layer via `date-fns`.

### Data model

`src/types/task.ts` is the single source of truth for the `Task` interface. The `id` field uses `nanoid()` and is UUID-compatible (no migration needed when Supabase is added in Phase 3). `columnId` drives Kanban placement (`'todo' | 'inprogress' | 'done'`), which is separate from `priority`.

### Natural language parser

`src/utils/naturalLanguageParser.ts` parses task input strings into `{ title, dueDate, priority }`. Pipeline: strip `!1`–`!4` priority tags → pass remainder to `chrono-node` for date extraction → return cleaned title. This module has Vitest tests; keep them passing when modifying the parser.

### Views vs. components

- **Views** (`src/components/views/`) are page-level: `TodayView`, `InboxView`, `UpcomingView`, `KanbanView`. They read from the store and compose task components.
- **Task components** (`src/components/task/`) are: `TaskCard` (core unit with priority glow), `TaskCardSkeleton` (shown during Zustand hydration), `TaskList` (dnd-kit SortableContext wrapper), `TaskKanban` (three droppable columns), `TaskForm`, `TaskCompletionBurst` (Framer Motion particle animation).
- **UI primitives** (`src/components/ui/`) are stateless: `Button`, `Input`, `Modal`, `Badge`, `Toast`, `UndoToast`, `OceanBackground`, `GlitterParticle`, `KeyboardHelpModal`.

### Glitter particle performance

`GlitterParticle` and `OceanBackground` must pause when `document.visibilityState === 'hidden'` (Page Visibility API). Cap particle count at 60 on mobile and 120 on desktop.

### Keyboard shortcuts

Global shortcuts (`N`, `E`, `D`, `/`, `1`–`4`, `Enter`, `Esc`, `?`) are registered in `src/hooks/useKeyboardShortcuts.ts`. The `?` key opens `KeyboardHelpModal`. Add new shortcuts there, not in individual components.

### Undo

Delete and complete actions write to `uiStore.lastAction`. `UndoToast` reads this and shows a 5-second undo button. Only one undo level is stored.

## Design tokens

Tailwind custom theme key (`tailwind.config.ts → theme.extend`):

| Class prefix    | Example                         | Purpose             |
| --------------- | ------------------------------- | ------------------- |
| `bg-ocean-*`    | `bg-ocean-bg` (`#0a0e1a`)       | Backgrounds         |
| `text-ocean-*`  | `text-ocean-accent` (`#00d4ff`) | Text colors         |
| `shadow-glow-*` | `shadow-glow-p1`                | Priority card glows |

Priority glows: P1 = red (`#ef4444`), P2 = orange (`#fb923c`), P3 = cyan (`#00d4ff`), P4 = no glow.

## Deployment

Static site on Render.com. Three config files in the repo root:

- `.node-version` → `20`
- `public/_redirects` → `/* /index.html 200`
- `render.yaml` → build config

## Testing scope

Vitest tests cover only:

1. `src/utils/naturalLanguageParser.ts` — all date patterns and `!1`–`!4` priority tag variants
2. `src/store/taskStore.ts` — CRUD operations and the `migrate` function

No UI component tests at MVP.
