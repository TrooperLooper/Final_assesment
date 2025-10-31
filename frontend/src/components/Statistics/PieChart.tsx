import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SingleGamePieChartProps {
  gameName: string;
  minutesPlayed: number;
  iconUrl?: string;
  totalMinutes: number;
}

const PieChart: React.FC<SingleGamePieChartProps> = ({
  gameName,
  minutesPlayed,
  iconUrl,
  totalMinutes,
}) => {
  const percent = totalMinutes > 0 ? (minutesPlayed / totalMinutes) * 100 : 0;

  const chartData = {
    labels: [gameName],
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: ["#FF6384", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed} minutes`
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {iconUrl && (
        <img
          src={iconUrl}
          alt={gameName}
          className="w-12 h-12 mb-2"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <span className="text-white font-bold mb-2">{gameName}</span>
      <div className="w-20 h-20">
        <Pie data={chartData} options={options} />
      </div>
      <span className="text-white mt-2 text-sm font-bold">
        {percent.toFixed(0)}%
      </span>
    </div>
  );
};

export default PieChart;


 /* const chartData = {
    labels: data.map((game) => game.gameName),
    datasets: [
      {
        label: "Minutes Played",
        data: data.map((game) => game.minutesPlayed),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],*/
