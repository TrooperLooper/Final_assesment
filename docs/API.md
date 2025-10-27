```markdown
# API Contract

✅ What’s Included:

- CRUD endpoints for Users, Games, GameSessions
- Filtering via query parameters
- Statistics endpoints for user, games, global leaderboard, and charts
- Profile picture upload endpoint (no game image upload, as required)
- Clear response shapes and request examples

❗ What’s Missing/Needs Adjustment:

- **No login/authentication required.** Only user registration (create user) is needed for the assignment. Users do not need to log in; registration is enough to play, track time, and view statistics.

---

## Users

- `POST /api/users` — Register new user (no login required)
- `POST /api/users/upload-avatar` — Upload profile picture (optional)
- `GET /api/users` — Get all users
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

## Games

- `GET /api/games` — Get all games
- `GET /api/games/:id` — Get game by ID

## Game Sessions

- `POST /api/sessions/start` — Start game session
- `POST /api/sessions/stop` — Stop game session
- `GET /api/sessions/user/:userId` — Get user's sessions
- `GET /api/sessions/statistics/:userId` — Get user statistics

## Statistics

- `GET /api/statistics/user/:userId` — Get user statistics + leaderboard data
- `GET /api/statistics/games` — Get game popularity stats
- `GET /api/statistics/global` — Get global leaderboard data (integrated into Stats page)
- `GET /api/statistics/charts/:gameId` — Get chart data for specific game

---

**Note:**

- User registration is required, but login/authentication is **not** part of the assignment.
- Users can be created, selected, and used for tracking/play—no need for login/logout.
```
