import express from "express";
import mongoose from "mongoose";
import { start } from "repl";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/GameRoutes";
import sessionRouter from "./routes/sessionRoutes";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());



/*
mongoose.connect("mongodb://localhost:27017/myfirstdatabase", {});
useNewUrlParser: true;
useUnifiedTopology: true;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  profilePictureUrl: String, //skriv filepath här - optional!
  createdAt: Date,
  updatedAt: Date,
});

const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  category: String,
  createdAt: Date,
});

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  playedSeconds: { type: Number },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});
*/

