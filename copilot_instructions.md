# Game Time Tracker - Project Breakdown

## 📋 Project Overview

Create a full-stack application where users can register, play classic retro games, track their playtime, and view statistics. This project combines user management, time tracking, and data visualization in a modern web application.

**Team Setup**: 2-person team with **14-day deadline**

- **Both members**: Work on both frontend and backend for balanced skill development
- **Pair programming approach**: Take turns on different features

## 🎯 Core Requirements

- **👤 User Registration & Management**: Create users with optional profile picture upload
- **🎮 Game Selection**: Choose from 4 classic retro games (Pac-Man, Tetris, Space Invaders, Asteroids)
- **⏱️ Time Tracking**: Start/stop timers for game sessions
- **📊 Statistics Dashboard**: View personal and comparative statistics
- **🍃 Data Persistence**: Store all data in MongoDB with Mongoose ODM
- **🌤️ Weather Integration**: Live weather widget on all pages
- **🔍 Global Search**: Search users and games across the app

## � Application Pages Overview

The application consists of **5 main pages** that create a complete game time tracking experience:

### 🗂️ **Page Structure & Functions**

| Page                        | Route            | Primary Function                  | Key Features                                            |
| --------------------------- | ---------------- | --------------------------------- | ------------------------------------------------------- |
| 📝 **Registration Page**    | `/register`      | Create new user accounts          | Form validation, profile picture upload, weather widget |
| 👥 **Users Hub**            | `/users`         | Browse & select players           | User grid display, "Add User" button, player switching  |
| 🎮 **Games Library**        | `/games`         | Choose games to play              | 4 retro game selection, game information display        |
| ⏱️ **Game Session**         | `/play/:gameId`  | Active gameplay timer             | Live timer, start/stop controls, session tracking       |
| 📊 **User Stats Dashboard** | `/stats/:userId` | Personal statistics & leaderboard | Time bars, percentages, total time, global leaderboard  |

### 🌟 **Common Elements (All Pages)**

- **🌤️ Weather Widget**: Live weather display (top-left)
- **🔍 Search Bar**: Global search for users and games (top-center/right)
- **🧭 Navigation**: Consistent header with page navigation
- **🎮 Retro Theme**: Classic gaming aesthetic throughout

### 📱 **User Journey Flow**

```
1. Registration Page → Create account with profile
2. Users Hub → Select player (click profile picture)
3. User Stats Dashboard → View personal progress + global leaderboard
   ↓ Choose action:
   → "Choose new player" → Back to Users Hub
   → "Play game" → Games Library → Choose from 4 retro games
4. Game Session → Play and track time (shows current player info)
5. Return to User Stats Dashboard → Updated statistics
```

**💡 Key Flow Update**: Users Hub now directly connects to individual User Stats pages, with integrated leaderboard at the bottom.

**💡 Team Communication Tip**: Use these page names in your discussions:

- "Let's work on the **Users Hub** grid layout"
- "The **Game Session** timer needs debugging"
- "**User Stats Dashboard** charts aren't displaying correctly"
- "**Leaderboard integration** in Stats page needs work"

## �🛠 Technology Stack

### 🎨 Frontend

- **React** with **TypeScript** ⚛️
- **Vite** (build tool) ⚡
- **Tailwind CSS** (styling) 🎨
- **React Router** (navigation) 🧭
- **Recharts** (statistics visualization) 📊
- **Zod** (validation) ✅

### 🔧 Backend

- **Node.js** with **TypeScript** 🟢
- **Express.js** (web framework) 🚀
- **MongoDB** (database) 🍃
- **Prisma** (database ORM) 📄
- **Mongoose** (MongoDB ODM) 🍃
- **Winston** (logging) 📝
- **Zod** (validation) ✅
- **Multer** (file uploads) 📁
- **Axios** (HTTP client for API calls) 🌐
- **CORS** (Cross-Origin Resource Sharing) 🌍

### 🧪 Development Tools

- **ESLint** (code quality) 🧹
- **SonarQube** (advanced code analysis - optional) 🔍
- **MongoDB Compass** (database GUI) 🧭
- **Insomnia** (API testing) 🔗

## 📊 Database Schema Design

### Users Collection

```typescript
interface User {
  _id: ObjectId
  email: string (unique)
  firstName: string
  lastName: string
  profilePictureUrl?: string // File path to uploaded image or default silhouette
  createdAt: Date
  updatedAt: Date
}
```

### Games Collection

```typescript
interface Game {
  _id: ObjectId;
  name: string; // "Pac-Man", "Tetris", "Space Invaders", "Asteroids"
  description: string;
  imageUrl: string; // Game image/sprite
  category: string; // "Arcade", "Puzzle", "Shooter", etc.
  createdAt: Date;
}
```

### GameSessions Collection

```typescript
interface GameSession {
  _id: ObjectId;
  userId: ObjectId; // Reference to User
  gameId: ObjectId; // Reference to Game
  startTime: Date;
  endTime?: Date;
  playedSeconds: number; // Store as seconds, convert to minutes in UI
  isActive: boolean;
  createdAt: Date;
}
```

**🎯 Key Requirements:**

- **ERD Diagram**: Must be included in project documentation
- **Prisma Integration**: Use Prisma as ORM for MongoDB
- **Timer Logic**: 1 second in demo = 1 minute of game time (for testing)
- **Relationships**: User → many Sessions, Game → many Sessions

## 🗂 Project Structure

**📁 Updated Structure** (see `Filestructure.md` for complete details):

