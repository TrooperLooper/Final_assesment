import Layout from "../components/Navigation/Layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGames } from "../components/api/apiClient";
import pacmanGif from "../components/assets/pacman_gameicon.gif";
import asteroidsGif from "../components/assets/asteroids_gameicon.gif";
import tetrisGif from "../components/assets/tetris_gameicon.gif";
import spaceGif from "../components/assets/space_gameicon.gif";

// Map game names to their images and colors
const gameAssets: Record<
  string,
  { image: string; color: string; small: boolean }
> = {
  "Pac-man": {
    image: pacmanGif,
    color: "bg-yellow-400",
    small: true,
  },
  Asteroids: {
    image: asteroidsGif,
    color: "bg-blue-500",
    small: false,
  },
  Tetris: {
    image: tetrisGif,
    color: "bg-pink-500",
    small: false,
  },
  "Space Invaders": {
    image: spaceGif,
    color: "bg-green-500",
    small: false,
  },
};

// Sharp-edged, fat joystick SVG
const JoystickSVG = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    className="mx-auto mt-4"
    aria-hidden="true"
  >
    {/* Vertical bar */}
    <rect x="18" y="6" width="12" height="36" fill="black" />
    {/* Horizontal bar */}
    <rect x="6" y="18" width="36" height="12" fill="black" />
  </svg>
);

function Games() {
  const [games, setGames] = useState<
    Array<{
      _id: string;
      name: string;
      image: string;
      color: string;
      small: boolean;
    }>
  >([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames()
      .then((data) => {
        // Merge API data with local assets
        const gamesWithAssets = Array.isArray(data)
          ? data.map((game: any) => ({
              ...game,
              image: gameAssets[game.name]?.image || "",
              color: gameAssets[game.name]?.color || "bg-gray-400",
              small: gameAssets[game.name]?.small || false,
            }))
          : [];
        setGames(gamesWithAssets);
      })
      .catch((error) => {
        console.error("Failed to fetch games:", error);
        setGames([]);
      });

    // Check for current user in localStorage
    const user = localStorage.getItem("currentUser");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const renderGameCard = (game: {
    _id: string;
    name: string;
    image: string;
    color: string;
    small: boolean;
  }) => {
    const isDisabled = !currentUser;

    return (
      <div
        key={game._id}
        className={`
        flex flex-col items-center rounded-xl shadow-lg ${game.color}
        p-4 transition-transform ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95 cursor-pointer"
        }
        w-[180px] h-[260px] m-2
      `}
        onClick={() => {
          if (!isDisabled) {
            navigate(`/play/${game._id}`);
          }
        }}
        style={{
          minWidth: "120px",
          minHeight: "160px",
        }}
      >
        {/* Image container always same size, fills with black */}
        <div
          className="overflow-hidden rounded-lg border-4 border-white mb-3 flex items-center justify-center bg-black"
          style={{ width: "140px", height: "140px" }}
        >
          <img
            src={game.image}
            alt={`Animated preview of ${game.name}`}
            className={
              game.small
                ? "object-cover w-4/5 h-4/5 mx-auto"
                : "object-cover w-full h-full mx-auto"
            }
            style={game.small ? { width: "80px", height: "80px" } : {}}
          />
        </div>
        {/* Game name: slightly smaller, uniform font size, tight line height */}
        <h4
          className="font-bold font-['Winky_Sans'] text-white text-center drop-shadow tracking-widest uppercase leading-tight"
          style={{
            fontSize: "0.90rem",
            maxWidth: "130px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: 0,
            lineHeight: 1.05,
          }}
          title={game.name}
        >
          {game.name}
        </h4>
        <JoystickSVG />
      </div>
    );
  };

  return (
    <>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-green-900 via-green-500 to-yellow-300" />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8 relative">
          {/* Error message when no user is selected - now absolutely positioned above game cards */}
          {!currentUser && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm mt-30">
              <div className="border-4 border-white bg-red-900 p-6 text-center font-['Jersey_20'] shadow-2xl">
                {/* Retro header bar */}
                <div className="mb-4 pb-3 border-b-2 border-white">
                  <p className="text-white text-xl font-bold tracking-widest">
                    WHOOPSIE ALERT
                  </p>
                </div>
                {/* Main message */}
                <div className="mb-4">
                  <p className="text-white text-sm">No user found.</p>
                  <p className="text-white text-sm">
                    Please register or select a user first.
                  </p>
                </div>
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5 pt-3 border-t-2 border-white">
                  <button
                    onClick={() => navigate("/register")}
                    className="border-2 border-white bg-transparent text-white font-bold py-1 px-4 rounded transition-all hover:bg-white/10 active:scale-95 font-['Jersey_20'] text-sm tracking-wide"
                  >
                    ► register
                  </button>
                  <button
                    onClick={() => navigate("/users")}
                    className="border-2 border-white bg-transparent text-white font-bold py-1 px-4 rounded transition-all hover:bg-white/10 active:scale-95 font-['Jersey_20'] text-sm tracking-wide"
                  >
                    ► select user
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Headline on top, centered */}
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-center font-['Jersey_20'] sm:mt-4 mb-12 text-white drop-shadow-lg">
              CHOOSE A GAME
            </h1>
          </div>
          {/* Main content below headline */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-4xl flex flex-col items-center gap-8">
              <div
                className="
            flex flex-wrap justify-center gap-8
            max-w-md sm:max-w-2xl lg:max-w-4xl
          "
              >
                {games.length > 0 ? (
                  games.map(renderGameCard)
                ) : (
                  <div className="text-white text-center py-8">
                    <p className="text-lg">Loading games...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Games;
