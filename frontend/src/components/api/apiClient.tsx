import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch a game by its ID
export const fetchGameById = async (gameId: string) => {
  try {
    const response = await apiClient.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch game:", error);
    throw error;
  }
};

// Fetch a user by their ID
export const fetchUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

// Start a session
export const startSession = async (userId: string, gameId: string) => {
  const response = await apiClient.post("/sessions/start", { userId, gameId });
  return response.data;
};

// Stop a session
export const stopSession = async (sessionId: string) => {
  const response = await apiClient.post(`/sessions/stop/${sessionId}`);
  return response.data;
};

// Log a session (alternative to stopSession)
export const logSession = async ({
  userId,
  gameId,
  minutesPlayed,
}: {
  userId: string;
  gameId: string;
  minutesPlayed: number;
}) => {
  const response = await apiClient.post("/sessions", {
    userId,
    gameId,
    minutesPlayed,
  });
  return response.data;
};
