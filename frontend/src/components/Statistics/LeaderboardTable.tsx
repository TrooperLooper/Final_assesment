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
        const res = await axios.get("/api/statistics/leaderboard");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <table className="min-w-full text-xs">
      <thead>
        <tr>
          <th className="text-left px-2 py-1">Rank</th>
          <th className="text-left px-2 py-1">Name</th>
          <th className="text-left px-2 py-1">Total Minutes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.userId}>
            <td className="px-2 py-1">{entry.rank}</td>
            <td className="px-2 py-1">{entry.userName}</td>
            <td className="px-2 py-1">{entry.totalMinutes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
