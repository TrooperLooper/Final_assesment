import { useEffect, useState } from "react";
import BarGraph from "../components/Statistics/BarGraph";
import WeeklyPlayTimeGraph from "../components/Statistics/WeeklyPlayTimeGraph";
import AllUsersBarGraph from "../components/Statistics/AllUsersBarGraph";
import SingleUserCard from "../components/Statistics/SingleUserCard";
import LeaderboardTable from "../components/Statistics/LeaderboardTable";
import GameFrequencyGraph from "../components/Statistics/GameFrequencyGraph";
import defaultAvatar from "../components/assets/user_default.jpeg";
import Layout from "../components/Navigation/Layout";
import GameStatsRow from "../components/Statistics/GameStatsRow";
import allPlayersIcon from "../components/assets/all_players.png";
import { fetchUserStats, fetchGames } from "../components/api/apiClient";

function Stats() {
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [gamesData, setGamesData] = useState<
    { name: string; icon: string; percent: number }[]
  >([]);
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
    const fetchStats = async () => {
      try {
        if (!currentUser._id) {
          setLoading(false);
          return;
        }

        const res = await fetchUserStats(currentUser._id);

        const totalMinutes = res.totalMinutes || 0;
        const gameStats = res.gameStats || [];

        setTotalTimePlayed(totalMinutes);

        // Fetch games from API and map with local icons
        const apiGames = await fetchGames();
        const iconMap: Record<string, string> = {};

        const gamesWithPercent = apiGames.map((game: any) => {
          const stat = gameStats.find(
            (s: { gameName: string; minutesPlayed: number }) =>
              s.gameName.toLowerCase() === game.name.toLowerCase()
          );
          const minutes = stat?.minutesPlayed || 0;
          const percent =
            totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;

          return {
            name: game.name,
            icon: iconMap[game.name] || "",
            percent,
          };
        });

        setGamesData(gamesWithPercent);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setTotalTimePlayed(0);
        setGamesData([
          { name: "Pac-man", icon: "", percent: 0 },
          { name: "Tetris", icon: "", percent: 0 },
          { name: "Asteroids", icon: "", percent: 0 },
          { name: "Space Invaders", icon: "", percent: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [currentUser._id]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="GRADIENT fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <Layout>
        {/* Center the main content */}
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-center font-['Jersey_20'] sm:ml-2 md:ml-20 sm:mt-6 text-white drop-shadow-lg">
              STATS
            </h1>
          </div>
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
              <div className="bg-black/30 rounded-b-2xl shadow-lg p-4 sm:p-8 w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                  {/* PieChart - narrower */}
                  <div className="flex flex-col">
                    <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full">
                      <span className="text-white text-xl font-normal font-['Jersey_20']">
                        TIME PER GAME
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <GameStatsRow games={gamesData} />
                    </div>
                  </div>

                  {/* BarGraph - wider */}
                  <div className="bg-white/10 rounded-xl shadow w-full p-0">
                    <div className="bg-pink-600 rounded-t-xl text-center px-4 py-2 w-full">
                      <span className="text-white text-xl font-normal font-['Jersey_20']">
                        MINUTES PLAYED PER GAME
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

            <div className="bg-black/60 rounded-t-2xl shadow-lg p-4 sm:p-8 w-full mt-8 max-w-6xl">
              <div className="flex items-center  font-['Jersey_20'] text-yellow-300 font-bold text-3xl sm:text-5xl mb-2">
                <img
                  src={allPlayersIcon}
                  alt="Pixel art avatar representing all players"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-white mr-4 sm:mr-8 object-cover"
                />
                <div className="justify-start">
                  <h2 className="">All players</h2>
                </div>
              </div>
            </div>

            <div className="parentDiv bg-black/30 rounded-b-2xl shadow-lg p-4 sm:p-8 w-full max-w-6xl">
              {/* Statistics Graphs */}
              <div className="flex flex-col gap-8 w-full">
                <div className="bg-white/10 rounded-xl shadow w-full">
                  <WeeklyPlayTimeGraph />
                </div>
                <div className="bg-white/10 rounded-xl shadow w-full">
                  <GameFrequencyGraph />
                </div>
                <div className="bg-white/10 rounded-xl shadow w-full">
                  <AllUsersBarGraph />
                </div>
                <div className="bg-white/10 rounded-xl shadow w-full">
                  <LeaderboardTable />
                </div>
                {/* Scroll to Top Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="w-12 h-12 rounded-full bg-black border-4 border-black/50 flex items-center justify-center shadow-2xl hover:border-yellow-300 transition-all active:scale-95"
                    style={{ fontSize: "1.5rem" }}
                  >
                    <span className="text-yellow-300 font-bold">Y</span>
                  </button>
                  <span className="text-xs text-white mt-2">
                    Beam me up to the top
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Stats;
