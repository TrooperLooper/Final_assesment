import express from "express";
import { upload } from "../middleware/upload";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  uploadAvatar,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

// Avatar upload endpoint
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
