import { useEffect, useState } from "react";
import axios from "axios";

interface LeaderboardTableProps {
  // No need to pass data, will fetch from backend
}

interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalMinutes: number;
  rank: number;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = () => {
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

  return (
    <div className="w-full">
      <h3 className="text-white text-xl font-bold mb-4">Global Leaderboard</h3>
      <div className="bg-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Rank</th>
              <th className="text-left px-4 py-3 font-semibold">Player</th>
              <th className="text-right px-4 py-3 font-semibold">
                Total Minutes
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.userId}
                className={`border-b border-white/10 ${
                  index < 3 ? "bg-yellow-500/20" : ""
                }`}
              >
                <td className="px-4 py-3 font-bold">
                  {entry.rank === 1 && "🥇"}
                  {entry.rank === 2 && "🥈"}
                  {entry.rank === 3 && "🥉"}
                  {entry.rank > 3 && `#${entry.rank}`}
                </td>
                <td className="px-4 py-3">{entry.userName}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {entry.totalMinutes} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="text-white/70 text-center py-8">
            No players on the leaderboard yet
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
