import { Router } from "express";

const gamesRouter = Router();

// GET /api/games
gamesRouter.get("/", (req, res) => {
  // Get all games
  res.send("Get games endpoint");
});

// GET /api/games/:id
gamesRouter.get("/:id", (req, res) => {
  // Get game by ID
  res.send("Get game by ID endpoint");
});

export default gamesRouter;