```
final_assesment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/          # Register, Users, Games, Play, Stats (no Leaderboard)
│   │   ├── components/     # Reusable UI components + UserCarousel
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API client utilities
│   │   ├── types/          # TypeScript interfaces
│   │   └── assets/         # Images, icons, animations
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Prisma models
│   │   ├── routes/         # Express routes (no leaderboard routes)
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, error handling, upload, logger.tsx
│   │   ├── utils/          # Database seeding, server utilities
│   │   └── config/         # Database configuration
├── shared/                 # Shared TypeScript types
├── README.md              # Required: Setup and run instructions
└── ERD.md or ERD.png      # Required: Database diagram
```

**🔗 Key Changes:**

- ✅ **No Leaderboard page** - integrated into Stats page
- ✅ **Logger.tsx** in middleware for Winston game session logging
- ✅ **UserCarousel.tsx** component for user selection (Users & Stats pages)
- ✅ **Prisma + Mongoose** both used for database management
- ✅ **README.md** and **ERD documentation** required
  │ │ ├── config/ # Configuration files
  │ │ ├── uploads/ # User uploaded profile pictures
  │ │ └── server.ts
  │ ├── package.json
  │ └── tsconfig.json
  ├── shared/ # Shared types and utilities
  │ └── types.ts
  └── README.md

````

## 🎮 Application Flow

### 1. User Registration Flow

1. User fills registration form (email, firstName, lastName)
2. Optional: Upload profile picture (with default silhouette fallback)
3. Validate data with Zod
4. Store user in MongoDB with default or uploaded profile picture
5. Redirect to user dashboard

### 2. Game Session Flow

1. **User Selection**: From Users Hub, click user profile picture → navigate to Stats page
2. **Game Selection**: From Stats page, click "Play game" → navigate to Games Library
3. **Game Start**: Select from 4 retro games → navigate to Game Session page
4. **Session Tracking**:
   - Display current player profile picture + name + ID
   - Timer runs (1 second = 1 minute for testing)
   - Use Winston logger in `logger.tsx` to track session data
5. **Session End**: Click "Stop" → calculate duration and store in database
6. **Return Flow**: Navigate back to Stats page with updated statistics

### 3. Statistics & Leaderboard Flow

1. **Personal Stats**: Display user's individual game statistics (top section)
2. **Interactive Charts**:
   - Dot graph with hover showing user names
   - Line graph showing weekly playtime per user
   - Both graphs include "Choose game" dropdown selector
3. **Global Leaderboard**: Combined at bottom of Stats page
4. **Action Buttons**: "Choose new player" (→ Users) or "Play game" (→ Games)

## 📋 Development Phases (14 Days - 2 Person Team)

### 👥 Team Approach (Both Members on Both Sides)

**Collaborative Development Strategy:**

- **Pair Programming**: Work together on complex features
- **Feature Rotation**: Take turns leading different components
- **Shared Repository**: Both work in same codebase
- **Daily Sync**: Quick check-ins to avoid conflicts

**Skills Development Areas:**

- **MongoDB & Mongoose**: Database design, models, queries
- **Express & APIs**: Server setup, routes, middleware
- **React & TypeScript**: Components, state management
- **UI/UX**: Tailwind, responsive design, user experience

### Phase 1: Project Setup & Initial Development (Days 1-3)

**Day 1: Project Foundation (Both Members)**

- [ ] Initialize project structure
- [ ] Set up MongoDB connection with Mongoose
- [ ] Create basic Express server with TypeScript
- [ ] Set up React + Vite + TypeScript

**Day 2: Core Models & Setup (Both Members)**

- [ ] Create Mongoose models (User, Game, GameSession)
- [ ] Configure Tailwind CSS v4 (new Vite plugin method)
- [ ] Set up Winston logging
- [ ] Create basic routing structure
- [ ] Test Tailwind styling with simple components

**Day 3: Database & API Foundation (Both Members)**

- [ ] Seed database with 4 retro games
- [ ] Create first API endpoints (users, games)
- [ ] Set up API client with native fetch
- [ ] Test basic frontend-backend connection

### Phase 2: Core Features Development (Days 4-8)

**Backend Tasks:**

- [ ] User registration/CRUD endpoints
- [ ] File upload middleware for profile pictures
- [ ] Game session start/stop endpoints
- [ ] Basic statistics calculation endpoints
- [ ] Error handling middleware
- [ ] Test all APIs with Insomnia

**Frontend Tasks:**

- [ ] User registration form with validation
- [ ] Profile picture upload component (with fallback)
- [ ] Retro games selection page
- [ ] Timer component with start/stop functionality
- [ ] User profile display page
- [ ] Navigation between pages

### Phase 3: Statistics & Advanced Features (Days 9-12)

**Backend Tasks:**

- [ ] Advanced statistics aggregation
- [ ] Leaderboard API endpoints
- [ ] Data validation and security improvements
- [ ] Performance optimization

**Frontend Tasks:**

- [ ] Statistics dashboard with charts (Recharts)
- [ ] Leaderboard component
- [ ] Responsive design improvements
- [ ] Loading states and error handling
- [ ] Retro gaming theme styling

### Phase 4: Testing & Polish (Days 13-14)

**Both Team Members:**

- [ ] Integration testing
- [ ] Bug fixes and performance optimization
- [ ] Final UI/UX polish (focus on core functionality)
- [ ] Documentation completion
- [ ] Deployment preparation
- [ ] **OPTIONAL**: Add animations if all core features are perfect

> **💡 Animation Decision Point**: Only start optional animations if ALL core functionality is complete, tested, and working perfectly!

## 🔧 Setup Instructions

### Prerequisites

- **Node.js (v20.19+ or v22.12+)** - Updated requirement from Vite v6
- **MongoDB** (local or Atlas)
- **Git**

