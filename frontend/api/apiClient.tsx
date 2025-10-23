// frontend/src/api/apiClient.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Usage example:
// apiClient.get("/users").then(res => ...)
// apiClient.post("/users", userData)
