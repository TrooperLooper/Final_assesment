import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  data: {
    gameName: string;
    minutesPlayed: number;
    iconUrl: string;
  }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.gameName), // Game names
    datasets: [
      {
        label: "Minutes Played",
        data: data.map((item) => item.minutesPlayed), // Minutes played per game
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Minutes Played Per Game",
      },
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {data.map((game) => (
          <div key={game.gameName} style={{ textAlign: "center" }}>
            <img
              src={game.iconUrl}
              alt={game.gameName}
              style={{ width: "50px" }}
            />
            <span>{game.gameName}</span>
          </div>
        ))}
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
