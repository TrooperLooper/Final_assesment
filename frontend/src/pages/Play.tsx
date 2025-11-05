import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import RetroTimer from "../components/Timer/RetroTimer";
import { fetchGameById, logSession } from "../components/api/apiClient";
import pacmanGif from "../components/assets/pacman_gameicon.gif";
import asteroidsGif from "../components/assets/asteroids_gameicon.gif";
import tetrisGif from "../components/assets/tetris_gameicon.gif";
import spaceGif from "../components/assets/space_gameicon.gif";
import TypedText from "../components/Timer/TypedText"; // Import the TypedText component

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

const imageMap: Record<string, string> = {
  "pacman_gameicon.gif": pacmanGif,
  "asteroids_gameicon.gif": asteroidsGif,
  "tetris_gameicon.gif": tetrisGif,
  "space_gameicon.gif": spaceGif,
};

// New SVG icons for buttons
const PlayIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <polygon points="16,12 40,24 16,36" fill="white" />
  </svg>
);

const StopIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="14" y="14" width="20" height="20" fill="white" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 50 48"
    aria-hidden="true"
    className="animate-pulse"
  >
    {/* Circle background is handled by the button, so just the arrow here */}
    <rect x="13" y="21" width="18" height="6" fill="white" />
    <polygon points="28,14 40,24 28,34" fill="white" />
  </svg>
);

// Helper to get the color for the card
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
  const [hasStopped, setHasStopped] = useState(false); // Track if session was stopped
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progressBar, setProgressBar] = useState("[");
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

  // Update progress bar state
  useEffect(() => {
    if (isPlaying) {
      if (progressBar.length < 31) {
        // 1 for "[" + 30 spaces
        setProgressBar("[" + "\u00A0".repeat(elapsedSeconds));
      }
    } else if (!isPlaying && !hasStarted) {
      setProgressBar("[");
    }
  }, [elapsedSeconds, isPlaying, hasStarted]);

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
        <div className="flex flex-row gap-8 items-start">
          {/* Left: Colored card with GIF and button */}
          <div
            className={`
              flex flex-row items-start rounded-xl shadow-lg
              ${gameColorMap[game.name] || "bg-gray-400"}
              p-6 w-full max-w-2xl min-h-[220px] m-2
            `}
          >
            {/* Left: Image and button */}
            <div
              className="flex flex-col items-center justify-between"
              style={{ minWidth: 160 }}
            >
              {/* Image container */}
              <div
                className="overflow-hidden rounded-lg border-4 border-white mb-8 mt-2 flex items-center justify-center bg-black"
                style={{ width: "133px", height: "133px" }}
              >
                <img
                  src={
                    imageMap[game.imageUrl.split("/").pop() || ""] ||
                    game.imageUrl
                  }
                  alt={game.name}
                  className="object-cover w-full h-full mx-auto"
                />
              </div>
              {/* Dynamic button */}
              <div className="rounded-full p-0.5 bg-black/20">
                <button
                  onClick={buttonConfig.onClick}
                  className="
                    focus:outline-none active:scale-95 transition-transform
                    shadow-lg bg-black rounded-full flex items-center justify-center
                    w-16 h-16
                  "
                  aria-label={buttonConfig.text}
                >
                  {buttonConfig.text === "START" && <PlayIcon />}
                  {buttonConfig.text === "STOP" && <StopIcon />}
                  {buttonConfig.text === "EXIT" && <ArrowIcon />}
                </button>
              </div>
            </div>

            {/* Right: Timer and session saved message */}
            <div className="flex flex-col items-center justify-start flex-1 ml-6">
              {/* Timer, scaled down */}
              <div className="scale-90 w-full flex justify-center">
                <RetroTimer
                  elapsedSeconds={elapsedSeconds}
                  isStopped={!isPlaying}
                />
              </div>
              {/* Initial message */}
              <div className="mt-10 px-2  font-bold text-xl w-[360px] text-left bg-[#b6da72] rounded-lg shadow border-black/30 border-2 jersey-10-charted-regular min-h-[2.5rem] flex items-center">
                {(() => {
                  if (!hasStarted) {
                    return (
                      <TypedText
                        text="Press the start button when you are ready!"
                        speed={35}
                        className="jersey-10-charted-regular"
                      />
                    );
                  } else if (isPlaying) {
                    const bar =
                      "...................................................";
                    return (
                      <TypedText
                        text={bar}
                        speed={1000}
                        className="jersey-10-charted-regular"
                      />
                    );
                  } else if (hasStopped && elapsedSeconds > 0) {
                    return (
                      <TypedText
                        text="✓ Session saved! Click EXIT to view stats."
                        speed={30}
                        className="jersey-10-charted-regular"
                      />
                    );
                  } else {
                    return null;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Play;
