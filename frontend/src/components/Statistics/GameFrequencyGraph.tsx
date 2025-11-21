import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

interface UserGameData {
  user: string;
  timesPlayed: number;
  totalMinutes: number;
}

interface GameFrequencyGraphProps {
  gameData?: Record<string, UserGameData[]>;
}

const GameFrequencyGraph: React.FC<GameFrequencyGraphProps> = ({
  gameData: propGameData,
}) => {
  const [gameData, setGameData] = useState<Record<string, UserGameData[]>>(
    propGameData || {}
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/statistics/game-frequency"
        );
        setGameData(res.data);
        setSelectedGame(Object.keys(res.data)[0] || "");
      } catch (error) {
        console.error("Error fetching game frequency data:", error);
        const mockData = {
          "Pac-man": [
            { user: "John Doe", timesPlayed: 6, totalMinutes: 30 },
            { user: "Anna Smith", timesPlayed: 7, totalMinutes: 50 },
          ],
          Tetris: [
            { user: "Mike Johnson", timesPlayed: 4, totalMinutes: 25 },
            { user: "Sarah Lee", timesPlayed: 9, totalMinutes: 55 },
          ],
        };
        setGameData(mockData);
        setSelectedGame(Object.keys(mockData)[0]);
      } finally {
        setLoading(false);
      }
    };

    if (!propGameData) {
      fetchGameData();
    } else {
      setSelectedGame(Object.keys(propGameData)[0] || "");
      setLoading(false);
    }
  }, [propGameData]);

  if (loading)
    return (
      <div className="text-white text-center py-8">Loading game stats...</div>
    );

  const currentData = gameData[selectedGame] || [];

  // Add console log to debug data
  console.log("Current game data:", currentData);

  // Calculate dynamic Y-axis domain based on actual data

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-semibold mb-1">{data.user}</p>
          <p className="text-white/80 text-sm">
            Times played: {data.timesPlayed}
          </p>
          <p className="text-white/80 text-sm">
            Total: {data.totalMinutes} min
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-xl font-semibold">
          Game Play Frequency
        </h3>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500 cursor-pointer"
        >
          {Object.keys(gameData).map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            dataKey="timesPlayed"
            name="Times Played"
            domain={[0, 10]}
            stroke="#fff"
            tick={{ fill: "#fff" }}
            label={{
              value: "Times Played Per Week",
              position: "insideBottom",
              offset: -15,
              fill: "#fff",
              style: { fontSize: "14px" },
            }}
          />
          <YAxis
            type="number"
            dataKey="totalMinutes"
            name="Total Minutes"
            domain={[0, 60]}
            stroke="#fff"
            tick={{ fill: "#fff" }}
            label={{
              value: "Total Minutes",
              angle: -90,
              position: "insideLeft",
              fill: "#fff",
              style: { fontSize: "14px" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: "#fff", paddingTop: "20px" }} />
          <Scatter
            name="Players"
            data={currentData}
            fill="#ec4899"
          />
        </ScatterChart>
      </ResponsiveContainer>

      {currentData.length === 0 && (
        <div className="text-white/70 text-center mt-4">
          No data available for this game
        </div>
      )}
    </div>
  );
};

export default GameFrequencyGraph;