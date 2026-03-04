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
  Cell,
} from "recharts";
import { fetchGameFrequencyStats } from "../api/apiClient";
import { getUserColor } from "../../utils/userColors";

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
        const data = await fetchGameFrequencyStats();
        setGameData(data);
        setSelectedGame(Object.keys(data)[0] || "");
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

  // Calculate dynamic axis domains based on actual data
  const maxMinutes =
    currentData.length > 0
      ? Math.max(...currentData.map((d) => d.totalMinutes))
      : 60;

  const xDomain = [0, 15];
  const yDomain = [0, Math.max(60, Math.ceil(maxMinutes * 1.1))];

  // Assign colors to each user
  const dataWithColors = currentData.map((item) => ({
    ...item,
    color: getUserColor(item.user),
  }));

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
    <div className="w-full p-0">
      <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full items-center">
        <span className="text-white text-xl font-normal mr-8 font-['Jersey_20']">
          GAME PLAY FREQUENCY
        </span>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="px-4 py-2 bg-yellow-300 text-pink-600 font-bold rounded-lg border-2 border-pink-500 focus:outline-none focus:border-pink-600 cursor-pointer shadow-lg hover:bg-yellow-400"
        >
          {Object.keys(gameData).map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-transparent rounded-b-xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="timesPlayed"
              name="Times Played"
              domain={xDomain}
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Times Played",
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
              domain={yDomain}
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
            <Scatter name="Players" data={dataWithColors}>
              {dataWithColors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {currentData.length === 0 && (
          <div className="text-white/70 text-center mt-4">
            No data available for this game
          </div>
        )}

        {/* User Legend */}
        {dataWithColors.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-600">
            <h4 className="text-white text-sm font-semibold mb-3">Players:</h4>
            <div className="flex flex-wrap gap-3">
              {dataWithColors.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white/80 text-sm">{item.user}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameFrequencyGraph;
