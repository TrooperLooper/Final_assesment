import { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

const MAX_MULTIPLIER_MINUTES = 30;

export default function Timer({ duration, onTimeUp, autoStart = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        // Stoppa på 30 minuter (1800 sekunder)
        if (newTime >= MAX_MULTIPLIER_MINUTES * 60) {
          clearInterval(interval);
          return MAX_MULTIPLIER_MINUTES * 60;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

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
    setElapsedTime(0);
    setIsRunning(autoStart);
  };

  const multiplier = Math.min(
    Math.floor(elapsedTime / 60) + 1,
    MAX_MULTIPLIER_MINUTES
  );

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className={`text-5xl font-bold font-mono ${
        timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-800'
      }`}>
        {formatTime(timeLeft)}
      </div>
      
      <div className="text-2xl font-semibold text-blue-600">
        Multiplier: {multiplier}x
        {elapsedTime >= MAX_MULTIPLIER_MINUTES * 60 && (
          <span className="text-sm text-gray-500 ml-2">(max)</span>
        )}
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
}