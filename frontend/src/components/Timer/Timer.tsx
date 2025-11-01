import React, { useEffect, useRef } from "react";

interface TimerProps {
  isPlaying: boolean;
  onStop: (elapsedSeconds: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isPlaying, onStop }) => {
  const [seconds, setSeconds] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Call onStop when timer is stopped
  useEffect(() => {
    if (!isPlaying && seconds > 0) {
      onStop(seconds);
    }
    // eslint-disable-next-line
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(secs / 3600);
    const displayMins = mins % 60;
    const displaySecs = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${displayMins
      .toString()
      .padStart(2, "0")}:${displaySecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 rounded-2xl flex items-center px-8 py-4 gap-8 shadow-lg w-fit font-['Pixelify_Sans']">
      <span className="bg-gray-400 text-black px-4 py-2 rounded-xl text-xl font-bold tracking-wide mr-4">
        TIME PLAYING:
      </span>
      <span className="text-black text-5xl font-mono tracking-widest drop-shadow">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Timer;
