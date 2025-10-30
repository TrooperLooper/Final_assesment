import { Pie } from "react-chartjs-2";

interface GameStat {
  gameName: string;
  minutesPlayed: number;
  iconUrl: string;
}

interface PieChartProps {
  data: GameStat[];
}

const PieChart = ({ data }: PieChartProps) => {
  const totalTime = data.reduce((sum, item) => sum + item.minutesPlayed, 0);

  const chartData = {
    labels: data.map((item) => item.gameName),
    datasets: [
      {
        data: data.map((item) => (item.minutesPlayed / totalTime) * 100),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
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
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
