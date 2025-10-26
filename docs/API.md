````markdown
# API Contract

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
    "firstName": "Jane",
    "lastName": "Doe",
    "profilePictureUrl": "/uploads/jane.jpg"
  }
  ```
- **Response:**  
  Created user object.

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

## Filtering Examples

- `/users?firstName=Anna` — Get users with firstName "Anna"
- `/games?category=Shooter` — Get games in "Shooter" category
- `/gameSessions?userId=abc123&isActive=true` — Get active sessions for user
- `/gameSessions?startTime=2024-10-01&endTime=2024-10-07` — Get sessions in a date range

---

# ✅ **Summary**

- **API contract covers all CRUD operations** for Users, Games, and GameSessions.
- **Filtering** is supported via query parameters for collections.
- **Statistics endpoints** provide data for dashboards and charts.
- **All endpoints follow RESTful conventions** and match your project requirements.
- **Response shapes** are based on your shared TypeScript interfaces.
- **Ready for frontend and backend teams to implement and test with tools like Insomnia or Compass.**

---

vi behöver: authentication endpoints, file upload routes, or have questions about any part of this contract!
````
