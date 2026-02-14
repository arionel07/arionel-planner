# Arionel Planner App 📅

A **full-stack productivity application** manage tasks, time blocks, and
Pomodoro sessions efficiently. The app combines a Kanban-style task board,
Pomodoro timer, and Time-Blocking scheduler.

---

## 🚀 Key Features

### 📝 Task Management (Todo)

- Create, edit, and delete tasks.
- Tasks include:
  - Title
  - Priority
  - Due date (Today, Tomorrow, etc.)
- Drag & Drop tasks between columns using **@hello-pangea/dnd**.
- Automatic status update when moving tasks to "Completed".
- Tasks can be reordered within columns.

### ⏱ Pomodoro Timer

- Built-in Pomodoro timer for focused work sessions.
- Supports work and break intervals.
- Tracks active rounds and completion status.
- Navigate between rounds with previous/next buttons.

### 🕒📝 Time Blocking

- Plan your day by creating **time blocks**.
- Each block has:
  - Title
  - Duration in minutes
  - Color (for easy visual distinction)
- Drag & Drop to reorder blocks using **dnd-kit**.
- Blocks visually represent scheduled time, similar to a calendar view.
- Edit or delete blocks dynamically without refreshing the page.

---

## 🧰 Technology Stack

### Frontend

- **React + Next.js + TypeScript**
- **React Query** (`@tanstack/react-query`) for data fetching and caching
- **Drag & Drop:** `@hello-pangea/dnd`, `dnd-kit`
- **Date Handling:** `dayjs`
- **Styling:** TailwindCSS + clsx + css
- **HTTP:** Axios

### Backend

- **NestJS + TypeScript**
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT + bcrypt for password hashing
- REST API endpoints for tasks, time blocks, and Pomodoro sessions
