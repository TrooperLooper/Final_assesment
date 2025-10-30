import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI!;
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}

export const config = {
  timerMultiplier: parseInt(process.env.TIMER_MULTIPLIER || '60', 10),
  // How many real seconds = 1 game hour
  // 60 = demo mode (1 minute = 1 game hour)
  // 3600 = real-time (1 hour = 1 game hour)
};
