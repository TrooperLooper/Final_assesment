import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  _id: string;
  id?: string;
  name: string;
  gifUrl?: string;
  description?: string;
}

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log('🎮 Fetching games from API...');
        const response = await fetch('http://localhost:3000/api/games');
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Games received:', data);
        setGames(data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching games:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-2xl">Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No games found</p>
          <p className="text-gray-400">Please run: npm run seed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Choose Your Game
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {games.map((game) => (
            <div
              key={game._id}
              onClick={() => navigate(`/play/${game._id}`)}
              className="flex flex-col items-center rounded-xl shadow-lg bg-yellow-400 p-4 transition-transform hover:scale-105 cursor-pointer"
              style={{ width: "180px" }}
            >
              <div
                className="overflow-hidden rounded-lg border-4 border-white mb-3 bg-black flex items-center justify-center"
                style={{ width: "140px", height: "140px" }}
              >
                {game.gifUrl ? (
                  <img
                    src={game.gifUrl}
                    alt={`${game.name} game animation`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-white text-6xl font-bold">
                    {game.name.charAt(0)}
                  </div>
                )}
              </div>
              <h4 className="text-lg font-bold text-white text-center drop-shadow tracking-widest uppercase">
                {game.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
