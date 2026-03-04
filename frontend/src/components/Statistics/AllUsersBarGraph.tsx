import { useEffect, useState } from "react";
import { fetchAllSessions, fetchGames } from "../api/apiClient";

interface GameData {
  gameName: string;
  totalMinutes: number;
  color: string;
}

// Game-specific colors matching the theme
const GAME_COLORS: Record<string, string> = {
  "Pac-man": "#FACC15", // yellow-400
  Asteroids: "#3B82F6", // blue-500
  Tetris: "#EC4899", // pink-500
  "Space Invaders": "#22C55E", // green-500
};

const AllUsersBarGraph: React.FC = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all sessions and games
        const [sessionsData, gamesData] = await Promise.all([
          fetchAllSessions(),
          fetchGames(),
        ]);

        // Create a map to accumulate minutes per game
        const gameMinutes: Record<string, number> = {};

        // Initialize with all games (even if no sessions)
        gamesData.forEach((game: any) => {
          gameMinutes[game.name] = 0;
        });

        // Accumulate minutes from all sessions
        sessionsData.forEach((session: any) => {
          const gameName = session.gameId?.name;
          if (gameName) {
            const minutes = session.playedSeconds || 0;
            gameMinutes[gameName] += minutes;
          }
        });

        // Convert to array format with colors
        const data = Object.entries(gameMinutes).map(([name, minutes]) => ({
          gameName: name,
          totalMinutes: minutes,
          color: GAME_COLORS[name] || "#888888",
        }));

        setGameData(data);
      } catch (error) {
        console.error("Error fetching game statistics:", error);
        setGameData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-white">Loading game statistics...</div>;

  const maxMinutes = Math.max(...gameData.map((g) => g.totalMinutes), 1);

  return (
    <div className="w-full p-0">
      <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full">
        <span className="text-white text-xl font-normal font-['Jersey_20']">
          ALL USERS - TOTAL PLAY TIME PER GAME
        </span>
      </div>
      <div className="bg-transparent rounded-b-xl p-6">
        <div className="space-y-7">
          {gameData.map((game) => {
            const widthPercent = (game.totalMinutes / maxMinutes) * 100;
            return (
              <div key={game.gameName} className="flex items-center gap-4">
                {/* Game name label */}
                <div className="text-white font-bold font-['Winky_Sans'] text-base min-w-[120px]">
                  {game.gameName}
                </div>

                {/* Bar with minutes */}
                <div className="flex-1 bg-white/20 rounded-full h-8 relative overflow-visible">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max(widthPercent, 5)}%`,
                      backgroundColor: game.color,
                    }}
                  />
                  {/* Minutes text inside or next to bar */}
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm font-bold z-10">
                    {game.totalMinutes} min
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {gameData.length === 0 && (
          <div className="text-white/70 text-center py-8">
            No game sessions recorded yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersBarGraph;
