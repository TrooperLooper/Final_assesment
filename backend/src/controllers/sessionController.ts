import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { GameSession } from "../models/GameSession";
import mongoose from "mongoose";
import logger from '../utils/logger';

const sessionSchema = z.object({
  userId: z.string(),
  gameId: z.string(),
  score: z.number().min(0),
  isWinner: z.boolean().optional(),
  duration: z.number().positive().optional(),
});

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Creating game session', { userId: req.body.userId, gameId: req.body.gameId });
    const validatedData = sessionSchema.parse(req.body);
    
    const session = new GameSession({
      ...validatedData,
      userId: new mongoose.Types.ObjectId(validatedData.userId),
      gameId: new mongoose.Types.ObjectId(validatedData.gameId),
    });
    
    await session.save();
    logger.info('Game session created successfully', { sessionId: session._id });
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error creating session', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error creating session', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getSessionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Fetching session by ID', { sessionId: id });
    
    const session = await GameSession.findById(id)
      .populate('userId', 'username email')
      .populate('gameId', 'name category');
    
    if (!session) {
      logger.warn('Session not found', { sessionId: id });
      return res.status(404).json({ message: 'Session not found' });
    }
    
    logger.info('Session found', { sessionId: id });
    res.json(session);
  } catch (error) {
    logger.error('Error fetching session', { 
      sessionId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getSessionsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { limit = 50, gameId } = req.query;
    logger.info('Fetching sessions for user', { userId, gameId, limit });
    
    const query: any = { userId: new mongoose.Types.ObjectId(userId) };
    
    if (gameId) {
      query.gameId = new mongoose.Types.ObjectId(gameId as string);
    }
    
    const sessions = await GameSession.find(query)
      .populate('gameId', 'name category')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string));
    
    logger.info(`Found ${sessions.length} sessions for user`, { userId });
    res.json(sessions);
  } catch (error) {
    logger.error('Error fetching user sessions', { 
      userId: req.params.userId,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getSessionsByGameId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const { limit = 50 } = req.query;
    logger.info('Fetching sessions for game', { gameId, limit });
    
    const sessions = await GameSession.find({ 
      gameId: new mongoose.Types.ObjectId(gameId) 
    })
      .populate('userId', 'username')
      .sort({ score: -1 })
      .limit(parseInt(limit as string));
    
    logger.info(`Found ${sessions.length} sessions for game`, { gameId });
    res.json(sessions);
  } catch (error) {
    logger.error('Error fetching game sessions', { 
      gameId: req.params.gameId,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Updating session', { sessionId: id });
    
    const validatedData = sessionSchema.partial().parse(req.body);
    const session = await GameSession.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    if (!session) {
      logger.warn('Session not found for update', { sessionId: id });
      return res.status(404).json({ message: 'Session not found' });
    }
    
    logger.info('Session updated successfully', { sessionId: id });
    res.json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error updating session', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error updating session', { 
      sessionId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Deleting session', { sessionId: id });
    
    const session = await GameSession.findByIdAndDelete(id);
    
    if (!session) {
      logger.warn('Session not found for deletion', { sessionId: id });
      return res.status(404).json({ message: 'Session not found' });
    }
    
    logger.info('Session deleted successfully', { sessionId: id });
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    logger.error('Error deleting session', { 
      sessionId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getRecentSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 20 } = req.query;
    logger.info('Fetching recent sessions', { limit });
    
    const sessions = await GameSession.find()
      .populate('userId', 'username')
      .populate('gameId', 'name category')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string));
    
    logger.info(`Found ${sessions.length} recent sessions`);
    res.json(sessions);
  } catch (error) {
    logger.error('Error fetching recent sessions', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};