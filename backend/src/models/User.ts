import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String }, 
  createdAt: { type: Date, default: Date.now } 
});

export const User = mongoose.model('User', userSchema); 