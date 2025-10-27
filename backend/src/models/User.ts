<<<<<<< Updated upstream
import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username, required
  email: { type: String, required: true, unique: true }, // Unique email, required
  profilePicture: { type: String }, 
  createdAt: { type: Date, default: Date.now } // Auto timestamp
});

export const User = mongoose.model('User', userSchema); // Export User model
=======
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  profilePictureUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
>>>>>>> Stashed changes
