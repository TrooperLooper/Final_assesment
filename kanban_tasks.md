# 🎮 Game Time Tracker — Kanban Tasks (ADHD-friendly)

A compact, colorful, and checklist-focused version of the task list for the Game Time Tracker project.  
Use this file to create Issues quickly by copy/pasting each section into GitHub Issues. Tasks are grouped by Phase and separated into Back (server) / Front (client).

Legend

- 🔥 High priority
- ⚠️ Medium priority
- ✅ Low priority
- 🧾 Docs / Chore
- 🧪 Test
- 🛠️ Dev task
- ⏱️ Estimate (story points)
- 🧩 Acceptance criteria and short checklists are included for quick copying

---

## Quick Controls

- Copy the issue title as the Issue title
- Copy the description block (under **Description**) into the Issue body
- Paste the checklist into the Issue body to get ready-made subtasks

---

## Phase 0 — Docs & Housekeeping (Do first)

### 🧾 Update docs: remove Prisma, confirm Mongoose-only architecture 🔥 ⏱️ 1

Description
We are using Mongoose only for MongoDB access. Remove Prisma mentions and update docs.

Acceptance criteria

- copilot_instructions.md and README.md updated to remove Prisma
- package.json docs examples updated
- short rationale added to README

Checklist

- [ ] Update copilot_instructions.md (remove Prisma references)
- [ ] Update README.md architecture section
- [ ] Add short rationale in README
- [ ] Commit changes and open PR

Labels: docs, backend, high

<details>
<summary>Copyable Issue Body</summary>

Description  
We are using Mongoose only for MongoDB access. Remove Prisma mentions from docs and adjust instructions and dependency lists accordingly.

Acceptance criteria

- copilot_instructions.md and README.md updated to remove Prisma and mention Mongoose only
- package.json examples (in docs) updated to not reference Prisma
- A short note explaining why Mongoose was chosen added to README

Checklist

- [ ] Update copilot_instructions.md (remove Prisma references)
- [ ] Update README.md architecture section to state Mongoose only
- [ ] Add short rationale in README (1-2 paragraphs)
- [ ] Commit changes and link files in the PR

Labels: docs, backend, high  
Estimate: 1

</details>

---

### 🧾 Add .env.example and document secrets usage ⚠️ ⏱️ 1

Description
Add .env.example with required env keys and document local setup.

Checklist

- [ ] Create .env.example
- [ ] Update README with .env setup steps
- [ ] Add TIMER and weather key examples

Labels: docs, infra, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Add a `.env.example` file listing environment variables used by server and client (TIMER_MULTIPLIER, MONGODB_URI, WEATHER_API_KEY, PORT, etc.). Update README with instructions to copy to `.env`.

Acceptance criteria

- `.env.example` added at repo root with all required env keys
- README includes instructions for local .env setup and where to put API keys
- copilot_instructions.md includes example env snippet for TIMER_MULTIPLIER and OpenWeatherMap key

Checklist

- [ ] Create `.env.example` with all required keys and comments
- [ ] Update README with `.env` setup steps
- [ ] Add brief example for `TIMER_MULTIPLIER` and weather API usage
- [ ] Add note about storing secrets securely (local only for this project)

Labels: docs, infra, low  
Estimate: 1

</details>

---

### 🧩 Add TIMER_MULTIPLIER config and document demo mode ✅ ⏱️ 1

Description
Make timer multiplier configurable via environment variable so 1s=1min is demo-mode only.

Checklist

- [ ] Add `TIMER_MULTIPLIER` to `.env.example`
- [ ] Document demo/run instructions in README
- [ ] Add sample snippet for server & client

Labels: backend, docs, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Make timer multiplier configurable via env var `TIMER_MULTIPLIER`. Document how to run demo mode (1s = 1min) locally.

Acceptance criteria

- Environment variable referenced in server/client config examples
- README shows how to set `TIMER_MULTIPLIER=60` for demo or `1` for real seconds
- Example usage added to copilot_instructions.md

Checklist

- [ ] Add `TIMER_MULTIPLIER` to `.env.example`
- [ ] Add README instructions for demo vs real mode
- [ ] Add short code snippet for reading env var (server & client)

Labels: backend, docs, medium  
Estimate: 1

</details>

---

## Phase 1 — Project Foundation (Days 1–3)

### Back (server)

