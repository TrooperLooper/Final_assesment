import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp?: () => void;
  autoStart?: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, autoStart = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(autoStart);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className={`text-5xl font-bold font-mono ${
        timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-800'
      }`}>
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;