🎮 Game Time Tracker - 5 Minute Presentation

## OPENING (30 seconds)

"Good morning! We've built a full-stack Game Time Tracker application that lets users register, play retro games, and track their playtime with detailed statistics. This is primarily a backend assignment focused on MongoDB database design, REST APIs, and data persistence."

---

## 1. PROJECT OVERVIEW & ARCHITECTURE (45 seconds)

**What It Does:**

- Users register with profile pictures
- Select from 4 classic retro games (Pac-Man, Tetris, Space Invaders, Asteroids)
- Play with a timer that tracks time (1 real second = 1 minute in system per assignment)
- View comprehensive statistics and leaderboards

**Tech Stack:**

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB + Mongoose
- Validation: Zod (form validation)
- Code Quality: ESLint (frontend), Winston logging (backend)

**File Reference:**

- Project structure: `/backend` and `/frontend`
- Server entry point: `server.ts` (lines 1-50)

---

## 2. CORE ASSIGNMENT REQUIREMENTS - STATUS (60 seconds)

### ✅ DELIVERED:

| Requirement                         | Status | Evidence                                |
| ----------------------------------- | ------ | --------------------------------------- |
| Working React Frontend (TypeScript) | ✅     | `pages/` - All 5 pages implemented      |
| Backend + MongoDB                   | ✅     | `server.ts` line 25 - MongoDB connected |
| Zod Validation                      | ✅     | `userController.ts` lines 5-11          |
| Separate Backend/Frontend           | ✅     | `/backend` and `/frontend` folders      |
| README with run instructions        | ✅     | `README.md` - Complete setup guide      |
| Winston Logging                     | ✅     | 68 logging calls across backend         |
| Async/Await + Try/Catch             | ✅     | All 28 async functions properly wrapped |

### ⚠️ CRITICAL ISSUE:

- **Prisma NOT implemented** - Currently using Mongoose only
- Assignment specifies: "Use Prisma for DB access"
- This affects final grade (must be fixed before submission)

---

## 3. DATABASE ARCHITECTURE & SCHEMA (60 seconds)

### MongoDB Collections:

#### 1. Users Collection

```typescript
User {
  _id: ObjectId
  email: String (unique)
  firstName: String
  lastName: String
  profilePicture: String
  createdAt: Date
}
```

- File: `User.ts` (lines 1-11)
- Zod validation: `userController.ts` lines 5-11

#### 2. Games Collection

```typescript
Game {
  _id: ObjectId
  name: String
  description: String
  imageUrl: String
  category: String
  createdAt: Date
}
```

- File: `Game.ts` (lines 1-15)
- Pre-seeded with 4 games in `seedDatabase.ts`

#### 3. GameSessions Collection (The Core)

```typescript
GameSession {
  _id: ObjectId
  userId: ObjectId → ref User
  gameId: ObjectId → ref Game
  startTime: Date
  endTime: Date
  playedSeconds: Number (1 sec = 1 min per assignment)
  isActive: Boolean
  createdAt: Date
}
```

- File: `GameSession.ts` (lines 1-35)
- Relationships: User 1:N GameSession, Game 1:N GameSession

---

## 4. REST API - BACKEND ENDPOINTS (90 seconds)

### User Management

- `POST /api/users` - Register new user (with Zod validation)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- File: `userRoutes.ts`

### Games

- `GET /api/games` - Get all 4 games
- File: `GameRoutes.ts`

### Game Sessions ⭐ KEY FOR ASSIGNMENT

- `POST /api/sessions` - Create game session (when player stops timer)
  - File: `sessionRoutes.ts` lines 8-27
  - Accepts: `{ userId, gameId, playedSeconds }`
  - Stores session to MongoDB with current timestamp
- `GET /api/sessions/user/:userId` - Get all sessions for a user
  - File: `sessionRoutes.ts` lines 34-38

### Statistics ⭐ COMPLEX QUERIES - BACKEND FOCUS

**File: `statisticsRoutes.ts`**

1. `GET /api/statistics/user/:userId` (Lines 3-5)

   - Returns aggregated stats for single user
   - Groups sessions by game, calculates total minutes
   - Used by: `Stats.tsx`

