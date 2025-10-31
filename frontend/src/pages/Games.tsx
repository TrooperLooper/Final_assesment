import Layout from "../components/Navigation/Layout";
import { useNavigate } from "react-router-dom";

const staticGames = [
  {
    _id: "pacman_id",
    name: "Pac-Man",
    image: "./src/components/assets/pacman_gameicon.gif",
    color: "bg-yellow-400",
    small: true,
  },
  {
    _id: "asteroids_id",
    name: "Asteroids",
    image: "./src/components/assets/asteroids_gameicon.gif",
    color: "bg-blue-500",
    small: false,
  },
  {
    _id: "tetris_id",
    name: "Tetris",
    image: "./src/components/assets/tetris_gameicon.gif",
    color: "bg-pink-500",
    small: false,
  },
  {
    _id: "spaceinvaders_id",
    name: "Space Invaders",
    image: "./src/components/assets/space_gameicon.gif",
    color: "bg-green-500",
    small: false,
  },
];

function Games() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Gradient background as a -z layer */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col items-center justify-start pt-5 px-2 sm:px-8">
        {/* Headline on top, centered */}
        <div className="w-full flex justify-center mt-2 mb-8">
          <h1 className="text-4xl lg:mb-4 sm:text-6xl lg:text-7xl font-bold font-['Pixelify_Sans'] text-white drop-shadow-lg text-center ml-20">
            Choose a game to play
          </h1>
        </div>
        {/* Main content below headline */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-1
                lg:gap-8
                justify-center
                overflow-hidden
                max-w-md sm:max-w-2xl lg:max-w-4xl
              "
            >
              {staticGames.map((game) => (
                <div
                  key={game._id}
                  onClick={() => navigate(`/play/${game._id}`)}
                  className={`
                    flex flex-col items-center rounded-xl shadow-lg ${game.color}
                    p-3 transition-transform hover:scale-100 cursor-pointer
                    w-[180px] h-[240px]
                    scale-75 lg:scale-90 lg:hover:scale-95
                  `}
                  style={{
                    minWidth: "120px",
                    minHeight: "160px",
                    transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
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
