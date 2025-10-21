final_assesment/
│
├── client/ # React frontend (Vite + TS)
│ ├── src/
│ │ ├── pages/ # Route-level components (one per route)
│ │ │ ├── Register.tsx
│ │ │ ├── Users.tsx
│ │ │ ├── Games.tsx
│ │ │ ├── Play.tsx
│ │ │ ├── Stats.tsx
│ │ │ └── Leaderboard.tsx
│ │ ├── components/ # Reusable UI components
│ │ │ ├── WeatherWidget.tsx
│ │ │ ├── GlobalSearch.tsx
│ │ │ ├── NavigationBar.tsx
│ │ │ ├── UserCard.tsx
│ │ │ ├── RetroGameCard.tsx
│ │ │ ├── Timer.tsx
│ │ │ ├── StatisticsChart.tsx
│ │ │ ├── LeaderboardTable.tsx
│ │ │ └── ... (other UI components)
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
├── server/ # Node.js backend (Express + TS)
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
│ │ ├── middleware/ # Custom middleware (auth, error, upload)
│ │ │ ├── auth.ts
│ │ │ ├── errorHandler.ts
│ │ │ └── upload.ts
│ │ ├── utils/ # Utility functions (e.g., seeding)
│ │ │ └── seedDatabase.ts
│ │ ├── config/ # Config files (db, env)
│ │ │ └── database.ts
│ │ ├── uploads/ # Uploaded profile pictures
│ │ └── server.ts # Express app entry point
│ ├── package.json
│ └── tsconfig.json
│
├── shared/ # Shared types/interfaces (imported by both)
│ └── types.ts
│
├── README.md
└── .gitignore
