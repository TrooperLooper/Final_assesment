import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

interface Game {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string;
}

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gifUrl: ''
  });
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (editingGame) {
      setFormData({
        name: editingGame.name,
        description: editingGame.description || '',
        gifUrl: editingGame.gifUrl || ''
      });
      setShowForm(true);
    }
  }, [editingGame]);

  const fetchGames = async () => {
    try {
      const response = await apiClient.get('/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGame) {
        await apiClient.put(`/games/${editingGame._id}`, formData);
      } else {
        await apiClient.post('/games', formData);
      }
      setFormData({ name: '', description: '', gifUrl: '' });
      setShowForm(false);
      setEditingGame(null);
      fetchGames();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGame(null);
    setFormData({ name: '', description: '', gifUrl: '' });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 bg-gradient-to-b from-blue-950 via-blue-800 to-purple-700">
      <Header />
      <h1 className="text-5xl font-['Pixelify_Sans'] mt-18 text-white mb-15 drop-shadow text-center">
        Choose a game to play
      </h1>
      
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium mb-8 hover:bg-indigo-700 transition-colors"
      >
        {showForm ? 'Cancel' : 'Add New Game'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md mb-8 space-y-4 max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editingGame ? 'Edit Game' : 'Create New Game'}
          </h2>
          <input
            type="text"
            placeholder="Game Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-y text-black"
          />
          <input
            type="text"
            placeholder="GIF URL (e.g., /pacman_gameicon.gif)"
            value={formData.gifUrl}
            onChange={(e) => setFormData({ ...formData, gifUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          />
          {formData.gifUrl && (
            <div className="max-w-xs rounded-lg overflow-hidden">
              <img src={formData.gifUrl} alt="Preview" className="w-full h-auto" />
            </div>
          )}
          <div className="flex gap-3">
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {editingGame ? 'Update Game' : 'Create Game'}
            </button>
            <button 
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
        {games.map((game) => (
          <div key={game._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            {game.gifUrl && !imageError[game._id] ? (
              <img 
                src={game.gifUrl} 
                alt={game.name}
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={() => setImageError({...imageError, [game._id]: true})}
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
            {game.description && (
              <p className="text-gray-300 text-sm mb-4">{game.description}</p>
            )}
            <button
              onClick={() => setEditingGame(game)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
