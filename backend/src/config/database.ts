import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/finalAssesment_mongodb";
  
  if (!uri) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB:', uri);
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}

export const config = {
  timerMultiplier: 2,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/finalAssesment_mongodb",
};
