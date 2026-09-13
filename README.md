# Mini-Trello Kanban Board

A single-page Kanban board to create tasks and move them between
**To Do → In Progress → Done**. Built for the *Agile Development & UI/UX*
project with a modern, themeable UI.

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript (dark mode + responsive)
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB Atlas (cloud, via the official `mongodb` driver)

## Features

- Create / edit / delete tasks
- Drag & drop, or use ←/→ buttons to move tasks between columns
- **Priority labels** (Low / Medium / High) on every card
- **Due dates** with automatic **overdue** warnings
- **Search bar** + **status filter**
- **Stats panel** (Total / To Do / In Progress / Done / Overdue)
- **Dark mode** toggle
- Progress bar showing completion %

## Quick Start (4 steps)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env`** in the project folder and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/Mini-Trello
   MONGODB_DB=Mini-Trello
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open:** `http://localhost:3000`

> The database must already exist in Atlas (collection: `tasks`). No other setup needed.

## Project Structure

```
mini-trello/
├── .env               # MongoDB connection string (keep private)
├── server/
│   ├── server.js      # Express server + REST routes
│   └── db.js          # MongoDB connection (mongodb driver)
└── public/
    ├── index.html
    ├── css/styles.css
    └── js/app.js
```

## REST API

| Method | Endpoint          | Description                       |
| ------ | ----------------- | --------------------------------- |
| GET    | `/api/tasks`      | Fetch all tasks                   |
| POST   | `/api/tasks`      | Create a task                     |
| PATCH  | `/api/tasks/:id`  | Update status / title / priority  |
| DELETE | `/api/tasks/:id`  | Delete a task                     |

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

## Agile Execution Summary

- **Sprint 1 — Foundation:** Express server, MongoDB connection, create/read tasks, 3-column board.
- **Sprint 2 — Integration:** Update/delete routes, drag & drop, live UI refresh.
- **Sprint 3 — UX Polish:** Search & filter, priority + due dates, stats, dark mode, responsive layout.