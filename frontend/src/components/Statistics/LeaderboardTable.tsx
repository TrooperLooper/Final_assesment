interface LeaderboardTableProps {
  data: {
    userId: string;
    userName: string;
    totalMinutes: number;
    rank: number;
  }[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  return <div>Leaderboard Table placeholder</div>;
};

export const mockLeaderboardData = [
  { userId: "u1", userName: "Alice", totalMinutes: 120, rank: 1 },
  { userId: "u2", userName: "Bob", totalMinutes: 90, rank: 2 },
  { userId: "u3", userName: "Charlie", totalMinutes: 60, rank: 3 },
];

// Usage example
// <LeaderboardTable data={mockLeaderboardData} />

export default LeaderboardTable;
