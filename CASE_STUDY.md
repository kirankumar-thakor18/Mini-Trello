# Mini-Trello — UX Case Study

> A focused Kanban board that helps students and small teams see *what's next* at a glance — designed and built end to end.

**Role:** UI/UX Design + Frontend Development
**Type:** Solo full-stack mini project
**Timeline:** 3 Agile sprints 
**Tools:** Figma · HTML5 · CSS3 · JavaScript · Node.js · Express · MongoDB Atlas

**Live demo:** https://mini-trello-fagf.onrender.com

---

## TL;DR

Mini-Trello is a lightweight Kanban board built for people who find Trello and Jira too heavy for everyday tasks. I designed a three-column board around task *state*, added drag & drop plus keyboard-friendly move buttons, and shipped it as a working full-stack app with a real API and cloud database.

| Item | Summary |
| --- | --- |
| **Problem** | Existing task tools are either too complex or too limited for quick personal/team planning |
| **Solution** | A single-screen Kanban board with three clear states and low-friction task actions |
| **My role** | Research, information architecture, interaction design, visual design, frontend build |
| **Outcome** | Live, deployed product, iterated through self-testing on desktop and mobile and peer feedback |

---

## 1. Context & Problem

Most task tools sit at one of two extremes:

- **Too heavy:** Trello, Jira, Asana — powerful, but full of boards, members, power-ups, and settings that get in the way of a simple plan.
- **Too limited:** a plain to-do list — quick to use, but gives no sense of *where* work stands.

People juggling coursework, freelance work, or a small sprint mostly need one question answered fast: **"What's in progress, and what's stuck?"**

### Problem statement

> Students and small teams need a visual way to track tasks across stages without the setup and clutter of a full project-management tool.

---

## 2. Goals & Success Metrics

**Design goals**
- Understand the board within a few seconds, with no onboarding.
- Move a task through its lifecycle in one clear action.
- Stay usable on mobile as well as desktop.

**What success looks like**
- A new user can create and move a task without instructions.
- Priority and urgency are readable from colour and layout alone.
- The layout holds up on small screens without hiding core actions.

**Success check:** create and move a task in under ~10 seconds, with no explanation needed.

---

## 3. Users

These are working personas based on the target audience.

### Primary persona
**Aarav, 21 — final-year student.** Juggles assignments across five subjects plus a capstone project. Wants a quick visual overview between classes so nothing slips. Gets frustrated by tools that need setup before they become useful, so most tasks currently live in his head or in scattered notes.

### Secondary persona
**Meera, 24 — freelance team member.** Works in a four-person team and needs a shared view of what's in progress and what's blocked before a stand-up. Dislikes heavy project-management tools with too many boards and settings.

---

## 4. Research

**Approach:** a lightweight competitive review of how Trello, Asana, and simple to-do apps handle task state, plus a heuristic self-review of the main flows.

Questions I explored:
- How do people currently track small tasks?
- What makes them abandon a tool?
- Which task details matter most day to day (title, priority, due date)?

Key takeaways:
1. Most tools hide state behind boards and lists; a **fixed three-column board** makes status instantly scannable.
2. Heavy tools front-load setup (workspaces, members, power-ups). **No onboarding** is the real differentiator for small work.
3. Daily-relevant metadata is small: **title, priority, due date**. Everything else adds noise.

> If real interviews are available, replace this section with those findings — that is the strongest version for a portfolio.

---

## 5. Information Architecture

Work is organised by **state, not by list**. Every task lives in exactly one column:

```
To Do  →  In Progress  →  Done
```

This reduces the mental model to a single question: *where is this task right now?* Column counts and a progress bar surface the overall picture without opening anything.

