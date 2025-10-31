import { useEffect, useState } from "react";
import axios from "axios";

interface UserStats {
  userId: string;
  userName: string;
  totalMinutes: number;
}

const AllUsersBarGraph: React.FC = () => {
  const [data, setData] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsersStats = async () => {
      try {
        // Use the correct endpoint from your API contract
        const res = await axios.get("/api/statistics/global");
        // Adjust mapping if needed based on response shape
        setData(res.data);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsersStats();
  }, []);

  if (loading) return <div>Loading All Users Bar Graph...</div>;

  // Replace this with your actual bar graph/chart implementation
  return (
    <div>
      {data.map((user) => (
        <div key={user.userId}>
          {user.userName}: {user.totalMinutes} min
        </div>
      ))}
    </div>
  );
};

export default AllUsersBarGraph;