import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Game } from "../models/Game";
import logger from '../utils/logger';
import { config } from '../config/database';

const gameSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  gifUrl: z.string().optional(), 
});

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching all games');
    const games = await Game.find();
    logger.info(`Found ${games.length} games`);
    res.json(games);
  } catch (error) {
    logger.error('Error fetching games', { error });
    next(error);
  }
};

export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching game by ID', { gameId: req.params.id });
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      logger.warn('Game not found', { gameId: req.params.id });
      return res.status(404).json({ message: 'Game not found' });
    }
    
    logger.info('Game found', { gameId: req.params.id });
    res.json(game);
  } catch (error) {
    logger.error('Error fetching game by ID', { gameId: req.params.id, error });
    next(error);
  }
};

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Creating new game', { name: req.body.name });
    const validatedData = gameSchema.parse(req.body);
    const game = new Game(validatedData);
    await game.save();
    logger.info('Game created successfully', { gameId: game._id });
    res.status(201).json(game);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error creating game', { errors: error.errors });
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    logger.error('Error creating game', { error });
    next(error);
  }
};

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Updating game', { gameId: req.params.id });
    const validatedData = gameSchema.partial().parse(req.body);
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    if (!game) {
      logger.warn('Game not found for update', { gameId: req.params.id });
      return res.status(404).json({ message: 'Game not found' });
    }
    
    logger.info('Game updated successfully', { gameId: game._id });
    res.json(game);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error updating game', { errors: error.errors });
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    logger.error('Error updating game', { gameId: req.params.id, error });
    next(error);
  }
};

export const completeGame = async (req: Request, res: Response) => {
  try {
    const { gameId, durationInSeconds } = req.body;
    
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    logger.info('Game completed', {
      gameId,
      gameName: game.name,
      durationInSeconds,
      gameHoursPlayed: (durationInSeconds / config.timerMultiplier).toFixed(2),
      realTimeSpent: `${durationInSeconds} seconds`,
      timerMultiplier: config.timerMultiplier,
      completedAt: new Date().toISOString()
    });

    res.json({ 
      message: 'Game completed',
      duration: durationInSeconds,
      gameHours: (durationInSeconds / config.timerMultiplier).toFixed(2)
    });
  } catch (err) {
    logger.error('Error completing game', { error: err });
    res.status(500).json({ error: 'Failed to complete game' });
  }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Deleting game', { gameId: req.params.id });
    const game = await Game.findByIdAndDelete(req.params.id);
    
    if (!game) {
      logger.warn('Game not found for deletion', { gameId: req.params.id });
      return res.status(404).json({ message: 'Game not found' });
    }
    
    logger.info('Game deleted successfully', { gameId: req.params.id });
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    logger.error('Error deleting game', { gameId: req.params.id, error });
    next(error);
  }
};
