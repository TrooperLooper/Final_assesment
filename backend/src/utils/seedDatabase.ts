import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/database";
import { Game } from "../models/Game";


dotenv.config(); // Load .env file

async function seedDatabase() {     // Seed initial game data
    const games = [
        { name: "Pac-man", imageUrl: "/images/pacman.png" },
        { name: "Tetris", imageUrl: "/images/tetris.png" },
        { name: "Space Invaders", imageUrl: "/images/spaceinvaders.png" },
        { name: "Donkey Kong", imageUrl: "/images/donkeykong.png" }
    ];

    console.log("Seeding database finished");
}

connectDB().then(async () => {
    await seedDatabase();
    mongoose.connection.close(); // Use the imported mongoose instance
});

    