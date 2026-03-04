import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Game description
  imageUrl: { type: String, default: "" }, // Game image URL
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
  gifUrl: { type: String, default: "" }, // Game GIF URL
});

export const Game = mongoose.model("Game", gameSchema);
