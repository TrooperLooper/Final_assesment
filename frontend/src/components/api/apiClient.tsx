import axios from "axios";

// Export base URL for use in components (e.g., image URLs)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== GAMES ==========
export const fetchGames = async () => {
  const res = await apiClient.get("/games");
  return res.data;
};

export const fetchGameById = async (gameId: string) => {
  try {
    const response = await apiClient.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch game:", error);
    throw error;
  }
};

// ========== USERS ==========
export const createUser = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const fetchUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

// ========== SESSIONS ==========
export const startSession = async (userId: string, gameId: string) => {
  const response = await apiClient.post("/sessions/start", { userId, gameId });
  return response.data;
};

export const stopSession = async (sessionId: string) => {
  const response = await apiClient.post(`/sessions/stop/${sessionId}`);
  return response.data;
};

export const logSession = async ({
  userId,
  gameId,
  playedSeconds,
}: {
  userId: string;
  gameId: string;
  playedSeconds: number;
}) => {
  const response = await apiClient.post("/sessions", {
    userId,
    gameId,
    playedSeconds,
  });
  return response.data;
};

// ========== STATISTICS ==========
export const fetchUserStats = async (userId: string) => {
  const response = await apiClient.get(`/statistics/user/${userId}`);
  return response.data;
};

export const fetchAllSessions = async () => {
  const response = await apiClient.get("/statistics/sessions");
  return response.data;
};

export const fetchUserSessions = async (userId: string) => {
  const response = await apiClient.get(`/statistics/sessions/${userId}`);
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await apiClient.get("/statistics/leaderboard");
  return response.data;
};

export const fetchAllUsersLeaderboard = async () => {
  const response = await apiClient.get("/statistics/all-users");
  return response.data;
};

export const fetchGameFrequencyStats = async () => {
  const response = await apiClient.get("/statistics/game-frequency");
  return response.data;
};
