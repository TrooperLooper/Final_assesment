import React, { useEffect, useState } from "react";
import { fetchGameById } from "../components/api/apiClient";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";

function Stats() {
  const [gameStats, setGameStats] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const gameIds = ["1", "2", "3", "4"];
        const stats = await Promise.all(
          gameIds.map(async (gameId) => {
            const game = await fetchGameById(gameId);
            return {
              gameName: game.name,
              iconUrl: game.imageUrl,
              minutesPlayed: Math.floor(Math.random() * 60),
            };
          })
        );
        setGameStats(stats);

        const mockSessionsData = gameIds.map((id) => ({
          gameId: id,
          sessions: Math.floor(Math.random() * 100),
        }));
        setSessionsData(mockSessionsData);

        const mockWeeklyStats = gameIds.map((id) => ({
          gameId: id,
          minutesPlayed: Math.floor(Math.random() * 420),
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
        <h2>Total Time Played (personal stats)</h2>
        <TotalTimePlayed data={gameStats} />
      </div>
      <div>
        <h2>Dotgraph: Time Played Per Day Per User (all users stats)</h2>
        <SessionsGraph data={sessionsData} />
      </div>
      <div>
        <h2>Line graph: Weekly Play Time (all users stats)</h2>
        <WeeklyPlayTimeGraph data={weeklyStats} />
      </div>
      <div>
        <h2>
          Bargraph All: Total time per game across all users. (all users stats)
        </h2>
        <AllUsersBarGraph data={gameStats} />
      </div>
      <div>
        <h2>Leaderboard Table (all users stats)</h2>
        <LeaderboardTable data={gameStats} />
      </div>
    </div>
  );
}

export default Stats;
