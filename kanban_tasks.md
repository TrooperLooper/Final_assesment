# 🎮 Game Time Tracker — Kanban Tasks (ADHD-friendly, teacher-style)

A compact, checklist-focused task list for the Game Time Tracker project.  
This version adds a few "do-first" items (ERD + API contract), uses plain language, and replaces heavy automated-test tasks with simple manual test steps you can run in Insomnia/Postman. Use this file to create Issues quickly by copy/pasting each section into GitHub Issues. Tasks are grouped by Phase and separated into Back (server) / Front (client).

Legend

- 🔥 High priority
- ⚠️ Medium priority
- ✅ Low priority
- 🧾 Docs / Chore
- 🧪 Manual Test (use Insomnia/Postman)
- 🛠️ Dev task
- ⏱️ Estimate (story points)
- 🧩 Acceptance criteria and short checklists are included for quick copying

A few team decisions to keep in one place

- Database access library: Mongoose only (Prisma removed)
- Frontend HTTP client: Axios (example client is provided in repo)
- Package manager: npm
- Testing approach for the classroom: manual API checks in Insomnia/Postman (automated tests optional / later)

---

## Quick Controls

- Copy the issue title as the Issue title
- Copy the description block (under **Description**) into the Issue body
- Paste the checklist into the Issue body to get ready-made subtasks
- Use the "Demo seed" script while presenting so your demo data is stable

---

## Phase 0 — Docs & Housekeeping (Do first, same day)

### 🧾 Update docs: remove Prisma, confirm Mongoose-only architecture 🔥 ⏱️ 1

Description  
We are using Mongoose only. Remove Prisma mentions and update docs so everyone reads the same stack.

Acceptance criteria

- copilot_instructions.md and README.md say Mongoose (not Prisma)
- package.json examples in docs updated
- short rationale added to README explaining the choice

Checklist

- [ ] Update copilot_instructions.md (remove Prisma references)
- [ ] Update README.md architecture section
- [ ] Add short rationale in README
- [ ] Commit changes and open PR

Labels: docs, backend, high

---

### 🗺️ Create ERD (Entity-Relationship Diagram) — draw first 🔥 ⏱️ 1

Description  
Draw a simple ERD so everyone sees the data relationships before building models. A quick hand-drawn PNG or a dbdiagram.io export is fine.

Why this helps (teacher note)

- Visual map: shows Users, Games, Sessions and how they connect.
- Prevents rework later (you can update models from the diagram).
- Quick to do: 15–60 minutes.

Acceptance criteria

- ERD.png or dbdiagram snippet added to repo (docs/ or root)
- README links to ERD.png
- Team agrees on relationships (User 1→N Session, Game 1→N Session)

Checklist

- [ ] Draw ERD and save as ERD.png (or create dbdiagram.io snippet)
- [ ] Add ERD file to repo (docs/ or root)
- [ ] Add short explanation in README linking to the ERD

Labels: docs, design, high

---

### 📝 API contract (simple, human-friendly) ⚠️ ⏱️ 1

Description  
Write a short API.md that lists each endpoint, required fields, example request and example response. Think of this as a recipe both frontend and backend follow.

Why this helps (teacher note)

- Frontend and backend talk the same language.
- Saves time: you won't have to guess request/response shapes.

Acceptance criteria

- API.md added to repo root with all main endpoints and examples
- Frontend devs refer to API.md when building forms / fetch calls
- Keep it short and update as routes change

Checklist

- [ ] Create API.md listing endpoints and examples
- [ ] Put API.md in repo root
- [ ] Share with teammate and confirm a quick read-through

Labels: docs, backend, high

---

### 🧾 Add .env.example and document secrets usage ⚠️ ⏱️ 1

Description
Add `.env.example` with required env keys and simple local setup steps.

Checklist

- [ ] Create `.env.example` (MONGODB_URI, PORT, TIMER_MULTIPLIER, VITE_API_URL, WEATHER_API_KEY)
- [ ] Update README with `.env` setup steps (copy .env.example → .env)
- [ ] Add small note about keeping secrets local (don’t commit real keys)

Labels: docs, infra, low

---

### 🧩 Add TIMER_MULTIPLIER config and document demo mode ✅ ⏱️ 1

Description
Make timer multiplier configurable via environment variable so 1s=1min is demo-mode only.

Checklist

- [ ] Add `TIMER_MULTIPLIER` to `.env.example`
- [ ] Document demo/run instructions in README (how to set `TIMER_MULTIPLIER=60` for demo)
- [ ] Add sample snippet for server & client showing how to read this env var

Labels: backend, docs, medium

---

## Phase 1 — Project Foundation (Days 1–3)

### Back (server)