#### 🛠️ Initialize server repo with TypeScript & Express 🔥 ⏱️ 2

Description
Scaffold server with TypeScript, Express, ESLint, basic scripts and a health route.

Checklist

- [ ] Create server package.json with scripts
- [ ] Add tsconfig.json and ESLint
- [ ] Implement server/src/server.ts with GET /api/health
- [ ] Add README server start instructions

Labels: backend, setup, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Scaffold the `server/` folder with TypeScript, Express, ESLint, and basic dev scripts.

Acceptance criteria

- `server/package.json` contains scripts: `dev`, `build`, `start`
- TypeScript configured (`tsconfig.json`)
- ESLint basic config present
- `server/src/server.ts` starts an Express app that responds to `GET /api/health`

Checklist

- [ ] Create server `package.json` with scripts
- [ ] Add `tsconfig.json` and minimal ESLint config
- [ ] Implement `server/src/server.ts` (Express app + `/api/health` route)
- [ ] Add server README start instructions

Labels: backend, setup, high  
Estimate: 2

</details>

---

#### 🛠️ Connect to MongoDB with Mongoose and logging 🔥 ⏱️ 1

Description
Implement connectDB util using Mongoose and log success/failure.

Checklist

- [ ] Implement connectDB utility (server/src/config/database.ts)
- [ ] Wire connectDB into server startup
- [ ] Add basic logging statements (winston or console)

Labels: backend, infra, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement a reusable DB connection module using Mongoose and log connection status.

Acceptance criteria

- `server/src/config/database.ts` (or `db.ts`) exports `connectDB()`
- `connectDB` reads `MONGODB_URI` from env and connects
- Successful connection logs host; failures log and exit process

Checklist

- [ ] Implement `connectDB` utility
- [ ] Wire `connectDB` into server startup
- [ ] Add basic logging statements

Labels: backend, infra, high  
Estimate: 1

</details>

---

#### 🛠️ Seed script for 4 retro games ⚠️ ⏱️ 1

Description
Seed the games collection if empty.

Checklist

- [ ] Implement `seedGames`
- [ ] Add `npm run seed`
- [ ] Document seed usage in README

Labels: backend, chore, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement a seed script that inserts the four retro games into `games` collection if not present.

Acceptance criteria

- `server/src/utils/seedDatabase.ts` available
- `npm run seed` populates games collection
- Script is documented in README

Checklist

- [ ] Implement `seedGames` function
- [ ] Add npm script: `seed`
- [ ] Document how to run seed in README

Labels: backend, chore, medium  
Estimate: 1

</details>

---

### Front (client)

#### ⚙️ Initialize client: Vite + React + TypeScript + Tailwind ⚠️ ⏱️ 1

Description
Scaffold the client app with routes for the 5 pages.

Checklist

- [ ] Create Vite React TS app
- [ ] Configure Tailwind plugin in vite.config.ts
- [ ] Implement AppRoutes placeholders
- [ ] Add client README snippet

Labels: frontend, setup, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Scaffold the `client/` folder with Vite React TypeScript template, Tailwind plugin, and basic App shell (Navigation + placeholder pages).

Acceptance criteria

- `client/` created and Vite React app runs
- Tailwind plugin configured
- Basic routes registered for `/register`, `/users`, `/games`, `/play/:gameId`, `/stats/:userId`
- README includes client start instructions

Checklist

- [ ] Create Vite app with React TS template
- [ ] Add tailwind plugin to `vite.config.ts` and `index.css` import
- [ ] Implement AppRoutes with placeholders for 5 pages
- [ ] Add client README snippet

Labels: frontend, setup, low  
Estimate: 1

</details>

---

## Phase 2 — Core Features (Days 4–8)

### Back (server)

#### 🛠️ Implement User model & CRUD endpoints 🔥 ⏱️ 3

Description
Create Mongoose User model and CRUD with Zod validation.

Checklist

- [ ] Implement User schema/model
- [ ] POST, GET (all & by id), PUT, DELETE endpoints
- [ ] Zod validations for POST/PUT
- [ ] Basic tests for user create & fetch

Labels: backend, feature, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Create a Mongoose User model and user CRUD endpoints with Zod validation for create and update.

Acceptance criteria

