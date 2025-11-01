import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Navigation/Layout";
import Timer from "../components/Timer/Timer";
import {
  fetchGameById,
  logSession,
  fetchUserById,
} from "../components/api/apiClient";

const defaultAvatar = "/path/to/default/avatar.png"; // Update to your actual default avatar path

function Play() {
  const { gameId, userId } = useParams<{ gameId: string; userId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start immediately
  const [sessionLogged, setSessionLogged] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (gameId) fetchGameById(gameId).then(setGame);
    if (userId) fetchUserById(userId).then(setUser);
  }, [gameId, userId]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleStop = (minutes: number) => {
    setIsPlaying(false);
    setElapsedMinutes(minutes);
    logSession({ userId: currentUser._id, gameId, minutesPlayed: minutes });
    setSessionLogged(true);
  };

  const handleExit = () => {
    navigate(`/stats/${currentUser._id}`);
  };

  if (!game || !currentUser)
    return <div className="text-white">Loading...</div>;

  return (
    <Layout>
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700" />
      <div className="min-h-screen flex flex-col items-center pt-24 px-2 sm:px-8 ml-0 md:ml-40">
        <div className="flex flex-col items-center">
          <img src={game.image} alt={game.name} className="w-32 h-32 mb-4" />
          <h1 className="text-3xl font-bold mb-8">{game.name}</h1>
          <Timer isPlaying={isPlaying} onStop={handleStop} />
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="border-2 border-black px-8 py-3 rounded-lg text-xl font-bold"
              disabled={sessionLogged}
            >
              {isPlaying ? "STOP" : "START"}
            </button>
            <button
              onClick={handleExit}
              className="border-2 border-black px-8 py-3 rounded-lg text-xl font-bold"
            >
              Exit
            </button>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <img
              src={
                currentUser.profilePicture && currentUser.profilePicture.trim()
                  ? currentUser.profilePicture
                  : defaultAvatar
              }
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-24 h-24 rounded-full mb-2"
            />
            <span className="font-bold text-lg">
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Play;