### Backend Setup

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv winston zod multer axios
npm install -D @types/node @types/express @types/multer typescript ts-node nodemon eslint
````

### Frontend Setup (Updated for Vite v6 & Tailwind v4)

```bash
# Create Vite project with React TypeScript template
cd client
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install react-router-dom zod recharts

# Install Tailwind CSS v4 (New Vite Plugin Method)
npm install tailwindcss @tailwindcss/vite

# Install development dependencies
npm install -D @types/react @types/react-dom
```

### Tailwind CSS v4 Configuration (New Method)

**1. Update `vite.config.ts`:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // New Tailwind Vite plugin
  ],
});
```

**2. Update your main CSS file (e.g., `src/index.css`):**

```css
@import "tailwindcss";

/* Your custom styles here */
```

**3. No need for `tailwind.config.js` file anymore!**

- Tailwind v4 uses the new Vite plugin approach
- Configuration is simplified and automatic

## � API Client Setup (Axios Recommended!)

- **Axios**: HTTP client for frontend-backend API calls
- **Prisma**: Database ORM (Object-Relational Mapping) for database queries (backend)

### 🔧 **API Client Implementation with Axios**

**Install Axios:**

```bash
npm install axios
```

**Create API Client Utility:**

```typescript
// frontend/src/api/apiClient.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Usage example:
// apiClient.get("/users").then(res => ...)
// apiClient.post("/users", userData)
```

**Usage in React Components:**

```typescript
// pages/UsersHub.tsx
import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export const UsersHub = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await apiClient.getUsers();
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};
```

**Custom Hooks for API Calls:**

```typescript
// hooks/useUsers.ts
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};

// Usage:
const { users, loading, error } = useUsers();
```

**File Upload with Fetch:**

```typescript
// File upload for profile pictures
async uploadProfilePicture(userId: string, file: File) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_BASE_URL}/users/${userId}/upload-avatar`, {
    method: 'POST',
    body: formData, // Don't set Content-Type for FormData
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}
```

### 🎯 **Why This Approach is Perfect for Your Project:**

✅ **Simpler Learning Curve**: You already know Prisma, now just learn fetch  
✅ **Less Dependencies**: Cleaner package.json  
✅ **Modern Practice**: Industry trend toward native APIs  
✅ **Better for Portfolio**: Shows you understand core web APIs  
✅ **Easier Debugging**: Fewer abstraction layers

**Bottom Line**: For your project scope, native `fetch` is perfect! 🎯

## 🎮 Retro Games Data## �🎮 Retro Games Data

```typescript
const retroGames = [
  {
    name: "Pac-Man",
    description:
      "Classic arcade maze game where you eat dots while avoiding ghosts",
    icon: "🟡", // Will be replaced with proper sprite
    category: "Arcade",
  },
  {
    name: "Tetris",
    description: "Puzzle game where you arrange falling blocks to clear lines",
    icon: "🟦", // Will be replaced with proper sprite
    category: "Puzzle",
  },
  {
    name: "Space Invaders",
    description: "Shoot waves of descending alien invaders",
    icon: "👾", // Will be replaced with proper sprite
    category: "Shooter",
  },
  {
    name: "Asteroids",
    description: "Navigate space while destroying asteroids and UFOs",
    icon: "🚀", // Will be replaced with proper sprite
    category: "Shooter",
  },
];
```

## 📝 API Endpoints Overview

### Users

- `POST /api/users` - Create user
- `POST /api/users/upload-avatar` - Upload profile picture
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Games

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game by ID

### Game Sessions

- `POST /api/sessions/start` - Start game session
- `POST /api/sessions/stop` - Stop game session

### Game Sessions

- `POST /api/sessions/start` - Start game session
- `POST /api/sessions/stop` - Stop game session
- `GET /api/sessions/user/:userId` - Get user's sessions
- `GET /api/sessions/statistics/:userId` - Get user statistics

### Statistics (Integrated - No Separate Leaderboard Routes)

- `GET /api/statistics/user/:userId` - Get user statistics + leaderboard data
- `GET /api/statistics/games` - Get game popularity stats
- `GET /api/statistics/global` - Get global leaderboard data (integrated into Stats page)
- `GET /api/statistics/charts/:gameId` - Get chart data for specific game

## 📱 Application Pages & Navigation Structure

### 🗂️ Page Names & Routes (Based on Figma Mockups)

**1. Registration Page** (`/register`)

- **Purpose**: New user signup with profile picture upload
- **Key Features**: Form validation, file upload, weather widget
- **Figma Reference**: User registration form page

**2. Users Hub** (`/users`)

- **Purpose**: View all registered users, select active player
- **Key Features**: User grid display, "Add User" button, **UserCarousel** component, weather widget
- **Figma Reference**: Grid of user avatars page with carousel navigation

**3. Games Library** (`/games`)

- **Purpose**: Browse and select from 4 retro games
- **Key Features**: Game selection grid, "Choose a game to play" prompt, weather widget
- **Figma Reference**: 4 retro game icons page

**4. Play Session** (`/play/:gameId`)

- **Purpose**: Active game timer with start/stop controls
- **Key Features**: Live timer, game info, session controls, weather widget
- **Figma Reference**: Timer display with STOP button

**5. User Stats Dashboard** (`/stats/:userId`)

- **Purpose**: Personal statistics with integrated global leaderboard
- **Key Features**: Time bars, percentages, total time, **UserCarousel** for switching players, integrated leaderboard section
- **Figma Reference**: User profile with detailed statistics + leaderboard at bottom

### 🌤️ Weather API Integration

