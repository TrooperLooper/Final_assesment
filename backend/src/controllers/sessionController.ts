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
  
  // Calculate actual duration in seconds
  const actualPlayedSeconds = (session.endTime.getTime() - session.startTime.getTime()) / 1000;
  
  // Cap at 30 minutes (1800 seconds)
  session.playedSeconds = Math.min(actualPlayedSeconds, 1800);
  
  await session.save();
  res.json(session);
};

export const getStats = async (req: Request, res: Response) => {
  const sessions = await GameSession.find().populate("userId").populate("gameId");
  res.json(sessions);
};