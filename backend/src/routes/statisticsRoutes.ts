import express from "express";
import {
  getUserStats,
  getAllSessions,
  getUserSessions,
  getLeaderboard,
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

export default router;
