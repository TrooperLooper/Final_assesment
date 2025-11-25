import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Game } from "../models/Game";
import logger from '../utils/logger';

const gameSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  gifUrl: z.string().url().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  category: z.string().optional(),
  timeLimit: z.number().positive().optional(),
});

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching all games');
    const games = await Game.find();
    logger.info(`Found ${games.length} games`);
    res.json(games);
  } catch (error) {
    logger.error('Error fetching games', { error: error instanceof Error ? error.message : 'Unknown error' });
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
    logger.error('Error fetching game by ID', { 
      gameId: req.params.id, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
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
      logger.warn('Validation error creating game', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error creating game', { error: error instanceof Error ? error.message : 'Unknown error' });
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
      logger.warn('Validation error updating game', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error updating game', { 
      gameId: req.params.id, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
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
    logger.error('Error deleting game', { 
      gameId: req.params.id, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const searchGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, category, difficulty } = req.query;
    logger.info('Searching games', { query, category, difficulty });
    
    const searchCriteria: any = {};
    
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      searchCriteria.category = category;
    }
    
    if (difficulty) {
      searchCriteria.difficulty = difficulty;
    }
    
    const games = await Game.find(searchCriteria);
    logger.info(`Found ${games.length} games matching search criteria`);
    res.json(games);
  } catch (error) {
    logger.error('Error searching games', { error: error instanceof Error ? error.message : 'Unknown error' });
    next(error);
  }
};