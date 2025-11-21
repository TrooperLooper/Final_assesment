import React from "react";
import airholesSvg from "../assets/airholes.svg";
import logoSvg from "../assets/logo_timer.svg";

interface RetroTimerProps {
  elapsedSeconds: number;
  isStopped: boolean;
  gameImage?: string;
  gameColor?: string;
  message?: React.ReactNode;
  onButtonClick?: () => void;
  buttonState?: "START" | "STOP" | "EXIT";
}

const PlayIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <polygon points="16,12 40,24 16,36" fill="white" />
  </svg>
);

const StopIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="14" y="14" width="20" height="20" fill="white" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 50 48"
    aria-hidden="true"
    className="animate-pulse"
  >
    <rect x="13" y="21" width="18" height="6" fill="white" />
    <polygon points="28,14 40,24 28,34" fill="white" />
  </svg>
);

export const RetroTimer: React.FC<RetroTimerProps> = ({
  elapsedSeconds,
  isStopped,
  gameImage,
  gameColor = "bg-pink-500",
  message,
  onButtonClick,
  buttonState = "START",
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

  const iconMap = {
    START: <PlayIcon />,
    STOP: <StopIcon />,
    EXIT: <ArrowIcon />,
  };

  return (
    <div
      className={`
        flex flex-col rounded-3xl shadow-2xl
        ${gameColor}
        p-8 w-full max-w-5xl
      `}
    >
      {/* Main content: Display on left, Controls on right */}
      <div className="flex flex-row gap-8 items-start mb-4">
        {/* Left: Wide display with GIF and timer */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Black display box */}
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
            flex items-center justify-start gap-6
          `}
          >
            {/* Left: Game Image */}
            {gameImage && (
              <div className="shrink-0">
                <div
                  className="overflow-hidden flex items-center justify-center bg-black"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img
                    src={gameImage}
                    alt="Game"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
            {/* Right: Timer */}
            <div className="flex-1 flex flex-col justify-center items-center">
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
                {isStopped ? "⏸ TIME STOPPED" : "▶ RUNNING"}
              </div>
            </div>
          </div>

          {/* Green message box below - no parent wrapper */}
          {message && message}
        </div>

        {/* Right: Button and Airholes stacked */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Action Button */}
          {onButtonClick && (
            <div className="rounded-full p-0.5 bg-black/20">
              <button
                onClick={onButtonClick}
                className="
                  focus:outline-none active:scale-95 transition-transform
                  shadow-lg bg-black rounded-full flex items-center justify-center
                  w-16 h-16
                "
                aria-label={buttonState}
              >
                {iconMap[buttonState]}
              </button>
            </div>
          )}

          {/* Airholes */}
          <div className="w-24 h-40 flex items-center justify-center">
            <img
              src={airholesSvg}
              alt="Controller airholes"
              className="w-full h-full"
              style={{ opacity: 0.6 }}
            />
          </div>
        </div>
      </div>

      {/* Logo at bottom */}
      <div className="flex justify-start">
        <img src={logoSvg} alt="Timer Logo" className="h-6" />
      </div>
    </div>
  );
};

export default RetroTimer;
