import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/gameRoutes";
import sessionRouter from "./routes/sessionRoutes";
import { seedDatabase } from "./utils/seedDatabase";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/uploads", express.static("uploads")); //Profile pictures (static folder)
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gamesRouter); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes

const PORT = process.env.PORT || 3000;
const MONGO =
  process.env.MONGO_URI || "mongodb://localhost:27017/game-time-tracker";

mongoose
  .connect(MONGO)
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedDatabase();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });
