import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    status: "ok",
    dbConnected: dbState === 1, // 1 = connected
    dbState,
    timestamp: new Date(),
  });
});

export default router;
