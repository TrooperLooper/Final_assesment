import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/GameRoutes";
import sessionRouter from "./routes/sessionRoutes";
import statisticsRouter from "./routes/statisticsRoutes";
import { seedDatabase } from "./utils/seedDatabase";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/retro-games";

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Static files
app.use("/uploads", express.static("uploads")); //Profile pictures (user uploads)
app.use("/avatars", express.static("public/avatars")); //Seed avatars
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gamesRouter); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes
app.use("/api/statistics", statisticsRouter); //Statistics routes

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Successfully connected to MongoDB", { database: MONGODB_URI });

    // Start server only after DB connection
    app.listen(PORT, () => {
      logger.info(`Server started successfully`, {
        port: PORT,
        environment: process.env.NODE_ENV || "development",
        apiUrl: `http://localhost:${PORT}/api`,
      });
    });
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", {
      error: String(error),
      database: MONGODB_URI,
      retrying: "Check connection string and database availability",
    });
    process.exit(1);
  });
