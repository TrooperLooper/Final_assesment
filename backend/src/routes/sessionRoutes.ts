import express from "express";
import {
  startSession,
  stopSession,
  getStats,
} from "../controllers/sessionController";
import mongoose from "mongoose"; // Import mongoose
import { GameSession } from "../models/GameSession"; // Import the GameSession model

const router = express.Router();

router.post("/start", startSession);    
router.post("/stop/:id", stopSession); 
router.get("/stats", getStats);

router.get("/user/:userId", async (req, res) => {
  const sessions = await GameSession.find({ userId: req.params.userId })
    .populate('gameId');
  res.json(sessions);
});

router.get("/statistics/:userId", async (req, res) => {
  // Add statistics aggregation here
  const stats = await GameSession.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.params.userId) } },
    // ... aggregation pipeline
  ]);
  res.json(stats);
});

export default router;
