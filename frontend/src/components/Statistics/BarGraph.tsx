import React, { useEffect, useState } from "react";
import { fetchUserStats } from "../api/apiClient";

const GAME_COLORS: Record<string, string> = {
  "Pac-man": "#FACC15",
  Asteroids: "#3B82F6",
  Tetris: "#EC4899",
  "Space Invaders": "#22C55E",
};

const ALL_GAMES = ["Pac-man", "Tetris", "Asteroids", "Space Invaders"];

interface BarGraphProps {
  userId?: string;
}

interface GameStat {
  gameName: string;
  minutesPlayed: number;
  iconUrl: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ userId }) => {
  const [data, setData] = useState<GameStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const currentUserId =
          userId ||
          JSON.parse(localStorage.getItem("currentUser") || "null")?._id;

        if (!currentUserId) {
          setData([]);
          setLoading(false);
          return;
        }

        const res = await fetchUserStats(currentUserId);
        setData(res.gameStats || []);
      } catch (error) {
        console.error("Error fetching game stats:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [userId]);

  if (loading) return <div className="text-white">Loading stats...</div>;

  const filledData = ALL_GAMES.map((name) => {
    const found = data.find((item) => item.gameName === name);
    return found || { gameName: name, minutesPlayed: 0, iconUrl: "" };
  });

  // Find the largest minutesPlayed for dynamic scaling
  const maxMinutes = Math.max(...filledData.map((g) => g.minutesPlayed));

  return (
    <div className="w-full" style={{ height: "220px", paddingTop: "1px" }}>
      <div className="space-y-7">
        {filledData.map((game) => {
          const widthPercent =
            maxMinutes > 0 ? (game.minutesPlayed / maxMinutes) * 100 : 0;
          const barColor =
            game.minutesPlayed > 0
              ? GAME_COLORS[game.gameName] || "#888"
              : "transparent";
          return (
            <div key={game.gameName} className="flex items-center gap-4">
              <div className="text-white font-bold font-['Winky_Sans'] text-base min-w-[120px]">
                {game.gameName}
              </div>
              <div className="flex-1 bg-white/20 rounded-full h-8 relative overflow-visible">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: maxMinutes > 0 ? `${widthPercent}%` : "60px",
                    minWidth: game.minutesPlayed > 0 ? "60px" : "0",
                    backgroundColor: barColor,
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm font-bold z-10">
                  {game.minutesPlayed} min
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarGraph;
