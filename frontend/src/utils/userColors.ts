// User color palette (distinct from game colors)
// Avoiding: Yellow (Pac-man), Pink (Tetris), Blue (Asteroids), Green (Space Invaders)

export const USER_COLORS = [
  "#FF6B6B", // Red
  "#9B59B6", // Purple
  "#E67E22", // Orange
  "#1ABC9C", // Teal
  "#F39C12", // Amber
  "#E91E63", // Deep Pink
  "#00BCD4", // Cyan
  "#FF5722", // Deep Orange
  "#8BC34A", // Light Green
  "#673AB7", // Deep Purple
  "#FFC107", // Gold
  "#795548", // Brown
];

// Generate consistent color for a user based on their ID or name
export const getUserColor = (userId: string): string => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % USER_COLORS.length;
  return USER_COLORS[index];
};

// Get color for user by index (for when you have a list of users)
export const getUserColorByIndex = (index: number): string => {
  return USER_COLORS[index % USER_COLORS.length];
};
