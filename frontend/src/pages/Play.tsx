import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "../components/Timer/Timer"; 

// Define the Game interface
interface Game {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

// Define the Session interface
interface Session {
  _id: string;
  userId: string;
  gameId: string;
  startTime: string;
  endTime?: string;
}

// API client setup
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Fetch game by ID
const fetchGameById = async (gameId: string): Promise<Game> => {
  const response = await apiClient.get<Game>(`/games/${gameId}`);
  return response.data;
};

// Start a session
const startSession = async (userId: string, gameId: string): Promise<Session> => {
  const response = await apiClient.post<Session>("/sessions/start", { userId, gameId });
  return response.data;
};

// Stop a session
const stopSession = async (sessionId: string): Promise<void> => {
  await apiClient.post(`/sessions/stop`, { sessionId });
};

function Play() {
  const { gameId } = useParams<{ gameId: string }>();
  console.log("Game ID:", gameId);

  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userId = localStorage.getItem("currentUserId") || "";

  useEffect(() => {
    const loadGame = async () => {
      if (gameId) {
        try {
          const gameData = await fetchGameById(gameId);
          setGame(gameData);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Failed to load game:", error.response?.data || error.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    };
    loadGame();
  }, [gameId]);

  const handleStart = async () => {
      try {
        if (userId && gameId) {
          const session = await startSession(userId, gameId);
          console.log("Session started:", session);
          setSessionId(session._id);
          setIsPlaying(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to start session:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

  const handleStop = async () => {
    console.log("Stop button clicked");
    try {
      if (sessionId) {
        await stopSession(sessionId);
        console.log("Session stopped");
        setIsPlaying(false);
        navigate(`/stats/${userId}`);
      }
    } catch (error) {
      console.error("Failed to stop session:", error);
    }
  };

  if (!game) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="icon_div mb-6 flex justify-center">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt="Game" />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <h1 className="game_title text-4xl font-bold text-center mb-8">
          {game.name}
        </h1>
        {isPlaying ? (
          <div className="bg-gray-800 rounded-lg p-6">
            <Timer duration={3600} autoStart={true} />
            <button
              onClick={handleStop}
              className="play_stop_button rounded-2xl bg-red-700 hover:bg-red-800 text-white px-8 py-3 mt-6 w-full font-bold"
            >
              Stop Playing
            </button>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="play_stop_button rounded-2xl bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 w-full font-bold"
          >
            Start Playing
          </button>
        )}
      </div>
    </div>
  );
}

export default Play;