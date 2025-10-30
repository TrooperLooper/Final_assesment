<<<<<<< Updated upstream
import { Router } from "express";
=======
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
>>>>>>> Stashed changes

const router = Router();

<<<<<<< Updated upstream

export default router;
=======
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
>>>>>>> Stashed changes