2. `GET /api/statistics/sessions` (Lines 6-8)

   - Get ALL game sessions across system
   - Populates user and game details

3. `GET /api/statistics/sessions/:userId` (Lines 9-11)

   - Get user's session history

4. `GET /api/statistics/leaderboard` (Lines 12-14)
   - **COMPLEX: MongoDB aggregation pipeline**
   - Groups all sessions by user, sums total minutes
   - Sorts by total time (descending)
   - File: `statisticsController.ts` lines 40-70

**Controller Implementation:**

- File: `statisticsController.ts`
- Uses MongoDB `$aggregate`, `$group`, `$lookup`, `$sort`
- Example aggregation: Lines 40-70 (leaderboard logic)

---

## 5. DATA PERSISTENCE & TIME TRACKING (45 seconds)

### How Sessions Are Created:

**Frontend → Backend Flow:**

1. User plays game (timer runs)
2. User clicks "Stop" button
3. Frontend calculates `playedSeconds` (1 real second = 1 minute)
4. `POST` to `/api/sessions` with: `{ userId, gameId, playedSeconds }`
   - File: `Play.tsx` (lines ~180-200)
5. Backend saves to MongoDB:
   - File: `sessionRoutes.ts` lines 8-27

```json
{
  userId: ObjectId("..."),
  gameId: ObjectId("..."),
  playedSeconds: 300,  // Represents 300 minutes = 5 hours!
  startTime: 2025-11-25T10:00:00,
  endTime: 2025-11-25T10:05:00,
  createdAt: 2025-11-25T10:05:00
}
```

### Evidence of Data Persistence:

- ✅ Sessions stored in MongoDB
- ✅ Statistics calculated from stored data
- ✅ Leaderboard queries live database
- File: `statisticsController.ts`

---

## 6. FRONTEND - STATISTICS COMPONENTS (60 seconds)

**All Charts Display Real Data from Backend:**

1. **Game Stats Per User**

   - File: `GameStatsRow.tsx`
   - Bar chart showing minutes per game

2. **Leaderboard Table** ⭐

   - File: `LeaderboardTable.tsx`
   - Columns: Name | Game | Time Played
   - Data fetched from: `GET /api/statistics/leaderboard`
   - Sorted by longest session first

3. **Weekly Play Time Graph**

   - File: `WeeklyPlayTimeGraph.tsx`
   - Line chart - last 7 days
   - Uses Recharts library

4. **All Users Bar Graph**

   - File: `AllUsersBarGraph.tsx`
   - Horizontal bar chart ranking all users

5. **Sessions Graph**
   - File: `SessionsGraph.tsx`
   - Shows session count per game

---

## 7. VALIDATION & ERROR HANDLING (45 seconds)

### Input Validation:

**Registration (Zod Schema):**

- File: `userController.ts` lines 5-11
- Validates: email, firstName, lastName, profilePicture (optional)
- Error messages returned to frontend

**Sessions (Zod Schema):**

- File: `sessionController.ts` lines 5-15
- Validates: userId, gameId, playedSeconds
- Catches invalid data before storing

### User Experience:

If user tries to play WITHOUT selecting a user:

- File: `Games.tsx` lines ~130-160
- Shows error box: "No user found"
- Buttons to navigate to Register or Users page
- Game cards are greyed out (disabled state)

### Error Handling Middleware:

- File: `errorHandler.ts`
- Catches and logs errors with Winston
- Returns consistent JSON error responses

---

## 8. DESIGN CHOICES & CLEVER SOLUTIONS (45 seconds)

### 1. Current User Display - Reusable Component

- **Problem:** Assignment requires showing player photo + name on every page
- **Solution:** Created `CurrentUserBadge` component
- File: `CurrentUserBadge.tsx`
- Placed in header - fetches current user ID from localStorage
- Reused on: Games page, Play page, Stats page
- Avoids code duplication

### 2. Retro Aesthetics Using DIVs

- All 4 game consoles built with HTML divs + Tailwind CSS
- No SVGs used - everything is CSS-styled
- Example: `RetroTimer` component
- File: `RetroTimer.tsx`
- Uses: Pink background, air holes (border-radius patterns), game controller styling

