import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/GameRoutes";
import sessionRouter from "./routes/sessionRoutes";
import statisticsRouter from "./routes/statisticsRoutes";
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
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/uploads", express.static("uploads")); //Profile pictures (static folder)
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gameRoutes); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes
app.use("/api/statistics", statisticsRouter); //Statistics routes

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📍 Database:', MONGODB_URI);
    
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
