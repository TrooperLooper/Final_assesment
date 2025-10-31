import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGames = async () => {
  try {
    const response = await api.get('/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};