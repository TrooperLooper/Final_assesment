import express from "express";
import { Game } from "../models/Game";
import logger from "../utils/logger";

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await Game.find();
  logger.info("Fetched all games");
  res.json(games);
});


router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

export default router;
