import React, { useEffect, useState } from "react";
import { fetchGameById } from "../components/api/apiClient";
import BarGraph from "../components/BarGraph";
import PieChart from "../components/PieChart";

function Stats() {
  const [gameStats, setGameStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example game IDs (replace with actual IDs from the backend)
        const gameIds = ["1", "2", "3", "4"];
        const stats = await Promise.all(
          gameIds.map(async (gameId) => {
            const game = await fetchGameById(gameId);
            return {
              gameName: game.name,
              iconUrl: game.imageUrl,
              minutesPlayed: Math.floor(Math.random() * 60), // Mock data for minutes played
            };
          })
        );
        setGameStats(stats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Statistics</h1>
      <div>
        <h2>Minutes Played Per Game (personal stats)</h2>
        <BarGraph data={gameStats} />
      </div>
      <div>
        <h2>Percent of Total Time Per Game (personal stats)</h2>
        <PieChart data={gameStats} />
      </div>
       <div>
        <h2>Component showing total time played (personal stats).</h2>
        {/* Add your graph component here */}
      </div>
    
       <div>
        <h2>Dotgraph showing time played per day per user (all users stats)</h2>
        {/* Add your graph component here */}
      </div>
      <div><h2>Bargraph showing time played per day per user (all users stats)</h2>
        {/* Add your graph component here */}
      </div>
       
      <div><h2>Leaderboard (all users stats)</h2>
        {/* Add your leaderboard component here */}
      </div>
  );
}

export default Stats;