- `User` schema with `email` (unique), `firstName`, `lastName`, `profilePicture` default
- Routes: `POST /api/users`, `GET /api/users`, `GET /api/users/:id`, `PUT /api/users/:id`, `DELETE /api/users/:id`
- Request validation via Zod on `POST` and `PUT`
- Basic unit/integration tests for create & fetch

Checklist

- [ ] Implement `User` Mongoose schema and model
- [ ] Implement routes & controllers with Zod validation
- [ ] Add tests for create & get
- [ ] Update API client docs/examples

Labels: backend, feature, high  
Estimate: 3

</details>

---

#### 🛠️ Avatar upload & static serving ⚠️ ⏱️ 2

Description
Add Multer upload endpoint and serve /uploads as static.

Checklist

- [ ] Implement upload route (POST /api/users/:id/upload-avatar)
- [ ] Validate PNG
- [ ] Update user doc with avatar path
- [ ] Serve /uploads static

Labels: backend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Add file upload route for avatars using Multer and ensure uploaded images are served as static assets.

Acceptance criteria

- `POST /api/users/:id/upload-avatar` uses Multer, accepts PNGs, stores in `server/uploads`
- User document updated with `profilePicture` path
- Express static middleware serves `/uploads` directory
- Frontend upload docs/example in README

Checklist

- [ ] Implement upload route and Multer config
- [ ] Add file type validation (png)
- [ ] Serve `/uploads` statically
- [ ] Update user record with avatar path

Labels: backend, feature, medium  
Estimate: 2

</details>

---

#### 🛠️ Implement Game model & GET /api/games endpoints ✅ ⏱️ 1

Description
Game schema + GET endpoints.

Checklist

- [ ] Implement Game schema
- [ ] GET /api/games and GET /api/games/:id
- [ ] Tests for endpoints

Labels: backend, feature, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Add a Game Mongoose model and endpoints to get all games and get a game by id. Use seeded data.

Acceptance criteria

- `Game` Mongoose schema exists
- `GET /api/games` returns seeded games
- `GET /api/games/:id` returns single game

Checklist

- [ ] Implement `Game` schema & model
- [ ] Implement `GET /api/games` and `/api/games/:id`
- [ ] Add simple tests for endpoints

Labels: backend, feature, low  
Estimate: 1

</details>

---

#### 🛠️ Implement GameSession model & start/stop endpoints 🔥 ⏱️ 3

Description
Sessions: start/stop, one active session per user, duration calculation (TIMER_MULTIPLIER), logging.

Checklist

- [ ] Implement GameSession schema
- [ ] POST /api/sessions/start
- [ ] POST /api/sessions/stop
- [ ] Enforce single active session per user
- [ ] Log start/stop

Labels: backend, feature, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Add `GameSession` model and endpoints to start and stop sessions. Enforce only one active session per user. Calculate `durationMinutes` using `TIMER_MULTIPLIER`.

Acceptance criteria

- `GameSession` model implemented
- `POST /api/sessions/start` creates a session (`userId`, `gameId`, `startTime`, `isActive:true`)
- `POST /api/sessions/stop` updates `endTime`, sets `isActive:false`, stores `durationMinutes`
- Enforce at most one active session per user (return `409`)
- Winston or console logs start/stop events

Checklist

- [ ] Implement `GameSession` schema & model
- [ ] Implement start and stop endpoints with validation
- [ ] Enforce single active session per user
- [ ] Log events on start/stop

Labels: backend, feature, high  
Estimate: 3

</details>

---

#### 🛠️ Search endpoint (users + games) ✅ ⏱️ 2

Description
Unified search for global search bar.

Checklist

- [ ] Implement GET /api/search?q=
- [ ] Return unified result format (type, id, name, route)
- [ ] Limit results (e.g., 10)
- [ ] Docs in README

Labels: backend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement a unified search endpoint that returns user and game matches for a given query (case-insensitive, partial matches). This powers the frontend global search dropdown.

Acceptance criteria

- `GET /api/search?q=` returns array of `SearchResult {type, id, name, route}`
- Limits results (e.g., max 10)
- Endpoint documented in README

Checklist

- [ ] Implement `/api/search?q=` with aggregation or combined queries
- [ ] Add response shape examples in README
- [ ] Add tests

Labels: backend, feature, medium  
Estimate: 2

</details>

---

### Front (client)

#### ⚙️ API client utility (native fetch) + hooks ✅ ⏱️ 1

