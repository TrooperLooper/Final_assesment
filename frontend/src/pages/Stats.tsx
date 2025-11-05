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

  // Get current user from localStorage (fallback to default if not found)
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  ) || {
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
      <div className="GRADIENT fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col gap-8 pt-8 px-2 sm:px-8 ml-0 md:ml-20">
        {/* Profile + Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_3fr] bg-red-500 p-4 rounded-lg gap-8 w-full max-w-3xl mx-auto">
          {/* Profile Pic */}
          <div className="flex items-start justify-center">
            <img
              src={
                currentUser.profilePicture && currentUser.profilePicture.trim()
                  ? currentUser.profilePicture
                  : defaultAvatar
              }
              alt="Profile"
              className="w-32 h-32 rounded-lg border-2 border-white object-cover"
            />
          </div>
          {/* Info Card */}
          <div className="bg-green-500 rounded-xl shadow-lg p-8 flex flex-col gap-4 justify-center max-w-md w-full">
            <div className="text-white font-bold text-2xl text-start">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="text-white text-start mb-2">Total time played</div>

            <div className="text-white font-bold text-4xl text-start ">
              {totalTimePlayed} min
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
              <button
                type="button"
                className="py-2 px-6 rounded-lg font-bold text-xs shadow-lg transition-all
          active:scale-95 active:shadow-inner
          bg-yellow-400 text-pink-900 hover:bg-yellow-300 w-auto"
                onClick={() => {
                  /* handle choose new player */
                }}
              >
                CHOOSE NEW PLAYER
              </button>
              <button
                type="button"
                className="py-2 px-6 rounded-lg font-bold text-xs shadow-lg transition-all
          active:scale-95 active:shadow-inner
          bg-yellow-400 text-pink-900 hover:bg-yellow-300 w-auto"
                onClick={() => {
                  /* handle play new game */
                }}
              >
                PLAY NEW GAME
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: PieChart + BarGraph + Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GameStatsRow games={gamesData} />
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 rounded-xl p-6 shadow flex items-center justify-center mb-2">
              <BarGraph data={gameStats} />
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