**Weather Widget Requirements:**

- **Display**: Date, temperature, weather icon
- **Format**: "Wednesday, 15 Oct 2025" + "10°C"
- **Position**: Top-left corner on ALL pages
- **API**: Use OpenWeatherMap or similar free API
- **Update**: Real-time or periodic refresh

### 🔍 Search Bar Integration

**Global Search Requirements:**

- **Position**: Top-center/right on ALL pages (as shown in Figma) 🎯
- **Placeholder**: "search" (lowercase, as shown in mockups)
- **Functionality**: Search across users and games
- **Search Targets**:
  - 👤 **User Names**: FirstName + LastName matching
  - 🎮 **Game Names**: "Pac-Man", "Tetris", "Space Invaders", "Asteroids"
  - 📊 **Quick Navigation**: Jump to user stats or game selection

**Search Component Features:**

```typescript
interface SearchResult {
  type: "user" | "game";
  id: string;
  name: string;
  route: string; // Navigate to user stats or game page
}

// Search functionality hints
const searchItems = async (query: string) => {
  // Search users: firstName + lastName contains query
  // Search games: name contains query
  // Return unified results for dropdown
};
```

**Search UX Flow:**

```
🔍 User types "pac" → Shows dropdown:
├── 🎮 Pac-Man (→ Games Library)
├── 👤 Pacifica Jones (→ User Stats)
└── 👤 Pascal Smith (→ User Stats)
```

**Weather Component:**

```typescript
interface WeatherData {
  date: string;
  temperature: number;
  description: string;
  icon?: string;
}

// Weather API integration
const fetchWeather = async () => {
  // Implementation hint: Use geolocation + weather API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=${API_KEY}`
  );
  return response.json();
};
```

### 🧭 Navigation Flow

```
Registration → Users Hub → Games Library → Game Session
                  ↓           ↓             ↓
              User Stats ← Global Stats ← [Back Navigation]
