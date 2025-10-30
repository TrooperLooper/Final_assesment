import { Request, Response } from "express";
import { z } from "zod";
import { Game } from "../models/Game";

const gameSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  gifUrl: z.string().optional(), // Add gifUrl to validation schema
});

export const getGames = async (_req: Request, res: Response) => {
  const games = await Game.find();
  res.json(games);
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const data = gameSchema.parse(req.body);
    const newGame = await Game.create(data);
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