#### 🛠️ Initialize server repo with TypeScript & Express 🔥 ⏱️ 2

Description  
Scaffold server with TypeScript, Express, ESLint, basic scripts and a health route.

Checklist

- [ ] Create server package.json with scripts: dev, build, start
- [ ] Add tsconfig.json and ESLint
- [ ] Implement `server/src/server.ts` with GET `/api/health`
- [ ] Add server README start instructions (npm install, npm run dev)

Labels: backend, setup, high

Teacher tip: Start the server and open http://localhost:4000/api/health in the browser to confirm it's alive.

---

#### 🛠️ Connect to MongoDB with Mongoose and logging 🔥 ⏱️ 1

Description
Implement connectDB util using Mongoose and log success/failure.

Checklist

- [ ] Implement `server/src/config/database.ts` exporting `connectDB()`
- [ ] Wire connectDB into server startup
- [ ] Add simple console logs (or Winston if you prefer)

Labels: backend, infra, high

Teacher tip: If connection fails, the console will show the error and help find the missing .env value.

---

#### 🛠️ Seed script for 4 retro games ⚠️ ⏱️ 1

Description
Seed the games collection if empty. This provides predictable demo data.

Checklist

- [ ] Implement `seedGames` (`server/src/utils/seedDatabase.ts`)
- [ ] Add `npm run seed` script in server/package.json
- [ ] Document seed usage in README

Labels: backend, chore, medium

Teacher tip: Run `npm run seed` before demo; this fills the games collection with the 4 canonical games.

---

### Front (client)

#### ⚙️ Initialize client: Vite + React + TypeScript + Tailwind ⚠️ ⏱️ 1

Description
Scaffold the client app with routes for the 5 pages.

Checklist

- [ ] Create Vite React TS app
- [ ] Configure Tailwind plugin in `vite.config.ts`
- [ ] Implement AppRoutes placeholders
- [ ] Add client README snippet (npm install, npm run dev)

Labels: frontend, setup, low

Teacher tip: Keep the UI simple first; aim for working pages, then polish.

---

## Phase 2 — Core Features (Days 4–8)

> Note: large items are split into teacher-sized steps so each can be a small PR.

### Back (server)

#### 🛠️ User model — create schema & basic model 🔥 ⏱️ 1

Description
Create the Mongoose User schema and export the model.

Checklist

- [ ] Create `server/src/models/User.ts` with fields: email (unique), firstName, lastName, profilePicture (default)
- [ ] Export the User model
- [ ] Commit and push working model

Labels: backend, feature, high

---

#### 🛠️ Create user endpoint (POST /api/users) 🔥 ⏱️ 1

Description
Implement endpoint to create a user and return the created record.

Checklist

- [ ] Implement POST `/api/users`
- [ ] Use simple server-side validation (check required fields)
- [ ] Return 201 + created user object
- [ ] Manual test with Insomnia: create a user and confirm response

Labels: backend, feature, high

Teacher tip: Manual testing steps for Insomnia/Postman are in API.md.

---

#### 🛠️ Read endpoints (GET /api/users, GET /api/users/:id) ⚠️ ⏱️ 1

Description
Return all users and a single user by id.

Checklist

- [ ] Implement GET `/api/users`
- [ ] Implement GET `/api/users/:id`
- [ ] Manual tests: confirm GET returns expected objects

Labels: backend, feature, medium

---

#### 🛠️ Update & delete endpoints (PUT /api/users/:id, DELETE /api/users/:id) ✅ ⏱️ 1

Description
Add simple update & delete functionality.

Checklist

- [ ] Implement PUT `/api/users/:id` (partial updates allowed)
- [ ] Implement DELETE `/api/users/:id`
- [ ] Manual tests in Insomnia for update and delete flows

Labels: backend, feature, medium

---

#### 🛠️ Avatar upload & static serving ⚠️ ⏱️ 2

Description
Add Multer upload endpoint and serve `/uploads` as static.

Checklist

- [ ] Implement upload route POST `/api/users/:id/upload-avatar` (Multer)
- [ ] Validate PNG (basic check)
- [ ] Update user document with avatar path
- [ ] Static middleware: serve `server/uploads` folder

Labels: backend, feature, medium

Teacher tip: In the client, use `FormData` and let the browser set Content-Type.

---

#### 🛠️ Game model & GET /api/games endpoints ✅ ⏱️ 1

Description
Game schema + GET endpoints (uses seeded games).

Checklist

- [ ] Implement `Game` schema & model
- [ ] GET `/api/games` and GET `/api/games/:id`
- [ ] Manual test to confirm seeded games are returned

Labels: backend, feature, low

---

#### 🛠️ GameSession model & start/stop endpoints 🔥 ⏱️ 3

Description
Sessions: start/stop, one active session per user, store seconds or minutes.

