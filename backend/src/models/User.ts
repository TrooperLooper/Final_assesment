import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
