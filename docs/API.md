```markdown
# API Contract

✅ What’s Included:
CRUD endpoints for Users, Games, GameSessions
Filtering via query parameters
Statistics endpoints for user, games, global leaderboard, and charts
Profile picture upload endpoint (no game image upload, as required)
Clear response shapes and request examples

❗ What’s Missing/Needs Adjustment:
Authentication endpoints (register, login, get current user) are not yet included—add these for completeness.
Formatting: There are some formatting issues and duplicated summary sections at the end. Clean up extra lines and ensure each endpoint is clearly separated.
Consistency: Make sure all endpoints use plural resource names (users, games, gameSessions).
Summary: Keep only one summary section at the end.

# ✅ Summary

- API contract covers all CRUD operations for Users, Games, and GameSessions.
- Filtering is supported via query parameters for collections.
- Statistics endpoints provide data for dashboards and charts.
- Profile picture upload endpoint included (no game image upload).
- Authentication endpoints for registration, login, and current user.
- All endpoints follow RESTful conventions and match project requirements.
- Ready for frontend and backend teams to implement and test with tools like Insomnia or Compass.
```

---

## User Endpoints

### `GET /users`

- **Description:** Get all users, optionally filter by firstName, lastName, or email.
- **Query Params:**
  - `firstName` (optional, string)
  - `lastName` (optional, string)
  - `email` (optional, string)
- **Response:**  
  Array of user objects.
  ```json
  [
    {
      "_id": "123",
      "email": "johndoe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "profilePictureUrl": "/uploads/john.jpg",
      "createdAt": "2024-10-26T12:00:00Z",
      "updatedAt": "2024-10-26T12:00:00Z"
    }
    // ...more users
  ]
  ```

### `GET /users/:id`

- **Description:** Get user by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**  
  User object.

### `POST /users`

- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "email": "janedoe@example.com",
    "password": "securePassword123",
    "firstName": "Jane",
    "lastName": "Doe"
  }
  ```
- **Response:**  
  Created user object.
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "123",
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "profilePictureUrl": "/uploads/jane.jpg"
    },
    "token": "jwt-token-string"
  }
  ```

### `PUT /users/:id`

- **Description:** Update user by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Request Body:**  
  Fields to update.
- **Response:**  
  Updated user object.

### `DELETE /users/:id`

- **Description:** Delete user by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**
  ```json
  { "message": "User deleted successfully" }
  ```

---

## Game Endpoints

### `GET /games`

- **Description:** Get all games, optionally filter by category or name.
- **Query Params:**
  - `category` (optional, string)
  - `name` (optional, string)
- **Response:**  
  Array of game objects.

### `GET /games/:id`

- **Description:** Get game by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**  
  Game object.

### `POST /games`

- **Description:** Create a new game.
- **Request Body:**
  ```json
  {
    "name": "Pac-Man",
    "description": "Classic arcade game",
    "imageUrl": "/uploads/pacman.jpg",
    "category": "Arcade"
  }
  ```
- **Response:**  
  Created game object.

### `PUT /games/:id`

- **Description:** Update game by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Request Body:**  
  Fields to update.
- **Response:**  
  Updated game object.

### `DELETE /games/:id`

- **Description:** Delete game by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**
  ```json
  { "message": "Game deleted successfully" }
  ```

---

## GameSession Endpoints

### `GET /gameSessions`

- **Description:** Get all game sessions, optionally filter by userId, gameId, isActive, or date range.
- **Query Params:**
  - `userId` (optional, string)
  - `gameId` (optional, string)
  - `isActive` (optional, boolean)
  - `startTime` (optional, ISO date string)
  - `endTime` (optional, ISO date string)
- **Response:**  
  Array of gameSession objects.

### `GET /gameSessions/:id`

- **Description:** Get game session by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**  
  GameSession object.

### `POST /gameSessions`

- **Description:** Create a new game session.
- **Request Body:**
  ```json
  {
    "userId": "user123",
    "gameId": "game456",
    "startTime": "2024-10-26T12:00:00Z",
    "playedSeconds": 0,
    "isActive": true
  }
  ```
- **Response:**  
  Created gameSession object.

