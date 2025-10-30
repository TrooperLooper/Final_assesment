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
import defaultAvatar from "../components/assets/user_default.jpeg";
import axios from "axios";

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
    // Mock data for testing
    const mockGames = [
      { id: "1", name: "Pac-Man" },
      { id: "2", name: "Tetris" },
      { id: "3", name: "Asteroids" },
      { id: "4", name: "Space Invaders" },
    ];

    const mockGameStats = [
      { gameName: "Pac-Man", iconUrl: "", minutesPlayed: 120 },
      { gameName: "Tetris", iconUrl: "", minutesPlayed: 90 },
      { gameName: "Asteroids", iconUrl: "", minutesPlayed: 60 },
      { gameName: "Space Invaders", iconUrl: "", minutesPlayed: 30 },
    ];

    const mockSessionsData = [
      { gameId: "1", sessions: 10 },
      { gameId: "2", sessions: 8 },
      { gameId: "3", sessions: 5 },
      { gameId: "4", sessions: 3 },
    ];

    const mockWeeklyStats = [
      { gameId: "1", minutesPlayed: 40 },
      { gameId: "2", minutesPlayed: 30 },
      { gameId: "3", minutesPlayed: 20 },
      { gameId: "4", minutesPlayed: 10 },
    ];

    const mockPlayTimeData = [
      {
        userId: "u1",
        userName: "Alice",
        gameId: "1",
        day: "2025-10-28",
        minutesPlayed: 20,
      },
      {
        userId: "u2",
        userName: "Bob",
        gameId: "2",
        day: "2025-10-28",
        minutesPlayed: 15,
      },
      // ...more mock data
    ];

    setGames(mockGames);
    setGameStats(mockGameStats);
    setSessionsData(mockSessionsData);
    setWeeklyStats(mockWeeklyStats);
    setPlayTimeData(mockPlayTimeData);
    setLoading(false);
  }, []);

  // For demo, use mock user info
  const user = {
    firstName: "Testy",
    lastName: "McTestface",
    profilePicture: defaultAvatar,
  };

  if (loading) return <p>Loading...</p>;

  const totalTimePlayed = gameStats.reduce(
    (total, game) => total + game.minutesPlayed,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700 p-8 flex flex-col gap-8">
      {/* Row 1: Profile + BarGraph */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center bg-white/10 rounded-xl p-6 shadow">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-lg mb-4 object-cover"
          />
          <div className="text-2xl font-bold text-white text-center">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          <BarGraph data={gameStats} />
        </div>
      </div>

      {/* Row 2: PieChart + TotalTimePlayed + Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          {gameStats.map((game) => (
            <PieChart
              key={game.gameName}
              gameName={game.gameName}
              minutesPlayed={game.minutesPlayed}
              iconUrl={game.iconUrl}
              totalMinutes={totalTimePlayed}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center mb-2">
            <TotalTimePlayed data={gameStats} />
          </div>
          <div className="flex gap-4 justify-center">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-700 transition">
              Choose new player
            </button>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-700 transition">
              Play new game
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Dotgraph + Linegraph */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          <SessionsGraph data={sessionsData} />
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          <WeeklyPlayTimeGraph data={playTimeData} games={games} />
        </div>
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

      {/* Row 4: AllUsersBar + Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          <AllUsersBarGraph data={gameStats} />
        </div>
        <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
          <LeaderboardTable data={gameStats} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
