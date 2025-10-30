import { useEffect, useState } from "react";
import { fetchGameById } from "../components/api/apiClient";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";

interface PlayTimeData {
  userId: string;
  userName: string;
  gameId: string;
  day: string; // ISO date string
  minutesPlayed: number;
}

function Stats() {
  const [gameStats, setGameStats] = useState<
    { gameName: string; iconUrl: string; minutesPlayed: number }[]
  >([]);
  const [sessionsData, setSessionsData] = useState<
    { gameId: string; sessions: number }[]
  >([]);
  const [weeklyStats, setWeeklyStats] = useState<
    { gameId: string; minutesPlayed: number }[]
  >([]);
  const [playTimeData, setPlayTimeData] = useState<PlayTimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch games from backend
        const gamesRes = await fetch("/api/games");
        const gamesData = await gamesRes.json();
        setGames(gamesData.map((g: any) => ({ id: g._id, name: g.name })));

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

        // Example mock playTimeData for one week, two users, one game
        const mockPlayTimeData: PlayTimeData[] = [
          {
            userId: "u1",
            userName: "Alice",
            gameId: "1",
            day: "2025-10-27",
            minutesPlayed: 30,
          },
          {
            userId: "u2",
            userName: "Bob",
            gameId: "1",
            day: "2025-10-27",
            minutesPlayed: 15,
          },
          {
            userId: "u1",
            userName: "Alice",
            gameId: "1",
            day: "2025-10-28",
            minutesPlayed: 45,
          },
          {
            userId: "u2",
            userName: "Bob",
            gameId: "1",
            day: "2025-10-28",
            minutesPlayed: 20,
          },
          // ...more days/users/games
        ];
        setPlayTimeData(mockPlayTimeData);

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
        <WeeklyPlayTimeGraph data={playTimeData} games={games} />
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
