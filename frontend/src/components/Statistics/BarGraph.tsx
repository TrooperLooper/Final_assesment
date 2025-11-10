import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels);

const GAME_COLORS: Record<string, string> = {
  "Pac-man": "#FACC15",
  Asteroids: "#3B82F6",
  Tetris: "#EC4899",
  "Space Invaders": "#22C55E",
};

const ALL_GAMES = ["Pac-man", "Tetris", "Asteroids", "Space Invaders"];

interface BarGraphProps {
  data: {
    gameName: string;
    minutesPlayed: number;
  }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
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
        borderRadius: 0,
        barThickness: 32, // Increased bar height
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        max: 30,
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { display: false, drawBorder: false },
        ticks: {
          color: "#fff",
          font: { size: 16, weight: "bold" as const },
          callback: () => "", // <-- No label, no minutes
        },
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", height: "220px" }}>
      {/* Game names column */}
      <div className="flex flex-col justify-between h-full mr-1">
        {filledData.map((item, idx) => (
          <div
            key={item.gameName}
            className="text-white font-bold text-sm"
            style={{ height: "25%" }} // 4 games, so 25% each
          >
            {item.gameName}
            <div className="text-xs font-normal">{item.minutesPlayed} min</div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div style={{ flex: 1, height: "100%", maxWidth: "180px" }}>
        <Bar
          data={{
            ...chartData,
            datasets: [
              {
                ...chartData.datasets[0],
                barThickness: 32, // Increased bar height
                maxBarThickness: 40,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default BarGraph;
