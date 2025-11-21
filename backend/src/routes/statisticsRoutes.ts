import express from "express";
import {
  getUserStats,
  getAllSessions,
  getUserSessions,
  getLeaderboard,
  getAllUsersLeaderboard,
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

export default router;
