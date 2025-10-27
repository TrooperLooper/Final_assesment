import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
<<<<<<< Updated upstream
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});
=======
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

>>>>>>> Stashed changes
export const Game = mongoose.model('Game', gameSchema);