Description
Implement apiClient with fetch and simple hooks (useUsers, useGames).

Checklist

- [ ] apiClient implemented
- [ ] useUsers, useGames hooks
- [ ] Example usage in pages

Labels: frontend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement `client/src/api/apiClient.ts` (native fetch wrapper) including user, games, sessions, statistics methods. Add hooks like `useUsers`.

Acceptance criteria

- `apiClient` implemented and exported
- Hooks `useUsers`, `useGames` exist and return loading/error states
- Frontend components can call client methods

Checklist

- [ ] Implement `apiClient` with error handling
- [ ] Implement hooks: `useUsers`, `useGames`
- [ ] Add usage examples on `UsersHub` and `GamesList` placeholders

Labels: frontend, feature, medium  
Estimate: 1

</details>

---

#### ⚙️ Registration page + upload UI integration 🔥 ⏱️ 2

Description
Registration form with Zod validation and avatar preview/upload.

Checklist

- [ ] Implement registration form
- [ ] Avatar preview and upload flow
- [ ] Redirect to /users on success

Labels: frontend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Build the `/register` page form with Zod validation and avatar upload support (upload to `POST /api/users/:id/upload-avatar` after creating user or as part of flow).

Acceptance criteria

- Registration form validates required fields
- Avatar preview before upload
- On success redirect to `/users`
- Graceful error messages

Checklist

- [ ] Implement registration form with Zod client-side validation
- [ ] Show avatar preview and upload flow
- [ ] Redirect to `/users` on success
- [ ] Show error/success messages

Labels: frontend, feature, medium  
Estimate: 2

</details>

---

#### ⚙️ Users Hub + UserCarousel component ✅ ⏱️ 2

Description
Users grid + carousel to pick active player (click avatar -> stats).

Checklist

- [ ] Implement UsersHub UI
- [ ] Implement UserCarousel & UserCard
- [ ] Avatar click navigates to /stats/:userId

Labels: frontend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement `/users` page with grid of `UserCard`s and a `UserCarousel` for selection. Clicking avatar navigates to `/stats/:userId`.

Acceptance criteria

- `/users` lists users with avatars
- `UserCarousel` implemented and reusable in Stats page
- Avatar click navigates to user stats page

Checklist

- [ ] Implement `UsersHub` page UI
- [ ] Implement `UserCarousel` and `UserCard` components
- [ ] Connect to API `getUsers`

Labels: frontend, feature, medium  
Estimate: 2

</details>

---

#### ⚙️ Games Library page ✅ ⏱️ 1

Description
Games list and navigation to /play/:gameId.

Checklist

- [ ] Implement GamesList & RetroGameCard
- [ ] Clicking a game navigates to /play/:gameId

Labels: frontend, feature, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement games listing page with `RetroGameCard` components for 4 games. Clicking a game navigates to `/play/:gameId`.

Acceptance criteria

- `/games` lists seeded games with image/icon/description
- Clicking a game navigates to play route

Checklist

- [ ] Implement `GamesList` & `RetroGameCard`
- [ ] Integrate with `apiClient.getGames`

Labels: frontend, feature, low  
Estimate: 1

</details>

---

## Phase 3 — Statistics & Advanced UX (Days 9–12)

### Back (server)

#### 🛠️ User statistics aggregation endpoint 🔥 ⏱️ 3

Description
Implement `/api/statistics/user/:userId` returning totalMinutes, per-game stats, session counts, weekly series.

Checklist

- [ ] Aggregation pipeline for gameStats
- [ ] totalMinutes in response
- [ ] weekly series for charts
- [ ] Response documented

Labels: backend, feature, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement `GET /api/statistics/user/:userId` that returns `totalMinutes`, per-game minutes/percentages, `sessionCount`, most-played game, and weekly series for charts.

Acceptance criteria

- Aggregation pipeline returns `gameStats` with `name`, `minutes`, `percentage`, `sessionCount`
- `totalMinutes` present
- Weekly data for past N days/weeks available
- Documented response schema

Checklist

- [ ] Implement aggregation pipeline for per-user stats
- [ ] Add example response in README or docs
- [ ] Add tests validating aggregated numbers against seeded sessions

Labels: backend, feature, high  
Estimate: 3

</details>

---

#### 🛠️ Global leaderboard endpoint ✅ ⏱️ 2

