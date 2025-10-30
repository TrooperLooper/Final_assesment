interface AllUsersBarGraphProps {
  data: {
    userId: string;
    userName: string;
    totalMinutes: number;
  }[];
}

const AllUsersBarGraph: React.FC<AllUsersBarGraphProps> = ({ data }) => {
  return <div>All Users Bar Graph placeholder</div>;
};

export const mockAllUsersBarData = [
  { userId: "u1", userName: "Alice", totalMinutes: 120 },
  { userId: "u2", userName: "Bob", totalMinutes: 90 },
  { userId: "u3", userName: "Charlie", totalMinutes: 60 },
];

// Usage example
// <AllUsersBarGraph data={mockAllUsersBarData} />

export default AllUsersBarGraph;
