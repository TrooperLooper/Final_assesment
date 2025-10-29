final_assesment/
│
├── frontend/ # React frontend (Vite + TypeScript)
│ ├── src/
│ │ ├── pages/ # Route-level components (one per route)
│ │ │ ├── Register.tsx
│ │ │ ├── Users.tsx
│ │ │ ├── Games.tsx
│ │ │ ├── Play.tsx
│ │ │ └── Stats.tsx
│ │ ├── components/ # Reusable UI components
│ │ │ ├── Statistics/
│ │ │ │ ├── BarGraph.tsx # Minutes played per game (personal stats)
│ │ │ │ ├── PieChart.tsx # Percent of total time per game (personal stats)
│ │ │ │ ├── TotalTimePlayed.tsx # Total time played (personal stats)
│ │ │ │ ├── SessionsGraph.tsx # Number of sessions per game + avg session length (dropdown)
│ │ │ │ ├── WeeklyPlayTimeGraph.tsx # Play time across the week (dropdown)
│ │ │ │ ├── AllUsersBarGraph.tsx # Total time per game across all users
│ │ │ │ ├── LeaderboardTable.tsx # Top players per game
│ │ │ ├── Navigation/
│ │ │ │ ├── NavigationBar.tsx
│ │ │ │ ├── GlobalSearch.tsx
│ │ │ ├── User/
│ │ │ │ ├── UserCard.tsx # Profile picture + first/last name
│ │ │ │ ├── RetroGameCard.tsx # Game card for user stats
│ │ │ ├── Timer/
│ │ │ │ ├── Timer.tsx
│ │ │ ├── Weather/
│ │ │ │ ├── WeatherWidget.tsx
│ │ │ └── Star.tsx
│ │ ├── hooks/ # Custom React hooks
│ │ │ └── useUsers.ts
│ │ ├── api/ # API client utilities
│ │ │ └── apiClient.ts
│ │ ├── assets/ # Images, icons, animations
│ │ │ ├── icons/
│ │ │ ├── animations/
│ │ │ └── ...
│ │ ├── types/ # TypeScript interfaces (frontend only)
│ │ │ └── user.ts
│ │ ├── App.tsx # Main app component
│ │ ├── main.tsx # Entry point
│ │ └── index.css # Tailwind and global styles
│ ├── public/ # Static files
│ ├── package.json
│ └── vite.config.ts
│
├── backend/ # Node.js backend (Express + TypeScript)
│ ├── src/
│ │ ├── models/ # Mongoose schemas/models
│ │ │ ├── User.ts
│ │ │ ├── Game.ts
│ │ │ └── GameSession.ts
│ │ ├── routes/ # Express route handlers
│ │ │ ├── userRoutes.ts
│ │ │ ├── gameRoutes.ts
│ │ │ └── sessionRoutes.ts
│ │ ├── controllers/ # Route controller logic
│ │ │ ├── userController.ts
│ │ │ ├── gameController.ts
│ │ │ └── sessionController.ts
│ │ ├── middleware/ # Custom middleware (auth, error, upload, logging)
│ │ │ ├── auth.ts
│ │ │ ├── errorHandler.ts
│ │ │ ├── upload.ts
│ │ │ └── logger.ts # Winston logging for game sessions
│ │ ├── utils/ # Utility functions (e.g., seeding)
│ │ │ ├── seedDatabase.ts
│ │ │ └── server.ts # Server utility functions
│ │ ├── config/ # Config files (db, env)
│ │ │ └── database.ts
│ │ ├── uploads/ # Uploaded profile pictures
│ │ ├── api/ # (suggested) API logic helpers, adapters, or versioning
│ │ └── server.ts # Express app entry point
│ ├── package.json
│ └── tsconfig.json
│ └── index.js
│
├── shared/ # Shared types/interfaces (imported by both)
│ └── types.ts
│
├── README.md
└── .gitignore
