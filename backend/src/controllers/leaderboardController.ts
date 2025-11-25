import { Request, Response } from "express";
import { User } from "../models/User";
import { GameSession } from "../models/GameSession";
import mongoose from "mongoose";
import logger from "../utils/logger";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { type = "wins", limit = 10, gameId } = req.query;

    let leaderboard;
    const matchStage: any = {};

    if (gameId) {
      matchStage.gameId = new mongoose.Types.ObjectId(gameId as string);
    }

    switch (type) {
      case "wins":
        leaderboard = await GameSession.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: "$userId",
              totalWins: {
                $sum: { $cond: [{ $eq: ["$result", "win"] }, 1, 0] },
              },
              totalGames: { $sum: 1 },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userInfo",
            },
          },
          { $unwind: "$userInfo" },
          {
            $project: {
              _id: 0,
              userId: "$_id",
              username: "$userInfo.username",
              profilePicture: "$userInfo.profilePicture",
              totalWins: 1,
              totalGames: 1,
            },
          },
          { $sort: { totalWins: -1 } },
          { $limit: Number(limit) },
        ]);
        break;

      case "playtime":
        leaderboard = await GameSession.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: "$userId",
              totalPlaytime: { $sum: "$playedSeconds" },
              totalGames: { $sum: 1 },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userInfo",
            },
          },
          { $unwind: "$userInfo" },
          {
            $project: {
              _id: 0,
              userId: "$_id",
              username: "$userInfo.username",
              profilePicture: "$userInfo.profilePicture",
              totalPlaytime: 1,
              totalGames: 1,
            },
          },
          { $sort: { totalPlaytime: -1 } },
          { $limit: Number(limit) },
        ]);
        break;

      case "winRate":
        leaderboard = await GameSession.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: "$userId",
              wins: {
                $sum: { $cond: [{ $eq: ["$result", "win"] }, 1, 0] },
              },
              totalGames: { $sum: 1 },
            },
          },
          {
            $match: { totalGames: { $gte: 5 } }, // Minimum 5 games
          },
          {
            $addFields: {
              winRate: {
                $multiply: [{ $divide: ["$wins", "$totalGames"] }, 100],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userInfo",
            },
          },
          { $unwind: "$userInfo" },
          {
            $project: {
              _id: 0,
              userId: "$_id",
              username: "$userInfo.username",
              profilePicture: "$userInfo.profilePicture",
              wins: 1,
              totalGames: 1,
              winRate: { $round: ["$winRate", 2] },
            },
          },
          { $sort: { winRate: -1 } },
          { $limit: Number(limit) },
        ]);
        break;

      default:
        return res.status(400).json({ error: "Invalid leaderboard type" });
    }

    // Add rank to each entry
    const rankedLeaderboard = leaderboard.map((entry: any, index: number) => ({
      rank: index + 1,
      ...entry,
    }));

    res.json(rankedLeaderboard);
  } catch (error) {
    logger.error("Leaderboard error", {
      error: String(error),
      type: req.query.type || "wins",
      gameId: req.query.gameId,
    });
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