Checklist

- [ ] Implement `GameSession` schema & model
- [ ] POST `/api/sessions/start` (create session; check no active session for user)
- [ ] POST `/api/sessions/stop` (set endTime, calculate durationSeconds)
- [ ] Log start/stop events (console or Winston)
- [ ] Manual test: start session → stop session and verify stored duration

Labels: backend, feature, high

Teacher tip: Store seconds for precision; UI can convert to minutes. Use TIMER_MULTIPLIER for demo speed if you want to simulate minutes.

---

#### 🛠️ Search endpoint (users + games) ✅ ⏱️ 2

Description
Unified search for the global search bar.

Checklist

- [ ] Implement GET `/api/search?q=`
- [ ] Return simple results: { type, id, name, route }
- [ ] Limit results (e.g., max 10)
- [ ] Manual test: try queries in Insomnia and verify shape

Labels: backend, feature, medium

---

### Front (client)

#### ⚙️ API client utility (Axios) + simple hooks ✅ ⏱️ 1

Description
Implement `client/src/api/apiClient.ts` using Axios and small hooks like `useUsers`.

Checklist

- [ ] Add `apiClient` (axios.create) reading base URL from `VITE_API_URL`
- [ ] Add `getUsers`, `createUser`, `startSession`, `stopSession`, `getGames`
- [ ] Simple hooks: `useUsers`, `useGames` returning data/loading/error
- [ ] Manual test: use the hooks in placeholder pages and confirm data loads

Labels: frontend, feature, medium

Teacher tip: If Axios is new: it's a small helper that makes requests easier. Use the provided example in API.md.

---

#### ⚙️ Registration page + upload UI integration 🔥 ⏱️ 2

Description
Registration form with client-side validation (Zod optional) and avatar preview/upload.

Checklist

- [ ] Implement registration form
- [ ] Show avatar preview before upload
- [ ] On submit: POST /api/users, then upload avatar if provided
- [ ] Redirect to `/users` on success
- [ ] Manual test: create user via UI and check server data in Insomnia

Labels: frontend, feature, medium

---

#### ⚙️ Users Hub + UserCarousel component ✅ ⏱️ 2

Description
Users grid + carousel to pick active player (click avatar -> stats).

Checklist

- [ ] Implement UsersHub UI
- [ ] Implement UserCarousel & UserCard
- [ ] Avatar click navigates to `/stats/:userId`

Labels: frontend, feature, medium

---

#### ⚙️ Games Library page ✅ ⏱️ 1

Description
Games list and navigation to `/play/:gameId`.

Checklist

- [ ] Implement GamesList & RetroGameCard
- [ ] Clicking a game navigates to `/play/:gameId`

Labels: frontend, feature, low

---

## Phase 3 — Statistics & Advanced UX (Days 9–12)

### Back (server)

#### 🛠️ User statistics aggregation endpoint 🔥 ⏱️ 3

Description
Implement `/api/statistics/user/:userId` returning totals and per-game breakdown.

Checklist

- [ ] Aggregation pipeline for gameStats
- [ ] Include `totalMinutes` (or totalSeconds) and `sessionCount`
- [ ] Provide simple weekly series for charts
- [ ] Manual test: call endpoint in Insomnia and verify numbers

Labels: backend, feature, high

---

#### 🛠️ Global leaderboard endpoint ✅ ⏱️ 2

Description
Leaderboard API for top players (integrated into stats page).

Checklist

- [ ] Implement `GET /api/statistics/global`
- [ ] Return top users by total time
- [ ] Manual test and confirm ordering

Labels: backend, feature, medium

---

#### 🧩 Add indexes for aggregation performance ✅ ⏱️ 1

Description
Create indexes for `GameSession.userId`, `gameId`, `isActive` to speed aggregations.

Checklist

- [ ] Add index creation in seed or connect step
- [ ] Document indexes in README

Labels: backend, perf, low

---

### Front (client)

#### 📊 Stats page UI + Recharts integration 🔥 ⏱️ 4

Description
Build `/stats/:userId` with bar/donut charts and integrated leaderboard.

Checklist

- [ ] GameTimeBar and GamePercentageItem
- [ ] Recharts bar/donut/line components
- [ ] Leaderboard table at bottom
- [ ] Loading & empty states

Labels: frontend, feature, high

---

#### ⏱️ Play session page & Timer component 🔥 ⏱️ 3

Description
Implement `/play/:gameId` with timer and start/stop flow (uses TIMER_MULTIPLIER for demo).

Checklist

- [ ] Timer with multiplier
- [ ] Start/Stop controls call API
- [ ] Redirect to stats on stop
- [ ] Show player info & handle active-session errors

Labels: frontend, feature, high

