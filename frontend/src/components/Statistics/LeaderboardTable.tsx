import { useEffect, useState } from "react";
import { fetchLeaderboard, fetchGames } from "../api/apiClient";

interface LeaderboardEntry {
  userName: string;
  gameName: string;
  minutes: number;
}

const LeaderboardTable: React.FC = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardData, gamesData] = await Promise.all([
          fetchLeaderboard(),
          fetchGames(),
        ]);
        setData(Array.isArray(leaderboardData) ? leaderboardData : []);
        setGames(gamesData.map((g: any) => g.name));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setData([]);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading leaderboard...</div>;

  // Find top player for each game
  const topPlayers = games
    .map((game) => {
      // Find all entries for this game (case-insensitive)
      const entries = data.filter(
        (entry) => entry.gameName.toLowerCase() === game.toLowerCase()
      );
      // Find the entry with the most minutes
      if (entries.length === 0) return null;
      return entries.reduce((max, curr) =>
        curr.minutes > max.minutes ? curr : max
      );
    })
    .filter(Boolean);

  return (
    <div className="w-full p-0">
      <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full">
        <span className="text-white text-xl font-normal font-['Jersey_20']">
          TOP PLAYER PER GAME
        </span>
      </div>
      <div className="bg-transparent rounded-b-xl p-6">
        <div className="bg-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-white">
            <thead className="bg-white/20">
              <tr>
                <th className="text-left px-4 py-3 font-['Winky_Sans'] font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-['Winky_Sans'] font-semibold">
                  Game
                </th>
                <th className="text-right px-4 py-3 font-['Winky_Sans'] font-semibold">
                  Time Played
                </th>
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
                    <td className="px-4 py-3 text-right font-semibold">
                      {entry!.minutes} min
                    </td>
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
    </div>
  );
};

export default LeaderboardTable;
