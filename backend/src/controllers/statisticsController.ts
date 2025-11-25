import { Request, Response } from "express";
import { GameSession } from "../models/GameSession";
import { User } from "../models/User";
import { Game } from "../models/Game";
import mongoose from "mongoose";
import logger from "../utils/logger";

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

    logger.info(`User statistics retrieved`, {
      userId,
      gamesPlayed: gameStats.length,
      totalMinutes,
      sessionCount: sessions.length,
    });

    res.json({ gameStats, totalMinutes });
  } catch (error) {
    logger.error("Error fetching user statistics", {
      error: String(error),
      userId: req.params.userId,
    });
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

    logger.info(`Retrieved all game sessions`, {
      sessionCount: sessions.length,
    });
    res.json(sessions);
  } catch (error) {
    logger.error("Error fetching all sessions", { error: String(error) });
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Get user's sessions
export const getUserSessions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      logger.warn(`Invalid userId format attempted`, { userId });
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const sessions = await GameSession.find(userId ? { userId } : {})
      .populate("userId", "firstName lastName")
      .populate("gameId", "name")
      .lean();

    logger.info(`User sessions retrieved`, {
      userId: userId || "all",
      sessionCount: sessions.length,
    });

    res.json(sessions);
  } catch (error) {
    logger.error("Error fetching user sessions", {
      error: String(error),
      userId: req.params.userId,
    });
    res.status(500).json({ message: "Failed to fetch sessions" });
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

    logger.info(`Leaderboard retrieved`, { totalEntries: leaderboard.length });
    res.json(leaderboard);
  } catch (error) {
    logger.error("Error fetching leaderboard", { error: String(error) });
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Get all users ranked by total play time
export const getAllUsersLeaderboard = async (req: Request, res: Response) => {
  try {
    const sessions = await GameSession.find()
      .populate({
        path: "userId",
        select: "firstName lastName",
      })
      .exec();

    // Aggregate total minutes per user
    const userTotals = sessions.reduce((acc: any, session: any) => {
      const user = session.userId;
      if (!user) return acc;

      const userId = user._id.toString();
      const userName = `${user.firstName} ${user.lastName}`;
      const minutes = session.playedSeconds || 0;

      if (acc[userId]) {
        acc[userId].totalMinutes += minutes;
      } else {
        acc[userId] = {
          userId,
          userName,
          totalMinutes: minutes,
        };
      }
      return acc;
    }, {});

    // Convert to array and sort by total minutes
    const leaderboard = Object.values(userTotals)
      .sort((a: any, b: any) => b.totalMinutes - a.totalMinutes)
      .map((user: any, index: number) => ({
        ...user,
        rank: index + 1,
      }));

    logger.info(`All users leaderboard retrieved`, {
      totalUsers: leaderboard.length,
      topUser: leaderboard[0]?.userName,
      topUserMinutes: leaderboard[0]?.totalMinutes,
    });

    res.json(leaderboard);
  } catch (error) {
    logger.error("Error fetching all users leaderboard", {
      error: String(error),
    });
    res.status(500).json({ error: "Failed to fetch all users leaderboard" });
  }
};

export const getGameFrequencyStats = async (req: Request, res: Response) => {
  try {
    const games = await Game.find({}, "name").lean();
    const gameData: Record<string, any[]> = {};

    for (const game of games) {
      const sessions = await GameSession.find({ gameId: game._id })
        .populate("userId", "firstName lastName")
        .lean();

      const userStats: Record<
        string,
        { timesPlayed: number; totalMinutes: number }
      > = {};

      sessions.forEach((session: any) => {
        if (!session.userId) return;

        const userName = `${session.userId.firstName} ${session.userId.lastName}`;
        const minutes = session.playedSeconds || 0;

        if (!userStats[userName]) {
          userStats[userName] = { timesPlayed: 0, totalMinutes: 0 };
        }

        userStats[userName].timesPlayed += 1;
        userStats[userName].totalMinutes += minutes;
      });

      gameData[game.name] = Object.entries(userStats).map(([user, stats]) => ({
        user,
        timesPlayed: stats.timesPlayed,
        totalMinutes: stats.totalMinutes,
      }));
    }

    logger.info(`Game frequency statistics retrieved`, {
      gamesAnalyzed: games.length,
      totalRecords: Object.values(gameData).reduce(
        (sum, arr) => sum + arr.length,
        0
      ),
    });

    res.json(gameData);
  } catch (error) {
    logger.error("Error fetching game frequency stats", {
      error: String(error),
    });
    res.status(500).json({ message: "Failed to fetch game frequency stats" });
  }
};
