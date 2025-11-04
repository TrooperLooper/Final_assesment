import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import RetroTimer from "../components/Timer/RetroTimer";
import { fetchGameById, logSession } from "../components/api/apiClient";

const defaultAvatar = "/src/assets/user_default.jpeg";

interface Game {
  _id: string;
  name: string;
  image: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

function Play() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get current user from localStorage
  const currentUser: User | null = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  // Fetch game data
  useEffect(() => {
    if (!gameId) {
      setError("No game selected");
      return;
    }

    fetchGameById(gameId)
      .then(setGame)
      .catch((err) => {
        setError("Game not found. Please select a valid game.");
        console.error("Failed to fetch game:", err);
      });
  }, [gameId]);

  // Timer interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleStop = async () => {
    setIsPlaying(false);

    // Log session immediately when stopping
    if (elapsedSeconds > 0 && currentUser && gameId) {
      try {
        await logSession({
          userId: currentUser._id,
          gameId,
          minutesPlayed: elapsedSeconds, // 1 second = 1 minute for demo
        });
        console.log(`Session logged: ${elapsedSeconds} minutes`);
      } catch (err) {
        console.error("Failed to log session:", err);
      }
    }
  };

  const handleStart = () => {
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const handleExit = () => {
    if (currentUser) {
      navigate(`/stats/${currentUser._id}`);
    } else {
      navigate("/users");
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="text-red-500 text-center mt-24">{error}</div>
      </Layout>
    );
  }

  if (!game || !currentUser) {
    return (
      <Layout>
        <div className="text-white text-center mt-24">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col items-center pt-24 px-2 sm:px-8 ml-0 md:ml-40">
        <div className="flex flex-col items-center">
          <img src={game.image} alt={game.name} className="w-32 h-32 mb-4" />
          <h1 className="text-3xl font-bold mb-8 text-white">{game.name}</h1>

          <RetroTimer elapsedSeconds={elapsedSeconds} isStopped={!isPlaying} />

          <div className="flex gap-4 mt-8">
            <button
              onClick={isPlaying ? handleStop : handleStart}
              className="bg-yellow-400 text-pink-900 border-2 border-black px-8 py-3 rounded-lg text-xl font-bold hover:bg-yellow-300 active:scale-95"
            >
              {isPlaying ? "STOP" : "START"}
            </button>
            <button
              onClick={handleExit}
              className="bg-pink-500 text-white border-2 border-black px-8 py-3 rounded-lg text-xl font-bold hover:bg-pink-400 active:scale-95"
            >
              EXIT
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <img
              src={
                currentUser.profilePicture && currentUser.profilePicture.trim()
                  ? currentUser.profilePicture
                  : defaultAvatar
              }
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-24 h-24 rounded-full mb-2 border-4 border-white"
            />
            <span className="font-bold text-lg text-white">
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Play;
