import express from "express";
import {
  getUserStats,
  getAllSessions,
  getUserSessions,
  getLeaderboard,
  getGameFrequencyStats,
} from "../controllers/statisticsController";

const router = express.Router();

// Get user's game statistics
router.get("/user/:userId", getUserStats);

// Get all sessions
router.get("/sessions", getAllSessions);

// Get user's sessions
router.get("/sessions/:userId", getUserSessions);

// Get global leaderboard
router.get("/leaderboard", getLeaderboard);

// Get game frequency statistics
router.get("/game-frequency", getGameFrequencyStats);

export default router;
