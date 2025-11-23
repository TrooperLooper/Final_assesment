import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

interface SessionData {
  _id: string;
  userId: any;
  gameId: { name?: string } | null;
  playedSeconds?: number;
  createdAt: string;
}

interface WeeklyPlayTimeGraphProps {
  userId?: string;
  selectedGame: string;
  onGameChange: (game: string) => void;
}

const WeeklyPlayTimeGraph: React.FC<WeeklyPlayTimeGraphProps> = ({
  userId,
  selectedGame,
  onGameChange,
}) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sessions
        const sessionsEndpoint = userId
          ? `http://localhost:3000/api/statistics/sessions/${userId}`
          : "http://localhost:3000/api/statistics/sessions";
        const sessionsRes = await axios.get(sessionsEndpoint);
        
        console.log("Fetched sessions:", sessionsRes.data);
        console.log("Selected game:", selectedGame);
        setSessions(sessionsRes.data);

        // Fetch ALL games (not just from sessions)
        const gamesRes = await axios.get("http://localhost:3000/api/games");
        const allGames = gamesRes.data.map((g: any) => g.name);
        
        console.log("All games from API:", allGames);
        setGames(allGames);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <div className="text-white">Loading weekly stats...</div>;

  // Filter sessions by selected game
  const filteredSessions = sessions.filter((s) => s.gameId?.name === selectedGame);

  console.log("Filtered sessions for", selectedGame, ":", filteredSessions);

  // Get last 7 days starting from Monday
  const getLast7DaysFromMonday = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - daysFromMonday + i);
      return date.toISOString().split("T")[0];
    });
  };

  const last7Days = getLast7DaysFromMonday();

  // Group sessions by day
  const dailyData = last7Days.map((day) => {
    const daySessions = filteredSessions.filter(
      (s) => s.createdAt.split("T")[0] === day
    );
    const totalMinutes = daySessions.reduce((sum, s) => {
      return sum + (s.playedSeconds ? Math.round(s.playedSeconds / 60) : 0);
    }, 0);

    return {
      day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
      minutes: totalMinutes,
    };
  });

  console.log("Daily data:", dailyData);
  console.log("Max minutes:", Math.max(...dailyData.map(d => d.minutes)));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-bold">
          Weekly Play Time (Last 7 Days)
        </h3>
        <select
          value={selectedGame}
          onChange={(e) => onGameChange(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {games.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="day" stroke="#fff" />
          <YAxis
            stroke="#fff"
            domain={[0, (dataMax: number) => Math.max(dataMax, 10)]}
            tickCount={6}
            label={{
              value: "Minutes",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#fff" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #fff",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: "#ec4899", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {dailyData.every((d) => d.minutes === 0) && (
        <div className="text-white/70 text-center mt-4">
          No play time recorded in the last 7 days
        </div>
      )}
    </div>
  );
};

export default WeeklyPlayTimeGraph;
