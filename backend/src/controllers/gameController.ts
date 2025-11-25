import { Request, Response } from "express";
import { z } from "zod";
import { Game } from "../models/Game";
import logger from '../utils/logger';
import { config } from '../config/database';

const gameSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  gifUrl: z.string().optional(), // Add gifUrl to validation schema
});

export const getAllGames = async (req: Request, res: Response) => {
  try {
    console.log('📦 Fetching all games...');
    const games = await Game.find();
    console.log(`Found ${games.length} games:`, games);
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games', error });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    console.log('Fetching game by ID:', req.params.id);
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      console.log('Game not found');
      return res.status(404).json({ message: 'Game not found' });
    }
    
    console.log('Game found:', game);
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Error fetching game', error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const data = gameSchema.parse(req.body);
    const newGame = await Game.create(data);

    logger.info('Game started', {
      gameId: newGame._id,
      startTime: new Date().toISOString(),
      timerMultiplier: config.timerMultiplier
    });

    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const data = gameSchema.partial().parse(req.body);
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id, 
      data, 
      { new: true }
    );
    
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json(err);
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
