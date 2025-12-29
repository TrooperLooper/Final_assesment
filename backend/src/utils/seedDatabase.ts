import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";
import { User } from "../models/User";
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

  const users = [
    {
      email: "anders@retrogaming.se",
      firstName: "Anders",
      lastName: "Svensson",
      profilePictureUrl: "http://localhost:3000/avatars/sabineWren.jpg",
    },
    {
      email: "ingrid@retrogaming.se",
      firstName: "Ingrid",
      lastName: "Norström",
      profilePictureUrl: "http://localhost:3000/avatars/mazKanata.jpg",
    },
    {
      email: "lars@retrogaming.se",
      firstName: "Lars",
      lastName: "Bergström",
      profilePictureUrl: "http://localhost:3000/avatars/galenErso.jpg",
    },
    {
      email: "maja@retrogaming.se",
      firstName: "Maja",
      lastName: "Lundgren",
      profilePictureUrl: "http://localhost:3000/avatars/antBeru.jpg",
    },
  ];

  try {
    logger.info("Starting database seeding process");
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB for seeding", { database: MONGODB_URI });

    logger.info("Clearing existing games and users from database");
    await Game.deleteMany({});
    await User.deleteMany({});

    logger.info("Seeding games into the database");
    const createdGames = await Game.insertMany(games);
    logger.info(`Successfully seeded games`, {
      gameCount: createdGames.length,
      games: createdGames.map((g) => g.name),
    });

    logger.info("Seeding test users into the database");
    const createdUsers = await User.insertMany(users);
    logger.info(`Successfully seeded users`, {
      userCount: createdUsers.length,
      users: createdUsers.map((u) => `${u.firstName} ${u.lastName}`),
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
