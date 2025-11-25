import express from "express";
import {
  startSession,
  stopSession,
  getStats,
  createSession,
} from "../controllers/sessionController";
import mongoose from "mongoose"; // Import mongoose
import { GameSession } from "../models/GameSession"; // Import the GameSession model
import logger from "../utils/logger";

const router = express.Router();

// Direct session logging endpoint (used by frontend)
router.post("/", async (req, res) => {
  try {
    const { userId, gameId, playedSeconds } = req.body;

    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      endTime: new Date(),
      playedSeconds, // Frontend sends playedSeconds (1 second = 1 minute in system)
    });

    logger.info('Session created via direct endpoint', {
      sessionId: session._id,
      userId,
      gameId,
      playedSeconds
    });

    res.status(201).json(session);
  } catch (error) {
    logger.error("Error creating session via direct endpoint", {
      error: String(error),
      userId: req.body.userId,
      gameId: req.body.gameId
    });
    res.status(500).json({ message: "Error creating session", error });
  }
});

router.post("/start", startSession);
router.put("/:id/stop", stopSession);
router.get("/stats", getStats);

router.get("/user/:userId", async (req, res) => {
  const sessions = await GameSession.find({
    userId: req.params.userId,
  }).populate("gameId");
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
