import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import sessionRouter from "./routes/sessionRoutes";
import statisticsRoutes from './routes/statisticsRoutes';
import searchRoutes from './routes/searchRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import { seedDatabase } from "./utils/seedDatabase";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/retro-games";

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads")); //Profile pictures (static folder)
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gameRoutes); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes
app.use('/api/statistics', statisticsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📍 Database:', MONGODB_URI);
    
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
