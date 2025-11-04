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
    indexAxis: "y", // makes bars horizontal
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} minutes`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Example mock data for BarGraph
const mockBarData = [
  {
    gameName: "Pac-man",
    minutesPlayed: 120,
    iconUrl: "/assets/pacman_gameicon.gif",
  },
  {
    gameName: "Tetris",
    minutesPlayed: 90,
    iconUrl: "/assets/tetris_gameicon.gif",
  },
  {
    gameName: "Space Invaders",
    minutesPlayed: 60,
    iconUrl: "/assets/space_gameicon.gif",
  },
];

// Usage example (in parent component or for testing)
// <BarGraph data={mockBarData} />

export default BarGraph;
