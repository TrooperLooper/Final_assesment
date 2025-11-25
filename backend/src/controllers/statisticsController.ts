import { Request, Response, NextFunction } from "express";
import { GameSession } from "../models/GameSession";
import { Game } from "../models/Game";
import { User } from "../models/User";
import mongoose from "mongoose";
import logger from '../utils/logger';

export const getOverallStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching overall statistics');
    
    const [totalGames, totalUsers, totalSessions, avgScore] = await Promise.all([
      Game.countDocuments(),
      User.countDocuments(),
      GameSession.countDocuments(),
      GameSession.aggregate([
        { $group: { _id: null, averageScore: { $avg: "$score" } } }
      ])
    ]);

    const statistics = {
      totalGames,
      totalUsers,
      totalSessions,
      averageScore: avgScore[0]?.averageScore || 0
    };

    logger.info('Overall statistics fetched', statistics);
    res.json(statistics);
  } catch (error) {
    logger.error('Error fetching overall statistics', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getUserStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    logger.info('Fetching user statistics', { userId });

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
          lowestScore: { $min: "$score" },
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
          lowestScore: 1,
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
      logger.warn('No statistics found for user', { userId });
      return res.status(404).json({ message: 'No statistics found for this user' });
    }

    logger.info('User statistics fetched', { userId });
    res.json(stats[0]);
  } catch (error) {
    logger.error('Error fetching user statistics', { 
      userId: req.params.userId,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getGameStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    logger.info('Fetching game statistics', { gameId });

    const stats = await GameSession.aggregate([
      { $match: { gameId: new mongoose.Types.ObjectId(gameId) } },
      {
        $group: {
          _id: "$gameId",
          totalSessions: { $sum: 1 },
          uniquePlayers: { $addToSet: "$userId" },
          averageScore: { $avg: "$score" },
          highestScore: { $max: "$score" },
          lowestScore: { $min: "$score" },
        },
      },
      {
        $lookup: {
          from: "games",
          localField: "_id",
          foreignField: "_id",
          as: "gameDetails",
        },
      },
      { $unwind: "$gameDetails" },
      {
        $project: {
          gameId: "$_id",
          gameName: "$gameDetails.name",
          totalSessions: 1,
          uniquePlayers: { $size: "$uniquePlayers" },
          averageScore: { $round: ["$averageScore", 2] },
          highestScore: 1,
          lowestScore: 1,
          _id: 0,
        },
      },
    ]);

    if (!stats || stats.length === 0) {
      logger.warn('No statistics found for game', { gameId });
      return res.status(404).json({ message: 'No statistics found for this game' });
    }

    logger.info('Game statistics fetched', { gameId });
    res.json(stats[0]);
  } catch (error) {
    logger.error('Error fetching game statistics', { 
      gameId: req.params.gameId,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getTopPerformers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 10, metric = 'score' } = req.query;
    logger.info('Fetching top performers', { limit, metric });

    let sortField = 'totalScore';
    if (metric === 'wins') sortField = 'totalWins';
    if (metric === 'games') sortField = 'totalGames';

    const topPerformers = await GameSession.aggregate([
      {
        $group: {
          _id: "$userId",
          totalGames: { $sum: 1 },
          totalWins: { $sum: { $cond: ["$isWinner", 1, 0] } },
          totalScore: { $sum: "$score" },
          averageScore: { $avg: "$score" },
        },
      },
      { $sort: { [sortField]: -1 } },
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
          totalGames: 1,
          totalWins: 1,
          totalScore: 1,
          averageScore: { $round: ["$averageScore", 2] },
          _id: 0,
        },
      },
    ]);

    logger.info(`Found ${topPerformers.length} top performers`);
    res.json(topPerformers);
  } catch (error) {
    logger.error('Error fetching top performers', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getTrendingGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { days = 7, limit = 10 } = req.query;
    logger.info('Fetching trending games', { days, limit });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));

    const trendingGames = await GameSession.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: "$gameId",
          sessionCount: { $sum: 1 },
          uniquePlayers: { $addToSet: "$userId" },
          averageScore: { $avg: "$score" },
        },
      },
      { $sort: { sessionCount: -1 } },
      { $limit: parseInt(limit as string) },
      {
        $lookup: {
          from: "games",
          localField: "_id",
          foreignField: "_id",
          as: "gameDetails",
        },
      },
      { $unwind: "$gameDetails" },
      {
        $project: {
          gameId: "$_id",
          gameName: "$gameDetails.name",
          category: "$gameDetails.category",
          sessionCount: 1,
          uniquePlayers: { $size: "$uniquePlayers" },
          averageScore: { $round: ["$averageScore", 2] },
          _id: 0,
        },
      },
    ]);

    logger.info(`Found ${trendingGames.length} trending games`);
    res.json(trendingGames);
  } catch (error) {
    logger.error('Error fetching trending games', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};