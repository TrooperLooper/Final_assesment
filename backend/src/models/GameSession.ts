import mongoose, { Schema } from "mongoose";

export interface IGameSession {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  playedSeconds?: number;
  isActive: boolean; // Make required (not optional)
  createdAt: Date; // Make required (not optional)
  durationMinutes?: number; // Add this property to match the schema
  playedAt?: Date; // Add this property to match the schema
}

const gameSessionSchema = new Schema<IGameSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  playedSeconds: { type: Number, default: 0 },
  durationMinutes: { type: Number },
  playedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const GameSession = mongoose.model<IGameSession>(
  "GameSession",
  gameSessionSchema
);
