import { Request, Response } from "express";
import { User } from "../models/User";
import { z } from "zod";
import logger from "../utils/logger";

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1), // Add lastName to the schema
  profilePicture: z.string().optional(), // Use profilePicture for consistency
});

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    logger.info(`Retrieved ${users.length} users from database`);
    res.json(users);
  } catch (error) {
    logger.error("Error fetching users", { error: String(error) });
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      logger.warn(`User not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`Retrieved user: ${req.params.id}`);
    res.json(user);
  } catch (error) {
    logger.error("Error fetching user by ID", {
      error: String(error),
      userId: req.params.id,
    });
    res.status(500).json({ message: "Error fetching user", error });
  }
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
    logger.info(`New user registered: ${validated.email}`, {
      userId: newUser._id,
      firstName: validated.firstName,
      lastName: validated.lastName,
      hasProfilePicture: !!avatarPath,
    });
    res.status(201).json(newUser);
  } catch (err) {
    logger.error("Error creating user", {
      error: String(err),
      email: req.body.email,
    });
    res.status(400).json(err);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      logger.warn(`Attempted to update non-existent user: ${req.params.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`User updated: ${req.params.id}`, {
      updateFields: Object.keys(req.body),
    });
    res.json(user);
  } catch (error) {
    logger.error("Error updating user", {
      error: String(error),
      userId: req.params.id,
    });
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      logger.warn(`Attempted to delete non-existent user: ${req.params.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`User deleted: ${req.params.id}`, { userEmail: user.email });
    res.json({ message: "User deleted" });
  } catch (error) {
    logger.error("Error deleting user", {
      error: String(error),
      userId: req.params.id,
    });
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Picture upload endpoint
export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!avatarPath) {
      logger.warn(`Avatar upload attempted without file for user: ${userId}`);
      return res.status(400).json({ message: "No file provided" });
    }

    // Update user in DB with avatarPath
    await User.findByIdAndUpdate(userId, { profilePicture: avatarPath });
    logger.info(`Avatar uploaded for user: ${userId}`, {
      fileName: req.file?.filename,
    });

    res.status(201).json({ profilePicture: avatarPath });
  } catch (error) {
    logger.error("Error uploading avatar", {
      error: String(error),
      userId: req.body.userId,
    });
    res.status(500).json({ message: "Error uploading avatar", error });
  }
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
