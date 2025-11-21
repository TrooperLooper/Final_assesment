import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels);

const GAME_COLORS: Record<string, string> = {
  "Pac-man": "#FACC15",
  Asteroids: "#3B82F6",
  Tetris: "#EC4899",
  "Space Invaders": "#22C55E",
};

const ALL_GAMES = ["Pac-man", "Tetris", "Asteroids", "Space Invaders"];

interface BarGraphProps {
  userId?: string; // Optional: if provided, fetch stats for specific user
}

interface GameStat {
  gameName: string;
  minutesPlayed: number;
  iconUrl: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ userId }) => {
  const [data, setData] = useState<GameStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get current user from localStorage if userId not provided
        const currentUserId =
          userId ||
          JSON.parse(localStorage.getItem("currentUser") || "null")?._id;

        if (!currentUserId) {
          setData([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/api/statistics/user/${currentUserId}`
        );
        setData(res.data.gameStats || []);
      } catch (error) {
        console.error("Error fetching game stats:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [userId]);

  if (loading) return <div className="text-white">Loading stats...</div>;

  const filledData = ALL_GAMES.map((name) => {
    const found = data.find((item) => item.gameName === name);
    return found || { gameName: name, minutesPlayed: 0, iconUrl: "" };
  });

  const chartData = {
    labels: filledData.map((item) => item.gameName),
    datasets: [
      {
        label: "",
        data: filledData.map((item) => item.minutesPlayed),
        backgroundColor: filledData.map(
          (item) => GAME_COLORS[item.gameName] || "#888"
        ),
        borderRadius: 4,
        barThickness: 36,
        maxBarThickness: 40,
        categoryPercentage: 0.7,
        barPercentage: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 30, // Space for numbers on the right
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        color: "#fff",
        font: { size: 14, weight: "bold" as const },
        anchor: "end" as const,
        align: "end" as const,
        offset: 8,
        formatter: (value: number) => (value > 0 ? value : ""),
      },
    },
    scales: {
      x: {
        max: 100,
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
        border: { display: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ display: "flex", alignItems: "center", height: "220px" }}>
      {/* Game names column */}
      <div
        className="flex flex-col justify-start h-full mr-4"
        style={{ paddingTop: "5px" }}
      >
        {filledData.map((item, index) => (
          <div
            key={item.gameName}
            className="text-white font-bold text-base flex items-center"
            style={{
              marginBottom: index < filledData.length - 1 ? "32px" : "0",
            }}
          >
            {item.gameName}
          </div>
        ))}
      </div>
      {/* Chart */}
      <div style={{ flex: 1, height: "100%", maxWidth: "450px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarGraph;
