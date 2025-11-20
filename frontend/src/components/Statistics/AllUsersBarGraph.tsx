import { useEffect, useState } from "react";
import axios from "axios";

interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalMinutes: number;
  rank: number;
}

const defaultAvatar = "/path/to/default/avatar.png";

const AllUsersBarGraph: React.FC = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/statistics/leaderboard"
        );
        setData(res.data);
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

  const maxMinutes = Math.max(...data.map((u) => u.totalMinutes), 1);

  return (
    <div className="w-full">
      <h3 className="text-white text-xl font-bold mb-4">
        All Users - Total Play Time
      </h3>
      <div className="space-y-3">
        {data.map((user) => {
          const widthPercent = (user.totalMinutes / maxMinutes) * 100;
          return (
            <div key={user.userId} className="flex items-center gap-4">
              <div className="text-white font-semibold w-8 text-right">
                #{user.rank}
              </div>
              <div className="text-white font-semibold min-w-[150px]">
                {user.userName}
              </div>
              <div className="flex-1 bg-white/20 rounded-full h-8 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="text-white text-sm font-bold">
                    {user.totalMinutes} min
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {data.length === 0 && (
        <div className="text-white/70 text-center py-8">
          No users have played yet
        </div>
      )}
    </div>
  );
};

export default AllUsersBarGraph;
