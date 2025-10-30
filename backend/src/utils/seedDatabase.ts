import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";

dotenv.config(); // Load .env file

// Seed initial game data
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
    console.log("Clearing existing games...");
    await Game.deleteMany({});
    
    console.log("Seeding games into the database...");
    await Game.insertMany(games);
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

export { seedDatabase };