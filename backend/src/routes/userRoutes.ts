import express from "express";
import { upload } from "../middleware/upload";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  uploadAvatar,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);              // Changed from /users
router.get("/:id", getUserById);           // Changed from /users/:id
router.post("/", createUser);              // Changed from /users
router.put("/:id", updateUserById);        // Changed from /users/:id
router.delete("/:id", deleteUserById);     // Changed from /users/:id
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
