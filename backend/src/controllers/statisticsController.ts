import { Request, Response } from "express";
import { GameSession } from "../models/GameSession";
import { User } from "../models/User";
import { Game } from "../models/Game";
import mongoose from "mongoose";

// Get user's game statistics
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const sessions = await GameSession.find({ userId })
      .populate("gameId")
      .populate("userId");

    // Aggregate by game
    const gameStats = sessions.reduce((acc: any[], session: any) => {
      const gameName = session.gameId?.name || "Unknown";
      const existing = acc.find((g) => g.gameName === gameName);
      // 1 second = 1 minute in our system
      const minutes = session.playedSeconds || 0;

      if (existing) {
        existing.minutesPlayed += minutes;
      } else {
        acc.push({
          gameName,
          iconUrl: session.gameId?.imageUrl || "",
          minutesPlayed: minutes,
        });
      }
      return acc;
    }, []);

    const totalMinutes = gameStats.reduce((sum, g) => sum + g.minutesPlayed, 0);

    res.json({ gameStats, totalMinutes });
  } catch (error) {
    console.error("getUserStats error:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
};

// Get all sessions
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await GameSession.find()
      .populate("userId")
      .populate("gameId")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Get user's sessions
export const getUserSessions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const sessions = await GameSession.find({ userId })
      .populate("gameId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user sessions" });
  }
};

// Get leaderboard - individual game sessions ranked by duration
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const sessions = await GameSession.find()
      .populate({
        path: "userId",
        select: "firstName lastName",
      })
      .populate({
        path: "gameId",
        select: "name",
      })
      .sort({ playedSeconds: -1 })
      .exec();

    const leaderboard = sessions.map((session: any) => {
      const user = session.userId;
      const game = session.gameId;

      return {
        userName: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
        gameName: game?.name || "Unknown Game",
        minutes: session.playedSeconds || 0,
      };
    });

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
