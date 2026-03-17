import { create } from "zustand";
import { apiClient } from "../components/api/apiClient";

// Define User type
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt?: string;
}

interface UserStore {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  fetchUsers: () => Promise<void>;
  validateAndSetCurrentUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  users: [],
  loading: true,

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      set({ currentUser: user });
    } else {
      localStorage.removeItem("currentUser");
      set({ currentUser: null });
    }
  },

  fetchUsers: async () => {
    try {
      const res = await apiClient.get("/users");
      set({ users: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ loading: false });
    }
  },

  validateAndSetCurrentUser: async () => {
    // Clean up any orphaned localStorage keys (defensive measure)
    const keysToRemove = ["users", "gameData", "sessions", "stats"]; // Add any known stale keys
    keysToRemove.forEach((key) => {
      if (localStorage.getItem(key)) {
        console.log(`Cleaning orphaned localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
    });

    try {
      const res = await apiClient.get("/users");
      const users = res.data as User[];
      set({ users });

      const storedUser = JSON.parse(
        localStorage.getItem("currentUser") || "null",
      );
      if (storedUser && users.some((u: User) => u._id === storedUser._id)) {
        set({ currentUser: storedUser, loading: false });
      } else {
        localStorage.removeItem("currentUser");
        set({ currentUser: null, loading: false });
      }
    } catch (error) {
      console.error("Failed to validate current user:", error);
      set({ loading: false });
    }
  },
}));
