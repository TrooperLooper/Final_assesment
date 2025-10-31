import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const PieChart = ({ gameName, chartData, percent }: any) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20">
        <Pie
          data={chartData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
      <span className="text-white mt-2 text-sm font-bold">
        {percent.toFixed(0)}%
      </span>
    </div>
  );
};

export const TotalTimePlayed = ({ userId }: { userId: string }) => {
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalTime = async () => {
      try {
        // Fetch logic here
      } catch (error) {
        console.error("Failed to fetch total time:", error);
      }
    };

    fetchTotalTime();
  }, [userId]);

  return (
    <div>
      Total Time Played: {totalMinutes ? `${totalMinutes} minutes` : "Loading..."}
    </div>
  );
};

export default PieChart;