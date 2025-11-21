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
  const { id } = req.params;
  const session = await GameSession.findById(id);
  if (!session) return res.status(404).json({ message: "Session not found" });

  session.endTime = new Date();
  session.playedSeconds =
    (session.endTime.getTime() - session.startTime.getTime()) / 1000;
  await session.save();
  res.json(session);
};

export const getStats = async (req: Request, res: Response) => {
  const sessions = await GameSession.find()
    .populate("userId")
    .populate("gameId");
  res.json(sessions);
};

// Create a session - stores elapsed seconds as minutes (1 second = 1 minute)
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

    // Store the seconds value directly as minutes (1 real second = 1 minute in system)
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
