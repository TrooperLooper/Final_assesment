import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";

dotenv.config(); // Load .env file

// Seed initial game data
async function seedDatabase() {
  const games = [
    { name: "Pac-man", imageUrl: "frontend/src/assets/pacman_gameicon.gif" },
    { name: "Tetris", imageUrl: "frontend/src/assets/tetris_gameicon.gif" },
    { name: "Space Invaders", imageUrl: "frontend/src/assets/space_gameicon.gif" },
    { name: "Asteroids", imageUrl: "frontend/src/assets/asteroids_gameicon.gif" },
  ];

  try {
    console.log("Checking for existing games...");
    const existingGames = await Game.countDocuments();
    if (existingGames > 0) {
      console.log("Games already exist in the database. Skipping seeding.");
      return;
    }

    console.log("Seeding games into the database...");
    await Game.insertMany(games);
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

export { seedDatabase };

    