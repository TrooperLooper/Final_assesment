import { useEffect, useState } from "react";
import axios from "axios";

interface SessionsGraphProps {
  userId?: string; // Optional: filter by user
}

interface SessionData {
  userId: string;
  userName: string;
  day: string; // ISO date string
  minutesPlayed: number;
}

const SessionsGraph: React.FC<SessionsGraphProps> = ({ userId }) => {
  const [data, setData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const endpoint = userId
          ? `/api/statistics/sessions/${userId}`
          : "/api/statistics/sessions";
        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [userId]);

  if (loading) return <div>Loading dotgraph...</div>;

  // Replace with your actual dotgraph/chart implementation
  return <div>{JSON.stringify(data)}</div>;
};

export default SessionsGraph;
