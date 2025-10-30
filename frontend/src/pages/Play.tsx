import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RetroTimer from '../components/Timer/RetroTimer';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

const MAX_MULTIPLIER_MINUTES = 30;

interface Game {
  id: string;
  _id?: string;
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
  const [error, setError] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch game
  const fetchGame = async (id: string) => {
    try {
      setLoading(true);
      console.log('Fetching game:', id);
      const response = await apiClient.get(`/games/${id}`);
      console.log('Game fetched:', response.data);
      setGame(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching game:', err);
      setError('Failed to load game');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId]);

  // Start session and timer when game loads
  useEffect(() => {
    if (!game) return;

    const startGameSession = async () => {
      try {
        const demoUserId = 1;
        
        console.log('Starting session for game:', game.id || game._id);
        const response = await apiClient.post('/sessions/start', {
          userId: demoUserId,
          gameId: game.id || game._id
        });
        
        console.log('Session started:', response.data);
        setSessionId(response.data.sessionId);
        
      } catch (error) {
        console.error('Failed to start session:', error);
      }
      
      // Start timer
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsedMs = Date.now() - startTime;
        const realSeconds = Math.floor(elapsedMs / 1000);
        const maxSeconds = MAX_MULTIPLIER_MINUTES * 60;
        
        if (realSeconds >= maxSeconds) {
          setElapsedSeconds(maxSeconds);
          setTimerStopped(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return;
        }
        
        setElapsedSeconds(realSeconds);
      }, 1000);
    };

    startGameSession();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [game]);

  const handleEndGame = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (sessionId) {
      try {
        await apiClient.post('/sessions/stop', { sessionId });
      } catch (error) {
        console.error('Failed to stop session:', error);
      }
    }
    
    navigate('/games');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white text-xl">Loading game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button 
            onClick={() => navigate('/games')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white text-xl">Game not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          {game.name}
        </h1>
        
        <div className="flex justify-center mb-6">
          <RetroTimer 
            elapsedSeconds={elapsedSeconds}
            isStopped={timerStopped}
          />
        </div>
        
        {(game.gifUrl || game.imageUrl) && (
          <div className="mb-6">
            <img 
              src={game.gifUrl || game.imageUrl} 
              alt={game.name}
              className="w-full max-h-96 object-contain rounded-lg"
            />
          </div>
        )}
        
        {game.description && (
          <p className="text-gray-300 text-lg mb-6 text-center">{game.description}</p>
        )}
        
        <button
          onClick={handleEndGame}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          End Game
        </button>
      </div>
    </div>
  );
};

export default Play;