import { Router } from "express";

const router = Router();

// GET /api/games
router.get("/", (req, res) => {
  // Get all games
  res.send("Get games endpoint");
});

// GET /api/games/:id
router.get("/:id", (req, res) => {
  // Get game by ID
  res.send("Get game by ID endpoint");
});

export default router;
