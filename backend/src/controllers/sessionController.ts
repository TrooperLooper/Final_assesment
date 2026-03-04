import { Request, Response } from "express";
import { GameSession } from "../models/GameSession";
import logger from "../utils/logger";

export const startSession = async (req: Request, res: Response) => {
  try {
    const { userId, gameId } = req.body;
    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
    });
    logger.info(`Game session started`, {
      sessionId: session._id,
      userId,
      gameId,
      startTime: session.startTime,
    });
    res.status(201).json(session);
  } catch (error) {
    logger.error("Error starting session", {
      error: String(error),
      userId: req.body.userId,
      gameId: req.body.gameId,
    });
    res.status(500).json({ message: "Error starting session", error });
  }
};

export const stopSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await GameSession.findById(id);

    if (!session) {
      logger.warn(`Session not found: ${id}`);
      return res.status(404).json({ message: "Session not found" });
    }

    session.endTime = new Date();

    // Calculate actual duration in seconds
    const actualPlayedSeconds =
      (session.endTime.getTime() - session.startTime.getTime()) / 1000;

    // Cap at 30 minutes (1800 seconds)
    session.playedSeconds = Math.min(actualPlayedSeconds, 1800);

    session.isActive = false;

    // IMPORTANT: Save the session
    await session.save();

    logger.info(`Game session ended`, {
      sessionId: session._id,
      userId: session.userId,
      actualPlayedSeconds,
      cappedPlayedSeconds: session.playedSeconds,
      endTime: session.endTime,
    });

    res.json(session);
  } catch (error) {
    logger.error("Error stopping session", {
      error: String(error),
      sessionId: req.params.id,
    });
    res.status(500).json({ message: "Failed to stop session" });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const sessions = await GameSession.find()
      .populate("userId")
      .populate("gameId");
    logger.info(`Retrieved ${sessions.length} game sessions`);
    res.json(sessions);
  } catch (error) {
    logger.error("Error fetching sessions", { error: String(error) });
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};

// Create a session - stores elapsed seconds as minutes (1 second = 1 minute)
export const createSession = async (req: Request, res: Response) => {
  try {
    const { userId, gameId, playedSeconds } = req.body;

    if (!userId || !gameId || playedSeconds === undefined) {
      logger.warn("Attempted to create session with missing fields", {
        userId,
        gameId,
        playedSeconds,
      });
      return res.status(400).json({
        message: "Missing required fields: userId, gameId, playedSeconds",
      });
    }

    // Store the seconds value directly as minutes (1 real second = 1 minute in system)
    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      endTime: new Date(),
      playedSeconds, // This value represents minutes in the system
    });

    logger.info(`Game session created`, {
      sessionId: session._id,
      userId,
      gameId,
      playedSeconds,
    });

    res.status(201).json(session);
  } catch (error) {
    logger.error("Error creating session", {
      error: String(error),
      userId: req.body.userId,
      gameId: req.body.gameId,
    });
    res.status(500).json({ message: "Failed to create session", error });
  }
};
