import mongoose from "mongoose"; 

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }, // Reference to Game
  startTime: { type: Date, required: true }, // Start time
  endTime: { type: Date }, // End time 
  isActive: { type: Boolean, default: true }, // Track active status
  durationSeconds: { type: Number }, // Duration in seconds
});

export const GameSession = mongoose.model('GameSession', gameSessionSchema);