---

#### 🌤️ WeatherWidget & 🔍 GlobalSearch components ✅ ⏱️ 2

Description
Weather widget and global search dropdown in header.

Checklist

- [ ] WeatherWidget shows date, temp, icon (WEATHER_API_KEY optional)
- [ ] GlobalSearch queries `/api/search?q=` and navigates
- [ ] Add both to NavigationBar

Labels: frontend, feature, medium

---

## Phase 4 — Manual Testing, Polish & Submit (Days 13–14)

### Back (server)

#### 🧪 Manual integration checks for core endpoints 🧪 ⏱️ 2

Description (teacher-friendly)

- Instead of automated tests for this course, use Insomnia/Postman to check core flows. This is quick, teaches how APIs work, and is accepted for the assignment.

Checklist (manual checks)

- [ ] POST /api/users — create user (save returned id)
- [ ] GET /api/users — confirm created user is listed
- [ ] POST /api/sessions/start — start session for user (verify active)
- [ ] POST /api/sessions/stop — stop session and check duration stored
- [ ] GET /api/statistics/user/:userId — confirm numbers reflect session
- [ ] Test avatar upload using form-data POST `/api/users/:id/upload-avatar`

Labels: test, backend, high

Teacher tip: Keep the Insomnia collection saved inside the repo (export) so teammates can run the same requests.

---

#### 🛠️ Logger middleware (Winston or console) for session events ✅ ⏱️ 1

Description
Add a logger for session start/stop events (console is fine for class).

Checklist

- [ ] Add basic logger and call it from session handlers
- [ ] Document where to see logs (terminal)
- [ ] Commit and push

Labels: backend, chore, low

---

#### 🧾 Final README polish + ERD image ✅ ⏱️ 1

Description
Finish README with setup, seed, run instructions and link ERD.png.

Checklist

- [ ] README full local setup (server & client) with npm commands
- [ ] ERD.png added and linked
- [ ] Demo instructions (TIMER_MULTIPLIER set to 60 for demo)

Labels: docs, chore, low

Teacher tip: Add a one-paragraph "How I will demo this locally" with exact commands.

---

### Front (client)

#### ♿ Responsive & accessibility polish ✅ ⏱️ 1

Description
Make pages responsive and check keyboard navigation.

Checklist

- [ ] Test mobile/desktop breakpoints
- [ ] Add alt & ARIA attributes
- [ ] Ensure keyboard focus order works

Labels: frontend, accessibility, low

---

## Optional (only after core features are perfect)

### ✨ Add simple page transitions (Framer Motion) — optional ⏱️ 2

- Install `framer-motion` only if you have time
- Add `PageWrapper` and wrap routes
- Respect `prefers-reduced-motion`

Labels: frontend, enhancement, optional

---

## Practical teacher-style workflow notes (plain English)

1. What is a PR (Pull Request)?

- A PR is a request asking the team to add your work into the shared main branch. It shows exactly what changed and lets the team check it before merging.
- Simple steps: make a branch (git checkout -b feature/thing), push it, open a PR on GitHub, ask your teammate to review it, then merge.

2. What is CI and what does "CI runs on PRs" mean?

- CI = automatic checks run by GitHub when you open a PR. These checks can install dependencies, build the project, and run lints. They help catch basic problems before merging. For this class, running the build and checking there are no errors is enough.

3. CORS (very short):

- Browsers block requests to other servers unless the server allows it. When your client (http://localhost:5173) talks to the server (http://localhost:4000), add a small cors allow rule on the server to permit the client origin. (We gave a code snippet in docs.)

4. Axios & npm (decision):

- Use Axios in the frontend because it makes calls easier (we include an example apiClient). Everyone should use npm commands to install and run.

5. Manual testing (class-friendly):

- Use Insomnia/Postman to follow the API.md "recipe" for each endpoint. Save and share the exported Insomnia collection in the repo so both presenters run the same demo.

6. Presentation prep (short):

- Create a "seed:demo" script that creates predictable users & sessions. Use it before your live demo so you don't have to create everything by hand.

---

## Tips for ADHD-friendly sprints (teacher tone)

- Work in 30–45 minute focused blocks with clear, concrete goals (e.g., "Make POST /api/users work and test in Insomnia").
- Keep tasks small: one small endpoint or one UI page per PR.
- Use a demo seed so the presentation is repeatable.
- Daily quick sync (2–3 bullets): what I did, what's blocked, what I'll do next.

---

If you'd like, I can:

- Produce each small task above as an Issue markdown file ready to paste, or
- Create the issues directly in GitHub for you (I can do that if you want me to push).
  Which do you prefer? If you'd like the Issue files, tell me which phase to start with and I'll produce them in teacher-friendly language.

```

```
