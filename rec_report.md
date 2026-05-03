# To-Do List Website — Research & Recommendation Report

> **Project:** Glittery Ocean Daily To-Do  
> **Date:** 2026-05-03  
> **Purpose:** Inform the design and feature decisions for a new daily to-do list website by analyzing the competitive landscape, extracting user insights, and defining a clear product direction.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Competitive Analysis](#2-competitive-analysis)
3. [UI/UX Trend Analysis (2024–2025)](#3-uiux-trend-analysis-20242025)
4. [User Pain Points](#4-user-pain-points)
5. [What Users Love Most](#5-what-users-love-most)
6. [Feature Recommendations](#6-feature-recommendations)
7. [Design System Recommendations](#7-design-system-recommendations)
8. [Technology Stack Recommendations](#8-technology-stack-recommendations)

---

## 1. Executive Summary

The to-do list app market is crowded but polarized. At one end, **Google Tasks** and **Microsoft To Do** are clean and fast but too shallow for anyone who manages more than a handful of tasks. At the other end, **Notion** and **TickTick** offer powerful feature sets that overwhelm most users and create steep learning curves. The middle ground — beautiful, capable, and fast without being overwhelming — is where the biggest opportunity sits.

**Todoist** comes closest to owning that middle ground (47 million users), but its premium tier is expensive and essential features sit behind a paywall. **Things 3** nails the design and UX but is Apple-only with no collaboration. **TickTick** has the richest features but suffers from mobile/desktop parity issues and an increasingly complex UI.

**Positioning recommendation:** Build a web-first to-do app that feels as polished as Things 3, as capable as TickTick's core features, and as fast to start as Google Tasks — all completely free at MVP, with no paywalls on essential functionality.

The **Glittery Ocean** theme is a deliberate differentiator. Most to-do apps use flat whites and grays. A deep, dark, bioluminescent ocean aesthetic with glow effects and shimmer animations creates an emotional connection and makes the mundane act of managing tasks feel satisfying and even beautiful. User research shows 82% of users prefer dark mode, and distinctive visual design (as evidenced by Things 3's two Apple Design Awards) directly drives daily adoption.

---

## 2. Competitive Analysis

### 2.1 Feature Comparison Table

| Feature | Todoist | TickTick | Any.do | MS To Do | Notion | Google Tasks | Things 3 |
|---------|---------|----------|--------|----------|--------|--------------|----------|
| **Price model** | Freemium | Freemium | Freemium | Free (MS) | Freemium | Free | One-time $19.99 |
| **Natural language input** | ✅ Excellent | ⚠️ Basic | ❌ | ❌ | ❌ | ❌ | ⚠️ Basic |
| **List view** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Kanban board** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Calendar view** | ✅ Pro | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| **Priority levels** | 4 levels | 3 levels | ⚠️ Basic | ⚠️ Basic | Custom | ❌ | Stars |
| **Subtasks** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Recurring tasks** | ✅ Advanced | ✅ Best-in-class | ✅ Basic | ✅ Basic | ⚠️ Via automation | ✅ Basic | ✅ |
| **Dark mode** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Pomodoro timer** | ❌ | ✅ Built-in | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Habit tracking** | ❌ | ✅ Built-in | ⚠️ Streaks | ❌ | ❌ | ❌ | ⚠️ Basic |
| **Calendar sync** | ✅ Two-way | ✅ Two-way | ✅ | ✅ Outlook | ❌ | ✅ Google | ❌ |
| **Fuzzy search** | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ | ✅ |
| **Drag & drop** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Keyboard shortcuts** | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ❌ | ✅ Excellent |
| **Offline support** | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| **Mobile app** | ✅ Excellent | ⚠️ Weaker | ✅ Strong | ✅ | ⚠️ | ✅ | ✅ |
| **Team collaboration** | ✅ | ⚠️ Basic | ⚠️ Basic | ✅ | ✅ Excellent | ❌ | ❌ |
| **AI features** | ✅ 2024 | ❌ | ❌ | 🔜 Copilot | ✅ | ❌ | ❌ |
| **Free tier quality** | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited | ✅ Full | ⚠️ | ✅ Full | N/A |

---

### 2.2 App Profiles

#### Todoist
**Strengths:** Best natural language input in the market ("buy groceries every Friday at 6pm" just works). 70+ integrations, excellent cross-platform sync, 47 million users, smart AI scheduling launched in 2024 that learns task patterns. Team Workspaces feature adopted by 100,000+ teams in its first year.

**Weaknesses:** Premium tier is expensive and many users feel essential features are paywalled. The free plan limits active projects to 5, which is too restrictive for real daily use.

**Key lesson to borrow:** Natural language parsing dramatically reduces task entry friction. Invest in a good parser (chrono-node) even at MVP.

**Key lesson to avoid:** Don't paywall core features. If a user can't trust the free tier, they'll leave before they fall in love with the app.

---

#### TickTick
**Strengths:** Most advanced recurring task system of any app (skip weekends, last day of month, completion-based recurrence). Built-in Pomodoro timer and habit tracking eliminate the need for separate apps. 25+ themes, Eisenhower Matrix view, Timeline/Gantt view. Excellent calendar sync.

**Weaknesses:** The mobile app trails the desktop version significantly — features feel bolted on rather than designed for touch. The learning curve is steep: there are too many ways to do the same thing. Reported billing/cancellation issues damage trust. Task ordering bugs crop up occasionally.

**Key lesson to borrow:** Bundle Pomodoro + habit tracking — users genuinely use both and appreciate not needing a separate app. Recurring task patterns need real depth.

**Key lesson to avoid:** Don't let mobile become an afterthought. Design mobile-first from day one.

---

#### Any.do
**Strengths:** Friendliest UI of the major players. Location-based reminders (geofencing) are unique and genuinely useful. Clean dashboard combining tasks and calendar events. Gamification with streaks and task completion rewards drives daily use.

**Weaknesses:** Too shallow for power users. Reported data loss issues damage trust severely. Limited task organization makes large task lists unwieldy. Free version is heavily restricted.

**Key lesson to borrow:** Location-aware reminders are a Phase 3 differentiator worth noting. Gamification (streaks, rewards) measurably increases daily use.

**Key lesson to avoid:** Data integrity is non-negotiable. localStorage with schema versioning is better than a flaky sync.

---

#### Microsoft To Do
**Strengths:** Best choice for Microsoft 365 organizations — deep Outlook and Teams integration is seamless. Simple UI with almost no learning curve. Suggested tasks pulled from Outlook emails is genuinely clever.

**Weaknesses:** Nearly useless as a standalone app outside the Microsoft ecosystem. Limited for complex workflows. Being absorbed into Microsoft Planner signals uncertain product direction.

**Key lesson to borrow:** Suggested tasks from external context (emails, documents) is a compelling Phase 3 AI feature.

**Key lesson to avoid:** Deep ecosystem lock-in alienates users. Build for the open web.

---

#### Notion
**Strengths:** Ultimate flexibility — anything can be a database. Multiple views (table, kanban, calendar, timeline, gallery). Real-time collaboration is class-leading. Template marketplace reduces setup time.

**Weaknesses:** Overwhelming for simple use cases. Setup time is often longer than the benefit for daily task management. Cumbersome for quickly checking what to do today. Can be slow and resource-intensive.

**Key lesson to borrow:** Multiple view types (list, kanban, calendar) are genuinely useful and users switch between them based on context.

**Key lesson to avoid:** Don't make users configure their workflow before they can use the app. Sensible defaults are more valuable than infinite flexibility.

---

#### Google Tasks
**Strengths:** The purest minimalist to-do experience. 2024 redesign with card-based interface looks excellent. Deep Gmail and Google Calendar integration (drag tasks onto calendar to block time is a 2025 feature). Completely free. Offline support is solid.

**Weaknesses:** Too limited for anyone managing more than simple personal tasks. No labels, no priorities, no recurring patterns beyond basic. No integrations beyond Google. No collaboration.

**Key lesson to borrow:** The card-based redesign is the right direction — clean visual separation between tasks. The drag-to-calendar-block feature is a must-have for Phase 3.

**Key lesson to avoid:** Don't be so minimal that power users immediately outgrow the app. The first week should feel simple; month two should reveal depth.

---

#### Things 3
**Strengths:** Two Apple Design Awards — the design polish is genuinely exceptional and drives daily adoption. Scheduling dates (when you plan to work on it) separate from due dates (when it's actually due) is an underappreciated distinction. GTD methodology baked in without forcing it on users. Email forwarding directly into the app. Excellent keyboard shortcuts.

**Weaknesses:** Apple ecosystem only — no web app, no Windows, no Android. No collaboration whatsoever. Premium pricing as a one-time purchase. Limited integrations.

**Key lesson to borrow:** Design quality is a feature. The separation of "scheduled date" vs "due date" is worth implementing — it maps to how people actually think ("I'll work on this Tuesday, but it's due Friday"). Keyboard shortcuts with a `?` help modal significantly improves power-user adoption.

**Key lesson to avoid:** Don't box the app into a single platform or methodology. Web-first ensures accessibility everywhere.

---

## 3. UI/UX Trend Analysis (2024–2025)

### 3.1 Dark Mode as Baseline Standard
82% of users prefer dark mode (2024 survey). This is no longer an optional feature — it is expected by default. Well-implemented dark mode uses deep grays (`#121212`, `#0a0e1a`) rather than pure black, maintains a minimum 4.5:1 contrast ratio for accessibility, and leverages neon highlights and glass-like translucent surfaces rather than flat fills.

**Implication:** The Glittery Ocean app should launch in dark mode as the default and only state for MVP. This aligns with user preference and makes the glitter/glow effects dramatically more impactful than they would be on a white background.

### 3.2 Minimalist Utility Philosophy
The defining 2025 trend is "less, but better." Users are leaving feature-rich apps that feel overwhelming and moving toward focused tools that do fewer things exceptionally well. Progressive disclosure — showing only what's needed now and revealing depth when requested — is the winning UX pattern.

**Implication:** At first launch, show only: task input, a task list, and due date. Priority, labels, subtasks, and recurring options should appear in a secondary panel on click, not on the main card.

### 3.3 Card-Based Interfaces
Google Tasks, Notion, and others have converged on task cards with clear visual separation and hover states. Cards allow priority glow effects, drag handles, and completion animations in a way that plain list items cannot. Floating Action Buttons (FAB) are replacing traditional bottom navigation bars for primary actions.

**Implication:** Each task is a card. Priority level drives a colored glow on the card border. The "add task" action is a FAB in the lower-right (mobile) or an inline input at the top of the list (desktop).

### 3.4 AI-Assisted Scheduling
Todoist's AI assistant (2024) learns patterns across 47 million users to suggest when to schedule tasks and identify blockers. Microsoft is integrating Copilot into To Do and Planner. This is the emerging frontier, not the current standard.

**Implication:** Phase 3 feature. Not needed for MVP but the data model should accommodate it — storing task creation time, completion time, and priority helps train future suggestions.

### 3.5 Gamification
Apps with gamification see 20–30% higher daily engagement. Streaks (Todoist productivity streaks, Any.do task completion rewards, Habitica's full RPG system) and milestone rewards are the most effective patterns. The key is implementation quality — gamification that feels gimmicky backfires. It should feel like a natural extension of progress.

**Implication:** Phase 2 — habit tracking with streaks and an XP system for completing tasks. At MVP, the completion burst animation (glitter particles) is the gamification seed: it makes checking off a task physically satisfying.

### 3.6 Focus and Deep Work Integration
TickTick's built-in Pomodoro timer is its most-praised unique feature. Google Tasks' calendar-blocking (2025) and Forest's focus sessions represent users' desire to manage their time, not just their tasks. Do-not-disturb integration and focus modes are becoming standard.

**Implication:** Phase 2 — Pomodoro timer on the task card. At MVP, keyboard shortcuts and a distraction-free full-screen view provide a foundation for focus features.

---

## 4. User Pain Points

These are the most frequently cited complaints across reviews, Reddit (r/productivity, r/todoist, r/TickTick), Product Hunt, and app store reviews:

### 4.1 Feature Bloat and Cognitive Overload
The most universal complaint. Users open an app expecting to quickly capture a task and instead face a modal with 12 fields. "I spent 20 minutes setting up my workspace and then never used it" is a common story for Notion in particular. Too many ways to accomplish the same task creates decision paralysis.

### 4.2 Essential Features Behind a Paywall
Todoist limits free users to 5 active projects. TickTick puts calendar view behind premium. Any.do restricts recurring tasks on free. This pattern infuriates users who feel they were shown a great product and then had it taken away. App store reviews frequently cite this as the reason for a 1-star rating from otherwise satisfied users.

### 4.3 Mobile/Desktop Parity Gaps
TickTick's mobile app notably lacks features available on desktop. Any.do's data loss incidents happen almost exclusively on mobile sync. Users who capture tasks on their phone and review them on desktop expect a seamless experience.

### 4.4 Unreliable Sync
Any.do has multiple reports of tasks silently disappearing after sync errors. TickTick has recurring reminder sync issues to mobile. For a task management app, data loss is an existential trust failure — users immediately leave and rarely return.

### 4.5 Steep Learning Curve
Notion requires significant upfront configuration before it's usable for daily tasks. TickTick's deep feature set means new users often don't discover key functionality. The apps that score highest on user retention are those where a new user can add their first task in under 10 seconds with zero instruction.

### 4.6 Buggy Drag-and-Drop Ordering
TickTick has reported issues with task order resetting unexpectedly. Drag-and-drop is a feature that users rely on implicitly — when it fails, it erodes trust in the entire app.

### 4.7 Poor Empty States
A common small-but-significant complaint: apps that show nothing or show a confusing blank screen when a view has no tasks. Empty states are opportunities to reinforce the app's personality and guide new users.

### 4.8 No Undo
Accidentally deleting a task or marking it complete by mistake has no recovery path in most apps. This frustrates users disproportionately to the actual occurrence rate.

---

## 5. What Users Love Most

Across positive reviews, the features that drive genuine advocacy (not just satisfaction):

### 5.1 Quick Capture
The ability to add a task in under 3 seconds from anywhere in the app. Things 3's `Ctrl + Space` global shortcut, Todoist's natural language parser, and Google Tasks' FAB all optimize for this. Users mention this repeatedly as the reason they stick with a particular app.

### 5.2 Satisfying Completion Animations
Checking off a task should feel good. Apps that have a visible, slightly celebratory completion animation (Todoist's subtle strikethrough with a satisfying check sound, Forest's tree growing) create positive reinforcement that makes users actually come back. Things 3's completion animation is frequently praised.

### 5.3 Cross-Device Consistency
"It works identically on my phone and my laptop" is a genuine compliment users give to Todoist and Things 3. When a user adds a task on their phone during a meeting and it appears exactly as expected on their desktop five minutes later, trust is built.

### 5.4 Smart Recurring Tasks
TickTick's recurring task system — "every weekday", "the last Friday of the month", "2 days after completion" — is cited by power users as the sole reason they pay for premium. Recurring tasks represent a significant portion of actual daily tasks (morning routines, weekly reviews, bill payments).

### 5.5 Beautiful Design That Motivates
Things 3's award-winning design is frequently credited with making users more productive because they enjoy opening the app. Notion's visual flexibility allows users to create workspaces that feel personal. The emotional response to a well-designed tool is not superficial — it drives the daily habit of actually using it.

### 5.6 Keyboard Shortcut Depth
Power users love apps that let them operate entirely without the mouse. Things 3 and Todoist both have extensive keyboard shortcut systems. A `?` modal that shows all shortcuts is a much-appreciated feature that signals the app was built for people who take productivity seriously.

### 5.7 Built-in Pomodoro
TickTick's most-praised unique feature. "I deleted three other apps when I found out TickTick had a Pomodoro timer built in" is a representative comment. Reducing app-switching friction is a genuine productivity gain.

### 5.8 Ocean/Nature Themes
TickTick and Forest both offer nature-themed visuals, and they consistently receive positive comments. Users spending hours per day in a task app benefit from visuals that feel calming rather than clinical.

---

## 6. Feature Recommendations

### 6.1 MVP (Build First)

These features are required for a usable daily driver. A user should be able to complete their entire daily workflow with only these features.

| Feature | Why It's MVP | Key Detail |
|---------|--------------|------------|
| Task creation with natural language | Reduces entry friction to near zero | Use chrono-node; strip `!1–!4` priority tags first |
| Four priority levels (P1–P4) | Users need a quick way to signal urgency | Color-coded: red / orange / cyan / grey with glow effect |
| Due dates and times | Core to daily task management | Store as UTC ISO strings; display in local time |
| Today / Inbox / Upcoming views | The three mental modes of task review | Today = due today + overdue; Upcoming = next 7 days |
| List view | Primary task review mode | Drag-and-drop ordering via dnd-kit |
| Kanban board view | Status-based workflow (Inbox → In Progress → Done) | Status is separate from priority |
| Drag-and-drop ordering | Users expect to manually sequence their day | dnd-kit; persist order in store |
| LocalStorage persistence | App is useless without persistence | Zustand persist with schemaVersion: 1 |
| Keyboard shortcuts | Dramatically improves power-user adoption | N, E, D, /, 1–4, Enter, Esc, ? |
| Task completion animation | The emotional payoff of finishing a task | Framer Motion particle burst (glitter) |
| Ocean-themed empty states | Prevents confusion; reinforces brand | Unique copy per view |
| Undo for delete / complete | Recovers from accidents, builds trust | 5-second toast in uiStore |
| TaskCardSkeleton | Prevents hydration flicker on load | Shows before Zustand rehydrates |
| ErrorBoundary | Graceful failure | Friendly ocean-themed reload screen |
| Fuzzy search | Essential once the list grows | fuse.js on title + notes |
| Dark mode (default) | 82% user preference; aesthetic requirement | Only mode needed for MVP |

### 6.2 Phase 2 (After MVP Validation)

| Feature | Rationale |
|---------|-----------|
| Labels / tags | Power users categorize across projects |
| Subtasks | Complex tasks need decomposition |
| Recurring tasks | Daily/weekly routines are a huge use case |
| Pomodoro timer (built-in) | Eliminates app-switching; TickTick's #1 praised feature |
| Habit tracking with streaks | 20–30% higher engagement with gamification |
| XP / reward system | Reinforces completion habit |
| Scheduled date vs. due date | Things 3's underappreciated distinction |
| Task notes / description field | Power users annotate tasks |
| Eisenhower Matrix view | Urgency/importance quadrant popular with GTD users |

### 6.3 Phase 3 (Scaling and Ecosystem)

| Feature | Rationale |
|---------|-----------|
| Google Calendar two-way sync | Expected by power users; drag-to-block is differentiating |
| Cloud sync / user accounts (Supabase) | Multi-device sync beyond a single browser |
| AI scheduling suggestions | Todoist's 2024 launch validated strong user interest |
| Collaboration / shared lists | Required for team and household use cases |
| Location-based reminders | Any.do differentiator; emerging trend |
| Email forwarding to inbox | Things 3's killer feature |
| Mobile app (PWA first) | Progressive Web App before native |

---

## 7. Design System Recommendations

### 7.1 Glittery Ocean Color Palette

The ocean at depth is not blue — it is almost black, with bioluminescent creatures producing their own light. This is the visual metaphor: a dark, immersive environment where each task glows with its own energy.

| Token | Hex | Usage |
|-------|-----|-------|
| `ocean.bg` | `#0a0e1a` | Page background (deepest ocean) |
| `ocean.surface` | `#0d1b2a` | Task cards, sidebar panels |
| `ocean.elevated` | `#112240` | Modals, dropdowns, tooltips |
| `ocean.border` | `#1e3a5f` | Subtle dividers and card borders |
| `ocean.accent` | `#00d4ff` | Primary CTA, P3 glow, links |
| `ocean.violet` | `#7b2fff` | Secondary accent, hover states |
| `ocean.gold` | `#ffd700` | Glitter particles, gold stars |
| `ocean.silver` | `#c0c0ff` | Secondary glitter particles |
| `ocean.seafoam` | `#00e5a0` | Success, completion checkmarks |
| `ocean.amber` | `#ffb347` | Warnings, overdue indicators |
| `ocean.p1` | `#ef4444` | Priority 1 (urgent red) |
| `ocean.p2` | `#fb923c` | Priority 2 (high orange) |
| `ocean.p3` | `#00d4ff` | Priority 3 (medium cyan) |
| `ocean.p4` | `#475569` | Priority 4 (low grey) |
| `ocean.textPrimary` | `#e8f4fd` | Headings, task titles |
| `ocean.textMuted` | `#8bacd1` | Secondary text, metadata |
| `ocean.textDisabled` | `#3d5a7a` | Placeholder text, disabled states |

### 7.2 Priority Glow Effects (Tailwind custom shadows)

```
glow-p1: 0 0 16px rgba(239, 68, 68, 0.4)   — red for P1
glow-p2: 0 0 16px rgba(251, 146, 60, 0.4)   — orange for P2
glow-p3: 0 0 12px rgba(0, 212, 255, 0.3)    — cyan for P3
glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3)  — general accent glow
glow-violet: 0 0 20px rgba(123, 47, 255, 0.3) — hover glow
```

### 7.3 Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| App name / hero | `Plus Jakarta Sans` | 32–48px | 700 |
| View headings | `Plus Jakarta Sans` | 20–24px | 600 |
| Task titles | `Inter` | 15–16px | 500 |
| Body / notes | `Inter` | 14px | 400 |
| Metadata (dates, tags) | `Inter` | 12–13px | 400 |
| Times / durations | `JetBrains Mono` | 13px | 400 |

**Type scale (px):** 12 / 13 / 14 / 15 / 16 / 20 / 24 / 32 / 48

### 7.4 Spacing

**Base unit:** 4px. All spacing is a multiple of 4.

**Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px

**Key application points:**
- Task card padding: `16px` (inner), `8px` (gap between cards)
- Sidebar padding: `12px` (items), `24px` (section headings)
- Modal padding: `24px`
- FAB from edge: `24px`

### 7.5 Border Radius

| Element | Radius |
|---------|--------|
| Task cards | `12px` |
| Modals | `16px` |
| Buttons | `8px` |
| Input fields | `8px` |
| Tags / badges / pills | `9999px` |
| Priority indicator dot | `50%` |

### 7.6 Animation Philosophy

The animations should feel like water: fluid, with natural momentum, never jarring or mechanical.

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Task card entrance | Fade + slide up 8px | 200ms | `ease-out` |
| Task completion | Strikethrough + opacity to 0.5 | 300ms | `ease-in-out` |
| Glitter burst on complete | 12–16 particles radiate outward | 600ms | `spring` (stiffness 200, damping 15) |
| Card drag | Scale to 1.04 + glow increase | 150ms | `ease-out` |
| Modal open | Fade + scale from 0.95 | 200ms | `ease-out` |
| Sidebar collapse | Width transition | 250ms | `ease-in-out` |
| Ambient background | Slow gradient pulse | 8s loop | `ease-in-out` |
| Glitter particles (ambient) | Random opacity + scale flicker | 3s loop, staggered | `ease-in-out` |

**Performance notes:**
- Cap glitter particles at 60 on mobile, 120 on desktop
- Pause ambient animations when `document.visibilityState === 'hidden'` (Page Visibility API)
- Use `will-change: transform` sparingly — only on actively animated drag targets
- Prefer CSS animations over JS for looping ambient effects

### 7.7 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Bottom navigation bar; full-width task list; FAB |
| Tablet | 640–1024px | Icon-only collapsed sidebar (40px); hidden labels |
| Desktop | > 1024px | Full sidebar (240px) with labels, filters, and counts |

### 7.8 Empty State Copy

| View | Headline | Subtext |
|------|----------|---------|
| Inbox | "Drop your first task here" | "Everything starts as an idea. Capture it." |
| Today | "Nothing due — enjoy the ocean" | "You're all caught up. Take a breath." |
| Upcoming | "Clear skies ahead" | "No tasks on the horizon. Plan something great." |
| Search | "No results found" | "Try a different word or check your spelling." |

---

## 8. Technology Stack Recommendations

### 8.1 Frontend Framework

**Recommended: Vite + React 18 + TypeScript**

Rationale: This is a client-only SPA (single-page app) at MVP — there are no SSR requirements, no API routes, and no SEO needs. Next.js adds significant complexity (server components, hydration mismatch debugging, routing conventions) without any benefit at this stage. Vite's HMR (Hot Module Replacement) is nearly instantaneous and makes development significantly faster than Create React App.

TypeScript strict mode catches an entire class of bugs at compile time, particularly around the Task data model (null dates, optional fields) and store updates.

### 8.2 Styling

**Recommended: TailwindCSS v3 with custom theme**

The Glittery Ocean design tokens are configured once in `tailwind.config.ts` and then available as utility classes everywhere (`bg-ocean-bg`, `text-ocean-accent`, `shadow-glow-p1`). This approach is dramatically faster than CSS Modules for a component-heavy app and avoids the runtime cost of styled-components or Emotion.

Custom Tailwind keyframe animations (`shimmer`, `oceanBreathe`, `float`) replace hand-written CSS files.

### 8.3 State Management

**Recommended: Zustand with `persist` middleware**

Zustand is the sweet spot for a to-do app's complexity. Redux requires too much boilerplate. React Context causes too many re-renders on frequent task updates (every keystroke, every drag event). Zustand's `persist` middleware serializes the store to localStorage automatically, and the `migrate` option allows schema upgrades when the Task interface changes.

**Critical:** include `schemaVersion: 1` from day one. When Phase 2 adds subtasks or Phase 3 adds cloud sync IDs, `migrate` handles the data transformation without breaking existing users' stored tasks.

**Important:** Store all dates as UTC ISO strings (`task.dueDate: string | null`). Convert to local time only at the display layer using `date-fns` formatters. This prevents timezone bugs when the same localStorage data is read on a device in a different timezone.

### 8.4 Date Parsing

**Recommended: chrono-node**

`chrono-node` handles natural language date parsing out of the box: "tomorrow at 3pm", "next Friday", "in 2 hours", "the 15th", "every Monday". The natural language parser should:
1. Strip priority tags (`!1`, `!2`, `!3`, `!4`) from the input first
2. Pass the remainder to chrono-node
3. Return a `{ title: string, dueDate: Date | null, priority: Priority }` object

A regex-only approach would require significant maintenance to match chrono-node's coverage.

### 8.5 Drag and Drop

**Recommended: `@dnd-kit/core` + `@dnd-kit/sortable`**

`react-beautiful-dnd` is unmaintained since 2022 and has open performance bugs. `@dnd-kit` is the modern replacement — actively maintained, better TypeScript support, works correctly with React 18's concurrent features, and supports virtual lists for large task counts.

### 8.6 Animation

**Recommended: Framer Motion**

The glitter particle burst on task completion and the spring-physics drag behavior are the two most visually distinctive features of the app. Framer Motion's `AnimatePresence`, `motion.div`, and `useSpring` handle these with minimal code. The `layout` prop handles automatic list reorder animations when tasks are added, completed, or dragged.

### 8.7 Search

**Recommended: fuse.js inside `useTasks.ts`**

Fuse.js provides fuzzy search on task titles and notes with no backend required. The search hook should debounce input (150ms) and search across `title` and `description` fields. When the search query is empty, return all tasks in the current view's sort order.

### 8.8 Testing

**Recommended: Vitest + Testing Library (limited scope)**

At MVP, only two modules need tests:
- `src/utils/naturalLanguageParser.ts` — input/output contract must be reliable; test all date patterns and priority tag variants
- `src/store/taskStore.ts` — test CRUD operations and the `migrate` function for schema upgrades

UI component tests add maintenance burden without proportional benefit at this stage. Test the parser and the data layer; test the UI by using it.

### 8.9 Full Dependency List

```
dependencies:
  react, react-dom              React 18
  framer-motion                 Animations
  @dnd-kit/core                 Drag and drop
  @dnd-kit/sortable             Sortable list/board
  zustand                       State management
  chrono-node                   Natural language date parsing
  date-fns                      Date formatting and calculations
  fuse.js                       Fuzzy search
  lucide-react                  Icons
  nanoid                        UUID-compatible ID generation
  clsx                          Conditional class names utility

devDependencies:
  vite, @vitejs/plugin-react    Build tooling
  typescript                    TypeScript compiler
  tailwindcss, autoprefixer     Styling
  eslint, prettier              Linting and formatting
  lint-staged, husky            Pre-commit hooks
  vitest, @testing-library/react  Testing
```

### 8.10 Deployment

**Recommended: Render.com (static site)**

Three files configure a complete deployment:

| File | Content |
|------|---------|
| `.node-version` | `20` |
| `public/_redirects` | `/* /index.html 200` |
| `render.yaml` | Build command: `npm run build`; output: `dist` |

Build command: `npm run build`  
Output directory: `dist`  
Environment variables: none required for MVP

---

*End of Report*

---

> **Next step:** Begin website implementation using this report as the product specification. Start with project scaffolding, then implement the Zustand store and TypeScript types, then build components from primitives up to complete views.