```

### 📍 Page-Specific Requirements

**All Pages Must Include:**

- ✅ Weather widget (top-left) 🌤️
- ✅ Global search bar (top-center/right) 🔍
- ✅ Consistent navigation/header 🧭
- ✅ Retro gaming theme styling 🎮
- ✅ Responsive design 📱

**Navigation States:**

- Active page highlighting
- Breadcrumb navigation
- User context awareness (who's logged in)

## 🎨 UI Components Needed

### Core Components

- `UserRegistrationForm` - With optional file upload and Zod validation
- `UserProfile` - Display with avatar (default silhouette or uploaded)
- `UserCard` - Individual user display card for Users hub
- `UserCarousel` - Scrollable user selector with arrow navigation (Users.tsx & Stats.tsx)
- `RetroGameCard` - Styled for retro gaming theme
- `GamesList` - Grid of 4 retro games 🎮
- `Timer` - Digital timer with retro styling (1 sec = 1 min demo) ⏱️
- `SessionControls` - Start/Stop/Exit buttons with user info display ▶️⏹️
- `StatisticsChart` - Multiple chart types using Recharts 📊
  - Bar charts for time played
  - Pie/donut charts for percentages
  - Dot graphs with hover functionality
  - Line graphs for weekly progression
- `LeaderboardTable` - Integrated into Stats page (not separate) 🏆
- `NavigationBar` - Game-themed navigation 🧭
- `WeatherWidget` - Live weather display (all pages) 🌤️
- `GlobalSearch` - Universal search with dropdown results 🔍

### Utility Components

- `LoadingSpinner` - Retro-styled loader ⏳
- `ErrorMessage` - Game-themed error display ❌
- `Modal` - For confirmations 💬
- `Button` - Retro game button styling 🎯
- `Input` - Styled form inputs with validation 📝
- `Card` - Consistent card layout 🗃️
- `AvatarUpload` - File upload with preview and validation

### 🎬 Animated Components ⚡ **OPTIONAL**

> **⚠️ Implement only after all core components are working perfectly!**

- `AnimatedSpeechBubble` - Pop-in tooltips and guidance 💬
- `GameMascot` - Character animations (Pac-Man, etc.) 🟡
- `AnimatedButton` - Hover/click effects with retro glow 🎯
- `AnimatedTimer` - Pulsing timer with milestone effects ⏱️
- `PageTransition` - Smooth page navigation animations 🔄
- `CelebrationEffect` - Confetti for achievements 🎉
- `RetroLoader` - Game-themed loading animations ⏳

### Utility Components

- `LoadingSpinner` - Retro-styled loader ⏳
- `ErrorMessage` - Game-themed error display ❌
- `Modal` - For confirmations 💬
- `Button` - Retro game button styling 🎯
- `Input` - Styled form inputs 📝
- `Card` - Consistent card layout 🗃️
- `AvatarUpload` - File upload with preview

## 🔍 Key Questions to Consider

1. ✅ **Profile Pictures**: File upload with default silhouette fallback
2. ✅ **Game Data**: 4 classic retro games (Pac-Man, Tetris, Space Invaders, Asteroids)
3. ✅ **Session Management**: Simple start/stop timers (no pause functionality)
4. **Statistics Priority**: Start with basic stats, expand if time permits
5. **User Experience**: One active session at a time (simpler to implement)
6. ✅ **Team Coordination**: Shared `/shared` folder for TypeScript interfaces
7. ✅ **File Uploads**: PNG format, basic validation, no resizing needed

## 📊 Statistics & UI Requirements (Enhanced from PDF Requirements)

### 📈 Required Statistics Dashboard Components

**1. Personal Statistics Section (Top):**

- User avatar (silhouette or uploaded image)
- First Name + Last Name display
- Bar graph: minutes played per game
- Pie/donut chart: percent of total time per game
- Component showing total time played
- Action buttons: "Choose new player" | "Play game"

**2. Advanced Interactive Charts:**

- **Dot Graph with Hover**: Shows user names on hover over data points
- **Line Graph**: Each line represents a user's weekly playtime progression
- **Game Selector**: Both graphs include "Choose game" dropdown to filter by specific games
- **Sessions Analytics**: Graph showing number of sessions per game + average session length

**3. Global Leaderboard Section (Bottom):**

- **Leaderboard Table**: Name | Game | Time played columns
- **Comparative Charts**:
  - Bar graph: total time per game across all users
  - Multi-user comparison visualizations
- **Top Players**: Ranking system across different games

**4. User Interface Elements:**

- **UserCarousel** component for scrollable user selection (Users page & Stats page)
- Responsive design for all chart components
- Real-time updates when new sessions are completed

**5. Action Buttons:**

- "Choose new player" - Switch between users
- "Play new Game" - Start new game session
- Styled as prominent action buttons

**6. Game Icons:**

- Small retro game sprites/icons next to each game
- Consistent styling across all game entries

### 📱 Layout Structure (From Figma)

```
┌─────────────────────────────────────────────────┐
│ [User Avatar]  [Game Time Bars 0-100min]      │
│ FirstName      Game 1 ████████████ 40 min      │
│ LastName       Game 2 ████████████ 53 min      │
│                Game 3 ████████     26 min      │
│                Game 4 ████████████ 45 min      │
├─────────────────────────────────────────────────┤
│ [Game %]              [Total Time]              │
│ 🎮 Game 1  40%        164 min                  │
│ 🎮 Game 2  53%        Total time played        │
│ 🎮 Game 3  26%                                 │
│ 🎮 Game 4  45%        [Choose new player]      │
│                       [Play new Game]          │
└─────────────────────────────────────────────────┘
```

### 💾 Data Requirements for Statistics

**User Statistics Query:**

```typescript
// Example aggregation for user stats
const getUserStats = async (userId: string) => {
  const stats = await GameSession.aggregate([
    { $match: { userId: ObjectId(userId), isActive: false } },
    {
      $group: {
        _id: "$gameId",
        totalMinutes: { $sum: "$durationMinutes" },
        sessionCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "games",
        localField: "_id",
        foreignField: "_id",
        as: "game",
      },
    },
  ]);

  const totalTime = stats.reduce((sum, game) => sum + game.totalMinutes, 0);

  return {
    totalMinutes: totalTime,
    gameStats: stats.map((game) => ({
      name: game.game[0].name,
      minutes: game.totalMinutes,
      percentage: Math.round((game.totalMinutes / totalTime) * 100),
    })),
  };
};
```

### 🎨 UI Component Specifications

**GameTimeBar Component:**

- Props: `gameName`, `minutes`, `maxMinutes` (for scale)
- Visual: Progress bar with fill percentage
- Text: Game name + minutes display

**GamePercentageItem Component:**

- Props: `gameIcon`, `gameName`, `percentage`
- Visual: Icon + name + percentage in circular or text format

**TotalTimeDisplay Component:**

- Props: `totalMinutes`
- Format: Large number + "Total time played" label
- Position: Prominent center area

**UserSwitcher Component:**

- Dropdown or modal for selecting different users
- Integration with "Choose new player" button

### Personal Statistics (Detailed)

- ✅ **Total time played per game** (bar chart 0-100+ min)
- ✅ **Percentage distribution per game** (circular progress)
- ✅ **Total accumulated time** (prominent display)
- Game session count per user
- Most played game identification
- Playing patterns over time

### Comparative Statistics

- Global leaderboard (total time ranking)
- Game popularity rankings
- Average playtime comparisons
- Active users today/week

## 🍃 MongoDB + Mongoose Deep Dive

### Why MongoDB for This Project?

- **Document-based**: Perfect for user profiles with nested data
- **Flexible Schema**: Easy to add fields as project evolves
- **JSON-like**: Natural fit with JavaScript/TypeScript
- **Visual Learning**: MongoDB Compass provides excellent visualization

### Step-by-Step MongoDB Setup

#### 1. Installation & Setup (Day 1)

```bash
# Install MongoDB locally (macOS)
brew install mongodb/brew/mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Verify installation
mongosh # MongoDB shell
```

#### 2. Mongoose Integration (Day 1-2)

```typescript
// server/src/config/database.ts
import mongoose from "mongoose";
import winston from "winston";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/gametracker"
    );
    winston.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    winston.error("Database connection failed:", error);
    process.exit(1);
  }
};
```

#### 3. Schema Design Breakdown

**User Schema (Start Here)**

```typescript
// server/src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "/uploads/default-avatar.png",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt/updatedAt
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
```

**Game Schema (Simple & Static)**

```typescript
// server/src/models/Game.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IGame extends Document {
  name: string;
  description: string;
  icon: string;
  category: string;
}

const GameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model<IGame>("Game", GameSchema);
```

**GameSession Schema (The Heart of the App)**

```typescript
// server/src/models/GameSession.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IGameSession extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  durationMinutes: number;
  isActive: boolean;
}

const GameSessionSchema = new Schema<IGameSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    durationMinutes: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GameSession = mongoose.model<IGameSession>(
  "GameSession",
  GameSessionSchema
);
```

### Learning MongoDB Compass

#### Visual Database Exploration

1. **Connect**: `mongodb://localhost:27017`
2. **Create Database**: `gametracker`
3. **View Collections**: Users, Games, GameSessions
4. **Query Builder**: Visual query creation
5. **Data Visualization**: Built-in charts for statistics

