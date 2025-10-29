import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PlayTimeData {
  userId: string;
  userName: string;
  gameId: string;
  day: string; // ISO date string
  minutesPlayed: number;
}

interface WeeklyPlayTimeGraphProps {
  data: PlayTimeData[];
  games: { id: string; name: string }[]; // List of games for dropdown
}

const WeeklyPlayTimeGraph: React.FC<WeeklyPlayTimeGraphProps> = ({
  data,
  games,
}) => {
  const [selectedGame, setSelectedGame] = useState(games[0]?.id || "");

  // Filter data for selected game
  const filteredData = data.filter((d) => d.gameId === selectedGame);

  // Get all users for selected game
  const users = Array.from(new Set(filteredData.map((d) => d.userId))).map(
    (userId) => ({
      userId,
      userName:
        filteredData.find((d) => d.userId === userId)?.userName || userId,
    })
  );

  // Get all days in the week (assuming data covers one week)
  const days = Array.from(new Set(filteredData.map((d) => d.day))).sort();

  // Prepare chart data: one object per day, with each user's minutesPlayed
  const chartData = days.map((day) => {
    const entry: any = { day };
    users.forEach((user) => {
      entry[user.userName] =
        filteredData.find((d) => d.day === day && d.userId === user.userId)
          ?.minutesPlayed || 0;
    });
    return entry;
  });

  return (
    <div>
      <label>
        Choose game:{" "}
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </label>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis
            label={{
              value: "Minutes played",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          {users.map((user) => (
            <Line
              key={user.userId}
              type="monotone"
              dataKey={user.userName}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: 8,
          color: "#222",
          background: "#ffe082",
          padding: 8,
        }}
      >
        Each line represents a user and how much they played throughout the
        week.
      </div>
      <div
        style={{
          marginTop: 8,
          color: "#222",
          background: "#ffe082",
          padding: 8,
        }}
      >
        Amount of minutes played per user/day
      </div>
    </div>
  );
};

export default WeeklyPlayTimeGraph;
