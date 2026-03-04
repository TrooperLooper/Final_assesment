import express from "express";
import {
  getUserStats,
  getAllSessions,
  getUserSessions,
  getLeaderboard,
  getAllUsersLeaderboard,
  getGameFrequencyStats,
} from "../controllers/statisticsController";

const router = express.Router();

// Get user's game statistics
router.get("/user/:userId", getUserStats);

// Get all sessions
router.get("/sessions", getAllSessions);

// Get user's sessions
router.get("/sessions/:userId", getUserSessions);

// Get global leaderboard (individual sessions)
router.get("/leaderboard", getLeaderboard);

// Get all users ranked by total play time
router.get("/all-users", getAllUsersLeaderboard);

// Get game frequency statistics
router.get("/game-frequency", getGameFrequencyStats);

export default router;
