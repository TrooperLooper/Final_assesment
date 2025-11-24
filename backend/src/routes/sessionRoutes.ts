import express from "express";
import {
  startSession,
  stopSession,
  getStats,
  createSession,
} from "../controllers/sessionController";
import mongoose from "mongoose"; // Import mongoose
import { GameSession } from "../models/GameSession"; // Import the GameSession model
import { validate } from "../middleware/validation";
import { 
  createSessionSchema, 
  updateSessionSchema, 
  getSessionSchema 
} from '../middleware/validation';

const router = express.Router();

// Direct session logging endpoint (used by frontend)
router.post("/", validate(createSessionSchema), async (req, res) => {
  try {
    const { userId, gameId, playedSeconds } = req.body;

    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      endTime: new Date(),
      playedSeconds, // Frontend sends playedSeconds (1 second = 1 minute in system)
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Error creating session", error });
  }
});

router.post("/", validate(createSessionSchema), async (req, res) => { /*...*/ });
router.post("/start", validate(createSessionSchema), startSession);
router.put("/:id/stop", validate(updateSessionSchema), stopSession);

router.get("/user/:userId", validate(getSessionSchema), async (req, res) =>  {
  try {
    const sessions = await GameSession.find({
      userId: req.params.userId,
    }).populate("gameId");
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

router.get("/statistics/:userId", async (req, res) => {
  try {
    const stats = await GameSession.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.params.userId) } },
      // ... aggregation pipeline
    ]);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

export default router;
