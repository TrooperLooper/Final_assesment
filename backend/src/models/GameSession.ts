import mongoose, { Schema } from "mongoose"; 

interface IGameSession {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  playedSeconds?: number;
}

const gameSessionSchema = new Schema<IGameSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  playedSeconds: { type: Number }, 
});

export const GameSession = mongoose.model('GameSession', gameSessionSchema);