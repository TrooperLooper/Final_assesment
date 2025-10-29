import mongoose, { Schema } from "mongoose";

export interface IGameSession {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  playedSeconds?: number;
  durationMinutes?: number;
  playedAt?: Date;
  isActive?: boolean;
  createdAt?: Date;
}

const gameSessionSchema = new Schema<IGameSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  playedSeconds: { type: Number },
  durationMinutes: { type: Number },
  playedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const GameSession = mongoose.model<IGameSession>(
  "GameSession",
  gameSessionSchema
);
