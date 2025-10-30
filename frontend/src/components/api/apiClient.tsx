import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============ USER APIs ============
export const createUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const uploadAvatar = async (userId: string, formData: FormData) => {
  const response = await apiClient.post(`/users/${userId}/upload-avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

// ============ GAME APIs ============
export const getAllGames = async () => {
  const response = await apiClient.get("/games");
  return response.data;
};

export const fetchGameById = async (gameId: string) => {
  const response = await apiClient.get(`/games/${gameId}`);
  return response.data;
};

export const createGame = async (gameData: { name: string; imageUrl: string }) => {
  const response = await apiClient.post("/games", gameData);
  return response.data;
};

// ============ SESSION APIs ============
export const startSession = async (userId: string, gameId: string) => {
  const response = await apiClient.post("/sessions/start", { userId, gameId });
  return response.data;
};

export const stopSession = async (sessionId: string) => {
  const response = await apiClient.post(`/sessions/stop/${sessionId}`);
  return response.data;
};

export const getStats = async () => {
  const response = await apiClient.get("/sessions/stats");
  return response.data;
};
