import { Router } from "express";
import { getGames, createGame, completeGame } from "../controllers/gameController";
import { Game } from "../models/Game";
import logger from '../utils/logger';

const router = Router();

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    logger.info(`Fetched ${games.length} games`);
    res.json(games);
  } catch (error) {
    logger.error(`Error fetching games: ${error as Error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a game by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid game ID" });
    }

    const game = await Game.findById(id);
    if (!game) {
      logger.warn(`Game not found with ID: ${id}`);
      return res.status(404).json({ error: "Game not found" });
    }

    logger.info(`Fetched game with ID: ${id}`);
    res.json(game);
  } catch (error) {
    logger.error(`Error fetching game by ID: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/complete', completeGame);

export default router;
