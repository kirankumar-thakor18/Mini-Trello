# ◈ Mini-Trello

**A modern, cloud-powered Kanban board** that makes it effortless to plan, track, and complete work.
Create tasks, drag them across **To Do → In Progress → Done**, and keep everything visual — just like Trello, but built from scratch.

Designed and built as a live `Full-Stack Mini Project`, with a focus on clean interaction design, responsive layout, and a real REST API backed by a cloud database.

## 🚀 Live Demo

👉 **[mini-trello-fagf.onrender.com](https://mini-trello-fagf.onrender.com)**

> The app is deployed live on Render — open the link and try it right now!

---

## 📌 Overview

| | |
| --- | --- |
| **Role** | UI/UX Design + Frontend Development |
| **Type** | Solo full-stack mini project |
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript |
| **Backend** | Node.js · Express |
| **Database** | MongoDB Atlas (cloud) |
| **Hosting** | Render (free tier) |
| **Methodology** | Agile — 3 short sprints |

---

## 🎨 Design Process

### 1. The problem
Most task tools are either too heavy (Trello, Jira) or too simple (a plain to-do list). The goal was a **small, focused Kanban board** that a student or small team can understand in seconds — no onboarding, no clutter.

### 2. Who it's for
- Students managing project work across subjects
- Small teams tracking a shared sprint
- Anyone who wants a visual “what's next?” view without signing up for a complex tool

### 3. Information architecture
Work is organised by **state, not by list**: every task lives in exactly one of three columns — `To Do`, `In Progress`, `Done`. This makes the board scannable at a glance and reduces the mental model to a single question: *where is this task right now?*

### 4. Interaction design
- **Drag & drop** for the natural, direct way to move work forward.
- **Quick move buttons (← / →)** on each card as an accessible, keyboard-friendly alternative to dragging.
- **Modal form** for create/edit so the board never loses context.
- **Immediate feedback** after every action — live column counts, a progress bar, and overdue highlighting.

### 5. Visual design
- **Priority colour coding** (Low / Medium / High) so urgency is readable before text.
- **Dark / Light theme** with the user's preference saved.
- **Consistent spacing and card hierarchy** so the eye moves title → meta → action.

### 6. Responsive & accessible
- Layout adapts across **desktop, tablet, and mobile**.
- Action buttons are reachable without drag & drop.
- Clear focus and hover states, semantic buttons, and readable contrast in both themes.
- **Lighthouse 11 (Chrome desktop):** local build **100 · 100 · 100 · 100**; live demo **96 · 100 · 100 · 100** (Performance varies on Render's free tier). The audit drove dedicated on-soft text tokens for WCAG AA contrast, a meta description, and a valid `robots.txt`.

### 7. What I'd improve next
- [ ] Add user research notes / usability test findings
- [ ] Add empty states and onboarding hints
- [ ] Add keyboard shortcuts (N = new task, / = search)
- [ ] Publish the design file and annotate key decisions

> **Design kit:** [importable SVGs + tokens](design/) &nbsp;·&nbsp; **Figma:** [Mini-Trello UI Kit](https://www.figma.com/design/Xf2QNKopm5ljsjgFdMW4ze/Mini-Trello--UI-Kit?node-id=1-7034&t=ZC8xKTCztK2FKApB-1) &nbsp;·&nbsp; **Case study:** [`CASE_STUDY.md`](CASE_STUDY.md)

---

## ✨ Key Features

| Feature | What it does |
| ------- | ------------ |
| **3-column Kanban board** | To Do · In Progress · Done with live counts |
| **Create / Edit / Delete** | Full task lifecycle with an elegant form modal |
| **Drag & Drop** | Move cards between columns naturally |
| **Quick move buttons** | ← / → arrows on every card as an alternative |
| **Priority levels** | Low · Medium · High color-coded on each card |
| **Due dates & overdue alerts** | Automatic ⏰ highlighting of overdue tasks |
| **Live stats panel** | Total, per-column, and overdue counters |
| **Progress bar** | Shows completion % at a glance |
| **Search + Filter** | Instant title/description search & status filter |
| **Dark / Light mode** | Theme toggle with saved preference |
| **Fully responsive UI** | Works on desktop, tablet, and mobile |
| **REST API** | Clean, documented HTTP endpoints for every action |

---

## 🖥️ Screenshots

### Main Board
![Mini-Trello Board](screenshots/board.png)

### Create Task Modal
![Create Task Modal](screenshots/modal.png)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) **22+**
- A **MongoDB Atlas** account with a free cluster

### Setup (4 easy steps)

**1. Install dependencies**
```bash
npm install
```

**2. Configure the database**
Copy the template file and fill in your own MongoDB connection string (the project keeps all credentials out of the code):
```bash
copy .env.example .env
```
```
MONGODB_URI=mongodb+srv://<your-user>:<your-password>@<your-cluster>.<your-id>.mongodb.net
MONGODB_DB=Mini-Trello
```

**3. Start the server**
```bash
npm start
```

**4. Open the app**
```
http://localhost:3000
```

> The server reads its configuration from environment variables only. Secret credentials are never hard-coded.

---

## 🔌 REST API

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| `GET`    | `/api/tasks`       | Fetch all tasks                |
| `POST`   | `/api/tasks`       | Create a task (goes to To Do)  |
| `PATCH`  | `/api/tasks/:id`   | Update status / title / more   |
| `PUT`    | `/api/tasks/:id`   | Replace a task's fields        |
| `DELETE` | `/api/tasks/:id`   | Delete a task                  |

**Example — create a task:**
```http
POST /api/tasks
Content-Type: application/json
```
```json
{
  "title": "Design landing page UI",
  "description": "Create the homepage mockup in Figma.",
  "priority": "high",
  "due_date": "2026-09-15"
}
```
```json
{
  "id": "6aa6d5bc49d5415e158546ac",
  "title": "Design landing page UI",
  "description": "Create the homepage mockup in Figma.",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-09-15"
}
```

---

## 📁 Project Structure

```
mini-trello/
├── server/
│   ├── server.js        # Express app + REST API routes
│   └── db.js            # MongoDB connection layer
├── public/
│   ├── index.html       # Single-page UI
│   ├── css/styles.css   # Styling + dark mode
│   └── js/app.js        # Frontend logic + API calls
├── screenshots/         # App screenshots for the report
├── .env.example         # Environment template (no secrets)
├── render.yaml          # Render blueprint
├── package.json
└── README.md
```

---

## 🗓️ Agile Execution

The project was built in three short sprints using the **Agile/Scrum** methodology:

| Sprint | Scope | Delivered |
| ------ | ----- | --------- |
| **Sprint 1 — Foundation** | Server, database, core routes | Express server + MongoDB connection + Create/Read + 3-column board |
| **Sprint 2 — Integration** | Actions + live UI | Update/Delete routes, drag & drop, instant UI refresh |
| **Sprint 3 — UX Polish** | Power features | Search & filter, priorities, due dates, stats, dark mode, responsive design |

---

## 🌐 Deployment Notes

The project is designed to deploy easily on a cloud platform like **[Render](https://render.com)**:

1. Push the repository to GitHub.
2. Create a **New Web Service** in Render and connect the repo.
3. Set two environment variables: `MONGODB_URI` and `MONGODB_DB` (via the dashboard — never in the repo).
4. Allow cloud connections in **Atlas → Network Access** (`0.0.0.0/0`).
5. Deploy — Render builds and starts the app automatically.

The included `render.yaml` blueprint makes this a one-click setup.

**▶️ The project is already live at:** https://mini-trello-fagf.onrender.com

---

## 🧑‍🎓 Author

**Kirankumar Thakor** — *7th Semester, Mini Project*
Enrollment No. **230390116028**

---

*Built with Node.js, Express, MongoDB Atlas & a little bit of love.*
