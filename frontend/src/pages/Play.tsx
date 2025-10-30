import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

const TIMER_MULTIPLIER = parseInt(import.meta.env.VITE_TIMER_MULTIPLIER || '60');
const gameHourInMs = TIMER_MULTIPLIER * 1000; // 60 seconds = 1 game hour

interface Game {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string;
}

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameTime, setGameTime] = useState(0); // Time in game hours
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId]);

  useEffect(() => {
    // Update game time using gameHourInMs
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const gameHours = elapsedMs / gameHourInMs; // Now it's being used
      setGameTime(gameHours);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, gameHourInMs]);

  const fetchGame = async (id: string) => {
    try {
      const response = await apiClient.get(`/games/${id}`);
      setGame(response.data);
    } catch (error) {
      console.error('Error fetching game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndGame = async () => {
    const durationInSeconds = (Date.now() - startTime) / 1000;
    
    try {
      await apiClient.post('/games/complete', {
        gameId,
        durationInSeconds
      });
      navigate('/games');
    } catch (error) {
      console.error('Error ending game:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading game...</div>;
  }

  if (!game) {
    return <div className="flex justify-center items-center min-h-screen text-white">Game not found</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {game.name}
        </h1>
        
        {game.gifUrl && (
          <div className="mb-6">
            <img 
              src={game.gifUrl} 
              alt={game.name}
              className="w-full max-h-96 object-contain rounded-lg"
            />
          </div>
        )}
        
        {game.description && (
          <p className="text-gray-300 text-lg mb-6 text-center">{game.description}</p>
        )}
        
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-white text-xl text-center">
            Game Time: <span className="font-bold">{gameTime.toFixed(2)} hours</span>
          </p>
          <p className="text-gray-400 text-sm text-center mt-2">
            (Timer Multiplier: {TIMER_MULTIPLIER}x - {TIMER_MULTIPLIER} real seconds = 1 game hour)
          </p>
        </div>

        <div className="text-center text-gray-300 mb-6">
          <p className="text-3xl mb-4">🎮</p>
          <p>Game is running...</p>
          <p className="text-sm text-gray-400 mt-2">This is a demo. Actual game logic would go here.</p>
        </div>
        
        <button
          onClick={handleEndGame}
          className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          End Game & Save
        </button>
      </div>
    </div>
  );
};

export default Play;