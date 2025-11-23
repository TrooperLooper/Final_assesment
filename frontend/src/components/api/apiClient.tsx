import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGames = async () => {
  const res = await apiClient.get("/games");
  return res.data;
};

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

// Log a session (1 second of real time = 1 minute in system)
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
