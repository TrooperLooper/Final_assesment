import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true }, // Reference to Game
  startTime: { type: Date, required: true }, // Start time of the session
  endTime: { type: Date }, // End time of the session
  durationMinutes: { type: Number }, // Duration of the session in minutes
  playedAt: { type: Date, default: Date.now }, // When the session was played
  isActive: { type: Boolean, default: true }, // Track active status
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
});

export const GameSession = mongoose.model("GameSession", gameSessionSchema);
