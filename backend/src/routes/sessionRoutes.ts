import express from "express";
import {
  startSession,
  stopSession,
  getStats,
} from "../controllers/sessionController";

const router = express.Router();

router.post("/sessions/start", startSession);
router.post("/sessions/stop/:id", stopSession);
router.get("/sessions/stats", getStats);

export default router;
