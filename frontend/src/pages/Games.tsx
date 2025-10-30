import React, { useState, useEffect } from 'react';
import { apiClient } from '../components/api/apiClient';


interface Game {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string;
}

export const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gifUrl: ''
  });

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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Choose a game to play</h1>
      
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium mb-8 hover:bg-indigo-700 transition-colors"
      >
        {showForm ? 'Cancel' : 'Add New Game'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md mb-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">
            {editingGame ? 'Edit Game' : 'Create New Game'}
          </h2>
          <input
            type="text"
            placeholder="Game Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-y"
          />
          <input
            type="url"
            placeholder="GIF URL (optional)"
            value={formData.gifUrl}
            onChange={(e) => setFormData({ ...formData, gifUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard 
            key={game._id} 
            game={game} 
            onEdit={setEditingGame}
          />
        ))}
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game; onEdit: (game: Game) => void }> = ({ game, onEdit }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 group cursor-pointer">
      <div className="relative">
        {game.gifUrl && !imageError ? (
          <img 
            src={game.gifUrl} 
            alt={`${game.name} game animation`}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-6xl font-bold">
            {game.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h4>
        {game.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{game.description}</p>
        )}
        <button
          onClick={() => onEdit(game)}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Games;
