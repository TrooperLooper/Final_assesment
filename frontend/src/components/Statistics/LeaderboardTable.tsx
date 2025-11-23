import { useEffect, useState } from "react";
import axios from "axios";

interface LeaderboardEntry {
  userName: string;
  gameName: string;
  minutes: number;
}

const LeaderboardTable: React.FC = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/statistics/leaderboard"
        );
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-white">Loading leaderboard...</div>;

  // Find top player for each game
  const games = [
    "Pac-man",
    "Tetris",
    "Asteroids",
    "Space Invaders",
  ];

  const topPlayers = games.map((game) => {
    // Find all entries for this game (case-insensitive)
    const entries = data.filter(
      (entry) => entry.gameName.toLowerCase() === game.toLowerCase()
    );
    // Find the entry with the most minutes
    if (entries.length === 0) return null;
    return entries.reduce((max, curr) => (curr.minutes > max.minutes ? curr : max));
  }).filter(Boolean);

  return (
    <div className="w-full">
      <h3 className="text-white text-xl font-bold mb-4">Top Player Per Game</h3>
      <div className="bg-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Game</th>
              <th className="text-right px-4 py-3 font-semibold">Time Played</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.length > 0 ? (
              topPlayers.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">{entry!.userName}</td>
                  <td className="px-4 py-3">{entry!.gameName}</td>
                  <td className="px-4 py-3 text-right font-semibold">{entry!.minutes} min</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-white/70 text-center py-8">
                  No game sessions recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
