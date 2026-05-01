# BiteSite

A SaaS platform that lets restaurant owners build and manage their own websites without writing code. Owners create a project, pick a template, configure their content, and publish — BiteSite serves the site and handles reservations, reviews, and newsletter subscribers.

---

## Features

- **Website builder** — create restaurant websites from templates, publish or unpublish at any time
- **Reservation management** — customers book tables; owners accept or reject requests
- **Review management** — collect and moderate customer reviews with star ratings
- **Newsletter** — manage subscriber lists and send HTML newsletters with unsubscribe compliance
- **Subscription tiers** — Beginner, MasterChef, and Enterprise plans
- **User accounts** — registration, login, profile editing, account deletion

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 (Composition API), Vite, Vue Router, Pinia, Axios |
| Backend | Node.js (ESM), Express 5 |
| Database | SQLite3 via `sqlite` driver |
| Auth | `express-session` + `connect-sqlite3`, bcrypt |
| Email | Nodemailer (Mailgun SMTP) |
| File uploads | Formidable (10 MB limit) |
| Process manager | PM2 |

---

## Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd BiteSite
```

### 2. Configure the backend

```bash
cd Backend
cp .env.example .env   # or create .env manually — see Environment Variables below
npm install
```

### 3. Configure the frontend

```bash
cd ../Frontend
# Create a .env.local with the backend URL:
echo "VITE_API_URL=http://localhost:3000" > .env.local
npm install
```

### 4. Start both servers

**Backend** (port 3000):
```bash
cd Backend
npm start
```

**Frontend** (port 5173):
```bash
cd Frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

All variables go in `Backend/.env`.

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `3000` |
| `ORIGIN_URL` | Frontend origin, used for CORS | `http://localhost:5173` |
| `BACKEND_URL` | Backend's own public URL | `http://localhost:3000` |
| `SESSION_SECRET` | Secret key for session signing | a long random string |
| `PROXY_NUMBER` | Number of reverse proxies in front of the server | `0` |
| `SMTP_HOST` | SMTP hostname | `smtp.eu.mailgun.org` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username / sender address | `bitesite@example.com` |
| `SMTP_PASS` | SMTP password | — |

---

## Architecture

BiteSite is a classic SPA + REST API split. The Vue 3 frontend and the Express backend run as two separate processes and communicate exclusively over HTTP.

```
Browser
  │
  ├─── SPA requests (/, /dashboard, /editor, …)
  │         └──▶  Vite dev server (port 5173)
  │                   └── serves the compiled Vue app
  │
  └─── API requests (/users/*, /projects/*, /restaurants/*, /editor/*)
            └──▶  Express server (port 3000)
                      │
                      ├── CORS (allows ORIGIN_URL only)
                      ├── Session middleware (cookie → SQLite session store)
                      ├── Upload cleanup middleware
                      │
                      ├── /users/*       → routes/users.js   → handlers/users.js
                      ├── /projects/*    → routes/projects.js → handlers/projects.js
                      ├── /editor/*      → routes/editor.js
                      └── /restaurants/* → routes/restaurants.js → handlers/restaurants.js
                                │
                                ├── SQLite database (database/bitesite.sqlite)
                                └── Nodemailer → Mailgun SMTP (newsletters)
```

**Request flow:** Every API call from the frontend goes through the Axios client in `src/api/request.js`, which sets `withCredentials: true` so the session cookie is attached automatically. On the backend each route is wrapped in `routeWrapper` (from `error-handling.js`), which catches thrown `HttpError` instances and returns a consistent JSON error response. Protected routes additionally run the `checkAuth` middleware before reaching the handler.

**Authentication:** Sessions are stored in a separate SQLite file (`sessions.sqlite`). On login the server writes a session record and sets an `httpOnly` cookie; `checkAuth` validates that cookie on every protected request.

**Website serving:** When a restaurant project is published, its HTML file is saved to `Backend/websites/`. The `GET /restaurants/website/:route` endpoint reads and streams that file directly — no separate static server is needed.

---

## Project Structure

```
BiteSite/
├── Backend/
│   ├── database/
│   │   ├── db.js               # SQLite connection
│   │   └── db-structure.sql    # Schema (users, projects, reviews, reservations, newsletters, tags)
│   ├── handlers/               # Business logic
│   │   ├── users.js
│   │   ├── projects.js
│   │   └── restaurants.js
│   ├── middleware/
│   │   ├── check-auth.js       # Session guard
│   │   ├── upload.js           # Formidable file upload
│   │   └── cleanup.js          # Removes stale upload temp files
│   ├── routes/                 # Express routers
│   ├── websites/               # Published restaurant HTML files (served statically)
│   ├── mailer.js               # Newsletter / transactional email
│   ├── error-handling.js       # HttpError class + route wrapper
│   ├── setup.js                # DB initialisation on startup
│   └── server.js               # Entry point
│
├── Frontend/
│   ├── src/
│   │   ├── api/                # Axios client + per-resource endpoint modules
│   │   ├── router/             # Vue Router configuration
│   │   ├── stores/             # Pinia stores
│   │   ├── views/              # Page components (Dashboard, Editor, WebsiteView, …)
│   │   └── components/         # Reusable UI components
│   └── vite.config.js
│
└── docs/                       # Project charter, architecture diagram, status reports
```

---

## Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm start` | Start with nodemon (auto-restarts on changes) |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint + Oxlint |
| `npm run format` | Format source files with Prettier |

---

## Database

SQLite file is created automatically on first run via `setup.js`. Tables:

- `users` — accounts and subscription info
- `projects` — restaurant projects per user
- `reviews` — customer reviews linked to a project
- `reservations` — booking requests with status tracking
- `newsletter_subscribers` — opt-in email list per project
- `tags` / `project_tags` — category tags with many-to-many relation
