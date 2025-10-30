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

  return <Bar data={chartData} options={options} />;
};

export default BarGraph;