#### Key Compass Features for Your Project

- **Document Viewer**: See your user data structure
- **Query Performance**: Optimize slow queries
- **Index Management**: Speed up user lookups
- **Real-time Monitoring**: Watch data changes

### Database Seeding Strategy

#### Create Seed Data (Day 2)

```typescript
// server/src/utils/seedDatabase.ts
import { Game } from "../models/Game";
import winston from "winston";

export const seedGames = async () => {
  try {
    const gameCount = await Game.countDocuments();
    if (gameCount > 0) {
      winston.info("Games already seeded");
      return;
    }

    const games = [
      {
        name: "Pac-Man",
        description:
          "Classic arcade maze game where you eat dots while avoiding ghosts",
        icon: "/icons/pacman.png",
        category: "Arcade",
      },
      {
        name: "Tetris",
        description:
          "Puzzle game where you arrange falling blocks to clear lines",
        icon: "/icons/tetris.png",
        category: "Puzzle",
      },
      {
        name: "Space Invaders",
        description: "Shoot waves of descending alien invaders",
        icon: "/icons/space-invaders.png",
        category: "Shooter",
      },
      {
        name: "Asteroids",
        description: "Navigate space while destroying asteroids and UFOs",
        icon: "/icons/asteroids.png",
        category: "Shooter",
      },
    ];

    await Game.insertMany(games);
    winston.info("Games seeded successfully");
  } catch (error) {
    winston.error("Error seeding games:", error);
  }
};
```

### Simple Statistics Approach

#### Basic Queries for Statistics

```typescript
// Get user's total time per game
const getUserGameStats = async (userId: string) => {
  return await GameSession.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId), isActive: false },
    },
    {
      $group: {
        _id: "$gameId",
        totalMinutes: { $sum: "$durationMinutes" },
        sessionCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "games",
        localField: "_id",
        foreignField: "_id",
        as: "game",
      },
    },
  ]);
};

// Simple leaderboard
const getLeaderboard = async () => {
  return await GameSession.aggregate([
    { $match: { isActive: false } },
    {
      $group: {
        _id: "$userId",
        totalMinutes: { $sum: "$durationMinutes" },
      },
    },
    { $sort: { totalMinutes: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);
};
```

## 🎯 Grading Criteria & Requirements (Target: VG)

### **VG (Väl Godkänt) Requirements:**

**Functionality:**

- ✅ All pages & timers work perfectly; sessions saved accurately
- ✅ Charts update in real-time and display correct data
- ✅ Timer logic: 1 second = 1 minute (for testing/demo purposes)

**Data & Backend:**

- ✅ Prisma used correctly with MongoDB
- ✅ ERD diagram included and matches implementation
- ✅ Proper database relationships and schema design

**Validation & Types:**

- ✅ Zod validation implemented for all forms and API endpoints
- ✅ Strong TypeScript types throughout the application
- ✅ Input validation with clear error messages

**Code Quality & Tooling:**

- ✅ ESLint configured and code follows standards
- ✅ SonarQube analysis (optional but recommended)
- ✅ Clean, well-documented commits
- ✅ Proper project structure and file organization

**UI/UX & Accessibility:**

- ✅ Clear labels and visual feedback
- ✅ Responsive design that works on different screen sizes
- ✅ Keyboard accessible navigation
- ✅ Loading states and error handling

**Statistics & Charts:**

- ✅ All required charts accurate and interactive
- ✅ Hover effects and dropdown selectors working
- ✅ Real-time updates when data changes

**Documentation:**

- ✅ Complete README.md with setup instructions
- ✅ ERD diagram included in repository
- ✅ API documentation or demo screenshots

## 🧠 ADHD-Friendly Development Workflow

### **Work in Small Steps:**

- 🎯 **Build one page fully** before starting the next
- ✅ **Use checklists** - check off items as you finish them
- 🔄 **30-45 minute work blocks** with short breaks
- 📝 **Save code often** to avoid losing progress

### **Component Organization:**

- 🏷️ **Keep components small** and named clearly (e.g., `TimerCard`, `LeaderboardTable`)
- 📋 **Show labels and placeholders** in forms (helps non-native speakers)
- 🎨 **Add visual feedback** - loading spinners, success messages, validation text
- 🖱️ **Use clear color contrast** and large clickable targets

### **Development Strategy:**

- 🔍 **Start with core functionality** - get the basic flow working first
- 📊 **Add charts and statistics** after basic CRUD operations work
- 🎨 **Polish and animations** come last (if time permits)
- 🐛 **Test frequently** - don't build too much before testing

### **Team Communication:**

- 📱 **Demo progress daily** - show what's working
- 💬 **Use specific page names** when discussing issues
- 🔄 **Pair program** on complex features
- 📝 **Document decisions** in commit messages

## 📋 Project Submission Requirements

### **Required Deliverables:**

- 🔗 **Repository link** (GitHub) with complete source code
- 📖 **README.md** with clear setup and run instructions
- 🗄️ **Database connection** working (MongoDB with Prisma)
- 📊 **ERD diagram** included in repository or documentation
- ⚡ **All pages implemented** and navigable
- 🔍 **Zod validation** for at least registration and session endpoints
- 🧹 **ESLint configuration** file present and code follows standards
- 💾 **Evidence of data persistence** - sessions save and display in statistics

### **Optional Enhancements:**

- 🎥 **Short video** or screenshots showing key functionality
- 🎨 **Animations and micro-interactions** (if time permits)
- 📱 **Mobile responsiveness** optimization
- 🔐 **Advanced error handling** and user feedback

