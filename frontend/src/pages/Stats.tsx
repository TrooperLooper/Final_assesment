import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarGraph from "../components/Statistics/BarGraph";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import GameFrequencyGraph from "../components/Statistics/GameFrequencyGraph";
import defaultAvatar from "../components/assets/user_default.jpeg";
import Layout from "../components/Navigation/Layout";
import GameStatsRow from "../components/Statistics/GameStatsRow";
import pacmanIcon from "../components/assets/pacman_btn.jpeg";
import asteroidsIcon from "../components/assets/asteroids_btn.jpeg";
import tetrisIcon from "../components/assets/tetris_btn.jpeg";
import spaceIcon from "../components/assets/space_btn.jpeg";
import StarIcon from "../components/StarIcon";

function Stats() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [gameStats, setGameStats] = useState<
    { gameName: string; iconUrl: string; minutesPlayed: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    // Mock data for testing
    const mockGameStats = [
      { gameName: "Pac-Man", iconUrl: "", minutesPlayed: 120 },
      { gameName: "Tetris", iconUrl: "", minutesPlayed: 90 },
      { gameName: "Asteroids", iconUrl: "", minutesPlayed: 60 },
      { gameName: "Space Invaders", iconUrl: "", minutesPlayed: 30 },
    ];

    setGameStats(mockGameStats);
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
    <>
      <div className="GRADIENT fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <Layout>
      {/* Center the main content */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="max-w-3xl w-full flex-col gap-8 pt-8 px-2 sm:px-8 ml-0 md:ml-20">
          {/* Profile + Info Section + Graphs in Black Container */}
          <div className="flex justify-center w-full">
            <div className="bg-black/40 rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-6xl mb-8">
              {/* Profile Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start mb-8">
                {/* Column 1: Profile Pic (snug, fixed size) */}
                <div className="flex items-start justify-center md:justify-start">
                  <img
                    src={
                      currentUser.profilePicture &&
                      currentUser.profilePicture.trim()
                        ? currentUser.profilePicture
                        : defaultAvatar
                    }
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-white object-cover flex-shrink-0"
                  />
                </div>

                {/* Column 2: Name and time (min/max width, responsive text) */}
                <div className="flex flex-col justify-start min-w-[200px] max-w-[600px]">
                  <div className="flex items-center text-white font-bold text-xl sm:text-2xl text-center md:text-start mb-4">
                    {currentUser.firstName} {currentUser.lastName}
                    <StarIcon className="ml-2 mt-1" size={25} color="#facc15" />
                  </div>
                  <div className="text-white text-xs sm:text-sm text-center md:text-start">
                    Total time played
                  </div>
                  <div className="text-white font-bold text-2xl sm:text-4xl text-center md:text-start">
                    {totalTimePlayed} min
                  </div>
                </div>

                {/* Column 3: Buttons (snug, stack on mobile) */}
                <div className="flex flex-col mt-2 gap-4 items-center md:items-end w-auto">
                  {/* New User Button */}
                  <button
                    type="button"
                    className="
      w-14 h-14 rounded-full bg-red-600
      border-2 border-black/70
      flex items-center justify-center
      shadow-lg transition-all
      active:scale-95 active:shadow-inner
      hover:border-yellow-400
      focus:outline-none
    "
                    onClick={() => navigate("/register")}
                    aria-label="New user"
                  >
                    {/* You can use a user icon or just text */}
                    <span className="text-white text-lg font-bold">+</span>
                  </button>
                  <span className="text-xs text-white mt-1">New user</span>

                  {/* New Game Button */}
                  <button
                    type="button"
                    className="
      w-14 h-14 rounded-full bg-red-600
      border-2 border-black/70
      flex items-center justify-center
      shadow-lg transition-all
      active:scale-95 active:shadow-inner
      hover:border-yellow-400
      focus:outline-none
    "
                    onClick={() => navigate("/games")}
                    aria-label="New game"
                  >
                    {/* You can use a gamepad icon or just text */}
                    <span className="text-white text-lg font-bold">🎮</span>
                  </button>
                  <span className="text-xs text-white mt-1">New game</span>
                </div>
              </div>

              {/* New Container for PieChart and BarGraph */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PieChart */}
                <div className="flex flex-col">
                  <div className="bg-pink-600 text-center rounded-t-xl px-4 py-2">
                    <span className="text-white text-sm font-semibold">
                      Time - all games
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <GameStatsRow games={gamesData} />
                  </div>
                </div>

                {/* BarGraph */}
                <div className="bg-white/10 rounded-xl shadow w-full max-w-3xl mx-auto p-0">
                  <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full max-w-3xl mx-auto">
                    <span className="text-white text-sm font-semibold">
                      Minutes played per game
                    </span>
                  </div>
                  <div className="w-full max-w-3xl mx-auto p-0">
                    <div className="p-2 mt-5 flex items-center justify-center">
                      <BarGraph data={gameStats} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Graphs */}
          <div className="flex flex-col gap-8 w-full">
            <div className="bg-white/10 rounded-xl p-6 shadow w-full">
              <SessionsGraph />
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow w-full">
              <WeeklyPlayTimeGraph userId={userId} />
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow w-full">
              <GameFrequencyGraph />
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow w-full">
              <AllUsersBarGraph />
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow w-full">
              <LeaderboardTable />
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}

export default Stats;
