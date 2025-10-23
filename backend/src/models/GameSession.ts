import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  durationMinutes: { type: Number, required: true },
  playedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const GameSession = mongoose.model('GameSession', gameSessionSchema);
