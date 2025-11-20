import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

interface SessionData {
  _id: string;
  userId: any;
  gameId: any;
  playedSeconds?: number;
  createdAt: string;
}

interface WeeklyPlayTimeGraphProps {
  userId?: string;
}

const WeeklyPlayTimeGraph: React.FC<WeeklyPlayTimeGraphProps> = ({
  userId,
}) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const endpoint = userId
          ? `http://localhost:3000/api/statistics/sessions/${userId}`
          : "http://localhost:3000/api/statistics/sessions";
        const res = await axios.get(endpoint);
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [userId]);

  if (loading) return <div className="text-white">Loading weekly stats...</div>;

  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  // Group sessions by day
  const dailyData = last7Days.map((day) => {
    const daySessions = sessions.filter(
      (s) => s.createdAt.split("T")[0] === day
    );
    const totalMinutes = daySessions.reduce((sum, s) => {
      return sum + (s.playedSeconds ? Math.round(s.playedSeconds / 60) : 0);
    }, 0);

    return {
      day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
      minutes: totalMinutes,
    };
  });

  return (
    <div className="w-full">
      <h3 className="text-white text-xl font-bold mb-4">
        Weekly Play Time (Last 7 Days)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="day" stroke="#fff" />
          <YAxis
            stroke="#fff"
            label={{
              value: "Minutes",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#fff" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: "#ec4899", r: 5 }}
            activeDot={{ r: 7 }}
            name="Minutes Played"
          />
        </LineChart>
      </ResponsiveContainer>
      {dailyData.every((d) => d.minutes === 0) && (
        <div className="text-white/70 text-center mt-4">
          No play time recorded in the last 7 days
        </div>
      )}
    </div>
  );
};

export default WeeklyPlayTimeGraph;
