import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import logger from "./utils/logger";
<<<<<<< Updated upstream
import userRouter from "./routes/userRoutes";
import gamesRouter from "./routes/gameRoutes";
import sessionRouter from "./routes/sessionRoutes";

dotenv.config(); //Load .env file

const app = express(); //Creates the express app
app.use(express.json()); //Middleware
app.use("/uploads", express.static("uploads")); //Profile pictures (static folder)
app.use("/api/users", userRouter); //User routes
app.use("/api/games", gamesRouter); //Games routes
app.use("/api/sessions", sessionRouter); //Sessions routes

const port = process.env.PORT || 3000;

connectDB().then(() => { // Connect to DB before starting
  app.listen(port, () => console.log(`Server on port ${port}`)); // Start server
});
=======
import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";

//Models
import { User } from './models/User';
import { Game } from './models/Game';
import { GameSession } from './models/GameSession';

// Load environment variables first
dotenv.config();



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Avoid conflict with frontend (3000)


// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); 

//MongoDB connection
mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/finalAssesment_mongodb')
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => {
    logger.error('MongoDB connection failed', err);
    process.exit(1);
  });

// Zod Schemas
  const userCreate_SCHEMA = z.object({
    email: z.string().email('Invalid email'),
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().optional(),
    profilePictureUrl: z.string().url().optional(),
  });


// Mongoose Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  profilePictureUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

/* ??
const sessionSchema = new mongoose.Schema({
  userId:
*/
// Zod schema for validation?

//Routes?

//Users: Post/Get/Patch?

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

>>>>>>> Stashed changes
