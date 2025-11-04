import { useEffect, useState } from "react";

interface UserStats {
  userId: string;
  userName: string;
  totalMinutes: number;
  profilePicture?: string;
}

const defaultAvatar = "/path/to/default/avatar.png"; // Update this path

const mockData: UserStats[] = [
  {
    userId: "1",
    userName: "Alice",
    totalMinutes: 120,
    profilePicture: "",
  },
  {
    userId: "2",
    userName: "Bob",
    totalMinutes: 90,
    profilePicture: "/path/to/avatar2.png",
  },
  {
    userId: "3",
    userName: "Charlie",
    totalMinutes: 45,
    profilePicture: "",
  },
];

const AllUsersBarGraph: React.FC = () => {
  const [data, setData] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data instead of API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500); // Simulate loading
  }, []);

  if (loading) return <div>Loading All Users Bar Graph...</div>;

  return (
    <div>
      {data.map((user) => (
        <div key={user.userId}>
          {user.userName}: {user.totalMinutes} min
          <img
            src={
              user.profilePicture && user.profilePicture.trim()
                ? user.profilePicture
                : defaultAvatar
            }
            alt="Profile"
            className="w-32 h-32 rounded-lg mb-4 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default AllUsersBarGraph;
