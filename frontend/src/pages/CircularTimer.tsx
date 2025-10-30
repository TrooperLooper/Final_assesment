import React from 'react';

interface CircularTimerProps {
  elapsedMinutes: number;
  maxMinutes: number;
  isStopped: boolean;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ 
  elapsedMinutes, 
  maxMinutes, 
  isStopped 
}) => {
  const percentage = (elapsedMinutes / maxMinutes) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        {/* Background circle */}
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#374151"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={isStopped ? "#EAB308" : "#3B82F6"}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-white">
            {elapsedMinutes}
          </div>
          <div className="text-sm text-gray-400">
            / {maxMinutes} min
          </div>
        </div>
      </div>

      {/* Multiplier display */}
      <div className="text-center">
        <div className="text-2xl font-semibold text-blue-400">
          Multiplier: {Math.min(elapsedMinutes + 1, maxMinutes)}x
        </div>
        {isStopped && (
          <div className="text-yellow-400 text-sm mt-1">
            ⚠️ MAX REACHED
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;