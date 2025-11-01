import Layout from "../components/Navigation/Layout";
import { useNavigate } from "react-router-dom";

const staticGames = [
  {
    _id: "pacman_id",
    name: "Pac-Man",
    image: "./src/components/assets/pacman_gameicon.gif",
    color: "bg-yellow-400",
    small: true,
    objectId: "69053c8af23a2d756f728f21", // <-- MongoDB ObjectId for Pac-Man
  },
  {
    _id: "asteroids_id",
    name: "Asteroids",
    image: "./src/components/assets/asteroids_gameicon.gif",
    color: "bg-blue-500",
    small: false,
    objectId: "69053c8af23a2d756f728f25", // <-- MongoDB ObjectId for Asteroids
  },
  {
    _id: "tetris_id",
    name: "Tetris",
    image: "./src/components/assets/tetris_gameicon.gif",
    color: "bg-pink-500",
    small: false,
    objectId: "69053c8af23a2d756f728f27", // <-- MongoDB ObjectId for Tetris
  },
  {
    _id: "spaceinvaders_id",
    name: "Space Invaders",
    image: "./src/components/assets/space_gameicon.gif",
    color: "bg-green-500",
    small: false,
    objectId: "69053c8af23a2d756f728f29", // <-- MongoDB ObjectId for Space Invaders
  },
];

function Games() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <Layout>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8">
        {/* Headline on top, centered */}
        <div className="w-full flex justify-center items-center px-2 sm:px-12 pb-2 mt-2">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-['Pixelify_Sans'] text-white drop-shadow text-center">
            CHOOSE A GAME TO PLAY
          </h1>
        </div>
        {/* Main content below headline */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-4
                gap-8
                justify-center
                overflow-hidden
                max-w-md sm:max-w-2xl lg:max-w-4xl
              "
            >
              {staticGames.map((game) => (
                <div
                  key={game._id}
                  className="game-card cursor-pointer hover:scale-105 active:scale-95 transition"
                  onClick={() => navigate(`/play/${game.objectId}`)}
                >
                  {/* Game card content */}
                  <div
                    className="overflow-hidden rounded-lg border-4 border-white mb-3 bg-black flex items-center justify-center"
                    style={{ width: "140px", height: "140px" }}
                  >
                    <img
                      src={game.image}
                      alt={`${game.name} game animation`}
                      className={
                        game.small
                          ? "object-cover w-4/5 h-4/5"
                          : "object-cover w-full h-full"
                      }
                      style={
                        game.small ? { width: "80px", height: "80px" } : {}
                      }
                    />
                  </div>
                  <h4 className="text-lg font-bold font-['Winky_Sans'] text-white text-center drop-shadow tracking-widest uppercase">
                    {game.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Games;
