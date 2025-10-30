<<<<<<< Updated upstream
=======
import { Request, Response } from "express";
import { User } from "../models/User";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  profilePicture: z.string().optional(),
});

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validated = userSchema.parse(req.body);
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
>>>>>>> Stashed changes
