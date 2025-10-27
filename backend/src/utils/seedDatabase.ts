import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/database";
import { Game } from "../models/Game";


dotenv.config(); // Load .env file

async function seedDatabase() {     // Seed initial game data
    const games = [
        { name: "Pac-man", imageUrl: "frontend/src/assets/pacman_gameicon.gif" },
        { name: "Tetris", imageUrl: "frontend/src/assets/tetris_gameicon.gif" },
        { name: "Space Invaders", imageUrl: "frontend/src/assets/space_gameicon.gif" },
        { name: "Asteroids", imageUrl: "frontend/src/assets/asteroids_gameicon.gif" }
    ];

    console.log("Seeding database finished");
}

connectDB().then(async () => {
    await seedDatabase();
    mongoose.connection.close(); // Use the imported mongoose instance
});

    