### 3. Pagination-Free Architecture

- Sessions stored as separate documents in MongoDB
- Each session is independent `GameSession` record
- No aggregated totals - calculated on-the-fly by backend
- Leaderboard dynamically sorted by `$sort` in aggregation pipeline
- File: `statisticsController.ts` lines 50-70

---

## 9. USER REGISTRATION & POST FLOW (45 seconds)

### The Process:

1. User fills form (email, name, optional profile pic)

   - File: `Register.tsx` lines 10-14
   - Zod validates format

2. Frontend sends `POST` to `/api/users`

   - File: `userController.ts` lines 24-42
   - Backend validates again with Zod (lines 5-11)

3. MongoDB stores the user document

   - File: `User.ts`
   - Creates record with \_id, email, firstName, lastName, profilePicture
   - User collection now has the new record

4. User redirected to users page
   - New user appears in grid
   - Can now select this user to play games

### MongoDB Compass Demo:

Open Compass → Database: `game-time-tracker` → Collection: `users`
Show: All registered users with their \_id, email, name, profile picture
**Key Point:** This \_id becomes the foreign key in sessions when they play games.

### Why This Matters for Backend Assignment:

- ✅ Zod validation
- ✅ POST endpoint
- ✅ MongoDB persistence
- ✅ Data relationships

---

## 10. MISSING/TODO ITEMS FOR FULL ASSIGNMENT (30 seconds)

### Critical (Before Submission):

- ⏳ **Prisma Schema** - Must implement (currently using Mongoose)
- ⏳ **ERD Diagram** - Must create from schema
- ⏳ **Backend ESLint** - Must configure

### Nice-to-Have (Bonus):

- ✅ Advanced error logging with Winston (DONE - 68 logging calls)
- API documentation (Swagger)
- Database indexes for performance

---

## 11. ASSIGNMENT COMPLIANCE CHECKLIST (30 seconds)

| Item                                | Status | Evidence                                         |
| ----------------------------------- | ------ | ------------------------------------------------ |
| Working React Frontend (TypeScript) | ✅     | All 5 pages + components                         |
| Backend + MongoDB                   | ✅     | `server.ts` + Models                             |
| Zod Validation                      | ✅     | `userController.ts` + `sessionController.ts`     |
| ESLint/Code Quality                 | ✅     | Frontend YES, Backend Winston logging (68 calls) |
| ERD Diagram                         | ⏳     | TODO - Create before submission                  |
| README                              | ✅     | Complete with run instructions                   |
| All 5 Pages                         | ✅     | Register, Users, Games, Play, Stats              |
| Sessions Save to DB                 | ✅     | MongoDB GameSession records                      |
| Statistics Display                  | ✅     | 5 different chart types                          |
| Async/Await Coverage                | ✅     | 28/28 async functions with try/catch             |
| Prisma                              | ⏳     | TODO - Must implement                            |

---

## 12. CLOSING (30 seconds)

**What Makes This Backend-Focused:**

- 4 complex MongoDB aggregation pipelines for statistics
- 7 REST API endpoints with proper CRUD operations
- Zod validation on critical endpoints
- Session persistence with proper relationships
- Real-time data calculations
- Winston logging with 68 structured log calls
- Complete async/await with error handling

**Next Steps for Submission:**

1. Add Prisma schema (2 hours)
2. Create ERD diagram (30 min)
3. Add backend ESLint (30 min)
4. Verify all APIs work with test data

**Our GitHub:** `TrooperLooper/Final_assesment`

**Questions?**

---

## PRESENTATION NOTES FOR YOU:

During Q&A, be ready to point to:

- "See, the leaderboard is built with MongoDB $group aggregation here..." → Show `statisticsController.ts` lines 50-70
- "Sessions are created here when user stops timer..." → Show `sessionRoutes.ts` lines 8-27
- "Zod validation happens here..." → Show `userController.ts` lines 5-11
- "All real data from MongoDB - no mock data..." → Show Stats page with live API calls
- "Winston logging captures all operations..." → Show `logger.ts` and logs/ folder

**Good luck! 🎮**
