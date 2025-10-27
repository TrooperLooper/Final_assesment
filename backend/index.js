import express from "express";
import mongoose from "mongoose";
import { start } from "repl";
import logger from "./src/utils/logger.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myfirstdatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
});

app.get("/games", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

app.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  const game = await Game.findById(id);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
  logger.info("Server is running at http://localhost:3000");
});
