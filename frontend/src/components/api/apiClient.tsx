import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Usage example:
// apiClient.get("/users").then(res => ...)
// apiClient.post("/users", userData)
// apiClient.post("/users/upload-avatar", formData, {
//   headers: { "Content-Type": "multipart/form-data" },
// });

export const fetchGameById = async (gameId: string) => {
  try {
    const response = await apiClient.get(`/games/${gameId}`);
    return response.data; // Game data
  } catch (error) {
    console.error("Failed to fetch game:", error);
    throw error;
  }
};

// ADD THESE SESSION METHODS
export const startSession = async (userId: string, gameId: string) => {
  const response = await apiClient.post('/sessions/start', { userId, gameId });
  return response.data;
};

export const stopSession = async (sessionId: string) => {
  const response = await apiClient.post(`/sessions/stop/${sessionId}`);
  return response.data;
};