## 🚀 Next Steps

### Immediate Actions (Today)

1. **Install MongoDB** locally
2. **Open MongoDB Compass** and connect
3. **Create project structure** as outlined above
4. **Set up shared Git repository**

### Day 1-2 Focus

1. **Database Connection**: Get MongoDB talking to your Express server
2. **First Model**: Create and test User model
3. **Seed Games**: Add the 4 retro games to database
4. **Compass Exploration**: Use visual tools to understand your data

### Learning Resources

- **MongoDB University**: Free courses
- **Mongoose Docs**: Essential for schema design
- **MongoDB Compass Tutorials**: Visual database management

---

_Remember: Start simple, iterate, and use MongoDB Compass to visualize your progress. The visual feedback will help you understand database relationships!_

---

## 🎬 Animation & Interactive Features ⚡ **OPTIONAL ENHANCEMENT**

> **🎯 Priority Level**: Nice-to-have | **⏰ Timeline**: Implement if time permits after core functionality
>
> **💡 Recommendation**: Focus on core features first (user management, game sessions, statistics), then add animations as polish in final days if schedule allows.

### ✨ **Optional Animated Elements Strategy**

Adding delightful animations will make your retro game app feel alive and engaging! Here's how to implement them **if you have extra time**:

### 🎨 **Animation Technologies**

**Lottie Animations** (Recommended)

- **React-Lottie**: `npm install react-lottie-player`
- **LottieFiles**: Free animations library
- **Custom Animations**: Your Illustrator → After Effects → Lottie workflow
- **Performance**: Lightweight and scalable

**SVG Animations** (Alternative)

- **Framer Motion**: `npm install framer-motion`
- **SVGator exports**: Direct SVG animation integration
- **CSS Animations**: Simple keyframe animations

### 🎮 **Planned Animated Features**

#### **1. Speech Bubbles & Tooltips** 💬

```typescript
// Component examples
<AnimatedTooltip
  text="Choose a game to play!"
  trigger="hover"
  animation="bounceIn"
  position="top"
/>

<SpeechBubble
  message="Welcome to the game hub!"
  autoShow={true}
  delay={1000}
  character="retro-mascot"
/>
```

**Implementation Ideas:**

- **Games Library**: "Choose a game to play!" bubble
- **Registration**: "Create your player profile!"
- **Stats Page**: "Amazing progress!" celebration
- **Empty States**: "No games played yet" with encouraging message

#### **2. Retro Game Characters** 🟡

```typescript
// Pac-Man eating dots animation
<LottiePlayer
  src="/animations/pacman-eating.json"
  autoplay
  loop
  style={{ width: '60px', height: '60px' }}
/>

// Game-specific mascots
<GameMascot
  game="pac-man"
  animation="idle" // idle, excited, celebrating
  trigger="hover"
/>
```

**Character Animations:**

- **Pac-Man**: Eating dots, mouth opening/closing
- **Tetris**: Falling blocks stacking
- **Space Invaders**: UFO flying, laser beams
- **Asteroids**: Spaceship rotating, asteroids floating

#### **3. UI Micro-Interactions** ⚡

```typescript
// Button hover animations
<AnimatedButton
  variant="retro"
  hoverEffect="glow"
  clickEffect="bounce"
>
  Start Game
</AnimatedButton>

// Timer pulsing animation
<AnimatedTimer
  time={currentTime}
  pulseOnSecond={true}
  glowColor="neon-green"
/>
```

**Micro-Animation Examples:**

- **Buttons**: Glow on hover, bounce on click
- **Timer**: Pulse every second, color change on milestones
- **Charts**: Bars animate in from left to right
- **Cards**: Hover lift effect, smooth transitions

#### **4. Page Transitions** 🔄

**Framer Motion Page Slides** - Complete Implementation:

```typescript
// App.tsx - Main router setup with AnimatePresence
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/register"
          element={
            <PageWrapper direction="slideUp">
              <RegistrationPage />
            </PageWrapper>
          }
        />
        <Route
          path="/users"
          element={
            <PageWrapper direction="slideDown">
              <UsersHub />
            </PageWrapper>
          }
        />
        <Route
          path="/games"
          element={
            <PageWrapper direction="slideLeft">
              <GamesLibrary />
            </PageWrapper>
          }
        />
        <Route
          path="/play/:gameId"
          element={
            <PageWrapper direction="slideRight">
              <GameSession />
            </PageWrapper>
          }
        />
        <Route
          path="/stats/:userId"
          element={
            <PageWrapper direction="slideUp">
              <UserStatsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PageWrapper direction="slideDown">
              <GlobalStatsPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
```

**PageWrapper Component** (The Magic Happens Here):

```typescript
// components/PageWrapper.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  direction: "slideUp" | "slideDown" | "slideLeft" | "slideRight";
}

const slideVariants = {
  slideUp: {
    initial: { y: "100vh", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100vh", opacity: 0 },
  },
  slideDown: {
    initial: { y: "-100vh", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100vh", opacity: 0 },
  },
  slideLeft: {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  },
  slideRight: {
    initial: { x: "-100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100vw", opacity: 0 },
  },
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, direction }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideVariants[direction]}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.5,
      }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
```

**Smart Navigation Direction Logic:**

```typescript
// hooks/useNavigationDirection.ts
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const pageOrder = [
  "/register",
  "/users",
  "/games",
  "/play",
  "/stats",
  "/leaderboard",
];

export const useNavigationDirection = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState("");

  const getDirection = (from: string, to: string) => {
    const fromIndex = pageOrder.findIndex((path) => from.includes(path));
    const toIndex = pageOrder.findIndex((path) => to.includes(path));

    if (fromIndex < toIndex) {
      return "slideLeft"; // Moving forward
    } else if (fromIndex > toIndex) {
      return "slideRight"; // Moving backward
    } else {
      return "slideUp"; // Default
    }
  };

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);

  return getDirection(previousPath, location.pathname);
};
```

