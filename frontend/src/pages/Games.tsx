import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navigation/Header";
import axios from "axios";

// Local asset/color mapping
const gameAssets = {
  "Pac-Man": {
    image: "./src/components/assets/pacman_gameicon.gif",
    color: "bg-yellow-400",
    small: true,
  },
  Asteroids: {
    image: "./src/components/assets/asteroids_gameicon.gif",
    color: "bg-blue-500",
  },
  Tetris: {
    image: "./src/components/assets/tetris_gameicon.gif",
    color: "bg-pink-500",
  },
  "Space Invaders": {
    image: "./src/components/assets/space_gameicon.gif",
    color: "bg-green-500",
  },
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

interface Game {
  _id: string;
  name: string;
  description?: string;
  gifUrl?: string;
}

function Games() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await apiClient.get("/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700">
      <Header />
      <h1 className="text-5xl font-['Pixelify_Sans'] mt-18 text-white mb-15 drop-shadow text-center">
        Choose a game to play
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {games.map((game) => {
          const asset = gameAssets[game.name] || {};
          return (
            <div
              key={game._id}
              onClick={() => navigate(`/play/${game._id}`)}
              className={`flex flex-col items-center rounded-xl shadow-lg ${
                asset.color ?? "bg-yellow-400"
              } p-4 transition-transform hover:scale-105 cursor-pointer`}
              style={{ width: "180px" }}
            >
              <div
                className="overflow-hidden rounded-lg border-4 border-white mb-3 bg-black flex items-center justify-center"
                style={{ width: "140px", height: "140px" }}
              >
                <img
                  src={asset.image || game.gifUrl}
                  alt={`${game.name} game animation`}
                  className={
                    asset.small
                      ? "object-cover w-4/5 h-4/5"
                      : "object-cover w-full h-full"
                  }
                  style={asset.small ? { width: "80px", height: "80px" } : {}}
                />
              </div>
              <h4 className="text-lg font-['Winky_Sans'] font-bold text-white text-center drop-shadow tracking-widest uppercase">
                {game.name}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
