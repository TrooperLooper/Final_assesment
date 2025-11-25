# 🎮 Game Timer

A fun accessible game time tracker for users, games, and sessions.  
Track your playtime, view statistics, and compete on the leaderboard!

![Game Timer Screenshot](frontend/GameTimer_Register.gif)

![Game Timer Screenshot](frontend/GameTimer_Users_Stats.gif)

---

## 🚀 What It Does

- **Register:** Create a user profile with avatar.
- **Games:** Browse and select retro games to play.
- **Play:** Start a session, track your playtime with a retro timer.
- **Stats:** View personal and global statistics, charts, and leaderboards.
- **Users:** Search and view all registered users.
- **Search Function:** Quickly find users with the global search bar.
- **Weather Widget:** See live weather updates in the header.

---

## 🗂️ Pages

- `/register` — User registration
- `/games` — Game selection
- `/play/:gameId` — Play a game and track time
- `/stats/:userId` — Personal and global statistics
- `/users` — User search and profiles

---

## 🗄️ Database Functions

See the ERD below for relationships:

![ERD](frontend/src/assets/screenshots/game-timer-erd.png)

- **User:** Stores user info and profile picture
- **Game:** Stores game info and icons
- **GameSession:** Tracks play sessions, time played, and links to user/game

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express, MongoDB
- **APIs:** RESTful endpoints for users, games, sessions, statistics
- **Weather:** OpenWeatherMap API for live weather widget

---

## 🏁 How to Run

1. **Clone the repo**
2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```
3. **Set environment variables**
   - Add your OpenWeatherMap API key to `.env` as `VITE_WEATHER_API_KEY`
   - Set backend API URL as `VITE_API_URL`
4. **Start the frontend**
   ```bash
   npm run dev
   ```
5. **Start the backend**
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

---

## 📊 ERD

![ERD](frontend/src/assets/screenshots/game-timer-erd.png)

---

Credits: This was a backend group-assignment completed by @s-weberg and @TrooperLooper at Sundsgårdens Folkhögskola 2025.

**Enjoy tracking your game time and climbing the leaderboard!**
