import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/Game";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finalAssesment_mongodb';

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
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing games
    await Game.deleteMany({});
    console.log('🗑️  Cleared existing games');

    // Insert new games
    const result = await Game.insertMany(games);
    console.log(`✅ Seeded ${result.length} games successfully`);
    
    // List the games
    console.log('Games in database:', result.map(g => g.name));

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed function
seedDatabase();