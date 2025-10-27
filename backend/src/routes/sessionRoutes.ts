import express from "express";
import { GameSession } from "../models/GameSession";
import logger from "../utils/logger";

const router = express.Router();

// --- Start a session ---
router.post("/start", async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    if (!userId || !gameId)
      return res.status(400).json({ error: "userId and gameId required" });

    // Check if user already has an active session
    const active = await GameSession.findOne({ userId, isActive: true });
    if (active)
      return res.status(400).json({ error: "User already has an active session" });

    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      isActive: true,
    });

    logger.info(`Session started for user ${userId} on game ${gameId}`);
    res.status(201).json(session);
  } catch (error) {
    logger.error(`Error starting session: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Stop a session
router.post("/stop", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ error: "userId required" });

    const session = await GameSession.findOne({ userId, isActive: true });
    if (!session)
      return res.status(400).json({ error: "No active session found" });

    const endTime = new Date();
    const durationSeconds = Math.floor(
      (endTime.getTime() - session.startTime.getTime()) / 1000
    );

    session.endTime = endTime;
    session.durationSeconds = durationSeconds;
    session.isActive = false;
    await session.save();

    logger.info(`Session stopped for user ${userId}, duration ${durationSeconds}s`);
    res.json(session);
  } catch (error) {
    logger.error(`Error stopping session: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
