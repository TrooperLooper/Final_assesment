import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { GameSession } from "../models/GameSession";
import mongoose from "mongoose";
import logger from '../utils/logger';

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type = "wins", limit = 10, gameId } = req.query;
    logger.info('Fetching leaderboard', { type, limit, gameId });

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
              totalWins: { $sum: { $cond: ["$isWinner", 1, 0] } },
            },
          },
          { $sort: { totalWins: -1 } },
          { $limit: parseInt(limit as string) },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          { $unwind: "$userDetails" },
          {
            $project: {
              userId: "$_id",
              username: "$userDetails.username",
              totalWins: 1,
              _id: 0,
            },
          },
        ]);
        break;

      case "score":
        leaderboard = await GameSession.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: "$userId",
              totalScore: { $sum: "$score" },
            },
          },
          { $sort: { totalScore: -1 } },
          { $limit: parseInt(limit as string) },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          { $unwind: "$userDetails" },
          {
            $project: {
              userId: "$_id",
              username: "$userDetails.username",
              totalScore: 1,
              _id: 0,
            },
          },
        ]);
        break;

      default:
        logger.warn('Invalid leaderboard type requested', { type });
        return res.status(400).json({ error: "Invalid leaderboard type" });
    }

    logger.info('Leaderboard fetched successfully', { entries: leaderboard.length });
    res.json(leaderboard);
  } catch (error) {
    logger.error('Error fetching leaderboard', { error });
    next(error);
  }
};

export const getLeaderboardByGameId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    logger.info('Fetching leaderboard for game', { gameId });
    
    const leaderboard = await GameSession.aggregate([
      { $match: { gameId: new mongoose.Types.ObjectId(gameId) } },
      {
        $group: {
          _id: "$userId",
          highestScore: { $max: "$score" },
          totalGames: { $sum: 1 },
        },
      },
      { $sort: { highestScore: -1 } },
      { $limit: 50 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userId: "$_id",
          username: "$userDetails.username",
          highestScore: 1,
          totalGames: 1,
          _id: 0,
        },
      },
    ]);
    
    if (!leaderboard || leaderboard.length === 0) {
      logger.warn('No leaderboard entries found for game', { gameId });
      return res.status(404).json({ message: 'No leaderboard entries found' });
    }
    
    logger.info(`Found ${leaderboard.length} entries for game`, { gameId });
    res.json(leaderboard);
  } catch (error) {
    logger.error('Error fetching leaderboard by game ID', { gameId: req.params.gameId, error });
    next(error);
  }
};

export const getLeaderboardByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    logger.info('Fetching leaderboard entries for user', { userId });
    
    const entries = await GameSession.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ score: -1 })
      .populate('gameId', 'name')
      .select('score gameId createdAt isWinner');
    
    if (!entries || entries.length === 0) {
      logger.warn('No leaderboard entries found for user', { userId });
      return res.status(404).json({ message: 'No entries found for this user' });
    }
    
    logger.info(`Found ${entries.length} entries for user`, { userId });
    res.json(entries);
  } catch (error) {
    logger.error('Error fetching leaderboard by user ID', { userId: req.params.userId, error });
    next(error);
  }
};

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    logger.info('Fetching user stats', { userId });
    
    const stats = await GameSession.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$userId",
          totalGames: { $sum: 1 },
          totalWins: { $sum: { $cond: ["$isWinner", 1, 0] } },
          totalScore: { $sum: "$score" },
          averageScore: { $avg: "$score" },
          highestScore: { $max: "$score" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userId: "$_id",
          username: "$userDetails.username",
          totalGames: 1,
          totalWins: 1,
          totalScore: 1,
          averageScore: { $round: ["$averageScore", 2] },
          highestScore: 1,
          winRate: {
            $round: [
              { $multiply: [{ $divide: ["$totalWins", "$totalGames"] }, 100] },
              2,
            ],
          },
          _id: 0,
        },
      },
    ]);
    
    if (!stats || stats.length === 0) {
      logger.warn('No stats found for user', { userId });
      return res.status(404).json({ message: 'No stats found for this user' });
    }
    
    logger.info('User stats fetched successfully', { userId });
    res.json(stats[0]);
  } catch (error) {
    logger.error('Error fetching user stats', { userId: req.params.userId, error });
    next(error);
  }
};

export const getTopScores = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const { gameId } = req.query;
    logger.info('Fetching top scores', { limit, gameId });
    
    const matchStage: any = {};
    if (gameId) {
      matchStage.gameId = new mongoose.Types.ObjectId(gameId as string);
    }
    
    const topScores = await GameSession.aggregate([
      { $match: matchStage },
      { $sort: { score: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "games",
          localField: "gameId",
          foreignField: "_id",
          as: "gameDetails",
        },
      },
      { $unwind: "$gameDetails" },
      {
        $project: {
          userId: 1,
          username: "$userDetails.username",
          gameName: "$gameDetails.name",
          score: 1,
          createdAt: 1,
          _id: 0,
        },
      },
    ]);
    
    logger.info(`Found ${topScores.length} top scores`);
    res.json(topScores);
  } catch (error) {
    logger.error('Error fetching top scores', { error });
    next(error);
  }
};

export const getGlobalRanking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    logger.info('Fetching global ranking', { limit });
    
    const ranking = await GameSession.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          totalGames: { $sum: 1 },
          totalWins: { $sum: { $cond: ["$isWinner", 1, 0] } },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userId: "$_id",
          username: "$userDetails.username",
          totalScore: 1,
          totalGames: 1,
          totalWins: 1,
          averageScore: { $round: [{ $divide: ["$totalScore", "$totalGames"] }, 2] },
          _id: 0,
        },
      },
    ]);
    
    logger.info(`Found ${ranking.length} players in global ranking`);
    res.json(ranking);
  } catch (error) {
    logger.error('Error fetching global ranking', { error });
    next(error);
  }
};