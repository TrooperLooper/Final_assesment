import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
