import express from "express";
import multer from "multer";
import path from "path";
import { User } from "../models/User";
import logger from "../utils/logger";

const router = express.Router();

// --- Multer setup for avatar upload ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName)
      return res.status(400).json({ error: "Missing required fields" });

    const newUser = await User.create({ email, firstName, lastName });
    logger.info(`🧍 User created: ${newUser.email}`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

/*
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});
*/

router.post("/:id/upload-profilePicture", upload.single("profilePicture"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { profilePicture: `/uploads/${req.file?.filename}` },
    { new: true }
  );
  logger.info(`profilePicture uploaded for user ${req.params.id}`);
  res.json(user);
});

export default router;
