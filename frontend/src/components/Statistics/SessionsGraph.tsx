import { useEffect, useState } from "react";
import { fetchAllSessions, fetchUserSessions } from "../api/apiClient";

interface SessionsGraphProps {
  userId?: string; // Optional: filter by user
}

interface SessionData {
  _id: string;
  userId: { _id: string; firstName: string; lastName: string } | string;
  gameId: { _id: string; name: string; imageUrl?: string } | string;
  startTime: string;
  endTime?: string;
  playedSeconds?: number;
  createdAt: string;
}

interface GameStats {
  sessions: number;
  totalMinutes: number;
}

const SessionsGraph: React.FC<SessionsGraphProps> = ({ userId }) => {
  const [data, setData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const endpoint = userId
          ? `http://localhost:3000/api/statistics/sessions/${userId}`
          : "http://localhost:3000/api/statistics/sessions";
        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [userId]);

  if (loading) return <div className="text-white">Loading sessions...</div>;

  // Group sessions by game
  const sessionsByGame = data.reduce(
    (acc: Record<string, GameStats>, session) => {
      const gameName =
        typeof session.gameId === "object" && session.gameId
          ? session.gameId.name
          : "Unknown Game";
      if (!acc[gameName]) {
        acc[gameName] = { sessions: 0, totalMinutes: 0 };
      }
      acc[gameName].sessions++;
      acc[gameName].totalMinutes += session.playedSeconds
        ? Math.round(session.playedSeconds / 60)
        : 0;
      return acc;
    },
    {}
  );

  return (
    <div className="w-full p-0">
      <div className="bg-indigo-950 rounded-t-xl text-center px-4 py-2 w-full">
        <span className="text-yellow-300 text-xl font-normal font-['Jersey_20']">
          SESSIONS OVERVIEW
        </span>
      </div>
      <div className="bg-transparent rounded-b-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(sessionsByGame).map(
            ([gameName, stats]: [string, GameStats]) => (
              <div
                key={gameName}
                className="bg-white/20 rounded-lg p-6 flex flex-col items-center justify-center"
              >
                <div className="text-white text-4xl font-bold mb-2">
                  {stats.sessions}
                </div>
                <div className="text-white text-sm font-semibold mb-1">
                  {gameName}
                </div>
                <div className="text-white/70 text-xs">
                  {stats.totalMinutes} min total
                </div>
              </div>
            )
          )}
        </div>
        {Object.keys(sessionsByGame).length === 0 && (
          <div className="text-white/70 text-center py-8">
            No sessions recorded yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsGraph;
