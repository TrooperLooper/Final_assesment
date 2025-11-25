import { Request, Response } from "express";
import { z } from "zod";
import { Game } from "../models/Game";
import logger from "../utils/logger";
import { config } from "../config/database";

const gameSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  gifUrl: z.string().optional(), // Add gifUrl to validation schema
});

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    logger.info(`Retrieved all games from database`, {
      gameCount: games.length,
    });
    res.json(games);
  } catch (error) {
    logger.error("Error fetching all games", { error: String(error) });
    res.status(500).json({ message: "Error fetching games", error });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      logger.warn(`Game not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Game not found" });
    }

    logger.info(`Retrieved game by ID`, {
      gameId: req.params.id,
      gameName: game.name,
    });
    res.json(game);
  } catch (error) {
    logger.error("Error fetching game by ID", {
      error: String(error),
      gameId: req.params.id,
    });
    res.status(500).json({ message: "Error fetching game", error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const data = gameSchema.parse(req.body);
    const newGame = await Game.create(data);

    logger.info("New game created", {
      gameId: newGame._id,
      gameName: data.name,
      hasDescription: !!data.description,
      hasImageUrl: !!data.imageUrl,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(newGame);
  } catch (err) {
    logger.error("Error creating game", { error: String(err) });
    res.status(400).json(err);
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const data = gameSchema.partial().parse(req.body);
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updatedGame) {
      logger.warn(`Attempted to update non-existent game: ${req.params.id}`);
      return res.status(404).json({ error: "Game not found" });
    }

    logger.info("Game updated", {
      gameId: req.params.id,
      gameName: updatedGame.name,
      updateFields: Object.keys(data),
    });
    res.json(updatedGame);
  } catch (err) {
    logger.error("Error updating game", {
      error: String(err),
      gameId: req.params.id,
    });
    res.status(400).json(err);
  }
};

export const completeGame = async (req: Request, res: Response) => {
  try {
    const { gameId, durationInSeconds } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      logger.warn(`Attempted to complete non-existent game: ${gameId}`);
      return res.status(404).json({ error: "Game not found" });
    }

    const gameHours = (durationInSeconds / config.timerMultiplier).toFixed(2);

    logger.info("Game completed", {
      gameId,
      gameName: game.name,
      durationInSeconds,
      gameHoursPlayed: gameHours,
      timerMultiplier: config.timerMultiplier,
      completedAt: new Date().toISOString(),
    });

    res.json({
      message: "Game completed",
      duration: durationInSeconds,
      gameHours: gameHours,
    });
  } catch (err) {
    logger.error("Error completing game", {
      error: String(err),
      gameId: req.body.gameId,
    });
    res.status(500).json({ error: "Failed to complete game" });
  }
};
