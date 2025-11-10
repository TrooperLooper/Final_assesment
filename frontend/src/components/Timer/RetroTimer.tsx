import React from "react";

interface RetroTimerProps {
  elapsedSeconds: number;
  isStopped: boolean;
}

export const RetroTimer: React.FC<RetroTimerProps> = ({
  elapsedSeconds,
  isStopped,
}) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className={`
      relative
      bg-black 
      border-4 
      ${isStopped ? "border-yellow-400" : "border-green-500"}
      rounded-lg
      p-4
      shadow-lg
      ${!isStopped && "shadow-green-500/50"}
      ${isStopped && "shadow-yellow-400/50"}
      transition-all
      duration-300
    `}
    >
      <div
        className={`
        font-mono 
        text-5xl 
        ${isStopped ? "text-yellow-400" : "text-green-500"}
        tracking-widest
        text-center
        ${!isStopped && "animate-pulse"}
        drop-shadow-[0_0_10px_currentColor]
      `}
      >
        {formatTime(elapsedSeconds)}
      </div>
      <div
        className={`
        text-center 
        mt-2
        font-mono
        text-xs
        tracking-wider
        ${isStopped ? "text-yellow-400" : "text-green-500"}
      `}
      >
        {isStopped ? "⏸ MAX REACHED" : "▶ RUNNING"}
      </div>
    </div>
  );
};

export default RetroTimer;
