import { Request, Response } from "express";
import { User } from "../models/User";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1), // Add lastName to the schema
  profilePicture: z.string().optional(), // Use profilePicture for consistency
});

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("📋 Fetching all users...");
    const users = await User.find();
    console.log(`✅ Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const avatarPath = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.profilePicture;
    const validated = userSchema.parse({
      ...req.body,
      profilePicture: avatarPath,
    });
    const newUser = await User.create(validated);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Picture upload endpoint
export const uploadAvatar = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

  // Update user in DB with avatarPath
  await User.findByIdAndUpdate(userId, { profilePicture: avatarPath });

  res.status(201).json({ profilePicture: avatarPath });
};

// Middleware to check required fields
export const checkRequiredFields = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    return res
      .status(400)
      .json({ error: "Email, firstName, and lastName are required." });
  }
  next();
};
