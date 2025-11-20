import Layout from "../components/Navigation/Layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGames } from "../components/api/apiClient";
import pacmanGif from "../components/assets/pacman_gameicon.gif";
import asteroidsGif from "../components/assets/asteroids_gameicon.gif";
import tetrisGif from "../components/assets/tetris_gameicon.gif";
import spaceGif from "../components/assets/space_gameicon.gif";

// Map game names to their images and colors
const gameAssets: Record<string, { image: string; color: string; small: boolean }> = {
  "Pac-man": {
    image: pacmanGif,
    color: "bg-yellow-400",
    small: true,
  },
  "Asteroids": {
    image: asteroidsGif,
    color: "bg-blue-500",
    small: false,
  },
  "Tetris": {
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

const staticGames = [
  {
    _id: "690537bcf23a2d756f728f17",
    name: "Pac-man",
    image: pacmanGif,
    color: "bg-yellow-400",
    small: true,
  },
  {
    _id: "690537bcf23a2d756f728f1a",
    name: "Asteroids",
    image: asteroidsGif,
    color: "bg-blue-500",
    small: false,
  },
  {
    _id: "690537bcf23a2d756f728f18",
    name: "Tetris",
    image: tetrisGif,
    color: "bg-pink-500",
    small: false,
  },
  {
    _id: "690537bcf23a2d756f728f19",
    name: "Space Invaders",
    image: spaceGif,
    color: "bg-green-500",
    small: false,
  },
];

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
  const [games, setGames] = useState<any[]>([]);
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
      .catch(() => setGames([]));
  }, []);

  const renderGameCard = (game: (typeof staticGames)[0]) => (
    <div
      key={game._id}
      className={`
        flex flex-col items-center rounded-xl shadow-lg ${game.color}
        p-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer
        w-[180px] h-[260px] m-2
      `}
      onClick={() => navigate(`/play/${game._id}`)}
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
          alt={`${game.name} game animation`}
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

  return (
    <>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8">
        {/* Headline on top, centered */}
        <div className="w-full flex justify-center items-center px-2 sm:px-12 pb-2 mt-2">
          <h1 className="text-3xl md:text-6xl lg:text-5xl font-['Pixelify_Sans'] text-bold text-white drop-shadow text-center mb-10">
            CHOOSE A GAME TO TRACK
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
              {(Array.isArray(games) && games.length > 0
                ? games
                : staticGames
              ).map(renderGameCard)}
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}

export default Games;
