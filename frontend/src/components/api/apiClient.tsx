import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is set in your .env file
});

export default apiClient;

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
