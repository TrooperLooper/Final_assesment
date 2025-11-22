import express from "express";
import {
  startSession,
  stopSession,
  getStats,
} from "../controllers/sessionController";
import mongoose from "mongoose"; // Import mongoose
import { GameSession } from "../models/GameSession"; // Import the GameSession model

const router = express.Router();

router.post("/", startSession);
router.put("/:id/stop", stopSession);
router.get("/stats", getStats);

// Direct session logging endpoint (used by frontend)
router.post("/", async (req, res) => {
  try {
    const { userId, gameId, minutesPlayed } = req.body;
    
    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      endTime: new Date(),
      playedSeconds: minutesPlayed, // Frontend sends elapsed seconds
    });
    
    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Error creating session", error });
  }
});

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
