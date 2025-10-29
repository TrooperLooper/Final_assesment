import { Request, Response } from "express";

export const uploadAvatar = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

  // Update user in DB with avatarPath
  // Example for MongoDB:
  // await User.findByIdAndUpdate(userId, { profilePicture: avatarPath });

  res.status(201).json({ profilePicture: avatarPath });
};
