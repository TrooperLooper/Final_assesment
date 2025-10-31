import { Request, Response } from "express";
import { z } from "zod";
import { Game } from "../models/Game";

const gameSchema = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
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
