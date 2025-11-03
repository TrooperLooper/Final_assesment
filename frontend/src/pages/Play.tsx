import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import RetroTimer from "../components/Timer/RetroTimer";
import {
  fetchGameById,
  logSession,
  fetchUserById,
} from "../components/api/apiClient";

const defaultAvatar = "/path/to/default/avatar.png"; // Update to your actual default avatar path

function Play() {
  const { gameId, userId } = useParams<{ gameId: string; userId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start immediately
  const [sessionLogged, setSessionLogged] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameId) {
      fetchGameById(gameId)
        .then(setGame)
        .catch((err) => {
          setError("Game not found. Please select a valid game.");
          console.error("Failed to fetch game:", err);
        });
    }
  }, [gameId]);

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // When stopped, log session (every second = 1 minute for demo)
  useEffect(() => {
    if (!isPlaying && elapsedSeconds > 0 && !sessionLogged) {
      logSession({
        userId: currentUser._id,
        gameId,
        minutesPlayed: elapsedSeconds, // 1 second = 1 minute
      });
      setSessionLogged(true);
    }
  }, [isPlaying, elapsedSeconds, sessionLogged, currentUser, gameId]);

  const handleStop = () => setIsPlaying(false);
  const handleStart = () => {
    setIsPlaying(true);
    setSessionLogged(false);
    setElapsedSeconds(0);
  };
  const handleExit = () => navigate(`/stats/${currentUser._id}`);

  if (error) {
    return (
      <Layout>
        <div className="text-red-500 text-center mt-24">{error}</div>
      </Layout>
    );
  }

  if (!game || !currentUser)
    return (
      <Layout>
        <div className="text-white text-center mt-24">Loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col items-center pt-24 px-2 sm:px-8 ml-0 md:ml-40">
        <div className="flex flex-col items-center">
          <img src={game.image} alt={game.name} className="w-32 h-32 mb-4" />
          <h1 className="text-3xl font-bold mb-8">{game.name}</h1>
          <RetroTimer elapsedSeconds={elapsedSeconds} isStopped={!isPlaying} />
          <div className="flex gap-4 mt-8">
            <button
              onClick={isPlaying ? handleStop : handleStart}
              className="border-2 border-black px-8 py-3 rounded-lg text-xl font-bold"
              disabled={sessionLogged && !isPlaying}
            >
              {isPlaying ? "STOP" : "START"}
            </button>
            <button
              onClick={handleExit}
              className="border-2 border-black px-8 py-3 rounded-lg text-xl font-bold"
            >
              Exit
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
              className="w-24 h-24 rounded-full mb-2"
            />
            <span className="font-bold text-lg">
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Play;
