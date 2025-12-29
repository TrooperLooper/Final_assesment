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
import { fetchAllSessions, fetchGames } from "../api/apiClient";
import { getUserColor } from "../../utils/userColors";

interface SessionData {
  _id: string;
  userId: any;
  gameId: { name?: string } | null;
  playedSeconds?: number;
  createdAt: string;
  startTime: string;
}

interface WeeklyPlayTimeGraphProps {
  // No props needed - shows all users for selected game
}

const WeeklyPlayTimeGraph: React.FC<WeeklyPlayTimeGraphProps> = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ALL sessions (not filtered by user)
        const sessionsData = await fetchAllSessions();
        console.log("Fetched all sessions:", sessionsData);
        setSessions(sessionsData);

        // Fetch games
        const gamesData = await fetchGames();
        const allGames = gamesData.map((g: any) => g.name);
        console.log("All games:", allGames);
        setGames(allGames);

        // Set first game as default
        if (allGames.length > 0) {
          setSelectedGame(allGames[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading weekly stats...</div>;

  // Filter sessions by selected game
  const filteredSessions = sessions.filter(
    (s) => s.gameId?.name === selectedGame
  );

  // Get last 7 days ending on today
  const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 6 + i); // Last 7 days ending today
      return {
        dateStr: date.toISOString().split("T")[0],
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      };
    });
  };

  const last7Days = getLast7Days();

  // Get unique users from filtered sessions
  const users = Array.from(
    new Set(
      filteredSessions
        .filter((s) => s.userId && typeof s.userId === "object")
        .map((s) => {
          const user = s.userId as any;
          return `${user.firstName} ${user.lastName}`;
        })
    )
  );

  // Create data structure: each day has minutes per user
  const chartData = last7Days.map(({ dateStr, dayName }) => {
    const dayData: any = {
      day: dayName, // Dynamic day name (Mon, Tue, etc.)
      date: dateStr,
    };

    // For each user, calculate minutes played on this day
    users.forEach((userName) => {
      const userSessions = filteredSessions.filter((s) => {
        if (!s.userId || typeof s.userId !== "object") return false;
        const user = s.userId as any;
        const fullName = `${user.firstName} ${user.lastName}`;
        return fullName === userName && s.startTime.split("T")[0] === dateStr;
      });

      const totalMinutes = userSessions.reduce(
        (sum, s) => sum + (s.playedSeconds || 0),
        0
      );
      dayData[userName] = totalMinutes;
    });

    return dayData;
  });

  return (
    <div className="w-full p-0">
      <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full items-center">
        <span className="text-white text-xl font-normal mr-8 font-['Jersey_20']">
          WEEKLY PLAY TIME BY USER
        </span>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="px-4 py-2 bg-yellow-300 text-pink-600 font-bold rounded-lg border-2 border-pink-500 focus:outline-none focus:border-pink-600 cursor-pointer shadow-lg hover:bg-yellow-400"
        >
          {games.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-transparent rounded-b-xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#fff" tick={{ fill: "#fff" }} />
            <YAxis
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Minutes Played",
                angle: -90,
                position: "insideLeft",
                fill: "#fff",
                style: { fontSize: "14px" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff", paddingTop: "20px" }} />

            {/* Create a line for each user */}
            {users.map((userName) => (
              <Line
                key={userName}
                type="monotone"
                dataKey={userName}
                stroke={getUserColor(userName)}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={userName}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {users.length === 0 && (
          <div className="text-white/70 text-center mt-4">
            No play time recorded for {selectedGame} in the last 7 days
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlayTimeGraph;
