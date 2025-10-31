import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/GameRoutes"; 
import sessionRouter from "./routes/sessionRoutes";
import statisticsRoutes from './routes/statisticsRoutes';
import searchRoutes from './routes/searchRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import { connectDB } from './config/database';
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions)); // Allow requests from the frontend
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes); // Ensure this route is registered
app.use("/api/games", gameRoutes);
app.use("/api/sessions", sessionRouter);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware (must be the last middleware)
app.use(errorHandler);

// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    // Optional: seed database if needed
    // await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();