import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import { GameCard } from "../components/Timer/GameCard";
import { logSession, fetchGameById } from "../components/api/apiClient";
import pacmanGif from "../components/assets/pacman_gameicon.gif";
import asteroidsGif from "../components/assets/asteroids_gameicon.gif";
import tetrisGif from "../components/assets/tetris_gameicon.gif";
import spaceGif from "../components/assets/space_gameicon.gif";

interface Game {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

const gameImageMap: Record<string, string> = {
  "Pac-man": pacmanGif,
  Asteroids: asteroidsGif,
  Tetris: tetrisGif,
  "Space Invaders": spaceGif,
};

const gameColorMap: Record<string, string> = {
  "Pac-man": "bg-yellow-400",
  Asteroids: "bg-blue-500",
  Tetris: "bg-pink-500",
  "Space Invaders": "bg-green-500",
};

function Play() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentUser: User | null = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  useEffect(() => {
    if (!gameId) {
      setError("No game selected");
      return;
    }

    console.log("Fetching game with ID:", gameId);
    fetchGameById(gameId)
      .then((data) => {
        console.log("Game data received:", data);
        setGame(data);
      })
      .catch((err) => {
        console.error("Failed to fetch game:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        setError(
          `Game not found. Error: ${err.response?.data?.message || err.message}`
        );
      });
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

  const handleStart = async () => {
    setHasStarted(true);
    setHasStopped(false);
    setElapsedSeconds(0);
    setIsPlaying(true);

    if (currentUser && gameId) {
      console.log("Logging START session...");
      try {
        await logSession({
          userId: currentUser._id,
          gameId,
          playedSeconds: 0,
        });
        console.log("Start session logged");
      } catch (err) {
        console.error("Failed to start session:", err);
      }
    }
  };

  const handleStop = async () => {
    setIsPlaying(false);
    setHasStopped(true);

    if (elapsedSeconds > 0 && currentUser && gameId) {
      console.log("Logging STOP session with", elapsedSeconds, "seconds");
      try {
        await logSession({
          userId: currentUser._id,
          gameId,
          playedSeconds: elapsedSeconds,
        });
        console.log(
          `Session logged: ${elapsedSeconds} minutes (${elapsedSeconds} real seconds)`
        );
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

  const getButtonState = (): "START" | "STOP" | "EXIT" => {
    if (!hasStarted || (hasStopped && elapsedSeconds === 0)) return "START";
    if (isPlaying) return "STOP";
    return "EXIT";
  };

  const getButtonHandler = () => {
    const state = getButtonState();
    if (state === "START") return handleStart;
    if (state === "STOP") return handleStop;
    return handleExit;
  };

  if (error) {
    return (
      <>
        <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
        <Layout>
          <div className="text-red-500 text-center mt-24">{error}</div>
        </Layout>
      </>
    );
  }

  if (!game || !currentUser) {
    return (
      <>
        <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
        <Layout>
          <div className="text-white text-center mt-24">Loading...</div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-green-900 via-green-500 to-yellow-300" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center pt-24 px-2 sm:px-8">
          <div className="flex flex-row gap-8 items-start">
            <GameCard
              gameName={game.name}
              gameImage={gameImageMap[game.name] || ""}
              gameColor={gameColorMap[game.name] || "bg-gray-400"}
              buttonState={getButtonState()}
              onButtonClick={getButtonHandler()}
              elapsedSeconds={elapsedSeconds}
              isStopped={!isPlaying}
              hasStarted={hasStarted}
              isPlaying={isPlaying}
              hasStopped={hasStopped}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Play;