> **Design files:** [Figma-ready kit](design/README.md) &nbsp;·&nbsp; Figma file: [`add your link`](#) — or embed an IA / flow diagram here.

---

## 6. Wireframes

I sketched the board as three equal columns with a slim top bar (brand, search, filter, new task) and a stats strip above the board, then a centred modal for create/edit.

Two things changed between sketch and build:
- Edit/delete started as a hidden dropdown on each card; it became **two visible icon buttons** because hidden actions slowed down the most common task.
- The **stats panel moved above the board** after testing showed people scan totals before individual cards.

> Add early sketches or low-fidelity frames here — visible process is what reviewers reward.

---

## 7. Key Design Decisions

| Decision | Why |
| --- | --- |
| **Three fixed columns** | Keeps the board scannable and avoids the "too many lists" problem of flexible boards. |
| **Drag & drop as primary action** | Direct manipulation matches how people physically move cards; it feels natural and fast. |
| **Quick move buttons (← / →)** | Accessible, keyboard-friendly fallback so the board works without dragging. |
| **Modal create/edit form** | Keeps the user in context — the board stays visible behind the form. |
| **Colour-coded priority** | Urgency is readable before reading text, important on a dense board. |
| **Dark / light theme** | Supports different environments and preferences; the choice is remembered. |
| **Live counts + progress bar** | Gives an instant sense of workload and completion without extra clicks. |

---

## 8. Visual Design

- **Palette (light):** background `#f4f5f7`, text `#172b4d`, primary blue `#0052cc`; status accents — To Do `#ef4444`, In Progress `#f59e0b`, Done `#22c55e`.
- **Palette (dark):** background `#101418` with adjusted surfaces and accents for contrast.
- **Type:** system font stack (Segoe UI / Roboto / system UI), one clear scale, bold titles for hierarchy.
- **Shape & depth:** 10px corner radius and soft, layered shadows so cards read as movable objects.
- **Hierarchy:** title first, then meta (priority, due date), then actions.

---

## 9. Responsive Design

- **Desktop:** three columns side by side with a stats panel above.
- **Tablet:** columns compress while every action stays reachable.
- **Mobile (≤768px):** the board switches to a **single-column stack**, the header reflows vertically, and toasts go full width. Core actions — move, edit, delete — remain one tap away without precision dragging.

---

## 10. Accessibility

- Drag & drop is **not the only** way to move a task — quick move buttons provide an equivalent path.
- The create/edit modal **auto-focuses the title field**, so keyboard users can start typing immediately.
- Priority is conveyed by **text label plus colour**, not colour alone.
- The theme toggle **respects the system preference** (`prefers-color-scheme`) and remembers the user's choice in `localStorage`.
- Hover and focus states are defined for buttons in both themes.
- Audited with **Lighthouse 11** (Chrome desktop): local build **100 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO); live on Render's free tier **96 / 100 / 100 / 100**, where Performance varies with network and cold starts. The audit surfaced low-contrast status/priority text, so I added dedicated darker on-soft text tokens (WCAG AA), plus a meta description and a valid `robots.txt`.

---

## 11. Build & Handoff

The design was implemented directly as the final product:

- **Frontend:** HTML5, CSS3, vanilla JavaScript (no framework, to keep it light).
- **Backend:** Node.js + Express REST API.
- **Database:** MongoDB Atlas (cloud).
- **Hosting:** Render.

Iterating in code let me test real interaction details — drag behaviour, empty columns, long titles, mobile taps — that are easy to miss in static mockups.

---

## 12. Testing & Iterations

Tested through self-testing on desktop and mobile, plus feedback from peers during the build sprints.

| Finding | Change made |
| --- | --- |
| Dragging felt awkward on touch screens | Added quick move buttons (← / →) as an alternative |
| Long boards were hard to scan | Added instant search, status filter, and live column counts |
| Theme reset on every visit | Saved the preference in `localStorage` and honoured the system dark mode |
| An empty column looked broken | Added a clear per-column empty state |
| Silent success/failure was confusing | Added toast confirmations for create, update, move, and delete |

---

## 13. Outcome & Learnings

**Outcome**
- A live, working Kanban app with create/edit/delete, drag & drop, search, filters, priorities, due dates, stats, and theming.
- Designed and built end to end, from problem definition to deployment.

**What I learned**
- Building what I designed forced me to handle real states — empty, long titles, errors — not just happy-path frames.
- The accessible alternative (move buttons) often became the *fastest* path, not just a fallback.
- Constraints made the product clearer: three columns meant I never needed a settings screen.
- Shipping in code is a fast way to test interaction ideas before polishing visuals.

---

## 14. What's Next

- [ ] Run a short usability test with 3–5 users and record findings
- [ ] Add keyboard shortcuts (N = new task, / = search)
- [ ] Add per-task activity/history
- [ ] Explore swimlanes or due-date grouping for larger boards
- [ ] Publish an annotated Figma file

---

*Related: [README](README.md) · Live demo: https://mini-trello-fagf.onrender.com*
