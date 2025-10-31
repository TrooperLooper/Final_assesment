import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Game {
  _id: string;
  name: string;
  description?: string;
  gifUrl?: string;
}

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        console.log('Fetching games from:', `${API_URL}/games`);
        
        const response = await axios.get(`${API_URL}/games`);
        console.log('Games received:', response.data);
        
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Make sure backend is running on port 3000.');
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
          <p className="text-red-400 text-2xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
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
          <p className="text-white text-2xl mb-4">No games available</p>
          <p className="text-gray-300">Run 'npm run seed' in backend to add games</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Choose Your Game</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game._id}
              onClick={() => navigate(`/play/${game._id}`)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition cursor-pointer shadow-lg transform hover:scale-105"
            >
              {game.gifUrl && (
                <img
                  src={game.gifUrl}
                  alt={game.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-white mb-2">{game.name}</h2>
              {game.description && (
                <p className="text-gray-300">{game.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
