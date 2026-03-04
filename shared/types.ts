// Shared TypeScript types/interfaces for both frontend and backend

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface GameSession {
  _id: string;
  userId: string;
  gameId: string;
  startTime: string;
  endTime?: string;
  playedSeconds: number;
  isActive: boolean;
  createdAt: string;
}
