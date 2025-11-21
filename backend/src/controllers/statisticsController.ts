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
      const minutes = session.playedSeconds
        ? Math.round(session.playedSeconds / 60)
        : 0;

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

// Get global leaderboard
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await GameSession.aggregate([
      {
        $group: {
          _id: "$userId",
          totalMinutes: {
            $sum: { $divide: ["$playedSeconds", 60] },
          },
        },
      },
      {
        $sort: { totalMinutes: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          userId: "$_id",
          userName: {
            $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"],
          },
          totalMinutes: { $round: ["$totalMinutes", 0] },
        },
      },
    ]);

    // Add rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    res.json(rankedLeaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

export const getGameFrequencyStats = async (req: Request, res: Response) => {
  try {
    const games = await Game.find({}, 'name').lean();
    
    const gameData: Record<string, any[]> = {};

    for (const game of games) {
      const sessions = await GameSession.find({ gameId: game._id })
        .populate('userId', 'firstName lastName')
        .lean();

      const userStats: Record<string, { timesPlayed: number; totalMinutes: number }> = {};

      sessions.forEach((session: any) => {
        if (!session.userId) return;

        const userName = `${session.userId.firstName} ${session.userId.lastName}`;
        
        // DON'T divide by 60 - treat seconds AS minutes
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

    res.json(gameData);

  } catch (error) {
    console.error('Error fetching game frequency stats:', error);
    res.status(500).json({ message: 'Failed to fetch game frequency stats' });
  }
};
