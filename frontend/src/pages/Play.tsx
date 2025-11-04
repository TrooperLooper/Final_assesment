import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import RetroTimer from "../components/Timer/RetroTimer";
import { fetchGameById, logSession } from "../components/api/apiClient";

const defaultAvatar = "/src/assets/user_default.jpeg";

interface Game {
  _id: string;
  name: string;
  imageUrl: string;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false); // Track if session was stopped
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

  const handleStart = () => {
    setHasStarted(true);
    setHasStopped(false);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const handleStop = async () => {
    setIsPlaying(false);
    setHasStopped(true);

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

  const handleExit = () => {
    if (currentUser) {
      navigate(`/stats/${currentUser._id}`);
    } else {
      navigate("/users");
    }
  };

  // Determine button state
  const getButtonConfig = () => {
    if (!hasStarted || (hasStopped && elapsedSeconds === 0)) {
      // State 1: START (initial or after exit)
      return {
        text: "START",
        onClick: handleStart,
        className: "bg-green-500 text-white hover:bg-green-400",
      };
    } else if (isPlaying) {
      // State 2: STOP (while playing)
      return {
        text: "STOP",
        onClick: handleStop,
        className: "bg-red-500 text-white hover:bg-red-400",
      };
    } else {
      // State 3: EXIT (after stopping)
      return {
        text: "EXIT",
        onClick: handleExit,
        className: "bg-blue-500 text-white hover:bg-blue-400",
      };
    }
  };

  const buttonConfig = getButtonConfig();

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
          {/* Game GIF */}
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-48 h-48 mb-4 rounded-lg border-4 border-white shadow-lg"
          />

          {/* Game Name */}
          <h1 className="text-4xl font-bold mb-8 text-white font-['Pixelify_Sans'] drop-shadow-lg">
            {game.name}
          </h1>

          {/* Timer */}
          <RetroTimer elapsedSeconds={elapsedSeconds} isStopped={!isPlaying} />

          {/* Button (START → STOP → EXIT) */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={buttonConfig.onClick}
              className={`
                px-8 py-3 rounded-lg text-xl font-bold border-2 border-black
                transition-all active:scale-95
                ${buttonConfig.className}
              `}
            >
              {buttonConfig.text}
            </button>
          </div>

          {/* User Info */}
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

          {/* Session Saved Message */}
          {hasStopped && elapsedSeconds > 0 && (
            <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-bold">
              ✓ Session saved! Click EXIT to view stats.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Play;