### `PUT /gameSessions/:id`

- **Description:** Update game session by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Request Body:**  
  Fields to update (e.g., `endTime`, `playedSeconds`, `isActive`)
- **Response:**  
  Updated gameSession object.

### `DELETE /gameSessions/:id`

- **Description:** Delete game session by ID.
- **Request Params:**
  - `id` (string, MongoDB ObjectId)
- **Response:**
  ```json
  { "message": "Game session deleted successfully" }
  ```

---

## Statistics Endpoints

### `GET /statistics/user/:userId`

- **Description:** Get statistics for a specific user (total time, per-game breakdown, percentages).
- **Request Params:**
  - `userId` (string, MongoDB ObjectId)
- **Response:**
  ```json
  {
    "totalMinutes": 164,
    "gameStats": [
      { "name": "Pac-Man", "minutes": 40, "percentage": 24 },
      { "name": "Tetris", "minutes": 53, "percentage": 32 }
      // ...
    ]
  }
  ```

### `GET /statistics/games`

- **Description:** Get statistics for all games (popularity, total time played).
- **Response:**
  ```json
  [
    { "name": "Pac-Man", "totalMinutes": 400 },
    { "name": "Tetris", "totalMinutes": 530 }
    // ...
  ]
  ```

### `GET /statistics/global`

- **Description:** Get global leaderboard data (top players, total time).
- **Response:**
  ```json
  [
    {
      "userId": "user123",
      "userName": "Nicklas Svensson",
      "game": "Pac-Man",
      "timePlayed": "2 hours 20 minutes"
    }
    // ...
  ]
  ```

### `GET /statistics/charts/:gameId`

- **Description:** Get chart data for a specific game (sessions, average session length, weekly progression).
- **Request Params:**
  - `gameId` (string, MongoDB ObjectId)
- **Response:**
  ```json
  {
    "sessions": [
      { "userId": "user123", "count": 6, "totalMinutes": 31 }
      // ...
    ],
    "weeklyProgression": [
      { "userId": "user123", "week": "2024-W42", "minutes": 50 }
      // ...
    ]
  }
  ```

---

## File Upload Endpoint

### `POST /upload/profile-picture`

- **Description:** Upload a profile picture for a user during registration or profile update.
- **Request:**
  - Content-Type: `multipart/form-data`
  - Body:
    - `file` (image file)
    - `userId` (string, MongoDB ObjectId)
- **Response:**
  ```json
  {
    "message": "Profile picture uploaded successfully",
    "profilePictureUrl": "/uploads/profile123.jpg"
  }
  ```

---

## Authentication Endpoints

### `POST /auth/register`

- **Description:** Register a new user (with optional profile picture upload).
- **Request:**
  - Content-Type: `application/json` or `multipart/form-data`
  - Body:
    ```json
    {
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "password": "securePassword123"
      // "profilePictureUrl": "/uploads/jane.jpg" (optional)
    }
    ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "123",
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "profilePictureUrl": "/uploads/jane.jpg"
    },
    "token": "jwt-token-string"
  }
  ```

### `POST /auth/login`

- **Description:** Authenticate user and return a JWT token.
- **Request:**
  - Content-Type: `application/json`
  - Body:
    ```json
    {
      "email": "janedoe@example.com",
      "password": "securePassword123"
    }
    ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "_id": "123",
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "profilePictureUrl": "/uploads/jane.jpg"
    },
    "token": "jwt-token-string"
  }
  ```

### `GET /auth/me`

- **Description:** Get the currently authenticated user's profile.
- **Request:**
  - Header: `Authorization: Bearer <jwt-token-string>`
- **Response:**
  ```json
  {
    "_id": "123",
    "email": "janedoe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "profilePictureUrl": "/uploads/jane.jpg"
  }
  ```

---

## Filtering Examples

- `/users?firstName=Anna` — Get users with firstName "Anna"
- `/games?category=Shooter` — Get games in "Shooter" category
- `/gameSessions?userId=abc123&isActive=true` — Get active sessions for user
- `/gameSessions?startTime=2024-10-01&endTime=2024-10-07` — Get sessions in a date range

---
