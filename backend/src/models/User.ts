import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username, required
  email: { type: String, required: true, unique: true }, // Unique email, required
  profilePicture: { type: String }, 
  createdAt: { type: Date, default: Date.now } // Auto timestamp
});

export const User = mongoose.model('User', userSchema); // Export User model