import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retro-games';

async function seedDatabase() {
  const games = [
    { 
      name: "Pac-man", 
      gifUrl: "/pacman_gameicon.gif",
      description: "Classic arcade game"
    },
    { 
      name: "Tetris", 
      gifUrl: "/tetris_gameicon.gif",
      description: "Puzzle block game"
    },
    { 
      name: "Space Invaders", 
      gifUrl: "/space_gameicon.gif",
      description: "Retro space shooter"
    },
    { 
      name: "Asteroids", 
      gifUrl: "/asteroids_gameicon.gif",
      description: "Classic space game"
    },
  ];

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    
    console.log("Clearing existing games...");
    await Game.deleteMany({});
    
    console.log("Seeding games into the database...");
    const createdGames = await Game.insertMany(games);
    console.log(`Successfully seeded ${createdGames.length} games:`);
    createdGames.forEach(game => {
      console.log(`- ${game.name} (ID: ${game._id})`);
    });
    
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
}

seedDatabase();

export { seedDatabase };