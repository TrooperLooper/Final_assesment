import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, 
  imageUrl: { type: String, default: "" }, 
  createdAt: { type: Date, default: Date.now },
  gifUrl: { type: String, default: "" }, 
});

export const Game = mongoose.model("Game", gameSchema);