Description
Leaderboard API for top players (integrated into stats page).

Checklist

- [ ] Implement leaderboard aggregation
- [ ] Return top 10 users sorted by totalMinutes
- [ ] Document endpoint

Labels: backend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement `GET /api/statistics/global` (or integrated in user stats response) to support leaderboard table.

Acceptance criteria

- Endpoint returns top users ranked by `totalMinutes` (limit 10)
- Response includes user name and `totalMinutes`
- Endpoint documented

Checklist

- [ ] Implement leaderboard aggregation
- [ ] Add tests for sorting and limits
- [ ] Expose in stats user endpoint if desired

Labels: backend, feature, medium  
Estimate: 2

</details>

---

#### 🧩 Indexes for aggregation performance ✅ ⏱️ 1

Description
Add indexes on `GameSession.userId`, `gameId`, `isActive` for faster aggregations.

Checklist

- [ ] Add indexes in init or migration
- [ ] Document in README

Labels: backend, perf, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Create recommended MongoDB indexes to speed up aggregation queries.

Acceptance criteria

- Index creation documented
- Indexes created during DB connect or seed step (optional script)

Checklist

- [ ] Add indexes for `GameSession.userId`, `GameSession.gameId`, `isActive`
- [ ] Document index creation in README

Labels: backend, perf, low  
Estimate: 1

</details>

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

<details>
<summary>Copyable Issue Body</summary>

Description  
Build `/stats/:userId` with personal stats (bar chart, donut, total time), interactive filters, and integrated leaderboard.

Acceptance criteria

- Bar chart (minutes per game) and donut chart (percent) using Recharts
- Leaderboard table at bottom showing top users
- Game selector filters charts
- Loading and error states present

Checklist

- [ ] Implement `GameTimeBar`, `GamePercentageItem`, `TotalTimeDisplay`
- [ ] Integrate Recharts chart components
- [ ] Add `LeaderboardTable` component
- [ ] Add loading and empty states

Labels: frontend, feature, high  
Estimate: 4

</details>

---

#### ⏱️ Play session page & Timer component 🔥 ⏱️ 3

Description
Implement `/play/:gameId` with timer and start/stop flow (uses TIMER_MULTIPLIER).

Checklist

- [ ] Timer with multiplier
- [ ] Start/Stop controls call API
- [ ] Redirect to stats on stop
- [ ] Show player info & handle active-session errors

Labels: frontend, feature, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement `/play/:gameId` with `Timer` and `SessionControls`. Timer uses `TIMER_MULTIPLIER`. Start calls `/api/sessions/start`, Stop calls `/api/sessions/stop` and then navigates to `/stats/:userId`.

Acceptance criteria

- Timer count visible and updates with multiplier
- Start button calls server and creates session; Stop stops and stores session
- UI displays current player info
- Prevent starting if another active session exists (server enforces and client shows message)

Checklist

- [ ] Implement `Timer` component with configurable multiplier
- [ ] Implement `SessionControls` (start/stop) calling API
- [ ] Handle server error when a user already has an active session
- [ ] Redirect to `/stats/:userId` on stop

Labels: frontend, feature, high  
Estimate: 3

</details>

---

#### 🌤️ WeatherWidget & 🔍 GlobalSearch components ✅ ⏱️ 2

Description
Weather widget (OpenWeatherMap) and global search dropdown.

Checklist

- [ ] WeatherWidget shows date, temp, icon
- [ ] GlobalSearch queries /api/search?q=
- [ ] Both present in header

Labels: frontend, feature, medium

<details>
<summary>Copyable Issue Body</summary>

Description  
Implement the `WeatherWidget` (top-left) using OpenWeatherMap and the `GlobalSearch` component (top-center) that queries `/api/search?q=`.

Acceptance criteria

- `WeatherWidget` shows date, temperature, icon; uses `WEATHER_API_KEY` from env
- `GlobalSearch` accepts input and shows dropdown results (users + games) with routes
- Both components included in main layout/header

Checklist

- [ ] Implement `WeatherWidget` with fetch to OpenWeatherMap (local API key)
- [ ] Implement `GlobalSearch` dropdown and navigation
- [ ] Add to `NavigationBar` across pages

Labels: frontend, feature, medium  
Estimate: 2

</details>

---

