import express from "express";
import multer from "multer";
import { uploadAvatar } from "../controllers/userController.js";

const router = express.Router();

// Set up Multer for uploads to /uploads folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload avatar endpoint
router.post("/users/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
