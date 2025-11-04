import express from "express";
import { upload } from "../middleware/upload";
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  uploadAvatar,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser); // <-- best practice
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