## Phase 4 — Testing, Polish & Submit (Days 13–14)

### Back (server)

#### 🧪 Basic integration tests for core endpoints 🧪 ⏱️ 3

Description
Add Jest + Supertest to test user creation, start/stop session, and stats.

Checklist

- [ ] Add jest + supertest
- [ ] Add tests for core flows
- [ ] Add npm test script

Labels: test, backend, high

<details>
<summary>Copyable Issue Body</summary>

Description  
Add Jest + Supertest tests for core server flows: create user, start/stop session, statistics aggregation.

Acceptance criteria

- Jest configured with ts-jest or node test setup
- Tests cover user creation, session start/stop, and stats endpoint
- `npm test` script exists and runs locally

Checklist

- [ ] Add jest + supertest dependencies
- [ ] Implement 3-4 integration tests
- [ ] Add `npm test` script

Labels: test, backend, high  
Estimate: 3

</details>

---

#### 🛠️ Logger middleware (Winston) for session events ✅ ⏱️ 1

Description
Add Winston logger for session start/stop events.

Checklist

- [ ] Winston configured
- [ ] Start/stop events logged
- [ ] README documents logs location

Labels: backend, chore, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Add a logger middleware or logger module to record session start/stop messages using Winston.

Acceptance criteria

- Winston configured in `server/src/middleware/logger.ts`
- Session start/stop events logged with `userId`, `sessionId`, `gameId`, timestamps
- README documents where logs are written

Checklist

- [ ] Add Winston config
- [ ] Integrate logger calls in start/stop endpoints
- [ ] Document logging in README

Labels: backend, chore, low  
Estimate: 1

</details>

---

#### 🧾 Final README polish + ERD image ✅ ⏱️ 1

Description
Finalize README with setup, seed, run instructions, and include ERD.png.

Checklist

- [ ] README full local setup
- [ ] ERD.png added
- [ ] Demo instructions (TIMER_MULTIPLIER)

Labels: docs, chore, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Complete README with setup and run instructions, how to seed DB, how to start client and server in dev, and include ERD diagram (`ERD.png`).

Acceptance criteria

- README contains full local setup (server & client)
- `ERD.png` added to repo root or `docs/` folder
- README points to `copilot_instructions.md` for project breakdown

Checklist

- [ ] Update README with setup & seed steps
- [ ] Add `ERD.png` and link in README
- [ ] Add short demo run instructions (`TIMER_MULTIPLIER`)

Labels: docs, chore, low  
Estimate: 1

</details>

---

### Front (client)

#### ♿ Responsive & accessibility polish ✅ ⏱️ 1

Description
Make pages responsive and accessible.

Checklist

- [ ] Test mobile/desktop breakpoints
- [ ] Add alt & ARIA attributes
- [ ] Ensure keyboard navigation

Labels: frontend, accessibility, low

<details>
<summary>Copyable Issue Body</summary>

Description  
Ensure all pages are responsive and have basic accessibility (keyboard nav, alt text, ARIA where needed).

Acceptance criteria

- Pages tested at mobile/desktop sizes (no overflow)
- Focus states visible and keyboard navigation works
- Charts have accessible titles/descriptions

Checklist

- [ ] Test responsive layout, fix major breakpoints
- [ ] Add alt text and ARIA attributes
- [ ] Verify keyboard navigation flows

Labels: frontend, accessibility, low  
Estimate: 1

</details>

---

## Optional (only after core features are perfect)

> These are nice-to-have extras — only take on if core functionality is complete and tested.

### ✨ Add simple page transitions (Framer Motion) — optional ⏱️ 2

- Install `framer-motion`
- Add `PageWrapper` and wrap routes
- Respect `prefers-reduced-motion`

Labels: frontend, enhancement, optional  
Estimate: 2

---

## Tips for ADHD-friendly sprints

- Work in 30–45 minute focused blocks, track progress by checking off subtasks.
- Start with one page end-to-end (e.g., user registration → users hub) before branching out.
- Use small PRs (one component or one endpoint per PR).
- Daily sync: show what’s done vs blocked (2–3 quick bullets).

---

If you'd like, I can:

- Produce these as individual Issue markdown files (one per task) ready to paste, or
- Create the issues in GitHub for you (I’ll need confirmation to run the create tool).

Would you like the individual issue files next (one file per issue), or shall I create the issues in the repo for you now?
