import React from "react";

interface GameControlButtonProps {
  state: "START" | "STOP" | "EXIT";
  onClick: () => void;
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

export const GameControlButton: React.FC<GameControlButtonProps> = ({
  state,
  onClick,
}) => {
  const iconMap = {
    START: <PlayIcon />,
    STOP: <StopIcon />,
    EXIT: <ArrowIcon />,
  };

  return (
    <div className="rounded-full p-0.5 bg-black/20">
      <button
        onClick={onClick}
        className="
          focus:outline-none active:scale-95 transition-transform
          shadow-lg bg-black rounded-full flex items-center justify-center
          w-16 h-16
        "
        aria-label={state}
      >
        {iconMap[state]}
      </button>
    </div>
  );
};
