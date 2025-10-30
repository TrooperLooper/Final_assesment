import { Request, Response } from 'express';
import { GameSession } from '../models/GameSession';

export const getUserStatistics = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const sessions = await GameSession.find({ userId }).populate('gameId');
  
  const totalPlayTime = sessions.reduce((sum, s) => sum + (s.playedSeconds || 0), 0);
  const gameBreakdown = sessions.reduce((acc: any, s) => {
    const id = s.gameId._id.toString();
    if (!acc[id]) acc[id] = { game: s.gameId, playTime: 0, sessionCount: 0 };
    acc[id].playTime += s.playedSeconds || 0;
    acc[id].sessionCount += 1;
    return acc;
  }, {});
  
  res.json({
    totalPlayTime,
    gamesPlayed: new Set(sessions.map(s => s.gameId._id.toString())).size,
    sessionCount: sessions.length,
    gameBreakdown: Object.values(gameBreakdown)
  });
};

export const getGamePopularity = async (req: Request, res: Response) => {
  const sessions = await GameSession.find().populate('gameId');
  
  const stats = sessions.reduce((acc: any, s) => {
    const id = s.gameId._id.toString();
    if (!acc[id]) acc[id] = { game: s.gameId, totalPlayTime: 0, sessionCount: 0, players: new Set() };
    acc[id].totalPlayTime += s.playedSeconds || 0;
    acc[id].sessionCount += 1;
    acc[id].players.add(s.userId.toString());
    return acc;
  }, {});
  
  res.json(Object.values(stats).map((s: any) => ({
    game: s.game,
    totalPlayTime: s.totalPlayTime,
    sessionCount: s.sessionCount,
    uniquePlayers: s.players.size
  })));
};

export const getGlobalLeaderboard = async (req: Request, res: Response) => {
  const sessions = await GameSession.find().populate('userId');
  
  const userStats = sessions.reduce((acc: any, s) => {
    const id = s.userId._id.toString();
    if (!acc[id]) acc[id] = { user: s.userId, totalPlayTime: 0, sessionCount: 0 };
    acc[id].totalPlayTime += s.playedSeconds || 0;
    acc[id].sessionCount += 1;
    return acc;
  }, {});
  
  res.json(Object.values(userStats).sort((a: any, b: any) => b.totalPlayTime - a.totalPlayTime).slice(0, 10));
};

export const getGameChartData = async (req: Request, res: Response) => {
  const sessions = await GameSession.find({ gameId: req.params.gameId }).sort({ startTime: 1 });
  
  const weekly = sessions.reduce((acc: any, s) => {
    const week = s.startTime.toISOString().split('T')[0];
    acc[week] = (acc[week] || 0) + (s.playedSeconds || 0);
    return acc;
  }, {});
  
  res.json(Object.entries(weekly).map(([date, playTime]) => ({ date, playTime })));
};