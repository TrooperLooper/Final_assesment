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


router.get("/user/:userId", getUserStats);
router.get("/sessions", getAllSessions);
router.get("/sessions/:userId", getUserSessions);
router.get("/leaderboard", getLeaderboard);
router.get("/all-users", getAllUsersLeaderboard);
router.get("/game-frequency", getGameFrequencyStats);

export default router;
