import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

export default router;