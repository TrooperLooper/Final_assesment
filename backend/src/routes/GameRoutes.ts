import express, { Request, Response } from "express";

<<<<<<< Updated upstream
const gamesRouter = Router();

// GET /api/games
gamesRouter.get("/", (req, res) => {
=======
const router = express.Router();

// GET /api/games
router.get("/", (req: Request, res: Response) => {
>>>>>>> Stashed changes
  // Get all games
  res.send("Get games endpoint");
});

// GET /api/games/:id
<<<<<<< Updated upstream
gamesRouter.get("/:id", (req, res) => {
=======
router.get("/:id", (req: Request, res: Response) => {
>>>>>>> Stashed changes
  // Get game by ID
  res.send("Get game by ID endpoint");
});

export default gamesRouter;
