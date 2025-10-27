import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import logger from "./utils/logger";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/gameRoutes";
import sessionRouter from "./routes/sessionRoutes";

dotenv.config(); //Load .env file

const app = express(); //Creates the express app
app.use(express.json()); //Middleware
app.use("/uploads", express.static("uploads")); //Profile pictures (static folder)
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gamesRouter); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes

const port = process.env.PORT || 3000;

connectDB().then(() => { // Connect to DB before starting
  app.listen(port, () => console.log(`Server on port ${port}`)); // Start server
});