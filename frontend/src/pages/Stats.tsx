import React, { useEffect, useState } from "react";
import { fetchGameById } from "../components/api/apiClient";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import Leaderboard from "../components/Statistics/Leaderboard";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";

function Stats() {
  const [gameStats, setGameStats] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
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

        // Mock data for sessions (replace with actual data from the backend)
        const mockSessionsData = gameIds.map((id) => ({
          gameId: id,
          sessions: Math.floor(Math.random() * 100),
        }));
        setSessionsData(mockSessionsData);

        // Mock data for weekly stats (replace with actual data from the backend)
        const mockWeeklyStats = gameIds.map((id) => ({
          gameId: id,
          minutesPlayed: Math.floor(Math.random() * 420), // Mock data for weekly minutes played
        }));
        setWeeklyStats(mockWeeklyStats);

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
        <TotalTimePlayed data={gameStats} />
      </div>

      <div>
        <h2>Dotgraph showing time played per day per user (all users stats)</h2>
        <SessionsGraph data={sessionsData} />
      </div>
      <div>
        <h2>Bargraph showing time played per day per user (all users stats)</h2>
        <WeeklyPlayTimeGraph data={weeklyStats} />
      </div>
      <div>
        <h2>Leaderboard (all users stats)</h2>
        <Leaderboard data={gameStats} />
      </div>
      <div>
        <h2>Sessions Graph (all users stats)</h2>
        <SessionsGraph data={sessionsData} />
      </div>
      <div>
        <h2>Weekly Play Time Graph (all users stats)</h2>
        <WeeklyPlayTimeGraph data={weeklyStats} />
      </div>
    </div>
  );
}

export default Stats;
