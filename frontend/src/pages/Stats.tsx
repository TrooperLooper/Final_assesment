import { useEffect, useState } from "react";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";

interface GameStat {
  gameName: string;
  iconUrl: string;
  minutesPlayed: number;
}

interface SessionData {
  gameId: string;
  sessions: number;
}

interface PlayTimeData {
  userId: string;
  userName: string;
  gameId: string;
  day: string;
  minutesPlayed: number;
}

function Stats() {
  const [gameStats, setGameStats] = useState<GameStat[]>([]);
  const [sessionsData, setSessionsData] = useState<SessionData[]>([]);
  const [playTimeData, setPlayTimeData] = useState<PlayTimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<{ id: string; name: string }[]>([]);

  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch real data from backend
        const [sessionsRes, gamesRes] = await Promise.all([
          fetch("http://localhost:3000/api/sessions"),
          fetch("http://localhost:3000/api/games"),
        ]);

        const sessions = await sessionsRes.json();
        const gamesData = await gamesRes.json();

        setGames(gamesData.map((g: any) => ({ id: g._id, name: g.name })));

        // Process game stats - convert seconds to minutes, cap at 30 min
        const gameStatsMap = new Map();
        
        sessions.forEach((session: any) => {
          const gameId = session.gameId?._id || session.gameId;
          const gameName = session.gameId?.name || "Unknown Game";
          const gameIcon = session.gameId?.imageUrl || "";
          
          // Convert seconds to minutes and ensure max 30 minutes
          const minutes = Math.min(Math.floor(session.playedSeconds / 60), 30);
          
          if (gameStatsMap.has(gameId)) {
            gameStatsMap.get(gameId).minutesPlayed += minutes;
          } else {
            gameStatsMap.set(gameId, {
              gameName,
              iconUrl: gameIcon,
              minutesPlayed: minutes,
            });
          }
        });

        setGameStats(Array.from(gameStatsMap.values()));

        // Process sessions data
        const sessionsMap = new Map();
        sessions.forEach((session: any) => {
          const gameId = session.gameId?._id || session.gameId;
          sessionsMap.set(gameId, (sessionsMap.get(gameId) || 0) + 1);
        });

        setSessionsData(
          Array.from(sessionsMap.entries()).map(([gameId, count]) => ({
            gameId,
            sessions: count,
          }))
        );

        // Process play time data for weekly graph
        const playTimeArray: PlayTimeData[] = sessions.map((session: any) => ({
          userId: session.userId?._id || session.userId,
          userName: session.userId?.username || "Unknown User",
          gameId: session.gameId?._id || session.gameId,
          day: new Date(session.startTime).toISOString().split("T")[0],
          minutesPlayed: Math.min(Math.floor(session.playedSeconds / 60), 30),
        }));

        setPlayTimeData(playTimeArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

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
        <AllUsersBarGraph
          data={gameStats.map((stat) => ({
            userId: "N/A",
            userName: stat.gameName,
            totalMinutes: stat.minutesPlayed,
          }))}
        />
      </div>
      <div>
        <h2>Leaderboard Table (all users stats)</h2>
        <LeaderboardTable data={gameStats} />
      </div>
    </div>
  );
}

export default Stats;
