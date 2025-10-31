import express from 'express';
import { getAllGames, getGameById, createGame } from '../controllers/gameController';

const router = express.Router();

router.get('/', getAllGames);        // GET /api/games
router.get('/:id', getGameById);     // GET /api/games/:id
router.post('/', createGame);        // POST /api/games

export default router;