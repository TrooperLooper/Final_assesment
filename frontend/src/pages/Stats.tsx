import { useEffect, useState } from "react";
import BarGraph from "../components/Statistics/BarGraph";
import SessionsGraph from "../components/Statistics/SessionsGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import SingleUserCard from "../components/Statistics/SingleUserCard";
import defaultAvatar from "../components/assets/user_default.jpeg";
import Layout from "../components/Navigation/Layout";
import GameStatsRow from "../components/Statistics/GameStatsRow";
import pacmanIcon from "../components/assets/pacman_btn.jpeg";
import asteroidsIcon from "../components/assets/asteroids_btn.jpeg";
import tetrisIcon from "../components/assets/tetris_btn.jpeg";
import spaceIcon from "../components/assets/space_btn.jpeg";
import axios from "axios";

function Stats() {
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get current user from localStorage
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  ) || {
    firstName: "Testy",
    lastName: "McTestface",
    profilePicture: defaultAvatar,
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        if (!currentUser._id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/api/statistics/user/${currentUser._id}`
        );
        setTotalTimePlayed(res.data.totalMinutes || 0);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setTotalTimePlayed(0);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStats();
  }, [currentUser._id]);

  if (loading) return <p>Loading...</p>;

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
      {/* Center the main content */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="max-w-3xl w-full flex-col gap-8 pt-8 px-2 sm:px-8 ml-0 md:ml-20">
          {/* Single User Card */}
          <div className="flex justify-center w-full">
            <SingleUserCard
              user={currentUser}
              totalTimePlayed={totalTimePlayed}
            />
          </div>

          {/* Two Graphs Container */}
          <div className="flex justify-center w-full">
            <div className="bg-black/40 rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-6xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                {/* PieChart - narrower */}
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

                {/* BarGraph - wider */}
                <div className="bg-white/10 rounded-xl shadow w-full p-0">
                  <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full">
                    <span className="text-white text-sm font-semibold">
                      Minutes played per game
                    </span>
                  </div>
                  <div className="w-full p-0">
                    <div className="p-4 mt-2 flex items-center justify-center">
                      <BarGraph />
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
              <WeeklyPlayTimeGraph />
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
  );
}

export default Stats;
