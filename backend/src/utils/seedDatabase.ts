import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";
import logger from "./logger";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/retro-games";

// Seed initial game data
async function seedDatabase() {
  const games = [
    {
      name: "Pac-man",
      gifUrl: "/pacman_gameicon.gif",
      description: "Classic arcade game",
    },
    {
      name: "Tetris",
      gifUrl: "/tetris_gameicon.gif",
      description: "Puzzle block game",
    },
    {
      name: "Space Invaders",
      gifUrl: "/space_gameicon.gif",
      description: "Retro space shooter",
    },
    {
      name: "Asteroids",
      gifUrl: "/asteroids_gameicon.gif",
      description: "Classic space game",
    },
  ];

  try {
    logger.info("Starting database seeding process");
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB for seeding", { database: MONGODB_URI });

    logger.info("Clearing existing games from database");
    await Game.deleteMany({});

    logger.info("Seeding games into the database");
    const createdGames = await Game.insertMany(games);
    logger.info(`Successfully seeded games`, {
      gameCount: createdGames.length,
      games: createdGames.map((g) => g.name),
    });
  } catch (error) {
    logger.error("Error seeding the database", {
      error: String(error),
      database: MONGODB_URI,
    });
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    logger.info("Database connection closed after seeding");
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();

export { seedDatabase };
