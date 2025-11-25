import { Request, Response } from "express";
import { GameSession } from "../models/GameSession";

export const startSession = async (req: Request, res: Response) => {
  const { userId, gameId } = req.body;
  const session = await GameSession.create({
    userId,
    gameId,
    startTime: new Date(),
  });
  res.status(201).json(session);
};

export const stopSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await GameSession.findById(id);
    
    if (!session) {
      console.error("Session not found:", id);
      return res.status(404).json({ message: "Session not found" });
    }

    session.endTime = new Date();

    // Calculate actual duration in seconds
    const actualPlayedSeconds = (session.endTime.getTime() - session.startTime.getTime()) / 1000;

   
    session.playedSeconds = Math.min(actualPlayedSeconds, 1800);

    console.log("Calculated playedSeconds:", actualPlayedSeconds);
    console.log("Capped playedSeconds:", session.playedSeconds);

    session.isActive = false;

    // Save the session
    await session.save();

    console.log("Session saved:", session);
    res.json(session);
  } catch (error) {
    console.error("Error stopping session:", error);
    res.status(500).json({ message: "Failed to stop session" });
  }
};

export const getStats = async (req: Request, res: Response) => {
  const sessions = await GameSession.find()
    .populate("userId")
    .populate("gameId");
  res.json(sessions);
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { userId, gameId, playedSeconds } = req.body;

    if (!userId || !gameId || playedSeconds === undefined) {
      return res
        .status(400)
        .json({
          message: "Missing required fields: userId, gameId, playedSeconds",
        });
    }

   
    const session = await GameSession.create({
      userId,
      gameId,
      startTime: new Date(),
      endTime: new Date(),
      playedSeconds, // This value represents minutes in the system
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session", error });
  }
};
