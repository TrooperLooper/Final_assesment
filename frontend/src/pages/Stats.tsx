import { useEffect, useState } from "react";
import BarGraph from "../components/Statistics/BarGraph";
import PieChart from "../components/Statistics/PieChart";
import TotalTimePlayed from "../components/Statistics/TotalTimePlayed";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import defaultAvatar from "../components/assets/user_default.jpeg";
import axios from "axios";
import Layout from "../components/Navigation/Layout";
import GameStatsRow from "../components/Statistics/GameStatsRow";
import pacmanIcon from "../components/assets/pacman_btn.jpeg";
import asteroidsIcon from "../components/assets/asteroids_btn.jpeg";
import tetrisIcon from "../components/assets/tetris_btn.jpeg";
import spaceIcon from "../components/assets/space_btn.jpeg";

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

  const gamesData = [
    {
      name: "Pac-Man",
      icon: pacmanIcon,
      percent: 40,
    },
    {
      name: "Tetris",
      icon: tetrisIcon,
      percent: 30,
    },
    {
      name: "Asteroids",
      icon: asteroidsIcon,
      percent: 20,
    },
    {
      name: "Space Invaders",
      icon: spaceIcon,
      percent: 10,
    },
  ];

  return (
    <Layout>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col gap-8 pt-8 px-2 sm:px-8 ml-0 md:ml-40">
        {/* Row 1: Profile + BarGraph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center p-6">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-lg mb-4 object-cover"
            />
            <div className="text-normal font-bold text-white text-center">
              {user.firstName} {user.lastName}
              <div className="flex gap-4 justify-center mt-4">
                <button className="bg-gray-900 text-white px-3 py-1 rounded-lg font-bold shadow hover:bg-gray-700 transition">
                  Choose new player
                </button>
                <button className="bg-gray-900 text-white px-3 py-1 rounded-lg font-bold shadow hover:bg-gray-700 transition">
                  Play new game
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
            <BarGraph data={gameStats} />
          </div>
        </div>

        {/* Row 2: PieChart + TotalTimePlayed + Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Replace old piechart grid with new GameStatsRow */}
          <GameStatsRow games={gamesData} />
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center mb-2">
              <TotalTimePlayed data={gameStats} />
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

        {/* Row 4: AllUsersBar + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
            <AllUsersBarGraph data={gameStats} />
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center">
            <LeaderboardTable
              data={Array.isArray(gameStats) ? gameStats : []}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Stats;
