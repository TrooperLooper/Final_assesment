import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import logger from "./utils/logger";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/gameRoutes";
import sessionRouter from "./routes/sessionRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/games", gamesRouter);
app.use("/api/sessions", sessionRouter);

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to database:", err);
    process.exit(1);
  });
