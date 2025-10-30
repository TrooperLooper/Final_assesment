import { useEffect, useState } from "react";
import axios from "axios";

interface TotalTimePlayedProps {
  userId: string;
}

const TotalTimePlayed = ({ userId }: TotalTimePlayedProps) => {
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalTime = async () => {
      try {
        const res = await axios.get(`/api/statistics/user/${userId}`);
        setTotalMinutes(res.data.totalMinutes);
      } catch (error) {
        setTotalMinutes(0);
      }
    };
    fetchTotalTime();
  }, [userId]);

  return (
    <div>
      Total time played:{" "}
      {totalMinutes !== null ? `${totalMinutes} minutes` : "Loading..."}
    </div>
  );
};

// Example usage with mock data
// <TotalTimePlayed userId="12345" />

export default TotalTimePlayed;
