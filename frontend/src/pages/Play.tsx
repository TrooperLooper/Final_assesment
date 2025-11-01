import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../components/Timer/Timer";
import {
  fetchGameById,
  startSession,
  stopSession,
} from "../components/api/apiClient";

interface Game {
  _id: string;
  name: string;
  imageUrl: string;
}

function Play() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const userId = localStorage.getItem("currentUserId") || "";

  useEffect(() => {
    const loadGame = async () => {
      if (gameId) {
        try {
          const gameData = await fetchGameById(gameId);
          setGame(gameData);
        } catch (error) {
          console.error("Failed to load game:", error);
        }
      }
    };
    loadGame();
  }, [gameId]);

  const handleStart = async () => {
    try {
      const session = await startSession(userId, gameId!);
      setSessionId(session._id);
      setIsPlaying(true);
      setTimerActive(true);
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  const handleStop = async (elapsedSeconds?: number) => {
    try {
      if (sessionId) {
        await stopSession(sessionId, elapsedSeconds); // Pass duration to backend
        setIsPlaying(false);
        setTimerActive(false);
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
          <img src={game.imageUrl} alt={game.name} className="w-32 h-32" />
        </div>

        <h1 className="game_title text-4xl font-bold text-center mb-8">
          {game.name}
        </h1>

        {isPlaying ? (
          <div className="bg-gray-800 rounded-lg p-6">
            <Timer isPlaying={timerActive} onStop={handleStop} />
            <button
              onClick={() => {
                setTimerActive(false);
                handleStop();
              }}
              className="play_stop_button rounded-2xl bg-red-700 hover:bg-red-800 text-white px-8 py-3 mt-6 w-full font-bold"
            >
              Stop Playing
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              handleStart();
              setTimerActive(true);
            }}
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
