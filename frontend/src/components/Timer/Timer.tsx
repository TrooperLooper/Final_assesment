import React, { useEffect, useRef } from "react";

interface TimerProps {
  isPlaying: boolean;
  onStop: (elapsedMinutes: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isPlaying, onStop }) => {
  const [minutes, setMinutes] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setMinutes((prev) => prev + 1);
      }, 1000); // 1 second = 1 minute
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying && minutes > 0) {
      onStop(minutes);
    }
    // eslint-disable-next-line
  }, [isPlaying]);

  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const displayMins = mins % 60;
    return `${hours.toString().padStart(2, "0")}:${displayMins
      .toString()
      .padStart(2, "0")}:00`;
  };

  const multiplier = Math.min(
    Math.floor(elapsedTime / 60) + 1,
    MAX_MULTIPLIER_MINUTES
  );

  return (
    <div className="bg-gray-100 rounded-2xl flex items-center px-8 py-4 gap-8 shadow-lg w-fit font-['Pixelify_Sans']">
      <span className="bg-gray-400 text-black px-4 py-2 rounded-xl text-xl font-bold tracking-wide mr-4">
        TIME PLAYING:
      </span>
      <span className="text-black text-5xl font-mono tracking-widest drop-shadow">
        {formatTime(minutes)}
      </span>
    </div>
  );
};

export default Timer;
