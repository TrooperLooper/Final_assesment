import { useEffect, useState } from "react";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import defaultAvatar from "../components/assets/user_default.jpeg";
import axios from "axios";

interface GameStat {
  gameName: string;
  iconUrl: string;
  minutesPlayed: number;
}

interface SessionData {
  date: string;
  duration: number;
  score?: number;
}

interface PlayTimeData {
  userId: string;
  userName: string;
  gameId: string;
  day: string;
  minutesPlayed: number;
}

interface Game {
  id: string;
  name: string;
  iconUrl?: string;
}

interface WeeklyStat {
  gameId: string;
  minutesPlayed: number;
}

function Stats() {
  const [gameStats, setGameStats] = useState<GameStat[]>([]);
  const [sessionsData, setSessionsData] = useState<SessionData[]>([]);
  const [playTimeData, setPlayTimeData] = useState<PlayTimeData[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);

  useEffect(() => {
    // Mock data for demonstration
    const mockGames: Game[] = [
      { id: "1", name: "Game 1", iconUrl: "/game1.png" },
      { id: "2", name: "Game 2", iconUrl: "/game2.png" },
      { id: "3", name: "Game 3", iconUrl: "/game3.png" },
      { id: "4", name: "Game 4", iconUrl: "/game4.png" },
    ];

    const mockGameStats: GameStat[] = [
      { gameName: "Game 1", minutesPlayed: 120, iconUrl: "/game1.png" },
      { gameName: "Game 2", minutesPlayed: 90, iconUrl: "/game2.png" },
      { gameName: "Game 3", minutesPlayed: 60, iconUrl: "/game3.png" },
      { gameName: "Game 4", minutesPlayed: 30, iconUrl: "/game4.png" },
    ];

    const mockSessionsData: SessionData[] = [
      { date: "2025-01-20", duration: 45, score: 100 },
      { date: "2025-01-21", duration: 60, score: 120 },
      { date: "2025-01-22", duration: 30, score: 80 },
    ];

    const mockWeeklyStats: WeeklyStat[] = [
      { gameId: "1", minutesPlayed: 40 },
      { gameId: "2", minutesPlayed: 30 },
      { gameId: "3", minutesPlayed: 20 },
      { gameId: "4", minutesPlayed: 10 },
    ];

    const mockPlayTimeData: PlayTimeData[] = [
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
    ];

    setGames(mockGames);
    setGameStats(mockGameStats);
    setSessionsData(mockSessionsData);
    setWeeklyStats(mockWeeklyStats);
    setPlayTimeData(mockPlayTimeData);
    setLoading(false);
  }, []);

  const totalTimePlayed = gameStats.reduce(
    (sum, game) => sum + game.minutesPlayed,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Game Statistics</h1>
          <p className="text-gray-300">Track your gaming performance</p>
        </div>

        {/* Row 1: User Profile Card */}
        <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">Player Stats</h2>
              <p className="text-gray-300">Total Games: {gameStats.length}</p>
            </div>
          </div>
        </div>

        {/* Row 2: Bar Graph */}
        <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4">Minutes Played Per Game</h3>
          <BarGraph data={gameStats} />
        </div>

        {/* Row 3: PieChart + TotalTimePlayed + Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Game Distribution</h3>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm flex items-center justify-center">
              <TotalTimePlayed data={gameStats} />
            </div>
            <div className="flex gap-4 justify-center">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-700 transition">
                Choose New Player
              </button>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-700 transition">
                Play New Game
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: SessionsGraph + WeeklyPlayTimeGraph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Session History</h3>
            <SessionsGraph data={sessionsData} />
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Weekly Play Time</h3>
            <WeeklyPlayTimeGraph data={playTimeData} games={games} />
          </div>
        </div>

        {/* Row 5: AllUsersBar + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">All Users Stats</h3>
            <AllUsersBarGraph
              data={gameStats.map((game, index) => ({
                userId: `user-${index + 1}`,
                userName: game.gameName,
                totalMinutes: game.minutesPlayed,
              }))}
            />
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
            <LeaderboardTable
              data={gameStats.map((game, index) => ({
                userId: `user-${index + 1}`,
                userName: game.gameName,
                totalMinutes: game.minutesPlayed,
                rank: index + 1,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;