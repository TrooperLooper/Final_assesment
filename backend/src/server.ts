import mongoose from "mongoose";
import logger from "./utils/logger";
import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";


// Load environment variables first
dotenv.config();

// Validate environment variables with Zod
const envSchema = z.object({
  PORT: z.string().optional(),
  MONGO_URL: z.string().min(1, "MongoDB URL is required"),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional()
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Avoid conflict with frontend (3000)


// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); 

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: 'game-tracker',
    });
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error: ' + error);
    process.exit(1);
  }
};
connectDB();

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  profilePictureUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});