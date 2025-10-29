import express from "express";
import { testController } from "../controllers/gameController";

const router = express.Router();

router.get("/test", testController);

export default router;
