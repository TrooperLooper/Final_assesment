import React, { useState, useRef } from "react";

const RetroTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(secs / 3600);
    const displayMins = mins % 60;
    const displaySecs = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${displayMins
      .toString()
      .padStart(2, "0")}:${displaySecs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setSeconds(0);
    stopTimer();
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-gray-100 rounded-2xl flex items-center px-8 py-4 gap-8 shadow-lg w-fit font-['Pixelify_Sans']">
      <span className="bg-gray-400 text-black px-4 py-2 rounded-xl text-xl font-bold tracking-wide mr-4">
        TIME PLAYING:
      </span>
      <span className="text-black text-5xl font-mono tracking-widest drop-shadow">
        {formatTime(seconds)}
      </span>
      <div className="flex flex-col gap-2 ml-8">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg transition"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold text-lg transition"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RetroTimer;
