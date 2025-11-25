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
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/retro-games";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/games", gamesRouter); 
app.use("/api/sessions", sessionRouter); 
app.use("/api/statistics", statisticsRouter); 


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Database:", MONGODB_URI);

   
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
