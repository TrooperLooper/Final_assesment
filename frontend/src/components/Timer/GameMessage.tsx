import React from "react";
import TypedText from "../Timer/TypedText";

interface GameMessageProps {
  hasStarted: boolean;
  isPlaying: boolean;
  hasStopped: boolean;
  elapsedSeconds: number;
}

export const GameMessage: React.FC<GameMessageProps> = ({
  hasStarted,
  isPlaying,
  hasStopped,
  elapsedSeconds,
}) => {
  const getMessage = () => {
    if (!hasStarted) {
      return (
        <TypedText
          text="Press the start button when you are ready!"
          speed={35}
        />
      );
    } else if (isPlaying) {
      return (
        <TypedText
          text="..................................................."
          speed={1000}
        />
      );
    } else if (hasStopped && elapsedSeconds > 0) {
      return (
        <TypedText
          text="✓ Session saved! Click --> BUTTON to view stats."
          speed={30}
        />
      );
    }
    return null;
  };

  return (
    <div className="mt-10 px-2 font-bold text-xl w-[360px] text-left bg-[#b6da72] rounded-lg shadow border-black/30 border-2 jersey-10-charted-regular min-h-[2.5rem] flex items-center">
      {getMessage()}
    </div>
  );
};
