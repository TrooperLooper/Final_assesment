import express from "express";
import { upload } from "../middleware/upload";
import { createUser } from "../controllers/userController";

const router = express.Router();

router.post("/", upload.single("profilePicture"), createUser);

export default router;