**Alternative: Simple Navigation Triggers**

```typescript
// components/NavigationButton.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: ReactNode;
  slideDirection?: "up" | "down" | "left" | "right";
}

const NavigationButton: React.FC<NavButtonProps> = ({
  to,
  children,
  slideDirection = "up",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Add custom data attribute for direction
    document.body.setAttribute("data-page-direction", slideDirection);
    navigate(to);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="retro-button"
    >
      {children}
    </motion.button>
  );
};

// Usage:
<NavigationButton to="/games" slideDirection="down">
  🎮 Choose Game
</NavigationButton>;
```

**What You Need to Implement Page Slides:**

1. **Install Framer Motion**: `npm install framer-motion`
2. **Wrap Router with AnimatePresence**: Essential for exit animations
3. **Create PageWrapper Component**: Handles the slide animations
4. **Define Slide Variants**: Up, down, left, right directions
5. **Add to Each Route**: Wrap page components with PageWrapper

**Retro Gaming Slide Styles:**

```typescript
// Enhanced transitions with retro feel
const retroSlideVariants = {
  slideUp: {
    initial: {
      y: "100vh",
      opacity: 0,
      filter: "blur(10px)", // Retro CRT effect
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        staggerChildren: 0.1, // Animate children in sequence
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      filter: "blur(5px)",
      transition: { duration: 0.3 },
    },
  },
};
```

// Loading states
<LoadingAnimation
type="retro-spinner" // pac-man, tetris-blocks, space-ship
message="Loading your stats..."
/>

```

### 📁 **Animation Assets Structure**

```

client/src/assets/
├── animations/
│ ├── lottie/
│ │ ├── pacman-eating.json
│ │ ├── tetris-falling.json
│ │ ├── space-invader-flying.json
│ │ ├── speech-bubble-pop.json
│ │ └── celebration-confetti.json
│ ├── svg/
│ │ ├── game-icons-animated.svg
│ │ └── ui-elements.svg
│ └── gifs/ (fallback)
│ └── retro-loader.gif

````

### 🛠 **Implementation Setup**

**Install Animation Libraries:**

```bash
# Lottie for complex animations
npm install react-lottie-player

# Framer Motion for UI animations
npm install framer-motion

# Optional: React Spring for physics-based animations
npm install react-spring
````

**Basic Animation Component:**

```typescript
// components/AnimatedElement.tsx
import { LottiePlayer } from "react-lottie-player";
import { motion } from "framer-motion";

interface AnimatedSpeechBubbleProps {
  message: string;
  autoShow?: boolean;
  delay?: number;
}

export const AnimatedSpeechBubble: React.FC<AnimatedSpeechBubbleProps> = ({
  message,
  autoShow = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", bounce: 0.5 }}
      className="relative bg-yellow-300 rounded-lg p-3 text-sm font-bold"
    >
      {message}
      <div className="absolute bottom-[-8px] left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-yellow-300" />
    </motion.div>
  );
};
```

### 🎯 **Optional Animation Timeline** ⚠️

> **⚡ ONLY implement animations AFTER core functionality is complete and working!**

**📋 Core Features Must Be Done First:**
✅ User registration and management  
✅ Game selection and timer functionality  
✅ Statistics dashboard with basic charts  
✅ All 5 pages working with navigation  
✅ Database operations stable

**🎨 Optional Enhancement Phases (If Time Permits):**

**Optional Phase 1 (Days 11-12): Basic Polish** _(Only if core is 100% done)_

- [ ] Install animation libraries
- [ ] Simple button hover effects
- [ ] Basic loading animations
- [ ] Smooth page transitions

**Optional Phase 2 (Day 13): Advanced Features** _(Only if Phase 1 complete)_

- [ ] Create/import Pac-Man eating animation
- [ ] Add speech bubbles for guidance
- [ ] Timer pulse animations
- [ ] Chart loading animations

**Optional Phase 3 (Day 14): Final Polish** _(Only if everything else perfect)_

- [ ] Celebration animations for achievements
- [ ] Micro-interactions throughout app
- [ ] Easter eggs and hidden animations
- [ ] Performance optimization

**Phase 4 (Days 13-14): Final Polish**

- [ ] Easter eggs and hidden animations
- [ ] Accessibility considerations
- [ ] Performance testing
- [ ] Animation refinements

### 🎨 **Design Integration Tips**

**Your Illustrator → Lottie Workflow:**

1. **Design in Illustrator**: Create vector game characters
2. **Import to After Effects**: Add movement and timing
3. **Export with Bodymovin**: Generate Lottie JSON files
4. **Test in React**: Import and implement animations

**Animation Best Practices:**

- **Performance**: Keep animations under 2MB
- **Accessibility**: Respect `prefers-reduced-motion`
- **Loading**: Show animations only after critical content loads
- **Context**: Match animation style to retro gaming theme

### 🔥 **Creative Animation Ideas**

**Game-Specific Features:**

- **Pac-Man**: Dots disappear as timer counts up
- **Tetris**: Completed rows animate away in stats
- **Space Invaders**: Laser beam effects on button clicks
- **Asteroids**: Floating debris background elements

**Contextual Animations:**

- **New High Score**: Confetti and celebration
- **First Game**: Tutorial animations and guidance
- **Empty States**: Encouraging mascot animations
- **Errors**: Friendly error character animations
